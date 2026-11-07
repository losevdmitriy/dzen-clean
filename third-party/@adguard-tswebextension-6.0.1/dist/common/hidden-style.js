/**
 * Css, injected to broken element for hiding.
 */
// eslint-disable-next-line max-len
const HIDING_STYLE = '{ display: none!important; visibility: hidden!important; height: 0px!important; min-height: 0px!important; }';
/**
 * Creates hiding css rule for specified tag with src attribute.
 *
 * @param tag Element tag for css selector.
 * @param src `src` attribute value for css selector. If value is the empty string
 * then the selector does not represent anything.
 * @param matching Attribute matching type. Currently support strict (=) and suffix ($=) matching.
 * Default to strict.
 *
 * @returns Css rule text.
 */
function createHidingCssRule(tag, src, matching = "=" /* AttributeMatching.Strict */) {
    return `${tag}[src${matching}"${src}"] ${HIDING_STYLE}\n`;
}

export { HIDING_STYLE as H, createHidingCssRule as c };
