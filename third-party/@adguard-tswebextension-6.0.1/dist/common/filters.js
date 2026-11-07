import { openDB } from 'idb';
import { l as logger } from './logger.js';

/**
 * Singleton class for managing IndexedDB database.
 */
class IdbSingleton {
    /**
     * Database name.
     */
    static DB_NAME = 'tswebextensionIDB';
    /**
     * Active database connection (null when closed).
     */
    static db = null;
    /**
     * In‑flight promise used as a mutex to avoid races.
     */
    static getterPromise = null;
    /**
     * Global upgrade lock to ensure all database operations wait for upgrades to complete.
     */
    static upgradePromise = null;
    /**
     * Returns an opened database containing the requested store. The method
     * upgrades the database when the requested store is missing, preserving
     * all existing data in other stores during upgrade.
     *
     * @param store Name of the object store that must be present.
     * @param onUpgrade Optional callback to be called when the database is upgraded.
     *
     * @returns Promise, resolved with opened database.
     */
    static async getOpenedDb(store, onUpgrade) {
        // Wait for any pending operations to complete first (single await for atomicity)
        if (IdbSingleton.upgradePromise || IdbSingleton.getterPromise) {
            const locks = [
                IdbSingleton.upgradePromise,
                IdbSingleton.getterPromise,
            ].filter((lock) => lock !== null);
            await Promise.all(locks);
        }
        // Fast path when we already have an open DB containing the store.
        if (IdbSingleton.db?.objectStoreNames.contains(store)) {
            return IdbSingleton.db;
        }
        // If no operation is in progress, start a new one
        if (!IdbSingleton.getterPromise) {
            IdbSingleton.getterPromise = IdbSingleton.openDatabase(store, onUpgrade);
        }
        return IdbSingleton.getterPromise;
    }
    /**
     * Opens the database and ensures the required store exists.
     *
     * @param store Name of the object store that must be present.
     * @param onUpgrade Optional callback to be called when the database is upgraded.
     *
     * @returns Promise resolved with opened database.
     */
    static async openDatabase(store, onUpgrade) {
        try {
            if (IdbSingleton.db) {
                IdbSingleton.db.close();
                IdbSingleton.db = null;
            }
            let db = await openDB(IdbSingleton.DB_NAME, 
            // Probe: open with undefined version, which opens the current version.
            undefined, {
                upgrade(_database, oldVersion, newVersion) {
                    logger.debug('[tsweb.IdbSingleton.openDatabase]: Upgrade IDB version from', oldVersion, 'to', newVersion);
                },
                // In normal situation we expected that this will not happen
                // since we have mutex promise for upgrade.
                blocked() {
                    logger.warn('[tsweb.IdbSingleton.openDatabase]: IDB upgrade blocked');
                },
            });
            // Check if we need to upgrade for missing store
            if (!db.objectStoreNames.contains(store)) {
                db = await IdbSingleton.upgradeDatabase(db, store, onUpgrade);
            }
            IdbSingleton.db = db;
            return db;
        }
        finally {
            IdbSingleton.getterPromise = null;
        }
    }
    /**
     * Upgrades the database to create a missing store.
     * Preserves all existing data in other stores during upgrade.
     *
     * @param currentDb Current database instance to upgrade.
     * @param store Name of the store to create.
     * @param onUpgrade Optional callback to be called when the database is upgraded.
     *
     * @returns Promise resolved with upgraded database.
     */
    static async upgradeDatabase(currentDb, store, onUpgrade) {
        // If an upgrade is already in progress, wait for it
        if (IdbSingleton.upgradePromise) {
            const upgradedDb = await IdbSingleton.upgradePromise;
            // Update currentDb reference to the result of the previous upgrade
            if (!upgradedDb) {
                throw new Error('Previous upgrade returned null database');
            }
            // After waiting, check if our store was created by the other upgrade.
            // Otherwise, if the store still doesn't exist, we need to do our own upgrade
            if (upgradedDb?.objectStoreNames.contains(store)) {
                return upgradedDb;
            }
            currentDb = upgradedDb;
        }
        const currentVersion = currentDb.version;
        // Upgrade: bump version by +1, add missing store
        const newVersion = currentVersion + 1;
        // Close the database before upgrading
        currentDb.close();
        // Create upgrade promise to block other operations
        try {
            const upgradeTask = IdbSingleton.executeUpgradeTask(currentVersion, newVersion, store, onUpgrade);
            IdbSingleton.upgradePromise = upgradeTask;
            return await upgradeTask;
        }
        catch (error) {
            logger.error('[tsweb.IdbSingleton.upgradeDatabase]: Failed to upgrade database:', error);
            throw error;
        }
        finally {
            IdbSingleton.upgradePromise = null;
        }
    }
    /**
     * Executes the database upgrade task.
     *
     * @param currentVersion Current database version.
     * @param newVersion New database version.
     * @param store Name of the store to create.
     * @param onUpgrade Optional callback to be called when the database is upgraded.
     *
     * @returns Promise resolved with upgraded database.
     */
    static async executeUpgradeTask(currentVersion, newVersion, store, onUpgrade) {
        return openDB(IdbSingleton.DB_NAME, newVersion, {
            upgrade(database, oldVersion, upgradeNewVersion) {
                logger.debug('[tsweb.IdbSingleton.executeUpgradeTask]: Upgrade IDB version from', oldVersion, 'to', upgradeNewVersion);
                // Create the missing store without affecting existing stores
                if (!database.objectStoreNames.contains(store)) {
                    database.createObjectStore(store);
                }
                // Call upgrade callback after database upgrade.
                if (onUpgrade) {
                    onUpgrade(currentVersion, newVersion);
                }
            },
            blocked() {
                // In normal situation we expected that this will not happen
                // since we have mutex promise for upgrade.
                logger.warn('[tsweb.IdbSingleton.executeUpgradeTask]: IDB upgrade blocked - another upgrade in progress');
            },
        });
    }
}

