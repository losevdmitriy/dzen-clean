import { redirectsCompatibilityTable, GenericPlatform, modifiersCompatibilityTable, RuleCategory, CosmeticRuleType, NetworkRuleType } from "@adguard/agtree";

import { RuleConverter } from "@adguard/agtree/converter";

import { QuoteUtils, AdblockSyntax } from "@adguard/agtree/utils";

import { g as getRuleNode } from "../common/rule-helpers.js";

import "@adguard/agtree/parser";

import "@adguard/agtree/generator";

var trustedClickElementNames = [ "trusted-click-element" ];

var abortOnPropertyReadNames = [ "abort-on-property-read", "abort-on-property-read.js", "ubo-abort-on-property-read.js", "aopr.js", "ubo-aopr.js", "ubo-abort-on-property-read", "ubo-aopr", "abp-abort-on-property-read" ];

var abortOnPropertyWriteNames = [ "abort-on-property-write", "abort-on-property-write.js", "ubo-abort-on-property-write.js", "aopw.js", "ubo-aopw.js", "ubo-abort-on-property-write", "ubo-aopw", "abp-abort-on-property-write" ];

var preventSetTimeoutNames = [ "prevent-setTimeout", "no-setTimeout-if.js", "ubo-no-setTimeout-if.js", "nostif.js", "ubo-nostif.js", "ubo-no-setTimeout-if", "ubo-nostif", "setTimeout-defuser.js", "ubo-setTimeout-defuser.js", "ubo-setTimeout-defuser", "std.js", "ubo-std.js", "ubo-std" ];

var preventSetIntervalNames = [ "prevent-setInterval", "no-setInterval-if.js", "ubo-no-setInterval-if.js", "setInterval-defuser.js", "ubo-setInterval-defuser.js", "nosiif.js", "ubo-nosiif.js", "sid.js", "ubo-sid.js", "ubo-no-setInterval-if", "ubo-setInterval-defuser", "ubo-nosiif", "ubo-sid" ];

var preventWindowOpenNames = [ "prevent-window-open", "window.open-defuser.js", "ubo-window.open-defuser.js", "ubo-window.open-defuser", "nowoif.js", "ubo-nowoif.js", "ubo-nowoif", "no-window-open-if.js", "ubo-no-window-open-if.js", "ubo-no-window-open-if" ];

var abortCurrentInlineScriptNames = [ "abort-current-inline-script", "abort-current-script.js", "ubo-abort-current-script.js", "acs.js", "ubo-acs.js", "ubo-abort-current-script", "ubo-acs", "abort-current-inline-script.js", "ubo-abort-current-inline-script.js", "acis.js", "ubo-acis.js", "ubo-abort-current-inline-script", "ubo-acis", "abp-abort-current-inline-script" ];

var setConstantNames = [ "set-constant", "set-constant.js", "ubo-set-constant.js", "set.js", "ubo-set.js", "ubo-set-constant", "ubo-set", "abp-override-property-read" ];

var removeCookieNames = [ "remove-cookie", "cookie-remover.js", "ubo-cookie-remover.js", "ubo-cookie-remover", "remove-cookie.js", "ubo-remove-cookie.js", "ubo-remove-cookie", "abp-cookie-remover" ];

var preventAddEventListenerNames = [ "prevent-addEventListener", "addEventListener-defuser.js", "ubo-addEventListener-defuser.js", "aeld.js", "ubo-aeld.js", "ubo-addEventListener-defuser", "ubo-aeld", "abp-prevent-listener" ];

var preventBabNames = [ "prevent-bab" ];

var nowebrtcNames = [ "nowebrtc", "nowebrtc.js", "ubo-nowebrtc.js", "ubo-nowebrtc" ];

var logAddEventListenerNames = [ "log-addEventListener", "addEventListener-logger.js", "ubo-addEventListener-logger.js", "aell.js", "ubo-aell.js", "ubo-addEventListener-logger", "ubo-aell" ];

