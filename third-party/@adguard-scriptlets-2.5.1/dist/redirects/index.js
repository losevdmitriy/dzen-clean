import jsYaml from "js-yaml";

function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
  } : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

var getErrorMessage = function getErrorMessage(error) {
  var isErrorWithMessage = function isErrorWithMessage(e) {
    return typeof e === "object" && e !== null && "message" in e && typeof e.message === "string";
  };
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  try {
    return new Error(JSON.stringify(error)).message;
  } catch (_unused) {
    return new Error(String(error)).message;
  }
};

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter((function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    }))), t.push.apply(t, o);
  }
  return t;
}

function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach((function(r) {
      _defineProperty(e, r, t[r]);
    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    }));
  }
  return e;
}

class Redirects {
  constructor(rawYaml) {
    try {
      var arrOfRedirects = jsYaml.safeLoad(rawYaml);
      this.redirects = arrOfRedirects.reduce((function(acc, redirect) {
        return _objectSpread(_objectSpread({}, acc), {}, {
          [redirect.title]: redirect
        });
      }), {});
    } catch (e) {
      console.log(`Unable to load YAML into JavaScript: ${getErrorMessage(e)}`);
      throw e;
    }
  }
  getRedirect(title) {
    var _this = this;
    if (Object.prototype.hasOwnProperty.call(this.redirects, title)) {
      return this.redirects[title];
    }
    var values = Object.keys(this.redirects).map((function(key) {
      return _this.redirects[key];
    }));
    return values.find((function(redirect) {
      var {aliases: aliases} = redirect;
      if (!aliases) {
        return false;
      }
      return aliases.includes(title);
    }));
  }
  isBlocking(title) {
    var redirect = this.redirects[title];
    if (redirect) {
      return !!redirect.isBlocking;
    }
    return false;
  }
}

