import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { HeaderInfoValidator } from './header-info.js';

/**
 * Enum that represents request is first or third party to the frame in which it originated.
 * A request is said to be first party if it has the same domain (eTLD+1) as the frame in which the request originated.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-DomainType}
 */ var DomainType = /*#__PURE__*/ function(DomainType) {
    /**
     * The network request is first party to the frame in which it originated.
     */ DomainType["FirstParty"] = "firstParty";
    /**
     * The network request is third party to the frame in which it originated.
     */ DomainType["ThirdParty"] = "thirdParty";
    return DomainType;
}({});
/**
 * Enum that represents the HTTP request method of a network request.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RequestMethod}
 */ var RequestMethod = /*#__PURE__*/ function(RequestMethod) {
    RequestMethod["Connect"] = "connect";
    RequestMethod["Delete"] = "delete";
    RequestMethod["Get"] = "get";
    RequestMethod["Head"] = "head";
    RequestMethod["Options"] = "options";
    RequestMethod["Patch"] = "patch";
    RequestMethod["Post"] = "post";
    RequestMethod["Put"] = "put";
    return RequestMethod;
}({});
/**
 * Enum that represents resource type of the network request.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#type-ResourceType}
 */ var ResourceType = /*#__PURE__*/ function(ResourceType) {
    ResourceType["MainFrame"] = "main_frame";
    ResourceType["SubFrame"] = "sub_frame";
    ResourceType["Stylesheet"] = "stylesheet";
    ResourceType["Script"] = "script";
    ResourceType["Image"] = "image";
    ResourceType["Font"] = "font";
    ResourceType["Object"] = "object";
    ResourceType["XmlHttpRequest"] = "xmlhttprequest";
    ResourceType["Ping"] = "ping";
    ResourceType["CspReport"] = "csp_report";
    ResourceType["Media"] = "media";
    ResourceType["WebSocket"] = "websocket";
    ResourceType["WebTransport"] = "webtransport";
    ResourceType["WebBundle"] = "webbundle";
    ResourceType["Other"] = "other";
    return ResourceType;
}({});
/**
 * Validator for {@link RuleCondition}.
 */ const RuleConditionValidator = strictObjectByType({
    domainType: v.optional(v.enum(DomainType)),
    initiatorDomains: v.optional(v.pipe(v.array(v.string()), v.nonEmpty())),
    excludedInitiatorDomains: v.optional(v.array(v.string())),
    requestDomains: v.optional(v.pipe(v.array(v.string()), v.nonEmpty())),
    excludedRequestDomains: v.optional(v.array(v.string())),
    responseHeaders: v.optional(v.array(HeaderInfoValidator)),
    excludedResponseHeaders: v.optional(v.array(HeaderInfoValidator)),
    tabIds: v.optional(v.pipe(v.array(v.number()), v.nonEmpty())),
    excludedTabIds: v.optional(v.array(v.number())),
    requestMethods: v.optional(v.pipe(v.array(v.enum(RequestMethod)), v.nonEmpty())),
    excludedRequestMethods: v.optional(v.array(v.enum(RequestMethod))),
    resourceTypes: v.optional(v.pipe(v.array(v.enum(ResourceType)), v.nonEmpty())),
    excludedResourceTypes: v.optional(v.array(v.enum(ResourceType))),
    regexFilter: v.optional(v.string()),
    urlFilter: v.optional(v.pipe(v.string(), v.nonEmpty())),
    isUrlFilterCaseSensitive: v.optional(v.boolean())
});

export { DomainType, RequestMethod, ResourceType, RuleConditionValidator };