var logEvalNames = [ "log-eval" ];

var logNames = [ "log", "abp-log" ];

var noevalNames = [ "noeval", "noeval.js", "silent-noeval.js", "ubo-noeval.js", "ubo-silent-noeval.js", "ubo-noeval", "ubo-silent-noeval" ];

var preventEvalIfNames = [ "prevent-eval-if", "noeval-if.js", "ubo-noeval-if.js", "ubo-noeval-if" ];

var preventFabNames = [ "prevent-fab-3.2.0", "nofab.js", "ubo-nofab.js", "fuckadblock.js-3.2.0", "ubo-fuckadblock.js-3.2.0", "ubo-nofab" ];

var setPopadsDummyNames = [ "set-popads-dummy", "popads-dummy.js", "ubo-popads-dummy.js", "ubo-popads-dummy" ];

var preventPopadsNetNames = [ "prevent-popads-net", "popads.net.js", "ubo-popads.net.js", "ubo-popads.net" ];

var preventAdflyNames = [ "prevent-adfly" ];

var debugOnPropertyReadNames = [ "debug-on-property-read" ];

var debugOnPropertyWriteNames = [ "debug-on-property-write" ];

var debugCurrentInlineScriptNames = [ "debug-current-inline-script" ];

var removeAttrNames = [ "remove-attr", "remove-attr.js", "ubo-remove-attr.js", "ra.js", "ubo-ra.js", "ubo-remove-attr", "ubo-ra" ];

var setAttrNames = [ "set-attr", "set-attr.js", "ubo-set-attr.js", "ubo-set-attr" ];

var removeClassNames = [ "remove-class", "remove-class.js", "ubo-remove-class.js", "rc.js", "ubo-rc.js", "ubo-remove-class", "ubo-rc" ];

var disableNewtabLinksNames = [ "disable-newtab-links", "disable-newtab-links.js", "ubo-disable-newtab-links.js", "ubo-disable-newtab-links" ];

var adjustSetIntervalNames = [ "adjust-setInterval", "nano-setInterval-booster.js", "ubo-nano-setInterval-booster.js", "nano-sib.js", "ubo-nano-sib.js", "adjust-setInterval.js", "ubo-adjust-setInterval.js", "ubo-nano-setInterval-booster", "ubo-nano-sib", "ubo-adjust-setInterval" ];

var adjustSetTimeoutNames = [ "adjust-setTimeout", "adjust-setTimeout.js", "ubo-adjust-setTimeout.js", "nano-setTimeout-booster.js", "ubo-nano-setTimeout-booster.js", "nano-stb.js", "ubo-nano-stb.js", "ubo-adjust-setTimeout", "ubo-nano-setTimeout-booster", "ubo-nano-stb" ];

var dirStringNames = [ "dir-string" ];

var jsonPruneNames = [ "json-prune", "json-prune.js", "ubo-json-prune.js", "ubo-json-prune", "abp-json-prune", "json-edit", "json-edit.js", "ubo-json-edit.js", "ubo-json-edit" ];

var preventRequestAnimationFrameNames = [ "prevent-requestAnimationFrame", "no-requestAnimationFrame-if.js", "ubo-no-requestAnimationFrame-if.js", "norafif.js", "ubo-norafif.js", "ubo-no-requestAnimationFrame-if", "ubo-norafif" ];

var setCookieNames = [ "set-cookie", "set-cookie.js", "ubo-set-cookie.js", "ubo-set-cookie" ];

var setCookieReloadNames = [ "set-cookie-reload", "set-cookie-reload.js", "ubo-set-cookie-reload.js", "ubo-set-cookie-reload" ];

var hideInShadowDomNames = [ "hide-in-shadow-dom" ];

var removeInShadowDomNames = [ "remove-in-shadow-dom" ];

var preventFetchNames = [ "prevent-fetch", "prevent-fetch.js", "ubo-prevent-fetch.js", "ubo-prevent-fetch", "no-fetch-if.js", "ubo-no-fetch-if.js", "ubo-no-fetch-if" ];

