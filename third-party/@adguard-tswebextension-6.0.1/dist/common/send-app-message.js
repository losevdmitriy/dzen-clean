import browser from 'webextension-polyfill';
import { a as MESSAGE_HANDLER_NAME } from './message-constants.js';

// TODO check if we can return typed message here
/**
 * Sends message to the background page.
 *
 * @param message Message to send.
 * @param message.payload Payload of the message.
 * @param message.type Message type.
 *
 * @returns Promise resolved with response from the background page.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendAppMessage = async (message) => {
    return browser.runtime.sendMessage({ handlerName: MESSAGE_HANDLER_NAME, ...message });
};

export { sendAppMessage as s };
