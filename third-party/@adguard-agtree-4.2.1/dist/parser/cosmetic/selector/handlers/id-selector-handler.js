/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * Handles ID selector parsing in selector list.
 */
class IdSelectorHandler {
    /**
     * Handles ID selector parsing by creating an ID selector node
     * and appending it to the current complex selector node.
     *
     * @param context Selector list parser context.
     *
     * @throws If the ID selector is syntactically incorrect.
     */
    static handle(context) {
        const { raw, options, baseOffset, stream, complexSelector, } = context;
        // Get ID selector token
        const token = stream.getOrFail();
        // Extract ID selector value (`start + 1` - without hashmark)
        const value = raw.slice(token.start + 1, token.end);
        // Construct ID selector node
        const result = {
            type: 'IdSelector',
            value,
        };
        // Include ID selector node locations if needed
        if (options.isLocIncluded) {
            result.start = baseOffset + token.start;
            result.end = baseOffset + token.end;
        }
        // Append ID selector node to the current complex selector node
        complexSelector.children.push(result);
        // Advance ID selector token
        stream.advance();
    }
}

export { IdSelectorHandler };