var setLocalStorageItemNames = [ "set-local-storage-item", "set-local-storage-item.js", "ubo-set-local-storage-item.js", "ubo-set-local-storage-item" ];

var setSessionStorageItemNames = [ "set-session-storage-item", "set-session-storage-item.js", "ubo-set-session-storage-item.js", "ubo-set-session-storage-item" ];

var abortOnStackTraceNames = [ "abort-on-stack-trace", "abort-on-stack-trace.js", "ubo-abort-on-stack-trace.js", "aost.js", "ubo-aost.js", "ubo-abort-on-stack-trace", "ubo-aost", "abp-abort-on-stack-trace" ];

var logOnStackTraceNames = [ "log-on-stack-trace" ];

var preventXHRNames = [ "prevent-xhr", "no-xhr-if.js", "ubo-no-xhr-if.js", "ubo-no-xhr-if" ];

var forceWindowCloseNames = [ "close-window", "window-close-if.js", "ubo-window-close-if.js", "ubo-window-close-if", "close-window.js", "ubo-close-window.js", "ubo-close-window" ];

var preventRefreshNames = [ "prevent-refresh", "prevent-refresh.js", "refresh-defuser.js", "refresh-defuser", "ubo-prevent-refresh.js", "ubo-prevent-refresh", "ubo-refresh-defuser.js", "ubo-refresh-defuser" ];

var preventElementSrcLoadingNames = [ "prevent-element-src-loading" ];

var noTopicsNames = [ "no-topics" ];

var trustedReplaceXhrResponseNames = [ "trusted-replace-xhr-response" ];

var trustedPreventXhrNames = [ "trusted-prevent-xhr" ];

var xmlPruneNames = [ "xml-prune", "xml-prune.js", "ubo-xml-prune.js", "ubo-xml-prune" ];

var m3uPruneNames = [ "m3u-prune", "m3u-prune.js", "ubo-m3u-prune.js", "ubo-m3u-prune" ];

var trustedSetCookieNames = [ "trusted-set-cookie" ];

var trustedSetCookieReloadNames = [ "trusted-set-cookie-reload" ];

var trustedReplaceFetchResponseNames = [ "trusted-replace-fetch-response" ];

var trustedSetLocalStorageItemNames = [ "trusted-set-local-storage-item" ];

var trustedSetSessionStorageItemNames = [ "trusted-set-session-storage-item" ];

var trustedSetConstantNames = [ "trusted-set-constant" ];

var injectCssInShadowDomNames = [ "inject-css-in-shadow-dom" ];

var removeNodeTextNames = [ "remove-node-text", "remove-node-text.js", "ubo-remove-node-text.js", "rmnt.js", "ubo-rmnt.js", "ubo-remove-node-text", "ubo-rmnt" ];

var trustedReplaceNodeTextNames = [ "trusted-replace-node-text" ];

var evalDataPruneNames = [ "evaldata-prune", "evaldata-prune.js", "ubo-evaldata-prune.js", "ubo-evaldata-prune" ];

var trustedPruneInboundObjectNames = [ "trusted-prune-inbound-object" ];

var trustedSetAttrNames = [ "trusted-set-attr" ];

var spoofCSSNames = [ "spoof-css", "spoof-css.js", "ubo-spoof-css.js", "ubo-spoof-css" ];

var callNoThrowNames = [ "call-nothrow", "call-nothrow.js", "ubo-call-nothrow.js", "ubo-call-nothrow" ];

var trustedCreateElementNames = [ "trusted-create-element" ];

var hrefSanitizerNames = [ "href-sanitizer", "href-sanitizer.js", "ubo-href-sanitizer.js", "ubo-href-sanitizer" ];

