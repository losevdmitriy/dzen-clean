import { LazyLoader } from '../utils/lazy-loader.js';
import { UnavailableFilterSourceError } from '../errors/unavailable-sources-errors/unavailable-filter-source-error.js';

/**
 * Concrete filter implementation for the DNR converter.
 *
 * Supports two construction modes:
 * - **Pre-loaded**: `new Filter(id, content)` — content is a plain string,
 *   `getContent()` resolves immediately, `unloadContent()` is a no-op.
 * - **Lazy-loaded**: `new Filter(id, source)` — content is fetched on the first
 *   call to `getContent()`, with promise deduplication and unload/reload support.
 *
 * Use with {@link FilterConverter}.
 */ class Filter {
    /** @inheritdoc */ getId() {
        return this.id;
    }
    /** @inheritdoc */ async getContent() {
        if (this.preloadedContent !== null) {
            return this.preloadedContent;
        }
        // contentLoader is non-null whenever preloadedContent is null (constructor invariant).
        return this.contentLoader.get();
    }
    /** @inheritdoc */ async getRuleByIndex(index) {
        const content = await this.getContent();
        // Lazily build an offset->line index on first access so subsequent
        // lookups are O(1). index is node.start from the AGTree AST - the
        // character offset at which a rule's text begins in the raw filter string.
        if (this.ruleByOffset === null) {
            const map = new Map();
            // Use regex that handles both \n and \r\n line endings.
            const lines = content.split(Filter.LINE_SPLITTER);
            let offset = 0;
            for (const line of lines){
                map.set(offset, line);
                // Determine the actual separator length by peeking
                // at the raw content after the line.
                const afterLine = offset + line.length;
                let separatorLength = 0;
                if (afterLine < content.length) {
                    separatorLength = content[afterLine] === '\r' ? 2 : 1;
                }
                offset += line.length + separatorLength;
            }
            this.ruleByOffset = map;
        }
        const rule = this.ruleByOffset.get(index);
        if (rule === undefined) {
            throw new Error(`Rule not found at offset ${index} in filter ${this.id}`);
        }
        return rule;
    }
    /** @inheritdoc */ unloadContent() {
        // Pre-loaded filters are not unloadable - no source to reload from.
        // (contentLoader is null iff the filter was constructed with a plain string.)
        if (this.contentLoader === null) {
            return;
        }
        this.contentLoader.reset();
        this.ruleByOffset = null;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(id, contentOrGetSource){
        /**
     * Lazily-built map from rule-start character offset to rule text, used
     * by {@link getRuleByIndex} for O(1) lookups. Rebuilt on first access
     * after content is (re)loaded; cleared on {@link unloadContent}.
     */ this.ruleByOffset = null;
        this.id = id;
        if (typeof contentOrGetSource === 'string') {
            this.preloadedContent = contentOrGetSource;
            this.contentLoader = null;
        } else {
            this.preloadedContent = null;
            const getSource = contentOrGetSource;
            this.contentLoader = new LazyLoader(async ()=>{
                try {
                    return await getSource();
                } catch (e) {
                    throw new UnavailableFilterSourceError('Filter content is unavailable', this.id, e);
                }
            });
        }
    }
}
/**
     * Regex that matches both \n and \r\n line endings when splitting
     * filter content into individual rules.
     */ Filter.LINE_SPLITTER = /\r?\n/;

export { Filter };
