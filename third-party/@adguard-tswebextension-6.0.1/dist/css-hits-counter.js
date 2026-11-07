import { S as SEMICOLON } from './common/constants.js';

// TODO remove the comment turning off the rule
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This storage is used to keep track of counted rules received from node elements.
 */
class HitsStorage {
    /**
     * Start count number.
     */
    counter = 0;
    /**
     * Storage random identificator.
     */
    randomKey = HitsStorage.generateRandomKey();
    /**
     * Map storage.
     */
    map = new Map();
    /**
     * Checks if element is counted.
     *
     * @param element Html element.
     * @param rule Rule text.
     *
     * @returns True if element is counted.
     */
    isCounted(element, rule) {
        const hitAddress = element[this.randomKey];
        if (hitAddress) {
            const countedHit = this.map.get(hitAddress);
            if (countedHit) {
                return countedHit.element === element && countedHit.rule === rule;
            }
        }
        return false;
    }
    /**
     * Stores rule-element info in storage.
     *
     * @param element Html element.
     * @param rule Rule text.
     */
    setCounted(element, rule) {
        const counter = this.getCounter();
        // eslint-disable-next-line no-param-reassign
        element[this.randomKey] = counter;
        this.map.set(counter, { element, rule });
    }
    /**
     * Returns current counter value and increments it.
     *
     * @returns Count number.
     */
    getCounter() {
        this.counter += 1;
        return this.counter;
    }
    // TODO replace with nanoid
    /**
     * Random id generator.
     *
     * @returns Random key with 10 characters length.
     */
    static generateRandomKey() {
        const keyLength = 10;
        const possibleValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < keyLength; i += 1) {
            result += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length));
        }
        return result;
    }
}

/**
 * Utils class.
 */