var jsonPruneFetchResponseNames = [ "json-prune-fetch-response", "json-prune-fetch-response.js", "ubo-json-prune-fetch-response.js", "ubo-json-prune-fetch-response", "json-edit-fetch-response", "json-edit-fetch-response.js", "ubo-json-edit-fetch-response.js", "ubo-json-edit-fetch-response" ];

var noProtectedAudienceNames = [ "no-protected-audience" ];

var trustedSuppressNativeMethodNames = [ "trusted-suppress-native-method" ];

var jsonPruneXhrResponseNames = [ "json-prune-xhr-response", "json-prune-xhr-response.js", "ubo-json-prune-xhr-response.js", "ubo-json-prune-xhr-response", "json-edit-xhr-response", "json-edit-xhr-response.js", "ubo-json-edit-xhr-response.js", "ubo-json-edit-xhr-response" ];

var trustedDispatchEventNames = [ "trusted-dispatch-event" ];

var trustedReplaceOutboundTextNames = [ "trusted-replace-outbound-text" ];

var preventCanvasNames = [ "prevent-canvas", "prevent-canvas.js", "ubo-prevent-canvas.js", "ubo-prevent-canvas" ];

var trustedReplaceArgumentNames = [ "trusted-replace-argument" ];

var preventInnerHTMLNames = [ "prevent-innerHTML", "prevent-innerHTML.js", "ubo-prevent-innerHTML.js", "ubo-prevent-innerHTML" ];

var preventConstructorNames = [ "prevent-constructor" ];

var removeRequestQueryParameterNames = [ "remove-request-query-parameter", "abp-strip-fetch-query-parameter" ];

var preventNavigationNames = [ "prevent-navigation" ];

var trustedJsonSetNames = [ "trusted-json-set" ];

var trustedJsonSetFetchResponseNames = [ "trusted-json-set-fetch-response" ];

var trustedJsonSetXhrResponseNames = [ "trusted-json-set-xhr-response" ];

var AmazonApstagNames = [ "amazon-apstag", "ubo-amazon_apstag.js", "amazon_apstag.js" ];

var DidomiLoaderNames = [ "didomi-loader" ];

var Fingerprintjs2Names = [ "fingerprintjs2", "ubo-fingerprint2.js", "fingerprint2.js" ];

var Fingerprintjs3Names = [ "fingerprintjs3", "ubo-fingerprint3.js", "fingerprint3.js" ];

var FreewheelAdManagerNames = [ "freewheel-admanager" ];

var GemiusNames = [ "gemius" ];

var GoogleAnalyticsNames = [ "google-analytics", "ubo-google-analytics_analytics.js", "google-analytics_analytics.js", "googletagmanager-gtm", "ubo-googletagmanager_gtm.js", "googletagmanager_gtm.js" ];

var GoogleAnalyticsGaNames = [ "google-analytics-ga", "ubo-google-analytics_ga.js", "google-analytics_ga.js" ];

var GoogleIma3Names = [ "google-ima3", "ubo-google-ima.js", "google-ima.js" ];

var GoogleIma3DaiNames = [ "google-ima3-dai" ];

var GoogleSyndicationAdsByGoogleNames = [ "googlesyndication-adsbygoogle", "ubo-googlesyndication_adsbygoogle.js", "googlesyndication_adsbygoogle.js" ];

var GoogleTagServicesGptNames = [ "googletagservices-gpt", "ubo-googletagservices_gpt.js", "googletagservices_gpt.js" ];

var MatomoNames = [ "matomo" ];

var metrikaYandexTagNames = [ "metrika-yandex-tag" ];

var metrikaYandexWatchNames = [ "metrika-yandex-watch" ];

var NaverWcslogNames = [ "naver-wcslog" ];

var PardotNames = [ "pardot-1.0" ];

var PrebidNames = [ "prebid" ];

var ScoreCardResearchBeaconNames = [ "scorecardresearch-beacon", "ubo-scorecardresearch_beacon.js", "scorecardresearch_beacon.js" ];