var redirectsMap = {
  "1x1-transparent.gif": "1x1-transparent.gif",
  "1x1.gif": "1x1-transparent.gif",
  "1x1-transparent-gif": "1x1-transparent.gif",
  "2x2-transparent.png": "2x2-transparent.png",
  "2x2.png": "2x2-transparent.png",
  "2x2-transparent-png": "2x2-transparent.png",
  "3x2-transparent.png": "3x2-transparent.png",
  "3x2.png": "3x2-transparent.png",
  "3x2-transparent-png": "3x2-transparent.png",
  "32x32-transparent.png": "32x32-transparent.png",
  "32x32.png": "32x32-transparent.png",
  "32x32-transparent-png": "32x32-transparent.png",
  noopframe: "noopframe.html",
  "noop.html": "noopframe.html",
  "blank-html": "noopframe.html",
  noopcss: "noopcss.css",
  "noop.css": "noopcss.css",
  "blank-css": "noopcss.css",
  noopjs: "noopjs.js",
  "noop.js": "noopjs.js",
  "blank-js": "noopjs.js",
  noopjson: "noopjson.json",
  "noop.json": "noopjson.json",
  nooptext: "nooptext.js",
  "noop.txt": "nooptext.js",
  "blank-text": "nooptext.js",
  empty: "nooptext.js",
  "noopvmap-1.0": "noopvmap01.xml",
  "noop-vmap1.xml": "noopvmap01.xml",
  "noop-vmap1.0.xml": "noopvmap01.xml",
  "noopvast-2.0": "noopvast02.xml",
  "noop-vast2.xml": "noopvast02.xml",
  "noopvast-3.0": "noopvast03.xml",
  "noop-vast3.xml": "noopvast03.xml",
  "noopvast-4.0": "noopvast04.xml",
  "noop-vast4.xml": "noopvast04.xml",
  "noopmp3-0.1s": "noopmp3.mp3",
  "blank-mp3": "noopmp3.mp3",
  "noopmp4-1s": "noopmp4.mp4",
  "noop-1s.mp4": "noopmp4.mp4",
  "blank-mp4": "noopmp4.mp4",
  "click2load.html": "click2load.html",
  "ubo-click2load.html": "click2load.html",
  "amazon-apstag": "amazon-apstag.js",
  "ubo-amazon_apstag.js": "amazon-apstag.js",
  "amazon_apstag.js": "amazon-apstag.js",
  "ati-smarttag": "ati-smarttag.js",
  "didomi-loader": "didomi-loader.js",
  fingerprintjs2: "fingerprintjs2.js",
  "ubo-fingerprint2.js": "fingerprintjs2.js",
  "fingerprint2.js": "fingerprintjs2.js",
  fingerprintjs3: "fingerprintjs3.js",
  "ubo-fingerprint3.js": "fingerprintjs3.js",
  "fingerprint3.js": "fingerprintjs3.js",
  "freewheel-admanager": "freewheel-admanager.js",
  gemius: "gemius.js",
  "google-analytics-ga": "google-analytics-ga.js",
  "ubo-google-analytics_ga.js": "google-analytics-ga.js",
  "google-analytics_ga.js": "google-analytics-ga.js",
  "google-analytics": "google-analytics.js",
  "ubo-google-analytics_analytics.js": "google-analytics.js",
  "google-analytics_analytics.js": "google-analytics.js",
  "googletagmanager-gtm": "google-analytics.js",
  "ubo-googletagmanager_gtm.js": "google-analytics.js",
  "googletagmanager_gtm.js": "google-analytics.js",
  "google-ima3-dai": "google-ima3-dai.js",
  "google-ima3": "google-ima3.js",
  "ubo-google-ima.js": "google-ima3.js",
  "google-ima.js": "google-ima3.js",
  "googlesyndication-adsbygoogle": "googlesyndication-adsbygoogle.js",
  "ubo-googlesyndication_adsbygoogle.js": "googlesyndication-adsbygoogle.js",
  "googlesyndication_adsbygoogle.js": "googlesyndication-adsbygoogle.js",
  "googletagservices-gpt": "googletagservices-gpt.js",
  "ubo-googletagservices_gpt.js": "googletagservices-gpt.js",
  "googletagservices_gpt.js": "googletagservices-gpt.js",
  matomo: "matomo.js",
  "metrika-yandex-tag": "metrika-yandex-tag.js",
  "metrika-yandex-watch": "metrika-yandex-watch.js",
  "naver-wcslog": "naver-wcslog.js",
  noeval: "noeval.js",
  "noeval.js": "noeval.js",
  "silent-noeval.js": "noeval.js",
  "ubo-noeval.js": "noeval.js",
  "ubo-silent-noeval.js": "noeval.js",
  "ubo-noeval": "noeval.js",
  "ubo-silent-noeval": "noeval.js",
  "pardot-1.0": "pardot-1.0.js",
  "prebid-ads": "prebid-ads.js",
  "ubo-prebid-ads.js": "prebid-ads.js",
  "prebid-ads.js": "prebid-ads.js",
  prebid: "prebid.js",
  "prevent-bab": "prevent-bab.js",
  "prevent-bab2": "prevent-bab2.js",
  "nobab2.js": "prevent-bab2.js",
  "prevent-fab-3.2.0": "prevent-fab-3.2.0.js",
  "nofab.js": "prevent-fab-3.2.0.js",
  "ubo-nofab.js": "prevent-fab-3.2.0.js",
  "fuckadblock.js-3.2.0": "prevent-fab-3.2.0.js",
  "ubo-fuckadblock.js-3.2.0": "prevent-fab-3.2.0.js",
  "ubo-nofab": "prevent-fab-3.2.0.js",
  "prevent-popads-net": "prevent-popads-net.js",
  "popads.net.js": "prevent-popads-net.js",
  "ubo-popads.net.js": "prevent-popads-net.js",
  "ubo-popads.net": "prevent-popads-net.js",
  "scorecardresearch-beacon": "scorecardresearch-beacon.js",
  "ubo-scorecardresearch_beacon.js": "scorecardresearch-beacon.js",
  "scorecardresearch_beacon.js": "scorecardresearch-beacon.js",
  "set-popads-dummy": "set-popads-dummy.js",
  "popads-dummy.js": "set-popads-dummy.js",
  "ubo-popads-dummy.js": "set-popads-dummy.js",
  "ubo-popads-dummy": "set-popads-dummy.js"
};

var getRedirectFilename = function getRedirectFilename(name) {
  return redirectsMap[name];
};

export { Redirects, getRedirectFilename };
