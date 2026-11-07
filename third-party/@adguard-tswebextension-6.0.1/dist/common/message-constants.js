/**
 * @file
 * This file contains constants for communication between background and content scripts.
 * This constants are separated from message.ts to reduce bundle size,
 * because rollup cannot tree-shake tswebextension library code.
 */
/**
 * Name of the message handler.
 * It is needed for determining specific tswebextension message from other messages.
 */
const MESSAGE_HANDLER_NAME = 'tsWebExtension';
/**
 * Message types for communication between background and content scripts.
 */
var MessageType;
(function (MessageType) {
    MessageType["ProcessShouldCollapse"] = "processShouldCollapse";
    MessageType["GetCosmeticData"] = "getCosmeticData";
    MessageType["GetCookieRules"] = "getCookieRules";
    MessageType["SaveCookieLogEvent"] = "saveCookieLogEvent";
    MessageType["InitAssistant"] = "initAssistant";
    MessageType["CloseAssistant"] = "closeAssistant";
    MessageType["AssistantCreateRule"] = "assistantCreateRule";
    MessageType["SaveCssHitsStats"] = "saveCssHitsStats";
})(MessageType || (MessageType = {}));

export { MessageType as M, MESSAGE_HANDLER_NAME as a };