var scriptletsNamesList = Object.freeze({
  __proto__: null,
  AmazonApstagNames: AmazonApstagNames,
  DidomiLoaderNames: DidomiLoaderNames,
  Fingerprintjs2Names: Fingerprintjs2Names,
  Fingerprintjs3Names: Fingerprintjs3Names,
  FreewheelAdManagerNames: FreewheelAdManagerNames,
  GemiusNames: GemiusNames,
  GoogleAnalyticsGaNames: GoogleAnalyticsGaNames,
  GoogleAnalyticsNames: GoogleAnalyticsNames,
  GoogleIma3DaiNames: GoogleIma3DaiNames,
  GoogleIma3Names: GoogleIma3Names,
  GoogleSyndicationAdsByGoogleNames: GoogleSyndicationAdsByGoogleNames,
  GoogleTagServicesGptNames: GoogleTagServicesGptNames,
  MatomoNames: MatomoNames,
  NaverWcslogNames: NaverWcslogNames,
  PardotNames: PardotNames,
  PrebidNames: PrebidNames,
  ScoreCardResearchBeaconNames: ScoreCardResearchBeaconNames,
  abortCurrentInlineScriptNames: abortCurrentInlineScriptNames,
  abortOnPropertyReadNames: abortOnPropertyReadNames,
  abortOnPropertyWriteNames: abortOnPropertyWriteNames,
  abortOnStackTraceNames: abortOnStackTraceNames,
  adjustSetIntervalNames: adjustSetIntervalNames,
  adjustSetTimeoutNames: adjustSetTimeoutNames,
  callNoThrowNames: callNoThrowNames,
  debugCurrentInlineScriptNames: debugCurrentInlineScriptNames,
  debugOnPropertyReadNames: debugOnPropertyReadNames,
  debugOnPropertyWriteNames: debugOnPropertyWriteNames,
  dirStringNames: dirStringNames,
  disableNewtabLinksNames: disableNewtabLinksNames,
  evalDataPruneNames: evalDataPruneNames,
  forceWindowCloseNames: forceWindowCloseNames,
  hideInShadowDomNames: hideInShadowDomNames,
  hrefSanitizerNames: hrefSanitizerNames,
  injectCssInShadowDomNames: injectCssInShadowDomNames,
  jsonPruneFetchResponseNames: jsonPruneFetchResponseNames,
  jsonPruneNames: jsonPruneNames,
  jsonPruneXhrResponseNames: jsonPruneXhrResponseNames,
  logAddEventListenerNames: logAddEventListenerNames,
  logEvalNames: logEvalNames,
  logNames: logNames,
  logOnStackTraceNames: logOnStackTraceNames,
  m3uPruneNames: m3uPruneNames,
  metrikaYandexTagNames: metrikaYandexTagNames,
  metrikaYandexWatchNames: metrikaYandexWatchNames,
  noProtectedAudienceNames: noProtectedAudienceNames,
  noTopicsNames: noTopicsNames,
  noevalNames: noevalNames,
  nowebrtcNames: nowebrtcNames,
  preventAddEventListenerNames: preventAddEventListenerNames,
  preventAdflyNames: preventAdflyNames,
  preventBabNames: preventBabNames,
  preventCanvasNames: preventCanvasNames,
  preventConstructorNames: preventConstructorNames,
  preventElementSrcLoadingNames: preventElementSrcLoadingNames,
  preventEvalIfNames: preventEvalIfNames,
  preventFabNames: preventFabNames,
  preventFetchNames: preventFetchNames,
  preventInnerHTMLNames: preventInnerHTMLNames,
  preventNavigationNames: preventNavigationNames,
  preventPopadsNetNames: preventPopadsNetNames,
  preventRefreshNames: preventRefreshNames,
  preventRequestAnimationFrameNames: preventRequestAnimationFrameNames,
  preventSetIntervalNames: preventSetIntervalNames,
  preventSetTimeoutNames: preventSetTimeoutNames,
  preventWindowOpenNames: preventWindowOpenNames,
  preventXHRNames: preventXHRNames,
  removeAttrNames: removeAttrNames,
  removeClassNames: removeClassNames,
  removeCookieNames: removeCookieNames,
  removeInShadowDomNames: removeInShadowDomNames,
  removeNodeTextNames: removeNodeTextNames,
  removeRequestQueryParameterNames: removeRequestQueryParameterNames,
  setAttrNames: setAttrNames,
  setConstantNames: setConstantNames,
  setCookieNames: setCookieNames,
  setCookieReloadNames: setCookieReloadNames,
  setLocalStorageItemNames: setLocalStorageItemNames,
  setPopadsDummyNames: setPopadsDummyNames,
  setSessionStorageItemNames: setSessionStorageItemNames,
  spoofCSSNames: spoofCSSNames,
  trustedClickElementNames: trustedClickElementNames,
  trustedCreateElementNames: trustedCreateElementNames,
  trustedDispatchEventNames: trustedDispatchEventNames,
  trustedJsonSetFetchResponseNames: trustedJsonSetFetchResponseNames,
  trustedJsonSetNames: trustedJsonSetNames,
  trustedJsonSetXhrResponseNames: trustedJsonSetXhrResponseNames,
  trustedPreventXhrNames: trustedPreventXhrNames,
  trustedPruneInboundObjectNames: trustedPruneInboundObjectNames,
  trustedReplaceArgumentNames: trustedReplaceArgumentNames,
  trustedReplaceFetchResponseNames: trustedReplaceFetchResponseNames,
  trustedReplaceNodeTextNames: trustedReplaceNodeTextNames,
  trustedReplaceOutboundTextNames: trustedReplaceOutboundTextNames,
  trustedReplaceXhrResponseNames: trustedReplaceXhrResponseNames,
  trustedSetAttrNames: trustedSetAttrNames,
  trustedSetConstantNames: trustedSetConstantNames,
  trustedSetCookieNames: trustedSetCookieNames,
  trustedSetCookieReloadNames: trustedSetCookieReloadNames,
  trustedSetLocalStorageItemNames: trustedSetLocalStorageItemNames,
  trustedSetSessionStorageItemNames: trustedSetSessionStorageItemNames,
  trustedSuppressNativeMethodNames: trustedSuppressNativeMethodNames,
  xmlPruneNames: xmlPruneNames
});

