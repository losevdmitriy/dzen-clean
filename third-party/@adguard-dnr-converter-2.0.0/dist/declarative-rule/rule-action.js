import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { ModifyHeaderInfoValidator } from './modify-header-info.js';
import { RedirectValidator } from './redirect.js';

/**
 * Enum that represents the kind of action to take if a given condition matches.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType}
 */ var RuleActionType = /*#__PURE__*/ function(RuleActionType) {
    /**
     * Block the network request.
     */ RuleActionType["Block"] = "block";
    /**
     * Redirect the network request.
     */ RuleActionType["Redirect"] = "redirect";
    /**
     * Allow the network request.
     *
     * The request won't be intercepted if there is an allow rule which matches it.
     */ RuleActionType["Allow"] = "allow";
    /**
     * Upgrade the network request url's scheme to `https` if the request is `http` or `ftp`.
     */ RuleActionType["UpgradeScheme"] = "upgradeScheme";
    /**
     * Modify request/response headers from the network request.
     *
     * @since Chrome 86
     */ RuleActionType["ModifyHeaders"] = "modifyHeaders";
    /**
     * Allow all requests within a frame hierarchy, including the frame request itself.
     */ RuleActionType["AllowAllRequests"] = "allowAllRequests";
    return RuleActionType;
}({});
/**
 * Validator for {@link RuleAction}.
 */ const RuleActionValidator = strictObjectByType({
    redirect: v.optional(RedirectValidator),
    requestHeaders: v.optional(v.array(ModifyHeaderInfoValidator)),
    responseHeaders: v.optional(v.array(ModifyHeaderInfoValidator)),
    type: v.enum(RuleActionType)
});

export { RuleActionType, RuleActionValidator };
