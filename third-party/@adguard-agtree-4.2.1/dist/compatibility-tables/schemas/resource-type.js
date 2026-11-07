/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import zod from 'zod';

/**
 * @file Resource type schema.
 */
/**
 * Resource type.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ResourceType}
 */
const ResourceType = {
    MainFrame: 'main_frame',
    SubFrame: 'sub_frame',
    Stylesheet: 'stylesheet',
    Script: 'script',
    Image: 'image',
    Font: 'font',
    Object: 'object',
    XmlHttpRequest: 'xmlhttprequest',
    Ping: 'ping',
    Media: 'media',
    WebSocket: 'websocket',
    Other: 'other',
};
/**
 * Resource type schema.
 */
const resourceTypeSchema = zod.nativeEnum(ResourceType);

export { ResourceType, resourceTypeSchema };