function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var _n = 0, F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = true, o = r;
    },
    f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

var UBO_JS_SUFFIX = ".js";

var isScriptletRuleForSyntax = function isScriptletRuleForSyntax(rule, syntax) {
  try {
    var ruleNode = getRuleNode(rule);
    return ruleNode.category === RuleCategory.Cosmetic && ruleNode.type === CosmeticRuleType.ScriptletInjectionRule && ruleNode.syntax === syntax;
  } catch (e) {
    return false;
  }
};

var isAdgScriptletRule = function isAdgScriptletRule(rule) {
  return isScriptletRuleForSyntax(rule, AdblockSyntax.Adg);
};

var isUboScriptletRule = function isUboScriptletRule(rule) {
  return isScriptletRuleForSyntax(rule, AdblockSyntax.Ubo);
};

var isAbpSnippetRule = function isAbpSnippetRule(rule) {
  return isScriptletRuleForSyntax(rule, AdblockSyntax.Abp);
};

var scriptletsNamesContainer;

var getScriptletsNames = function getScriptletsNames() {
  if (scriptletsNamesContainer) {
    return scriptletsNamesContainer;
  }
  scriptletsNamesContainer = new Set;
  var names = Object.values(scriptletsNamesList).flat();
  scriptletsNamesContainer = new Set(names);
  return scriptletsNamesContainer;
};

var hasScriptlet = function hasScriptlet(name) {
  var scriptletsNames = getScriptletsNames();
  return scriptletsNames.has(name) || !name.endsWith(UBO_JS_SUFFIX) && scriptletsNames.has(`${name}${UBO_JS_SUFFIX}`);
};