class ElementUtils {
    /**
     * Serialize HTML element.
     *
     * @param element Element to serialize.
     *
     * @returns String representation of the element.
     */
    static elementToString(element) {
        const s = [];
        s.push('<');
        s.push(element.localName);
        const { attributes } = element;
        for (let i = 0; i < attributes.length; i += 1) {
            const attr = attributes[i];
            s.push(' ');
            s.push(attr.name);
            s.push('="');
            const value = attr.value === null ? '' : attr.value.replace(/"/g, '\\"');
            s.push(value);
            s.push('"');
        }
        s.push('>');
        return s.join('');
    }
    /**
     * Appends node children to the array.
     *
     * @param node Element whose children we would like to add.
     * @param arrayWithNodes Array where we add children.
     */
    static appendChildren(node, arrayWithNodes) {
        const children = node.querySelectorAll('*');
        if (children && children.length > 0) {
            for (let i = 0; i < children.length; i += 1) {
                arrayWithNodes.push(children[i]);
            }
        }
    }
    /**
     * Adds elements into array if they are not in the array yet.
     *
     * @param targetArray Array where we add elements.
     * @param sourceArray Array with elements.
     */
    static addUnique(targetArray, sourceArray) {
        if (sourceArray.length > 0) {
            for (let i = 0; i < sourceArray.length; i += 1) {
                const sourceElement = sourceArray[i];
                if (targetArray.indexOf(sourceElement) === -1) {
                    targetArray.push(sourceElement);
                }
            }
        }
    }
    /**
     * Removes all elements in array.
     *
     * @param elements Array with elements.
     */
    static removeElements(elements) {
        for (let i = 0; i < elements.length; i += 1) {
            const element = elements[i];
            element.remove();
        }
    }
    /**
     * Parses hits info from style content.
     *
     * @param content Style content.
     * @param attributeMarker Attribute marker.
     *
     * @returns Rule info or null.
     */
    static parseInfo(content, attributeMarker) {
        if (!content || content.indexOf(attributeMarker) < 0) {
            return null;
        }
        let filterIdAndRuleText = decodeURIComponent(content);
        // 'content' value may include open and close quotes.
        filterIdAndRuleText = ElementUtils.removeQuotes(filterIdAndRuleText);
        // Remove prefix
        filterIdAndRuleText = filterIdAndRuleText.substring(attributeMarker.length);
        // Attribute 'content' in css looks like: {content: 'adguard{filterId};{ruleIndex}'}
        const index = filterIdAndRuleText.indexOf(';');
        if (index < 0) {
            return null;
        }
        const filterId = Number.parseInt(filterIdAndRuleText.slice(0, index), 10);
        if (Number.isNaN(filterId)) {
            return null;
        }
        const ruleIndex = Number.parseInt(filterIdAndRuleText.slice(index + 1), 10);
        if (Number.isNaN(ruleIndex)) {
            return null;
        }
        return { filterId, ruleIndex };
    }
    /**
     * Parses hits info from style content.
     *
     * @param content Style.
     * @param attributeMarker Attribute marker.
     *
     * @returns Rule info or null.
     */
    static parseExtendedStyleInfo(content, attributeMarker) {
        const important = '!important';
        const indexOfImportant = content.lastIndexOf(important);
        if (indexOfImportant === -1) {
            return ElementUtils.parseInfo(content, attributeMarker);
        }
        const contentWithoutImportant = content.substring(0, indexOfImportant).trim();
        return ElementUtils.parseInfo(contentWithoutImportant, attributeMarker);
    }
    /**
     * Unquotes specified value.
     *
     * @param value Value to unquote.
     *
     * @returns Unquoted value.
     */
    static removeQuotes(value) {
        if (value.length > 1
            && ((value[0] === '"' && value[value.length - 1] === '"')
                || (value[0] === '\'' && value[value.length - 1] === '\''))) {
            // Remove double-quotes or single-quotes
            return value.substring(1, value.length - 1);
        }
        return value;
    }
}

const DEFAULT_ELEMENT_TO_STRING = true;
/**
 * Collects CSS hits. Markers are injected by the cosmetic emitter as the
 * `--adguard-hit` custom property (see `CosmeticApiCommon`); the reader
 * probes each element's computed style and reports matches via the
 * callback passed to the constructor.
 */
class CssHitsCounter {
    /**
     * We split CSS hits counting into smaller batches of elements and schedule them one by one using setTimeout.
     */
    static COUNT_CSS_HITS_BATCH_DELAY = 5;
    /**
     * Size of small batches of elements we count.
     */
    static CSS_HITS_BATCH_SIZE = 25;
    /**
     * Marker value prefix; encodes as `adguard<id>%3B<idx>`.
     */
    static MARKER_PREFIX = 'adguard';
    /**
     * Custom property carrying the marker (see `CosmeticApiCommon`).
     */
    static MARKER_PROPERTY_NAME = '--adguard-hit';
    /**
     * We delay countAllCssHits function if it was called too frequently from mutationObserver.
     */
    static COUNT_ALL_CSS_HITS_TIMEOUT_MS = 500;
    /**
     * Callback function for counted css hits handling.
     */
    onCssHitsFoundCallback;
    /**
     * Hits storage.
     */
    hitsStorage = new HitsStorage();
    /**
     * Mutation observer.
     */
    observer = null;
    /**
     * Counting on process flag.
     */
    countIsWorking = false;
    /**
     * Flag determining if we should convert elements to string, or not.
     *
     * @private
     */
    elementToString = DEFAULT_ELEMENT_TO_STRING;
    /**
     * This function prepares calculation of css hits.
     * We are waiting for 'load' event and start calculation.
     *
     * @param callback Which receives {@link ICountedElement} and handles counted css hits.
     * @param options CssHitsCounter options.
     */
    constructor(callback, options) {
        if (options) {
            const { elementToString } = options;
            this.elementToString = elementToString;
        }
        this.onCssHitsFoundCallback = callback;
        if (document.readyState === 'complete'
            || document.readyState === 'interactive') {
            this.countCssHits();
        }
        else {
            document.addEventListener('readystatechange', this.startCounter.bind(this));
        }
    }
    /**
     * Stops css hits counting process.
     */
    stop() {
        this.onCssHitsFoundCallback = () => { };
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    /**
     * ExtendedCss callback: reads the legacy `content:` marker from the
     * parsed rule object, reports a hit, and clears the marker so it
     * never reaches the DOM.
     *
     * The ExtendedCss path was *not* affected by AG-265 — its rules are
     * applied imperatively, never inserted as a stylesheet, so the
     * `content:` marker cannot leak. Reading from the parsed object is
     * required because ExtendedCss invokes this callback **before**
     * `setStyleToElement` writes anything to the node, so computed
     * style is not yet populated. After parsing, the marker declaration
     * is blanked to prevent any visible flash on rules that do not also
     * hide the element.
     *
     * @param affectedEl Affected element from ExtendedCss.
     *
     * @returns The same affected element, unchanged.
     */
    countAffectedByExtendedCss(affectedEl) {
        if (affectedEl && affectedEl.rules && affectedEl.rules.length > 0) {
            const result = [];
            for (const rule of affectedEl.rules) {
                if (rule.style && rule.style.content) {
                    const ruleInfo = ElementUtils.parseExtendedStyleInfo(rule.style.content, CssHitsCounter.MARKER_PREFIX);
                    if (ruleInfo === null) {
                        continue;
                    }
                    const { filterId, ruleIndex } = ruleInfo;
                    if (filterId !== undefined && ruleIndex !== undefined) {
                        const element = this.elementToString
                            ? ElementUtils.elementToString(affectedEl.node)
                            : affectedEl.node;
                        result.push({
                            filterId,
                            ruleIndex,
                            element,
                        });
                        // clear style content to avoid duplicate counting and
                        // to prevent the marker text from being painted.
                        rule.style.content = '';
                    }
                }
            }
            this.onCssHitsFoundCallback(result);
        }
        return affectedEl;
    }
    /**
     * Starts counting process.
     */
    startCounter() {
        if (document.readyState === 'interactive'
            || document.readyState === 'complete') {
            this.countCssHits();
            document.removeEventListener('readystatechange', this.startCounter);
        }
    }
    /**
     * Counts css hits.
     */
    countCssHits() {
        this.countAllCssHits();
        this.countCssHitsForMutations();
    }
    /**
     * Counts css hits for already affected elements.
     */
    countAllCssHits() {
        // we don't start counting again all css hits till previous count process wasn't finished
        if (this.countIsWorking) {
            return;
        }
        this.countIsWorking = true;
        const elements = document.querySelectorAll('*');
        this.countCssHitsBatch(elements, 0, CssHitsCounter.CSS_HITS_BATCH_SIZE, CssHitsCounter.CSS_HITS_BATCH_SIZE, [], (result) => {
            if (result.length > 0) {
                this.onCssHitsFoundCallback(result);
            }
            this.countIsWorking = false;
        });
    }
    /**
     * Main calculation function.
     * 1. Selects sub collection from elements.
     * 2. For each element from sub collection: retrieves calculated css 'content'
     * attribute and if it contains 'adguard'
     * marker then retrieves rule text and filter identifier.
     * 3. Starts next task with some delay.
     *
     * @param elements Collection of all elements.
     * @param start Start of batch.
     * @param end End of batch.
     * @param step Size of batch.
     * @param result Collection for save result.
     * @param callback Finish callback.
     */
    // eslint-disable-next-line max-len
    countCssHitsBatch(elements, start, end, step, result, callback) {
        const length = Math.min(end, elements.length);
        result = result.concat(this.countCssHitsForElements(elements, start, length));
        if (length === elements.length) {
            callback(result);
            return;
        }
        start = end;
        end += step;
        // Start next task with some delay
        window.setTimeout(() => {
            this.countCssHitsBatch(elements, start, end, step, result, callback);
        }, CssHitsCounter.COUNT_CSS_HITS_BATCH_DELAY);
    }
    /**
     * Counts css hits for array of elements.
     *
     * @param elements Array of elements.
     * @param start Start of batch.
     * @param length Length of batch.
     *
     * @returns Data with information about rule and element.
     */
    countCssHitsForElements(elements, start, length) {
        start = start || 0;
        length = length || elements.length;
        const result = [];
        for (let i = start; i < length; i += 1) {
            const element = elements[i];
            const cssHitData = CssHitsCounter.getCssHitData(element);
            if (!cssHitData) {
                continue;
            }
            const { filterId, ruleIndex } = cssHitData;
            const ruleAndFilterString = filterId + SEMICOLON + ruleIndex;
            if (this.hitsStorage.isCounted(element, ruleAndFilterString)) {
                continue;
            }
            this.hitsStorage.setCounted(element, ruleAndFilterString);
            result.push({
                filterId,
                ruleIndex,
                element: this.elementToString ? ElementUtils.elementToString(element) : element,
            });
        }
        return result;
    }
    /**
     * Counts css hits for mutations.
     */
    countCssHitsForMutations() {
        // eslint-disable-next-line prefer-destructuring
        const MutationObserver = window.MutationObserver;
        if (!MutationObserver) {
            return;
        }
        if (this.observer) {
            this.observer.disconnect();
        }
        /**
         * To avoid cases where two css hits counters try to append and remove the
         * same elements one after the other, we do not append already met nodes.
         */
        const probesWeakSet = new WeakSet();
        let timeoutId = null;
        this.observer = new MutationObserver(((mutationRecords) => {
            // Collect probe elements, count them, then remove from their targets
            const probeElements = [];
            const childrenOfProbeElements = [];
            const potentialProbeElements = [];
            mutationRecords.forEach((mutationRecord) => {
                if (mutationRecord.addedNodes.length === 0) {
                    return;
                }
                for (let i = 0; i < mutationRecord.addedNodes.length; i += 1) {
                    const node = mutationRecord.addedNodes[i];
                    if (!(node instanceof Element) || CssHitsCounter.isIgnoredNodeTag(node.tagName)) {
                        continue;
                    }
                    const { target } = mutationRecord;
                    if (!node.parentNode && target) {
                        // If this node has been appended to the DOM and counted once, do not add
                        // it again.
                        if (probesWeakSet.has(node)) {
                            return;
                        }
                        // Most likely this is a "probe" element that was added and then
                        // immediately removed from DOM.
                        // We re-add it and check if any rule matched it
                        probeElements.push(node);
                        // To ensure that this "probe" node has only been added once to the DOM,
                        // we add it to the weak set.
                        probesWeakSet.add(node);
                        // CSS rules could be applied to the nodes inside probe element
                        // that's why we get all child elements of added node
                        ElementUtils.appendChildren(node, childrenOfProbeElements);
                        if (this.observer) {
                            this.observer.disconnect();
                        }
                        mutationRecord.target.appendChild(node);
                    }
                    else if (node.parentNode && target) {
                        // Sometimes probe elements are appended to the DOM
                        potentialProbeElements.push(node);
                        ElementUtils.appendChildren(node, potentialProbeElements);
                    }
                }
            });
            // If the list of potential probe elements is relatively small,
            // we can count CSS hits immediately
            if (potentialProbeElements.length > 0
                && potentialProbeElements.length <= CssHitsCounter.CSS_HITS_BATCH_SIZE) {
                const result = this.countCssHitsForElements(potentialProbeElements, 0, null);
                if (result.length > 0) {
                    this.onCssHitsFoundCallback(result);
                }
            }
            const allProbeElements = [];
            ElementUtils.addUnique(allProbeElements, childrenOfProbeElements);
            ElementUtils.addUnique(allProbeElements, probeElements);
            if (allProbeElements.length > 0) {
                const result = this.countCssHitsForElements(allProbeElements, 0, null);
                if (result.length > 0) {
                    this.onCssHitsFoundCallback(result);
                }
                /**
                 * Don't remove child elements of probe elements
                 * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1096.
                 */
                ElementUtils.removeElements(probeElements);
                this.startObserver();
            }
            // debounce counting all css hits when mutation record fires
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                this.countAllCssHits();
                window.clearTimeout(timeoutId);
            }, CssHitsCounter.COUNT_ALL_CSS_HITS_TIMEOUT_MS);
        }));
        this.startObserver();
    }
    /**
     * Starts mutation observer.
     */
    startObserver() {
        if (this.observer) {
            // TODO: Check, maybe we should observer for 'characterData' and
            // 'characterDataOldValue' like it was in the old extension code
            this.observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
            });
        }
    }
    /**
     * Reads the `--adguard-hit` marker from an element's computed style (AG-265).
     *
     * @param element Element to probe.
     *
     * @returns Rule info or `null` if no marker is present.
     */
    static getCssHitData(element) {
        const value = getComputedStyle(element)
            .getPropertyValue(CssHitsCounter.MARKER_PROPERTY_NAME);
        if (!value) {
            return null;
        }
        return ElementUtils.parseInfo(value, CssHitsCounter.MARKER_PREFIX);
    }
    /**
     * Checks if tag is ignored.
     *
     * @param nodeTag Tag name to check.
     *
     * @returns True if tag is ignored.
     */
    static isIgnoredNodeTag(nodeTag) {
        const ignoredTags = ['script'];
        return ignoredTags.includes(nodeTag.toLowerCase());
    }
}

export { CssHitsCounter };
