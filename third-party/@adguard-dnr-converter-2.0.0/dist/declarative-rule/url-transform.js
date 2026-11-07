import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { QueryTransformValidator } from './query-transform.js';

/**
 * Enum that represents URL transformation schemes.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-URLTransform}
 */ var URLTransformScheme = /*#__PURE__*/ function(URLTransformScheme) {
    URLTransformScheme["Http"] = "http";
    URLTransformScheme["Https"] = "https";
    URLTransformScheme["Ftp"] = "ftp";
    URLTransformScheme["ChromeExtension"] = "chrome-extension";
    return URLTransformScheme;
}({});
/**
 * Validator for {@link URLTransform}.
 */ const URLTransformValidator = strictObjectByType({
    fragment: v.optional(v.string()),
    host: v.optional(v.string()),
    password: v.optional(v.string()),
    path: v.optional(v.string()),
    port: v.optional(v.string()),
    query: v.optional(v.string()),
    queryTransform: v.optional(QueryTransformValidator),
    scheme: v.optional(v.enum(URLTransformScheme)),
    username: v.optional(v.string())
});

export { URLTransformScheme, URLTransformValidator };