var isValidScriptletNameNotCached = function isValidScriptletNameNotCached(name) {
  if (!name) {
    return false;
  }
  return hasScriptlet(name);
};

var scriptletNameValidationCache = new Map;

var isValidScriptletName = function isValidScriptletName(name) {
  if (name === "") {
    return true;
  }
  if (!name) {
    return false;
  }
  if (!scriptletNameValidationCache.has(name)) {
    var isValid = isValidScriptletNameNotCached(name);
    scriptletNameValidationCache.set(name, isValid);
    return isValid;
  }
  return scriptletNameValidationCache.get(name);
};

var isArrayOfScriptletRules = function isArrayOfScriptletRules(rules) {
  return rules.every((function(rule) {
    return rule.category === RuleCategory.Cosmetic && rule.type === CosmeticRuleType.ScriptletInjectionRule;
  }));
};

var isValidScriptletRule = function isValidScriptletRule(rule) {
  var ruleNodes;
  try {
    ruleNodes = RuleConverter.convertToAdg(getRuleNode(rule)).result;
  } catch (e) {
    return false;
  }
  if (!isArrayOfScriptletRules(ruleNodes)) {
    return false;
  }
  var isValid = ruleNodes.every((function(ruleNode) {
    var _ruleNode$body$childr;
    var name = (_ruleNode$body$childr = ruleNode.body.children[0]) === null || _ruleNode$body$childr === void 0 || (_ruleNode$body$childr = _ruleNode$body$childr.children[0]) === null || _ruleNode$body$childr === void 0 ? void 0 : _ruleNode$body$childr.value;
    if (!name) {
      return ruleNode.exception;
    }
    var unquotedName = QuoteUtils.removeQuotes(name);
    if (!unquotedName) {
      return false;
    }
    return isValidScriptletName(unquotedName);
  }));
  return isValid;
};

var POSSIBLE_REDIRECT_MODIFIERS = new Set([ "redirect", "redirect-rule", "rewrite" ]);

var getRedirectResourcesFromRule = function getRedirectResourcesFromRule(rule) {
  var result = [];
  try {
    var ruleNode = getRuleNode(rule);
    if (ruleNode.category !== RuleCategory.Network) {
      return result;
    }
    if (ruleNode.type !== NetworkRuleType.NetworkRule) {
      return result;
    }
    var ruleModifiers = ruleNode.modifiers;
    if (!ruleModifiers) {
      return result;
    }
    var _iterator = _createForOfIteratorHelper(ruleModifiers.children), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var el = _step.value;
        if (el.exception) {
          continue;
        }
        if (POSSIBLE_REDIRECT_MODIFIERS.has(el.name.value)) {
          var _el$value;
          result.push({
            modifier: el.name.value,
            resource: (_el$value = el.value) === null || _el$value === void 0 ? void 0 : _el$value.value,
            exceptionRule: ruleNode.exception
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return result;
  } catch (e) {
    return result;
  }
};

var isRedirectResourceCompatibleWithAdg = function isRedirectResourceCompatibleWithAdg(redirectName) {
  return redirectsCompatibilityTable.exists(redirectName, GenericPlatform.AdgAny);
};

var isValidAdgRedirectRule = function isValidAdgRedirectRule(rule) {
  var resources = getRedirectResourcesFromRule(rule);
  if (!resources.length || resources.length > 1) {
    return false;
  }
  var resource = resources[0];
  if (!resource.resource) {
    return resource.exceptionRule;
  }
  return modifiersCompatibilityTable.exists(resource.modifier, GenericPlatform.AdgAny) && isRedirectResourceCompatibleWithAdg(resource.resource);
};

export { isAbpSnippetRule, isAdgScriptletRule, isRedirectResourceCompatibleWithAdg, isUboScriptletRule, isValidAdgRedirectRule, isValidScriptletName, isValidScriptletRule };