/**
 * Provides a "synchronized storage" for filter lists.
 * This storage is needed to synchronize data from JSON rulesets to IndexedDB
 * on every extension start (if needed).
 */
class FiltersStorage {
    /**
     * Database store name.
     */
    static DB_STORE_NAME = 'filters';
    /**
     * Key combiner.
     */
    static KEY_COMBINER = '_';
    /**
     * Key prefix for raw filter list.
     */
    static KEY_RAW_FILTER_LIST = 'rawFilterList';
    /**
     * Key prefix for conversion data.
     */
    static KEY_CONVERSION_DATA = 'conversionData';
    /**
     * Key prefix for checksum.
     */
    static KEY_CHECKSUM = 'checksum';
    /**
     * Returns key with prefix.
     * Key format: <prefix>_<filterId>, e.g. `filterList_1`.
     *
     * @param keyPrefix Key prefix.
     * @param filterId Filter id.
     *
     * @returns Key with prefix.
     */
    static getKey(keyPrefix, filterId) {
        return `${keyPrefix}${FiltersStorage.KEY_COMBINER}${filterId}`;
    }
    /**
     * Sets multiple filter lists to {@link filtersIdbStorage} in batch.
     *
     * @param filters Record with filter id as a key and filter rules strings as a value.
     *
     * @throws Error, if transaction failed.
     */
    static async setMultiple(filters) {
        const data = {};
        for (const [filterId, filter] of Object.entries(filters)) {
            for (const [key, value] of Object.entries(filter)) {
                data[FiltersStorage.getKey(key, filterId)] = value;
            }
        }
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        const tx = db.transaction(FiltersStorage.DB_STORE_NAME, 'readwrite');
        const requests = [tx.done];
        try {
            for (const [key, value] of Object.entries(data)) {
                requests.push(tx.store.put(value, key));
            }
            await Promise.all(requests);
        }
        catch (e) {
            // A failed request has already aborted the transaction, but a
            // synchronous throw from `put` (e.g. DataCloneError) has not, so
            // abort explicitly to drop the writes queued before it.
            try {
                tx.abort();
            }
            catch {
                // Already aborted: the original error is the useful one.
            }
            // Handle the rejections of the requests queued before the throw.
            await Promise.allSettled(requests);
            logger.error('[tsweb.FiltersStorage.setMultiple]: failed to set multiple filter data, got error: ', e);
            throw e;
        }
    }
    /**
     * Checks if the filter list with the specified ID exists in the storage.
     *
     * @param filterId Filter id.
     *
     * @returns `true` if the filter list exists, `false` otherwise.
     */
    static async has(filterId) {
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        const keys = await db.getAllKeys(FiltersStorage.DB_STORE_NAME);
        const searchedKey = FiltersStorage.getKey(FiltersStorage.KEY_CHECKSUM, filterId);
        return keys
            .map(String)
            .some((key) => key === searchedKey);
    }
    /**
     * Returns specified filter list from cache or {@link filtersIdbStorage}.
     *
     * @param filterId Filter id.
     *
     * @returns Promise, resolved with filter rules strings.
     *
     * @throws Error, if DB operation failed or returned data is not valid.
     */
    static async get(filterId) {
        try {
            const data = await Promise.all([
                FiltersStorage.getRawFilterList(filterId),
                FiltersStorage.getConversionData(filterId),
                FiltersStorage.getChecksum(filterId),
            ]);
            // eslint-disable-next-line prefer-const
            let [rawFilterList, conversionData, checksum] = data;
            // If any of the data is missing, return undefined
            if (rawFilterList === undefined || checksum === undefined) {
                return undefined;
            }
            // If conversionData is missing, set it to empty object
            if (conversionData === undefined) {
                conversionData = {
                    originals: [],
                    conversions: [],
                };
            }
            return {
                rawFilterList,
                conversionData,
                checksum,
            };
        }
        catch (e) {
            logger.error(`[tsweb.FiltersStorage.get]: failed to get filter data for filter id ${filterId}, got error:`, e);
            throw e;
        }
    }
    /**
     * Removes multiple filter lists from {@link filtersIdbStorage} in batch.
     *
     * @param filterIds Filter ids.
     *
     * @throws Error, if transaction failed.
     */
    static async removeMultiple(filterIds) {
        const keys = filterIds.map((filterId) => {
            return [
                FiltersStorage.getKey(FiltersStorage.KEY_RAW_FILTER_LIST, filterId),
                FiltersStorage.getKey(FiltersStorage.KEY_CONVERSION_DATA, filterId),
                FiltersStorage.getKey(FiltersStorage.KEY_CHECKSUM, filterId),
            ];
        }).flat();
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        const tx = db.transaction(FiltersStorage.DB_STORE_NAME, 'readwrite');
        try {
            await Promise.all(keys.map((key) => tx.store.delete(key)));
            await tx.done;
        }
        catch (e) {
            logger.error('[tsweb.FiltersStorage.removeMultiple]: failed to remove multiple filter data, got error: ', e);
            tx.abort();
            throw e;
        }
    }
    /**
     * Gets the raw filter list for the specified filter ID.
     *
     * @param filterId Filter id.
     *
     * @returns Raw filter list or `undefined` if the filter list does not exist.
     */
    static async getRawFilterList(filterId) {
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        return db.get(FiltersStorage.DB_STORE_NAME, FiltersStorage.getKey(FiltersStorage.KEY_RAW_FILTER_LIST, filterId));
    }
    /**
     * Gets the conversion map for the specified filter ID.
     *
     * @param filterId Filter id.
     *
     * @returns Conversion map or `undefined` if the filter list does not exist.
     */
    static async getConversionData(filterId) {
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        return db.get(FiltersStorage.DB_STORE_NAME, FiltersStorage.getKey(FiltersStorage.KEY_CONVERSION_DATA, filterId));
    }
    /**
     * Gets the checksum for the specified filter ID.
     *
     * @param filterId Filter id.
     *
     * @returns Promise, resolved with checksum or undefined if not found.
     */
    static async getChecksum(filterId) {
        const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
        return db.get(FiltersStorage.DB_STORE_NAME, FiltersStorage.getKey(FiltersStorage.KEY_CHECKSUM, filterId));
    }
    /**
     * Returns all filter IDs from {@link filtersIdbStorage}.
     *
     * @returns Promise, resolved with filter ids.
     *
     * @throws Error, if DB operation failed.
     */
    static async getFilterIds() {
        try {
            const db = await IdbSingleton.getOpenedDb(FiltersStorage.DB_STORE_NAME);
            const keys = await db.getAllKeys(FiltersStorage.DB_STORE_NAME);
            return keys
                .map(String)
                .filter((key) => key.startsWith(FiltersStorage.KEY_CHECKSUM))
                .map((key) => parseInt(key.split(FiltersStorage.KEY_COMBINER)[1], 10));
        }
        catch (e) {
            logger.error('[tsweb.FiltersStorage.getFilterIds]: failed to get filter ids, got error: ', e);
            throw e;
        }
    }
}

export { FiltersStorage as F, IdbSingleton as I };
