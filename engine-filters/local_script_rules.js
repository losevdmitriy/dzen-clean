export const localScriptRules = {
    '(function(){var a=document.currentScript,b=String.prototype.charCodeAt,c=function(){return true;};Object.defineProperty(String.prototype,"charCodeAt",{get:function(){return document.currentScript===a?b:c},set:function(a){}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a415b8ebbf930b083a9d813bb1a1367a"] === flag) {
                return;
            }
            (function() {
                var a = document.currentScript, b = String.prototype.charCodeAt, c = function() {
                    return true;
                };
                Object.defineProperty(String.prototype, "charCodeAt", {
                    get: function() {
                        return document.currentScript === a ? b : c;
                    },
                    set: function(a) {}
                });
            })();
            Object.defineProperty(Window.prototype.toString, "a415b8ebbf930b083a9d813bb1a1367a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a415b8ebbf930b083a9d813bb1a1367a" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{if(typeof $==="function"){var $player=$(".player");$player.html($player.html().replace(/\x3c!--|--\x3e/g,""));}}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e781468d8e503942bd8a2b5d75e820e3"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (typeof $ === "function") {
                        var $player = $(".player");
                        $player.html($player.html().replace(/<!--|-->/g, ""));
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "e781468d8e503942bd8a2b5d75e820e3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e781468d8e503942bd8a2b5d75e820e3" due to: ' + error);
        }
    },
    '(()=>{const t=window.Map.prototype.values,a={apply:(a,e,p)=>{try{const a=Array.from(t.call(e))[0];(a?.parentElement?.matches(".supbar")||a?.matches?.(".rotator"))&&(e=new Map)}catch(t){}return Reflect.apply(a,e,p)}};window.Map.prototype.values=new Proxy(window.Map.prototype.values,a)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d64b4dac3a9d8fa9ed65b3d8c658a01f"] === flag) {
                return;
            }
            (() => {
                const t = window.Map.prototype.values, a = {
                    apply: (a, e, p) => {
                        try {
                            const a = Array.from(t.call(e))[0];
                            (a?.parentElement?.matches(".supbar") || a?.matches?.(".rotator")) && (e = new Map);
                        } catch (t) {}
                        return Reflect.apply(a, e, p);
                    }
                };
                window.Map.prototype.values = new Proxy(window.Map.prototype.values, a);
            })();
            Object.defineProperty(Window.prototype.toString, "d64b4dac3a9d8fa9ed65b3d8c658a01f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d64b4dac3a9d8fa9ed65b3d8c658a01f" due to: ' + error);
        }
    },
    "(function() { var isSet = false; Object.defineProperty(window, 'vas', { get: function() { return isSet ? false : undefined; }, set: function() { isSet = false; } }); })();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d818588d2f70a2feaf95e6d52f17ccbe"] === flag) {
                return;
            }
            (function() {
                var isSet = false;
                Object.defineProperty(window, "vas", {
                    get: function() {
                        return isSet ? false : undefined;
                    },
                    set: function() {
                        isSet = false;
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "d818588d2f70a2feaf95e6d52f17ccbe", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d818588d2f70a2feaf95e6d52f17ccbe" due to: ' + error);
        }
    },
    "window.trckd = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9694a84d652f8dc20c14bac2f5d04885"] === flag) {
                return;
            }
            window.trckd = true;
            Object.defineProperty(Window.prototype.toString, "9694a84d652f8dc20c14bac2f5d04885", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9694a84d652f8dc20c14bac2f5d04885" due to: ' + error);
        }
    },
    "window.ab = false;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4b8a3a3cee481368c865f50cdb63083f"] === flag) {
                return;
            }
            window.ab = false;
            Object.defineProperty(Window.prototype.toString, "4b8a3a3cee481368c865f50cdb63083f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4b8a3a3cee481368c865f50cdb63083f" due to: ' + error);
        }
    },
    "window.aadnet = {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["723ed96afa36adad6fac95f60ddc793d"] === flag) {
                return;
            }
            window.aadnet = {};
            Object.defineProperty(Window.prototype.toString, "723ed96afa36adad6fac95f60ddc793d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "723ed96afa36adad6fac95f60ddc793d" due to: ' + error);
        }
    },
    "var isadblock=1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0528f2e6eabb867d601e3b5619e18249"] === flag) {
                return;
            }
            var isadblock = 1;
            Object.defineProperty(Window.prototype.toString, "0528f2e6eabb867d601e3b5619e18249", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0528f2e6eabb867d601e3b5619e18249" due to: ' + error);
        }
    },
    "function setTimeout() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2fe08ac469bce8e0959ec04f0f994427"] === flag) {
                return;
            }
            function setTimeout() {}
            Object.defineProperty(Window.prototype.toString, "2fe08ac469bce8e0959ec04f0f994427", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2fe08ac469bce8e0959ec04f0f994427" due to: ' + error);
        }
    },
    "var block = false;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["84381f8c4a4c9c214a07baa32a8b8a38"] === flag) {
                return;
            }
            var block = false;
            Object.defineProperty(Window.prototype.toString, "84381f8c4a4c9c214a07baa32a8b8a38", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "84381f8c4a4c9c214a07baa32a8b8a38" due to: ' + error);
        }
    },
    "window.setTimeout=function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["61f2a933309703d6e7d9383e4428a8e6"] === flag) {
                return;
            }
            window.setTimeout = function() {};
            Object.defineProperty(Window.prototype.toString, "61f2a933309703d6e7d9383e4428a8e6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "61f2a933309703d6e7d9383e4428a8e6" due to: ' + error);
        }
    },
    "var canRunAds = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8a68886c66c8ca4dccac563705f5891c"] === flag) {
                return;
            }
            var canRunAds = true;
            Object.defineProperty(Window.prototype.toString, "8a68886c66c8ca4dccac563705f5891c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8a68886c66c8ca4dccac563705f5891c" due to: ' + error);
        }
    },
    "Element.prototype.attachShadow = function(){};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["34432d844bc8123e149136a1ccd4dca3"] === flag) {
                return;
            }
            Element.prototype.attachShadow = function() {};
            Object.defineProperty(Window.prototype.toString, "34432d844bc8123e149136a1ccd4dca3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "34432d844bc8123e149136a1ccd4dca3" due to: ' + error);
        }
    },
    "window.atob = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1dd67b659846dea638d69419abe06c73"] === flag) {
                return;
            }
            window.atob = function() {};
            Object.defineProperty(Window.prototype.toString, "1dd67b659846dea638d69419abe06c73", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1dd67b659846dea638d69419abe06c73" due to: ' + error);
        }
    },
    "(function() { var intervalId = 0; var blockAds = function() { try { if (typeof BeSeedRotator != 'undefined' && BeSeedRotator.Container.player) { clearInterval(intervalId); BeSeedRotator.showDismissButton(); BeSeedRotator.reCache(); } } catch (ex) {}  }; intervalId = setInterval(blockAds, 100); })();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["52c186b38202f876b11210bbe1307dcf"] === flag) {
                return;
            }
            (function() {
                var intervalId = 0;
                var blockAds = function() {
                    try {
                        if (typeof BeSeedRotator != "undefined" && BeSeedRotator.Container.player) {
                            clearInterval(intervalId);
                            BeSeedRotator.showDismissButton();
                            BeSeedRotator.reCache();
                        }
                    } catch (ex) {}
                };
                intervalId = setInterval(blockAds, 100);
            })();
            Object.defineProperty(Window.prototype.toString, "52c186b38202f876b11210bbe1307dcf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "52c186b38202f876b11210bbe1307dcf" due to: ' + error);
        }
    },
    '(function(){var getElementsByTagName=document.getElementsByTagName;document.getElementsByTagName=function(tagName){if(tagName=="script")return[];return getElementsByTagName.call(this,tagName)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b1d2d1ecc236da7e56f0c6627c80f309"] === flag) {
                return;
            }
            (function() {
                var getElementsByTagName = document.getElementsByTagName;
                document.getElementsByTagName = function(tagName) {
                    if (tagName == "script") return [];
                    return getElementsByTagName.call(this, tagName);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "b1d2d1ecc236da7e56f0c6627c80f309", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b1d2d1ecc236da7e56f0c6627c80f309" due to: ' + error);
        }
    },
    '(function(){var b={};(function(a,c,d){"undefined"!==typeof window[a]?window[a][c]=d:Object.defineProperty(window,a,{get:function(){return b[a]},set:function(e){b[a]=e;e[c]=d}})})("authConfig","adfox",[])})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f08e1e484fb2ed477eff5477b270c3ab"] === flag) {
                return;
            }
            (function() {
                var b = {};
                (function(a, c, d) {
                    "undefined" !== typeof window[a] ? window[a][c] = d : Object.defineProperty(window, a, {
                        get: function() {
                            return b[a];
                        },
                        set: function(e) {
                            b[a] = e;
                            e[c] = d;
                        }
                    });
                })("authConfig", "adfox", []);
            })();
            Object.defineProperty(Window.prototype.toString, "f08e1e484fb2ed477eff5477b270c3ab", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f08e1e484fb2ed477eff5477b270c3ab" due to: ' + error);
        }
    },
    "document.addEventListener('click',function(e){var t=e.target.closest('.click_coupons_code');if(!t)return;e.stopPropagation();e.preventDefault();var u=t.dataset.hrefAlt||null;if(u)location.href=u},true);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dd29b63b5d4d49aaa50e088388b6539b"] === flag) {
                return;
            }
            document.addEventListener("click", (function(e) {
                var t = e.target.closest(".click_coupons_code");
                if (!t) return;
                e.stopPropagation();
                e.preventDefault();
                var u = t.dataset.hrefAlt || null;
                if (u) location.href = u;
            }), true);
            Object.defineProperty(Window.prototype.toString, "dd29b63b5d4d49aaa50e088388b6539b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dd29b63b5d4d49aaa50e088388b6539b" due to: ' + error);
        }
    },
    "(function(){var i=setInterval(function(){var f=window.CashbackOpenCouponGlobal;if(f){window.CashbackOpenCouponGlobal=function(a){if(a&&a.IS_CODE){try{Cookies.set('CASHBACK_OPEN_OFFER',a.ID,{expires:new Date(Date.now()+1800000)});Cookies.set('CASHBACK_SCROLL_TOP',window.scrollY,{expires:new Date(Date.now()+1800000)})}catch(e){}var u=new URL(location.href);u.hash='';u.searchParams.delete('ncc');u.searchParams.delete('pr');u.searchParams.set('ncc','1');location.href=u.toString();return}return f(a)};clearInterval(i)}},5)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e80c2ebcba2ebb31126bf54b39c993de"] === flag) {
                return;
            }
            (function() {
                var i = setInterval((function() {
                    var f = window.CashbackOpenCouponGlobal;
                    if (f) {
                        window.CashbackOpenCouponGlobal = function(a) {
                            if (a && a.IS_CODE) {
                                try {
                                    Cookies.set("CASHBACK_OPEN_OFFER", a.ID, {
                                        expires: new Date(Date.now() + 18e5)
                                    });
                                    Cookies.set("CASHBACK_SCROLL_TOP", window.scrollY, {
                                        expires: new Date(Date.now() + 18e5)
                                    });
                                } catch (e) {}
                                var u = new URL(location.href);
                                u.hash = "";
                                u.searchParams.delete("ncc");
                                u.searchParams.delete("pr");
                                u.searchParams.set("ncc", "1");
                                location.href = u.toString();
                                return;
                            }
                            return f(a);
                        };
                        clearInterval(i);
                    }
                }), 5);
            })();
            Object.defineProperty(Window.prototype.toString, "e80c2ebcba2ebb31126bf54b39c993de", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e80c2ebcba2ebb31126bf54b39c993de" due to: ' + error);
        }
    },
    '!function(){const p={apply:(p,e,n)=>{const r=Reflect.apply(p,e,n),s=r?.[0]?.props?.data;return s&&null===s.user&&(r[0].props.data.user="guest"),r}};window.JSON.parse=new Proxy(window.JSON.parse,p)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ff8cf9783100a66d151550ce6ced34a2"] === flag) {
                return;
            }
            !function() {
                const p = {
                    apply: (p, e, n) => {
                        const r = Reflect.apply(p, e, n), s = r?.[0]?.props?.data;
                        return s && null === s.user && (r[0].props.data.user = "guest"), r;
                    }
                };
                window.JSON.parse = new Proxy(window.JSON.parse, p);
            }();
            Object.defineProperty(Window.prototype.toString, "ff8cf9783100a66d151550ce6ced34a2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ff8cf9783100a66d151550ce6ced34a2" due to: ' + error);
        }
    },
    "(()=>{const a={apply:(a,t,r)=>{try{!0===r[0]?.parameters?.[1]?.autoplay&&(r[0].parameters[1].autoplay=!1)}catch(a){console.trace(a)}return Reflect.apply(a,t,r)}};window.JSON.stringify=new Proxy(window.JSON.stringify,a)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4f79921d4ac95552f4af81dfd58692a0"] === flag) {
                return;
            }
            (() => {
                const a = {
                    apply: (a, t, r) => {
                        try {
                            !0 === r[0]?.parameters?.[1]?.autoplay && (r[0].parameters[1].autoplay = !1);
                        } catch (a) {
                            console.trace(a);
                        }
                        return Reflect.apply(a, t, r);
                    }
                };
                window.JSON.stringify = new Proxy(window.JSON.stringify, a);
            })();
            Object.defineProperty(Window.prototype.toString, "4f79921d4ac95552f4af81dfd58692a0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4f79921d4ac95552f4af81dfd58692a0" due to: ' + error);
        }
    },
    '(()=>{const a=(a,b,c)=>{const d=Reflect.apply(a,b,c),e="div[id^=\'atf\']:empty { display: none !important; }";if("adoptedStyleSheets"in document){const a=new CSSStyleSheet;a.replaceSync(e),d.adoptedStyleSheets=[a]}else{const a=document.createElement("style");a.innerText=e,d.appendChild(a)}return d};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,{apply:a})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b8fa834f4adf06d6a85a989a38de37be"] === flag) {
                return;
            }
            (() => {
                const a = (a, b, c) => {
                    const d = Reflect.apply(a, b, c), e = "div[id^='atf']:empty { display: none !important; }";
                    if ("adoptedStyleSheets" in document) {
                        const a = new CSSStyleSheet;
                        a.replaceSync(e), d.adoptedStyleSheets = [ a ];
                    } else {
                        const a = document.createElement("style");
                        a.innerText = e, d.appendChild(a);
                    }
                    return d;
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, {
                    apply: a
                });
            })();
            Object.defineProperty(Window.prototype.toString, "b8fa834f4adf06d6a85a989a38de37be", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b8fa834f4adf06d6a85a989a38de37be" due to: ' + error);
        }
    },
    "window.samDetected = false;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c377d77d43a05809c9a0d8a9ceab3d41"] === flag) {
                return;
            }
            window.samDetected = false;
            Object.defineProperty(Window.prototype.toString, "c377d77d43a05809c9a0d8a9ceab3d41", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c377d77d43a05809c9a0d8a9ceab3d41" due to: ' + error);
        }
    },
    "var _amw1 = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["18c5b42ee23d66b2e421249a57fa79b6"] === flag) {
                return;
            }
            var _amw1 = 1;
            Object.defineProperty(Window.prototype.toString, "18c5b42ee23d66b2e421249a57fa79b6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "18c5b42ee23d66b2e421249a57fa79b6" due to: ' + error);
        }
    },
    "var AdmostClient = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["68f39c1ee25950ec0093a17497f1746a"] === flag) {
                return;
            }
            var AdmostClient = 1;
            Object.defineProperty(Window.prototype.toString, "68f39c1ee25950ec0093a17497f1746a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "68f39c1ee25950ec0093a17497f1746a" due to: ' + error);
        }
    },
    "var advertisement_not_blocked = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7d86fff0df182d87d917f92dd5565564"] === flag) {
                return;
            }
            var advertisement_not_blocked = 1;
            Object.defineProperty(Window.prototype.toString, "7d86fff0df182d87d917f92dd5565564", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7d86fff0df182d87d917f92dd5565564" due to: ' + error);
        }
    },
    "var criteo_medyanet_loaded = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["36a1a7ba76fefd6b56dea5d5a3260cf4"] === flag) {
                return;
            }
            var criteo_medyanet_loaded = 1;
            Object.defineProperty(Window.prototype.toString, "36a1a7ba76fefd6b56dea5d5a3260cf4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "36a1a7ba76fefd6b56dea5d5a3260cf4" due to: ' + error);
        }
    },
    '(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/RTCPeerConnection[\\s\\S]*?new MouseEvent\\("click"/.test(a.toString()))return b(a,c)};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ad3cc2fb594ccbd52529466a1f774118"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/RTCPeerConnection[\s\S]*?new MouseEvent\("click"/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "ad3cc2fb594ccbd52529466a1f774118", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ad3cc2fb594ccbd52529466a1f774118" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{"function"==typeof load_3rdparties&&load_3rdparties()}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d32c830c0e926685887f2481f9379565"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    "function" == typeof load_3rdparties && load_3rdparties();
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "d32c830c0e926685887f2481f9379565", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d32c830c0e926685887f2481f9379565" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/?u=aHR0c")){var a=location.href.split("/?u=");if(a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8286156f54f298badd47131511830b06"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/?u=aHR0c")) {
                    var a = location.href.split("/?u=");
                    if (a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "8286156f54f298badd47131511830b06", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8286156f54f298badd47131511830b06" due to: ' + error);
        }
    },
    'document.cookie="modalads=yes; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["48f46432b0c186dccc332dff0c8a87fe"] === flag) {
                return;
            }
            document.cookie = "modalads=yes; path=/;";
            Object.defineProperty(Window.prototype.toString, "48f46432b0c186dccc332dff0c8a87fe", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "48f46432b0c186dccc332dff0c8a87fe" due to: ' + error);
        }
    },
    "if(window.sessionStorage) { window.sessionStorage.pageCount = 0; }": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["96c1872f8a0322e86045b358d415f5c4"] === flag) {
                return;
            }
            if (window.sessionStorage) {
                window.sessionStorage.pageCount = 0;
            }
            Object.defineProperty(Window.prototype.toString, "96c1872f8a0322e86045b358d415f5c4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "96c1872f8a0322e86045b358d415f5c4" due to: ' + error);
        }
    },
    'setTimeout ("HideFloatAdBanner()", 1000);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["56182d371d85af85aa5af8cbd48e5b34"] === flag) {
                return;
            }
            setTimeout("HideFloatAdBanner()", 1e3);
            Object.defineProperty(Window.prototype.toString, "56182d371d85af85aa5af8cbd48e5b34", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "56182d371d85af85aa5af8cbd48e5b34" due to: ' + error);
        }
    },
    '!function(){const e={apply:(e,t,n)=>(n&&n[1]&&"useAdBlockerDetector"===n[1]&&n[2]&&n[2].get&&(n[2].get=function(){return function(){return!1}}),Reflect.apply(e,t,n))};window.Object.defineProperty=new Proxy(window.Object.defineProperty,e)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["121f6100a828e1c169bfff6bafc69bfd"] === flag) {
                return;
            }
            !function() {
                const e = {
                    apply: (e, t, n) => (n && n[1] && "useAdBlockerDetector" === n[1] && n[2] && n[2].get && (n[2].get = function() {
                        return function() {
                            return !1;
                        };
                    }), Reflect.apply(e, t, n))
                };
                window.Object.defineProperty = new Proxy(window.Object.defineProperty, e);
            }();
            Object.defineProperty(Window.prototype.toString, "121f6100a828e1c169bfff6bafc69bfd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "121f6100a828e1c169bfff6bafc69bfd" due to: ' + error);
        }
    },
    "window.google_tag_manager = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["62de8ad86c59d0b7297a578a18ec0db3"] === flag) {
                return;
            }
            window.google_tag_manager = function() {};
            Object.defineProperty(Window.prototype.toString, "62de8ad86c59d0b7297a578a18ec0db3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "62de8ad86c59d0b7297a578a18ec0db3" due to: ' + error);
        }
    },
    "(()=>{const e=function(){};window.tC={privacy:{getOptinCategories:e,cookieData:[]},addConsentChangeListener:e,removeConsentChangeListener:e,container:{reload:e}},window.tc_events_global=e})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3e6ad3ca98205e8e015d731852c14ada"] === flag) {
                return;
            }
            (() => {
                const e = function() {};
                window.tC = {
                    privacy: {
                        getOptinCategories: e,
                        cookieData: []
                    },
                    addConsentChangeListener: e,
                    removeConsentChangeListener: e,
                    container: {
                        reload: e
                    }
                }, window.tc_events_global = e;
            })();
            Object.defineProperty(Window.prototype.toString, "3e6ad3ca98205e8e015d731852c14ada", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3e6ad3ca98205e8e015d731852c14ada" due to: ' + error);
        }
    },
    '(()=>{window.TATM=window.TATM||{},TATM.init=()=>{},TATM.initAdUnits=()=>{},TATM.pageReady=()=>{},TATM.getVast=function(n){return new Promise((n=>{n()}))},TATM.push=function(n){if("function"==typeof n)try{n()}catch(n){console.debug(n)}};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["103de1b5e23e730a477b9b7da10564a4"] === flag) {
                return;
            }
            (() => {
                window.TATM = window.TATM || {}, TATM.init = () => {}, TATM.initAdUnits = () => {}, 
                TATM.pageReady = () => {}, TATM.getVast = function(n) {
                    return new Promise((n => {
                        n();
                    }));
                }, TATM.push = function(n) {
                    if ("function" == typeof n) try {
                        n();
                    } catch (n) {
                        console.debug(n);
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "103de1b5e23e730a477b9b7da10564a4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "103de1b5e23e730a477b9b7da10564a4" due to: ' + error);
        }
    },
    '(()=>{document.location.href.includes("/pop_advisor")&&window.addEventListener("load",()=>{const e=new CustomEvent("visibilitychange"),t=t=>{Object.defineProperty(t.view.top.document,"hidden",{value:!0,writable:!0}),t.view.top.document.dispatchEvent(e),setTimeout((()=>{Object.defineProperty(t.view.top.document,"hidden",{value:!1,writable:!0}),t.view.top.document.dispatchEvent(e)}),100)},n=document.querySelector("button.btn-continu");n&&n.addEventListener("click",t)});})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["962185cb0a55f058eae7c7389bbc7327"] === flag) {
                return;
            }
            (() => {
                document.location.href.includes("/pop_advisor") && window.addEventListener("load", (() => {
                    const e = new CustomEvent("visibilitychange"), t = t => {
                        Object.defineProperty(t.view.top.document, "hidden", {
                            value: !0,
                            writable: !0
                        }), t.view.top.document.dispatchEvent(e), setTimeout((() => {
                            Object.defineProperty(t.view.top.document, "hidden", {
                                value: !1,
                                writable: !0
                            }), t.view.top.document.dispatchEvent(e);
                        }), 100);
                    }, n = document.querySelector("button.btn-continu");
                    n && n.addEventListener("click", t);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "962185cb0a55f058eae7c7389bbc7327", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "962185cb0a55f058eae7c7389bbc7327" due to: ' + error);
        }
    },
    '(()=>{document.location.href.includes("/iframe_ad")&&window.addEventListener("load",(()=>{const e=new CustomEvent("visibilitychange"),t=()=>{Object.defineProperty(document,"hidden",{value:!0,writable:!0}),document.dispatchEvent(e),setTimeout((()=>{Object.defineProperty(document,"hidden",{value:!1,writable:!0}),document.dispatchEvent(e)}),100)},n=document.querySelector("a.btn-ad-iframe");n&&n.addEventListener("click",t)}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a715b406996eaeeeaf44515461187620"] === flag) {
                return;
            }
            (() => {
                document.location.href.includes("/iframe_ad") && window.addEventListener("load", (() => {
                    const e = new CustomEvent("visibilitychange"), t = () => {
                        Object.defineProperty(document, "hidden", {
                            value: !0,
                            writable: !0
                        }), document.dispatchEvent(e), setTimeout((() => {
                            Object.defineProperty(document, "hidden", {
                                value: !1,
                                writable: !0
                            }), document.dispatchEvent(e);
                        }), 100);
                    }, n = document.querySelector("a.btn-ad-iframe");
                    n && n.addEventListener("click", t);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "a715b406996eaeeeaf44515461187620", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a715b406996eaeeeaf44515461187620" due to: ' + error);
        }
    },
    '(function(){var a={cmd:[],public:{getVideoAdUrl:function(){},createNewPosition:function(){},refreshAds:function(){},setTargetingOnPosition:function(){},getDailymotionAdsParamsForScript:function(c,a){if("function"==typeof a)try{if(1===a.length){a({})}}catch(a){}}}};a.cmd.push=function(b){let a=function(){try{"function"==typeof b&&b()}catch(a){}};"complete"===document.readyState?a():window.addEventListener("load",()=>{a()})},window.jad=a})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["176456e95ac0c8ff1ac49bbf30461c8b"] === flag) {
                return;
            }
            (function() {
                var a = {
                    cmd: [],
                    public: {
                        getVideoAdUrl: function() {},
                        createNewPosition: function() {},
                        refreshAds: function() {},
                        setTargetingOnPosition: function() {},
                        getDailymotionAdsParamsForScript: function(c, a) {
                            if ("function" == typeof a) try {
                                if (1 === a.length) {
                                    a({});
                                }
                            } catch (a) {}
                        }
                    }
                };
                a.cmd.push = function(b) {
                    let a = function() {
                        try {
                            "function" == typeof b && b();
                        } catch (a) {}
                    };
                    "complete" === document.readyState ? a() : window.addEventListener("load", (() => {
                        a();
                    }));
                }, window.jad = a;
            })();
            Object.defineProperty(Window.prototype.toString, "176456e95ac0c8ff1ac49bbf30461c8b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "176456e95ac0c8ff1ac49bbf30461c8b" due to: ' + error);
        }
    },
    "var _st = window.setTimeout; window.setTimeout = function(a, b) { if(!/target_url/.test(a)){ _st(a,b);}};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["315672b76833d426a2a0b83c85c50797"] === flag) {
                return;
            }
            var _st = window.setTimeout;
            window.setTimeout = function(a, b) {
                if (!/target_url/.test(a)) {
                    _st(a, b);
                }
            };
            Object.defineProperty(Window.prototype.toString, "315672b76833d426a2a0b83c85c50797", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "315672b76833d426a2a0b83c85c50797" due to: ' + error);
        }
    },
    '(function(){let callCounter=0;const nativeJSONParse=JSON.parse;const handler={apply(){callCounter++;const obj=Reflect.apply(...arguments);if(callCounter<=10){if(obj.hasOwnProperty("appName")){if(obj.applaunch?.data?.player?.features?.ad?.enabled){obj.applaunch.data.player.features.ad.enabled=false}if(obj.applaunch?.data?.player?.features?.ad?.dai?.enabled){obj.applaunch.data.player.features.ad.dai.enabled=false}}}else{JSON.parse=nativeJSONParse}return obj}};JSON.parse=new Proxy(JSON.parse,handler)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["03b60dbf8e3b5b8f2423393210afcf06"] === flag) {
                return;
            }
            (function() {
                let callCounter = 0;
                const nativeJSONParse = JSON.parse;
                const handler = {
                    apply() {
                        callCounter++;
                        const obj = Reflect.apply(...arguments);
                        if (callCounter <= 10) {
                            if (obj.hasOwnProperty("appName")) {
                                if (obj.applaunch?.data?.player?.features?.ad?.enabled) {
                                    obj.applaunch.data.player.features.ad.enabled = false;
                                }
                                if (obj.applaunch?.data?.player?.features?.ad?.dai?.enabled) {
                                    obj.applaunch.data.player.features.ad.dai.enabled = false;
                                }
                            }
                        } else {
                            JSON.parse = nativeJSONParse;
                        }
                        return obj;
                    }
                };
                JSON.parse = new Proxy(JSON.parse, handler);
            })();
            Object.defineProperty(Window.prototype.toString, "03b60dbf8e3b5b8f2423393210afcf06", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "03b60dbf8e3b5b8f2423393210afcf06" due to: ' + error);
        }
    },
    "(function(){let callCounter=0;const nativeJSONParse=JSON.parse;const handler={apply(){callCounter++;const obj=Reflect.apply(...arguments);if(callCounter<=10){if(obj.hasOwnProperty('env')&&obj.env.hasOwnProperty('origin')){if(!obj.hasOwnProperty('ads')){obj.ads={};}obj.ads.enable=false;obj.ads._prerolls=false;obj.ads._midrolls=false;}}else{JSON.parse=nativeJSONParse;}return obj;}};JSON.parse=new Proxy(JSON.parse,handler);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["076ec28f8d5bd40b7dc4be56dc82b841"] === flag) {
                return;
            }
            (function() {
                let callCounter = 0;
                const nativeJSONParse = JSON.parse;
                const handler = {
                    apply() {
                        callCounter++;
                        const obj = Reflect.apply(...arguments);
                        if (callCounter <= 10) {
                            if (obj.hasOwnProperty("env") && obj.env.hasOwnProperty("origin")) {
                                if (!obj.hasOwnProperty("ads")) {
                                    obj.ads = {};
                                }
                                obj.ads.enable = false;
                                obj.ads._prerolls = false;
                                obj.ads._midrolls = false;
                            }
                        } else {
                            JSON.parse = nativeJSONParse;
                        }
                        return obj;
                    }
                };
                JSON.parse = new Proxy(JSON.parse, handler);
            })();
            Object.defineProperty(Window.prototype.toString, "076ec28f8d5bd40b7dc4be56dc82b841", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "076ec28f8d5bd40b7dc4be56dc82b841" due to: ' + error);
        }
    },
    '(()=>{if(location.href.includes("cdn.sirdata.eu/load_with_tcf.php?url=https")){const a=new URLSearchParams(location.search).get("url");a&&location.assign(a)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ca7a8176701e7a23e0d4c73706555161"] === flag) {
                return;
            }
            (() => {
                if (location.href.includes("cdn.sirdata.eu/load_with_tcf.php?url=https")) {
                    const a = new URLSearchParams(location.search).get("url");
                    a && location.assign(a);
                }
            })();
            Object.defineProperty(Window.prototype.toString, "ca7a8176701e7a23e0d4c73706555161", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ca7a8176701e7a23e0d4c73706555161" due to: ' + error);
        }
    },
    '(()=>{window.patroniteGdprData={google_recaptcha:"allow"}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fc25d8c99ebbbc3be6aedb39d0c00819"] === flag) {
                return;
            }
            (() => {
                window.patroniteGdprData = {
                    google_recaptcha: "allow"
                };
            })();
            Object.defineProperty(Window.prototype.toString, "fc25d8c99ebbbc3be6aedb39d0c00819", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fc25d8c99ebbbc3be6aedb39d0c00819" due to: ' + error);
        }
    },
    '(()=>{let t,e=!1;const o=new MutationObserver(((e,o)=>{const c=t?.querySelector(\'cmp-button[variant="primary"]\');c&&(c.click(),o.disconnect())})),c={apply:(c,n,a)=>{const r=Reflect.apply(c,n,a);return!e&&n.matches("cmp-dialog")&&(e=!0,t=r),o.observe(r,{subtree:!0,childList:!0}),r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9318631bdeb75b748ea1cad12107b17a"] === flag) {
                return;
            }
            (() => {
                let t, e = !1;
                const o = new MutationObserver(((e, o) => {
                    const c = t?.querySelector('cmp-button[variant="primary"]');
                    c && (c.click(), o.disconnect());
                })), c = {
                    apply: (c, n, a) => {
                        const r = Reflect.apply(c, n, a);
                        return !e && n.matches("cmp-dialog") && (e = !0, t = r), o.observe(r, {
                            subtree: !0,
                            childList: !0
                        }), r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, c);
            })();
            Object.defineProperty(Window.prototype.toString, "9318631bdeb75b748ea1cad12107b17a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9318631bdeb75b748ea1cad12107b17a" due to: ' + error);
        }
    },
    '(()=>{let t;const e=new MutationObserver(((e,o)=>{const n=t?.querySelector(\'button[data-testid="button-agree"]\');n&&(setTimeout((()=>{n.click()}),500),o.disconnect())})),o={apply:(o,n,c)=>{const a=Reflect.apply(o,n,c);return n.matches(".szn-cmp-dialog-container")&&(t=a),e.observe(a,{subtree:!0,childList:!0}),a}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2bca593aa0d901f23a66e9e0ba973abc"] === flag) {
                return;
            }
            (() => {
                let t;
                const e = new MutationObserver(((e, o) => {
                    const n = t?.querySelector('button[data-testid="button-agree"]');
                    n && (setTimeout((() => {
                        n.click();
                    }), 500), o.disconnect());
                })), o = {
                    apply: (o, n, c) => {
                        const a = Reflect.apply(o, n, c);
                        return n.matches(".szn-cmp-dialog-container") && (t = a), e.observe(a, {
                            subtree: !0,
                            childList: !0
                        }), a;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, o);
            })();
            Object.defineProperty(Window.prototype.toString, "2bca593aa0d901f23a66e9e0ba973abc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2bca593aa0d901f23a66e9e0ba973abc" due to: ' + error);
        }
    },
    '(function(){var noopFunc=function(){};var tcData={eventStatus:"tcloaded",gdprApplies:!1,listenerId:noopFunc,vendor:{consents:{967:true}},purpose:{consents:[]}};window.__tcfapi=function(command,version,callback){"function"==typeof callback&&"removeEventListener"!==command&&callback(tcData,!0)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["905285a22b2c90f963ab16245e1f463b"] === flag) {
                return;
            }
            (function() {
                var noopFunc = function() {};
                var tcData = {
                    eventStatus: "tcloaded",
                    gdprApplies: !1,
                    listenerId: noopFunc,
                    vendor: {
                        consents: {
                            967: true
                        }
                    },
                    purpose: {
                        consents: []
                    }
                };
                window.__tcfapi = function(command, version, callback) {
                    "function" == typeof callback && "removeEventListener" !== command && callback(tcData, !0);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "905285a22b2c90f963ab16245e1f463b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "905285a22b2c90f963ab16245e1f463b" due to: ' + error);
        }
    },
    'document.cookie="PostAnalytics=inactive; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8dd64e0e5c7cfb7ada0186747714df1b"] === flag) {
                return;
            }
            document.cookie = "PostAnalytics=inactive; path=/;";
            Object.defineProperty(Window.prototype.toString, "8dd64e0e5c7cfb7ada0186747714df1b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8dd64e0e5c7cfb7ada0186747714df1b" due to: ' + error);
        }
    },
    "document.cookie='cmplz_consented_services={\"youtube\":true};path=/;';": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8cbd0cd2ffcfd41b8dd501b4861c18e3"] === flag) {
                return;
            }
            document.cookie = 'cmplz_consented_services={"youtube":true};path=/;';
            Object.defineProperty(Window.prototype.toString, "8cbd0cd2ffcfd41b8dd501b4861c18e3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8cbd0cd2ffcfd41b8dd501b4861c18e3" due to: ' + error);
        }
    },
    '(function(){if(!document.cookie.includes("CookieInformationConsent=")){var a=encodeURIComponent(\'{"website_uuid":"","timestamp":"","consent_url":"","consent_website":"jysk.nl","consent_domain":"jysk.nl","user_uid":"","consents_approved":["cookie_cat_necessary","cookie_cat_functional","cookie_cat_statistic"],"consents_denied":[],"user_agent":""}\');document.cookie="CookieInformationConsent="+a+"; path=/;"}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4e7a66fe06a58f87f9deb67cb85b8a2c"] === flag) {
                return;
            }
            (function() {
                if (!document.cookie.includes("CookieInformationConsent=")) {
                    var a = encodeURIComponent('{"website_uuid":"","timestamp":"","consent_url":"","consent_website":"jysk.nl","consent_domain":"jysk.nl","user_uid":"","consents_approved":["cookie_cat_necessary","cookie_cat_functional","cookie_cat_statistic"],"consents_denied":[],"user_agent":""}');
                    document.cookie = "CookieInformationConsent=" + a + "; path=/;";
                }
            })();
            Object.defineProperty(Window.prototype.toString, "4e7a66fe06a58f87f9deb67cb85b8a2c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4e7a66fe06a58f87f9deb67cb85b8a2c" due to: ' + error);
        }
    },
    'document.cookie=\'cookie_consent_level={"functionality":true,"strictly-necessary":true,"targeting":false,"tracking":false}; path=/;\';': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bee65ec0755ccff706db52148c4173c7"] === flag) {
                return;
            }
            document.cookie = 'cookie_consent_level={"functionality":true,"strictly-necessary":true,"targeting":false,"tracking":false}; path=/;';
            Object.defineProperty(Window.prototype.toString, "bee65ec0755ccff706db52148c4173c7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bee65ec0755ccff706db52148c4173c7" due to: ' + error);
        }
    },
    '(function(){try{var a=location.pathname.split("/")[1],b="dra_cookie_consent_allowed_"+a,c=new RegExp(/[a-z]+_[a-z]+/);if(!document.cookie.includes(b)&&c.test(a)){var d=encodeURIComponent("v=1&t=1&f=1&s=0&m=0");document.cookie=b+"="+d+"; path=/;"}}catch(e){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["89284264a9e746e269120c04d8e07578"] === flag) {
                return;
            }
            (function() {
                try {
                    var a = location.pathname.split("/")[1], b = "dra_cookie_consent_allowed_" + a, c = new RegExp(/[a-z]+_[a-z]+/);
                    if (!document.cookie.includes(b) && c.test(a)) {
                        var d = encodeURIComponent("v=1&t=1&f=1&s=0&m=0");
                        document.cookie = b + "=" + d + "; path=/;";
                    }
                } catch (e) {}
            })();
            Object.defineProperty(Window.prototype.toString, "89284264a9e746e269120c04d8e07578", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "89284264a9e746e269120c04d8e07578" due to: ' + error);
        }
    },
    'document.cookie="dw_cookies_accepted=D; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["65ddec250513cfa895af9e691c980515"] === flag) {
                return;
            }
            document.cookie = "dw_cookies_accepted=D; path=/;";
            Object.defineProperty(Window.prototype.toString, "65ddec250513cfa895af9e691c980515", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "65ddec250513cfa895af9e691c980515" due to: ' + error);
        }
    },
    '(function(){document.cookie.includes("cookies-consents")||(document.cookie=\'cookies-consents={"ad_storage":false,"analytics_storage":false}\')})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ccaa77db2be3c96b3a11b73a501af1f1"] === flag) {
                return;
            }
            (function() {
                document.cookie.includes("cookies-consents") || (document.cookie = 'cookies-consents={"ad_storage":false,"analytics_storage":false}');
            })();
            Object.defineProperty(Window.prototype.toString, "ccaa77db2be3c96b3a11b73a501af1f1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ccaa77db2be3c96b3a11b73a501af1f1" due to: ' + error);
        }
    },
    'document.cookie="ubCmpSettings=eyJnZW1laW5kZW5fc2VsZWN0ZWRfdmFsdWUiOnRydWUsImdvb2dsZV9hbmFseXRpY3MiOmZhbHNlLCJhZF90cmFja2luZyI6ZmFsc2UsInNvY2lhbF9lbWJlZHMiOnRydWV9;path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["58bc9348bcf4f1f2b6163529b3298384"] === flag) {
                return;
            }
            document.cookie = "ubCmpSettings=eyJnZW1laW5kZW5fc2VsZWN0ZWRfdmFsdWUiOnRydWUsImdvb2dsZV9hbmFseXRpY3MiOmZhbHNlLCJhZF90cmFja2luZyI6ZmFsc2UsInNvY2lhbF9lbWJlZHMiOnRydWV9;path=/;";
            Object.defineProperty(Window.prototype.toString, "58bc9348bcf4f1f2b6163529b3298384", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "58bc9348bcf4f1f2b6163529b3298384" due to: ' + error);
        }
    },
    'document.cookie="cookieconsent_status=allow; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["95e24d457a7de10b441b7cbe6b509b42"] === flag) {
                return;
            }
            document.cookie = "cookieconsent_status=allow; path=/;";
            Object.defineProperty(Window.prototype.toString, "95e24d457a7de10b441b7cbe6b509b42", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "95e24d457a7de10b441b7cbe6b509b42" due to: ' + error);
        }
    },
    'document.cookie="cookieConsentLevel=functional; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["787f6ec1d270f080d84075658a3154bd"] === flag) {
                return;
            }
            document.cookie = "cookieConsentLevel=functional; path=/;";
            Object.defineProperty(Window.prototype.toString, "787f6ec1d270f080d84075658a3154bd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "787f6ec1d270f080d84075658a3154bd" due to: ' + error);
        }
    },
    'document.cookie="cookies_accept=all; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["25fbbc330687fea937e26e0888468fc1"] === flag) {
                return;
            }
            document.cookie = "cookies_accept=all; path=/;";
            Object.defineProperty(Window.prototype.toString, "25fbbc330687fea937e26e0888468fc1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "25fbbc330687fea937e26e0888468fc1" due to: ' + error);
        }
    },
    'document.cookie="waconcookiemanagement=min; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0898665962f7d4da16a3e93e72148415"] === flag) {
                return;
            }
            document.cookie = "waconcookiemanagement=min; path=/;";
            Object.defineProperty(Window.prototype.toString, "0898665962f7d4da16a3e93e72148415", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0898665962f7d4da16a3e93e72148415" due to: ' + error);
        }
    },
    'document.cookie="apcAcceptedTrackingCookie3=1111000; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ebce46e2aa13a6690a7be922ea601529"] === flag) {
                return;
            }
            document.cookie = "apcAcceptedTrackingCookie3=1111000; path=/;";
            Object.defineProperty(Window.prototype.toString, "ebce46e2aa13a6690a7be922ea601529", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ebce46e2aa13a6690a7be922ea601529" due to: ' + error);
        }
    },
    'document.cookie="bbDatenstufe=stufe3; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9d2c1d25c86235dc271dab2c2b2e99b2"] === flag) {
                return;
            }
            document.cookie = "bbDatenstufe=stufe3; path=/;";
            Object.defineProperty(Window.prototype.toString, "9d2c1d25c86235dc271dab2c2b2e99b2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9d2c1d25c86235dc271dab2c2b2e99b2" due to: ' + error);
        }
    },
    'document.cookie="newsletter-signup=viewed; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0cee21006fa668615b19188582a82e34"] === flag) {
                return;
            }
            document.cookie = "newsletter-signup=viewed; path=/;";
            Object.defineProperty(Window.prototype.toString, "0cee21006fa668615b19188582a82e34", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0cee21006fa668615b19188582a82e34" due to: ' + error);
        }
    },
    'document.cookie="user_cookie_consent=essential; path=/";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["00c1162ebf92fa57d12e33c78f9ab876"] === flag) {
                return;
            }
            document.cookie = "user_cookie_consent=essential; path=/";
            Object.defineProperty(Window.prototype.toString, "00c1162ebf92fa57d12e33c78f9ab876", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "00c1162ebf92fa57d12e33c78f9ab876" due to: ' + error);
        }
    },
    'document.cookie="cookiebanner=closed; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["64b6a01f2a020125dffd898bafb19615"] === flag) {
                return;
            }
            document.cookie = "cookiebanner=closed; path=/;";
            Object.defineProperty(Window.prototype.toString, "64b6a01f2a020125dffd898bafb19615", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "64b6a01f2a020125dffd898bafb19615" due to: ' + error);
        }
    },
    'document.cookie=\'allow_cookies={"essential":"1","functional":{"all":"1"},"marketing":{"all":"0"}}; path=/;\';': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d61d4bd09c7716fa4e2f0235b892e274"] === flag) {
                return;
            }
            document.cookie = 'allow_cookies={"essential":"1","functional":{"all":"1"},"marketing":{"all":"0"}}; path=/;';
            Object.defineProperty(Window.prototype.toString, "d61d4bd09c7716fa4e2f0235b892e274", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d61d4bd09c7716fa4e2f0235b892e274" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("GPRD")&&(document.cookie="GPRD=128; path=/;",location.reload())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dcadc5846fed7b2f033974e6075c5fed"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("GPRD") && (document.cookie = "GPRD=128; path=/;", 
                location.reload());
            })();
            Object.defineProperty(Window.prototype.toString, "dcadc5846fed7b2f033974e6075c5fed", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dcadc5846fed7b2f033974e6075c5fed" due to: ' + error);
        }
    },
    'document.cookie="acceptRodoSie=hide; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d52e913bca352f639daec5b240f07513"] === flag) {
                return;
            }
            document.cookie = "acceptRodoSie=hide; path=/;";
            Object.defineProperty(Window.prototype.toString, "d52e913bca352f639daec5b240f07513", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d52e913bca352f639daec5b240f07513" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("cookie-functional")&&(document.cookie="cookie-functional=1; path=/;",document.cookie="popupek=1; path=/;",location.reload())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["23d2c0ec8e7bc0167527c1acc5bb5355"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("cookie-functional") && (document.cookie = "cookie-functional=1; path=/;", 
                document.cookie = "popupek=1; path=/;", location.reload());
            })();
            Object.defineProperty(Window.prototype.toString, "23d2c0ec8e7bc0167527c1acc5bb5355", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "23d2c0ec8e7bc0167527c1acc5bb5355" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("ccb")&&(document.cookie="ccb=facebookAccepted=0&googleAnalyticsAccepted=0&commonCookies=1; path=/;",location.reload())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f2aea7e44ba000bb61336ea707125580"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("ccb") && (document.cookie = "ccb=facebookAccepted=0&googleAnalyticsAccepted=0&commonCookies=1; path=/;", 
                location.reload());
            })();
            Object.defineProperty(Window.prototype.toString, "f2aea7e44ba000bb61336ea707125580", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f2aea7e44ba000bb61336ea707125580" due to: ' + error);
        }
    },
    "(function(){-1===document.cookie.indexOf(\"CookieConsent\")&&(document.cookie='CookieConsent=mandatory|osm; path=/;')})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f7a28a06b7a2a2e94cb072030083586d"] === flag) {
                return;
            }
            (function() {
                -1 === document.cookie.indexOf("CookieConsent") && (document.cookie = "CookieConsent=mandatory|osm; path=/;");
            })();
            Object.defineProperty(Window.prototype.toString, "f7a28a06b7a2a2e94cb072030083586d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f7a28a06b7a2a2e94cb072030083586d" due to: ' + error);
        }
    },
    '(function(){-1===document.cookie.indexOf("CookieControl")&&(document.cookie=\'CookieControl={"necessaryCookies":["wordpress_*","wordpress_logged_in_*","CookieControl"],"optionalCookies":{"functional_cookies":"accepted"}}\')})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["06ad4ed929d84e1793e13be6c4a31b38"] === flag) {
                return;
            }
            (function() {
                -1 === document.cookie.indexOf("CookieControl") && (document.cookie = 'CookieControl={"necessaryCookies":["wordpress_*","wordpress_logged_in_*","CookieControl"],"optionalCookies":{"functional_cookies":"accepted"}}');
            })();
            Object.defineProperty(Window.prototype.toString, "06ad4ed929d84e1793e13be6c4a31b38", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "06ad4ed929d84e1793e13be6c4a31b38" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("CONSENT")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="CONSENT=301212NN; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2f7b46464b7a29f89080a98e454b73a8"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("CONSENT")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "CONSENT=301212NN; path=/; expires=" + date.toUTCString(), location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "2f7b46464b7a29f89080a98e454b73a8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2f7b46464b7a29f89080a98e454b73a8" due to: ' + error);
        }
    },
    'document.cookie="dsgvo=basic; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c8f808a7e878f97d64286800484605d0"] === flag) {
                return;
            }
            document.cookie = "dsgvo=basic; path=/;";
            Object.defineProperty(Window.prototype.toString, "c8f808a7e878f97d64286800484605d0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c8f808a7e878f97d64286800484605d0" due to: ' + error);
        }
    },
    '(function(){if(!document.cookie.includes("CookieInformationConsent=")){var a=encodeURIComponent(\'{"website_uuid":"","timestamp":"","consent_url":"","consent_website":"elkjop.no","consent_domain":"elkjop.no","user_uid":"","consents_approved":["cookie_cat_necessary","cookie_cat_functional","cookie_cat_statistic"],"consents_denied":[],"user_agent":""}\');document.cookie="CookieInformationConsent="+a+"; path=/;"}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6051620f594fcf9636bd68b417cb0e5b"] === flag) {
                return;
            }
            (function() {
                if (!document.cookie.includes("CookieInformationConsent=")) {
                    var a = encodeURIComponent('{"website_uuid":"","timestamp":"","consent_url":"","consent_website":"elkjop.no","consent_domain":"elkjop.no","user_uid":"","consents_approved":["cookie_cat_necessary","cookie_cat_functional","cookie_cat_statistic"],"consents_denied":[],"user_agent":""}');
                    document.cookie = "CookieInformationConsent=" + a + "; path=/;";
                }
            })();
            Object.defineProperty(Window.prototype.toString, "6051620f594fcf9636bd68b417cb0e5b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6051620f594fcf9636bd68b417cb0e5b" due to: ' + error);
        }
    },
    '(function(){var a={timestamp:(new Date).getTime(),choice:2,version:"1.0"};document.cookie="mxp="+JSON.stringify(a)+"; path=/"})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4cdd2100913b4096462563fee10f5daa"] === flag) {
                return;
            }
            (function() {
                var a = {
                    timestamp: (new Date).getTime(),
                    choice: 2,
                    version: "1.0"
                };
                document.cookie = "mxp=" + JSON.stringify(a) + "; path=/";
            })();
            Object.defineProperty(Window.prototype.toString, "4cdd2100913b4096462563fee10f5daa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4cdd2100913b4096462563fee10f5daa" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("_chorus_privacy_consent")&&document.location.hostname.includes("bavarianfootballworks.com")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="_chorus_privacy_consent="+d+"; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["504f6b7ac8c9c857fc49addc0eb518fd"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("_chorus_privacy_consent") && document.location.hostname.includes("bavarianfootballworks.com")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "_chorus_privacy_consent=" + d + "; path=/; expires=" + date.toUTCString(), 
                    location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "504f6b7ac8c9c857fc49addc0eb518fd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "504f6b7ac8c9c857fc49addc0eb518fd" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("_chorus_privacy_consent")&&document.location.hostname.includes("goldenstateofmind.com")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="_chorus_privacy_consent="+d+"; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["62fd4c05daebdd55280e0b23009cc9aa"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("_chorus_privacy_consent") && document.location.hostname.includes("goldenstateofmind.com")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "_chorus_privacy_consent=" + d + "; path=/; expires=" + date.toUTCString(), 
                    location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "62fd4c05daebdd55280e0b23009cc9aa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "62fd4c05daebdd55280e0b23009cc9aa" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("_chorus_privacy_consent")&&document.location.hostname.includes("mmafighting.com")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="_chorus_privacy_consent="+d+"; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1a42ed4d4e4e6922f6fda946f00f4816"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("_chorus_privacy_consent") && document.location.hostname.includes("mmafighting.com")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "_chorus_privacy_consent=" + d + "; path=/; expires=" + date.toUTCString(), 
                    location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "1a42ed4d4e4e6922f6fda946f00f4816", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1a42ed4d4e4e6922f6fda946f00f4816" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("cms_cookies")&&(document.cookie="cms_cookies=6; path=/;",document.cookie="cms_cookies_saved=true; path=/;",location.reload())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c69eca07b387ee449234ff30bf5ce30e"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("cms_cookies") && (document.cookie = "cms_cookies=6; path=/;", 
                document.cookie = "cms_cookies_saved=true; path=/;", location.reload());
            })();
            Object.defineProperty(Window.prototype.toString, "c69eca07b387ee449234ff30bf5ce30e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c69eca07b387ee449234ff30bf5ce30e" due to: ' + error);
        }
    },
    'document.cookie="erlaubte_cookies=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fa4fb1ef63a96ddb1e25a44e7d9cfcfe"] === flag) {
                return;
            }
            document.cookie = "erlaubte_cookies=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "fa4fb1ef63a96ddb1e25a44e7d9cfcfe", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fa4fb1ef63a96ddb1e25a44e7d9cfcfe" due to: ' + error);
        }
    },
    'document.cookie="klaviano_police=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0625bed2a838c73f77094993c60b81cc"] === flag) {
                return;
            }
            document.cookie = "klaviano_police=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "0625bed2a838c73f77094993c60b81cc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0625bed2a838c73f77094993c60b81cc" due to: ' + error);
        }
    },
    'document.cookie=\'cookieConsent={"statistical":0,"personalization":0,"targeting":0}; path=/;\';': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f5b9b753afe5738b6731ee8166dcd891"] === flag) {
                return;
            }
            document.cookie = 'cookieConsent={"statistical":0,"personalization":0,"targeting":0}; path=/;';
            Object.defineProperty(Window.prototype.toString, "f5b9b753afe5738b6731ee8166dcd891", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f5b9b753afe5738b6731ee8166dcd891" due to: ' + error);
        }
    },
    'document.cookie="allowTracking=false; path=/;"; document.cookie="trackingSettings={%22ads%22:false%2C%22performance%22:false}; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["380715610fe9f7be74ee211b5df06559"] === flag) {
                return;
            }
            document.cookie = "allowTracking=false; path=/;";
            document.cookie = "trackingSettings={%22ads%22:false%2C%22performance%22:false}; path=/;";
            Object.defineProperty(Window.prototype.toString, "380715610fe9f7be74ee211b5df06559", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "380715610fe9f7be74ee211b5df06559" due to: ' + error);
        }
    },
    'document.cookie="userConsent=%7B%22marketing%22%3Afalse%2C%22version%22%3A%221%22%7D; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["967efe0b8b7e9d602d9c0ecdf20fc0cf"] === flag) {
                return;
            }
            document.cookie = "userConsent=%7B%22marketing%22%3Afalse%2C%22version%22%3A%221%22%7D; path=/;";
            Object.defineProperty(Window.prototype.toString, "967efe0b8b7e9d602d9c0ecdf20fc0cf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "967efe0b8b7e9d602d9c0ecdf20fc0cf" due to: ' + error);
        }
    },
    'document.cookie="sendgb_cookiewarning=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["190bccd6dfb21f403e2765c76b59110f"] === flag) {
                return;
            }
            document.cookie = "sendgb_cookiewarning=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "190bccd6dfb21f403e2765c76b59110f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "190bccd6dfb21f403e2765c76b59110f" due to: ' + error);
        }
    },
    'document.cookie="rodopop=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9ed981f72e0e18755c3a1ffe09bbd2ba"] === flag) {
                return;
            }
            document.cookie = "rodopop=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "9ed981f72e0e18755c3a1ffe09bbd2ba", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9ed981f72e0e18755c3a1ffe09bbd2ba" due to: ' + error);
        }
    },
    'document.cookie="gdprAccepted=true; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2c12d864ca83dfdf8bc7e1c395c19fef"] === flag) {
                return;
            }
            document.cookie = "gdprAccepted=true; path=/;";
            Object.defineProperty(Window.prototype.toString, "2c12d864ca83dfdf8bc7e1c395c19fef", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2c12d864ca83dfdf8bc7e1c395c19fef" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("BCPermissionLevel")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="BCPermissionLevel=PERSONAL; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["29fd06a58b635f18a26d675807f87ee7"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("BCPermissionLevel")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "BCPermissionLevel=PERSONAL; path=/; expires=" + date.toUTCString(), 
                    location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "29fd06a58b635f18a26d675807f87ee7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "29fd06a58b635f18a26d675807f87ee7" due to: ' + error);
        }
    },
    '(function(){if(-1==document.cookie.indexOf("_chorus_privacy_consent")){var c=new Date, d=c.getTime(), date = new Date(d + 365 * 60 * 60 * 1000); document.cookie="_chorus_privacy_consent="+d+"; path=/; expires=" + date.toUTCString(), location.reload()}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e7ea60642fa9501751b42fd2fe95103b"] === flag) {
                return;
            }
            (function() {
                if (-1 == document.cookie.indexOf("_chorus_privacy_consent")) {
                    var c = new Date, d = c.getTime(), date = new Date(d + 365 * 60 * 60 * 1e3);
                    document.cookie = "_chorus_privacy_consent=" + d + "; path=/; expires=" + date.toUTCString(), 
                    location.reload();
                }
            })();
            Object.defineProperty(Window.prototype.toString, "e7ea60642fa9501751b42fd2fe95103b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e7ea60642fa9501751b42fd2fe95103b" due to: ' + error);
        }
    },
    "!function(a,b,c,f,g,d,e){e=a[c]||a['WebKit'+c]||a['Moz'+c],e&&(d=new e(function(){b[f].contains(g)&&(b[f].remove(g),d.disconnect())}),d.observe(b,{attributes:!0,attributeFilter:['class']}))}(window,document.documentElement,'MutationObserver','classList','layer_cookie__visible');": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["61e6ac2655edf1e9450373c1fd849cd0"] === flag) {
                return;
            }
            !function(a, b, c, f, g, d, e) {
                e = a[c] || a["WebKit" + c] || a["Moz" + c], e && (d = new e((function() {
                    b[f].contains(g) && (b[f].remove(g), d.disconnect());
                })), d.observe(b, {
                    attributes: !0,
                    attributeFilter: [ "class" ]
                }));
            }(window, document.documentElement, "MutationObserver", "classList", "layer_cookie__visible");
            Object.defineProperty(Window.prototype.toString, "61e6ac2655edf1e9450373c1fd849cd0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "61e6ac2655edf1e9450373c1fd849cd0" due to: ' + error);
        }
    },
    'var cw;Object.defineProperty(window,"cookieWallSettings",{get:function(){return cw},set:function(a){document.cookie="rtlcookieconsent="+a.version.toString()+";";cw=a}});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b32831777a037cfe79fc602cdef09ab7"] === flag) {
                return;
            }
            var cw;
            Object.defineProperty(window, "cookieWallSettings", {
                get: function() {
                    return cw;
                },
                set: function(a) {
                    document.cookie = "rtlcookieconsent=" + a.version.toString() + ";";
                    cw = a;
                }
            });
            Object.defineProperty(Window.prototype.toString, "b32831777a037cfe79fc602cdef09ab7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b32831777a037cfe79fc602cdef09ab7" due to: ' + error);
        }
    },
    '(()=>{const e=document,t=new MutationObserver((()=>{const e=document.querySelector("#onetrust-accept-btn-handler");e&&(e.click(),t.disconnect())}));t.observe(e,{attributes:!0,childList:!0,subtree:!0}),setTimeout((()=>{t.disconnect()}),1e4)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["47331811da7c3ac0cbfb198884a715c9"] === flag) {
                return;
            }
            (() => {
                const e = document, t = new MutationObserver((() => {
                    const e = document.querySelector("#onetrust-accept-btn-handler");
                    e && (e.click(), t.disconnect());
                }));
                t.observe(e, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), setTimeout((() => {
                    t.disconnect();
                }), 1e4);
            })();
            Object.defineProperty(Window.prototype.toString, "47331811da7c3ac0cbfb198884a715c9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "47331811da7c3ac0cbfb198884a715c9" due to: ' + error);
        }
    },
    '(()=>{const e=document,t=new MutationObserver((()=>{const e=document.querySelector("#onetrust-reject-all-handler");e&&(e.click(),t.disconnect())}));t.observe(e,{attributes:!0,childList:!0,subtree:!0}),setTimeout((()=>{t.disconnect()}),1e4)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bc95dd84ae7c7899b8fef815cd1b8299"] === flag) {
                return;
            }
            (() => {
                const e = document, t = new MutationObserver((() => {
                    const e = document.querySelector("#onetrust-reject-all-handler");
                    e && (e.click(), t.disconnect());
                }));
                t.observe(e, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), setTimeout((() => {
                    t.disconnect();
                }), 1e4);
            })();
            Object.defineProperty(Window.prototype.toString, "bc95dd84ae7c7899b8fef815cd1b8299", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bc95dd84ae7c7899b8fef815cd1b8299" due to: ' + error);
        }
    },
    "(()=>{const t=document.documentElement,o=new MutationObserver((()=>{const t=document.querySelector('#mms-consent-portal-container button[data-test=\"pwa-consent-layer-deny-all\"]');if(t&&typeof t.click !== 'undefined'){t.click();}}));o.observe(t,{attributes:!0,childList:!0,subtree:!0})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["46276a98537643ca503c6ce94ff988f1"] === flag) {
                return;
            }
            (() => {
                const t = document.documentElement, o = new MutationObserver((() => {
                    const t = document.querySelector('#mms-consent-portal-container button[data-test="pwa-consent-layer-deny-all"]');
                    if (t && typeof t.click !== "undefined") {
                        t.click();
                    }
                }));
                o.observe(t, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "46276a98537643ca503c6ce94ff988f1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "46276a98537643ca503c6ce94ff988f1" due to: ' + error);
        }
    },
    '(()=>{if(!location.pathname.includes("/search"))return;const t={attributes:!0,childList:!0,subtree:!0},e=(t,e)=>{for(const n of t){const t=n.target.querySelector(".privacy-statement + .get-started-btn-wrapper > button.inline-explicit");t&&(t.click(),e.disconnect())}},n={apply:(n,o,c)=>{const r=Reflect.apply(n,o,c);if(o&&o.matches("cib-muid-consent")){new MutationObserver(e).observe(r,t)}return r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,n)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["36fc3a243e85a682dd99c26376ad6c57"] === flag) {
                return;
            }
            (() => {
                if (!location.pathname.includes("/search")) return;
                const t = {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }, e = (t, e) => {
                    for (const n of t) {
                        const t = n.target.querySelector(".privacy-statement + .get-started-btn-wrapper > button.inline-explicit");
                        t && (t.click(), e.disconnect());
                    }
                }, n = {
                    apply: (n, o, c) => {
                        const r = Reflect.apply(n, o, c);
                        if (o && o.matches("cib-muid-consent")) {
                            new MutationObserver(e).observe(r, t);
                        }
                        return r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, n);
            })();
            Object.defineProperty(Window.prototype.toString, "36fc3a243e85a682dd99c26376ad6c57", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "36fc3a243e85a682dd99c26376ad6c57" due to: ' + error);
        }
    },
    '(()=>{let t,e=!1;const o=new MutationObserver(((e,o)=>{const c=t?.querySelector("button.uc-deny-button");c&&(c.click(),o.disconnect())})),c={apply:(c,n,p)=>{const r=Reflect.apply(c,n,p);return!e&&n.matches("#usercentrics-cmp-ui")&&(e=!0,t=r),o.observe(r,{subtree:!0,childList:!0}),r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7d2a68c5db67d5c0b987bcc67516ef8e"] === flag) {
                return;
            }
            (() => {
                let t, e = !1;
                const o = new MutationObserver(((e, o) => {
                    const c = t?.querySelector("button.uc-deny-button");
                    c && (c.click(), o.disconnect());
                })), c = {
                    apply: (c, n, p) => {
                        const r = Reflect.apply(c, n, p);
                        return !e && n.matches("#usercentrics-cmp-ui") && (e = !0, t = r), o.observe(r, {
                            subtree: !0,
                            childList: !0
                        }), r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, c);
            })();
            Object.defineProperty(Window.prototype.toString, "7d2a68c5db67d5c0b987bcc67516ef8e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7d2a68c5db67d5c0b987bcc67516ef8e" due to: ' + error);
        }
    },
    '(()=>{let t,e=!1;const o=new MutationObserver(((e,o)=>{const c=t?.querySelector(\'button[data-testid="uc-accept-all-button"]\');c&&(c.click(),o.disconnect())})),c={apply:(c,n,p)=>{const r=Reflect.apply(c,n,p);return!e&&n.matches("#usercentrics-root")&&(e=!0,t=r),o.observe(r,{subtree:!0,childList:!0}),r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c3fa9bec7cb9559b8965f87071a37fc6"] === flag) {
                return;
            }
            (() => {
                let t, e = !1;
                const o = new MutationObserver(((e, o) => {
                    const c = t?.querySelector('button[data-testid="uc-accept-all-button"]');
                    c && (c.click(), o.disconnect());
                })), c = {
                    apply: (c, n, p) => {
                        const r = Reflect.apply(c, n, p);
                        return !e && n.matches("#usercentrics-root") && (e = !0, t = r), o.observe(r, {
                            subtree: !0,
                            childList: !0
                        }), r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, c);
            })();
            Object.defineProperty(Window.prototype.toString, "c3fa9bec7cb9559b8965f87071a37fc6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c3fa9bec7cb9559b8965f87071a37fc6" due to: ' + error);
        }
    },
    '(()=>{let t,e=!1;const o=new MutationObserver(((e,o)=>{const c=t?.querySelector(\'button[data-testid="uc-deny-all-button"]\');c&&(c.click(),o.disconnect())})),c={apply:(c,n,p)=>{const r=Reflect.apply(c,n,p);return!e&&n.matches("#usercentrics-root")&&(e=!0,t=r),o.observe(r,{subtree:!0,childList:!0}),r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7924c03c0efcdc958073d4f764522f33"] === flag) {
                return;
            }
            (() => {
                let t, e = !1;
                const o = new MutationObserver(((e, o) => {
                    const c = t?.querySelector('button[data-testid="uc-deny-all-button"]');
                    c && (c.click(), o.disconnect());
                })), c = {
                    apply: (c, n, p) => {
                        const r = Reflect.apply(c, n, p);
                        return !e && n.matches("#usercentrics-root") && (e = !0, t = r), o.observe(r, {
                            subtree: !0,
                            childList: !0
                        }), r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, c);
            })();
            Object.defineProperty(Window.prototype.toString, "7924c03c0efcdc958073d4f764522f33", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7924c03c0efcdc958073d4f764522f33" due to: ' + error);
        }
    },
    '(()=>{let t,e=!1;const o=new MutationObserver(((e,o)=>{const c=t?.querySelector("#cmpbox a.cmptxt_btn_yes");c&&(c.click(),o.disconnect())})),c={apply:(c,n,p)=>{const r=Reflect.apply(c,n,p);return!e&&n.matches("#cmpwrapper")&&(e=!0,t=r),o.observe(r,{subtree:!0,childList:!0}),r}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9c5d8cfc5b5533f486ab90d24d15e42c"] === flag) {
                return;
            }
            (() => {
                let t, e = !1;
                const o = new MutationObserver(((e, o) => {
                    const c = t?.querySelector("#cmpbox a.cmptxt_btn_yes");
                    c && (c.click(), o.disconnect());
                })), c = {
                    apply: (c, n, p) => {
                        const r = Reflect.apply(c, n, p);
                        return !e && n.matches("#cmpwrapper") && (e = !0, t = r), o.observe(r, {
                            subtree: !0,
                            childList: !0
                        }), r;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, c);
            })();
            Object.defineProperty(Window.prototype.toString, "9c5d8cfc5b5533f486ab90d24d15e42c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9c5d8cfc5b5533f486ab90d24d15e42c" due to: ' + error);
        }
    },
    '(function(o){function a(a){return{get:function(){return a},set:b}}function b(){}function c(){throw"Adguard: stopped a script execution.";}var d={},e=a(function(a){a(!1)}),f={},g=EventTarget.prototype.addEventListener;o(d,{spid_control_callback:a(b),content_control_callback:a(b),vid_control_callback:a(b)});o(f,{config:a(d),_setSpKey:{get:c,set:c},checkState:e,isAdBlocking:e,getSafeUri:a(function(a){return a}),pageChange:a(b),setupSmartBeacons:a(b)});Object.defineProperty(window,"_sp_",a(f));EventTarget.prototype.addEventListener=function(a){"sp.blocking"!=a&&"sp.not_blocking"!=a&&g.apply(this,arguments)}})(Object.defineProperties);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a1233e00aac3b1e9bd547e64ca938543"] === flag) {
                return;
            }
            (function(o) {
                function a(a) {
                    return {
                        get: function() {
                            return a;
                        },
                        set: b
                    };
                }
                function b() {}
                function c() {
                    throw "Adguard: stopped a script execution.";
                }
                var d = {}, e = a((function(a) {
                    a(!1);
                })), f = {}, g = EventTarget.prototype.addEventListener;
                o(d, {
                    spid_control_callback: a(b),
                    content_control_callback: a(b),
                    vid_control_callback: a(b)
                });
                o(f, {
                    config: a(d),
                    _setSpKey: {
                        get: c,
                        set: c
                    },
                    checkState: e,
                    isAdBlocking: e,
                    getSafeUri: a((function(a) {
                        return a;
                    })),
                    pageChange: a(b),
                    setupSmartBeacons: a(b)
                });
                Object.defineProperty(window, "_sp_", a(f));
                EventTarget.prototype.addEventListener = function(a) {
                    "sp.blocking" != a && "sp.not_blocking" != a && g.apply(this, arguments);
                };
            })(Object.defineProperties);
            Object.defineProperty(Window.prototype.toString, "a1233e00aac3b1e9bd547e64ca938543", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a1233e00aac3b1e9bd547e64ca938543" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,l)=>{try{const e=(new Error).stack;if(e?.includes?.("initAdBlockDetection")&&4===l[0]?.length)return Promise.resolve()}catch(e){}return Reflect.apply(e,t,l)}};window.Promise.allSettled=new Proxy(window.Promise.allSettled,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c2e008a1d6491e8fa4125943a91eb8b8"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, l) => {
                        try {
                            const e = (new Error).stack;
                            if (e?.includes?.("initAdBlockDetection") && 4 === l[0]?.length) return Promise.resolve();
                        } catch (e) {}
                        return Reflect.apply(e, t, l);
                    }
                };
                window.Promise.allSettled = new Proxy(window.Promise.allSettled, e);
            })();
            Object.defineProperty(Window.prototype.toString, "c2e008a1d6491e8fa4125943a91eb8b8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c2e008a1d6491e8fa4125943a91eb8b8" due to: ' + error);
        }
    },
    '(()=>{const d={getUserConsentStatusForVendor:()=>!0};window.didomiOnReady=window.didomiOnReady||[],window.didomiOnReady.push=n=>{"function"==typeof n&&n(d)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4f42a63fdc8f353f50712cbd342cc7be"] === flag) {
                return;
            }
            (() => {
                const d = {
                    getUserConsentStatusForVendor: () => !0
                };
                window.didomiOnReady = window.didomiOnReady || [], window.didomiOnReady.push = n => {
                    "function" == typeof n && n(d);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "4f42a63fdc8f353f50712cbd342cc7be", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4f42a63fdc8f353f50712cbd342cc7be" due to: ' + error);
        }
    },
    '(()=>{const e={apply:async(e,t,a)=>{if(a[0]&&a[0]?.match(/adsbygoogle|doubleclick|googlesyndication|static\\.cloudflareinsights\\.com\\/beacon\\.min\\.js/)){const e=(e="{}",t="",a="opaque")=>{const n=new Response(e,{statusText:"OK"}),o=String((s=50800,r=50900,Math.floor(Math.random()*(r-s+1)+s)));var s,r;return n.headers.set("Content-Length",o),Object.defineProperties(n,{type:{value:a},status:{value:0},statusText:{value:""},url:{value:""}}),Promise.resolve(n)};return e("{}",a[0])}return Reflect.apply(e,t,a)}};window.fetch=new Proxy(window.fetch,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9dbd26c8d0d4dcb61410c72cac73374e"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: async (e, t, a) => {
                        if (a[0] && a[0]?.match(/adsbygoogle|doubleclick|googlesyndication|static\.cloudflareinsights\.com\/beacon\.min\.js/)) {
                            const e = (e = "{}", t = "", a = "opaque") => {
                                const n = new Response(e, {
                                    statusText: "OK"
                                }), o = String((s = 50800, r = 50900, Math.floor(Math.random() * (r - s + 1) + s)));
                                var s, r;
                                return n.headers.set("Content-Length", o), Object.defineProperties(n, {
                                    type: {
                                        value: a
                                    },
                                    status: {
                                        value: 0
                                    },
                                    statusText: {
                                        value: ""
                                    },
                                    url: {
                                        value: ""
                                    }
                                }), Promise.resolve(n);
                            };
                            return e("{}", a[0]);
                        }
                        return Reflect.apply(e, t, a);
                    }
                };
                window.fetch = new Proxy(window.fetch, e);
            })();
            Object.defineProperty(Window.prototype.toString, "9dbd26c8d0d4dcb61410c72cac73374e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9dbd26c8d0d4dcb61410c72cac73374e" due to: ' + error);
        }
    },
    "window.ad_allowed = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["049921132ffe411b4692a70bec90d335"] === flag) {
                return;
            }
            window.ad_allowed = true;
            Object.defineProperty(Window.prototype.toString, "049921132ffe411b4692a70bec90d335", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "049921132ffe411b4692a70bec90d335" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/google_ads_frame/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["47f456fa4a14a6df26efb37ac4b35e9a"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/google_ads_frame/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "47f456fa4a14a6df26efb37ac4b35e9a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "47f456fa4a14a6df26efb37ac4b35e9a" due to: ' + error);
        }
    },
    'var _st = window.setTimeout; window.setTimeout = function(a, b) { if(!/var ad = document\\.querySelector\\("ins\\.adsbygoogle"\\);/.test(a)){ _st(a,b);}};': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8468c20094b47b4c6230a90bb0cf2d54"] === flag) {
                return;
            }
            var _st = window.setTimeout;
            window.setTimeout = function(a, b) {
                if (!/var ad = document\.querySelector\("ins\.adsbygoogle"\);/.test(a)) {
                    _st(a, b);
                }
            };
            Object.defineProperty(Window.prototype.toString, "8468c20094b47b4c6230a90bb0cf2d54", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8468c20094b47b4c6230a90bb0cf2d54" due to: ' + error);
        }
    },
    "document.avp_ready = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1cd8368bac9abff3d844c605b628fee9"] === flag) {
                return;
            }
            document.avp_ready = 1;
            Object.defineProperty(Window.prototype.toString, "1cd8368bac9abff3d844c605b628fee9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1cd8368bac9abff3d844c605b628fee9" due to: ' + error);
        }
    },
    "window.ADTECH = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e42f31b21c3855d599c00a3f8701ede6"] === flag) {
                return;
            }
            window.ADTECH = function() {};
            Object.defineProperty(Window.prototype.toString, "e42f31b21c3855d599c00a3f8701ede6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e42f31b21c3855d599c00a3f8701ede6" due to: ' + error);
        }
    },
    "fuckAdBlock = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5c3f48e3f24ff8813da9609a53a72433"] === flag) {
                return;
            }
            fuckAdBlock = function() {};
            Object.defineProperty(Window.prototype.toString, "5c3f48e3f24ff8813da9609a53a72433", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5c3f48e3f24ff8813da9609a53a72433" due to: ' + error);
        }
    },
    "window.IM = [1,2,3];": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6e0b841e576ac763f81d5c219813906b"] === flag) {
                return;
            }
            window.IM = [ 1, 2, 3 ];
            Object.defineProperty(Window.prototype.toString, "6e0b841e576ac763f81d5c219813906b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6e0b841e576ac763f81d5c219813906b" due to: ' + error);
        }
    },
    "window.google_jobrunner = function() { };": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c155982f45f07c347701b45fce31f5d3"] === flag) {
                return;
            }
            window.google_jobrunner = function() {};
            Object.defineProperty(Window.prototype.toString, "c155982f45f07c347701b45fce31f5d3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c155982f45f07c347701b45fce31f5d3" due to: ' + error);
        }
    },
    "(function(){var c=window.setTimeout;window.setTimeout=function(f,g){return !Number.isNaN(g)&&/\\$\\('#l'\\+|#linkdiv/.test(f.toString())&&(g*=0.01),c.apply(this,arguments)}.bind(window)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["009922e6198163d89edac4a47ce341c7"] === flag) {
                return;
            }
            (function() {
                var c = window.setTimeout;
                window.setTimeout = function(f, g) {
                    return !Number.isNaN(g) && /\$\('#l'\+|#linkdiv/.test(f.toString()) && (g *= .01), 
                    c.apply(this, arguments);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "009922e6198163d89edac4a47ce341c7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "009922e6198163d89edac4a47ce341c7" due to: ' + error);
        }
    },
    "window.blockAdBlock = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7b0fe49ca4878b71af2e77dfe4259f5a"] === flag) {
                return;
            }
            window.blockAdBlock = function() {};
            Object.defineProperty(Window.prototype.toString, "7b0fe49ca4878b71af2e77dfe4259f5a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7b0fe49ca4878b71af2e77dfe4259f5a" due to: ' + error);
        }
    },
    '(()=>{let t;const e={apply:(e,o,c)=>{try{const r=c[0],l=c[1];let y;try{y=t?.getNitroStateValue()}catch{return Reflect.apply(e,o,c)}if(y&&"object"==typeof r&&null!==r&&1===Object.keys(r).length&&"number"==typeof Object.values(r)[0]&&"object"==typeof l&&null!==l&&(n=l,Object.values(n).some((t=>{if("function"==typeof t&&t.toString().includes("]:!0}"))return!0})))){const[t]=Object.keys(r);void 0!==t&&Reflect.set(r,t,y+1)}}catch(t){}var n;return Reflect.apply(e,o,c)}};window.Object.is=new Proxy(window.Object.is,e);const o={apply:(e,o,c)=>{try{const e=c[0],o=c[1];!t&&e&&o&&"object"==typeof e&&"Module"===e[Symbol.toStringTag]&&"string"==typeof o&&"NitroScript"===o&&(t=e)}catch(t){}return Reflect.apply(e,o,c)}};window.Object.defineProperty=new Proxy(window.Object.defineProperty,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b990af6625716f6d6fe45948d5a5b4fa"] === flag) {
                return;
            }
            (() => {
                let t;
                const e = {
                    apply: (e, o, c) => {
                        try {
                            const r = c[0], l = c[1];
                            let y;
                            try {
                                y = t?.getNitroStateValue();
                            } catch {
                                return Reflect.apply(e, o, c);
                            }
                            if (y && "object" == typeof r && null !== r && 1 === Object.keys(r).length && "number" == typeof Object.values(r)[0] && "object" == typeof l && null !== l && (n = l, 
                            Object.values(n).some((t => {
                                if ("function" == typeof t && t.toString().includes("]:!0}")) return !0;
                            })))) {
                                const [t] = Object.keys(r);
                                void 0 !== t && Reflect.set(r, t, y + 1);
                            }
                        } catch (t) {}
                        var n;
                        return Reflect.apply(e, o, c);
                    }
                };
                window.Object.is = new Proxy(window.Object.is, e);
                const o = {
                    apply: (e, o, c) => {
                        try {
                            const e = c[0], o = c[1];
                            !t && e && o && "object" == typeof e && "Module" === e[Symbol.toStringTag] && "string" == typeof o && "NitroScript" === o && (t = e);
                        } catch (t) {}
                        return Reflect.apply(e, o, c);
                    }
                };
                window.Object.defineProperty = new Proxy(window.Object.defineProperty, o);
            })();
            Object.defineProperty(Window.prototype.toString, "b990af6625716f6d6fe45948d5a5b4fa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b990af6625716f6d6fe45948d5a5b4fa" due to: ' + error);
        }
    },
    '!function(){const e={apply:(e,t,o)=>{const i=o[1];if(!i||"object"!=typeof i.QiyiPlayerProphetData)return Reflect.apply(e,t,o)}};window.Object.defineProperties=new Proxy(window.Object.defineProperties,e)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["545a0289c2a1afd8dd9039c82074c2b7"] === flag) {
                return;
            }
            !function() {
                const e = {
                    apply: (e, t, o) => {
                        const i = o[1];
                        if (!i || "object" != typeof i.QiyiPlayerProphetData) return Reflect.apply(e, t, o);
                    }
                };
                window.Object.defineProperties = new Proxy(window.Object.defineProperties, e);
            }();
            Object.defineProperty(Window.prototype.toString, "545a0289c2a1afd8dd9039c82074c2b7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "545a0289c2a1afd8dd9039c82074c2b7" due to: ' + error);
        }
    },
    "!function(){const s={apply:(c,e,n)=>(n[0]?.adSlots&&(n[0].adSlots=[]),n[1]?.success&&(n[1].success=new Proxy(n[1].success,s)),Reflect.apply(c,e,n))};window.Object.assign=new Proxy(window.Object.assign,s)}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7c9eb641391ed7a82e455b87f3672582"] === flag) {
                return;
            }
            !function() {
                const s = {
                    apply: (c, e, n) => (n[0]?.adSlots && (n[0].adSlots = []), n[1]?.success && (n[1].success = new Proxy(n[1].success, s)), 
                    Reflect.apply(c, e, n))
                };
                window.Object.assign = new Proxy(window.Object.assign, s);
            }();
            Object.defineProperty(Window.prototype.toString, "7c9eb641391ed7a82e455b87f3672582", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7c9eb641391ed7a82e455b87f3672582" due to: ' + error);
        }
    },
    "\"use strict\"; window.MutationObserver = new Proxy(window.MutationObserver, { construct(Target, Args) { let Stringified = Args[0].toString(); if (Stringified.includes('cs:') && Stringified.includes('gl:') && Stringified.includes('ne:') && Stringified.includes('dg:')) { return Reflect.construct(Target, [() => {}]); } return Reflect.construct(Target, Args); } });": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c287d35369268f7ace0d483cc8ca2199"] === flag) {
                return;
            }
            "use strict";
            window.MutationObserver = new Proxy(window.MutationObserver, {
                construct(Target, Args) {
                    let Stringified = Args[0].toString();
                    if (Stringified.includes("cs:") && Stringified.includes("gl:") && Stringified.includes("ne:") && Stringified.includes("dg:")) {
                        return Reflect.construct(Target, [ () => {} ]);
                    }
                    return Reflect.construct(Target, Args);
                }
            });
            Object.defineProperty(Window.prototype.toString, "c287d35369268f7ace0d483cc8ca2199", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c287d35369268f7ace0d483cc8ca2199" due to: ' + error);
        }
    },
    '(()=>{const e=document.documentElement;new MutationObserver((()=>{const e=document.querySelector(\'body > div[role="dialog"].neon-border-purple > p.text-center + button.neon-button-purple\');e&&e.textContent.includes("I Understand")&&e.click()})).observe(e,{attributes:!0,childList:!0,subtree:!0})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7ff1ec00ee1e83864c8bcaba82126a50"] === flag) {
                return;
            }
            (() => {
                const e = document.documentElement;
                new MutationObserver((() => {
                    const e = document.querySelector('body > div[role="dialog"].neon-border-purple > p.text-center + button.neon-button-purple');
                    e && e.textContent.includes("I Understand") && e.click();
                })).observe(e, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "7ff1ec00ee1e83864c8bcaba82126a50", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7ff1ec00ee1e83864c8bcaba82126a50" due to: ' + error);
        }
    },
    'document.cookie="popup=9999999999999; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dd5fb4eeed8b7505e5767b7045cb23cc"] === flag) {
                return;
            }
            document.cookie = "popup=9999999999999; path=/;";
            Object.defineProperty(Window.prototype.toString, "dd5fb4eeed8b7505e5767b7045cb23cc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dd5fb4eeed8b7505e5767b7045cb23cc" due to: ' + error);
        }
    },
    'document.cookie="overlay-geschenk=donotshowfor7days; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c244d6b503d07944e92dae676220ac14"] === flag) {
                return;
            }
            document.cookie = "overlay-geschenk=donotshowfor7days; path=/;";
            Object.defineProperty(Window.prototype.toString, "c244d6b503d07944e92dae676220ac14", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c244d6b503d07944e92dae676220ac14" due to: ' + error);
        }
    },
    'document.cookie="popupSubscription=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["07e3ab9b26da8896b57fb83067364723"] === flag) {
                return;
            }
            document.cookie = "popupSubscription=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "07e3ab9b26da8896b57fb83067364723", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "07e3ab9b26da8896b57fb83067364723" due to: ' + error);
        }
    },
    'document.cookie="hide_footer_login_layer=T; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6610b2172699f352e936bdda56179645"] === flag) {
                return;
            }
            document.cookie = "hide_footer_login_layer=T; path=/;";
            Object.defineProperty(Window.prototype.toString, "6610b2172699f352e936bdda56179645", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6610b2172699f352e936bdda56179645" due to: ' + error);
        }
    },
    "(()=>{const t=document,e=new MutationObserver((()=>{const t=document.querySelector('fluent-button[data-test-id=\"continue-reading-button\"]');t&&(t.click(),e.disconnect())}));e.observe(t,{attributes:!0,childList:!0,subtree:!0}),setTimeout((()=>{e.disconnect()}),1e4)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b74fcea5833a534a963b7d4a15fb3a8f"] === flag) {
                return;
            }
            (() => {
                const t = document, e = new MutationObserver((() => {
                    const t = document.querySelector('fluent-button[data-test-id="continue-reading-button"]');
                    t && (t.click(), e.disconnect());
                }));
                e.observe(t, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), setTimeout((() => {
                    e.disconnect();
                }), 1e4);
            })();
            Object.defineProperty(Window.prototype.toString, "b74fcea5833a534a963b7d4a15fb3a8f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b74fcea5833a534a963b7d4a15fb3a8f" due to: ' + error);
        }
    },
    '!function(){const t={apply:(t,e,n)=>{if(n[0]&&"function"==typeof n[0])try{if(n[0].toString().includes("LOGIN_FORCE_TIME"))return}catch(t){console.trace(t)}return Reflect.apply(t,e,n)}},e=new Proxy(window.setTimeout,t);Object.defineProperty(window,"setTimeout",{set:function(){},get:function(){return e}})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["af15a185bba3bf6f247f74549465a83e"] === flag) {
                return;
            }
            !function() {
                const t = {
                    apply: (t, e, n) => {
                        if (n[0] && "function" == typeof n[0]) try {
                            if (n[0].toString().includes("LOGIN_FORCE_TIME")) return;
                        } catch (t) {
                            console.trace(t);
                        }
                        return Reflect.apply(t, e, n);
                    }
                }, e = new Proxy(window.setTimeout, t);
                Object.defineProperty(window, "setTimeout", {
                    set: function() {},
                    get: function() {
                        return e;
                    }
                });
            }();
            Object.defineProperty(Window.prototype.toString, "af15a185bba3bf6f247f74549465a83e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "af15a185bba3bf6f247f74549465a83e" due to: ' + error);
        }
    },
    "(function(){window.setTimeout=new Proxy(window.setTimeout,{apply:(a,b,c)=>c&&c[0]&&/SkipMsg\\(\\)/.test(c[0].toString())&&c[1]?(c[1]=1,Reflect.apply(a,b,c)):Reflect.apply(a,b,c)})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ddae51deac37af19fec2771965b890e1"] === flag) {
                return;
            }
            (function() {
                window.setTimeout = new Proxy(window.setTimeout, {
                    apply: (a, b, c) => c && c[0] && /SkipMsg\(\)/.test(c[0].toString()) && c[1] ? (c[1] = 1, 
                    Reflect.apply(a, b, c)) : Reflect.apply(a, b, c)
                });
            })();
            Object.defineProperty(Window.prototype.toString, "ddae51deac37af19fec2771965b890e1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ddae51deac37af19fec2771965b890e1" due to: ' + error);
        }
    },
    '(function(){var a=new Date,b=a.getTime();document.cookie="ips4_bacalltoactionpopup="+b})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["21f664952df8e1eaf1fb9a92db8b174e"] === flag) {
                return;
            }
            (function() {
                var a = new Date, b = a.getTime();
                document.cookie = "ips4_bacalltoactionpopup=" + b;
            })();
            Object.defineProperty(Window.prototype.toString, "21f664952df8e1eaf1fb9a92db8b174e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "21f664952df8e1eaf1fb9a92db8b174e" due to: ' + error);
        }
    },
    "if (window.PushManager) { window.PushManager.prototype.subscribe = function () { return { then: function (func) { } }; }; }": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f271f5a04b96c738d8491cb877889952"] === flag) {
                return;
            }
            if (window.PushManager) {
                window.PushManager.prototype.subscribe = function() {
                    return {
                        then: function(func) {}
                    };
                };
            }
            Object.defineProperty(Window.prototype.toString, "f271f5a04b96c738d8491cb877889952", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f271f5a04b96c738d8491cb877889952" due to: ' + error);
        }
    },
    '(()=>{const t={construct:(t,e,n)=>{const r=e[0],o=r?.toString(),c=o?.includes("e[0].intersectionRatio");return c&&(e[0]=()=>{}),Reflect.construct(t,e,n)}};window.IntersectionObserver=new Proxy(window.IntersectionObserver,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c12b1283487b21a0e823718579c18ede"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, e, n) => {
                        const r = e[0], o = r?.toString(), c = o?.includes("e[0].intersectionRatio");
                        return c && (e[0] = () => {}), Reflect.construct(t, e, n);
                    }
                };
                window.IntersectionObserver = new Proxy(window.IntersectionObserver, t);
            })();
            Object.defineProperty(Window.prototype.toString, "c12b1283487b21a0e823718579c18ede", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c12b1283487b21a0e823718579c18ede" due to: ' + error);
        }
    },
    '(function(){var b=document.addEventListener;document.addEventListener=function(c,a,d){if(a&&-1==a.toString().indexOf("adsBlocked"))return b(c,a,d)}.bind(window)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["62c4837e2d6ffab7f90fde5590cc73ab"] === flag) {
                return;
            }
            (function() {
                var b = document.addEventListener;
                document.addEventListener = function(c, a, d) {
                    if (a && -1 == a.toString().indexOf("adsBlocked")) return b(c, a, d);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "62c4837e2d6ffab7f90fde5590cc73ab", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "62c4837e2d6ffab7f90fde5590cc73ab" due to: ' + error);
        }
    },
    '(function(b){Object.defineProperty(Element.prototype,"innerHTML",{get:function(){return b.get.call(this)},set:function(a){/^(?:<([abisuq]) id="[^"]*"><\\/\\1>)*$/.test(a)||b.set.call(this,a)},enumerable:!0,configurable:!0})})(Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML"));': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a45ed61db8e971a6cfde1b21ffc65573"] === flag) {
                return;
            }
            (function(b) {
                Object.defineProperty(Element.prototype, "innerHTML", {
                    get: function() {
                        return b.get.call(this);
                    },
                    set: function(a) {
                        /^(?:<([abisuq]) id="[^"]*"><\/\1>)*$/.test(a) || b.set.call(this, a);
                    },
                    enumerable: !0,
                    configurable: !0
                });
            })(Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML"));
            Object.defineProperty(Window.prototype.toString, "a45ed61db8e971a6cfde1b21ffc65573", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a45ed61db8e971a6cfde1b21ffc65573" due to: ' + error);
        }
    },
    '(function(a){Object.defineProperty(window,"upManager",{get:function(){return{push:a,register:a,fireNow:a,start:a}},set:function(a){if(!(a instanceof Error))throw Error();}})})(function(){});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e7cde92d3ed85b2159f3eefcc50b7ab6"] === flag) {
                return;
            }
            (function(a) {
                Object.defineProperty(window, "upManager", {
                    get: function() {
                        return {
                            push: a,
                            register: a,
                            fireNow: a,
                            start: a
                        };
                    },
                    set: function(a) {
                        if (!(a instanceof Error)) throw Error();
                    }
                });
            })((function() {}));
            Object.defineProperty(Window.prototype.toString, "e7cde92d3ed85b2159f3eefcc50b7ab6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e7cde92d3ed85b2159f3eefcc50b7ab6" due to: ' + error);
        }
    },
    '(function(){var b=XMLHttpRequest.prototype.open,c=/[/.@](piguiqproxy\\.com|rcdn\\.pro|amgload\\.net|dsn-fishki\\.ru|v6t39t\\.ru|greencuttlefish\\.com|rgy1wk\\.ru|vt4dlx\\.ru|d38dub\\.ru)[:/]/i;XMLHttpRequest.prototype.open=function(d,a){if("GET"===d&&c.test(a))this.send=function(){return null},this.setRequestHeader=function(){return null},console.log("AG has blocked request: ",a);else return b.apply(this,arguments)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8d3f556a4543374ea8319bc03583025f"] === flag) {
                return;
            }
            (function() {
                var b = XMLHttpRequest.prototype.open, c = /[/.@](piguiqproxy\.com|rcdn\.pro|amgload\.net|dsn-fishki\.ru|v6t39t\.ru|greencuttlefish\.com|rgy1wk\.ru|vt4dlx\.ru|d38dub\.ru)[:/]/i;
                XMLHttpRequest.prototype.open = function(d, a) {
                    if ("GET" === d && c.test(a)) this.send = function() {
                        return null;
                    }, this.setRequestHeader = function() {
                        return null;
                    }, console.log("AG has blocked request: ", a); else return b.apply(this, arguments);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8d3f556a4543374ea8319bc03583025f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8d3f556a4543374ea8319bc03583025f" due to: ' + error);
        }
    },
    '(function(){var b=XMLHttpRequest.prototype.open,c=/[/.@](piguiqproxy\\.com|rcdn\\.pro|amgload\\.net|dsn-fishki\\.ru|v6t39t\\.ru|greencuttlefish\\.com|rgy1wk\\.ru|vt4dlx\\.ru|d38dub\\.ru|csp-oz66pp\\.ru|ok9ydq\\.ru|kingoablc\\.com)[:/]/i;XMLHttpRequest.prototype.open=function(d,a){if("GET"===d&&c.test(a))this.send=function(){return null},this.setRequestHeader=function(){return null},console.log("AG has blocked request: ",a);else return b.apply(this,arguments)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["22514194ad8441cc56e68716b1f75f69"] === flag) {
                return;
            }
            (function() {
                var b = XMLHttpRequest.prototype.open, c = /[/.@](piguiqproxy\.com|rcdn\.pro|amgload\.net|dsn-fishki\.ru|v6t39t\.ru|greencuttlefish\.com|rgy1wk\.ru|vt4dlx\.ru|d38dub\.ru|csp-oz66pp\.ru|ok9ydq\.ru|kingoablc\.com)[:/]/i;
                XMLHttpRequest.prototype.open = function(d, a) {
                    if ("GET" === d && c.test(a)) this.send = function() {
                        return null;
                    }, this.setRequestHeader = function() {
                        return null;
                    }, console.log("AG has blocked request: ", a); else return b.apply(this, arguments);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "22514194ad8441cc56e68716b1f75f69", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "22514194ad8441cc56e68716b1f75f69" due to: ' + error);
        }
    },
    '(()=>{const o={apply:(o,t,e)=>{const n=e[0];return"boolean"==typeof n&&!0===n&&(e[0]=!1),Reflect.apply(o,t,e)}},t={apply:(t,e,n)=>{try{const t=n[0];"function"==typeof t&&t.toString().includes("blockAdblock")&&(n[0]=new Proxy(n[0],o))}catch(o){}return Reflect.apply(t,e,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4c8eba62b8ceb037ed86696de9d3d264"] === flag) {
                return;
            }
            (() => {
                const o = {
                    apply: (o, t, e) => {
                        const n = e[0];
                        return "boolean" == typeof n && !0 === n && (e[0] = !1), Reflect.apply(o, t, e);
                    }
                }, t = {
                    apply: (t, e, n) => {
                        try {
                            const t = n[0];
                            "function" == typeof t && t.toString().includes("blockAdblock") && (n[0] = new Proxy(n[0], o));
                        } catch (o) {}
                        return Reflect.apply(t, e, n);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, t);
            })();
            Object.defineProperty(Window.prototype.toString, "4c8eba62b8ceb037ed86696de9d3d264", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4c8eba62b8ceb037ed86696de9d3d264" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,n)=>{const o=Reflect.apply(e,t,n);try{o instanceof HTMLIFrameElement&&""===o.src&&o.contentWindow&&(o.contentWindow.fetch=window.fetch,o.contentWindow.getComputedStyle=window.getComputedStyle)}catch(e){}return o}};Node.prototype.appendChild=new Proxy(Node.prototype.appendChild,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["67bc47480648ae9a1b1c43e313bc2166"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, n) => {
                        const o = Reflect.apply(e, t, n);
                        try {
                            o instanceof HTMLIFrameElement && "" === o.src && o.contentWindow && (o.contentWindow.fetch = window.fetch, 
                            o.contentWindow.getComputedStyle = window.getComputedStyle);
                        } catch (e) {}
                        return o;
                    }
                };
                Node.prototype.appendChild = new Proxy(Node.prototype.appendChild, e);
            })();
            Object.defineProperty(Window.prototype.toString, "67bc47480648ae9a1b1c43e313bc2166", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "67bc47480648ae9a1b1c43e313bc2166" due to: ' + error);
        }
    },
    '(()=>{const e=()=>{},t=function(){return this},n=()=>null,o=()=>[],r=new Map,i=new Map,s=new Map,a=new Map,d=new Map,l=new Map,g=function(e,t){return d.has(e)||d.set(e,new Set),d.get(e).add(t),this},c=function(e,t){return!!d.has(e)&&d.get(e).delete(t)},p=(e,t)=>new Promise((n=>{requestAnimationFrame((()=>{const o=[0,0],r=d.get(e)||[],i=Array.from(r);for(let e=0;e<i.length;e+=1)i[e]({isEmpty:!0,size:o,slot:t});n()}))})),m=e=>{if(!e)return;const t=e.getSlotElementId();if(!document.getElementById(t))return p("rewardedSlotGranted",e),void setTimeout((()=>p("rewardedSlotClosed",e)),5e3);const n=document.getElementById(t);n&&n.appendChild(document.createElement("div")),(e=>{const t=document.getElementById(e.getSlotElementId());for(;t?.lastChild;)t.lastChild.remove()})(e),(e=>{const t=`google_ads_iframe_${e.getId()}`;document.getElementById(t)?.remove();const n=document.getElementById(e.getSlotElementId());if(n){const e=document.createElement("iframe");e.id=t,e.srcdoc="<body></body>",e.style="position:absolute; width:0; height:0; left:0; right:0; z-index:-1; border:0",e.setAttribute("width",0),e.setAttribute("height",0),e.setAttribute("data-load-complete",!0),e.setAttribute("data-google-container-id",!0),e.setAttribute("sandbox",""),n.appendChild(e)}})(e),p("slotRenderEnded",e),p("slotRequested",e),p("slotResponseReceived",e),p("slotOnload",e),p("impressionViewable",e)},u={addEventListener:g,removeEventListener:c,enableSyncLoading:e,setRefreshUnfilledSlots:e,getSlots:o},y={addEventListener:g,removeEventListener:c,setContent:e};function f(){}function E(){}f.prototype.display=e,f.prototype.get=n,f.prototype.set=t,f.prototype.setClickUrl=t,f.prototype.setTagForChildDirectedTreatment=t,f.prototype.setTargeting=t,f.prototype.updateTargetingFromMap=t,E.prototype.addSize=t,E.prototype.build=n;const h=e=>{if("string"==typeof e)return[e];try{return Array.prototype.flat.call(e)}catch{}return[]},b=(e,n,o)=>{if(i.has(o))return document.getElementById(o)?.remove(),i.get(o);const d=new Map,g=new Map,c=new Set,p={advertiserId:void 0,campaignId:void 0,creativeId:void 0,creativeTemplateId:void 0,lineItemId:void 0},m=[{getHeight:()=>2,getWidth:()=>2}],u=(s.get(e)||0)+1;s.set(e,u);const y=`${e}_${u}`;let f="",E=null;const b=new Set,S={addService:e=>(b.add(e),S),clearCategoryExclusions:t,clearTargeting(e){void 0===e?g.clear():g.delete(e)},defineSizeMapping(e){return a.set(o,e),this},get:e=>d.get(e),getAdUnitPath:()=>e,getAttributeKeys:()=>Array.from(d.keys()),getCategoryExclusions:()=>Array.from(c),getClickUrl:()=>f,getCollapseEmptyDiv:()=>E,getContentUrl:()=>"",getDivStartsCollapsed:()=>null,getDomId:()=>o,getEscapedQemQueryId:()=>"",getFirstLook:()=>0,getId:()=>y,getHtml:()=>"",getName:()=>y,getOutOfPage:()=>!1,getResponseInformation:()=>p,getServices:()=>Array.from(b),getSizes:()=>m,getSlotElementId:()=>o,getSlotId:()=>S,getTargeting:e=>g.get(e)||l.get(e)||[],getTargetingKeys:()=>Array.from(new Set(Array.of(...l.keys(),...g.keys()))),getTargetingMap:()=>Object.assign(Object.fromEntries(l.entries()),Object.fromEntries(g.entries())),set:(e,t)=>(d.set(e,t),S),setCategoryExclusion:e=>(c.add(e),S),setClickUrl:e=>(f=e,S),setCollapseEmptyDiv:e=>(E=!!e,S),setSafeFrameConfig:t,setTagForChildDirectedTreatment:t,setTargeting:(e,t)=>(g.set(e,h(t)),S),toString:()=>y,updateTargetingFromMap:e=>(((e,t)=>{if("object"==typeof t)for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.set(n,h(t[n]))})(g,e),S)};return r.set(e,S),i.set(o,S),a.set(o,n),S},S={addEventListener:g,removeEventListener:c,clear:e,clearCategoryExclusions:t,clearTagForChildDirectedTreatment:t,clearTargeting(e){void 0===e?l.clear():l.delete(e)},collapseEmptyDivs:e,defineOutOfPagePassback:()=>new f,definePassback:()=>new f,disableInitialLoad:e,display:e,enableAsyncRendering:e,enableLazyLoad:e,enableSingleRequest:e,enableSyncRendering:e,enableVideoAds:e,get:n,getAttributeKeys:o,getTargeting:o,getTargetingKeys:o,getSlots:o,isInitialLoadDisabled:()=>!0,refresh:e,set:t,setCategoryExclusion:t,setCentering:e,setCookieOptions:t,setForceSafeFrame:t,setLocation:t,setPrivacySettings:t,setPublisherProvidedId:t,setRequestNonPersonalizedAds:t,setSafeFrameConfig:t,setTagForChildDirectedTreatment:t,setTargeting:t,setVideoContent:t,updateCorrelator:e},{googletag:v={}}=window,{cmd:C=[]}=v;for(v.apiReady=!0,v.cmd=[],v.cmd.push=e=>{try{e()}catch(e){console.trace(e)}return 1},v.companionAds=()=>u,v.content=()=>y,v.defineOutOfPageSlot=b,v.defineSlot=b,v.destroySlots=function(){r.clear(),i.clear()},v.disablePublisherConsole=e,v.display=function(e){let t;t=e?.getSlotElementId?e.getSlotElementId():e?.nodeType?e.id:String(e),m(i.get(t))},v.enableServices=e,v.getVersion=()=>"",v.pubads=()=>S,v.pubadsReady=!0,v.setAdIframeTitle=e,v.sizeMapping=()=>new E,v.enums={OutOfPageFormat:{REWARDED:"REWARDED"}},window.googletag=v;0!==C.length;)v.cmd.push(C.shift())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3fed16eb400f779de1afec5bc42b57fc"] === flag) {
                return;
            }
            (() => {
                const e = () => {}, t = function() {
                    return this;
                }, n = () => null, o = () => [], r = new Map, i = new Map, s = new Map, a = new Map, d = new Map, l = new Map, g = function(e, t) {
                    return d.has(e) || d.set(e, new Set), d.get(e).add(t), this;
                }, c = function(e, t) {
                    return !!d.has(e) && d.get(e).delete(t);
                }, p = (e, t) => new Promise((n => {
                    requestAnimationFrame((() => {
                        const o = [ 0, 0 ], r = d.get(e) || [], i = Array.from(r);
                        for (let e = 0; e < i.length; e += 1) i[e]({
                            isEmpty: !0,
                            size: o,
                            slot: t
                        });
                        n();
                    }));
                })), m = e => {
                    if (!e) return;
                    const t = e.getSlotElementId();
                    if (!document.getElementById(t)) return p("rewardedSlotGranted", e), void setTimeout((() => p("rewardedSlotClosed", e)), 5e3);
                    const n = document.getElementById(t);
                    n && n.appendChild(document.createElement("div")), (e => {
                        const t = document.getElementById(e.getSlotElementId());
                        for (;t?.lastChild; ) t.lastChild.remove();
                    })(e), (e => {
                        const t = `google_ads_iframe_${e.getId()}`;
                        document.getElementById(t)?.remove();
                        const n = document.getElementById(e.getSlotElementId());
                        if (n) {
                            const e = document.createElement("iframe");
                            e.id = t, e.srcdoc = "<body></body>", e.style = "position:absolute; width:0; height:0; left:0; right:0; z-index:-1; border:0", 
                            e.setAttribute("width", 0), e.setAttribute("height", 0), e.setAttribute("data-load-complete", !0), 
                            e.setAttribute("data-google-container-id", !0), e.setAttribute("sandbox", ""), n.appendChild(e);
                        }
                    })(e), p("slotRenderEnded", e), p("slotRequested", e), p("slotResponseReceived", e), 
                    p("slotOnload", e), p("impressionViewable", e);
                }, u = {
                    addEventListener: g,
                    removeEventListener: c,
                    enableSyncLoading: e,
                    setRefreshUnfilledSlots: e,
                    getSlots: o
                }, y = {
                    addEventListener: g,
                    removeEventListener: c,
                    setContent: e
                };
                function f() {}
                function E() {}
                f.prototype.display = e, f.prototype.get = n, f.prototype.set = t, f.prototype.setClickUrl = t, 
                f.prototype.setTagForChildDirectedTreatment = t, f.prototype.setTargeting = t, f.prototype.updateTargetingFromMap = t, 
                E.prototype.addSize = t, E.prototype.build = n;
                const h = e => {
                    if ("string" == typeof e) return [ e ];
                    try {
                        return Array.prototype.flat.call(e);
                    } catch {}
                    return [];
                }, b = (e, n, o) => {
                    if (i.has(o)) return document.getElementById(o)?.remove(), i.get(o);
                    const d = new Map, g = new Map, c = new Set, p = {
                        advertiserId: void 0,
                        campaignId: void 0,
                        creativeId: void 0,
                        creativeTemplateId: void 0,
                        lineItemId: void 0
                    }, m = [ {
                        getHeight: () => 2,
                        getWidth: () => 2
                    } ], u = (s.get(e) || 0) + 1;
                    s.set(e, u);
                    const y = `${e}_${u}`;
                    let f = "", E = null;
                    const b = new Set, S = {
                        addService: e => (b.add(e), S),
                        clearCategoryExclusions: t,
                        clearTargeting(e) {
                            void 0 === e ? g.clear() : g.delete(e);
                        },
                        defineSizeMapping(e) {
                            return a.set(o, e), this;
                        },
                        get: e => d.get(e),
                        getAdUnitPath: () => e,
                        getAttributeKeys: () => Array.from(d.keys()),
                        getCategoryExclusions: () => Array.from(c),
                        getClickUrl: () => f,
                        getCollapseEmptyDiv: () => E,
                        getContentUrl: () => "",
                        getDivStartsCollapsed: () => null,
                        getDomId: () => o,
                        getEscapedQemQueryId: () => "",
                        getFirstLook: () => 0,
                        getId: () => y,
                        getHtml: () => "",
                        getName: () => y,
                        getOutOfPage: () => !1,
                        getResponseInformation: () => p,
                        getServices: () => Array.from(b),
                        getSizes: () => m,
                        getSlotElementId: () => o,
                        getSlotId: () => S,
                        getTargeting: e => g.get(e) || l.get(e) || [],
                        getTargetingKeys: () => Array.from(new Set(Array.of(...l.keys(), ...g.keys()))),
                        getTargetingMap: () => Object.assign(Object.fromEntries(l.entries()), Object.fromEntries(g.entries())),
                        set: (e, t) => (d.set(e, t), S),
                        setCategoryExclusion: e => (c.add(e), S),
                        setClickUrl: e => (f = e, S),
                        setCollapseEmptyDiv: e => (E = !!e, S),
                        setSafeFrameConfig: t,
                        setTagForChildDirectedTreatment: t,
                        setTargeting: (e, t) => (g.set(e, h(t)), S),
                        toString: () => y,
                        updateTargetingFromMap: e => (((e, t) => {
                            if ("object" == typeof t) for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e.set(n, h(t[n]));
                        })(g, e), S)
                    };
                    return r.set(e, S), i.set(o, S), a.set(o, n), S;
                }, S = {
                    addEventListener: g,
                    removeEventListener: c,
                    clear: e,
                    clearCategoryExclusions: t,
                    clearTagForChildDirectedTreatment: t,
                    clearTargeting(e) {
                        void 0 === e ? l.clear() : l.delete(e);
                    },
                    collapseEmptyDivs: e,
                    defineOutOfPagePassback: () => new f,
                    definePassback: () => new f,
                    disableInitialLoad: e,
                    display: e,
                    enableAsyncRendering: e,
                    enableLazyLoad: e,
                    enableSingleRequest: e,
                    enableSyncRendering: e,
                    enableVideoAds: e,
                    get: n,
                    getAttributeKeys: o,
                    getTargeting: o,
                    getTargetingKeys: o,
                    getSlots: o,
                    isInitialLoadDisabled: () => !0,
                    refresh: e,
                    set: t,
                    setCategoryExclusion: t,
                    setCentering: e,
                    setCookieOptions: t,
                    setForceSafeFrame: t,
                    setLocation: t,
                    setPrivacySettings: t,
                    setPublisherProvidedId: t,
                    setRequestNonPersonalizedAds: t,
                    setSafeFrameConfig: t,
                    setTagForChildDirectedTreatment: t,
                    setTargeting: t,
                    setVideoContent: t,
                    updateCorrelator: e
                }, {googletag: v = {}} = window, {cmd: C = []} = v;
                for (v.apiReady = !0, v.cmd = [], v.cmd.push = e => {
                    try {
                        e();
                    } catch (e) {
                        console.trace(e);
                    }
                    return 1;
                }, v.companionAds = () => u, v.content = () => y, v.defineOutOfPageSlot = b, v.defineSlot = b, 
                v.destroySlots = function() {
                    r.clear(), i.clear();
                }, v.disablePublisherConsole = e, v.display = function(e) {
                    let t;
                    t = e?.getSlotElementId ? e.getSlotElementId() : e?.nodeType ? e.id : String(e), 
                    m(i.get(t));
                }, v.enableServices = e, v.getVersion = () => "", v.pubads = () => S, v.pubadsReady = !0, 
                v.setAdIframeTitle = e, v.sizeMapping = () => new E, v.enums = {
                    OutOfPageFormat: {
                        REWARDED: "REWARDED"
                    }
                }, window.googletag = v; 0 !== C.length; ) v.cmd.push(C.shift());
            })();
            Object.defineProperty(Window.prototype.toString, "3fed16eb400f779de1afec5bc42b57fc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3fed16eb400f779de1afec5bc42b57fc" due to: ' + error);
        }
    },
    '(()=>{window.GADS={init:function(n){n&&"function"==typeof n.onFinish&&n.onFinish()}};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c2ffc94b6ce8e97f2c432d64690cfc9d"] === flag) {
                return;
            }
            (() => {
                window.GADS = {
                    init: function(n) {
                        n && "function" == typeof n.onFinish && n.onFinish();
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "c2ffc94b6ce8e97f2c432d64690cfc9d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c2ffc94b6ce8e97f2c432d64690cfc9d" due to: ' + error);
        }
    },
    '(()=>{const a=function(a){"function"==typeof a&&a()};window.aiptag={adplayer:"",cmd:[]},window.aiptag.cmd.player=[],window.aiptag.cmd.display=[],window.aiptag.cmd.push=a,window.aiptag.cmd.player.push=a,window.aiptag.cmd.display.push=a,window.aipDisplayTag={display:function(){}},window.aipPlayer=function(a){a&&a.AIP_COMPLETE&&(this.startPreRoll=a.AIP_COMPLETE)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8e9df515585941ac85187baf28cedac1"] === flag) {
                return;
            }
            (() => {
                const a = function(a) {
                    "function" == typeof a && a();
                };
                window.aiptag = {
                    adplayer: "",
                    cmd: []
                }, window.aiptag.cmd.player = [], window.aiptag.cmd.display = [], window.aiptag.cmd.push = a, 
                window.aiptag.cmd.player.push = a, window.aiptag.cmd.display.push = a, window.aipDisplayTag = {
                    display: function() {}
                }, window.aipPlayer = function(a) {
                    a && a.AIP_COMPLETE && (this.startPreRoll = a.AIP_COMPLETE);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8e9df515585941ac85187baf28cedac1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8e9df515585941ac85187baf28cedac1" due to: ' + error);
        }
    },
    '(()=>{const e={breakStatus:"done"},o=["beforeReward","adViewed","adBreakDone"];window.adsbygoogle=window.adsbygoogle||[],window.adsbygoogle.push=function(d){var a;d&&"object"==typeof d&&(a=d,o.every((e=>e in a&&"function"==typeof a[e])))&&(d.beforeReward(),d.adViewed(),d.adBreakDone(e))}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["36fd3167269f896e4009a009ae54edb3"] === flag) {
                return;
            }
            (() => {
                const e = {
                    breakStatus: "done"
                }, o = [ "beforeReward", "adViewed", "adBreakDone" ];
                window.adsbygoogle = window.adsbygoogle || [], window.adsbygoogle.push = function(d) {
                    var a;
                    d && "object" == typeof d && (a = d, o.every((e => e in a && "function" == typeof a[e]))) && (d.beforeReward(), 
                    d.adViewed(), d.adBreakDone(e));
                };
            })();
            Object.defineProperty(Window.prototype.toString, "36fd3167269f896e4009a009ae54edb3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "36fd3167269f896e4009a009ae54edb3" due to: ' + error);
        }
    },
    '!function(){var t=document.querySelector("ins.adsbygoogle");t&&setTimeout(function(){t.setAttribute("data-adsbygoogle-status","done")},1e3)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a05676082813ca144c6c4958e9776aae"] === flag) {
                return;
            }
            !function() {
                var t = document.querySelector("ins.adsbygoogle");
                t && setTimeout((function() {
                    t.setAttribute("data-adsbygoogle-status", "done");
                }), 1e3);
            }();
            Object.defineProperty(Window.prototype.toString, "a05676082813ca144c6c4958e9776aae", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a05676082813ca144c6c4958e9776aae" due to: ' + error);
        }
    },
    '(()=>{const r={apply:(r,e,t)=>{try{const r=(new Error).stack,e=t[0];if(r.includes("adBlockingDetected")&&e?.adFailurePercentage)return 0}catch(r){}return Reflect.apply(r,e,t)}};window.Array.prototype.push=new Proxy(window.Array.prototype.push,r)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2569876940a174e979811de8e9ef4610"] === flag) {
                return;
            }
            (() => {
                const r = {
                    apply: (r, e, t) => {
                        try {
                            const r = (new Error).stack, e = t[0];
                            if (r.includes("adBlockingDetected") && e?.adFailurePercentage) return 0;
                        } catch (r) {}
                        return Reflect.apply(r, e, t);
                    }
                };
                window.Array.prototype.push = new Proxy(window.Array.prototype.push, r);
            })();
            Object.defineProperty(Window.prototype.toString, "2569876940a174e979811de8e9ef4610", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2569876940a174e979811de8e9ef4610" due to: ' + error);
        }
    },
    '(()=>{let e;const t={apply:(t,n,o)=>(o[0]?.behavior?.controlType&&o[0]?.initialItems&&"function"==typeof o[0].update&&(e=o[0].update,o[0].update=function(){this.update=e}),Reflect.apply(t,n,o))};window.Object.keys=new Proxy(window.Object.keys,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ca0d0ab35fc86cd11d58ae07707d23fa"] === flag) {
                return;
            }
            (() => {
                let e;
                const t = {
                    apply: (t, n, o) => (o[0]?.behavior?.controlType && o[0]?.initialItems && "function" == typeof o[0].update && (e = o[0].update, 
                    o[0].update = function() {
                        this.update = e;
                    }), Reflect.apply(t, n, o))
                };
                window.Object.keys = new Proxy(window.Object.keys, t);
            })();
            Object.defineProperty(Window.prototype.toString, "ca0d0ab35fc86cd11d58ae07707d23fa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ca0d0ab35fc86cd11d58ae07707d23fa" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,n,t)=>{const o=t[1];return o&&["adBlockingDetected","assessAdBlocking"].includes(o)&&t[2]&&"function"==typeof t[2].value&&(t[2].value=()=>{}),Reflect.apply(e,n,t)}};window.Object.defineProperty=new Proxy(window.Object.defineProperty,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dd013aac8504d0cebb16580d054020f6"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, n, t) => {
                        const o = t[1];
                        return o && [ "adBlockingDetected", "assessAdBlocking" ].includes(o) && t[2] && "function" == typeof t[2].value && (t[2].value = () => {}), 
                        Reflect.apply(e, n, t);
                    }
                };
                window.Object.defineProperty = new Proxy(window.Object.defineProperty, e);
            })();
            Object.defineProperty(Window.prototype.toString, "dd013aac8504d0cebb16580d054020f6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dd013aac8504d0cebb16580d054020f6" due to: ' + error);
        }
    },
    '(()=>{window.adsbygoogle=window.adsbygoogle||[],window.adsbygoogle.loaded=!0,window.adsbygoogle.push=o=>{if("function"==typeof o?.params?.google_ad_loaded_callback)try{o.params.google_ad_loaded_callback()}catch(o){}};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8789bcbfab97b9bd3093b265e84dcf3d"] === flag) {
                return;
            }
            (() => {
                window.adsbygoogle = window.adsbygoogle || [], window.adsbygoogle.loaded = !0, window.adsbygoogle.push = o => {
                    if ("function" == typeof o?.params?.google_ad_loaded_callback) try {
                        o.params.google_ad_loaded_callback();
                    } catch (o) {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8789bcbfab97b9bd3093b265e84dcf3d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8789bcbfab97b9bd3093b265e84dcf3d" due to: ' + error);
        }
    },
    "(()=>{window.detectIncognito=()=>new Promise((e=>e({isPrivate:!0})));})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b8746b82569fc49e330a8e697f35c050"] === flag) {
                return;
            }
            (() => {
                window.detectIncognito = () => new Promise((e => e({
                    isPrivate: !0
                })));
            })();
            Object.defineProperty(Window.prototype.toString, "b8746b82569fc49e330a8e697f35c050", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b8746b82569fc49e330a8e697f35c050" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,p,t)=>(!0===t[0]&&(t[0]=!1),Reflect.apply(e,p,t))},p={apply:(p,t,a)=>("__updateState"===a[1]&&a[2]&&a[2].value&&(a[2].value=new Proxy(a[2].value,e)),Reflect.apply(p,t,a))};window.Object.defineProperty=new Proxy(window.Object.defineProperty,p)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7c7972b55daaed8f85903876788453e9"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, p, t) => (!0 === t[0] && (t[0] = !1), Reflect.apply(e, p, t))
                }, p = {
                    apply: (p, t, a) => ("__updateState" === a[1] && a[2] && a[2].value && (a[2].value = new Proxy(a[2].value, e)), 
                    Reflect.apply(p, t, a))
                };
                window.Object.defineProperty = new Proxy(window.Object.defineProperty, p);
            })();
            Object.defineProperty(Window.prototype.toString, "7c7972b55daaed8f85903876788453e9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7c7972b55daaed8f85903876788453e9" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,n)=>{const o=n[0];if(o&&o.status.includes("success"))for(const e in n[0])"1"===n[0][e]?n[0][e]="0":1===n[0][e]&&(n[0][e]=0);return Reflect.apply(e,t,n)}},t=["adblockEnabled","=!!parseInt(","disable_adb"],n={apply:(n,o,s)=>{const p=s[0];return"function"==typeof p&&t.some((e=>p.toString().includes(e)))&&(s[0]=new Proxy(s[0],e)),Reflect.apply(n,o,s)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,n)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["363a12f3db4852d23e4d57b5c84f4d68"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, n) => {
                        const o = n[0];
                        if (o && o.status.includes("success")) for (const e in n[0]) "1" === n[0][e] ? n[0][e] = "0" : 1 === n[0][e] && (n[0][e] = 0);
                        return Reflect.apply(e, t, n);
                    }
                }, t = [ "adblockEnabled", "=!!parseInt(", "disable_adb" ], n = {
                    apply: (n, o, s) => {
                        const p = s[0];
                        return "function" == typeof p && t.some((e => p.toString().includes(e))) && (s[0] = new Proxy(s[0], e)), 
                        Reflect.apply(n, o, s);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, n);
            })();
            Object.defineProperty(Window.prototype.toString, "363a12f3db4852d23e4d57b5c84f4d68", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "363a12f3db4852d23e4d57b5c84f4d68" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,n,e)=>{if(e[0]&&null===e[0].html?.detected&&"function"==typeof e[0].html?.instance?.start&&"function"==typeof e[0].env?.instance?.start&&"function"==typeof e[0].http?.instance?.start){const t=function(){Object.keys(this).forEach((t=>{"boolean"==typeof this[t]&&(this[t]=!1)}))};["html","env","http"].forEach((n=>{e[0][n].instance.start=t}))}return Reflect.apply(t,n,e)}};window.Object.keys=new Proxy(window.Object.keys,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8e5af140bb8ff6dfac87d2aa8a7181a7"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, n, e) => {
                        if (e[0] && null === e[0].html?.detected && "function" == typeof e[0].html?.instance?.start && "function" == typeof e[0].env?.instance?.start && "function" == typeof e[0].http?.instance?.start) {
                            const t = function() {
                                Object.keys(this).forEach((t => {
                                    "boolean" == typeof this[t] && (this[t] = !1);
                                }));
                            };
                            [ "html", "env", "http" ].forEach((n => {
                                e[0][n].instance.start = t;
                            }));
                        }
                        return Reflect.apply(t, n, e);
                    }
                };
                window.Object.keys = new Proxy(window.Object.keys, t);
            })();
            Object.defineProperty(Window.prototype.toString, "8e5af140bb8ff6dfac87d2aa8a7181a7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8e5af140bb8ff6dfac87d2aa8a7181a7" due to: ' + error);
        }
    },
    "(()=>{document.addEventListener('DOMContentLoaded',()=>{var el=document.body; var ce=document.createElement('div'); if(el) { el.appendChild(ce); ce.setAttribute(\"id\", \"QGSBETJjtZkYH\"); }})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["660d8dc0098c8febc0f6d884977e6d4e"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    var el = document.body;
                    var ce = document.createElement("div");
                    if (el) {
                        el.appendChild(ce);
                        ce.setAttribute("id", "QGSBETJjtZkYH");
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "660d8dc0098c8febc0f6d884977e6d4e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "660d8dc0098c8febc0f6d884977e6d4e" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{const e=document.querySelector("#widescreen1");if(e){const t=document.createElement("div");t.setAttribute("id","google_ads_iframe_"),e.appendChild(t)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["44c722190e3d03dbed05660dc5040600"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    const e = document.querySelector("#widescreen1");
                    if (e) {
                        const t = document.createElement("div");
                        t.setAttribute("id", "google_ads_iframe_"), e.appendChild(t);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "44c722190e3d03dbed05660dc5040600", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "44c722190e3d03dbed05660dc5040600" due to: ' + error);
        }
    },
    '(()=>{const n=window.String.prototype.includes,o={apply:(o,t,i)=>{const c=i[0];return!(!i||!n.call(c,"function onclick(lczxsusin)"))||Reflect.apply(o,t,i)}};window.String.prototype.includes=new Proxy(window.String.prototype.includes,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2e3a208e2520b56c4a151edf4ed886f4"] === flag) {
                return;
            }
            (() => {
                const n = window.String.prototype.includes, o = {
                    apply: (o, t, i) => {
                        const c = i[0];
                        return !(!i || !n.call(c, "function onclick(lczxsusin)")) || Reflect.apply(o, t, i);
                    }
                };
                window.String.prototype.includes = new Proxy(window.String.prototype.includes, o);
            })();
            Object.defineProperty(Window.prototype.toString, "2e3a208e2520b56c4a151edf4ed886f4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2e3a208e2520b56c4a151edf4ed886f4" due to: ' + error);
        }
    },
    '(()=>{const e=new Set(["fimg","faimg","fbmg","fcmg","fdmg","femg","ffmg","fgmg","fjmg","fkmg"]),t={apply:(t,c,n)=>{const s=n[2];if(s){const t=Object.keys(s).length;if(t>1&&t<20)for(let t in s)if(e.has(t)&&!0===n[2][t])try{n[2][t]=!1}catch(e){console.trace(e)}else if(!0===s[t])try{const e=(new Error).stack;/NodeList\\.forEach|(<anonymous>|blob):[\\s\\S]{1,500}$/.test(e)&&(s[t]=!1)}catch(e){console.trace(e)}}return Reflect.apply(t,c,n)}};window.Object.assign=new Proxy(window.Object.assign,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["26f59c9e189170e8d303a40a632b2e28"] === flag) {
                return;
            }
            (() => {
                const e = new Set([ "fimg", "faimg", "fbmg", "fcmg", "fdmg", "femg", "ffmg", "fgmg", "fjmg", "fkmg" ]), t = {
                    apply: (t, c, n) => {
                        const s = n[2];
                        if (s) {
                            const t = Object.keys(s).length;
                            if (t > 1 && t < 20) for (let t in s) if (e.has(t) && !0 === n[2][t]) try {
                                n[2][t] = !1;
                            } catch (e) {
                                console.trace(e);
                            } else if (!0 === s[t]) try {
                                const e = (new Error).stack;
                                /NodeList\.forEach|(<anonymous>|blob):[\s\S]{1,500}$/.test(e) && (s[t] = !1);
                            } catch (e) {
                                console.trace(e);
                            }
                        }
                        return Reflect.apply(t, c, n);
                    }
                };
                window.Object.assign = new Proxy(window.Object.assign, t);
            })();
            Object.defineProperty(Window.prototype.toString, "26f59c9e189170e8d303a40a632b2e28", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "26f59c9e189170e8d303a40a632b2e28" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,p)=>{const o=p[1];return o&&"string"==typeof o&&o.match(/pagead2\\.googlesyndication\\.com|google.*\\.js|\\/.*?\\/.*?ad.*?\\.js|\\.(shop|quest|autos)\\/.*?\\.(js|php|html)/)&&(t.prevent=!0),Reflect.apply(e,t,p)}};window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,e);const t={apply:(e,t,p)=>{if(!t.prevent)return Reflect.apply(e,t,p)}};window.XMLHttpRequest.prototype.send=new Proxy(window.XMLHttpRequest.prototype.send,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c7605ee2684a2146beda3b04ccfa8bec"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, p) => {
                        const o = p[1];
                        return o && "string" == typeof o && o.match(/pagead2\.googlesyndication\.com|google.*\.js|\/.*?\/.*?ad.*?\.js|\.(shop|quest|autos)\/.*?\.(js|php|html)/) && (t.prevent = !0), 
                        Reflect.apply(e, t, p);
                    }
                };
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, e);
                const t = {
                    apply: (e, t, p) => {
                        if (!t.prevent) return Reflect.apply(e, t, p);
                    }
                };
                window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, t);
            })();
            Object.defineProperty(Window.prototype.toString, "c7605ee2684a2146beda3b04ccfa8bec", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c7605ee2684a2146beda3b04ccfa8bec" due to: ' + error);
        }
    },
    '(()=>{window.vhit=!0;const t=/free-download-form|\'\\),_0x|\\)\\]\\(function\\(_0x|,Array\\[_0x|function\\(_0x.*\\){const _0x.*\\[_0x|adblock|function Boolean\\(\\) \\{\\s*\\[native code\\]|=>\\{const _0x|undefined\\?new\\.target:|detectAdblock|===!0\\}/,e={apply:async(t,e,o)=>{const n=o[0];return"boolean"==typeof n&&!0===n&&(o[0]=!1),"string"==typeof n&&"blocked"===n&&(o[0]=""),await new Promise((t=>setTimeout(t,2e3))),Reflect.apply(t,e,o)}},o={apply:(o,n,r)=>{const i=r[0];return"function"==typeof i&&t.test(i.toString())&&(r[0]=new Proxy(r[0],e)),Reflect.apply(o,n,r)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,o);const n=async t=>{t.preventDefault();const e=t.currentTarget;"function"==typeof window.vhit?.report&&await window.vhit.report(),e.form.requestSubmit(e)};window.addEventListener("load",(()=>{const t=document.querySelector("form#submit-form button#submit-button");if(t){const e=t.cloneNode(!0);t.parentNode.replaceChild(e,t),e.removeAttribute("disabled"),e.textContent="Continue",e.addEventListener("click",n)}}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f85025076e463ddc0dfe66ff2a54b9cf"] === flag) {
                return;
            }
            (() => {
                window.vhit = !0;
                const t = /free-download-form|'\),_0x|\)\]\(function\(_0x|,Array\[_0x|function\(_0x.*\){const _0x.*\[_0x|adblock|function Boolean\(\) \{\s*\[native code\]|=>\{const _0x|undefined\?new\.target:|detectAdblock|===!0\}/, e = {
                    apply: async (t, e, o) => {
                        const n = o[0];
                        return "boolean" == typeof n && !0 === n && (o[0] = !1), "string" == typeof n && "blocked" === n && (o[0] = ""), 
                        await new Promise((t => setTimeout(t, 2e3))), Reflect.apply(t, e, o);
                    }
                }, o = {
                    apply: (o, n, r) => {
                        const i = r[0];
                        return "function" == typeof i && t.test(i.toString()) && (r[0] = new Proxy(r[0], e)), 
                        Reflect.apply(o, n, r);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, o);
                const n = async t => {
                    t.preventDefault();
                    const e = t.currentTarget;
                    "function" == typeof window.vhit?.report && await window.vhit.report(), e.form.requestSubmit(e);
                };
                window.addEventListener("load", (() => {
                    const t = document.querySelector("form#submit-form button#submit-button");
                    if (t) {
                        const e = t.cloneNode(!0);
                        t.parentNode.replaceChild(e, t), e.removeAttribute("disabled"), e.textContent = "Continue", 
                        e.addEventListener("click", n);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "f85025076e463ddc0dfe66ff2a54b9cf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f85025076e463ddc0dfe66ff2a54b9cf" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,o,e)=>{try{const t=e[0];t&&"object"==typeof t&&Object.prototype.hasOwnProperty.call(t,"failed_hosts")&&Object.prototype.hasOwnProperty.call(t,"blocked")&&(t.failed_hosts="",t.blocked=!1)}catch(t){}return Reflect.apply(t,o,e)}};window.JSON.stringify=new Proxy(window.JSON.stringify,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1503dc258e7809ec4d938941a16df979"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, o, e) => {
                        try {
                            const t = e[0];
                            t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, "failed_hosts") && Object.prototype.hasOwnProperty.call(t, "blocked") && (t.failed_hosts = "", 
                            t.blocked = !1);
                        } catch (t) {}
                        return Reflect.apply(t, o, e);
                    }
                };
                window.JSON.stringify = new Proxy(window.JSON.stringify, t);
            })();
            Object.defineProperty(Window.prototype.toString, "1503dc258e7809ec4d938941a16df979", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1503dc258e7809ec4d938941a16df979" due to: ' + error);
        }
    },
    '(()=>{const o=!1,t=Reflect.apply,e=Object.hasOwn,r=Array.isArray,n=Promise.prototype.then,l=Boolean,i=JSON.stringify,s=new Proxy(l,{apply:(o,e,r)=>(!0===r[0]&&(r[0]=!1),t(o,e,r))});window.Promise.prototype.then=new Proxy(n,{apply:(o,e,r)=>(r[0]===l&&(r[0]=s),t(o,e,r))}),window.JSON.stringify=new Proxy(i,{apply:(n,l,i)=>{try{const o=i[0];null!==o&&"object"==typeof o&&!r(o)&&e(o,"blocked")&&e(o,"failed_hosts")&&(i[0]={...o,blocked:!1,path:"clean",dom_hits:0,dom_control_blocked:!1,target_hits:0,target_timeouts:0,control_hits:0,control_timeouts:0,network_control_blocked:!1,forged_hits:0,forgery_voided:!1,tamper:"",failed_hosts:""})}catch(t){o}return t(n,l,i)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f4484bab84a05eb6a0713bacb2881845"] === flag) {
                return;
            }
            (() => {
                const o = !1, t = Reflect.apply, e = Object.hasOwn, r = Array.isArray, n = Promise.prototype.then, l = Boolean, i = JSON.stringify, s = new Proxy(l, {
                    apply: (o, e, r) => (!0 === r[0] && (r[0] = !1), t(o, e, r))
                });
                window.Promise.prototype.then = new Proxy(n, {
                    apply: (o, e, r) => (r[0] === l && (r[0] = s), t(o, e, r))
                }), window.JSON.stringify = new Proxy(i, {
                    apply: (n, l, i) => {
                        try {
                            const o = i[0];
                            null !== o && "object" == typeof o && !r(o) && e(o, "blocked") && e(o, "failed_hosts") && (i[0] = {
                                ...o,
                                blocked: !1,
                                path: "clean",
                                dom_hits: 0,
                                dom_control_blocked: !1,
                                target_hits: 0,
                                target_timeouts: 0,
                                control_hits: 0,
                                control_timeouts: 0,
                                network_control_blocked: !1,
                                forged_hits: 0,
                                forgery_voided: !1,
                                tamper: "",
                                failed_hosts: ""
                            });
                        } catch (t) {
                            o;
                        }
                        return t(n, l, i);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "f4484bab84a05eb6a0713bacb2881845", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f4484bab84a05eb6a0713bacb2881845" due to: ' + error);
        }
    },
    '(()=>{const e=()=>{document.querySelectorAll(".chakra-portal").forEach((e=>{e.querySelector(\'.chakra-modal__overlay[style*="opacity"]\')&&e.setAttribute("style","display: none !important;")}))},t=()=>{},a=function(t,a){const r={name:t,listener:a};requestAnimationFrame((()=>{try{"rewardedSlotGranted"===r.name&&setTimeout(e,2e3),r.listener()}catch(e){}}))};window.googletag={cmd:[],pubads:()=>({addEventListener:a,removeEventListener:t,refresh:t,getTargeting:()=>[],setTargeting:t,disableInitialLoad:t,enableSingleRequest:t,collapseEmptyDivs:t,getSlots:t}),defineSlot:()=>({addService(){}}),defineOutOfPageSlot:t,enableServices:t,display:t,enums:{OutOfPageFormat:{REWARDED:1}}},googletag.cmd.push=e=>{try{e()}catch(e){}return 1}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["788553a11ab6cd27600ce601f07d7af8"] === flag) {
                return;
            }
            (() => {
                const e = () => {
                    document.querySelectorAll(".chakra-portal").forEach((e => {
                        e.querySelector('.chakra-modal__overlay[style*="opacity"]') && e.setAttribute("style", "display: none !important;");
                    }));
                }, t = () => {}, a = function(t, a) {
                    const r = {
                        name: t,
                        listener: a
                    };
                    requestAnimationFrame((() => {
                        try {
                            "rewardedSlotGranted" === r.name && setTimeout(e, 2e3), r.listener();
                        } catch (e) {}
                    }));
                };
                window.googletag = {
                    cmd: [],
                    pubads: () => ({
                        addEventListener: a,
                        removeEventListener: t,
                        refresh: t,
                        getTargeting: () => [],
                        setTargeting: t,
                        disableInitialLoad: t,
                        enableSingleRequest: t,
                        collapseEmptyDivs: t,
                        getSlots: t
                    }),
                    defineSlot: () => ({
                        addService() {}
                    }),
                    defineOutOfPageSlot: t,
                    enableServices: t,
                    display: t,
                    enums: {
                        OutOfPageFormat: {
                            REWARDED: 1
                        }
                    }
                }, googletag.cmd.push = e => {
                    try {
                        e();
                    } catch (e) {}
                    return 1;
                };
            })();
            Object.defineProperty(Window.prototype.toString, "788553a11ab6cd27600ce601f07d7af8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "788553a11ab6cd27600ce601f07d7af8" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{if(window.CryptoJSAesJson&&window.CryptoJSAesJson.decrypt){const e=document.createElement("link");function t(){const t=document.querySelector(".entry-header.header");return parseInt(t.getAttribute("data-id"))}e.setAttribute("rel","stylesheet"),e.setAttribute("media","all"),e.setAttribute("href","/wp-content/cache/autoptimize/css/autoptimize_92c5b1cf0217cba9b3fab27d39f320b9.css"),document.head.appendChild(e);const r=3,n=5,o=13,a="07";let c="",i="";const d=1,l=6,g=1,s=5,u=2,p=8,m=8,A=(t,e)=>parseInt(t.toString()+e.toString()),b=(t,e,r)=>t.toString()+e.toString()+r.toString(),S=()=>{const e=document.querySelectorAll(".reading-content .page-break img").length;let c=parseInt((t()+A(o,a))*r-e);return c=A(2*n+1,c),c},h=()=>{const e=document.querySelectorAll(".reading-content .page-break img").length;let r=parseInt((t()+A(p,m))*(2*d)-e-(2*d*2+1));return r=b(2*l+g+g+1,c,r),r},y=()=>{const e=document.querySelectorAll(".reading-content .page-break img").length;return b(t()+2*s*2,i,e*(2*u))},f=(t,e)=>CryptoJSAesJson.decrypt(t,e);let k=document.querySelectorAll(".reading-content .page-break img");k.forEach((t=>{const e=t.getAttribute("id"),r=f(e,S().toString());t.setAttribute("id",r)})),k=document.querySelectorAll(".reading-content .page-break img"),k.forEach((t=>{const e=t.getAttribute("id"),r=parseInt(e.replace(/image-(\\d+)[a-z]+/i,"$1"));document.querySelectorAll(".reading-content .page-break")[r].appendChild(t)})),k=document.querySelectorAll(".reading-content .page-break img"),k.forEach((t=>{const e=t.getAttribute("id"),r=e.slice(-1);c+=r,t.setAttribute("id",e.slice(0,-1))})),k=document.querySelectorAll(".reading-content .page-break img"),k.forEach((t=>{const e=t.getAttribute("dta"),r=f(e,h().toString());t.setAttribute("dta",r)})),k=document.querySelectorAll(".reading-content .page-break img"),k.forEach((t=>{const e=t.getAttribute("dta").slice(-2);i+=e,t.removeAttribute("dta")})),k.forEach((t=>{var e=t.getAttribute("data-src"),r=f(e,y().toString());t.setAttribute("data-src",r)})),k.forEach((t=>{t.classList.add("wp-manga-chapter-img","img-responsive","lazyload","effect-fade")}))}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["793501cfe6b6465e5f629489b079c172"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (window.CryptoJSAesJson && window.CryptoJSAesJson.decrypt) {
                        const e = document.createElement("link");
                        function t() {
                            const t = document.querySelector(".entry-header.header");
                            return parseInt(t.getAttribute("data-id"));
                        }
                        e.setAttribute("rel", "stylesheet"), e.setAttribute("media", "all"), e.setAttribute("href", "/wp-content/cache/autoptimize/css/autoptimize_92c5b1cf0217cba9b3fab27d39f320b9.css"), 
                        document.head.appendChild(e);
                        const r = 3, n = 5, o = 13, a = "07";
                        let c = "", i = "";
                        const d = 1, l = 6, g = 1, s = 5, u = 2, p = 8, m = 8, A = (t, e) => parseInt(t.toString() + e.toString()), b = (t, e, r) => t.toString() + e.toString() + r.toString(), S = () => {
                            const e = document.querySelectorAll(".reading-content .page-break img").length;
                            let c = parseInt((t() + A(o, a)) * r - e);
                            return c = A(2 * n + 1, c), c;
                        }, h = () => {
                            const e = document.querySelectorAll(".reading-content .page-break img").length;
                            let r = parseInt((t() + A(p, m)) * (2 * d) - e - (2 * d * 2 + 1));
                            return r = b(2 * l + g + g + 1, c, r), r;
                        }, y = () => {
                            const e = document.querySelectorAll(".reading-content .page-break img").length;
                            return b(t() + 2 * s * 2, i, e * (2 * u));
                        }, f = (t, e) => CryptoJSAesJson.decrypt(t, e);
                        let k = document.querySelectorAll(".reading-content .page-break img");
                        k.forEach((t => {
                            const e = t.getAttribute("id"), r = f(e, S().toString());
                            t.setAttribute("id", r);
                        })), k = document.querySelectorAll(".reading-content .page-break img"), k.forEach((t => {
                            const e = t.getAttribute("id"), r = parseInt(e.replace(/image-(\d+)[a-z]+/i, "$1"));
                            document.querySelectorAll(".reading-content .page-break")[r].appendChild(t);
                        })), k = document.querySelectorAll(".reading-content .page-break img"), k.forEach((t => {
                            const e = t.getAttribute("id"), r = e.slice(-1);
                            c += r, t.setAttribute("id", e.slice(0, -1));
                        })), k = document.querySelectorAll(".reading-content .page-break img"), k.forEach((t => {
                            const e = t.getAttribute("dta"), r = f(e, h().toString());
                            t.setAttribute("dta", r);
                        })), k = document.querySelectorAll(".reading-content .page-break img"), k.forEach((t => {
                            const e = t.getAttribute("dta").slice(-2);
                            i += e, t.removeAttribute("dta");
                        })), k.forEach((t => {
                            var e = t.getAttribute("data-src"), r = f(e, y().toString());
                            t.setAttribute("data-src", r);
                        })), k.forEach((t => {
                            t.classList.add("wp-manga-chapter-img", "img-responsive", "lazyload", "effect-fade");
                        }));
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "793501cfe6b6465e5f629489b079c172", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "793501cfe6b6465e5f629489b079c172" due to: ' + error);
        }
    },
    '(()=>{const e=new Map,t=function(){},o=t;o.prototype.dispose=t,o.prototype.setNetwork=t,o.prototype.resize=t,o.prototype.setServer=t,o.prototype.setLogLevel=t,o.prototype.newContext=function(){return this},o.prototype.setParameter=t,o.prototype.addEventListener=function(t,o){t&&(console.debug(`Type: ${t}, callback: ${o}`),e.set(t,o))},o.prototype.removeEventListener=t,o.prototype.setProfile=t,o.prototype.setCapability=t,o.prototype.setVideoAsset=t,o.prototype.setSiteSection=t,o.prototype.addKeyValue=t,o.prototype.addTemporalSlot=t,o.prototype.registerCustomPlayer=t,o.prototype.setVideoDisplaySize=t,o.prototype.setContentVideoElement=t,o.prototype.registerVideoDisplayBase=t,o.prototype.submitRequest=function(){const t={type:tv.freewheel.SDK.EVENT_SLOT_ENDED},o=e.get("EVENT_SLOT_ENDED");o&&setTimeout((()=>{try{o(t)}catch(e){console.error(e)}}),1)},window.tv={freewheel:{SDK:{Ad:t,AdManager:o,AdListener:t,_instanceQueue:{},setLogLevel:t,EVENT_SLOT_ENDED:"EVENT_SLOT_ENDED"}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["75be2f053259701edcb277b5ff24cd28"] === flag) {
                return;
            }
            (() => {
                const e = new Map, t = function() {}, o = t;
                o.prototype.dispose = t, o.prototype.setNetwork = t, o.prototype.resize = t, o.prototype.setServer = t, 
                o.prototype.setLogLevel = t, o.prototype.newContext = function() {
                    return this;
                }, o.prototype.setParameter = t, o.prototype.addEventListener = function(t, o) {
                    t && (console.debug(`Type: ${t}, callback: ${o}`), e.set(t, o));
                }, o.prototype.removeEventListener = t, o.prototype.setProfile = t, o.prototype.setCapability = t, 
                o.prototype.setVideoAsset = t, o.prototype.setSiteSection = t, o.prototype.addKeyValue = t, 
                o.prototype.addTemporalSlot = t, o.prototype.registerCustomPlayer = t, o.prototype.setVideoDisplaySize = t, 
                o.prototype.setContentVideoElement = t, o.prototype.registerVideoDisplayBase = t, 
                o.prototype.submitRequest = function() {
                    const t = {
                        type: tv.freewheel.SDK.EVENT_SLOT_ENDED
                    }, o = e.get("EVENT_SLOT_ENDED");
                    o && setTimeout((() => {
                        try {
                            o(t);
                        } catch (e) {
                            console.error(e);
                        }
                    }), 1);
                }, window.tv = {
                    freewheel: {
                        SDK: {
                            Ad: t,
                            AdManager: o,
                            AdListener: t,
                            _instanceQueue: {},
                            setLogLevel: t,
                            EVENT_SLOT_ENDED: "EVENT_SLOT_ENDED"
                        }
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "75be2f053259701edcb277b5ff24cd28", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "75be2f053259701edcb277b5ff24cd28" due to: ' + error);
        }
    },
    '(()=>{const e=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").set,t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").get;Object.defineProperty(Element.prototype,"innerHTML",{get(){return t.call(this)},set(t){if(t?.includes?.("disable Adblock"))return;e.call(this,t)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["272813737cd339fd9b635273bcbc7485"] === flag) {
                return;
            }
            (() => {
                const e = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, t = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").get;
                Object.defineProperty(Element.prototype, "innerHTML", {
                    get() {
                        return t.call(this);
                    },
                    set(t) {
                        if (t?.includes?.("disable Adblock")) return;
                        e.call(this, t);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "272813737cd339fd9b635273bcbc7485", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "272813737cd339fd9b635273bcbc7485" due to: ' + error);
        }
    },
    '(()=>{const t=/free-download-form|\'\\),_0x|\\)\\]\\(function\\(_0x|=>\\{return/,e={apply:(t,e,o)=>{const n=o[0];"boolean"==typeof n&&!0===n&&(o[0]=!1),setTimeout((()=>Reflect.apply(t,e,o)),2e3)}},o={apply:(o,n,r)=>{const i=r[0];return"function"==typeof i&&t.test(i.toString())&&(r[0]=new Proxy(r[0],e)),Reflect.apply(o,n,r)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,o);const n=async t=>{t.preventDefault();const e=t.currentTarget;"function"==typeof window.vhit?.report&&await window.vhit.report(),e.form.requestSubmit(e)};window.addEventListener("load",(()=>{const t=document.querySelector("form#go-link button#link-button");if(t){const e=t.cloneNode(!0);t.parentNode.replaceChild(e,t),e.removeAttribute("disabled"),e.addEventListener("click",n)}}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["352a8e829f13921ee700e5e67451dada"] === flag) {
                return;
            }
            (() => {
                const t = /free-download-form|'\),_0x|\)\]\(function\(_0x|=>\{return/, e = {
                    apply: (t, e, o) => {
                        const n = o[0];
                        "boolean" == typeof n && !0 === n && (o[0] = !1), setTimeout((() => Reflect.apply(t, e, o)), 2e3);
                    }
                }, o = {
                    apply: (o, n, r) => {
                        const i = r[0];
                        return "function" == typeof i && t.test(i.toString()) && (r[0] = new Proxy(r[0], e)), 
                        Reflect.apply(o, n, r);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, o);
                const n = async t => {
                    t.preventDefault();
                    const e = t.currentTarget;
                    "function" == typeof window.vhit?.report && await window.vhit.report(), e.form.requestSubmit(e);
                };
                window.addEventListener("load", (() => {
                    const t = document.querySelector("form#go-link button#link-button");
                    if (t) {
                        const e = t.cloneNode(!0);
                        t.parentNode.replaceChild(e, t), e.removeAttribute("disabled"), e.addEventListener("click", n);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "352a8e829f13921ee700e5e67451dada", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "352a8e829f13921ee700e5e67451dada" due to: ' + error);
        }
    },
    '(()=>{let e=!0;const t=()=>{e=!0},r={apply:(r,s,n)=>{if(!e)return Reflect.apply(r,s,n);try{const o=n[0];if(o?.request?.body){let e=o.request.body;if(e?.includes(\'"event_type":"end"\')&&e?.includes(\'"client_timestamp":\'))return e=e.replace(/"client_timestamp":\\d+/,`"client_timestamp":${Date.now()+6e4}`),o.request.body=e,void setTimeout(()=>{Reflect.apply(r,s,n)},2e3);if(e?.includes(\'"event_type":"error"\'))return}if(o?.request?.url?.includes("/stream/v1/channels/"))return void setTimeout(()=>{Reflect.apply(r,s,n),e=!1,setTimeout(t,6e5)},4e3)}catch(e){}return Reflect.apply(r,s,n)}};window.Worker.prototype.postMessage=new Proxy(window.Worker.prototype.postMessage,r)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c72ba64bb6de276c5955d880eac9ae87"] === flag) {
                return;
            }
            (() => {
                let e = !0;
                const t = () => {
                    e = !0;
                }, r = {
                    apply: (r, s, n) => {
                        if (!e) return Reflect.apply(r, s, n);
                        try {
                            const o = n[0];
                            if (o?.request?.body) {
                                let e = o.request.body;
                                if (e?.includes('"event_type":"end"') && e?.includes('"client_timestamp":')) return e = e.replace(/"client_timestamp":\d+/, `"client_timestamp":${Date.now() + 6e4}`), 
                                o.request.body = e, void setTimeout((() => {
                                    Reflect.apply(r, s, n);
                                }), 2e3);
                                if (e?.includes('"event_type":"error"')) return;
                            }
                            if (o?.request?.url?.includes("/stream/v1/channels/")) return void setTimeout((() => {
                                Reflect.apply(r, s, n), e = !1, setTimeout(t, 6e5);
                            }), 4e3);
                        } catch (e) {}
                        return Reflect.apply(r, s, n);
                    }
                };
                window.Worker.prototype.postMessage = new Proxy(window.Worker.prototype.postMessage, r);
            })();
            Object.defineProperty(Window.prototype.toString, "c72ba64bb6de276c5955d880eac9ae87", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c72ba64bb6de276c5955d880eac9ae87" due to: ' + error);
        }
    },
    '(()=>{const e=window.Promise,o={construct:(o,t,n)=>t[0]&&t[0]?.toString()?.includes("[!1,!1,!1,!1]")&&t[0]?.toString()?.includes(".responseText")?e.resolve(!1):Reflect.construct(o,t,n)},t=new Proxy(window.Promise,o);Object.defineProperty(window,"Promise",{set:e=>{},get:()=>t})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4e4e57eff747aed19b1eb6c7b2758126"] === flag) {
                return;
            }
            (() => {
                const e = window.Promise, o = {
                    construct: (o, t, n) => t[0] && t[0]?.toString()?.includes("[!1,!1,!1,!1]") && t[0]?.toString()?.includes(".responseText") ? e.resolve(!1) : Reflect.construct(o, t, n)
                }, t = new Proxy(window.Promise, o);
                Object.defineProperty(window, "Promise", {
                    set: e => {},
                    get: () => t
                });
            })();
            Object.defineProperty(Window.prototype.toString, "4e4e57eff747aed19b1eb6c7b2758126", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4e4e57eff747aed19b1eb6c7b2758126" due to: ' + error);
        }
    },
    "(()=>{window.viAPItag={init(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["88012e776a891c545cc6e77db0f643af"] === flag) {
                return;
            }
            (() => {
                window.viAPItag = {
                    init() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "88012e776a891c545cc6e77db0f643af", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "88012e776a891c545cc6e77db0f643af" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{ "function"==typeof ViewModelBase&&"object"==typeof ViewModelBase.prototype&&"function"==typeof ViewModelBase.prototype.LoadBrandAdAsync&&(ViewModelBase.prototype.LoadBrandAdAsync=function(){}) }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ac3452ef83db17c4e84323d15083a03b"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    "function" == typeof ViewModelBase && "object" == typeof ViewModelBase.prototype && "function" == typeof ViewModelBase.prototype.LoadBrandAdAsync && (ViewModelBase.prototype.LoadBrandAdAsync = function() {});
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "ac3452ef83db17c4e84323d15083a03b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ac3452ef83db17c4e84323d15083a03b" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{ var a=document.querySelectorAll("ins.adsbygoogle");a.length&&a.forEach(a=>{var b=document.createElement("iframe");b.style="display: none !important;",a.setAttribute("data-ad-status","filled"),a.appendChild(b)}) }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["81b55e3b01cb8f931036cccb4d1056b6"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    var a = document.querySelectorAll("ins.adsbygoogle");
                    a.length && a.forEach((a => {
                        var b = document.createElement("iframe");
                        b.style = "display: none !important;", a.setAttribute("data-ad-status", "filled"), 
                        a.appendChild(b);
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "81b55e3b01cb8f931036cccb4d1056b6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "81b55e3b01cb8f931036cccb4d1056b6" due to: ' + error);
        }
    },
    '(function(){window.adnPopConfig={zoneId:"149"}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cdb400a346ffb8cf37f33a522644f2cb"] === flag) {
                return;
            }
            (function() {
                window.adnPopConfig = {
                    zoneId: "149"
                };
            })();
            Object.defineProperty(Window.prototype.toString, "cdb400a346ffb8cf37f33a522644f2cb", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cdb400a346ffb8cf37f33a522644f2cb" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,o)=>{try{const t=e,o=t?.[0];t&&t.length>0&&t.length<10&&"string"==typeof o&&o?.includes?.("-bait-")&&(e=[])}catch(t){}return Reflect.apply(t,e,o)}};window.Array.prototype.some=new Proxy(window.Array.prototype.some,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ac633d86bc395ade3c178ab74b9477d7"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, o) => {
                        try {
                            const t = e, o = t?.[0];
                            t && t.length > 0 && t.length < 10 && "string" == typeof o && o?.includes?.("-bait-") && (e = []);
                        } catch (t) {}
                        return Reflect.apply(t, e, o);
                    }
                };
                window.Array.prototype.some = new Proxy(window.Array.prototype.some, t);
            })();
            Object.defineProperty(Window.prototype.toString, "ac633d86bc395ade3c178ab74b9477d7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ac633d86bc395ade3c178ab74b9477d7" due to: ' + error);
        }
    },
    '!function(){window.adsbygoogle={loaded:!0,push:function(){"undefined"===typeof this.length&&(this.length=0,this.length+=1)}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["065d3c28da0404a4fdfd569932271571"] === flag) {
                return;
            }
            !function() {
                window.adsbygoogle = {
                    loaded: !0,
                    push: function() {
                        "undefined" === typeof this.length && (this.length = 0, this.length += 1);
                    }
                };
            }();
            Object.defineProperty(Window.prototype.toString, "065d3c28da0404a4fdfd569932271571", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "065d3c28da0404a4fdfd569932271571" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{ var b=new MutationObserver(function(){try{for(var a,d=function(c){for(var a="",d=0;d<c;d++)a+="0123456789".charAt(Math.floor(10*Math.random()));return a},e=document.querySelectorAll(".adsbygoogle, script[data-ad-client]"),f=0;f<e.length;f++)if(e[f].getAttribute("data-ad-client")){a=e[f].getAttribute("data-ad-client");break}if(a){var g=`<ins class="adsbygoogle" data-adsbygoogle-status="done" style="display: block; height: 200px; width: 200px;" data-ad-status="unfilled"><ins id="aswift_0_expand" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;" tabindex="0" title="Advertisement" aria-label="Advertisement"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:200px;height:200px;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=${a}&amp;output=html&amp;adk=${d(10)}&amp;adf=${d(10)}&amp;lmt=${d(10)}&amp;plat=${d(100)};&amp;format=0x0&amp;url=${encodeURIComponent(document.location.href)}&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=${d(100)}&amp;bpp=2&amp;bdt=${d(3)}&amp;idt=${d(3)}&amp;shv=r${d(8)}&amp;mjsv=m${d(8)}&amp;ptt=${d(1)}&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=${d(8)}&amp;frm=${d(2)}&amp;pv=2&amp;ga_vid=${d(10)}.${d(10)}&amp;ga_sid=${d(10)}&amp;ga_hid=${d(10)}&amp;ga_fc=0&amp;u_tz=${d(3)}&amp;u_his=8&amp;u_java=0&amp;u_h=${d(4)}&amp;u_w=${d(4)}&amp;u_ah=${d(4)}&amp;u_aw=${d(4)}&amp;u_cd=${d(2)}&amp;u_nplug=${d(1)}&amp;u_nmime=${d(1)}&amp;adx=-${d(8)}&amp;ady=-${d(8)}&amp;biw=${d(4)}&amp;bih=${d(4)}&amp;scr_x=0&amp;scr_y=0&amp;eid=${d(30)}&amp;oid=${d(1)}&amp;pvsid=${d(16)}&amp;pem=${d(3)}&amp;eae=${d(1)}&amp;fc=${d(4)}&amp;brdim=${d(20)}&amp;vis=1&amp;rsz=${d(6)}&amp;abl=NS&amp;fu=${d(4)}&amp;bc=${d(2)}&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=128" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins>`,h=document.querySelector("body > *"),j=document.querySelectorAll(".phpbb-ads-center > .adsbygoogle");h&&j.length&&(!h.querySelector("iframe#aswift_0")&&h.insertAdjacentHTML("afterend",g),j.forEach(a=>{a.querySelector("iframe#aswift_0")||(a.parentNode.style.height="200px",a.parentNode.style.width="200px",a.parentNode.innerHTML=g)}))}var k=document.querySelector(".page-body"),l=document.querySelectorAll(".adsbygoogle, .phpbb-ads-center");k&&!k.innerText.includes("deactivating your Ad-Blocker")&&l.length&&(l.forEach(a=>{a.remove()}),b.disconnect())}catch(a){}});b.observe(document,{childList:!0,subtree:!0}),setTimeout(function(){b.disconnect()},1E4) }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["802366024dd441867900263826a1b687"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    var b = new MutationObserver((function() {
                        try {
                            for (var a, d = function(c) {
                                for (var a = "", d = 0; d < c; d++) a += "0123456789".charAt(Math.floor(10 * Math.random()));
                                return a;
                            }, e = document.querySelectorAll(".adsbygoogle, script[data-ad-client]"), f = 0; f < e.length; f++) if (e[f].getAttribute("data-ad-client")) {
                                a = e[f].getAttribute("data-ad-client");
                                break;
                            }
                            if (a) {
                                var g = `<ins class="adsbygoogle" data-adsbygoogle-status="done" style="display: block; height: 200px; width: 200px;" data-ad-status="unfilled"><ins id="aswift_0_expand" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: inline-table;" tabindex="0" title="Advertisement" aria-label="Advertisement"><ins id="aswift_0_anchor" style="border: none; height: 0px; width: 0px; margin: 0px; padding: 0px; position: relative; visibility: visible; background-color: transparent; display: block;"><iframe id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0;width:200px;height:200px;" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation" frameborder="0" src="https://googleads.g.doubleclick.net/pagead/ads?client=${a}&amp;output=html&amp;adk=${d(10)}&amp;adf=${d(10)}&amp;lmt=${d(10)}&amp;plat=${d(100)};&amp;format=0x0&amp;url=${encodeURIComponent(document.location.href)}&amp;ea=0&amp;flash=0&amp;pra=5&amp;wgl=1&amp;uach=${d(100)}&amp;bpp=2&amp;bdt=${d(3)}&amp;idt=${d(3)}&amp;shv=r${d(8)}&amp;mjsv=m${d(8)}&amp;ptt=${d(1)}&amp;saldr=aa&amp;abxe=1&amp;nras=1&amp;correlator=${d(8)}&amp;frm=${d(2)}&amp;pv=2&amp;ga_vid=${d(10)}.${d(10)}&amp;ga_sid=${d(10)}&amp;ga_hid=${d(10)}&amp;ga_fc=0&amp;u_tz=${d(3)}&amp;u_his=8&amp;u_java=0&amp;u_h=${d(4)}&amp;u_w=${d(4)}&amp;u_ah=${d(4)}&amp;u_aw=${d(4)}&amp;u_cd=${d(2)}&amp;u_nplug=${d(1)}&amp;u_nmime=${d(1)}&amp;adx=-${d(8)}&amp;ady=-${d(8)}&amp;biw=${d(4)}&amp;bih=${d(4)}&amp;scr_x=0&amp;scr_y=0&amp;eid=${d(30)}&amp;oid=${d(1)}&amp;pvsid=${d(16)}&amp;pem=${d(3)}&amp;eae=${d(1)}&amp;fc=${d(4)}&amp;brdim=${d(20)}&amp;vis=1&amp;rsz=${d(6)}&amp;abl=NS&amp;fu=${d(4)}&amp;bc=${d(2)}&amp;ifi=1&amp;uci=a!1&amp;fsb=1&amp;dtd=128" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" data-google-container-id="a!1" data-load-complete="true"></iframe></ins></ins></ins>`, h = document.querySelector("body > *"), j = document.querySelectorAll(".phpbb-ads-center > .adsbygoogle");
                                h && j.length && (!h.querySelector("iframe#aswift_0") && h.insertAdjacentHTML("afterend", g), 
                                j.forEach((a => {
                                    a.querySelector("iframe#aswift_0") || (a.parentNode.style.height = "200px", a.parentNode.style.width = "200px", 
                                    a.parentNode.innerHTML = g);
                                })));
                            }
                            var k = document.querySelector(".page-body"), l = document.querySelectorAll(".adsbygoogle, .phpbb-ads-center");
                            k && !k.innerText.includes("deactivating your Ad-Blocker") && l.length && (l.forEach((a => {
                                a.remove();
                            })), b.disconnect());
                        } catch (a) {}
                    }));
                    b.observe(document, {
                        childList: !0,
                        subtree: !0
                    }), setTimeout((function() {
                        b.disconnect();
                    }), 1e4);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "802366024dd441867900263826a1b687", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "802366024dd441867900263826a1b687" due to: ' + error);
        }
    },
    '(()=>{const e=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").set,t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").get;Object.defineProperty(Element.prototype,"innerHTML",{get(){return t.call(this)},set(t){if(t?.includes?.("disable your adblocker"))throw new Error;e.call(this,t)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["96cd53fdc3f56d04903d4a180e507d95"] === flag) {
                return;
            }
            (() => {
                const e = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, t = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").get;
                Object.defineProperty(Element.prototype, "innerHTML", {
                    get() {
                        return t.call(this);
                    },
                    set(t) {
                        if (t?.includes?.("disable your adblocker")) throw new Error;
                        e.call(this, t);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "96cd53fdc3f56d04903d4a180e507d95", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "96cd53fdc3f56d04903d4a180e507d95" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,o,t)=>(null===t[0]&&(t[0]={isUserSubscriber:!0}),Reflect.apply(e,o,t))},o={apply:(o,t,n)=>{const r=n[0];return"function"==typeof r&&r.toString().includes("AdBlockDetector")&&(n[0]=()=>{}),"function"==typeof r&&r.toString().includes("Preroll Ad")&&(n[0]=new Proxy(n[0],e)),Reflect.apply(o,t,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["785fddde2c2648fbf7b3c872780aab8f"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, o, t) => (null === t[0] && (t[0] = {
                        isUserSubscriber: !0
                    }), Reflect.apply(e, o, t))
                }, o = {
                    apply: (o, t, n) => {
                        const r = n[0];
                        return "function" == typeof r && r.toString().includes("AdBlockDetector") && (n[0] = () => {}), 
                        "function" == typeof r && r.toString().includes("Preroll Ad") && (n[0] = new Proxy(n[0], e)), 
                        Reflect.apply(o, t, n);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, o);
            })();
            Object.defineProperty(Window.prototype.toString, "785fddde2c2648fbf7b3c872780aab8f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "785fddde2c2648fbf7b3c872780aab8f" due to: ' + error);
        }
    },
    '(()=>{const e=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").set,t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").get;Object.defineProperty(Element.prototype,"innerHTML",{get(){return t.call(this)},set(t){if(t?.includes?.("allow adblock"))throw new Error;e.call(this,t)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["27477abfbce9ce3be4dd5c5e090561b7"] === flag) {
                return;
            }
            (() => {
                const e = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, t = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").get;
                Object.defineProperty(Element.prototype, "innerHTML", {
                    get() {
                        return t.call(this);
                    },
                    set(t) {
                        if (t?.includes?.("allow adblock")) throw new Error;
                        e.call(this, t);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "27477abfbce9ce3be4dd5c5e090561b7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "27477abfbce9ce3be4dd5c5e090561b7" due to: ' + error);
        }
    },
    "window.adsbygoogle = { loaded: !0 };": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["df4e0801aa685812f605b6558f08d2df"] === flag) {
                return;
            }
            window.adsbygoogle = {
                loaded: !0
            };
            Object.defineProperty(Window.prototype.toString, "df4e0801aa685812f605b6558f08d2df", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "df4e0801aa685812f605b6558f08d2df" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,r,e)=>{try{const t=e[0];t?.matches?.(\'[class^="b_ad"]\')&&(e[0]=document.querySelector("#b_results .b_algo"))}catch(t){}return Reflect.apply(t,r,e)}};window.Array.prototype.push=new Proxy(window.Array.prototype.push,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["090ddb6ae838bb8f2e9f32783f4a3f91"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, r, e) => {
                        try {
                            const t = e[0];
                            t?.matches?.('[class^="b_ad"]') && (e[0] = document.querySelector("#b_results .b_algo"));
                        } catch (t) {}
                        return Reflect.apply(t, r, e);
                    }
                };
                window.Array.prototype.push = new Proxy(window.Array.prototype.push, t);
            })();
            Object.defineProperty(Window.prototype.toString, "090ddb6ae838bb8f2e9f32783f4a3f91", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "090ddb6ae838bb8f2e9f32783f4a3f91" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,n)=>{const o=Reflect.apply(e,t,n);try{o instanceof HTMLIFrameElement&&""===o.src&&o.contentWindow&&(o.contentWindow.Element.prototype.querySelectorAll=window.Element.prototype.querySelectorAll)}catch(e){}return o}};Node.prototype.appendChild=new Proxy(Node.prototype.appendChild,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["30bbe571a0d19393740111580aa75056"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, n) => {
                        const o = Reflect.apply(e, t, n);
                        try {
                            o instanceof HTMLIFrameElement && "" === o.src && o.contentWindow && (o.contentWindow.Element.prototype.querySelectorAll = window.Element.prototype.querySelectorAll);
                        } catch (e) {}
                        return o;
                    }
                };
                Node.prototype.appendChild = new Proxy(Node.prototype.appendChild, e);
            })();
            Object.defineProperty(Window.prototype.toString, "30bbe571a0d19393740111580aa75056", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "30bbe571a0d19393740111580aa75056" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,l)=>{try{const e=l[0];e?.includes(".b_ad")?l[0]="#b_results .b_algo:not([style]):first-child":e?.includes(".b_restorableLink")&&(l[0]=".b_algo:not([style]):first-child")}catch(e){}return Reflect.apply(e,t,l)}};window.Element.prototype.querySelectorAll=new Proxy(window.Element.prototype.querySelectorAll,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3f9349499c12f0de6fc9e5d54f2f664f"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, l) => {
                        try {
                            const e = l[0];
                            e?.includes(".b_ad") ? l[0] = "#b_results .b_algo:not([style]):first-child" : e?.includes(".b_restorableLink") && (l[0] = ".b_algo:not([style]):first-child");
                        } catch (e) {}
                        return Reflect.apply(e, t, l);
                    }
                };
                window.Element.prototype.querySelectorAll = new Proxy(window.Element.prototype.querySelectorAll, e);
            })();
            Object.defineProperty(Window.prototype.toString, "3f9349499c12f0de6fc9e5d54f2f664f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3f9349499c12f0de6fc9e5d54f2f664f" due to: ' + error);
        }
    },
    '(()=>{const t=/^.?(Sponsored|广告).?$/,e=new Set,o={apply:(o,n,r)=>{try{const o=r[0];o&&"string"==typeof o&&t.test(o.trim())&&e.add(n.canvas)}catch(t){}return Reflect.apply(o,n,r)}};window.CanvasRenderingContext2D.prototype.fillText=new Proxy(window.CanvasRenderingContext2D.prototype.fillText,o);const n=new Set,r={apply:(t,o,r)=>{try{if(e.has(o)){const e=Reflect.apply(t,o,r);return n.add(e),e}}catch(t){}return Reflect.apply(t,o,r)}};window.HTMLCanvasElement.prototype.toDataURL=new Proxy(window.HTMLCanvasElement.prototype.toDataURL,r);const a={apply:(t,e,o)=>{try{r=o[0],Array.from(n).some((t=>r.includes(t)))&&(o[0]=o[0].replace(/(^\\..+?):/,".b_algo:has($1){display:none!important;}$1:"))}catch(t){}var r;return Reflect.apply(t,e,o)}};window.Document.prototype.createTextNode=new Proxy(window.Document.prototype.createTextNode,a)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f9b35df46321d2fbbc6f2fa5a8ce976a"] === flag) {
                return;
            }
            (() => {
                const t = /^.?(Sponsored|广告).?$/, e = new Set, o = {
                    apply: (o, n, r) => {
                        try {
                            const o = r[0];
                            o && "string" == typeof o && t.test(o.trim()) && e.add(n.canvas);
                        } catch (t) {}
                        return Reflect.apply(o, n, r);
                    }
                };
                window.CanvasRenderingContext2D.prototype.fillText = new Proxy(window.CanvasRenderingContext2D.prototype.fillText, o);
                const n = new Set, r = {
                    apply: (t, o, r) => {
                        try {
                            if (e.has(o)) {
                                const e = Reflect.apply(t, o, r);
                                return n.add(e), e;
                            }
                        } catch (t) {}
                        return Reflect.apply(t, o, r);
                    }
                };
                window.HTMLCanvasElement.prototype.toDataURL = new Proxy(window.HTMLCanvasElement.prototype.toDataURL, r);
                const a = {
                    apply: (t, e, o) => {
                        try {
                            r = o[0], Array.from(n).some((t => r.includes(t))) && (o[0] = o[0].replace(/(^\..+?):/, ".b_algo:has($1){display:none!important;}$1:"));
                        } catch (t) {}
                        var r;
                        return Reflect.apply(t, e, o);
                    }
                };
                window.Document.prototype.createTextNode = new Proxy(window.Document.prototype.createTextNode, a);
            })();
            Object.defineProperty(Window.prototype.toString, "f9b35df46321d2fbbc6f2fa5a8ce976a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f9b35df46321d2fbbc6f2fa5a8ce976a" due to: ' + error);
        }
    },
    "(function(){var b=window.setInterval;window.setInterval=function(a,c){if(!/e\\.display=='hidden'[\\s\\S]*?e\\.visibility=='none'/.test(a.toString()))return b(a,c)}.bind(window)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["799170846df78b2e8c6f8f1ecbe9f9ab"] === flag) {
                return;
            }
            (function() {
                var b = window.setInterval;
                window.setInterval = function(a, c) {
                    if (!/e\.display=='hidden'[\s\S]*?e\.visibility=='none'/.test(a.toString())) return b(a, c);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "799170846df78b2e8c6f8f1ecbe9f9ab", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "799170846df78b2e8c6f8f1ecbe9f9ab" due to: ' + error);
        }
    },
    "window.$tieE3 = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["abf848581aab7ee411a3a190d6305e9f"] === flag) {
                return;
            }
            window.$tieE3 = true;
            Object.defineProperty(Window.prototype.toString, "abf848581aab7ee411a3a190d6305e9f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "abf848581aab7ee411a3a190d6305e9f" due to: ' + error);
        }
    },
    "window.Advertisement = 1;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a77fad03c24e228b97652a46d1fa5f22"] === flag) {
                return;
            }
            window.Advertisement = 1;
            Object.defineProperty(Window.prototype.toString, "a77fad03c24e228b97652a46d1fa5f22", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a77fad03c24e228b97652a46d1fa5f22" due to: ' + error);
        }
    },
    "window.adsEnabled = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["62d14321dc3e190666318c2f0ddfdcac"] === flag) {
                return;
            }
            window.adsEnabled = true;
            Object.defineProperty(Window.prototype.toString, "62d14321dc3e190666318c2f0ddfdcac", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "62d14321dc3e190666318c2f0ddfdcac" due to: ' + error);
        }
    },
    "window.uabpdl = window.uabInject = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["33d2335f47a6a24e15dbab294084b29d"] === flag) {
                return;
            }
            window.uabpdl = window.uabInject = true;
            Object.defineProperty(Window.prototype.toString, "33d2335f47a6a24e15dbab294084b29d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "33d2335f47a6a24e15dbab294084b29d" due to: ' + error);
        }
    },
    "window.detector_active = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fff6b1a1e7573bdc8801939be0d52c55"] === flag) {
                return;
            }
            window.detector_active = true;
            Object.defineProperty(Window.prototype.toString, "fff6b1a1e7573bdc8801939be0d52c55", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fff6b1a1e7573bdc8801939be0d52c55" due to: ' + error);
        }
    },
    "window.Adv_ab = false;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5601052c8ba773fc21566b0dfbe3e078"] === flag) {
                return;
            }
            window.Adv_ab = false;
            Object.defineProperty(Window.prototype.toString, "5601052c8ba773fc21566b0dfbe3e078", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5601052c8ba773fc21566b0dfbe3e078" due to: ' + error);
        }
    },
    "window.adsEnabled=!0;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["be54fb20467f57c75acee13f527620e5"] === flag) {
                return;
            }
            window.adsEnabled = !0;
            Object.defineProperty(Window.prototype.toString, "be54fb20467f57c75acee13f527620e5", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "be54fb20467f57c75acee13f527620e5" due to: ' + error);
        }
    },
    '(function(a){setTimeout=function(){var b="function"==typeof arguments[0]?Function.prototype.toString.call(arguments[0]):"string"==typeof arguments[0]?arguments[0]:String(arguments[0]);return/\\[(_0x[a-z0-9]{4,})\\[\\d+\\]\\][\\[\\(]\\1\\[\\d+\\]/.test(b)?NaN:a.apply(window,arguments)}.bind();Object.defineProperty(setTimeout,"name",{value:a.name});setTimeout.toString=Function.prototype.toString.bind(a)})(setTimeout);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d51de922f2ef3a82152acd709db8a549"] === flag) {
                return;
            }
            (function(a) {
                setTimeout = function() {
                    var b = "function" == typeof arguments[0] ? Function.prototype.toString.call(arguments[0]) : "string" == typeof arguments[0] ? arguments[0] : String(arguments[0]);
                    return /\[(_0x[a-z0-9]{4,})\[\d+\]\][\[\(]\1\[\d+\]/.test(b) ? NaN : a.apply(window, arguments);
                }.bind();
                Object.defineProperty(setTimeout, "name", {
                    value: a.name
                });
                setTimeout.toString = Function.prototype.toString.bind(a);
            })(setTimeout);
            Object.defineProperty(Window.prototype.toString, "d51de922f2ef3a82152acd709db8a549", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d51de922f2ef3a82152acd709db8a549" due to: ' + error);
        }
    },
    '(function(b,c){setTimeout=function(){var a=arguments[0];if("function"==typeof a&&/^function [A-Za-z]{1,2}\\(\\)\\s*\\{([A-Za-z])\\|\\|\\(\\1=!0,[\\s\\S]{1,13}\\(\\)\\)\\}$/.test(c.call(a)))throw"Adguard stopped a script execution.";return b.apply(window,arguments)}})(setTimeout,Function.prototype.toString);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["41822b6439a26cd50f44b208e1bad083"] === flag) {
                return;
            }
            (function(b, c) {
                setTimeout = function() {
                    var a = arguments[0];
                    if ("function" == typeof a && /^function [A-Za-z]{1,2}\(\)\s*\{([A-Za-z])\|\|\(\1=!0,[\s\S]{1,13}\(\)\)\}$/.test(c.call(a))) throw "Adguard stopped a script execution.";
                    return b.apply(window, arguments);
                };
            })(setTimeout, Function.prototype.toString);
            Object.defineProperty(Window.prototype.toString, "41822b6439a26cd50f44b208e1bad083", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "41822b6439a26cd50f44b208e1bad083" due to: ' + error);
        }
    },
    "window.sessionStorage.loadedAds = 3;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["73f1b4fc791cbf3105708cabf5b1db21"] === flag) {
                return;
            }
            window.sessionStorage.loadedAds = 3;
            Object.defineProperty(Window.prototype.toString, "73f1b4fc791cbf3105708cabf5b1db21", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "73f1b4fc791cbf3105708cabf5b1db21" due to: ' + error);
        }
    },
    "(function() { window.xRds = false; window.frg = true; window.frag = true;  })();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["baafa2147233f1a8add3836529d4779e"] === flag) {
                return;
            }
            (function() {
                window.xRds = false;
                window.frg = true;
                window.frag = true;
            })();
            Object.defineProperty(Window.prototype.toString, "baafa2147233f1a8add3836529d4779e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "baafa2147233f1a8add3836529d4779e" due to: ' + error);
        }
    },
    "window.canABP = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b1d0f666ef36ca7989b62d00b88a8084"] === flag) {
                return;
            }
            window.canABP = true;
            Object.defineProperty(Window.prototype.toString, "b1d0f666ef36ca7989b62d00b88a8084", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b1d0f666ef36ca7989b62d00b88a8084" due to: ' + error);
        }
    },
    "var _st = window.setTimeout; window.setTimeout = function(a, b) { if(!/displayAdBlockedVideo/.test(a)){ _st(a,b);}};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2ac41d844f1f8bd49b7778aeb6e0c2cc"] === flag) {
                return;
            }
            var _st = window.setTimeout;
            window.setTimeout = function(a, b) {
                if (!/displayAdBlockedVideo/.test(a)) {
                    _st(a, b);
                }
            };
            Object.defineProperty(Window.prototype.toString, "2ac41d844f1f8bd49b7778aeb6e0c2cc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2ac41d844f1f8bd49b7778aeb6e0c2cc" due to: ' + error);
        }
    },
    'document.cookie="popunder=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cc60c320cd31f7c797cace7d0a8f787a"] === flag) {
                return;
            }
            document.cookie = "popunder=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "cc60c320cd31f7c797cace7d0a8f787a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cc60c320cd31f7c797cace7d0a8f787a" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,c)=>{try{const e=c[1],t=c[2];"redirectToAdblockDetected"===e&&"function"==typeof t?.value&&(c[2].value=()=>{})}catch(e){}return Reflect.apply(e,t,c)}};window.Object.defineProperty=new Proxy(window.Object.defineProperty,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["069a24db4a5d4560bb9968124b35e82a"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, c) => {
                        try {
                            const e = c[1], t = c[2];
                            "redirectToAdblockDetected" === e && "function" == typeof t?.value && (c[2].value = () => {});
                        } catch (e) {}
                        return Reflect.apply(e, t, c);
                    }
                };
                window.Object.defineProperty = new Proxy(window.Object.defineProperty, e);
            })();
            Object.defineProperty(Window.prototype.toString, "069a24db4a5d4560bb9968124b35e82a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "069a24db4a5d4560bb9968124b35e82a" due to: ' + error);
        }
    },
    "(()=>{const e={apply:(e,r,t)=>{try{const e=r[0];e?.adTree&&(r.shift(),t=[])}catch(e){console.trace(e)}return Reflect.apply(e,r,t)}};window.Array.prototype.splice=new Proxy(window.Array.prototype.splice,e)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2fa6b0fc3f291729ed8dab8e63b1df26"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, r, t) => {
                        try {
                            const e = r[0];
                            e?.adTree && (r.shift(), t = []);
                        } catch (e) {
                            console.trace(e);
                        }
                        return Reflect.apply(e, r, t);
                    }
                };
                window.Array.prototype.splice = new Proxy(window.Array.prototype.splice, e);
            })();
            Object.defineProperty(Window.prototype.toString, "2fa6b0fc3f291729ed8dab8e63b1df26", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2fa6b0fc3f291729ed8dab8e63b1df26" due to: ' + error);
        }
    },
    "!function(){if(location.pathname.indexOf(\"/iframe/player\")===-1){Object.defineProperty(Object.prototype, 'kununu_mul', { get: function(){ throw null; }, set: function(){ throw null; }});}}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0024181b43199be4e6f6d4dc8cace28f"] === flag) {
                return;
            }
            !function() {
                if (location.pathname.indexOf("/iframe/player") === -1) {
                    Object.defineProperty(Object.prototype, "kununu_mul", {
                        get: function() {
                            throw null;
                        },
                        set: function() {
                            throw null;
                        }
                    });
                }
            }();
            Object.defineProperty(Window.prototype.toString, "0024181b43199be4e6f6d4dc8cace28f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0024181b43199be4e6f6d4dc8cace28f" due to: ' + error);
        }
    },
    '!function(){const r={apply:(r,o,e)=>(e[0]?.includes?.("{}")&&(e[0]="<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<vmap:VMAP version=\\"1.0\\" xmlns:vmap=\\"http://www.iab.net/videosuite/vmap\\"><vmap:AdBreak timeOffset=\\"start\\" breakType=\\"linear\\" breakId=\\"4f95e542-9da8-480e-8c2a-7ade1ffdcc3d\\"><vmap:AdSource allowMultipleAds=\\"true\\" followRedirects=\\"true\\"><vmap:VASTAdData></vmap:VASTAdData></vmap:AdSource></vmap:AdBreak></vmap:VMAP>"),Reflect.apply(r,o,e))};window.DOMParser.prototype.parseFromString=new Proxy(window.DOMParser.prototype.parseFromString,r)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["631aed795dd7ba8bffc8ac13694e2216"] === flag) {
                return;
            }
            !function() {
                const r = {
                    apply: (r, o, e) => (e[0]?.includes?.("{}") && (e[0] = '<?xml version="1.0" encoding="UTF-8"?>\n<vmap:VMAP version="1.0" xmlns:vmap="http://www.iab.net/videosuite/vmap"><vmap:AdBreak timeOffset="start" breakType="linear" breakId="4f95e542-9da8-480e-8c2a-7ade1ffdcc3d"><vmap:AdSource allowMultipleAds="true" followRedirects="true"><vmap:VASTAdData></vmap:VASTAdData></vmap:AdSource></vmap:AdBreak></vmap:VMAP>'), 
                    Reflect.apply(r, o, e))
                };
                window.DOMParser.prototype.parseFromString = new Proxy(window.DOMParser.prototype.parseFromString, r);
            }();
            Object.defineProperty(Window.prototype.toString, "631aed795dd7ba8bffc8ac13694e2216", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "631aed795dd7ba8bffc8ac13694e2216" due to: ' + error);
        }
    },
    '(()=>{window.googletag={cmd:[],apiReady:!0,getVersion:function(){return"202609010101"}};window.pbjs={getConsentMetadata(){}};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d6d22db8f380b5777ac50c35fa683d54"] === flag) {
                return;
            }
            (() => {
                window.googletag = {
                    cmd: [],
                    apiReady: !0,
                    getVersion: function() {
                        return "202609010101";
                    }
                };
                window.pbjs = {
                    getConsentMetadata() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "d6d22db8f380b5777ac50c35fa683d54", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d6d22db8f380b5777ac50c35fa683d54" due to: ' + error);
        }
    },
    '!function(){const e={apply:(e,t,n)=>{if("prg"!==t?.id)return Reflect.apply(e,t,n);const o=Reflect.apply(e,t,n);return Object.defineProperty(o,"top",{value:500}),o}};window.Element.prototype.getBoundingClientRect=new Proxy(window.Element.prototype.getBoundingClientRect,e)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8de36e4bf3b484248c14b692ab7d0b97"] === flag) {
                return;
            }
            !function() {
                const e = {
                    apply: (e, t, n) => {
                        if ("prg" !== t?.id) return Reflect.apply(e, t, n);
                        const o = Reflect.apply(e, t, n);
                        return Object.defineProperty(o, "top", {
                            value: 500
                        }), o;
                    }
                };
                window.Element.prototype.getBoundingClientRect = new Proxy(window.Element.prototype.getBoundingClientRect, e);
            }();
            Object.defineProperty(Window.prototype.toString, "8de36e4bf3b484248c14b692ab7d0b97", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8de36e4bf3b484248c14b692ab7d0b97" due to: ' + error);
        }
    },
    "window.atob = function() { };": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bd6f7fef7248ea934c306654651e8882"] === flag) {
                return;
            }
            window.atob = function() {};
            Object.defineProperty(Window.prototype.toString, "bd6f7fef7248ea934c306654651e8882", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bd6f7fef7248ea934c306654651e8882" due to: ' + error);
        }
    },
    "window.canABP = window.canRunAds = window.canCheckAds = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7fa951f734c0ba707fc4893dc83b1a38"] === flag) {
                return;
            }
            window.canABP = window.canRunAds = window.canCheckAds = true;
            Object.defineProperty(Window.prototype.toString, "7fa951f734c0ba707fc4893dc83b1a38", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7fa951f734c0ba707fc4893dc83b1a38" due to: ' + error);
        }
    },
    "window.canRun = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cb7e5a7f0c3e95af411eb95c880d423d"] === flag) {
                return;
            }
            window.canRun = true;
            Object.defineProperty(Window.prototype.toString, "cb7e5a7f0c3e95af411eb95c880d423d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cb7e5a7f0c3e95af411eb95c880d423d" due to: ' + error);
        }
    },
    'window.googleToken = "no";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["14f3ab7c380717fd60634b54e8ee9403"] === flag) {
                return;
            }
            window.googleToken = "no";
            Object.defineProperty(Window.prototype.toString, "14f3ab7c380717fd60634b54e8ee9403", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "14f3ab7c380717fd60634b54e8ee9403" due to: ' + error);
        }
    },
    '(()=>{const t={construct:(t,c,n)=>{try{const t=c[0],n=(new Error).stack;t&&"function"==typeof t&&t.toString().includes(")):void")&&n.includes("detectAnyAdblocker")&&(c[0]=()=>{})}catch(t){}return Reflect.construct(t,c,n)}};window.Promise=new Proxy(window.Promise,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3d4252a5af8af68f3194e3ff5d924d65"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, c, n) => {
                        try {
                            const t = c[0], n = (new Error).stack;
                            t && "function" == typeof t && t.toString().includes(")):void") && n.includes("detectAnyAdblocker") && (c[0] = () => {});
                        } catch (t) {}
                        return Reflect.construct(t, c, n);
                    }
                };
                window.Promise = new Proxy(window.Promise, t);
            })();
            Object.defineProperty(Window.prototype.toString, "3d4252a5af8af68f3194e3ff5d924d65", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3d4252a5af8af68f3194e3ff5d924d65" due to: ' + error);
        }
    },
    "(()=>{window.com_adswizz_synchro_decorateUrl=(a)=>a;})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e98a98ef2962b13e300d81c08a1652e0"] === flag) {
                return;
            }
            (() => {
                window.com_adswizz_synchro_decorateUrl = a => a;
            })();
            Object.defineProperty(Window.prototype.toString, "e98a98ef2962b13e300d81c08a1652e0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e98a98ef2962b13e300d81c08a1652e0" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{var a=document.querySelector("body");document.location.hostname.includes("skmedix.pl")&&a&&a.insertAdjacentHTML("beforeend",\'<ins class="adsbygoogle" data-ad-status="filled"><div id="aswift_" style="position: absolute !important; left: -3000px !important;"><iframe id="aswift_"></iframe></div></ins><iframe src="/aframe"></iframe>\')})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["931980a2c6180f6edbcd6f228a2db536"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    var a = document.querySelector("body");
                    document.location.hostname.includes("skmedix.pl") && a && a.insertAdjacentHTML("beforeend", '<ins class="adsbygoogle" data-ad-status="filled"><div id="aswift_" style="position: absolute !important; left: -3000px !important;"><iframe id="aswift_"></iframe></div></ins><iframe src="/aframe"></iframe>');
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "931980a2c6180f6edbcd6f228a2db536", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "931980a2c6180f6edbcd6f228a2db536" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{   setTimeout(function() { if(typeof show_game_iframe === "function") { show_game_iframe(); } }, 1000); }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["66e1a81529963f50c62391d4d9356ef0"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        if (typeof show_game_iframe === "function") {
                            show_game_iframe();
                        }
                    }), 1e3);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "66e1a81529963f50c62391d4d9356ef0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "66e1a81529963f50c62391d4d9356ef0" due to: ' + error);
        }
    },
    '(()=>{window.sas_idmnet=window.sas_idmnet||{};Object.assign(sas_idmnet,{releaseVideo:function(a){if("object"==typeof videoInit&&"function"==typeof videoInit.start)try{videoInit.start(a,n)}catch(a){}},release:function(){},placementsList:function(){}});const a=function(a,b){if(a&&a.push)for(a.push=b;a.length;)b(a.shift())},b=function(a){try{a()}catch(a){console.error(a)}};"complete"===document.readyState?a(sas_idmnet.cmd,b):window.addEventListener("load",()=>{a(sas_idmnet.cmd,b)})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["35966fc2cd75edd8c085792a4413cc08"] === flag) {
                return;
            }
            (() => {
                window.sas_idmnet = window.sas_idmnet || {};
                Object.assign(sas_idmnet, {
                    releaseVideo: function(a) {
                        if ("object" == typeof videoInit && "function" == typeof videoInit.start) try {
                            videoInit.start(a, n);
                        } catch (a) {}
                    },
                    release: function() {},
                    placementsList: function() {}
                });
                const a = function(a, b) {
                    if (a && a.push) for (a.push = b; a.length; ) b(a.shift());
                }, b = function(a) {
                    try {
                        a();
                    } catch (a) {
                        console.error(a);
                    }
                };
                "complete" === document.readyState ? a(sas_idmnet.cmd, b) : window.addEventListener("load", (() => {
                    a(sas_idmnet.cmd, b);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "35966fc2cd75edd8c085792a4413cc08", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "35966fc2cd75edd8c085792a4413cc08" due to: ' + error);
        }
    },
    "!function(){window.YLHH={bidder:{startAuction:function(){}}};}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["609bede022cc082da833f6d8f49bff77"] === flag) {
                return;
            }
            !function() {
                window.YLHH = {
                    bidder: {
                        startAuction: function() {}
                    }
                };
            }();
            Object.defineProperty(Window.prototype.toString, "609bede022cc082da833f6d8f49bff77", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "609bede022cc082da833f6d8f49bff77" due to: ' + error);
        }
    },
    "(function(){var c=window.setTimeout;window.setTimeout=function(f,g){return g===1e3&&/#kam-ban-player/.test(f.toString())&&(g*=0.01),c.apply(this,arguments)}.bind(window)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4706a9dfd57dc72a9584b54986a27381"] === flag) {
                return;
            }
            (function() {
                var c = window.setTimeout;
                window.setTimeout = function(f, g) {
                    return g === 1e3 && /#kam-ban-player/.test(f.toString()) && (g *= .01), c.apply(this, arguments);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "4706a9dfd57dc72a9584b54986a27381", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4706a9dfd57dc72a9584b54986a27381" due to: ' + error);
        }
    },
    "Object.defineProperty(Object.prototype,'getCreativeId',{value:()=>{}});": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bb1e9134a8b4e3c7a0b399a46c02c14b"] === flag) {
                return;
            }
            Object.defineProperty(Object.prototype, "getCreativeId", {
                value: () => {}
            });
            Object.defineProperty(Window.prototype.toString, "bb1e9134a8b4e3c7a0b399a46c02c14b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bb1e9134a8b4e3c7a0b399a46c02c14b" due to: ' + error);
        }
    },
    '(()=>{const t=Object.getOwnPropertyDescriptor,e={apply:(e,n,r)=>{const o=r[0];if(o?.toString?.()?.includes("EventTarget")){const e=t(o,"addEventListener");e?.set?.toString&&(e.set.toString=function(){}),e?.get?.toString&&(e.get.toString=function(){})}return Reflect.apply(e,n,r)}};window.Object.getOwnPropertyDescriptors=new Proxy(window.Object.getOwnPropertyDescriptors,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f5e04b1e897644b8741f5724e8210233"] === flag) {
                return;
            }
            (() => {
                const t = Object.getOwnPropertyDescriptor, e = {
                    apply: (e, n, r) => {
                        const o = r[0];
                        if (o?.toString?.()?.includes("EventTarget")) {
                            const e = t(o, "addEventListener");
                            e?.set?.toString && (e.set.toString = function() {}), e?.get?.toString && (e.get.toString = function() {});
                        }
                        return Reflect.apply(e, n, r);
                    }
                };
                window.Object.getOwnPropertyDescriptors = new Proxy(window.Object.getOwnPropertyDescriptors, e);
            })();
            Object.defineProperty(Window.prototype.toString, "f5e04b1e897644b8741f5724e8210233", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f5e04b1e897644b8741f5724e8210233" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,o)=>{try{o[0]?.toString().includes("detected:")&&(o[0]=()=>{})}catch(t){}return Reflect.apply(t,e,o)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ac9f18746f9845e03b66324b7876d5d0"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, o) => {
                        try {
                            o[0]?.toString().includes("detected:") && (o[0] = () => {});
                        } catch (t) {}
                        return Reflect.apply(t, e, o);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, t);
            })();
            Object.defineProperty(Window.prototype.toString, "ac9f18746f9845e03b66324b7876d5d0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ac9f18746f9845e03b66324b7876d5d0" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,p,e)=>{try{e.length>0&&("visibility"===e[0]||e[0]?.startsWith?.("shim:"))&&1===e[1]&&(e[1]=0)}catch(t){}return Reflect.apply(t,p,e)}};window.Map.prototype.set=new Proxy(window.Map.prototype.set,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9a27a7df929713b79f8cf294289dcc27"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, p, e) => {
                        try {
                            e.length > 0 && ("visibility" === e[0] || e[0]?.startsWith?.("shim:")) && 1 === e[1] && (e[1] = 0);
                        } catch (t) {}
                        return Reflect.apply(t, p, e);
                    }
                };
                window.Map.prototype.set = new Proxy(window.Map.prototype.set, t);
            })();
            Object.defineProperty(Window.prototype.toString, "9a27a7df929713b79f8cf294289dcc27", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9a27a7df929713b79f8cf294289dcc27" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,r,e)=>{let o=r;try{const t=o?.length;t&&t>10&&t<30&&(n=o,Array.isArray(n)&&0!==n.length&&n.some((t=>"function"==typeof t&&!!t.toString().includes("ABDetector"))))&&(o=[])}catch(t){}var n;return Reflect.apply(t,o,e)}};window.Array.prototype.map=new Proxy(window.Array.prototype.map,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6ec2adf2cbc34cfc38ddca7a4f5a95ee"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, r, e) => {
                        let o = r;
                        try {
                            const t = o?.length;
                            t && t > 10 && t < 30 && (n = o, Array.isArray(n) && 0 !== n.length && n.some((t => "function" == typeof t && !!t.toString().includes("ABDetector")))) && (o = []);
                        } catch (t) {}
                        var n;
                        return Reflect.apply(t, o, e);
                    }
                };
                window.Array.prototype.map = new Proxy(window.Array.prototype.map, t);
            })();
            Object.defineProperty(Window.prototype.toString, "6ec2adf2cbc34cfc38ddca7a4f5a95ee", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6ec2adf2cbc34cfc38ddca7a4f5a95ee" due to: ' + error);
        }
    },
    '(()=>{const t=new Set(["VP","w3","JW"]),e=/\\{return\\(.{1,5}\\)\\(\\)===.\\..\\}/,n={apply:(t,n,r)=>{if("function"!=typeof t)return Reflect.apply(t,n,r);const p=t.toString();return e.test(p)&&(t=function(){return!1}),Reflect.apply(t,n,r)}},r={apply:(t,e,r)=>{let p=Reflect.apply(t,e,r);return"function"==typeof p&&(p=new Proxy(p,n)),p}},p={apply:(e,n,p)=>{try{const o=p[1],c=p[2]?.get;if(!o||"function"!=typeof c)return Reflect.apply(e,n,p);t.has(o)&&/^\\(\\)=>.$/.test(c.toString())?p[2].get=function(){return function(){return!1}}:"A"===o&&c.toString().includes("()=>i")&&(p[2].get=new Proxy(p[2].get,r))}catch(t){}return Reflect.apply(e,n,p)}};Object.defineProperty=new Proxy(Object.defineProperty,p)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["419ecd20b58c82c1446f3eefaac9ae3b"] === flag) {
                return;
            }
            (() => {
                const t = new Set([ "VP", "w3", "JW" ]), e = /\{return\(.{1,5}\)\(\)===.\..\}/, n = {
                    apply: (t, n, r) => {
                        if ("function" != typeof t) return Reflect.apply(t, n, r);
                        const p = t.toString();
                        return e.test(p) && (t = function() {
                            return !1;
                        }), Reflect.apply(t, n, r);
                    }
                }, r = {
                    apply: (t, e, r) => {
                        let p = Reflect.apply(t, e, r);
                        return "function" == typeof p && (p = new Proxy(p, n)), p;
                    }
                }, p = {
                    apply: (e, n, p) => {
                        try {
                            const o = p[1], c = p[2]?.get;
                            if (!o || "function" != typeof c) return Reflect.apply(e, n, p);
                            t.has(o) && /^\(\)=>.$/.test(c.toString()) ? p[2].get = function() {
                                return function() {
                                    return !1;
                                };
                            } : "A" === o && c.toString().includes("()=>i") && (p[2].get = new Proxy(p[2].get, r));
                        } catch (t) {}
                        return Reflect.apply(e, n, p);
                    }
                };
                Object.defineProperty = new Proxy(Object.defineProperty, p);
            })();
            Object.defineProperty(Window.prototype.toString, "419ecd20b58c82c1446f3eefaac9ae3b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "419ecd20b58c82c1446f3eefaac9ae3b" due to: ' + error);
        }
    },
    "window.uabpInject = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2809f16b065b7f9160467af78eee1331"] === flag) {
                return;
            }
            window.uabpInject = function() {};
            Object.defineProperty(Window.prototype.toString, "2809f16b065b7f9160467af78eee1331", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2809f16b065b7f9160467af78eee1331" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/checkAds\\(\\);/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["140cb9c461f230aead2587075c4c3389"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/checkAds\(\);/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "140cb9c461f230aead2587075c4c3389", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "140cb9c461f230aead2587075c4c3389" due to: ' + error);
        }
    },
    "window.adblock = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a512aca8faf6bfd74f571200978abea9"] === flag) {
                return;
            }
            window.adblock = true;
            Object.defineProperty(Window.prototype.toString, "a512aca8faf6bfd74f571200978abea9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a512aca8faf6bfd74f571200978abea9" due to: ' + error);
        }
    },
    "window.ads_unblocked = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["786bc16fd657931f3a0d027130de4773"] === flag) {
                return;
            }
            window.ads_unblocked = true;
            Object.defineProperty(Window.prototype.toString, "786bc16fd657931f3a0d027130de4773", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "786bc16fd657931f3a0d027130de4773" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,o)=>{try{const t=e;t&&"object"==typeof t&&t.context?.bidRequestId&&(e={})}catch(t){}return Reflect.apply(t,e,o)}};window.Object.prototype.hasOwnProperty=new Proxy(window.Object.prototype.hasOwnProperty,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["34e4fe8cb80172726ed88130c50a490c"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, o) => {
                        try {
                            const t = e;
                            t && "object" == typeof t && t.context?.bidRequestId && (e = {});
                        } catch (t) {}
                        return Reflect.apply(t, e, o);
                    }
                };
                window.Object.prototype.hasOwnProperty = new Proxy(window.Object.prototype.hasOwnProperty, t);
            })();
            Object.defineProperty(Window.prototype.toString, "34e4fe8cb80172726ed88130c50a490c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "34e4fe8cb80172726ed88130c50a490c" due to: ' + error);
        }
    },
    '!function(){const r={apply:(r,o,e)=>(e[0]?.includes?.("</VAST>")&&(e[0]=""),Reflect.apply(r,o,e))};window.DOMParser.prototype.parseFromString=new Proxy(window.DOMParser.prototype.parseFromString,r)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["877dd0aed94e4d29a83c4c3327d544f8"] === flag) {
                return;
            }
            !function() {
                const r = {
                    apply: (r, o, e) => (e[0]?.includes?.("</VAST>") && (e[0] = ""), Reflect.apply(r, o, e))
                };
                window.DOMParser.prototype.parseFromString = new Proxy(window.DOMParser.prototype.parseFromString, r);
            }();
            Object.defineProperty(Window.prototype.toString, "877dd0aed94e4d29a83c4c3327d544f8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "877dd0aed94e4d29a83c4c3327d544f8" due to: ' + error);
        }
    },
    "window.adsOk = !0;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["58f079e742093da39c91a591e99389ce"] === flag) {
                return;
            }
            window.adsOk = !0;
            Object.defineProperty(Window.prototype.toString, "58f079e742093da39c91a591e99389ce", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "58f079e742093da39c91a591e99389ce" due to: ' + error);
        }
    },
    "window.ads_ok = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6038ece558032e1fa11a8e02beb32499"] === flag) {
                return;
            }
            window.ads_ok = true;
            Object.defineProperty(Window.prototype.toString, "6038ece558032e1fa11a8e02beb32499", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6038ece558032e1fa11a8e02beb32499" due to: ' + error);
        }
    },
    '(()=>{const t={construct:(t,n,o)=>{const e=n[0],s=e?.toString(),c=s?.includes("await this.whenGDPRClosed()");return c&&(n[0]=t=>t(!0)),Reflect.construct(t,n,o)}};window.Promise=new Proxy(window.Promise,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2def40885e045b3521a04fe19856fe24"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, n, o) => {
                        const e = n[0], s = e?.toString(), c = s?.includes("await this.whenGDPRClosed()");
                        return c && (n[0] = t => t(!0)), Reflect.construct(t, n, o);
                    }
                };
                window.Promise = new Proxy(window.Promise, t);
            })();
            Object.defineProperty(Window.prototype.toString, "2def40885e045b3521a04fe19856fe24", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2def40885e045b3521a04fe19856fe24" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/notDetectedBy/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2eed1ef0d478b67cb9b988fd355d6582"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/notDetectedBy/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "2eed1ef0d478b67cb9b988fd355d6582", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2eed1ef0d478b67cb9b988fd355d6582" due to: ' + error);
        }
    },
    "window.adBlockTest = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ea236b492fa35d17f8aeddec6c38ef4a"] === flag) {
                return;
            }
            window.adBlockTest = true;
            Object.defineProperty(Window.prototype.toString, "ea236b492fa35d17f8aeddec6c38ef4a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ea236b492fa35d17f8aeddec6c38ef4a" due to: ' + error);
        }
    },
    '(function(){var b=XMLHttpRequest.prototype.open,c=/ib\\.adnxs\\.com/i;XMLHttpRequest.prototype.open=function(d,a){if("POST"===d&&c.test(a))this.send=function(){return null},this.setRequestHeader=function(){return null},console.log("AG has blocked request: ",a);else return b.apply(this,arguments)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["14b2658c5d58ff999b0f841402be6327"] === flag) {
                return;
            }
            (function() {
                var b = XMLHttpRequest.prototype.open, c = /ib\.adnxs\.com/i;
                XMLHttpRequest.prototype.open = function(d, a) {
                    if ("POST" === d && c.test(a)) this.send = function() {
                        return null;
                    }, this.setRequestHeader = function() {
                        return null;
                    }, console.log("AG has blocked request: ", a); else return b.apply(this, arguments);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "14b2658c5d58ff999b0f841402be6327", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "14b2658c5d58ff999b0f841402be6327" due to: ' + error);
        }
    },
    '(()=>{if(!location.href.includes("/player.php?url="))return;const a=new URLSearchParams(location.search).get("url");a&&location.assign(a)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a9a1e83dfb5f1117af5ce4dfbce68798"] === flag) {
                return;
            }
            (() => {
                if (!location.href.includes("/player.php?url=")) return;
                const a = new URLSearchParams(location.search).get("url");
                a && location.assign(a);
            })();
            Object.defineProperty(Window.prototype.toString, "a9a1e83dfb5f1117af5ce4dfbce68798", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a9a1e83dfb5f1117af5ce4dfbce68798" due to: ' + error);
        }
    },
    '(()=>{window.addEventListener("load",(()=>{"object"==typeof window.player&&"function"==typeof window.player.trigger&&window.player.trigger("playlistComplete")}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["777ecb0cee36adcb947f146ce7e592d2"] === flag) {
                return;
            }
            (() => {
                window.addEventListener("load", (() => {
                    "object" == typeof window.player && "function" == typeof window.player.trigger && window.player.trigger("playlistComplete");
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "777ecb0cee36adcb947f146ce7e592d2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "777ecb0cee36adcb947f146ce7e592d2" due to: ' + error);
        }
    },
    '!function(){if(location.pathname.includes("/source/playerads")){var b=new MutationObserver(function(){var a=document.querySelector(\'script[type="text/javascript"]\');a&&a.textContent.includes(\'"ads": [\')&&(b.disconnect(),a.textContent=a.textContent.replace(/("ads": \\[\\{)[\\s\\S]*?(\\}\\])/,"$1$2"))});b.observe(document,{childList:!0,subtree:!0})}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["aae0d51166190a469962b4394ad11852"] === flag) {
                return;
            }
            !function() {
                if (location.pathname.includes("/source/playerads")) {
                    var b = new MutationObserver((function() {
                        var a = document.querySelector('script[type="text/javascript"]');
                        a && a.textContent.includes('"ads": [') && (b.disconnect(), a.textContent = a.textContent.replace(/("ads": \[\{)[\s\S]*?(\}\])/, "$1$2"));
                    }));
                    b.observe(document, {
                        childList: !0,
                        subtree: !0
                    });
                }
            }();
            Object.defineProperty(Window.prototype.toString, "aae0d51166190a469962b4394ad11852", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "aae0d51166190a469962b4394ad11852" due to: ' + error);
        }
    },
    "clientSide.player.play(true);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a5b3c4cf6ebf6b65e649d4696be29d38"] === flag) {
                return;
            }
            clientSide.player.play(true);
            Object.defineProperty(Window.prototype.toString, "a5b3c4cf6ebf6b65e649d4696be29d38", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a5b3c4cf6ebf6b65e649d4696be29d38" due to: ' + error);
        }
    },
    '(()=>{if(location.href.includes("/embed/?link=")){const i=new URL(location.href).searchParams.get("link");if(i)try{location.assign(i)}catch(i){}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["70f2ca47c305ca62ef161409642baaae"] === flag) {
                return;
            }
            (() => {
                if (location.href.includes("/embed/?link=")) {
                    const i = new URL(location.href).searchParams.get("link");
                    if (i) try {
                        location.assign(i);
                    } catch (i) {}
                }
            })();
            Object.defineProperty(Window.prototype.toString, "70f2ca47c305ca62ef161409642baaae", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "70f2ca47c305ca62ef161409642baaae" due to: ' + error);
        }
    },
    "(function(){Object.defineProperty(window, 'ExoLoader', { get: function() { return; } }); var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"getexoloader\"!=a&&-1==b.toString().indexOf('loader')&&c(a,b,d,e)}.bind(document);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a8d7f5b4e27b5a94d3b0c3528bdccb9c"] === flag) {
                return;
            }
            (function() {
                Object.defineProperty(window, "ExoLoader", {
                    get: function() {
                        return;
                    }
                });
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "getexoloader" != a && -1 == b.toString().indexOf("loader") && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "a8d7f5b4e27b5a94d3b0c3528bdccb9c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a8d7f5b4e27b5a94d3b0c3528bdccb9c" due to: ' + error);
        }
    },
    '(()=>{let t=!1;const e=window.setTimeout,n={apply:(n,o,c)=>{try{c[0]?.toString?.().includes("thisArg.dispatchEvent")&&(t=!0,e((()=>{t=!1}),50))}catch(t){}return Reflect.apply(n,o,c)}};window.setTimeout=new Proxy(window.setTimeout,n);const o=new Set(["readystatechange","load","loadend"]),c={construct:(e,n,c)=>{try{const e=n[0];if(t&&o.has(e)&&location.href.includes("/video/"))return new ProgressEvent(e)}catch(t){}return Reflect.construct(e,n,c)}};window.Event=new Proxy(window.Event,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d370c894efefb5cb0c8a577175abd0b6"] === flag) {
                return;
            }
            (() => {
                let t = !1;
                const e = window.setTimeout, n = {
                    apply: (n, o, c) => {
                        try {
                            c[0]?.toString?.().includes("thisArg.dispatchEvent") && (t = !0, e((() => {
                                t = !1;
                            }), 50));
                        } catch (t) {}
                        return Reflect.apply(n, o, c);
                    }
                };
                window.setTimeout = new Proxy(window.setTimeout, n);
                const o = new Set([ "readystatechange", "load", "loadend" ]), c = {
                    construct: (e, n, c) => {
                        try {
                            const e = n[0];
                            if (t && o.has(e) && location.href.includes("/video/")) return new ProgressEvent(e);
                        } catch (t) {}
                        return Reflect.construct(e, n, c);
                    }
                };
                window.Event = new Proxy(window.Event, c);
            })();
            Object.defineProperty(Window.prototype.toString, "d370c894efefb5cb0c8a577175abd0b6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d370c894efefb5cb0c8a577175abd0b6" due to: ' + error);
        }
    },
    '((e,t)=>{const n={apply:(n,o,r)=>{try{const s=r[1];if(!s)return Reflect.apply(n,o,r);const c=typeof s;if("string"===c&&s.includes?.(t)){const t=new URL(s);t.searchParams.delete(e);const n=t.href.replace("%2CCuepointPlaylist","");r[1]=n}else if("object"===c&&s instanceof URL&&s.href?.includes?.(t)){s.searchParams.delete(e);const t=s.href.replace("%2CCuepointPlaylist","");r[1]=t}}catch(e){}return Reflect.apply(n,o,r)}};window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,n)})("deviceAdInsertionTypeOverride","/GetPlaybackResources?");': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5f0cb8ad699e93dee39f5abf0dfec256"] === flag) {
                return;
            }
            ((e, t) => {
                const n = {
                    apply: (n, o, r) => {
                        try {
                            const s = r[1];
                            if (!s) return Reflect.apply(n, o, r);
                            const c = typeof s;
                            if ("string" === c && s.includes?.(t)) {
                                const t = new URL(s);
                                t.searchParams.delete(e);
                                const n = t.href.replace("%2CCuepointPlaylist", "");
                                r[1] = n;
                            } else if ("object" === c && s instanceof URL && s.href?.includes?.(t)) {
                                s.searchParams.delete(e);
                                const t = s.href.replace("%2CCuepointPlaylist", "");
                                r[1] = t;
                            }
                        } catch (e) {}
                        return Reflect.apply(n, o, r);
                    }
                };
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, n);
            })("deviceAdInsertionTypeOverride", "/GetPlaybackResources?");
            Object.defineProperty(Window.prototype.toString, "5f0cb8ad699e93dee39f5abf0dfec256", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5f0cb8ad699e93dee39f5abf0dfec256" due to: ' + error);
        }
    },
    '(()=>{if(window.self!==window.top)try{if("object"==typeof localStorage)return}catch(a){delete window.localStorage,window.localStorage={setItem(){},getItem(){},removeItem(){},clear(){}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6c5874d9ea24235e4a8490028ce09e66"] === flag) {
                return;
            }
            (() => {
                if (window.self !== window.top) try {
                    if ("object" == typeof localStorage) return;
                } catch (a) {
                    delete window.localStorage, window.localStorage = {
                        setItem() {},
                        getItem() {},
                        removeItem() {},
                        clear() {}
                    };
                }
            })();
            Object.defineProperty(Window.prototype.toString, "6c5874d9ea24235e4a8490028ce09e66", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6c5874d9ea24235e4a8490028ce09e66" due to: ' + error);
        }
    },
    '(()=>{const e=JSON.parse,t=Response.prototype.json,r=new WeakSet,s=e=>null!==e&&"object"==typeof e,a=e=>{if(!Array.isArray(e))return[];const t=e=>"number"==typeof e||"string"==typeof e&&""!==e.trim()?Number(e):NaN,r=e.filter(s).map(({start:e,end:r})=>({start:t(e),end:t(r)})).filter(({start:e,end:t})=>Number.isFinite(e)&&Number.isFinite(t)&&e>=0&&t>e).sort((e,t)=>e.start-t.start),a=[];for(const e of r){const t=a.at(-1);t&&e.start<=t.end?t.end=Math.max(t.end,e.end):a.push(e)}return a},n=(e,t)=>e.reduce((e,{start:r,end:s})=>e+Math.max(0,Math.min(s,t)-r),0),i=(e,t)=>e.reduce((e,{start:r,end:s})=>s<=t+1e-6?e+s-r:e,0),o=e=>"urn:com:philo:event:ad:regions"===e?.uri||"string"==typeof e?.messageData&&e.messageData.includes(\'"ad_breaks"\'),u=(t,r)=>{if(!Array.isArray(t.periods)||!t.periods.every(s))return!1;const u=[];for(const r of t.periods)if(Array.isArray(r.eventStreams))for(const t of r.eventStreams)if(o(t)&&"string"==typeof t.messageData)try{const r=Reflect.apply(e,JSON,[t.messageData]);u.push(...a(r?.ad_breaks))}catch{}const d=a(u);return!!d.length&&(t.periods=t.periods.filter((e,t)=>!(e=>Array.isArray(e.adaptationSets)&&e.adaptationSets.some(e=>"string"==typeof e?.timeline?.segmentURLTemplate&&e.timeline.segmentURLTemplate.includes("/ad/")))(e)),t.periods.forEach((e,t)=>{if(Number.isFinite(e.startTime)){const t=e.startTime;e.startTime=t-i(d,t)}"index"in e&&(e.index=t),Array.isArray(e.eventStreams)&&(e.eventStreams=e.eventStreams.filter((e,t)=>!o(e)))}),Number.isFinite(t.duration)&&(t.duration-=n(d,t.duration)),!0)},d=(e,t)=>{if(!e||"object"!=typeof e||r.has(e))return e;const o=u(e),d=(e=>{if(!s(e.url_to_thumbs)||Array.isArray(e.url_to_thumbs)||!Array.isArray(e.ad_breaks))return!1;const t=a(e.ad_breaks);if(!t.length)return!1;for(const r of Object.keys(e.url_to_thumbs)){if(r.includes("/ad/")){delete e.url_to_thumbs[r];continue}const s=e.url_to_thumbs[r];if(Array.isArray(s))for(const e of s)if(Number.isFinite(e?.pt)){const r=e.pt;e.pt=r-i(t,r)}}return delete e.ad_breaks,Number.isFinite(e.available_duration_seconds)&&(e.available_duration_seconds-=n(t,e.available_duration_seconds)),!0})(e);return(o||d)&&r.add(e),e},c={apply:(e,t,r)=>{const s=Reflect.apply(e,t,r);try{return d(s)}catch(e){return s}}};JSON.parse=new Proxy(e,c);const p={apply:async(e,t,r)=>{const s=await Reflect.apply(e,t,r);try{return d(s)}catch(e){return s}}};Response.prototype.json=new Proxy(t,p)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cde9bb8af864ebcfcb79d446284c6e7e"] === flag) {
                return;
            }
            (() => {
                const e = JSON.parse, t = Response.prototype.json, r = new WeakSet, s = e => null !== e && "object" == typeof e, a = e => {
                    if (!Array.isArray(e)) return [];
                    const t = e => "number" == typeof e || "string" == typeof e && "" !== e.trim() ? Number(e) : NaN, r = e.filter(s).map((({start: e, end: r}) => ({
                        start: t(e),
                        end: t(r)
                    }))).filter((({start: e, end: t}) => Number.isFinite(e) && Number.isFinite(t) && e >= 0 && t > e)).sort(((e, t) => e.start - t.start)), a = [];
                    for (const e of r) {
                        const t = a.at(-1);
                        t && e.start <= t.end ? t.end = Math.max(t.end, e.end) : a.push(e);
                    }
                    return a;
                }, n = (e, t) => e.reduce(((e, {start: r, end: s}) => e + Math.max(0, Math.min(s, t) - r)), 0), i = (e, t) => e.reduce(((e, {start: r, end: s}) => s <= t + 1e-6 ? e + s - r : e), 0), o = e => "urn:com:philo:event:ad:regions" === e?.uri || "string" == typeof e?.messageData && e.messageData.includes('"ad_breaks"'), u = (t, r) => {
                    if (!Array.isArray(t.periods) || !t.periods.every(s)) return !1;
                    const u = [];
                    for (const r of t.periods) if (Array.isArray(r.eventStreams)) for (const t of r.eventStreams) if (o(t) && "string" == typeof t.messageData) try {
                        const r = Reflect.apply(e, JSON, [ t.messageData ]);
                        u.push(...a(r?.ad_breaks));
                    } catch {}
                    const d = a(u);
                    return !!d.length && (t.periods = t.periods.filter(((e, t) => !(e => Array.isArray(e.adaptationSets) && e.adaptationSets.some((e => "string" == typeof e?.timeline?.segmentURLTemplate && e.timeline.segmentURLTemplate.includes("/ad/"))))(e))), 
                    t.periods.forEach(((e, t) => {
                        if (Number.isFinite(e.startTime)) {
                            const t = e.startTime;
                            e.startTime = t - i(d, t);
                        }
                        "index" in e && (e.index = t), Array.isArray(e.eventStreams) && (e.eventStreams = e.eventStreams.filter(((e, t) => !o(e))));
                    })), Number.isFinite(t.duration) && (t.duration -= n(d, t.duration)), !0);
                }, d = (e, t) => {
                    if (!e || "object" != typeof e || r.has(e)) return e;
                    const o = u(e), d = (e => {
                        if (!s(e.url_to_thumbs) || Array.isArray(e.url_to_thumbs) || !Array.isArray(e.ad_breaks)) return !1;
                        const t = a(e.ad_breaks);
                        if (!t.length) return !1;
                        for (const r of Object.keys(e.url_to_thumbs)) {
                            if (r.includes("/ad/")) {
                                delete e.url_to_thumbs[r];
                                continue;
                            }
                            const s = e.url_to_thumbs[r];
                            if (Array.isArray(s)) for (const e of s) if (Number.isFinite(e?.pt)) {
                                const r = e.pt;
                                e.pt = r - i(t, r);
                            }
                        }
                        return delete e.ad_breaks, Number.isFinite(e.available_duration_seconds) && (e.available_duration_seconds -= n(t, e.available_duration_seconds)), 
                        !0;
                    })(e);
                    return (o || d) && r.add(e), e;
                }, c = {
                    apply: (e, t, r) => {
                        const s = Reflect.apply(e, t, r);
                        try {
                            return d(s);
                        } catch (e) {
                            return s;
                        }
                    }
                };
                JSON.parse = new Proxy(e, c);
                const p = {
                    apply: async (e, t, r) => {
                        const s = await Reflect.apply(e, t, r);
                        try {
                            return d(s);
                        } catch (e) {
                            return s;
                        }
                    }
                };
                Response.prototype.json = new Proxy(t, p);
            })();
            Object.defineProperty(Window.prototype.toString, "cde9bb8af864ebcfcb79d446284c6e7e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cde9bb8af864ebcfcb79d446284c6e7e" due to: ' + error);
        }
    },
    '(()=>{const e={cmpConsentVendors:",s2657,",event:"cmpEvent"},n=()=>{setTimeout((()=>{"function"==typeof window.dataLayer?.push&&window.dataLayer.push(e)}),1e3)};"loading"===document.readyState?window.addEventListener("load",n):n()})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f4e87ab01db8b24094d849d15976f257"] === flag) {
                return;
            }
            (() => {
                const e = {
                    cmpConsentVendors: ",s2657,",
                    event: "cmpEvent"
                }, n = () => {
                    setTimeout((() => {
                        "function" == typeof window.dataLayer?.push && window.dataLayer.push(e);
                    }), 1e3);
                };
                "loading" === document.readyState ? window.addEventListener("load", n) : n();
            })();
            Object.defineProperty(Window.prototype.toString, "f4e87ab01db8b24094d849d15976f257", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f4e87ab01db8b24094d849d15976f257" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,n)=>{try{const t=n[0];7e3===n[1]&&"function"==typeof t&&t.toString().includes("[native code]")&&(n[1]=0)}catch(t){}return Reflect.apply(t,e,n)}};window.setTimeout=new Proxy(window.setTimeout,t);const e=window.EventTarget.prototype.addEventListener,n={apply:(t,n,o)=>{try{if("DOMContentLoaded"===o[0]){const t=document.querySelector(\'body > iframe[src="javascript:false"]\');t&&(t.contentWindow.setTimeout=window.setTimeout,EventTarget.prototype.addEventListener=e)}}catch(t){}return Reflect.apply(t,n,o)}};window.EventTarget.prototype.addEventListener=new Proxy(window.EventTarget.prototype.addEventListener,n)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b9bcf247e4a2f78b10edbe73e7065dc7"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, n) => {
                        try {
                            const t = n[0];
                            7e3 === n[1] && "function" == typeof t && t.toString().includes("[native code]") && (n[1] = 0);
                        } catch (t) {}
                        return Reflect.apply(t, e, n);
                    }
                };
                window.setTimeout = new Proxy(window.setTimeout, t);
                const e = window.EventTarget.prototype.addEventListener, n = {
                    apply: (t, n, o) => {
                        try {
                            if ("DOMContentLoaded" === o[0]) {
                                const t = document.querySelector('body > iframe[src="javascript:false"]');
                                t && (t.contentWindow.setTimeout = window.setTimeout, EventTarget.prototype.addEventListener = e);
                            }
                        } catch (t) {}
                        return Reflect.apply(t, n, o);
                    }
                };
                window.EventTarget.prototype.addEventListener = new Proxy(window.EventTarget.prototype.addEventListener, n);
            })();
            Object.defineProperty(Window.prototype.toString, "b9bcf247e4a2f78b10edbe73e7065dc7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b9bcf247e4a2f78b10edbe73e7065dc7" due to: ' + error);
        }
    },
    "(()=>{const r={apply:(r,t,p)=>{try{if(p[0]?.isAffiliate)return}catch(r){}return Reflect.apply(r,t,p)}};window.Array.prototype.push=new Proxy(window.Array.prototype.push,r)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6b25d47adf4d5da91c359dc2fe2f3012"] === flag) {
                return;
            }
            (() => {
                const r = {
                    apply: (r, t, p) => {
                        try {
                            if (p[0]?.isAffiliate) return;
                        } catch (r) {}
                        return Reflect.apply(r, t, p);
                    }
                };
                window.Array.prototype.push = new Proxy(window.Array.prototype.push, r);
            })();
            Object.defineProperty(Window.prototype.toString, "6b25d47adf4d5da91c359dc2fe2f3012", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6b25d47adf4d5da91c359dc2fe2f3012" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,o)=>{try{const t=o[0];t?.matches?.("azuki-reader")&&!0===t?.showAd&&Object.defineProperty(o[0],"showAd",{value:!1})}catch(t){}return Reflect.apply(t,e,o)}};window.Function.prototype.bind=new Proxy(window.Function.prototype.bind,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d1f854731b5f25e5cd38f2df757a118b"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, o) => {
                        try {
                            const t = o[0];
                            t?.matches?.("azuki-reader") && !0 === t?.showAd && Object.defineProperty(o[0], "showAd", {
                                value: !1
                            });
                        } catch (t) {}
                        return Reflect.apply(t, e, o);
                    }
                };
                window.Function.prototype.bind = new Proxy(window.Function.prototype.bind, t);
            })();
            Object.defineProperty(Window.prototype.toString, "d1f854731b5f25e5cd38f2df757a118b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d1f854731b5f25e5cd38f2df757a118b" due to: ' + error);
        }
    },
    '(()=>{if(location.href.includes("/watch.php?id=")){const i=location.href.replace("watch.php","video.php");location.assign(i)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["84c67320f2cd3cf804a18044c1387f4a"] === flag) {
                return;
            }
            (() => {
                if (location.href.includes("/watch.php?id=")) {
                    const i = location.href.replace("watch.php", "video.php");
                    location.assign(i);
                }
            })();
            Object.defineProperty(Window.prototype.toString, "84c67320f2cd3cf804a18044c1387f4a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "84c67320f2cd3cf804a18044c1387f4a" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{"function"==typeof showgame&&showgame()}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["60639f622c0aeeaed4d3c6402add6364"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    "function" == typeof showgame && showgame();
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "60639f622c0aeeaed4d3c6402add6364", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "60639f622c0aeeaed4d3c6402add6364" due to: ' + error);
        }
    },
    '(()=>{const e=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").set,t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML").get;Object.defineProperty(Element.prototype,"innerHTML",{get(){const e=t.call(this);return e.includes("delete window")?"":e},set(t){e.call(this,t)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e233c6aa26d14c122933ca24bb028498"] === flag) {
                return;
            }
            (() => {
                const e = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").set, t = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML").get;
                Object.defineProperty(Element.prototype, "innerHTML", {
                    get() {
                        const e = t.call(this);
                        return e.includes("delete window") ? "" : e;
                    },
                    set(t) {
                        e.call(this, t);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "e233c6aa26d14c122933ca24bb028498", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e233c6aa26d14c122933ca24bb028498" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{"function"==typeof getfull&&getfull()}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["45e2ee4fbb5fd647b76cf34c6f5c7222"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    "function" == typeof getfull && getfull();
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "45e2ee4fbb5fd647b76cf34c6f5c7222", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "45e2ee4fbb5fd647b76cf34c6f5c7222" due to: ' + error);
        }
    },
    '(()=>{let e=!1;const l={apply:async(e,l,o)=>{const r=o[0];return!1===r?.rewardAllowed&&(o[0].rewardAllowed=!0),Reflect.apply(e,l,o)}},o={apply:(o,r,t)=>{const n=t[0]?.pokiAdsCompleted;return!e&&n&&n[0]?.toString()?.includes("rewardAllowed")&&(n[0]=new Proxy(n[0],l),e=!0),Reflect.apply(o,r,t)}};window.Object.keys=new Proxy(window.Object.keys,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["85cbf457d7f9be26230706564eebecbe"] === flag) {
                return;
            }
            (() => {
                let e = !1;
                const l = {
                    apply: async (e, l, o) => {
                        const r = o[0];
                        return !1 === r?.rewardAllowed && (o[0].rewardAllowed = !0), Reflect.apply(e, l, o);
                    }
                }, o = {
                    apply: (o, r, t) => {
                        const n = t[0]?.pokiAdsCompleted;
                        return !e && n && n[0]?.toString()?.includes("rewardAllowed") && (n[0] = new Proxy(n[0], l), 
                        e = !0), Reflect.apply(o, r, t);
                    }
                };
                window.Object.keys = new Proxy(window.Object.keys, o);
            })();
            Object.defineProperty(Window.prototype.toString, "85cbf457d7f9be26230706564eebecbe", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "85cbf457d7f9be26230706564eebecbe" due to: ' + error);
        }
    },
    '(()=>{window.Pogo=window.Pogo||{},window.Pogo.cmd=[],window.Pogo.cmd.push=o=>{"function"==typeof o&&o()},window.Pogo.getVideoTag=(o,w)=>{w&&"function"==typeof w&&w()};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f1975fac6cc2feb528947114b7201f11"] === flag) {
                return;
            }
            (() => {
                window.Pogo = window.Pogo || {}, window.Pogo.cmd = [], window.Pogo.cmd.push = o => {
                    "function" == typeof o && o();
                }, window.Pogo.getVideoTag = (o, w) => {
                    w && "function" == typeof w && w();
                };
            })();
            Object.defineProperty(Window.prototype.toString, "f1975fac6cc2feb528947114b7201f11", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f1975fac6cc2feb528947114b7201f11" due to: ' + error);
        }
    },
    "(()=>{const n=[];n.push=n=>{try{n()}catch(n){console.error(n)}},window.adsNinja=window.adsNinja||{queue:n}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4893d02be5a2a7c0f59287a47260c7b0"] === flag) {
                return;
            }
            (() => {
                const n = [];
                n.push = n => {
                    try {
                        n();
                    } catch (n) {
                        console.error(n);
                    }
                }, window.adsNinja = window.adsNinja || {
                    queue: n
                };
            })();
            Object.defineProperty(Window.prototype.toString, "4893d02be5a2a7c0f59287a47260c7b0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4893d02be5a2a7c0f59287a47260c7b0" due to: ' + error);
        }
    },
    '(()=>{window.Bolt={on:(o,n,i)=>{"precontent_ad_video"===o&&"AD_COMPLETE"===n&&"function"==typeof i&&i()},BOLT_AD_COMPLETE:"AD_COMPLETE",BOLT_AD_ERROR:"AD_ERROR"},window.ramp=window.ramp||{},window.ramp.addUnits=()=>Promise.resolve(),window.ramp.displayUnits=()=>{setTimeout((()=>{"function"==typeof window.ramp.onPlayerReady&&window.ramp.onPlayerReady()}),1)};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["13196ca8ba80be48cb3a530394beced8"] === flag) {
                return;
            }
            (() => {
                window.Bolt = {
                    on: (o, n, i) => {
                        "precontent_ad_video" === o && "AD_COMPLETE" === n && "function" == typeof i && i();
                    },
                    BOLT_AD_COMPLETE: "AD_COMPLETE",
                    BOLT_AD_ERROR: "AD_ERROR"
                }, window.ramp = window.ramp || {}, window.ramp.addUnits = () => Promise.resolve(), 
                window.ramp.displayUnits = () => {
                    setTimeout((() => {
                        "function" == typeof window.ramp.onPlayerReady && window.ramp.onPlayerReady();
                    }), 1);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "13196ca8ba80be48cb3a530394beced8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "13196ca8ba80be48cb3a530394beced8" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,o)=>(o[0]=!0,Reflect.apply(e,t,o))};let t,o=!1;Object.defineProperty(window,"ig",{get:function(){return"function"!=typeof t?.RetentionRewardedVideo?.prototype?.rewardedVideoResult||o||(t.RetentionRewardedVideo.prototype.rewardedVideoResult=new Proxy(t.RetentionRewardedVideo.prototype.rewardedVideoResult,e),o=!0),t},set:function(e){t=e}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["49064caba0f35708edea647b43d9260f"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, o) => (o[0] = !0, Reflect.apply(e, t, o))
                };
                let t, o = !1;
                Object.defineProperty(window, "ig", {
                    get: function() {
                        return "function" != typeof t?.RetentionRewardedVideo?.prototype?.rewardedVideoResult || o || (t.RetentionRewardedVideo.prototype.rewardedVideoResult = new Proxy(t.RetentionRewardedVideo.prototype.rewardedVideoResult, e), 
                        o = !0), t;
                    },
                    set: function(e) {
                        t = e;
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "49064caba0f35708edea647b43d9260f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "49064caba0f35708edea647b43d9260f" due to: ' + error);
        }
    },
    '(()=>{let e,n=!1;const o=function(){};Object.defineProperty(window,"videojs",{get:function(){return e},set:function(t){e=t,!n&&e&&"function"==typeof e.registerPlugin&&(n=!0,e.registerPlugin("skipIma3Unskippable",o))}}),window.SlotTypeEnum={},window.ANAWeb=function(){},window.ANAWeb.prototype.createVideoSlot=function(){return Promise.resolve()},window.ANAWeb.prototype.createSlot=function(){},window.ANAWeb.VideoPlayerType={},window.ANAWeb.VideoPlacementType={InStream:1},window.ANAWeb.AdPosition={AboveTheFold:1},window.ANAWeb.PlaybackMethod={ClickSoundOn:1},window.addEventListener("load",(function(){document.dispatchEvent(new CustomEvent("ANAReady"))}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3b3aa026a1d7fa6e2ba077f743a7d54d"] === flag) {
                return;
            }
            (() => {
                let e, n = !1;
                const o = function() {};
                Object.defineProperty(window, "videojs", {
                    get: function() {
                        return e;
                    },
                    set: function(t) {
                        e = t, !n && e && "function" == typeof e.registerPlugin && (n = !0, e.registerPlugin("skipIma3Unskippable", o));
                    }
                }), window.SlotTypeEnum = {}, window.ANAWeb = function() {}, window.ANAWeb.prototype.createVideoSlot = function() {
                    return Promise.resolve();
                }, window.ANAWeb.prototype.createSlot = function() {}, window.ANAWeb.VideoPlayerType = {}, 
                window.ANAWeb.VideoPlacementType = {
                    InStream: 1
                }, window.ANAWeb.AdPosition = {
                    AboveTheFold: 1
                }, window.ANAWeb.PlaybackMethod = {
                    ClickSoundOn: 1
                }, window.addEventListener("load", (function() {
                    document.dispatchEvent(new CustomEvent("ANAReady"));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "3b3aa026a1d7fa6e2ba077f743a7d54d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3b3aa026a1d7fa6e2ba077f743a7d54d" due to: ' + error);
        }
    },
    '(()=>{const a=function(){};window.apstag={fetchBids(c,a){"function"==typeof a&&a([])},init:a,setDisplayBids:a,targetingKeys:a}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["11a07f3c1f878acc052df77d287cc2cb"] === flag) {
                return;
            }
            (() => {
                const a = function() {};
                window.apstag = {
                    fetchBids(c, a) {
                        "function" == typeof a && a([]);
                    },
                    init: a,
                    setDisplayBids: a,
                    targetingKeys: a
                };
            })();
            Object.defineProperty(Window.prototype.toString, "11a07f3c1f878acc052df77d287cc2cb", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "11a07f3c1f878acc052df77d287cc2cb" due to: ' + error);
        }
    },
    '(()=>{window.JSON.parse=new Proxy(JSON.parse,{apply(r,e,t){const s=Reflect.apply(r,e,t),l=s?.results;try{if(l&&Array.isArray(l))s?.results&&(s.results=s.results.filter((r=>{if(!Object.prototype.hasOwnProperty.call(r,"adTitle"))return r})));else for(let r in s){const e=s[r]?.results;e&&Array.isArray(e)&&(s[r].results=s[r].results.filter((r=>{if(!Object.prototype.hasOwnProperty.call(r,"adTitle"))return r})))}}catch(r){}return s}});})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b91767671ee5e3e933cdcfdac4efc25b"] === flag) {
                return;
            }
            (() => {
                window.JSON.parse = new Proxy(JSON.parse, {
                    apply(r, e, t) {
                        const s = Reflect.apply(r, e, t), l = s?.results;
                        try {
                            if (l && Array.isArray(l)) s?.results && (s.results = s.results.filter((r => {
                                if (!Object.prototype.hasOwnProperty.call(r, "adTitle")) return r;
                            }))); else for (let r in s) {
                                const e = s[r]?.results;
                                e && Array.isArray(e) && (s[r].results = s[r].results.filter((r => {
                                    if (!Object.prototype.hasOwnProperty.call(r, "adTitle")) return r;
                                })));
                            }
                        } catch (r) {}
                        return s;
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "b91767671ee5e3e933cdcfdac4efc25b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b91767671ee5e3e933cdcfdac4efc25b" due to: ' + error);
        }
    },
    '(()=>{let e,n=!1;const t=function(){};Object.defineProperty(window,"videojs",{get:function(){return e},set:function(i){e=i,!n&&e&&"function"==typeof e.registerPlugin&&(n=!0,e.registerPlugin("ads",t))}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c14cd51b0bc81e9fb5cd82344ac7da2e"] === flag) {
                return;
            }
            (() => {
                let e, n = !1;
                const t = function() {};
                Object.defineProperty(window, "videojs", {
                    get: function() {
                        return e;
                    },
                    set: function(i) {
                        e = i, !n && e && "function" == typeof e.registerPlugin && (n = !0, e.registerPlugin("ads", t));
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "c14cd51b0bc81e9fb5cd82344ac7da2e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c14cd51b0bc81e9fb5cd82344ac7da2e" due to: ' + error);
        }
    },
    '(()=>{const n=function(n){if("function"==typeof n)try{n.call()}catch(n){}},i={addAdUnits:function(){},adServers:{dfp:{buildVideoUrl:function(){return""}}},adUnits:[],aliasBidder:function(){},cmd:[],enableAnalytics:function(){},getHighestCpmBids:function(){return[]},libLoaded:!0,que:[],requestBids:function(n){if(n instanceof Object&&n.bidsBackHandler)try{n.bidsBackHandler.call()}catch(n){}},removeAdUnit:function(){},setBidderConfig:function(){},setConfig:function(){},setTargetingForGPTAsync:function(){},rp:{requestVideoBids:function(n){if("function"==typeof n?.callback)try{n.callback.call()}catch(n){}}}};i.cmd.push=n,i.que.push=n,window.pbjs=i})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a12991f34fbcdc0cb606380a258fde90"] === flag) {
                return;
            }
            (() => {
                const n = function(n) {
                    if ("function" == typeof n) try {
                        n.call();
                    } catch (n) {}
                }, i = {
                    addAdUnits: function() {},
                    adServers: {
                        dfp: {
                            buildVideoUrl: function() {
                                return "";
                            }
                        }
                    },
                    adUnits: [],
                    aliasBidder: function() {},
                    cmd: [],
                    enableAnalytics: function() {},
                    getHighestCpmBids: function() {
                        return [];
                    },
                    libLoaded: !0,
                    que: [],
                    requestBids: function(n) {
                        if (n instanceof Object && n.bidsBackHandler) try {
                            n.bidsBackHandler.call();
                        } catch (n) {}
                    },
                    removeAdUnit: function() {},
                    setBidderConfig: function() {},
                    setConfig: function() {},
                    setTargetingForGPTAsync: function() {},
                    rp: {
                        requestVideoBids: function(n) {
                            if ("function" == typeof n?.callback) try {
                                n.callback.call();
                            } catch (n) {}
                        }
                    }
                };
                i.cmd.push = n, i.que.push = n, window.pbjs = i;
            })();
            Object.defineProperty(Window.prototype.toString, "a12991f34fbcdc0cb606380a258fde90", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a12991f34fbcdc0cb606380a258fde90" due to: ' + error);
        }
    },
    '(()=>{const c=function(){[...arguments].forEach((c=>{if("function"==typeof c)try{c(!0)}catch(c){console.debug(c)}}))},n=[];n.push=c,window.PQ={cmd:n,getTargeting:c}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["52a467e415654146fde7899c49035b7f"] === flag) {
                return;
            }
            (() => {
                const c = function() {
                    [ ...arguments ].forEach((c => {
                        if ("function" == typeof c) try {
                            c(!0);
                        } catch (c) {
                            console.debug(c);
                        }
                    }));
                }, n = [];
                n.push = c, window.PQ = {
                    cmd: n,
                    getTargeting: c
                };
            })();
            Object.defineProperty(Window.prototype.toString, "52a467e415654146fde7899c49035b7f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "52a467e415654146fde7899c49035b7f" due to: ' + error);
        }
    },
    '(()=>{const n=function(n){if("function"==typeof n)try{n.call()}catch(n){}},i={addAdUnits:function(){},adServers:{dfp:{buildVideoUrl:function(){return""}}},adUnits:[],aliasBidder:function(){},cmd:[],enableAnalytics:function(){},getHighestCpmBids:function(){return[]},libLoaded:!0,que:[],requestBids:function(n){if(n instanceof Object&&n.bidsBackHandler)try{n.bidsBackHandler.call()}catch(n){}},removeAdUnit:function(){},setBidderConfig:function(){},setConfig:function(){},setTargetingForGPTAsync:function(){}};i.cmd.push=n,i.que.push=n,window.pbjs=i})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5eccf85ec7e71ba4deefe939741fb145"] === flag) {
                return;
            }
            (() => {
                const n = function(n) {
                    if ("function" == typeof n) try {
                        n.call();
                    } catch (n) {}
                }, i = {
                    addAdUnits: function() {},
                    adServers: {
                        dfp: {
                            buildVideoUrl: function() {
                                return "";
                            }
                        }
                    },
                    adUnits: [],
                    aliasBidder: function() {},
                    cmd: [],
                    enableAnalytics: function() {},
                    getHighestCpmBids: function() {
                        return [];
                    },
                    libLoaded: !0,
                    que: [],
                    requestBids: function(n) {
                        if (n instanceof Object && n.bidsBackHandler) try {
                            n.bidsBackHandler.call();
                        } catch (n) {}
                    },
                    removeAdUnit: function() {},
                    setBidderConfig: function() {},
                    setConfig: function() {},
                    setTargetingForGPTAsync: function() {}
                };
                i.cmd.push = n, i.que.push = n, window.pbjs = i;
            })();
            Object.defineProperty(Window.prototype.toString, "5eccf85ec7e71ba4deefe939741fb145", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5eccf85ec7e71ba4deefe939741fb145" due to: ' + error);
        }
    },
    "(()=>{const e={apply:(e,t,l)=>{if(!t.matches('a[href][target=\"_blank\"]'))return Reflect.apply(e,t,l)}};window.HTMLElement.prototype.click=new Proxy(window.HTMLElement.prototype.click,e)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0a528b39acd15b3dec81e240fde05757"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, l) => {
                        if (!t.matches('a[href][target="_blank"]')) return Reflect.apply(e, t, l);
                    }
                };
                window.HTMLElement.prototype.click = new Proxy(window.HTMLElement.prototype.click, e);
            })();
            Object.defineProperty(Window.prototype.toString, "0a528b39acd15b3dec81e240fde05757", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0a528b39acd15b3dec81e240fde05757" due to: ' + error);
        }
    },
    '(()=>{const t=[];t.push=function(t){try{t()}catch(t){}};window.headertag={cmd:t,buildGamMvt:function(t,c){const n={[c]:"https://securepubads.g.doubleclick.net/gampad/ads"};return n||{}},retrieveVideoDemand:function(t,c,n){const e=t[0]?.htSlotName;if("function"==typeof c)try{c(e)}catch(t){}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4a7e38f499848781627483fb1bb70105"] === flag) {
                return;
            }
            (() => {
                const t = [];
                t.push = function(t) {
                    try {
                        t();
                    } catch (t) {}
                };
                window.headertag = {
                    cmd: t,
                    buildGamMvt: function(t, c) {
                        const n = {
                            [c]: "https://securepubads.g.doubleclick.net/gampad/ads"
                        };
                        return n || {};
                    },
                    retrieveVideoDemand: function(t, c, n) {
                        const e = t[0]?.htSlotName;
                        if ("function" == typeof c) try {
                            c(e);
                        } catch (t) {}
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "4a7e38f499848781627483fb1bb70105", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4a7e38f499848781627483fb1bb70105" due to: ' + error);
        }
    },
    '(()=>{const e="3.453.0",t=function(){},s={},n=function(e){const t=document.createElement("div");t.style.setProperty("display","none","important"),t.style.setProperty("visibility","collapse","important"),e&&e.appendChild(t)};n.prototype.destroy=t,n.prototype.initialize=t;const i=function(){};i.CompanionBackfillMode={ALWAYS:"always",ON_MASTER_AD:"on_master_ad"},i.VpaidMode={DISABLED:0,ENABLED:1,INSECURE:2},i.prototype={c:!0,f:{},i:!1,l:"",p:"",r:0,t:"",v:"",getCompanionBackfill:t,getDisableCustomPlaybackForIOS10Plus(){return this.i},getDisabledFlashAds:()=>!0,getFeatureFlags(){return this.f},getLocale(){return this.l},getNumRedirects(){return this.r},getPlayerType(){return this.t},getPlayerVersion(){return this.v},getPpid(){return this.p},getVpaidMode(){return this.C},isCookiesEnabled(){return this.c},isVpaidAdapter(){return this.M},setCompanionBackfill:t,setAutoPlayAdBreaks(e){this.K=e},setCookiesEnabled(e){this.c=!!e},setDisableCustomPlaybackForIOS10Plus(e){this.i=!!e},setDisableFlashAds:t,setFeatureFlags(e){this.f=!!e},setIsVpaidAdapter(e){this.M=e},setLocale(e){this.l=!!e},setNumRedirects(e){this.r=!!e},setPageCorrelator(e){this.R=e},setPlayerType(e){this.t=!!e},setPlayerVersion(e){this.v=!!e},setPpid(e){this.p=!!e},setVpaidMode(e){this.C=e},setSessionId:t,setStreamCorrelator:t,setVpaidAllowed:t,CompanionBackfillMode:{ALWAYS:"always",ON_MASTER_AD:"on_master_ad"},VpaidMode:{DISABLED:0,ENABLED:1,INSECURE:2}};const r=function(){this.listeners=new Map,this._dispatch=function(e){let t=this.listeners.get(e.type);t=t?t.values():[];for(const s of Array.from(t))try{s(e)}catch(e){console.trace(e)}},this.addEventListener=function(e,t,s,n){Array.isArray(e)||(e=[e]);for(let s=0;s<e.length;s+=1){const i=e[s];this.listeners.has(i)||this.listeners.set(i,new Map),this.listeners.get(i).set(t,t.bind(n||this))}},this.removeEventListener=function(e,t){Array.isArray(e)||(e=[e]);for(let s=0;s<e.length;s+=1){const n=e[s];this.listeners.get(n)?.delete(t)}}},o=new r;o.volume=1,o.collapse=t,o.configureAdsManager=t,o.destroy=t,o.discardAdBreak=t,o.expand=t,o.focus=t,o.getAdSkippableState=()=>!1,o.getCuePoints=()=>[0],o.getCurrentAd=()=>h,o.getCurrentAdCuePoints=()=>[],o.getRemainingTime=()=>0,o.getVolume=function(){return this.volume},o.init=t,o.isCustomClickTrackingUsed=()=>!1,o.isCustomPlaybackUsed=()=>!1,o.pause=t,o.requestNextAdBreak=t,o.resize=t,o.resume=t,o.setVolume=function(e){this.volume=e},o.skip=t,o.start=function(){for(const e of [T.Type.LOADED,T.Type.STARTED,T.Type.CONTENT_RESUME_REQUESTED,T.Type.AD_BUFFERING,T.Type.FIRST_QUARTILE,T.Type.MIDPOINT,T.Type.THIRD_QUARTILE,T.Type.COMPLETE,T.Type.ALL_ADS_COMPLETED])try{this._dispatch(new s.AdEvent(e))}catch(e){console.trace(e)}},o.stop=t,o.updateAdsRenderingSettings=t;const a=Object.create(o),d=function(e,t,s){this.type=e,this.adsRequest=t,this.userRequestContext=s};d.prototype={getAdsManager:()=>a,getUserRequestContext(){return this.userRequestContext?this.userRequestContext:{}}},d.Type={ADS_MANAGER_LOADED:"adsManagerLoaded"};const E=r;E.prototype.settings=new i,E.prototype.contentComplete=t,E.prototype.destroy=t,E.prototype.getSettings=function(){return this.settings},E.prototype.getVersion=()=>e,E.prototype.requestAds=function(e,t){requestAnimationFrame((()=>{const{ADS_MANAGER_LOADED:n}=d.Type,i=new s.AdsManagerLoadedEvent(n,e,t);this._dispatch(i)}));const n=new s.AdError("adPlayError",1205,1205,"The browser prevented playback initiated without user interaction.",e,t);requestAnimationFrame((()=>{this._dispatch(new s.AdErrorEvent(n))}))};const A=t,u=function(){};u.prototype={setAdWillAutoPlay:t,setAdWillPlayMuted:t,setContinuousPlayback:t};const l=function(){};l.prototype={getAdPosition:()=>1,getIsBumper:()=>!1,getMaxDuration:()=>-1,getPodIndex:()=>1,getTimeOffset:()=>0,getTotalAds:()=>1};const g=function(){};g.prototype.getAdIdRegistry=function(){return""},g.prototype.getAdIsValue=function(){return""};const p=function(){};p.prototype={pi:new l,getAdId:()=>"",getAdPodInfo(){return this.pi},getAdSystem:()=>"",getAdvertiserName:()=>"",getApiFramework:()=>null,getCompanionAds:()=>[],getContentType:()=>"",getCreativeAdId:()=>"",getDealId:()=>"",getDescription:()=>"",getDuration:()=>8.5,getHeight:()=>0,getMediaUrl:()=>null,getMinSuggestedDuration:()=>-2,getSkipTimeOffset:()=>-1,getSurveyUrl:()=>null,getTitle:()=>"",getTraffickingParametersString:()=>"",getUiElements:()=>[""],getUniversalAdIdRegistry:()=>"unknown",getUniversalAdIds:()=>[new g],getUniversalAdIdValue:()=>"unknown",getVastMediaBitrate:()=>0,getVastMediaHeight:()=>0,getVastMediaWidth:()=>0,getWidth:()=>0,getWrapperAdIds:()=>[""],getWrapperAdSystems:()=>[""],getWrapperCreativeIds:()=>[""],isLinear:()=>!0,isSkippable:()=>!0};const c=function(){};c.prototype={getAdSlotId:()=>"",getContent:()=>"",getContentType:()=>"",getHeight:()=>1,getWidth:()=>1};const C=function(e,t,s,n,i,r){this.errorCode=t,this.message=n,this.type=e,this.adsRequest=i,this.userRequestContext=r,this.getErrorCode=function(){return this.errorCode},this.getInnerError=function(){return null},this.getMessage=function(){return this.message},this.getType=function(){return this.type},this.getVastErrorCode=function(){return this.vastErrorCode},this.toString=function(){return`AdError ${this.errorCode}: ${this.message}`}};C.ErrorCode={},C.Type={};const h=(()=>{try{for(const e of Object.values(window.vidible._getContexts()))if(e.getPlayer()?.div?.innerHTML.includes("www.engadget.com"))return!0}catch(e){}return!1})()?void 0:new p,T=function(e){this.type=e};T.prototype={getAd:()=>h,getAdData:()=>{}},T.Type={AD_BREAK_READY:"adBreakReady",AD_BUFFERING:"adBuffering",AD_CAN_PLAY:"adCanPlay",AD_METADATA:"adMetadata",AD_PROGRESS:"adProgress",ALL_ADS_COMPLETED:"allAdsCompleted",CLICK:"click",COMPLETE:"complete",CONTENT_PAUSE_REQUESTED:"contentPauseRequested",CONTENT_RESUME_REQUESTED:"contentResumeRequested",DURATION_CHANGE:"durationChange",EXPANDED_CHANGED:"expandedChanged",FIRST_QUARTILE:"firstQuartile",IMPRESSION:"impression",INTERACTION:"interaction",LINEAR_CHANGE:"linearChange",LINEAR_CHANGED:"linearChanged",LOADED:"loaded",LOG:"log",MIDPOINT:"midpoint",PAUSED:"pause",RESUMED:"resume",SKIPPABLE_STATE_CHANGED:"skippableStateChanged",SKIPPED:"skip",STARTED:"start",THIRD_QUARTILE:"thirdQuartile",USER_CLOSE:"userClose",VIDEO_CLICKED:"videoClicked",VIDEO_ICON_CLICKED:"videoIconClicked",VIEWABLE_IMPRESSION:"viewable_impression",VOLUME_CHANGED:"volumeChange",VOLUME_MUTED:"mute"};const y=function(e){this.error=e,this.type="adError",this.getError=function(){return this.error},this.getUserRequestContext=function(){return this.error?.userRequestContext?this.error.userRequestContext:{}}};y.Type={AD_ERROR:"adError"};const I=function(){};I.Type={CUSTOM_CONTENT_LOADED:"deprecated-event"};const R=function(){};R.CreativeType={ALL:"All",FLASH:"Flash",IMAGE:"Image"},R.ResourceType={ALL:"All",HTML:"Html",IFRAME:"IFrame",STATIC:"Static"},R.SizeCriteria={IGNORE:"IgnoreSize",SELECT_EXACT_MATCH:"SelectExactMatch",SELECT_NEAR_MATCH:"SelectNearMatch"};const S=function(){};S.prototype={getCuePoints:()=>[],getAdIdRegistry:()=>"",getAdIdValue:()=>""};const D=t;Object.assign(s,{AdCuePoints:S,AdDisplayContainer:n,AdError:C,AdErrorEvent:y,AdEvent:T,AdPodInfo:l,AdProgressData:D,AdsLoader:E,AdsManager:a,AdsManagerLoadedEvent:d,AdsRenderingSettings:A,AdsRequest:u,CompanionAd:c,CompanionAdSelectionSettings:R,CustomContentLoadedEvent:I,gptProxyInstance:{},ImaSdkSettings:i,OmidAccessMode:{DOMAIN:"domain",FULL:"full",LIMITED:"limited"},OmidVerificationVendor:{1:"OTHER",2:"MOAT",3:"DOUBLEVERIFY",4:"INTEGRAL_AD_SCIENCE",5:"PIXELATE",6:"NIELSEN",7:"COMSCORE",8:"MEETRICS",9:"GOOGLE",OTHER:1,MOAT:2,DOUBLEVERIFY:3,INTEGRAL_AD_SCIENCE:4,PIXELATE:5,NIELSEN:6,COMSCORE:7,MEETRICS:8,GOOGLE:9},settings:new i,UiElements:{AD_ATTRIBUTION:"adAttribution",COUNTDOWN:"countdown"},UniversalAdIdInfo:g,VERSION:e,ViewMode:{FULLSCREEN:"fullscreen",NORMAL:"normal"}}),window.google||(window.google={}),window.google.ima?.dai&&(s.dai=window.google.ima.dai),window.google.ima=s})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d7a710ada6cca5832af6d92e62726e74"] === flag) {
                return;
            }
            (() => {
                const e = "3.453.0", t = function() {}, s = {}, n = function(e) {
                    const t = document.createElement("div");
                    t.style.setProperty("display", "none", "important"), t.style.setProperty("visibility", "collapse", "important"), 
                    e && e.appendChild(t);
                };
                n.prototype.destroy = t, n.prototype.initialize = t;
                const i = function() {};
                i.CompanionBackfillMode = {
                    ALWAYS: "always",
                    ON_MASTER_AD: "on_master_ad"
                }, i.VpaidMode = {
                    DISABLED: 0,
                    ENABLED: 1,
                    INSECURE: 2
                }, i.prototype = {
                    c: !0,
                    f: {},
                    i: !1,
                    l: "",
                    p: "",
                    r: 0,
                    t: "",
                    v: "",
                    getCompanionBackfill: t,
                    getDisableCustomPlaybackForIOS10Plus() {
                        return this.i;
                    },
                    getDisabledFlashAds: () => !0,
                    getFeatureFlags() {
                        return this.f;
                    },
                    getLocale() {
                        return this.l;
                    },
                    getNumRedirects() {
                        return this.r;
                    },
                    getPlayerType() {
                        return this.t;
                    },
                    getPlayerVersion() {
                        return this.v;
                    },
                    getPpid() {
                        return this.p;
                    },
                    getVpaidMode() {
                        return this.C;
                    },
                    isCookiesEnabled() {
                        return this.c;
                    },
                    isVpaidAdapter() {
                        return this.M;
                    },
                    setCompanionBackfill: t,
                    setAutoPlayAdBreaks(e) {
                        this.K = e;
                    },
                    setCookiesEnabled(e) {
                        this.c = !!e;
                    },
                    setDisableCustomPlaybackForIOS10Plus(e) {
                        this.i = !!e;
                    },
                    setDisableFlashAds: t,
                    setFeatureFlags(e) {
                        this.f = !!e;
                    },
                    setIsVpaidAdapter(e) {
                        this.M = e;
                    },
                    setLocale(e) {
                        this.l = !!e;
                    },
                    setNumRedirects(e) {
                        this.r = !!e;
                    },
                    setPageCorrelator(e) {
                        this.R = e;
                    },
                    setPlayerType(e) {
                        this.t = !!e;
                    },
                    setPlayerVersion(e) {
                        this.v = !!e;
                    },
                    setPpid(e) {
                        this.p = !!e;
                    },
                    setVpaidMode(e) {
                        this.C = e;
                    },
                    setSessionId: t,
                    setStreamCorrelator: t,
                    setVpaidAllowed: t,
                    CompanionBackfillMode: {
                        ALWAYS: "always",
                        ON_MASTER_AD: "on_master_ad"
                    },
                    VpaidMode: {
                        DISABLED: 0,
                        ENABLED: 1,
                        INSECURE: 2
                    }
                };
                const r = function() {
                    this.listeners = new Map, this._dispatch = function(e) {
                        let t = this.listeners.get(e.type);
                        t = t ? t.values() : [];
                        for (const s of Array.from(t)) try {
                            s(e);
                        } catch (e) {
                            console.trace(e);
                        }
                    }, this.addEventListener = function(e, t, s, n) {
                        Array.isArray(e) || (e = [ e ]);
                        for (let s = 0; s < e.length; s += 1) {
                            const i = e[s];
                            this.listeners.has(i) || this.listeners.set(i, new Map), this.listeners.get(i).set(t, t.bind(n || this));
                        }
                    }, this.removeEventListener = function(e, t) {
                        Array.isArray(e) || (e = [ e ]);
                        for (let s = 0; s < e.length; s += 1) {
                            const n = e[s];
                            this.listeners.get(n)?.delete(t);
                        }
                    };
                }, o = new r;
                o.volume = 1, o.collapse = t, o.configureAdsManager = t, o.destroy = t, o.discardAdBreak = t, 
                o.expand = t, o.focus = t, o.getAdSkippableState = () => !1, o.getCuePoints = () => [ 0 ], 
                o.getCurrentAd = () => h, o.getCurrentAdCuePoints = () => [], o.getRemainingTime = () => 0, 
                o.getVolume = function() {
                    return this.volume;
                }, o.init = t, o.isCustomClickTrackingUsed = () => !1, o.isCustomPlaybackUsed = () => !1, 
                o.pause = t, o.requestNextAdBreak = t, o.resize = t, o.resume = t, o.setVolume = function(e) {
                    this.volume = e;
                }, o.skip = t, o.start = function() {
                    for (const e of [ T.Type.LOADED, T.Type.STARTED, T.Type.CONTENT_RESUME_REQUESTED, T.Type.AD_BUFFERING, T.Type.FIRST_QUARTILE, T.Type.MIDPOINT, T.Type.THIRD_QUARTILE, T.Type.COMPLETE, T.Type.ALL_ADS_COMPLETED ]) try {
                        this._dispatch(new s.AdEvent(e));
                    } catch (e) {
                        console.trace(e);
                    }
                }, o.stop = t, o.updateAdsRenderingSettings = t;
                const a = Object.create(o), d = function(e, t, s) {
                    this.type = e, this.adsRequest = t, this.userRequestContext = s;
                };
                d.prototype = {
                    getAdsManager: () => a,
                    getUserRequestContext() {
                        return this.userRequestContext ? this.userRequestContext : {};
                    }
                }, d.Type = {
                    ADS_MANAGER_LOADED: "adsManagerLoaded"
                };
                const E = r;
                E.prototype.settings = new i, E.prototype.contentComplete = t, E.prototype.destroy = t, 
                E.prototype.getSettings = function() {
                    return this.settings;
                }, E.prototype.getVersion = () => e, E.prototype.requestAds = function(e, t) {
                    requestAnimationFrame((() => {
                        const {ADS_MANAGER_LOADED: n} = d.Type, i = new s.AdsManagerLoadedEvent(n, e, t);
                        this._dispatch(i);
                    }));
                    const n = new s.AdError("adPlayError", 1205, 1205, "The browser prevented playback initiated without user interaction.", e, t);
                    requestAnimationFrame((() => {
                        this._dispatch(new s.AdErrorEvent(n));
                    }));
                };
                const A = t, u = function() {};
                u.prototype = {
                    setAdWillAutoPlay: t,
                    setAdWillPlayMuted: t,
                    setContinuousPlayback: t
                };
                const l = function() {};
                l.prototype = {
                    getAdPosition: () => 1,
                    getIsBumper: () => !1,
                    getMaxDuration: () => -1,
                    getPodIndex: () => 1,
                    getTimeOffset: () => 0,
                    getTotalAds: () => 1
                };
                const g = function() {};
                g.prototype.getAdIdRegistry = function() {
                    return "";
                }, g.prototype.getAdIsValue = function() {
                    return "";
                };
                const p = function() {};
                p.prototype = {
                    pi: new l,
                    getAdId: () => "",
                    getAdPodInfo() {
                        return this.pi;
                    },
                    getAdSystem: () => "",
                    getAdvertiserName: () => "",
                    getApiFramework: () => null,
                    getCompanionAds: () => [],
                    getContentType: () => "",
                    getCreativeAdId: () => "",
                    getDealId: () => "",
                    getDescription: () => "",
                    getDuration: () => 8.5,
                    getHeight: () => 0,
                    getMediaUrl: () => null,
                    getMinSuggestedDuration: () => -2,
                    getSkipTimeOffset: () => -1,
                    getSurveyUrl: () => null,
                    getTitle: () => "",
                    getTraffickingParametersString: () => "",
                    getUiElements: () => [ "" ],
                    getUniversalAdIdRegistry: () => "unknown",
                    getUniversalAdIds: () => [ new g ],
                    getUniversalAdIdValue: () => "unknown",
                    getVastMediaBitrate: () => 0,
                    getVastMediaHeight: () => 0,
                    getVastMediaWidth: () => 0,
                    getWidth: () => 0,
                    getWrapperAdIds: () => [ "" ],
                    getWrapperAdSystems: () => [ "" ],
                    getWrapperCreativeIds: () => [ "" ],
                    isLinear: () => !0,
                    isSkippable: () => !0
                };
                const c = function() {};
                c.prototype = {
                    getAdSlotId: () => "",
                    getContent: () => "",
                    getContentType: () => "",
                    getHeight: () => 1,
                    getWidth: () => 1
                };
                const C = function(e, t, s, n, i, r) {
                    this.errorCode = t, this.message = n, this.type = e, this.adsRequest = i, this.userRequestContext = r, 
                    this.getErrorCode = function() {
                        return this.errorCode;
                    }, this.getInnerError = function() {
                        return null;
                    }, this.getMessage = function() {
                        return this.message;
                    }, this.getType = function() {
                        return this.type;
                    }, this.getVastErrorCode = function() {
                        return this.vastErrorCode;
                    }, this.toString = function() {
                        return `AdError ${this.errorCode}: ${this.message}`;
                    };
                };
                C.ErrorCode = {}, C.Type = {};
                const h = (() => {
                    try {
                        for (const e of Object.values(window.vidible._getContexts())) if (e.getPlayer()?.div?.innerHTML.includes("www.engadget.com")) return !0;
                    } catch (e) {}
                    return !1;
                })() ? void 0 : new p, T = function(e) {
                    this.type = e;
                };
                T.prototype = {
                    getAd: () => h,
                    getAdData: () => {}
                }, T.Type = {
                    AD_BREAK_READY: "adBreakReady",
                    AD_BUFFERING: "adBuffering",
                    AD_CAN_PLAY: "adCanPlay",
                    AD_METADATA: "adMetadata",
                    AD_PROGRESS: "adProgress",
                    ALL_ADS_COMPLETED: "allAdsCompleted",
                    CLICK: "click",
                    COMPLETE: "complete",
                    CONTENT_PAUSE_REQUESTED: "contentPauseRequested",
                    CONTENT_RESUME_REQUESTED: "contentResumeRequested",
                    DURATION_CHANGE: "durationChange",
                    EXPANDED_CHANGED: "expandedChanged",
                    FIRST_QUARTILE: "firstQuartile",
                    IMPRESSION: "impression",
                    INTERACTION: "interaction",
                    LINEAR_CHANGE: "linearChange",
                    LINEAR_CHANGED: "linearChanged",
                    LOADED: "loaded",
                    LOG: "log",
                    MIDPOINT: "midpoint",
                    PAUSED: "pause",
                    RESUMED: "resume",
                    SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
                    SKIPPED: "skip",
                    STARTED: "start",
                    THIRD_QUARTILE: "thirdQuartile",
                    USER_CLOSE: "userClose",
                    VIDEO_CLICKED: "videoClicked",
                    VIDEO_ICON_CLICKED: "videoIconClicked",
                    VIEWABLE_IMPRESSION: "viewable_impression",
                    VOLUME_CHANGED: "volumeChange",
                    VOLUME_MUTED: "mute"
                };
                const y = function(e) {
                    this.error = e, this.type = "adError", this.getError = function() {
                        return this.error;
                    }, this.getUserRequestContext = function() {
                        return this.error?.userRequestContext ? this.error.userRequestContext : {};
                    };
                };
                y.Type = {
                    AD_ERROR: "adError"
                };
                const I = function() {};
                I.Type = {
                    CUSTOM_CONTENT_LOADED: "deprecated-event"
                };
                const R = function() {};
                R.CreativeType = {
                    ALL: "All",
                    FLASH: "Flash",
                    IMAGE: "Image"
                }, R.ResourceType = {
                    ALL: "All",
                    HTML: "Html",
                    IFRAME: "IFrame",
                    STATIC: "Static"
                }, R.SizeCriteria = {
                    IGNORE: "IgnoreSize",
                    SELECT_EXACT_MATCH: "SelectExactMatch",
                    SELECT_NEAR_MATCH: "SelectNearMatch"
                };
                const S = function() {};
                S.prototype = {
                    getCuePoints: () => [],
                    getAdIdRegistry: () => "",
                    getAdIdValue: () => ""
                };
                const D = t;
                Object.assign(s, {
                    AdCuePoints: S,
                    AdDisplayContainer: n,
                    AdError: C,
                    AdErrorEvent: y,
                    AdEvent: T,
                    AdPodInfo: l,
                    AdProgressData: D,
                    AdsLoader: E,
                    AdsManager: a,
                    AdsManagerLoadedEvent: d,
                    AdsRenderingSettings: A,
                    AdsRequest: u,
                    CompanionAd: c,
                    CompanionAdSelectionSettings: R,
                    CustomContentLoadedEvent: I,
                    gptProxyInstance: {},
                    ImaSdkSettings: i,
                    OmidAccessMode: {
                        DOMAIN: "domain",
                        FULL: "full",
                        LIMITED: "limited"
                    },
                    OmidVerificationVendor: {
                        1: "OTHER",
                        2: "MOAT",
                        3: "DOUBLEVERIFY",
                        4: "INTEGRAL_AD_SCIENCE",
                        5: "PIXELATE",
                        6: "NIELSEN",
                        7: "COMSCORE",
                        8: "MEETRICS",
                        9: "GOOGLE",
                        OTHER: 1,
                        MOAT: 2,
                        DOUBLEVERIFY: 3,
                        INTEGRAL_AD_SCIENCE: 4,
                        PIXELATE: 5,
                        NIELSEN: 6,
                        COMSCORE: 7,
                        MEETRICS: 8,
                        GOOGLE: 9
                    },
                    settings: new i,
                    UiElements: {
                        AD_ATTRIBUTION: "adAttribution",
                        COUNTDOWN: "countdown"
                    },
                    UniversalAdIdInfo: g,
                    VERSION: e,
                    ViewMode: {
                        FULLSCREEN: "fullscreen",
                        NORMAL: "normal"
                    }
                }), window.google || (window.google = {}), window.google.ima?.dai && (s.dai = window.google.ima.dai), 
                window.google.ima = s;
            })();
            Object.defineProperty(Window.prototype.toString, "d7a710ada6cca5832af6d92e62726e74", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d7a710ada6cca5832af6d92e62726e74" due to: ' + error);
        }
    },
    '(()=>{const t=[];t.push=function(t){"object"==typeof t&&t.events&&Object.values(t.events).forEach((t=>{if("function"==typeof t)try{t()}catch(t){}}))},window.AdBridg={cmd:t}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f6311be2c1ed023feeb00c3d41dea489"] === flag) {
                return;
            }
            (() => {
                const t = [];
                t.push = function(t) {
                    "object" == typeof t && t.events && Object.values(t.events).forEach((t => {
                        if ("function" == typeof t) try {
                            t();
                        } catch (t) {}
                    }));
                }, window.AdBridg = {
                    cmd: t
                };
            })();
            Object.defineProperty(Window.prototype.toString, "f6311be2c1ed023feeb00c3d41dea489", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f6311be2c1ed023feeb00c3d41dea489" due to: ' + error);
        }
    },
    '(()=>{let t=window?.__iasPET?.queue;Array.isArray(t)||(t=[]);const s=JSON.stringify({brandSafety:{},slots:{}});function e(t){try{t?.dataHandler?.(s)}catch(t){}}for(t.push=e,window.__iasPET={VERSION:"1.16.18",queue:t,sessionId:"",setTargetingForAppNexus(){},setTargetingForGPT(){},start(){}};t.length;)e(t.shift())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["baf394a72c20f8e6c3a0adc04c9df104"] === flag) {
                return;
            }
            (() => {
                let t = window?.__iasPET?.queue;
                Array.isArray(t) || (t = []);
                const s = JSON.stringify({
                    brandSafety: {},
                    slots: {}
                });
                function e(t) {
                    try {
                        t?.dataHandler?.(s);
                    } catch (t) {}
                }
                for (t.push = e, window.__iasPET = {
                    VERSION: "1.16.18",
                    queue: t,
                    sessionId: "",
                    setTargetingForAppNexus() {},
                    setTargetingForGPT() {},
                    start() {}
                }; t.length; ) e(t.shift());
            })();
            Object.defineProperty(Window.prototype.toString, "baf394a72c20f8e6c3a0adc04c9df104", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "baf394a72c20f8e6c3a0adc04c9df104" due to: ' + error);
        }
    },
    '(()=>{window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,{apply:async(a,b,c)=>{const d=c[1];if("string"!=typeof d||0===d.length)return Reflect.apply(a,b,c);const e=/topaz\\.dai\\.viacomcbs\\.digital\\/ondemand\\/hls\\/.*\\.m3u8/.test(d),f=/dai\\.google\\.com\\/ondemand\\/v.*\\/hls\\/content\\/.*\\/vid\\/.*\\/stream/.test(d);return(e||f)&&b.addEventListener("readystatechange",function(){if(4===b.readyState){const a=b.response;if(Object.defineProperty(b,"response",{writable:!0}),Object.defineProperty(b,"responseText",{writable:!0}),f&&(null!==a&&void 0!==a&&a.ad_breaks&&(a.ad_breaks=[]),null!==a&&void 0!==a&&a.apple_tv&&(a.apple_tv={})),e){const c=a.replaceAll(/#EXTINF:(\\d|\\d\\.\\d+)\\,\\nhttps:\\/\\/redirector\\.googlevideo\\.com\\/videoplayback\\?[\\s\\S]*?&source=dclk_video_ads&[\\s\\S]*?\\n/g,"");b.response=c,b.responseText=c}}}),Reflect.apply(a,b,c)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a8c6f78e34ee76b7ae128e62027dec2f"] === flag) {
                return;
            }
            (() => {
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, {
                    apply: async (a, b, c) => {
                        const d = c[1];
                        if ("string" != typeof d || 0 === d.length) return Reflect.apply(a, b, c);
                        const e = /topaz\.dai\.viacomcbs\.digital\/ondemand\/hls\/.*\.m3u8/.test(d), f = /dai\.google\.com\/ondemand\/v.*\/hls\/content\/.*\/vid\/.*\/stream/.test(d);
                        return (e || f) && b.addEventListener("readystatechange", (function() {
                            if (4 === b.readyState) {
                                const a = b.response;
                                if (Object.defineProperty(b, "response", {
                                    writable: !0
                                }), Object.defineProperty(b, "responseText", {
                                    writable: !0
                                }), f && (null !== a && void 0 !== a && a.ad_breaks && (a.ad_breaks = []), null !== a && void 0 !== a && a.apple_tv && (a.apple_tv = {})), 
                                e) {
                                    const c = a.replaceAll(/#EXTINF:(\d|\d\.\d+)\,\nhttps:\/\/redirector\.googlevideo\.com\/videoplayback\?[\s\S]*?&source=dclk_video_ads&[\s\S]*?\n/g, "");
                                    b.response = c, b.responseText = c;
                                }
                            }
                        })), Reflect.apply(a, b, c);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "a8c6f78e34ee76b7ae128e62027dec2f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a8c6f78e34ee76b7ae128e62027dec2f" due to: ' + error);
        }
    },
    "(function(){window.twttr={conversion:{trackPid:function(){}}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b207994a134acba69e58503a5393b31a"] === flag) {
                return;
            }
            (function() {
                window.twttr = {
                    conversion: {
                        trackPid: function() {}
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "b207994a134acba69e58503a5393b31a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b207994a134acba69e58503a5393b31a" due to: ' + error);
        }
    },
    '(()=>{const a=window.fetch,b={apply:async(b,c,d)=>{const e=d[0]instanceof Request?d[0].url:d[0];if("string"!=typeof e||0===e.length)return Reflect.apply(b,c,d);if(e.includes("uplynk.com/")&&e.includes(".m3u8")){const b=await a(...d);let c=await b.text();return c=c.replaceAll(/#UPLYNK-SEGMENT: \\S*\\,ad\\s[\\s\\S]+?((#UPLYNK-SEGMENT: \\S+\\,segment)|(#EXT-X-ENDLIST))/g,"$1"),new Response(c)}return Reflect.apply(b,c,d)}};try{window.fetch=new Proxy(window.fetch,b)}catch(a){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f2cc35b643de55322eb7ef4e3811aa59"] === flag) {
                return;
            }
            (() => {
                const a = window.fetch, b = {
                    apply: async (b, c, d) => {
                        const e = d[0] instanceof Request ? d[0].url : d[0];
                        if ("string" != typeof e || 0 === e.length) return Reflect.apply(b, c, d);
                        if (e.includes("uplynk.com/") && e.includes(".m3u8")) {
                            const b = await a(...d);
                            let c = await b.text();
                            return c = c.replaceAll(/#UPLYNK-SEGMENT: \S*\,ad\s[\s\S]+?((#UPLYNK-SEGMENT: \S+\,segment)|(#EXT-X-ENDLIST))/g, "$1"), 
                            new Response(c);
                        }
                        return Reflect.apply(b, c, d);
                    }
                };
                try {
                    window.fetch = new Proxy(window.fetch, b);
                } catch (a) {}
            })();
            Object.defineProperty(Window.prototype.toString, "f2cc35b643de55322eb7ef4e3811aa59", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f2cc35b643de55322eb7ef4e3811aa59" due to: ' + error);
        }
    },
    '(()=>{const t="#displayAdCard { display: none !important; }";let e=null;const o=new WeakMap,n=n=>{if((t=>"adoptedStyleSheets"in t&&"function"==typeof CSSStyleSheet&&"function"==typeof CSSStyleSheet.prototype.replaceSync)(n))try{return void(o=>{if(!e){const o=new CSSStyleSheet;o.replaceSync(t),e=o}const n=o.adoptedStyleSheets;n.includes(e)||(o.adoptedStyleSheets=[...n,e])})(n)}catch{}try{(e=>{if(o.get(e)?.parentNode===e)return;const n=(e.ownerDocument??document).createElement("style");n.textContent=t,e.appendChild(n),o.set(e,n)})(n)}catch{}},a={apply:(t,e,o)=>{const a=Reflect.apply(t,e,o);try{const t=e.getRootNode();t instanceof ShadowRoot&&n(t)}catch{}return a}},c=window.Element.prototype;"function"==typeof c.attachShadow&&(c.attachShadow=new Proxy(c.attachShadow,a))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7b79b86d861659eb4ee0781339ef5cbd"] === flag) {
                return;
            }
            (() => {
                const t = "#displayAdCard { display: none !important; }";
                let e = null;
                const o = new WeakMap, n = n => {
                    if ((t => "adoptedStyleSheets" in t && "function" == typeof CSSStyleSheet && "function" == typeof CSSStyleSheet.prototype.replaceSync)(n)) try {
                        return void (o => {
                            if (!e) {
                                const o = new CSSStyleSheet;
                                o.replaceSync(t), e = o;
                            }
                            const n = o.adoptedStyleSheets;
                            n.includes(e) || (o.adoptedStyleSheets = [ ...n, e ]);
                        })(n);
                    } catch {}
                    try {
                        (e => {
                            if (o.get(e)?.parentNode === e) return;
                            const n = (e.ownerDocument ?? document).createElement("style");
                            n.textContent = t, e.appendChild(n), o.set(e, n);
                        })(n);
                    } catch {}
                }, a = {
                    apply: (t, e, o) => {
                        const a = Reflect.apply(t, e, o);
                        try {
                            const t = e.getRootNode();
                            t instanceof ShadowRoot && n(t);
                        } catch {}
                        return a;
                    }
                }, c = window.Element.prototype;
                "function" == typeof c.attachShadow && (c.attachShadow = new Proxy(c.attachShadow, a));
            })();
            Object.defineProperty(Window.prototype.toString, "7b79b86d861659eb4ee0781339ef5cbd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7b79b86d861659eb4ee0781339ef5cbd" due to: ' + error);
        }
    },
    '(()=>{window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,{apply:async(a,b,c)=>{const d=c[1];return"string"!=typeof d||0===d.length?Reflect.apply(a,b,c):(d.match(/pubads\\.g\\.doubleclick.net\\/ondemand\\/hls\\/.*\\.m3u8/)&&b.addEventListener("readystatechange",function(){if(4===b.readyState){const a=b.response;Object.defineProperty(b,"response",{writable:!0}),Object.defineProperty(b,"responseText",{writable:!0});const c=a.replaceAll(/#EXTINF:(\\d|\\d\\.\\d+)\\,\\nhttps:\\/\\/redirector\\.googlevideo\\.com\\/videoplayback\\?[\\s\\S]*?&source=dclk_video_ads&[\\s\\S]*?\\n/g,"");b.response=c,b.responseText=c}}),Reflect.apply(a,b,c))}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0664f2a8c7617fced3e7790a26b1c7f8"] === flag) {
                return;
            }
            (() => {
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, {
                    apply: async (a, b, c) => {
                        const d = c[1];
                        return "string" != typeof d || 0 === d.length ? Reflect.apply(a, b, c) : (d.match(/pubads\.g\.doubleclick.net\/ondemand\/hls\/.*\.m3u8/) && b.addEventListener("readystatechange", (function() {
                            if (4 === b.readyState) {
                                const a = b.response;
                                Object.defineProperty(b, "response", {
                                    writable: !0
                                }), Object.defineProperty(b, "responseText", {
                                    writable: !0
                                });
                                const c = a.replaceAll(/#EXTINF:(\d|\d\.\d+)\,\nhttps:\/\/redirector\.googlevideo\.com\/videoplayback\?[\s\S]*?&source=dclk_video_ads&[\s\S]*?\n/g, "");
                                b.response = c, b.responseText = c;
                            }
                        })), Reflect.apply(a, b, c));
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "0664f2a8c7617fced3e7790a26b1c7f8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0664f2a8c7617fced3e7790a26b1c7f8" due to: ' + error);
        }
    },
    '(()=>{const a=window.fetch;window.fetch=new Proxy(window.fetch,{apply:async(b,c,d)=>{const e=d[0];if("string"!=typeof e||0===e.length)return Reflect.apply(b,c,d);if(e.match(/pubads\\.g\\.doubleclick\\.net\\/ondemand\\/.*\\/content\\/.*\\/vid\\/.*\\/streams\\/.*\\/manifest\\.mpd|pubads\\.g\\.doubleclick.net\\/ondemand\\/hls\\/.*\\.m3u8/)){const b=await a(...d);let c=await b.text();return c=c.replaceAll(/<Period id="(pre|mid|post)-roll-.-ad-[\\s\\S]*?>[\\s\\S]*?<\\/Period>|#EXTINF:(\\d|\\d\\.\\d+)\\,\\nhttps:\\/\\/redirector\\.googlevideo\\.com\\/videoplayback\\?[\\s\\S]*?&source=dclk_video_ads&[\\s\\S]*?\\n/g,""),new Response(c)}return Reflect.apply(b,c,d)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cce15678b7fd141ec70a16bc1f01aa96"] === flag) {
                return;
            }
            (() => {
                const a = window.fetch;
                window.fetch = new Proxy(window.fetch, {
                    apply: async (b, c, d) => {
                        const e = d[0];
                        if ("string" != typeof e || 0 === e.length) return Reflect.apply(b, c, d);
                        if (e.match(/pubads\.g\.doubleclick\.net\/ondemand\/.*\/content\/.*\/vid\/.*\/streams\/.*\/manifest\.mpd|pubads\.g\.doubleclick.net\/ondemand\/hls\/.*\.m3u8/)) {
                            const b = await a(...d);
                            let c = await b.text();
                            return c = c.replaceAll(/<Period id="(pre|mid|post)-roll-.-ad-[\s\S]*?>[\s\S]*?<\/Period>|#EXTINF:(\d|\d\.\d+)\,\nhttps:\/\/redirector\.googlevideo\.com\/videoplayback\?[\s\S]*?&source=dclk_video_ads&[\s\S]*?\n/g, ""), 
                            new Response(c);
                        }
                        return Reflect.apply(b, c, d);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "cce15678b7fd141ec70a16bc1f01aa96", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cce15678b7fd141ec70a16bc1f01aa96" due to: ' + error);
        }
    },
    "(()=>{window.FAVE=window.FAVE||{};const s={set:(s,e,a,n)=>{if(s?.settings?.ads?.ssai?.prod?.clips?.enabled&&(s.settings.ads.ssai.prod.clips.enabled=!1),s?.settings?.ads?.ssai?.prod?.liveAuth?.enabled&&(s.settings.ads.ssai.prod.liveAuth.enabled=!1),s?.settings?.ads?.ssai?.prod?.liveUnauth?.enabled&&(s.settings.ads.ssai.prod.liveUnauth.enabled=!1),s?.player?.instances)for(var i of Object.keys(s.player.instances))s.player.instances[i]?.configs?.ads?.ssai?.prod?.clips?.enabled&&(s.player.instances[i].configs.ads.ssai.prod.clips.enabled=!1),s.player.instances[i]?.configs?.ads?.ssai?.prod?.liveAuth?.enabled&&(s.player.instances[i].configs.ads.ssai.prod.liveAuth.enabled=!1),s.player.instances[i]?.configs?.ads?.ssai?.prod?.liveUnauth?.enabled&&(s.player.instances[i].configs.ads.ssai.prod.liveUnauth.enabled=!1);return Reflect.set(s,e,a,n)}};window.FAVE=new Proxy(window.FAVE,s)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["db4626a48a0140f6bfa4180ae874f6ce"] === flag) {
                return;
            }
            (() => {
                window.FAVE = window.FAVE || {};
                const s = {
                    set: (s, e, a, n) => {
                        if (s?.settings?.ads?.ssai?.prod?.clips?.enabled && (s.settings.ads.ssai.prod.clips.enabled = !1), 
                        s?.settings?.ads?.ssai?.prod?.liveAuth?.enabled && (s.settings.ads.ssai.prod.liveAuth.enabled = !1), 
                        s?.settings?.ads?.ssai?.prod?.liveUnauth?.enabled && (s.settings.ads.ssai.prod.liveUnauth.enabled = !1), 
                        s?.player?.instances) for (var i of Object.keys(s.player.instances)) s.player.instances[i]?.configs?.ads?.ssai?.prod?.clips?.enabled && (s.player.instances[i].configs.ads.ssai.prod.clips.enabled = !1), 
                        s.player.instances[i]?.configs?.ads?.ssai?.prod?.liveAuth?.enabled && (s.player.instances[i].configs.ads.ssai.prod.liveAuth.enabled = !1), 
                        s.player.instances[i]?.configs?.ads?.ssai?.prod?.liveUnauth?.enabled && (s.player.instances[i].configs.ads.ssai.prod.liveUnauth.enabled = !1);
                        return Reflect.set(s, e, a, n);
                    }
                };
                window.FAVE = new Proxy(window.FAVE, s);
            })();
            Object.defineProperty(Window.prototype.toString, "db4626a48a0140f6bfa4180ae874f6ce", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "db4626a48a0140f6bfa4180ae874f6ce" due to: ' + error);
        }
    },
    "(()=>{window.PostRelease={Start(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f442d027f2647247aaa89f75941826f0"] === flag) {
                return;
            }
            (() => {
                window.PostRelease = {
                    Start() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "f442d027f2647247aaa89f75941826f0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f442d027f2647247aaa89f75941826f0" due to: ' + error);
        }
    },
    '(()=>{window.com_adswizz_synchro_decorateUrl=function(a){if("string"===typeof a&&a.startsWith("http"))return a}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2b3b012135adb550eb133e7becf3e060"] === flag) {
                return;
            }
            (() => {
                window.com_adswizz_synchro_decorateUrl = function(a) {
                    if ("string" === typeof a && a.startsWith("http")) return a;
                };
            })();
            Object.defineProperty(Window.prototype.toString, "2b3b012135adb550eb133e7becf3e060", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2b3b012135adb550eb133e7becf3e060" due to: ' + error);
        }
    },
    '(()=>{window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,{apply:async(a,b,c)=>{const d=c[1];return"string"!=typeof d||0===d.length?Reflect.apply(a,b,c):(d.match(/manifest\\..*\\.theplatform\\.com\\/.*\\/.*\\.m3u8\\?.*|manifest\\..*\\.theplatform\\.com\\/.*\\/*\\.meta.*/)&&b.addEventListener("readystatechange",function(){if(4===b.readyState){const a=b.response;Object.defineProperty(b,"response",{writable:!0}),Object.defineProperty(b,"responseText",{writable:!0});const c=a.replaceAll(/#EXTINF:.*\\n.*tvessaiprod\\.nbcuni\\.com\\/video\\/[\\s\\S]*?#EXT-X-DISCONTINUITY|#EXT-X-VMAP-AD-BREAK[\\s\\S]*?#EXT-X-ENDLIST/g,"");b.response=c,b.responseText=c}}),Reflect.apply(a,b,c))}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6f3d40e53e83daab7ecb0b1ff3b3d011"] === flag) {
                return;
            }
            (() => {
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, {
                    apply: async (a, b, c) => {
                        const d = c[1];
                        return "string" != typeof d || 0 === d.length ? Reflect.apply(a, b, c) : (d.match(/manifest\..*\.theplatform\.com\/.*\/.*\.m3u8\?.*|manifest\..*\.theplatform\.com\/.*\/*\.meta.*/) && b.addEventListener("readystatechange", (function() {
                            if (4 === b.readyState) {
                                const a = b.response;
                                Object.defineProperty(b, "response", {
                                    writable: !0
                                }), Object.defineProperty(b, "responseText", {
                                    writable: !0
                                });
                                const c = a.replaceAll(/#EXTINF:.*\n.*tvessaiprod\.nbcuni\.com\/video\/[\s\S]*?#EXT-X-DISCONTINUITY|#EXT-X-VMAP-AD-BREAK[\s\S]*?#EXT-X-ENDLIST/g, "");
                                b.response = c, b.responseText = c;
                            }
                        })), Reflect.apply(a, b, c));
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "6f3d40e53e83daab7ecb0b1ff3b3d011", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6f3d40e53e83daab7ecb0b1ff3b3d011" due to: ' + error);
        }
    },
    '(()=>{let e,t=!1;const n=function(){},o=function(t,n){if("function"==typeof n)try{window.KalturaPlayer?n([]):e=n}catch(e){console.error(e)}};let r;Object.defineProperty(window,"PWT",{get:()=>({requestBids:o,generateConfForGPT:o,addKeyValuePairsToGPTSlots:n,generateDFPURL:n}),set(){}}),Object.defineProperty(window,"KalturaPlayer",{get:function(){return r},set:function(n){r=n,!t&&e&&(t=!0,e([]))}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c8bf49746912973d817a11811377a065"] === flag) {
                return;
            }
            (() => {
                let e, t = !1;
                const n = function() {}, o = function(t, n) {
                    if ("function" == typeof n) try {
                        window.KalturaPlayer ? n([]) : e = n;
                    } catch (e) {
                        console.error(e);
                    }
                };
                let r;
                Object.defineProperty(window, "PWT", {
                    get: () => ({
                        requestBids: o,
                        generateConfForGPT: o,
                        addKeyValuePairsToGPTSlots: n,
                        generateDFPURL: n
                    }),
                    set() {}
                }), Object.defineProperty(window, "KalturaPlayer", {
                    get: function() {
                        return r;
                    },
                    set: function(n) {
                        r = n, !t && e && (t = !0, e([]));
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "c8bf49746912973d817a11811377a065", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c8bf49746912973d817a11811377a065" due to: ' + error);
        }
    },
    '(()=>{const a=function(){},b=function(c,a){if("function"==typeof a)try{a([])}catch(a){console.error(a)}};Object.defineProperty(window,"PWT",{value:{requestBids:b,generateConfForGPT:b,addKeyValuePairsToGPTSlots:a,generateDFPURL:a}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7a089dd23e47e252f413e97c2c706704"] === flag) {
                return;
            }
            (() => {
                const a = function() {}, b = function(c, a) {
                    if ("function" == typeof a) try {
                        a([]);
                    } catch (a) {
                        console.error(a);
                    }
                };
                Object.defineProperty(window, "PWT", {
                    value: {
                        requestBids: b,
                        generateConfForGPT: b,
                        addKeyValuePairsToGPTSlots: a,
                        generateDFPURL: a
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "7a089dd23e47e252f413e97c2c706704", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7a089dd23e47e252f413e97c2c706704" due to: ' + error);
        }
    },
    "(()=>{window.turner_getTransactionId=turner_getGuid=function(){},window.AdFuelUtils={getUMTOCookies(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b023e1f40db016717028fe62421a3285"] === flag) {
                return;
            }
            (() => {
                window.turner_getTransactionId = turner_getGuid = function() {}, window.AdFuelUtils = {
                    getUMTOCookies() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "b023e1f40db016717028fe62421a3285", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b023e1f40db016717028fe62421a3285" due to: ' + error);
        }
    },
    '(function(){window.adsbygoogle={loaded:!0,push:function(a){if(null!==a&&a instanceof Object&&"Object"===a.constructor.name)for(let b in a)if("function"==typeof a[b])try{a[b].call()}catch(a){console.error(a)}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2ba6aeb1954873824c6148e3102a091c"] === flag) {
                return;
            }
            (function() {
                window.adsbygoogle = {
                    loaded: !0,
                    push: function(a) {
                        if (null !== a && a instanceof Object && "Object" === a.constructor.name) for (let b in a) if ("function" == typeof a[b]) try {
                            a[b].call();
                        } catch (a) {
                            console.error(a);
                        }
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "2ba6aeb1954873824c6148e3102a091c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2ba6aeb1954873824c6148e3102a091c" due to: ' + error);
        }
    },
    "(()=>{document.addEventListener('DOMContentLoaded',()=>{setTimeout(function(){(function(){window.AdFuel={queueRegistry(){},destroySlots(){}}})()},500);})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d4ca083794994e22dcb36f8fd698d98e"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        (function() {
                            window.AdFuel = {
                                queueRegistry() {},
                                destroySlots() {}
                            };
                        })();
                    }), 500);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "d4ca083794994e22dcb36f8fd698d98e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d4ca083794994e22dcb36f8fd698d98e" due to: ' + error);
        }
    },
    "(function(){var a={setConfig:function(){},aliasBidder:function(){},removeAdUnit:function(){},que:[push=function(){}]};window.pbjs=a})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0d58ac66c89ef6fa9de7481fe82dcc9b"] === flag) {
                return;
            }
            (function() {
                var a = {
                    setConfig: function() {},
                    aliasBidder: function() {},
                    removeAdUnit: function() {},
                    que: [ push = function() {} ]
                };
                window.pbjs = a;
            })();
            Object.defineProperty(Window.prototype.toString, "0d58ac66c89ef6fa9de7481fe82dcc9b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0d58ac66c89ef6fa9de7481fe82dcc9b" due to: ' + error);
        }
    },
    "window.addEventListener('DOMContentLoaded', function() { document.body.innerHTML = document.body.innerHTML.replace(/Adverts/g, \"\"); })": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3238470ccdeda8472a95e2bbb72a4f2a"] === flag) {
                return;
            }
            window.addEventListener("DOMContentLoaded", (function() {
                document.body.innerHTML = document.body.innerHTML.replace(/Adverts/g, "");
            }));
            Object.defineProperty(Window.prototype.toString, "3238470ccdeda8472a95e2bbb72a4f2a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3238470ccdeda8472a95e2bbb72a4f2a" due to: ' + error);
        }
    },
    "!function(){window.rTimer=function(){};window.jitaJS={rtk:{refreshAdUnits:function(){}}};}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["642c5e10be75a4087f7ce1326ec9a7ee"] === flag) {
                return;
            }
            !function() {
                window.rTimer = function() {};
                window.jitaJS = {
                    rtk: {
                        refreshAdUnits: function() {}
                    }
                };
            }();
            Object.defineProperty(Window.prototype.toString, "642c5e10be75a4087f7ce1326ec9a7ee", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "642c5e10be75a4087f7ce1326ec9a7ee" due to: ' + error);
        }
    },
    '(()=>{const t=new MutationObserver((t=>{for(let e of t){const t=e.target;if(t?.querySelector?.("div:not([class], [id]):first-child + div:not([class], [id]):not([class], [id]):last-child")){const e=t.querySelector("div:not([class], [id]):last-child"),o=e?.shadowRoot?.querySelector?.("div:not([class], [id]) > div:not([class], [id])")?.textContent?.trim?.()?.toLowerCase?.();if(o&&o.length<20&&o.includes?.("advertisement"))try{e.remove()}catch(t){console.trace(t)}}}})),e={apply:(e,o,s)=>{try{s[0].mode="open"}catch(t){console.error(t)}const c=Reflect.apply(e,o,s);return t.observe(c,{subtree:!0,childList:!0}),c}};window.Element.prototype.attachShadow=new Proxy(window.Element.prototype.attachShadow,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ad28df58aaf20377983494d5153f190f"] === flag) {
                return;
            }
            (() => {
                const t = new MutationObserver((t => {
                    for (let e of t) {
                        const t = e.target;
                        if (t?.querySelector?.("div:not([class], [id]):first-child + div:not([class], [id]):not([class], [id]):last-child")) {
                            const e = t.querySelector("div:not([class], [id]):last-child"), o = e?.shadowRoot?.querySelector?.("div:not([class], [id]) > div:not([class], [id])")?.textContent?.trim?.()?.toLowerCase?.();
                            if (o && o.length < 20 && o.includes?.("advertisement")) try {
                                e.remove();
                            } catch (t) {
                                console.trace(t);
                            }
                        }
                    }
                })), e = {
                    apply: (e, o, s) => {
                        try {
                            s[0].mode = "open";
                        } catch (t) {
                            console.error(t);
                        }
                        const c = Reflect.apply(e, o, s);
                        return t.observe(c, {
                            subtree: !0,
                            childList: !0
                        }), c;
                    }
                };
                window.Element.prototype.attachShadow = new Proxy(window.Element.prototype.attachShadow, e);
            })();
            Object.defineProperty(Window.prototype.toString, "ad28df58aaf20377983494d5153f190f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ad28df58aaf20377983494d5153f190f" due to: ' + error);
        }
    },
    'document.cookie="vpn=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c30e73df868a56abad82ef46aea39100"] === flag) {
                return;
            }
            document.cookie = "vpn=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "c30e73df868a56abad82ef46aea39100", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c30e73df868a56abad82ef46aea39100" due to: ' + error);
        }
    },
    "(()=>{document.addEventListener(\"DOMContentLoaded\",(()=>{ if(typeof jQuery) { jQuery('#SearchButtom').unbind('click'); } }));})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1e2d5574e33a449dcd46c38824d46820"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (typeof jQuery) {
                        jQuery("#SearchButtom").unbind("click");
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "1e2d5574e33a449dcd46c38824d46820", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1e2d5574e33a449dcd46c38824d46820" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{ if(typeof videofunc) { videofunc(); } }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c89cf796658574c24a11e4139372f1f6"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (typeof videofunc) {
                        videofunc();
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "c89cf796658574c24a11e4139372f1f6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c89cf796658574c24a11e4139372f1f6" due to: ' + error);
        }
    },
    'document.cookie="p3006=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d2d456e85d536f31a032f2a730cbde22"] === flag) {
                return;
            }
            document.cookie = "p3006=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "d2d456e85d536f31a032f2a730cbde22", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d2d456e85d536f31a032f2a730cbde22" due to: ' + error);
        }
    },
    'document.cookie="rpuShownDesktop=1; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["651f3ee34f9ac7a2ac075d8fab9c1c17"] === flag) {
                return;
            }
            document.cookie = "rpuShownDesktop=1; path=/;";
            Object.defineProperty(Window.prototype.toString, "651f3ee34f9ac7a2ac075d8fab9c1c17", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "651f3ee34f9ac7a2ac075d8fab9c1c17" due to: ' + error);
        }
    },
    '(()=>{if(!location.href.includes("/embed/")&&!location.href.includes("/file/"))return;const e={get(e,t,r){try{return"disabled"===t&&"function"==typeof e.start?(queueMicrotask((()=>{try{e.start()}catch(e){}})),!0):Reflect.get(e,t,r)}catch(c){return Reflect.get(e,t,r)}}},t={apply:(t,r,c)=>{try{const n=Reflect.apply(t,r,c);if(n&&"object"==typeof n){if((()=>{try{return(new Error).stack||""}catch{return""}})().includes("getVideoAdInstance"))return new Proxy(n,e)}return n}catch(e){return Reflect.apply(t,r,c)}}};window.Object.create=new Proxy(window.Object.create,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["08ac4125fe79ad45be931eeed20c8e89"] === flag) {
                return;
            }
            (() => {
                if (!location.href.includes("/embed/") && !location.href.includes("/file/")) return;
                const e = {
                    get(e, t, r) {
                        try {
                            return "disabled" === t && "function" == typeof e.start ? (queueMicrotask((() => {
                                try {
                                    e.start();
                                } catch (e) {}
                            })), !0) : Reflect.get(e, t, r);
                        } catch (c) {
                            return Reflect.get(e, t, r);
                        }
                    }
                }, t = {
                    apply: (t, r, c) => {
                        try {
                            const n = Reflect.apply(t, r, c);
                            if (n && "object" == typeof n) {
                                if ((() => {
                                    try {
                                        return (new Error).stack || "";
                                    } catch {
                                        return "";
                                    }
                                })().includes("getVideoAdInstance")) return new Proxy(n, e);
                            }
                            return n;
                        } catch (e) {
                            return Reflect.apply(t, r, c);
                        }
                    }
                };
                window.Object.create = new Proxy(window.Object.create, t);
            })();
            Object.defineProperty(Window.prototype.toString, "08ac4125fe79ad45be931eeed20c8e89", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "08ac4125fe79ad45be931eeed20c8e89" due to: ' + error);
        }
    },
    '(function(){if(-1!=window.location.href.indexOf("/intro-mm"))for(var c=document.cookie.split(";"),b=0;b<c.length;b++){var a=c[b];a=a.split("=");"redirect_url_to_intro"==a[0]&&window.location.replace(decodeURIComponent(a[1]))}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f09a7b4667c1146d3ffd2348387597d8"] === flag) {
                return;
            }
            (function() {
                if (-1 != window.location.href.indexOf("/intro-mm")) for (var c = document.cookie.split(";"), b = 0; b < c.length; b++) {
                    var a = c[b];
                    a = a.split("=");
                    "redirect_url_to_intro" == a[0] && window.location.replace(decodeURIComponent(a[1]));
                }
            })();
            Object.defineProperty(Window.prototype.toString, "f09a7b4667c1146d3ffd2348387597d8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f09a7b4667c1146d3ffd2348387597d8" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"mousedown\"!=a&&-1==b.toString().indexOf('Z4P')&&c(a,b,d,e)}.bind(document); var b=window.setTimeout;window.setTimeout=function(a,c){if(!/\\..4P\\(|=setTimeout\\(/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["16fc905e6e4d01b1d36604ce246bdcac"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "mousedown" != a && -1 == b.toString().indexOf("Z4P") && c(a, b, d, e);
                }.bind(document);
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/\..4P\(|=setTimeout\(/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "16fc905e6e4d01b1d36604ce246bdcac", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "16fc905e6e4d01b1d36604ce246bdcac" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"click\"!=a&&-1==b.toString().indexOf('bi()')&&c(a,b,d,e)}.bind(document);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a9336ddeda1e9f4d8198cac4f6a59557"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "click" != a && -1 == b.toString().indexOf("bi()") && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "a9336ddeda1e9f4d8198cac4f6a59557", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a9336ddeda1e9f4d8198cac4f6a59557" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"mousedown\"!=a&&-1==b.toString().indexOf('Z4P')&&c(a,b,d,e)}.bind(document); var b=window.setTimeout;window.setTimeout=function(a,c){if(!/Z4P/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["63f6bebe37e619f74c32a8b2415f86a2"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "mousedown" != a && -1 == b.toString().indexOf("Z4P") && c(a, b, d, e);
                }.bind(document);
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/Z4P/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "63f6bebe37e619f74c32a8b2415f86a2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "63f6bebe37e619f74c32a8b2415f86a2" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"click\"!=a&&-1==b.toString().indexOf('checkTarget')&&c(a,b,d,e)}.bind(document);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d4daff20eda39f5bfe997a60b5b65564"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "click" != a && -1 == b.toString().indexOf("checkTarget") && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "d4daff20eda39f5bfe997a60b5b65564", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d4daff20eda39f5bfe997a60b5b65564" due to: ' + error);
        }
    },
    '(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){"mouseup"!=a&&-1==b.toString().indexOf(`var U="click";var R=\'_blank\';var v="href";`)&&c(a,b,d,e)}.bind(document);})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2e5eb7acf02c72e68933dbb1fd9704ba"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "mouseup" != a && -1 == b.toString().indexOf(`var U="click";var R='_blank';var v="href";`) && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "2e5eb7acf02c72e68933dbb1fd9704ba", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2e5eb7acf02c72e68933dbb1fd9704ba" due to: ' + error);
        }
    },
    "(function(){ var observer=new MutationObserver(hide);observer.observe(document,{childList:!0,subtree:!0});function hide(){var e=document.querySelectorAll('span[data-nosnippet] > .q-box');e.forEach(function(e){var i=e.innerText;if(i){if(i!==void 0&&(!0===i.includes('Sponsored')||!0===i.includes('Ad by')||!0===i.includes('Promoted by'))){e.style=\"display:none!important;\"}}})} })();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9f6813ab855c342f13c90469c95da251"] === flag) {
                return;
            }
            (function() {
                var observer = new MutationObserver(hide);
                observer.observe(document, {
                    childList: !0,
                    subtree: !0
                });
                function hide() {
                    var e = document.querySelectorAll("span[data-nosnippet] > .q-box");
                    e.forEach((function(e) {
                        var i = e.innerText;
                        if (i) {
                            if (i !== void 0 && (!0 === i.includes("Sponsored") || !0 === i.includes("Ad by") || !0 === i.includes("Promoted by"))) {
                                e.style = "display:none!important;";
                            }
                        }
                    }));
                }
            })();
            Object.defineProperty(Window.prototype.toString, "9f6813ab855c342f13c90469c95da251", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9f6813ab855c342f13c90469c95da251" due to: ' + error);
        }
    },
    "(function(){ var observer=new MutationObserver(hide);observer.observe(document,{childList:!0,subtree:!0});function hide(){var e=document.querySelectorAll('.paged_list_wrapper > .pagedlist_item');e.forEach(function(e){var i=e.innerHTML;if(i){if(i!==void 0&&(!0===i.includes('Hide This Ad<\\/span>'))){e.style=\"display:none!important;\"}}})} })();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["17b3983e043325b0965b454cc7394766"] === flag) {
                return;
            }
            (function() {
                var observer = new MutationObserver(hide);
                observer.observe(document, {
                    childList: !0,
                    subtree: !0
                });
                function hide() {
                    var e = document.querySelectorAll(".paged_list_wrapper > .pagedlist_item");
                    e.forEach((function(e) {
                        var i = e.innerHTML;
                        if (i) {
                            if (i !== void 0 && !0 === i.includes("Hide This Ad</span>")) {
                                e.style = "display:none!important;";
                            }
                        }
                    }));
                }
            })();
            Object.defineProperty(Window.prototype.toString, "17b3983e043325b0965b454cc7394766", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "17b3983e043325b0965b454cc7394766" due to: ' + error);
        }
    },
    '!function(){new MutationObserver((function(){document.querySelectorAll("article > div[class] > div[class]").forEach((function(e){Object.keys(e).forEach((function(c){if(c.includes("__reactEvents")||c.includes("__reactProps")){c=e[c];try{c.children?.props?.adFragmentKey?.items&&e.parentNode.remove()}catch(c){}}}))}))})).observe(document,{childList:!0,subtree:!0});}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["54509270c0f548739cf1d7c18ae3d312"] === flag) {
                return;
            }
            !function() {
                new MutationObserver((function() {
                    document.querySelectorAll("article > div[class] > div[class]").forEach((function(e) {
                        Object.keys(e).forEach((function(c) {
                            if (c.includes("__reactEvents") || c.includes("__reactProps")) {
                                c = e[c];
                                try {
                                    c.children?.props?.adFragmentKey?.items && e.parentNode.remove();
                                } catch (c) {}
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "54509270c0f548739cf1d7c18ae3d312", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "54509270c0f548739cf1d7c18ae3d312" due to: ' + error);
        }
    },
    "(()=>{let e=0;const i=[];new MutationObserver((function(){document.querySelectorAll(\"div[role='list'] > div[role='listitem']:not([style*='display: none']) div[data-test-id='pinWrapper'], div[role='list'] > div[role='listitem']:not([style*='display: none']) div[data-test-id='pinWrapper'] > div[data-test-id]\").forEach((s=>{Object.keys(s).forEach((t=>{if(t.includes(\"__reactProps\")){const r=s[t];try{if(r?.children?.props?.children?.props?.pinKey?.adDestinationUrl||r?.children[1]?.props?.children[1]?.props?.children?.props?.pinKey?.adDestinationUrl||r?.children[0]?.props?.children[1]?.props?.children[1]?.props?.children?.props?.pinKey?.adDestinationUrl){const t=s.closest(\"div[role='list'] > div[role='listitem']:not([style*='display: none'])\");if(!t)return;t.style=\"display: none !important;\",e++;const r=t.querySelector('div[data-test-id=\"pinrep-footer\"] > div[class] > div[class] > div[class]:last-child > div[class] > a[aria-label][href][rel] > div[class] > div[class] > div[class]');r&&(i.push([\"Ad blocked based on property [\"+e+\"] -> \"+r.innerText]),console.table(i))}}catch(e){console.error(e)}}}))}))})).observe(document,{childList:!0,subtree:!0})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f108a248579190d52136e6e135a4d6c9"] === flag) {
                return;
            }
            (() => {
                let e = 0;
                const i = [];
                new MutationObserver((function() {
                    document.querySelectorAll("div[role='list'] > div[role='listitem']:not([style*='display: none']) div[data-test-id='pinWrapper'], div[role='list'] > div[role='listitem']:not([style*='display: none']) div[data-test-id='pinWrapper'] > div[data-test-id]").forEach((s => {
                        Object.keys(s).forEach((t => {
                            if (t.includes("__reactProps")) {
                                const r = s[t];
                                try {
                                    if (r?.children?.props?.children?.props?.pinKey?.adDestinationUrl || r?.children[1]?.props?.children[1]?.props?.children?.props?.pinKey?.adDestinationUrl || r?.children[0]?.props?.children[1]?.props?.children[1]?.props?.children?.props?.pinKey?.adDestinationUrl) {
                                        const t = s.closest("div[role='list'] > div[role='listitem']:not([style*='display: none'])");
                                        if (!t) return;
                                        t.style = "display: none !important;", e++;
                                        const r = t.querySelector('div[data-test-id="pinrep-footer"] > div[class] > div[class] > div[class]:last-child > div[class] > a[aria-label][href][rel] > div[class] > div[class] > div[class]');
                                        r && (i.push([ "Ad blocked based on property [" + e + "] -> " + r.innerText ]), 
                                        console.table(i));
                                    }
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "f108a248579190d52136e6e135a4d6c9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f108a248579190d52136e6e135a4d6c9" due to: ' + error);
        }
    },
    '(()=>{const e="SPONSORED",t="SponsoredData",r="AdsSideFeedUnit",n="MarketplaceFeedAdStory",o=new WeakMap,i=[e,t,r],a=[t,n],p=window.String.prototype.split,s=window.String.prototype.trim,l=new WeakMap,c=new WeakMap,d=new WeakSet,y=(e,t,r=Proxy)=>{const n=c.get(e)??Reflect.apply(window.Function.prototype.toString,e,[]),o=new r(e,t);return l.set(o,l.get(e)??e),c.set(o,n),o},w=(e,t)=>e?.length>300&&t.some(t=>e?.includes?.(t)),f=e=>w(e,i),u=e=>Boolean(e?.startsWith?.("{")&&e?.endsWith?.("}")||e?.startsWith?.("[")&&e?.endsWith?.("]")),g=e=>u(e)&&f(e),h=e=>{try{e.JSON.parse=y(e.JSON.parse,q,e.Proxy),e.String.prototype.split=y(e.String.prototype.split,U,e.Proxy),e.String=y(e.String,I,e.Proxy),e.String.prototype.constructor=e.String,e.Function.prototype.call=y(e.Function.prototype.call,re,e.Proxy),e.Function.prototype.toString=y(e.Function.prototype.toString,oe,e.Proxy)}catch(e){}},S=e=>Boolean(e instanceof HTMLIFrameElement&&(""===e.src||e?.src?.startsWith("about:blank"))&&e.contentWindow),_=new Set(["append","prepend","before","after","insertNode","replaceWith","replaceChild","replaceChildren"]),{apply:m}={apply(e,t,r){const n=Reflect.apply(e,t,r);try{S(n)?h(n.contentWindow):_.has(e.name)&&r.forEach(e=>{S(e)&&h(e.contentWindow)})}catch(e){}return n}},b={apply:m};window.Node.prototype.appendChild=y(window.Node.prototype.appendChild,b),window.Node.prototype.insertBefore=y(window.Node.prototype.insertBefore,b),window.Node.prototype.replaceChild=y(window.Node.prototype.replaceChild,b),window.Element.prototype.append=y(window.Element.prototype.append,b),window.Element.prototype.prepend=y(window.Element.prototype.prepend,b),window.Element.prototype.replaceChildren=y(window.Element.prototype.replaceChildren,b),window.Element.prototype.replaceWith=y(window.Element.prototype.replaceWith,b),window.Element.prototype.before=y(window.Element.prototype.before,b),window.Element.prototype.after=y(window.Element.prototype.after,b),window.Element.prototype.insertAdjacentElement=y(window.Element.prototype.insertAdjacentElement,b),window.Range.prototype.insertNode=y(window.Range.prototype.insertNode,b),window.CharacterData.prototype.replaceWith=y(window.CharacterData.prototype.replaceWith,b);const A=e=>Boolean(e)&&Object.values(e).some(e=>e?.__typename===t),E=(e,t)=>{if(!e||"object"!=typeof e||Array.isArray(e))return!1;const r=Object.keys(e);return r.length===t.length&&t.every(e=>r.includes(e))},x=e=>E(e,["node"])&&E(e.node,["s"])&&E(e.node.s,["__typename"])&&e.node.s.__typename===t,N=e=>{const t=Array.isArray(e)&&1===e.length?e[0]:e;if(!t||"object"!=typeof t||Array.isArray(t))return!1;const r="string"==typeof t.p?"p":"string"==typeof t.z9?"z9":"string"==typeof t.k4?"k4":"string"==typeof t.w7?"w7":"string"==typeof t.q8?"q8":"string"==typeof t.n3?"n3":"v6";if("string"!=typeof t[r])return!1;const n=["data","edges","require",r];if(Object.hasOwn(t,"extensions")){if(!(E(t.extensions,[])||E(t.extensions,["is_final"])&&!0===t.extensions.is_final))return!1;n.push("extensions")}return E(t,n)&&x(t.data)&&Array.isArray(t.edges)&&1===t.edges.length&&x(t.edges[0])&&Array.isArray(t.require)&&1===t.require.length&&x(t.require[0])},v=(e,t,n,o)=>{if(!e||"object"!=typeof e||n<0)return!1;let i=!1;if(Array.isArray(e.nodes)){const t=e.nodes.filter(e=>!(e=>{const t=e?.item_collection?.nodes;return e?.__typename===r||Array.isArray(t)&&t.some(e=>e?.sponsored_data?.ad_id)})(e));e.nodes.length-t.length>0&&(e.nodes=t,i=!0)}return Object.entries(e).forEach(([e,r])=>{i=v(r,`${t}.${e}`,n-1,o)||i}),i},O=(e,t=10)=>{const r=e?.data?.viewer,n=r??e?.[3]?.[1]?.__bbox?.result?.data?.viewer;if(!n)return!1;return v(n,r?"data.viewer":"item[3][1].__bbox.result.data.viewer",t,e)},W=(t,r=10,n=new WeakMap)=>{if(!t||"object"!=typeof t||r<0)return!1;const o=n.get(t);if(void 0!==o&&o>=r)return!1;if(n.set(t,r),N(t))return!1;let i=((t,r)=>{if(!t||"object"!=typeof t)return!1;let n=!1;try{if(r){if(Array.isArray(t.require?.[0]?.[3]?.[0]?.__bbox?.require)&&t.require[0][3][0].__bbox.require.forEach(t=>{t[3]?.[1]?.__bbox?.result?.data?.category===e&&(delete t[3][1].__bbox.result.data.node,n=!0),A(t[3]?.[1]?.__bbox?.result?.data?.node)&&(delete t[3][1].__bbox.result.data.node,n=!0),n=O(t)||n}),Array.isArray(t.data?.viewer?.auxColumnUnits?.nodes)&&(n=O(t)||n),Array.isArray(t.data?.viewer?.news_feed?.edges)){const r=t.data.viewer.news_feed.edges.length;t.data.viewer.news_feed.edges=t.data.viewer.news_feed.edges.filter(t=>!A(t.node)&&t.category!==e),n=n||t.data.viewer.news_feed.edges.length!==r}A(t.data?.node)&&(delete t.data.node,n=!0),t.data?.category===e&&(delete t.data.node,n=!0)}}catch(e){}return n})(t,!0);return 0===r||Object.values(t).forEach(e=>{i=W(e,r-1,n)||i}),i},j=(e,t)=>{try{const r="string"==typeof t;if(r&&!f(t))return e;if(N(e))return e;if(!r&&!f(JSON.stringify(e)))return e;W(e)&&e&&"object"==typeof e&&d.add(e)}catch(e){}return e},{apply:k}={apply(e,t,r){$();const n=Reflect.apply(e,t,r);return j(n,r[0])}},q={apply:k};window.JSON.parse=y(window.JSON.parse,q);const J=(e,t,r)=>{if(!e||"object"!=typeof e&&"function"!=typeof e)return;let n=o.get(e);if(!t.some(t=>"function"==typeof e[t]&&!l.has(e[t])&&(n?.get(t)??0)<10))return;n||(n=new Map,o.set(e,n));const i=new Map;t.forEach(t=>{const r=e[t];"function"==typeof r&&l.has(r)&&i.set(l.get(r),r)}),t.forEach(t=>{const o=e[t],a=n.get(t)??0;if("function"!=typeof o||l.has(o)||a>=10)return;n.set(t,a+1);let p=i.get(o);if(!p){const{apply:e}={apply(e,t,n){const o=Reflect.apply(e,t,n);return r?j(o,n[0]):j(o)}};p=y(o,{apply:e}),i.set(o,p)}e[t]=p})},P=["parse","parseText","readText","fromText","fromSource","fromChunk","fromBlock"],R=["ghlParseServerJSPayload","readBootPayload","decodeBootScript","hydrateBootData","inflateBootPayload","expandBootPayload","unpackBootPayload"],B=[[["json5"],e=>J(e,P,!0)],[["GHLServerJSParse"],e=>J(e,R,!1)]],C=e=>{Array.isArray(e)&&B.forEach(t=>{e.some(e=>e?.[1]===t[1])||e.push(t)})};let F=null,M=!1,z=!1;const D=new Map,L=B.map(([[e],t])=>r=>{D.set(e,r),t(r)}),T=()=>{if(!M&&"function"==typeof window.require){M=!0;const e=window.require("ifRequired");"function"==typeof e&&(F=e)}return F},$=()=>{if(!z)try{for(let e=0;e<B.length;e+=1){const[[t],r]=B[e],n=D.get(t);if(void 0===n){if(null===T())return;F(t,L[e])}else r(n)}}catch(e){z=!0}},{apply:H}={apply(e,t,r){let n;$();try{if(u(t),g(t)){const e=JSON.parse(t);d.has(e)&&(n=JSON.stringify(e))}}catch(e){}return Reflect.apply(e,n??t,r)}},U={apply:H};window.String.prototype.split=y(window.String.prototype.split,U),window.String.prototype.substring=y(window.String.prototype.substring,U);const{apply:G}={apply(e,t,r){$();const n=Reflect.apply(e,t,r);try{if(g(n)){const e=JSON.parse(n);if(d.has(e)){return JSON.stringify(e)}}}catch(e){}return n}},I={apply:G};window.String=y(window.String,I),window.String.prototype.constructor=window.String;const K=new Map,Q=/^(?:[\\t\\r\\n ]*(?:\\/\\/[^\\r\\n]*(?:\\r\\n?|\\n)|\\/\\*[\\s\\S]*?\\*\\/))+/,V=/^[\\t\\r\\n ]*(?:\\[[\\t\\r\\n ]*)?\\{[\\t\\r\\n ]*"(?:[^"\\\\]|\\\\.)*"[\\t\\r\\n ]*:/,X=e=>{const t=K.get(e);if(void 0!==t)return t;let r=e;try{const t=e.match(Q)?.[0]??"",n=e.slice(t.length),o=n.search(/(?:\\r\\n?|\\n)[\\t ]*\\/\\/[^\\r\\n]*(?:[\\r\\n][\\t ]*)*$/),i=-1===o?n:n.slice(0,o),a=n.slice(i.length),p=Reflect.apply(s,i,[]);if(u(p)&&f(e)){const e=p.slice(1).match(Q)?.[0]??"";let n=""===e?i:i.replace(e,"");const o=n.match(V)?.[0]??"",s=""===o?"":n.slice(o.length).match(Q)?.[0]??"";""!==s&&(n=o+n.slice(o.length+s.length));const l=JSON.parse(n);if(d.has(l)){let n=JSON.stringify(l);""!==s&&(n=n.replace(V,e=>e+s)),r=t+n[0]+e+n.slice(1)+a}}}catch(e){}return((e,t)=>{if(K.size>=2){const e=K.keys().next().value;K.delete(e)}return K.set(e,t),t})(e,r)},{apply:Y}={apply(e,t,r){let n=t;try{"string"==typeof t&&t.length>300&&(n=X(t))}catch(e){}return Reflect.apply(e,n,r)}},Z={apply:Y};window.String.prototype.charAt=y(window.String.prototype.charAt,Z);const ee=e=>{const t=e?.data?.viewer?.marketplace_feed_stories;if(!Array.isArray(t?.edges))return!1;const r=t.edges.filter(e=>!(e=>{const t=e?.__typename;return"string"==typeof t&&t.includes(n)})(e?.node));return r.length!==t.edges.length&&(t.edges=r,!0)},{apply:te}={apply(e,t,r){const n=r[2]?.[0];if(w(n,a))try{const e=(e=>{let t=!1;const r=Reflect.apply(p,e,[/\\r?\\n|\\r/]).map(e=>{if(""===e.trim())return e;let r;try{r=JSON.parse(e)}catch{return e}const n=d.has(r),o=ee(r);return n||o?(t=!0,JSON.stringify(r)):e});return t?r.join("\\r\\n"):e})(n);if(e!==n){const t=r[2].slice();t[0]=e,r[2]=t}}catch(e){}return Reflect.apply(e,t,r)}},re={apply:te};window.Function.prototype.call=y(window.Function.prototype.call,re);const{apply:ne}={apply:(e,t,r)=>c.has(t)?c.get(t):Reflect.apply(e,t,r)},oe={apply:ne};window.Function.prototype.toString=y(window.Function.prototype.toString,oe),(()=>{const e=window.__rl_stub;if("function"==typeof window.requireLazy&&!Array.isArray(e))return void B.forEach(([e,t])=>{window.requireLazy(e,t)});let t=Array.isArray(e)?e:[];C(t);try{Object.defineProperty(window,"__rl_stub",{configurable:!0,enumerable:!0,get:()=>t,set(e){t=e,C(e)}})}catch(e){window.__rl_stub=t}})()})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3d248055537ed53f41ae916207fa1e52"] === flag) {
                return;
            }
            (() => {
                const e = "SPONSORED", t = "SponsoredData", r = "AdsSideFeedUnit", n = "MarketplaceFeedAdStory", o = new WeakMap, i = [ e, t, r ], a = [ t, n ], p = window.String.prototype.split, s = window.String.prototype.trim, l = new WeakMap, c = new WeakMap, d = new WeakSet, y = (e, t, r = Proxy) => {
                    const n = c.get(e) ?? Reflect.apply(window.Function.prototype.toString, e, []), o = new r(e, t);
                    return l.set(o, l.get(e) ?? e), c.set(o, n), o;
                }, w = (e, t) => e?.length > 300 && t.some((t => e?.includes?.(t))), f = e => w(e, i), u = e => Boolean(e?.startsWith?.("{") && e?.endsWith?.("}") || e?.startsWith?.("[") && e?.endsWith?.("]")), g = e => u(e) && f(e), h = e => {
                    try {
                        e.JSON.parse = y(e.JSON.parse, q, e.Proxy), e.String.prototype.split = y(e.String.prototype.split, U, e.Proxy), 
                        e.String = y(e.String, I, e.Proxy), e.String.prototype.constructor = e.String, e.Function.prototype.call = y(e.Function.prototype.call, re, e.Proxy), 
                        e.Function.prototype.toString = y(e.Function.prototype.toString, oe, e.Proxy);
                    } catch (e) {}
                }, S = e => Boolean(e instanceof HTMLIFrameElement && ("" === e.src || e?.src?.startsWith("about:blank")) && e.contentWindow), _ = new Set([ "append", "prepend", "before", "after", "insertNode", "replaceWith", "replaceChild", "replaceChildren" ]), {apply: m} = {
                    apply(e, t, r) {
                        const n = Reflect.apply(e, t, r);
                        try {
                            S(n) ? h(n.contentWindow) : _.has(e.name) && r.forEach((e => {
                                S(e) && h(e.contentWindow);
                            }));
                        } catch (e) {}
                        return n;
                    }
                }, b = {
                    apply: m
                };
                window.Node.prototype.appendChild = y(window.Node.prototype.appendChild, b), window.Node.prototype.insertBefore = y(window.Node.prototype.insertBefore, b), 
                window.Node.prototype.replaceChild = y(window.Node.prototype.replaceChild, b), window.Element.prototype.append = y(window.Element.prototype.append, b), 
                window.Element.prototype.prepend = y(window.Element.prototype.prepend, b), window.Element.prototype.replaceChildren = y(window.Element.prototype.replaceChildren, b), 
                window.Element.prototype.replaceWith = y(window.Element.prototype.replaceWith, b), 
                window.Element.prototype.before = y(window.Element.prototype.before, b), window.Element.prototype.after = y(window.Element.prototype.after, b), 
                window.Element.prototype.insertAdjacentElement = y(window.Element.prototype.insertAdjacentElement, b), 
                window.Range.prototype.insertNode = y(window.Range.prototype.insertNode, b), window.CharacterData.prototype.replaceWith = y(window.CharacterData.prototype.replaceWith, b);
                const A = e => Boolean(e) && Object.values(e).some((e => e?.__typename === t)), E = (e, t) => {
                    if (!e || "object" != typeof e || Array.isArray(e)) return !1;
                    const r = Object.keys(e);
                    return r.length === t.length && t.every((e => r.includes(e)));
                }, x = e => E(e, [ "node" ]) && E(e.node, [ "s" ]) && E(e.node.s, [ "__typename" ]) && e.node.s.__typename === t, N = e => {
                    const t = Array.isArray(e) && 1 === e.length ? e[0] : e;
                    if (!t || "object" != typeof t || Array.isArray(t)) return !1;
                    const r = "string" == typeof t.p ? "p" : "string" == typeof t.z9 ? "z9" : "string" == typeof t.k4 ? "k4" : "string" == typeof t.w7 ? "w7" : "string" == typeof t.q8 ? "q8" : "string" == typeof t.n3 ? "n3" : "v6";
                    if ("string" != typeof t[r]) return !1;
                    const n = [ "data", "edges", "require", r ];
                    if (Object.hasOwn(t, "extensions")) {
                        if (!(E(t.extensions, []) || E(t.extensions, [ "is_final" ]) && !0 === t.extensions.is_final)) return !1;
                        n.push("extensions");
                    }
                    return E(t, n) && x(t.data) && Array.isArray(t.edges) && 1 === t.edges.length && x(t.edges[0]) && Array.isArray(t.require) && 1 === t.require.length && x(t.require[0]);
                }, v = (e, t, n, o) => {
                    if (!e || "object" != typeof e || n < 0) return !1;
                    let i = !1;
                    if (Array.isArray(e.nodes)) {
                        const t = e.nodes.filter((e => !(e => {
                            const t = e?.item_collection?.nodes;
                            return e?.__typename === r || Array.isArray(t) && t.some((e => e?.sponsored_data?.ad_id));
                        })(e)));
                        e.nodes.length - t.length > 0 && (e.nodes = t, i = !0);
                    }
                    return Object.entries(e).forEach((([e, r]) => {
                        i = v(r, `${t}.${e}`, n - 1, o) || i;
                    })), i;
                }, O = (e, t = 10) => {
                    const r = e?.data?.viewer, n = r ?? e?.[3]?.[1]?.__bbox?.result?.data?.viewer;
                    if (!n) return !1;
                    return v(n, r ? "data.viewer" : "item[3][1].__bbox.result.data.viewer", t, e);
                }, W = (t, r = 10, n = new WeakMap) => {
                    if (!t || "object" != typeof t || r < 0) return !1;
                    const o = n.get(t);
                    if (void 0 !== o && o >= r) return !1;
                    if (n.set(t, r), N(t)) return !1;
                    let i = ((t, r) => {
                        if (!t || "object" != typeof t) return !1;
                        let n = !1;
                        try {
                            if (r) {
                                if (Array.isArray(t.require?.[0]?.[3]?.[0]?.__bbox?.require) && t.require[0][3][0].__bbox.require.forEach((t => {
                                    t[3]?.[1]?.__bbox?.result?.data?.category === e && (delete t[3][1].__bbox.result.data.node, 
                                    n = !0), A(t[3]?.[1]?.__bbox?.result?.data?.node) && (delete t[3][1].__bbox.result.data.node, 
                                    n = !0), n = O(t) || n;
                                })), Array.isArray(t.data?.viewer?.auxColumnUnits?.nodes) && (n = O(t) || n), Array.isArray(t.data?.viewer?.news_feed?.edges)) {
                                    const r = t.data.viewer.news_feed.edges.length;
                                    t.data.viewer.news_feed.edges = t.data.viewer.news_feed.edges.filter((t => !A(t.node) && t.category !== e)), 
                                    n = n || t.data.viewer.news_feed.edges.length !== r;
                                }
                                A(t.data?.node) && (delete t.data.node, n = !0), t.data?.category === e && (delete t.data.node, 
                                n = !0);
                            }
                        } catch (e) {}
                        return n;
                    })(t, !0);
                    return 0 === r || Object.values(t).forEach((e => {
                        i = W(e, r - 1, n) || i;
                    })), i;
                }, j = (e, t) => {
                    try {
                        const r = "string" == typeof t;
                        if (r && !f(t)) return e;
                        if (N(e)) return e;
                        if (!r && !f(JSON.stringify(e))) return e;
                        W(e) && e && "object" == typeof e && d.add(e);
                    } catch (e) {}
                    return e;
                }, {apply: k} = {
                    apply(e, t, r) {
                        $();
                        const n = Reflect.apply(e, t, r);
                        return j(n, r[0]);
                    }
                }, q = {
                    apply: k
                };
                window.JSON.parse = y(window.JSON.parse, q);
                const J = (e, t, r) => {
                    if (!e || "object" != typeof e && "function" != typeof e) return;
                    let n = o.get(e);
                    if (!t.some((t => "function" == typeof e[t] && !l.has(e[t]) && (n?.get(t) ?? 0) < 10))) return;
                    n || (n = new Map, o.set(e, n));
                    const i = new Map;
                    t.forEach((t => {
                        const r = e[t];
                        "function" == typeof r && l.has(r) && i.set(l.get(r), r);
                    })), t.forEach((t => {
                        const o = e[t], a = n.get(t) ?? 0;
                        if ("function" != typeof o || l.has(o) || a >= 10) return;
                        n.set(t, a + 1);
                        let p = i.get(o);
                        if (!p) {
                            const {apply: e} = {
                                apply(e, t, n) {
                                    const o = Reflect.apply(e, t, n);
                                    return r ? j(o, n[0]) : j(o);
                                }
                            };
                            p = y(o, {
                                apply: e
                            }), i.set(o, p);
                        }
                        e[t] = p;
                    }));
                }, P = [ "parse", "parseText", "readText", "fromText", "fromSource", "fromChunk", "fromBlock" ], R = [ "ghlParseServerJSPayload", "readBootPayload", "decodeBootScript", "hydrateBootData", "inflateBootPayload", "expandBootPayload", "unpackBootPayload" ], B = [ [ [ "json5" ], e => J(e, P, !0) ], [ [ "GHLServerJSParse" ], e => J(e, R, !1) ] ], C = e => {
                    Array.isArray(e) && B.forEach((t => {
                        e.some((e => e?.[1] === t[1])) || e.push(t);
                    }));
                };
                let F = null, M = !1, z = !1;
                const D = new Map, L = B.map((([[e], t]) => r => {
                    D.set(e, r), t(r);
                })), T = () => {
                    if (!M && "function" == typeof window.require) {
                        M = !0;
                        const e = window.require("ifRequired");
                        "function" == typeof e && (F = e);
                    }
                    return F;
                }, $ = () => {
                    if (!z) try {
                        for (let e = 0; e < B.length; e += 1) {
                            const [[t], r] = B[e], n = D.get(t);
                            if (void 0 === n) {
                                if (null === T()) return;
                                F(t, L[e]);
                            } else r(n);
                        }
                    } catch (e) {
                        z = !0;
                    }
                }, {apply: H} = {
                    apply(e, t, r) {
                        let n;
                        $();
                        try {
                            if (u(t), g(t)) {
                                const e = JSON.parse(t);
                                d.has(e) && (n = JSON.stringify(e));
                            }
                        } catch (e) {}
                        return Reflect.apply(e, n ?? t, r);
                    }
                }, U = {
                    apply: H
                };
                window.String.prototype.split = y(window.String.prototype.split, U), window.String.prototype.substring = y(window.String.prototype.substring, U);
                const {apply: G} = {
                    apply(e, t, r) {
                        $();
                        const n = Reflect.apply(e, t, r);
                        try {
                            if (g(n)) {
                                const e = JSON.parse(n);
                                if (d.has(e)) {
                                    return JSON.stringify(e);
                                }
                            }
                        } catch (e) {}
                        return n;
                    }
                }, I = {
                    apply: G
                };
                window.String = y(window.String, I), window.String.prototype.constructor = window.String;
                const K = new Map, Q = /^(?:[\t\r\n ]*(?:\/\/[^\r\n]*(?:\r\n?|\n)|\/\*[\s\S]*?\*\/))+/, V = /^[\t\r\n ]*(?:\[[\t\r\n ]*)?\{[\t\r\n ]*"(?:[^"\\]|\\.)*"[\t\r\n ]*:/, X = e => {
                    const t = K.get(e);
                    if (void 0 !== t) return t;
                    let r = e;
                    try {
                        const t = e.match(Q)?.[0] ?? "", n = e.slice(t.length), o = n.search(/(?:\r\n?|\n)[\t ]*\/\/[^\r\n]*(?:[\r\n][\t ]*)*$/), i = -1 === o ? n : n.slice(0, o), a = n.slice(i.length), p = Reflect.apply(s, i, []);
                        if (u(p) && f(e)) {
                            const e = p.slice(1).match(Q)?.[0] ?? "";
                            let n = "" === e ? i : i.replace(e, "");
                            const o = n.match(V)?.[0] ?? "", s = "" === o ? "" : n.slice(o.length).match(Q)?.[0] ?? "";
                            "" !== s && (n = o + n.slice(o.length + s.length));
                            const l = JSON.parse(n);
                            if (d.has(l)) {
                                let n = JSON.stringify(l);
                                "" !== s && (n = n.replace(V, (e => e + s))), r = t + n[0] + e + n.slice(1) + a;
                            }
                        }
                    } catch (e) {}
                    return ((e, t) => {
                        if (K.size >= 2) {
                            const e = K.keys().next().value;
                            K.delete(e);
                        }
                        return K.set(e, t), t;
                    })(e, r);
                }, {apply: Y} = {
                    apply(e, t, r) {
                        let n = t;
                        try {
                            "string" == typeof t && t.length > 300 && (n = X(t));
                        } catch (e) {}
                        return Reflect.apply(e, n, r);
                    }
                }, Z = {
                    apply: Y
                };
                window.String.prototype.charAt = y(window.String.prototype.charAt, Z);
                const ee = e => {
                    const t = e?.data?.viewer?.marketplace_feed_stories;
                    if (!Array.isArray(t?.edges)) return !1;
                    const r = t.edges.filter((e => !(e => {
                        const t = e?.__typename;
                        return "string" == typeof t && t.includes(n);
                    })(e?.node)));
                    return r.length !== t.edges.length && (t.edges = r, !0);
                }, {apply: te} = {
                    apply(e, t, r) {
                        const n = r[2]?.[0];
                        if (w(n, a)) try {
                            const e = (e => {
                                let t = !1;
                                const r = Reflect.apply(p, e, [ /\r?\n|\r/ ]).map((e => {
                                    if ("" === e.trim()) return e;
                                    let r;
                                    try {
                                        r = JSON.parse(e);
                                    } catch {
                                        return e;
                                    }
                                    const n = d.has(r), o = ee(r);
                                    return n || o ? (t = !0, JSON.stringify(r)) : e;
                                }));
                                return t ? r.join("\r\n") : e;
                            })(n);
                            if (e !== n) {
                                const t = r[2].slice();
                                t[0] = e, r[2] = t;
                            }
                        } catch (e) {}
                        return Reflect.apply(e, t, r);
                    }
                }, re = {
                    apply: te
                };
                window.Function.prototype.call = y(window.Function.prototype.call, re);
                const {apply: ne} = {
                    apply: (e, t, r) => c.has(t) ? c.get(t) : Reflect.apply(e, t, r)
                }, oe = {
                    apply: ne
                };
                window.Function.prototype.toString = y(window.Function.prototype.toString, oe), 
                (() => {
                    const e = window.__rl_stub;
                    if ("function" == typeof window.requireLazy && !Array.isArray(e)) return void B.forEach((([e, t]) => {
                        window.requireLazy(e, t);
                    }));
                    let t = Array.isArray(e) ? e : [];
                    C(t);
                    try {
                        Object.defineProperty(window, "__rl_stub", {
                            configurable: !0,
                            enumerable: !0,
                            get: () => t,
                            set(e) {
                                t = e, C(e);
                            }
                        });
                    } catch (e) {
                        window.__rl_stub = t;
                    }
                })();
            })();
            Object.defineProperty(Window.prototype.toString, "3d248055537ed53f41ae916207fa1e52", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3d248055537ed53f41ae916207fa1e52" due to: ' + error);
        }
    },
    '!function(){var e=new MutationObserver(function(){var m=document.querySelectorAll("div[id^=\'mount_\']");{var e;e=0<m.length?document.querySelectorAll(\'div[role="feed"] > div[data-pagelet^="FeedUnit"] > div[class]:not([style*="height"])\'):document.querySelectorAll(\'[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]\')}e.forEach(function(e){function n(e,n){for(0<m.length?"0"==(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span > span > span[data-content]\')).length&&(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span[aria-label]\')):h=e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [class] [class]"),socheck=0;socheck<h.length;socheck++)h[socheck].innerText.contains(n)&&(p=["1"],d=["1"],u=["1"],i=r=l=1,socheck=h.length)}function t(e,n,t,c,a){for(0<m.length?"0"==(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span > span > span[data-content]\')).length&&(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] div[role="button"][tabindex]\')):h=e.querySelectorAll(".userContentWrapper h5 + div[data-testid] > span a > [class] [class]"),"0"==h.length&&(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span[aria-label]\')),socheck=0;socheck<h.length;socheck++){spancheck=0,1<h.length?(spancheck=h[socheck].querySelectorAll("span")[0],0==spancheck&&(spancheck=h[socheck].querySelectorAll("b")[0])):(spancheck=h[0].querySelectorAll("span")[socheck],0==spancheck&&(spancheck=h[0].querySelectorAll("b")[socheck]));var o=h[0];if(0!=spancheck&&spancheck){if(2==spancheck.children.length&&0<m.length)for(spancheck=spancheck.querySelectorAll("span:not([style])"),spcheck=0;spcheck<spancheck.length;spcheck++)spancheck[spcheck].innerText.contains(n)?s=1:!spancheck[spcheck].innerText.contains(t)||0!=spancheck[spcheck].offsetTop||spancheck[spcheck].innerText.contains(n)||spancheck[spcheck].innerText.contains(c)||spancheck[spcheck].innerText.contains(a)?!spancheck[spcheck].innerText.contains(c)||0!=spancheck[spcheck].offsetTop||spancheck[spcheck].innerText.contains(t)||spancheck[spcheck].innerText.contains(n)||spancheck[spcheck].innerText.contains(a)?!spancheck[spcheck].innerText.contains(a)||0!=spancheck[spcheck].offsetTop||spancheck[spcheck].innerText.contains(t)||spancheck[spcheck].innerText.contains(c)||spancheck[spcheck].innerText.contains(n)||(u=["1"],i=1):(d=["1"],r=1):(p=["1"],l=1);0==m.length&&((!(spancheck.innerText.contains(n)&&0==spancheck.offsetTop||h[0].innerText.contains(n)&&0==h[0].offsetTop)||spancheck.innerText.contains(t)&&!h[0].innerText.contains(t)||spancheck.innerText.contains(c)&&!h[0].innerText.contains(c)||spancheck.innerText.contains(a)&&!h[0].innerText.contains(a))&&(!o.innerText.contains(n)||0!=o.offsetTop||o.innerText.contains(t)||o.innerText.contains(c)||o.innerText.contains(a))?!spancheck.innerText.contains(t)||0!=spancheck.offsetTop||spancheck.innerText.contains(n)||spancheck.innerText.contains(c)||spancheck.innerText.contains(a)?!spancheck.innerText.contains(c)||0!=spancheck.offsetTop||spancheck.innerText.contains(t)||spancheck.innerText.contains(n)||spancheck.innerText.contains(a)?!spancheck.innerText.contains(a)||0!=spancheck.offsetTop||spancheck.innerText.contains(t)||spancheck.innerText.contains(c)||spancheck.innerText.contains(n)||(u=["1"],i=1):(d=["1"],r=1):(p=["1"],l=1):s=1)}}}function c(e,n,t,c,a){u=0<m.length?(h=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span span[data-content=\'+n+"]"),p=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span span[data-content=\'+t+"]"),d=e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span span[data-content=\'+c+"]"),e.querySelectorAll(\'div[role="article"] span[dir="auto"] > a > span span[data-content=\'+a+"]")):(h=e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content="+n+"]"),p=e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content="+t+"]"),d=e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content="+c+"]"),e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content="+a+"]"))}var s=0,l=0,r=0,i=0,h=0,p=0,d=0,u=0,a=e.querySelectorAll("div[style=\'width: 100%\'] > a[href*=\'oculus.com/quest\'] > div"),o=document.querySelector("[lang]"),k=document.querySelectorAll("link[rel=\'preload\'][href*=\'/l/\']");o=o?document.querySelector("[lang]").lang:"en";var y,g=e.querySelectorAll(\'a[ajaxify*="ad_id"] > span\'),f=e.querySelectorAll(\'a[href*="ads/about"]\'),S=e.querySelectorAll(\'a[href*="https://www.facebook.com/business/help"]\');if("display: none !important;"!=e.getAttribute("style")&&!e.classList.contains("hidden_elem")&&(0<g.length||0<f.length||0<S.length?(T+=1,0<m.length?(""==(y=e.querySelectorAll("a[href]")[0].innerText)&&(y=e.querySelectorAll("a[href]")[1].innerText),""==y&&(y=e.querySelectorAll("a[href]")[0].querySelectorAll("a[aria-label]")[0].getAttribute("aria-label"))):y=e.querySelectorAll("a[href]")[2].innerText,console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+T),console.log("F length: "+g.length),console.log("H length: "+f.length),console.log("I length (Paid partnership): "+S.length),console.log("--------"),e.style="display:none!important;"):0<a.length?(T+=1,y="Facebook",console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+T),console.log("Non-declared ad"),console.log("--------"),e.style="display:none!important;"):"af"==o?n(e,"Geborg"):"de"==o||"nl"==o?c(e,"G","e","s","n"):"am"==o?n(e,"የተከፈለበት ማስታወቂያ"):"ar"==o?n(e,"مُموَّل"):"as"==o?n(e,"পৃষ্ঠপোষকতা কৰা"):"az"==o?n(e,"Sponsor dəstəkli"):"co"==o?n(e,"Spunsurizatu"):"bs"==o||"sl"==o||"cs"==o?c(e,"S","p","z","n"):"da"==o||"en"==o||"et"==o||"fy"==o||"it"==o||"ku"==o||"nb"==o||"nn"==o||"pl"==o||"sq"==o||"sv"==o||"zz"==o?0<m.length?k[0].href.contains("en_UD")?n(e,"pəɹosuodS"):k[0].href.contains("ja_KS")?n(e,"広告"):k[0].href.contains("tz_MA")?n(e,"ⵉⴷⵍ"):k[0].href.contains("sy_SY")?n(e,"ܒܘܕܩܐ ܡܡܘܘܢܐ"):k[0].href.contains("cb_IQ")?n(e,"پاڵپشتیکراو"):k[0].href.contains("ar_AR")?n(e,"مُموَّل"):k[0].href.contains("sz_PL")?n(e,"Szpōnzorowane"):k[0].href.contains("eo_EO")?n(e,"Reklamo"):k[0].href.contains("es_LA")?c(e,"P","u","c","d"):(c(e,"S","p","s","n"),"0"==h.length&&t(e,"S","p","s","n"),"0"==h.length&&n(e,"Sponsored")):document.querySelector("body").className.includes("Locale_en_UD")?n(e,"pəɹosuodS"):document.querySelector("body").className.includes("ja_KS")?n(e,"広告"):document.querySelector("body").className.includes("tz_MA")?n(e,"ⵉⴷⵍ"):document.querySelector("body").className.includes("sy_SY")?n(e,"ܒܘܕܩܐ ܡܡܘܘܢܐ"):document.querySelector("body").className.includes("cb_IQ")?n(e,"پاڵپشتیکراو"):document.querySelector("body").className.includes("ar_AR")?n(e,"مُموَّل"):document.querySelector("body").className.includes("sz_PL")?n(e,"Szpōnzorowane"):document.querySelector("body").className.includes("eo_EO")?n(e,"Reklamo"):document.querySelector("body").className.includes("es_LA")?c(e,"P","u","c","d"):(c(e,"S","p","s","n"),"0"==h.length&&t(e,"S","p","s","n")):"be"==o?n(e,"Рэклама"):"bg"==o?n(e,"Спонсорирано"):"mk"==o?n(e,"Спонзорирано"):"br"==o?n(e,"Paeroniet"):"ca"==o?n(e,"Patrocinat"):"gl"==o||"pt"==o?(n(e,"Patrocinado"),"0"==l&&c(e,"P","a","c","o")):"bn"==o?n(e,"সৌজন্যে"):"cb"==o?n(e,"پاڵپشتیکراو"):"cx"==o?c(e,"G","i","s","n"):"cy"==o?n(e,"Noddwyd"):"el"==o?n(e,"Χορηγούμενη"):"eo"==o?n(e,"Reklamo"):"es"==o?c(e,"P","u","c","d"):"eu"==o?n(e,"Babestua"):"fa"==o?n(e,"دارای پشتیبانی مالی"):"ff"==o?n(e,"Yoɓanaama"):"fi"==o?n(e,"Sponsoroitu"):"fo"==o?n(e,"Stuðlað"):"fr"==o?0<m.length?k[0].href.contains("fr_FR")?c(e,"S","p","s","n"):c(e,"C","o","m","n"):document.querySelector("body").className.includes("Locale_fr_FR")?c(e,"S","p","s","n"):c(e,"C","o","m","n"):"ga"==o?n(e,"Urraithe"):"gn"==o?n(e,"Oñepatrosinapyre"):"gu"==o?n(e,"પ્રાયોજિત"):"ha"==o?n(e,"Daukar Nauyi"):"he"==o?n(e,"ממומן"):"hr"==o?n(e,"Plaćeni oglas"):"ht"==o?n(e,"Peye"):"ne"==o||"mr"==o||"hi"==o?n(e,"प्रायोजित"):"hu"==o?c(e,"H","i","r","d"):"hy"==o?n(e,"Գովազդային"):"id"==o?c(e,"B","e","p","n"):"is"==o?n(e,"Kostað"):"ja"==o?n(e,"広告"):"ms"==o?n(e,"Ditaja"):"jv"==o?n(e,"Disponsori"):"ka"==o?n(e,"რეკლამა"):"kk"==o?n(e,"Демеушілік көрсеткен"):"km"==o?n(e,"បានឧបត្ថម្ភ"):"kn"==o?n(e,"ಪ್ರಾಯೋಜಿತ"):"ko"==o?n(e,"Sponsored"):"ky"==o?n(e,"Демөөрчүлөнгөн"):"lo"==o?n(e,"ຜູ້ສະໜັບສະໜູນ"):"lt"==o?n(e,"Remiama"):"lv"==o?n(e,"Apmaksāta reklāma"):"mg"==o?n(e,"Misy Mpiantoka"):"ml"==o?n(e,"സ്പോൺസർ ചെയ്തത്"):"mn"==o?n(e,"Ивээн тэтгэсэн"):"mt"==o?n(e,"Sponsorjat"):"my"==o?(n(e,"ပံ့ပိုးထားသည်"),"0"==l&&n(e,"အခပေးကြော်ငြာ")):"or"==o?n(e,"ପ୍ରଯୋଜିତ"):"pa"==o?n(e,"ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ"):"ps"==o?n(e,"تمويل شوي"):"ro"==o?n(e,"Sponsorizat"):"ru"==o||"uk"==o?n(e,"Реклама"):"rw"==o?n(e,"Icyamamaza ndasukirwaho"):"sc"==o?n(e,"Patronadu de"):"si"==o?n(e,"අනුග්රාහක"):"sk"==o?n(e,"Sponzorované"):"sn"==o?n(e,"Zvabhadharirwa"):"so"==o?n(e,"La maalgeliyey"):"sr"==o?n(e,"Спонзорисано"):"sw"==o?n(e,"Imedhaminiwa"):"sy"==o?n(e,"ܒܘܕܩܐ ܡܡܘܘܢܐ"):"sz"==o?n(e,"Szpōnzorowane"):"ta"==o?n(e,"விளம்பரம்"):"te"==o?n(e,"ప్రాయోజితం చేయబడింది"):"tg"==o?n(e,"Бо сарпарастӣ"):"th"==o?n(e,"ได้รับการสนับสนุน"):"tl"==o?n(e,"May Sponsor"):"tr"==o?n(e,"Sponsorlu"):"tt"==o?n(e,"Хәйрияче"):"tz"==o?n(e,"ⵉⴷⵍ"):"ur"==o?n(e,"سپانسرڈ"):"uz"==o?n(e,"Reklama"):"vi"==o?n(e,"Được tài trợ"):"zh-Hans"==o?n(e,"赞助内容"):"zh-Hant"==o&&n(e,"贊助"),0<h.length&&0<p.length&&0<d.length&&0<u.length)){for(cont=0;cont<h.length;cont++)0<h[cont].offsetHeight&&(cont=h.length,s=1);for(cont1=0;cont1<p.length;cont1++)0<p[cont1].offsetHeight&&(cont1=p.length,l=1);for(cont2=0;cont2<d.length;cont2++)0<d[cont2].offsetHeight&&(cont2=d.length,r=1);for(cont3=0;cont3<u.length;cont3++)0<u[cont3].offsetHeight&&(cont3=u.length,i=1);1==s&&1==l&&1==r&&1==i&&(0<m.length&&""!=(y=e.querySelectorAll("a[href]")[1].innerText)||(y=e.querySelectorAll("a[href]")[2].innerText),T+=1,console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+T),console.log("--------"),e.style="display:none!important;")}})}),T=0;e.observe(document,{childList:!0,subtree:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cb487be2d2edd22f1a9ce90cd6ffe9cf"] === flag) {
                return;
            }
            !function() {
                var e = new MutationObserver((function() {
                    var m = document.querySelectorAll("div[id^='mount_']");
                    {
                        var e;
                        e = 0 < m.length ? document.querySelectorAll('div[role="feed"] > div[data-pagelet^="FeedUnit"] > div[class]:not([style*="height"])') : document.querySelectorAll('[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]');
                    }
                    e.forEach((function(e) {
                        function n(e, n) {
                            for (0 < m.length ? "0" == (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span > span > span[data-content]')).length && (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span[aria-label]')) : h = e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [class] [class]"), 
                            socheck = 0; socheck < h.length; socheck++) h[socheck].innerText.contains(n) && (p = [ "1" ], 
                            d = [ "1" ], u = [ "1" ], i = r = l = 1, socheck = h.length);
                        }
                        function t(e, n, t, c, a) {
                            for (0 < m.length ? "0" == (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span > span > span[data-content]')).length && (h = e.querySelectorAll('div[role="article"] span[dir="auto"] div[role="button"][tabindex]')) : h = e.querySelectorAll(".userContentWrapper h5 + div[data-testid] > span a > [class] [class]"), 
                            "0" == h.length && (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span[aria-label]')), 
                            socheck = 0; socheck < h.length; socheck++) {
                                spancheck = 0, 1 < h.length ? (spancheck = h[socheck].querySelectorAll("span")[0], 
                                0 == spancheck && (spancheck = h[socheck].querySelectorAll("b")[0])) : (spancheck = h[0].querySelectorAll("span")[socheck], 
                                0 == spancheck && (spancheck = h[0].querySelectorAll("b")[socheck]));
                                var o = h[0];
                                if (0 != spancheck && spancheck) {
                                    if (2 == spancheck.children.length && 0 < m.length) for (spancheck = spancheck.querySelectorAll("span:not([style])"), 
                                    spcheck = 0; spcheck < spancheck.length; spcheck++) spancheck[spcheck].innerText.contains(n) ? s = 1 : !spancheck[spcheck].innerText.contains(t) || 0 != spancheck[spcheck].offsetTop || spancheck[spcheck].innerText.contains(n) || spancheck[spcheck].innerText.contains(c) || spancheck[spcheck].innerText.contains(a) ? !spancheck[spcheck].innerText.contains(c) || 0 != spancheck[spcheck].offsetTop || spancheck[spcheck].innerText.contains(t) || spancheck[spcheck].innerText.contains(n) || spancheck[spcheck].innerText.contains(a) ? !spancheck[spcheck].innerText.contains(a) || 0 != spancheck[spcheck].offsetTop || spancheck[spcheck].innerText.contains(t) || spancheck[spcheck].innerText.contains(c) || spancheck[spcheck].innerText.contains(n) || (u = [ "1" ], 
                                    i = 1) : (d = [ "1" ], r = 1) : (p = [ "1" ], l = 1);
                                    0 == m.length && ((!(spancheck.innerText.contains(n) && 0 == spancheck.offsetTop || h[0].innerText.contains(n) && 0 == h[0].offsetTop) || spancheck.innerText.contains(t) && !h[0].innerText.contains(t) || spancheck.innerText.contains(c) && !h[0].innerText.contains(c) || spancheck.innerText.contains(a) && !h[0].innerText.contains(a)) && (!o.innerText.contains(n) || 0 != o.offsetTop || o.innerText.contains(t) || o.innerText.contains(c) || o.innerText.contains(a)) ? !spancheck.innerText.contains(t) || 0 != spancheck.offsetTop || spancheck.innerText.contains(n) || spancheck.innerText.contains(c) || spancheck.innerText.contains(a) ? !spancheck.innerText.contains(c) || 0 != spancheck.offsetTop || spancheck.innerText.contains(t) || spancheck.innerText.contains(n) || spancheck.innerText.contains(a) ? !spancheck.innerText.contains(a) || 0 != spancheck.offsetTop || spancheck.innerText.contains(t) || spancheck.innerText.contains(c) || spancheck.innerText.contains(n) || (u = [ "1" ], 
                                    i = 1) : (d = [ "1" ], r = 1) : (p = [ "1" ], l = 1) : s = 1);
                                }
                            }
                        }
                        function c(e, n, t, c, a) {
                            u = 0 < m.length ? (h = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + n + "]"), 
                            p = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + t + "]"), 
                            d = e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + c + "]"), 
                            e.querySelectorAll('div[role="article"] span[dir="auto"] > a > span span[data-content=' + a + "]")) : (h = e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content=" + n + "]"), 
                            p = e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content=" + t + "]"), 
                            d = e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content=" + c + "]"), 
                            e.querySelectorAll(".userContentWrapper h5 + div[data-testid] a [data-content=" + a + "]"));
                        }
                        var s = 0, l = 0, r = 0, i = 0, h = 0, p = 0, d = 0, u = 0, a = e.querySelectorAll("div[style='width: 100%'] > a[href*='oculus.com/quest'] > div"), o = document.querySelector("[lang]"), k = document.querySelectorAll("link[rel='preload'][href*='/l/']");
                        o = o ? document.querySelector("[lang]").lang : "en";
                        var y, g = e.querySelectorAll('a[ajaxify*="ad_id"] > span'), f = e.querySelectorAll('a[href*="ads/about"]'), S = e.querySelectorAll('a[href*="https://www.facebook.com/business/help"]');
                        if ("display: none !important;" != e.getAttribute("style") && !e.classList.contains("hidden_elem") && (0 < g.length || 0 < f.length || 0 < S.length ? (T += 1, 
                        0 < m.length ? ("" == (y = e.querySelectorAll("a[href]")[0].innerText) && (y = e.querySelectorAll("a[href]")[1].innerText), 
                        "" == y && (y = e.querySelectorAll("a[href]")[0].querySelectorAll("a[aria-label]")[0].getAttribute("aria-label"))) : y = e.querySelectorAll("a[href]")[2].innerText, 
                        console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + T), 
                        console.log("F length: " + g.length), console.log("H length: " + f.length), console.log("I length (Paid partnership): " + S.length), 
                        console.log("--------"), e.style = "display:none!important;") : 0 < a.length ? (T += 1, 
                        y = "Facebook", console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + T), 
                        console.log("Non-declared ad"), console.log("--------"), e.style = "display:none!important;") : "af" == o ? n(e, "Geborg") : "de" == o || "nl" == o ? c(e, "G", "e", "s", "n") : "am" == o ? n(e, "የተከፈለበት ማስታወቂያ") : "ar" == o ? n(e, "مُموَّل") : "as" == o ? n(e, "পৃষ্ঠপোষকতা কৰা") : "az" == o ? n(e, "Sponsor dəstəkli") : "co" == o ? n(e, "Spunsurizatu") : "bs" == o || "sl" == o || "cs" == o ? c(e, "S", "p", "z", "n") : "da" == o || "en" == o || "et" == o || "fy" == o || "it" == o || "ku" == o || "nb" == o || "nn" == o || "pl" == o || "sq" == o || "sv" == o || "zz" == o ? 0 < m.length ? k[0].href.contains("en_UD") ? n(e, "pəɹosuodS") : k[0].href.contains("ja_KS") ? n(e, "広告") : k[0].href.contains("tz_MA") ? n(e, "ⵉⴷⵍ") : k[0].href.contains("sy_SY") ? n(e, "ܒܘܕܩܐ ܡܡܘܘܢܐ") : k[0].href.contains("cb_IQ") ? n(e, "پاڵپشتیکراو") : k[0].href.contains("ar_AR") ? n(e, "مُموَّل") : k[0].href.contains("sz_PL") ? n(e, "Szpōnzorowane") : k[0].href.contains("eo_EO") ? n(e, "Reklamo") : k[0].href.contains("es_LA") ? c(e, "P", "u", "c", "d") : (c(e, "S", "p", "s", "n"), 
                        "0" == h.length && t(e, "S", "p", "s", "n"), "0" == h.length && n(e, "Sponsored")) : document.querySelector("body").className.includes("Locale_en_UD") ? n(e, "pəɹosuodS") : document.querySelector("body").className.includes("ja_KS") ? n(e, "広告") : document.querySelector("body").className.includes("tz_MA") ? n(e, "ⵉⴷⵍ") : document.querySelector("body").className.includes("sy_SY") ? n(e, "ܒܘܕܩܐ ܡܡܘܘܢܐ") : document.querySelector("body").className.includes("cb_IQ") ? n(e, "پاڵپشتیکراو") : document.querySelector("body").className.includes("ar_AR") ? n(e, "مُموَّل") : document.querySelector("body").className.includes("sz_PL") ? n(e, "Szpōnzorowane") : document.querySelector("body").className.includes("eo_EO") ? n(e, "Reklamo") : document.querySelector("body").className.includes("es_LA") ? c(e, "P", "u", "c", "d") : (c(e, "S", "p", "s", "n"), 
                        "0" == h.length && t(e, "S", "p", "s", "n")) : "be" == o ? n(e, "Рэклама") : "bg" == o ? n(e, "Спонсорирано") : "mk" == o ? n(e, "Спонзорирано") : "br" == o ? n(e, "Paeroniet") : "ca" == o ? n(e, "Patrocinat") : "gl" == o || "pt" == o ? (n(e, "Patrocinado"), 
                        "0" == l && c(e, "P", "a", "c", "o")) : "bn" == o ? n(e, "সৌজন্যে") : "cb" == o ? n(e, "پاڵپشتیکراو") : "cx" == o ? c(e, "G", "i", "s", "n") : "cy" == o ? n(e, "Noddwyd") : "el" == o ? n(e, "Χορηγούμενη") : "eo" == o ? n(e, "Reklamo") : "es" == o ? c(e, "P", "u", "c", "d") : "eu" == o ? n(e, "Babestua") : "fa" == o ? n(e, "دارای پشتیبانی مالی") : "ff" == o ? n(e, "Yoɓanaama") : "fi" == o ? n(e, "Sponsoroitu") : "fo" == o ? n(e, "Stuðlað") : "fr" == o ? 0 < m.length ? k[0].href.contains("fr_FR") ? c(e, "S", "p", "s", "n") : c(e, "C", "o", "m", "n") : document.querySelector("body").className.includes("Locale_fr_FR") ? c(e, "S", "p", "s", "n") : c(e, "C", "o", "m", "n") : "ga" == o ? n(e, "Urraithe") : "gn" == o ? n(e, "Oñepatrosinapyre") : "gu" == o ? n(e, "પ્રાયોજિત") : "ha" == o ? n(e, "Daukar Nauyi") : "he" == o ? n(e, "ממומן") : "hr" == o ? n(e, "Plaćeni oglas") : "ht" == o ? n(e, "Peye") : "ne" == o || "mr" == o || "hi" == o ? n(e, "प्रायोजित") : "hu" == o ? c(e, "H", "i", "r", "d") : "hy" == o ? n(e, "Գովազդային") : "id" == o ? c(e, "B", "e", "p", "n") : "is" == o ? n(e, "Kostað") : "ja" == o ? n(e, "広告") : "ms" == o ? n(e, "Ditaja") : "jv" == o ? n(e, "Disponsori") : "ka" == o ? n(e, "რეკლამა") : "kk" == o ? n(e, "Демеушілік көрсеткен") : "km" == o ? n(e, "បានឧបត្ថម្ភ") : "kn" == o ? n(e, "ಪ್ರಾಯೋಜಿತ") : "ko" == o ? n(e, "Sponsored") : "ky" == o ? n(e, "Демөөрчүлөнгөн") : "lo" == o ? n(e, "ຜູ້ສະໜັບສະໜູນ") : "lt" == o ? n(e, "Remiama") : "lv" == o ? n(e, "Apmaksāta reklāma") : "mg" == o ? n(e, "Misy Mpiantoka") : "ml" == o ? n(e, "സ്പോൺസർ ചെയ്തത്") : "mn" == o ? n(e, "Ивээн тэтгэсэн") : "mt" == o ? n(e, "Sponsorjat") : "my" == o ? (n(e, "ပံ့ပိုးထားသည်"), 
                        "0" == l && n(e, "အခပေးကြော်ငြာ")) : "or" == o ? n(e, "ପ୍ରଯୋଜିତ") : "pa" == o ? n(e, "ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ") : "ps" == o ? n(e, "تمويل شوي") : "ro" == o ? n(e, "Sponsorizat") : "ru" == o || "uk" == o ? n(e, "Реклама") : "rw" == o ? n(e, "Icyamamaza ndasukirwaho") : "sc" == o ? n(e, "Patronadu de") : "si" == o ? n(e, "අනුග්රාහක") : "sk" == o ? n(e, "Sponzorované") : "sn" == o ? n(e, "Zvabhadharirwa") : "so" == o ? n(e, "La maalgeliyey") : "sr" == o ? n(e, "Спонзорисано") : "sw" == o ? n(e, "Imedhaminiwa") : "sy" == o ? n(e, "ܒܘܕܩܐ ܡܡܘܘܢܐ") : "sz" == o ? n(e, "Szpōnzorowane") : "ta" == o ? n(e, "விளம்பரம்") : "te" == o ? n(e, "ప్రాయోజితం చేయబడింది") : "tg" == o ? n(e, "Бо сарпарастӣ") : "th" == o ? n(e, "ได้รับการสนับสนุน") : "tl" == o ? n(e, "May Sponsor") : "tr" == o ? n(e, "Sponsorlu") : "tt" == o ? n(e, "Хәйрияче") : "tz" == o ? n(e, "ⵉⴷⵍ") : "ur" == o ? n(e, "سپانسرڈ") : "uz" == o ? n(e, "Reklama") : "vi" == o ? n(e, "Được tài trợ") : "zh-Hans" == o ? n(e, "赞助内容") : "zh-Hant" == o && n(e, "贊助"), 
                        0 < h.length && 0 < p.length && 0 < d.length && 0 < u.length)) {
                            for (cont = 0; cont < h.length; cont++) 0 < h[cont].offsetHeight && (cont = h.length, 
                            s = 1);
                            for (cont1 = 0; cont1 < p.length; cont1++) 0 < p[cont1].offsetHeight && (cont1 = p.length, 
                            l = 1);
                            for (cont2 = 0; cont2 < d.length; cont2++) 0 < d[cont2].offsetHeight && (cont2 = d.length, 
                            r = 1);
                            for (cont3 = 0; cont3 < u.length; cont3++) 0 < u[cont3].offsetHeight && (cont3 = u.length, 
                            i = 1);
                            1 == s && 1 == l && 1 == r && 1 == i && (0 < m.length && "" != (y = e.querySelectorAll("a[href]")[1].innerText) || (y = e.querySelectorAll("a[href]")[2].innerText), 
                            T += 1, console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + T), 
                            console.log("--------"), e.style = "display:none!important;");
                        }
                    }));
                })), T = 0;
                e.observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "cb487be2d2edd22f1a9ce90cd6ffe9cf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cb487be2d2edd22f1a9ce90cd6ffe9cf" due to: ' + error);
        }
    },
    '!function(){var b=0,d=[];new MutationObserver(function(){document.querySelectorAll("div[data-pagelet^=\\"FeedUnit\\"]:not([style*=\\"display: none\\"]), div[role=\\"feed\\"] > div:not([style*=\\"display: none\\"]), div[role=\\"feed\\"] > span:not([style*=\\"display: none\\"]), #ssrb_feed_start + div > div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div span > h3 ~ div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div h3~ div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div h3 ~ div > div[class]:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div[class] > #ssrb_feed_start ~ div > h3 ~ div > div[class]:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div:not([aria-label=\\"Stories\\"]) > h3 ~ div:not([role]) > div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div > div > div[class]:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > h2 ~ div > div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div > div > div[class] > div:not([class], [id]) div:not([class], [id]):not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > h3 ~ div > div[class] > div:not([class], [id]) div:not([class], [id], [dir], [data-0], [style]), div[role=\\"main\\"] div > h2 ~ div > div[class] > div > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] h3[dir=\\"auto\\"] + div > div[class]:not([aria-hidden], [style*=\\"display: none\\"]), div[role=\\"main\\"] div > h2 ~ div > div[class] > div > div:not([style*=\\"display: none\\"]) > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > h2 ~ div > div > div > div:not([style*=\\"display: none\\"]) > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > h3 ~ div > div > div > div:not([role=\\"row\\"], [style*=\\"display: none\\"]) > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div:not([aria-label=\\"Stories\\"]) > :is(h2, h3) ~ div:not([role=\\"button\\"]) > * div[class]:not(.html-div, [role=\\"row\\"]) > div:not([role=\\"row\\"], [data-type=\\"hscroll-child\\"]) > div:not([data-type=\\"hscroll-child\\"], [style*=\\"display: none\\"]), div[role=\\"main\\"] div:not([aria-label=\\"Stories\\"]) > :is(h2, h3) ~ div > *:not(.html-span) > div > div[class]:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div:not([aria-label=\\"Stories\\"]) > :is(h2, h3) ~ div > * > div > div > span > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div:not([aria-label=\\"Stories\\"] > :is(h2, h3) ~ div > * > div div span > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > :is(h2, h3) ~ div > * > div div span > div > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > :is(h2, h3) ~ div > * > div span > div:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > :is(h2, h3) ~ div > * > div span div[class=\\"\\"]:not([style*=\\"display: none\\"]), div:not([class],[id]) div:not([class],[id]) > [class]:not([style*=\\"display: none\\"],img,div,h3,span,a), div[role=\\"main\\"] h3 + div[aria-hidden] + div > * > *:not(div,[style*=\\"display: none\\"]), div[role=\\"main\\"] h3 + div[aria-hidden] + div > div:not([style*=\\"display: none\\"])").forEach(function(e){Object.keys(e).forEach(function(a){if(a.includes?.("__reactEvents")||a.includes?.("__reactProps")){a=e[a];try{if(a.children?.props?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.category?.includes("SPONSORED")||a.children?.props?.feedEdge?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.feed_story_category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_cat?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category_sensitive?.cat?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsored_data?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.feedUnit?.lbl_sp_data?.ad_id||a.children?.props?.children?.props?.minGapType?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsored_data?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.spons_data?.brs_filter_setting||a.children?.props?.children?.props?.feedEdge?.cat_sensitive?.cat?.includes("SPONSORED")||a.children?.props?.children?.props?.feedEdge?.node?.sponso_dat_flag?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponso_dat_flag?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.minGapType?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.cat_sensitive?.cat?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED")||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.__fragments?.useCometFeedUnitReordering_newsFeedEdge?.node?.daspo_sto?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.new_sponsorw_distn_aucton_of||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.da_the_spons?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsore_da?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.spons_the_dat?.brs_filter_setting||a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.th_dat_spo?.brs_filter_setting){b++,e.style="display: none !important;";var f=e.querySelector("a[href][aria-label]:not([aria-hidden])");f&&(d.push(["Ad blocked based on property ["+b+"] -> "+f.ariaLabel]),console.table(d))}}catch(a){}}})})}).observe(document,{childList:!0,subtree:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5348b236a5a07dc9d425cabee106fa41"] === flag) {
                return;
            }
            !function() {
                var b = 0, d = [];
                new MutationObserver((function() {
                    document.querySelectorAll('div[data-pagelet^="FeedUnit"]:not([style*="display: none"]), div[role="feed"] > div:not([style*="display: none"]), div[role="feed"] > span:not([style*="display: none"]), #ssrb_feed_start + div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div span > h3 ~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3 ~ div > div[class]:not([style*="display: none"]), div[role="main"] div[class] > #ssrb_feed_start ~ div > h3 ~ div > div[class]:not([style*="display: none"]), div[role="main"] div:not([aria-label="Stories"]) > h3 ~ div:not([role]) > div[class]:not([style*="display: none"]), #ssrb_feed_start + div > div > div[class]:not([style*="display: none"]), div[role="main"] div > h2 ~ div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div > div > div[class] > div:not([class], [id]) div:not([class], [id]):not([style*="display: none"]), div[role="main"] div > h3 ~ div > div[class] > div:not([class], [id]) div:not([class], [id], [dir], [data-0], [style]), div[role="main"] div > h2 ~ div > div[class] > div > div:not([style*="display: none"]), div[role="main"] h3[dir="auto"] + div > div[class]:not([aria-hidden], [style*="display: none"]), div[role="main"] div > h2 ~ div > div[class] > div > div:not([style*="display: none"]) > div:not([style*="display: none"]), div[role="main"] div > h2 ~ div > div > div > div:not([style*="display: none"]) > div:not([style*="display: none"]), div[role="main"] div > h3 ~ div > div > div > div:not([role="row"], [style*="display: none"]) > div:not([style*="display: none"]), div[role="main"] div:not([aria-label="Stories"]) > :is(h2, h3) ~ div:not([role="button"]) > * div[class]:not(.html-div, [role="row"]) > div:not([role="row"], [data-type="hscroll-child"]) > div:not([data-type="hscroll-child"], [style*="display: none"]), div[role="main"] div:not([aria-label="Stories"]) > :is(h2, h3) ~ div > *:not(.html-span) > div > div[class]:not([style*="display: none"]), div[role="main"] div:not([aria-label="Stories"]) > :is(h2, h3) ~ div > * > div > div > span > div:not([style*="display: none"]), div[role="main"] div:not([aria-label="Stories"] > :is(h2, h3) ~ div > * > div div span > div:not([style*="display: none"]), div[role="main"] div > :is(h2, h3) ~ div > * > div div span > div > div:not([style*="display: none"]), div[role="main"] div > :is(h2, h3) ~ div > * > div span > div:not([style*="display: none"]), div[role="main"] div > :is(h2, h3) ~ div > * > div span div[class=""]:not([style*="display: none"]), div:not([class],[id]) div:not([class],[id]) > [class]:not([style*="display: none"],img,div,h3,span,a), div[role="main"] h3 + div[aria-hidden] + div > * > *:not(div,[style*="display: none"]), div[role="main"] h3 + div[aria-hidden] + div > div:not([style*="display: none"])').forEach((function(e) {
                        Object.keys(e).forEach((function(a) {
                            if (a.includes?.("__reactEvents") || a.includes?.("__reactProps")) {
                                a = e[a];
                                try {
                                    if (a.children?.props?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.category?.includes("SPONSORED") || a.children?.props?.feedEdge?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.feed_story_category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.story_cat?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category_sensitive?.cat?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsored_data?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.feedUnit?.lbl_sp_data?.ad_id || a.children?.props?.children?.props?.minGapType?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsored_data?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.spons_data?.brs_filter_setting || a.children?.props?.children?.props?.feedEdge?.cat_sensitive?.cat?.includes("SPONSORED") || a.children?.props?.children?.props?.feedEdge?.node?.sponso_dat_flag?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponso_dat_flag?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.minGapType?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.cat_sensitive?.cat?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.category?.includes("SPONSORED") || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.__fragments?.useCometFeedUnitReordering_newsFeedEdge?.node?.daspo_sto?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.new_sponsorw_distn_aucton_of || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.daspo_sto?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.da_the_spons?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.sponsore_da?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.spons_the_dat?.brs_filter_setting || a.children?.props?.children?.props?.children?.props?.children?.props?.children?.props?.feedEdge?.node?.th_dat_spo?.brs_filter_setting) {
                                        b++, e.style = "display: none !important;";
                                        var f = e.querySelector("a[href][aria-label]:not([aria-hidden])");
                                        f && (d.push([ "Ad blocked based on property [" + b + "] -> " + f.ariaLabel ]), 
                                        console.table(d));
                                    }
                                } catch (a) {}
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "5348b236a5a07dc9d425cabee106fa41", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5348b236a5a07dc9d425cabee106fa41" due to: ' + error);
        }
    },
    '(()=>{const e=new MutationObserver((()=>{const n=document.querySelectorAll(\'div[role="complementary"] div[class*=" "] > div[class] > div:not([class]) > div:not([class], [style*="display: none"]), div[role="complementary"] div[class*=" "] > div[class] > div:not([class]) > span[class] > div[class]:not([style*="display: none"]), div[role="complementary"] div:has(+ div[data-visualcompletion]) > div:not([style*="display: none"]), div[role="complementary"] > div[class] > div[class] > div[class] > div[class] > div > div:not([style*="display: none"]),div[role="complementary"] > div[class] > div[class] > div[class] > div[class] > div > div > div:not([style*="display: none"])\');for(const s of n){const n=Object.keys(s).find((e=>e.includes("__reactFiber")));if(n){const t=s[n];if(t?.pendingProps?.children?.props?.match?.__fragmentPropName?.includes("adsSideFeedUnit"))return s.style.display="none",void e.disconnect()}}}));e.observe(document.documentElement,{childList:!0,subtree:!0})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d7bdccff18fe1619323480eaa54a0ae2"] === flag) {
                return;
            }
            (() => {
                const e = new MutationObserver((() => {
                    const n = document.querySelectorAll('div[role="complementary"] div[class*=" "] > div[class] > div:not([class]) > div:not([class], [style*="display: none"]), div[role="complementary"] div[class*=" "] > div[class] > div:not([class]) > span[class] > div[class]:not([style*="display: none"]), div[role="complementary"] div:has(+ div[data-visualcompletion]) > div:not([style*="display: none"]), div[role="complementary"] > div[class] > div[class] > div[class] > div[class] > div > div:not([style*="display: none"]),div[role="complementary"] > div[class] > div[class] > div[class] > div[class] > div > div > div:not([style*="display: none"])');
                    for (const s of n) {
                        const n = Object.keys(s).find((e => e.includes("__reactFiber")));
                        if (n) {
                            const t = s[n];
                            if (t?.pendingProps?.children?.props?.match?.__fragmentPropName?.includes("adsSideFeedUnit")) return s.style.display = "none", 
                            void e.disconnect();
                        }
                    }
                }));
                e.observe(document.documentElement, {
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "d7bdccff18fe1619323480eaa54a0ae2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d7bdccff18fe1619323480eaa54a0ae2" due to: ' + error);
        }
    },
    '!function(){(new MutationObserver(function(){window.location.href.includes("/watch")&&document.querySelectorAll(\'#watch_feed div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"]) div[class^="_"] > div[class*=" "]\').forEach(function(b){Object.keys(b).forEach(function(a){if(a.includes("__reactFiber")){a=b[a];try{var c,d,e,f;if(null==(c=a)?0:null==(d=c["return"])?0:null==(e=d.memoizedProps)?0:null==(f=e.story)?0:f.sponsored_data){var g=b.closest(\'#watch_feed div[class*=" "] div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"])\');g.style="display: none !important;"}}catch(h){}}})})})).observe(document,{childList:!0,subtree:!0,attributeFilter:["style"]})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["21d8e78f9157f1f1188b26cd68182732"] === flag) {
                return;
            }
            !function() {
                new MutationObserver((function() {
                    window.location.href.includes("/watch") && document.querySelectorAll('#watch_feed div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"]) div[class^="_"] > div[class*=" "]').forEach((function(b) {
                        Object.keys(b).forEach((function(a) {
                            if (a.includes("__reactFiber")) {
                                a = b[a];
                                try {
                                    var c, d, e, f;
                                    if (null == (c = a) ? 0 : null == (d = c["return"]) ? 0 : null == (e = d.memoizedProps) ? 0 : null == (f = e.story) ? 0 : f.sponsored_data) {
                                        var g = b.closest('#watch_feed div[class*=" "] div:not([class]):not([id]) > div[class*=" "]:not([style*="display: none !important"])');
                                        g.style = "display: none !important;";
                                    }
                                } catch (h) {}
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0,
                    attributeFilter: [ "style" ]
                });
            }();
            Object.defineProperty(Window.prototype.toString, "21d8e78f9157f1f1188b26cd68182732", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "21d8e78f9157f1f1188b26cd68182732" due to: ' + error);
        }
    },
    '!function(){if(location.href.includes("marketplace/item")){var b=0,d=[];new MutationObserver(function(){document.querySelectorAll("div[aria-label=\'Marketplace listing viewer\'] > div div + div + span:not([style*=\'display: none\']), #ssrb_feed_start + div > div div + div + span:not([style*=\'display: none\'])").forEach(function(e){Object.keys(e).forEach(function(a){if(a.includes("__reactEvents")||a.includes("__reactProps")){a=e[a];try{if(a.children?.props?.children?.props?.adId){b++,e.style="display: none !important;";var f=e.querySelector("a[href][aria-label]:not([aria-hidden])");f&&(d.push(["Ad blocked based on property ["+b+"] -> "+f.ariaLabel]),console.table(d))}}catch(a){}}})})}).observe(document,{childList:!0,subtree:!0})}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b5ee651ceb5b17d69e521c7d45d2dc1f"] === flag) {
                return;
            }
            !function() {
                if (location.href.includes("marketplace/item")) {
                    var b = 0, d = [];
                    new MutationObserver((function() {
                        document.querySelectorAll("div[aria-label='Marketplace listing viewer'] > div div + div + span:not([style*='display: none']), #ssrb_feed_start + div > div div + div + span:not([style*='display: none'])").forEach((function(e) {
                            Object.keys(e).forEach((function(a) {
                                if (a.includes("__reactEvents") || a.includes("__reactProps")) {
                                    a = e[a];
                                    try {
                                        if (a.children?.props?.children?.props?.adId) {
                                            b++, e.style = "display: none !important;";
                                            var f = e.querySelector("a[href][aria-label]:not([aria-hidden])");
                                            f && (d.push([ "Ad blocked based on property [" + b + "] -> " + f.ariaLabel ]), 
                                            console.table(d));
                                        }
                                    } catch (a) {}
                                }
                            }));
                        }));
                    })).observe(document, {
                        childList: !0,
                        subtree: !0
                    });
                }
            }();
            Object.defineProperty(Window.prototype.toString, "b5ee651ceb5b17d69e521c7d45d2dc1f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b5ee651ceb5b17d69e521c7d45d2dc1f" due to: ' + error);
        }
    },
    '!function(){var e=new MutationObserver(function(){document.querySelectorAll(\'[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]\').forEach(function(e){function t(e,t){for(s=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="sub"] a [class] [class]\'),socheck=0;socheck<s.length;socheck++)s[socheck].innerText.contains(t)&&(c=["1"],d=["1"],i=["1"],r=l=a=1,socheck=s.length)}function o(e,t,o,n,a){s=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=\'+t+"]"),c=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=\'+o+"]"),d=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=\'+n+"]"),i=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=\'+a+"]"),0==s.length&&(s=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="label"] a [data-content=\'+t+"]"),c=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="label"] a [data-content=\'+o+"]"),d=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="label"] a [data-content=\'+n+"]"),i=e.querySelectorAll(\'.userContentWrapper h5 + div[data-testid*="label"] a [data-content=\'+a+"]"))}var n=0,a=0,l=0,r=0,s=0,c=0,d=0,i=0,u=e.querySelectorAll("div[style=\'width: 100%\'] > a[href*=\'oculus.com/quest\'] > div"),h=document.querySelector("[lang]").lang,g=e.querySelectorAll(\'a[ajaxify*="ad_id"] > span\'),p=e.querySelectorAll(\'a[href*="ads/about"]\');if("display: none !important;"!=e.getAttribute("style")&&!e.classList.contains("hidden_elem")){if(0<g.length||0<p.length){f+=1;var y=e.querySelectorAll("a[href]")[2].innerText;console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+f),console.log("F length: "+g.length),console.log("H length: "+p.length),console.log("--------"),e.style="display:none!important;"}else if(0<u.length){f+=1;y="Facebook";console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+f),console.log("Non-declared ad"),console.log("--------"),e.style="display:none!important;"}else"af"==h?t(e,"Geborg"):"de"==h||"nl"==h?o(e,"G","e","s","n"):"am"==h?t(e,"የተከፈለበት ማስታወቂያ"):"ar"==h?t(e,"مُموَّل"):"as"==h?t(e,"পৃষ্ঠপোষকতা কৰা"):"az"==h?t(e,"Sponsor dəstəkli"):"co"==h?t(e,"Spunsurizatu"):"bs"==h||"sl"==h||"cs"==h?o(e,"S","p","z","n"):"da"==h||"en"==h||"et"==h||"fy"==h||"it"==h||"ku"==h||"nb"==h||"nn"==h||"pl"==h||"sq"==h||"sv"==h||"zz"==h?document.querySelector("body").className.includes("Locale_en_UD")?t(e,"pəɹosuodS"):o(e,"S","p","s","n"):"be"==h?t(e,"Рэклама"):"bg"==h?t(e,"Спонсорирано"):"mk"==h?t(e,"Спонзорирано"):"br"==h?t(e,"Paeroniet"):"ca"==h?t(e,"Patrocinat"):"gl"==h||"pt"==h?t(e,"Patrocinado"):"bn"==h?t(e,"সৌজন্যে"):"cb"==h?t(e,"پاڵپشتیکراو"):"cx"==h?o(e,"G","i","s","n"):"cy"==h?t(e,"Noddwyd"):"el"==h?t(e,"Χορηγούμενη"):"eo"==h?t(e,"Reklamo"):"es"==h?o(e,"P","u","c","d"):"eu"==h?t(e,"Babestua"):"fa"==h?t(e,"دارای پشتیبانی مالی"):"ff"==h?t(e,"Yoɓanaama"):"fi"==h?t(e,"Sponsoroitu"):"fo"==h?t(e,"Stuðlað"):"fr"==h?document.querySelector("body").className.includes("Locale_fr_FR")?o(e,"S","p","s","n"):o(e,"C","o","m","n"):"ga"==h?t(e,"Urraithe"):"gn"==h?t(e,"Oñepatrosinapyre"):"gu"==h?t(e,"પ્રાયોજિત"):"ha"==h?t(e,"Daukar Nauyi"):"he"==h?t(e,"ממומן"):"hr"==h?t(e,"Plaćeni oglas"):"ht"==h?t(e,"Peye"):"ne"==h||"mr"==h||"hi"==h?t(e,"प्रायोजित"):"hu"==h?o(e,"H","i","r","d"):"hy"==h?t(e,"Գովազդային"):"id"==h?o(e,"B","e","p","n"):"is"==h?t(e,"Kostað"):"ja"==h?t(e,"広告"):"ms"==h?t(e,"Ditaja"):"jv"==h?t(e,"Disponsori"):"ka"==h?t(e,"რეკლამა"):"kk"==h?t(e,"Демеушілік көрсеткен"):"km"==h?t(e,"បានឧបត្ថម្ភ"):"kn"==h?t(e,"ಪ್ರಾಯೋಜಿತ"):"ko"==h?t(e,"Sponsored"):"ky"==h?t(e,"Демөөрчүлөнгөн"):"lo"==h?t(e,"ຜູ້ສະໜັບສະໜູນ"):"lt"==h?t(e,"Remiama"):"lv"==h?t(e,"Apmaksāta reklāma"):"mg"==h?t(e,"Misy Mpiantoka"):"ml"==h?t(e,"സ്പോൺസർ ചെയ്തത്"):"mn"==h?t(e,"Ивээн тэтгэсэн"):"mt"==h?t(e,"Sponsorjat"):"my"==h?t(e,"ပံ့ပိုးထားသည်"):"or"==h?t(e,"ପ୍ରଯୋଜିତ"):"pa"==h?t(e,"ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ"):"ps"==h?t(e,"تمويل شوي"):"ro"==h?t(e,"Sponsorizat"):"ru"==h||"uk"==h?t(e,"Реклама"):"rw"==h?t(e,"Icyamamaza ndasukirwaho"):"sc"==h?t(e,"Patronadu de"):"si"==h?t(e,"අනුග්‍රාහක"):"sk"==h?t(e,"Sponzorované"):"sn"==h?t(e,"Zvabhadharirwa"):"so"==h?t(e,"La maalgeliyey"):"sr"==h?t(e,"Спонзорисано"):"sw"==h?t(e,"Imedhaminiwa"):"sy"==h?t(e,"ܒܘܕܩܐ ܡܡܘܘܢܐ"):"sz"==h?t(e,"Szpōnzorowane"):"ta"==h?t(e,"விளம்பரம்"):"te"==h?t(e,"ప్రాయోజితం చేయబడింది"):"tg"==h?t(e,"Бо сарпарастӣ"):"th"==h?t(e,"ได้รับการสนับสนุน"):"tl"==h?t(e,"May Sponsor"):"tr"==h?t(e,"Sponsorlu"):"tt"==h?t(e,"Хәйрияче"):"tz"==h?t(e,"ⵉⴷⵍ"):"ur"==h?t(e,"سپانسرڈ"):"uz"==h?t(e,"Reklama"):"vi"==h?t(e,"Được tài trợ"):"zh-Hans"==h?t(e,"赞助内容"):"zh-Hant"==h&&t(e,"贊助");if(0<s.length&&0<c.length&&0<d.length&&0<i.length){for(cont=0;cont<s.length;cont++)0<s[cont].offsetHeight&&(cont=s.length,n=1);for(cont1=0;cont1<c.length;cont1++)0<c[cont1].offsetHeight&&(cont1=c.length,a=1);for(cont2=0;cont2<d.length;cont2++)0<d[cont2].offsetHeight&&(cont2=d.length,l=1);for(cont3=0;cont3<i.length;cont3++)0<i[cont3].offsetHeight&&(cont3=i.length,r=1);if(1==n&&1==a&&1==l&&1==r){y=e.querySelectorAll("a[href]")[2].innerText;f+=1,console.log("--------"),console.log("Ad hidden from: "+y),console.log("Total ads hidden: "+f),console.log("--------"),e.style="display:none!important;"}}}})}),f=0;e.observe(document,{childList:!0,subtree:!0,characterData:!0,attributes:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c20e5794d5ff5adb72bad3179e0fd5f5"] === flag) {
                return;
            }
            !function() {
                var e = new MutationObserver((function() {
                    document.querySelectorAll('[id^="substream"] > div:not(.hidden_elem) div[id^="hyperfeed_story_id"]').forEach((function(e) {
                        function t(e, t) {
                            for (s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [class] [class]'), 
                            socheck = 0; socheck < s.length; socheck++) s[socheck].innerText.contains(t) && (c = [ "1" ], 
                            d = [ "1" ], i = [ "1" ], r = l = a = 1, socheck = s.length);
                        }
                        function o(e, t, o, n, a) {
                            s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + t + "]"), 
                            c = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + o + "]"), 
                            d = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + n + "]"), 
                            i = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="sub"] a [data-content=' + a + "]"), 
                            0 == s.length && (s = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + t + "]"), 
                            c = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + o + "]"), 
                            d = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + n + "]"), 
                            i = e.querySelectorAll('.userContentWrapper h5 + div[data-testid*="label"] a [data-content=' + a + "]"));
                        }
                        var n = 0, a = 0, l = 0, r = 0, s = 0, c = 0, d = 0, i = 0, u = e.querySelectorAll("div[style='width: 100%'] > a[href*='oculus.com/quest'] > div"), h = document.querySelector("[lang]").lang, g = e.querySelectorAll('a[ajaxify*="ad_id"] > span'), p = e.querySelectorAll('a[href*="ads/about"]');
                        if ("display: none !important;" != e.getAttribute("style") && !e.classList.contains("hidden_elem")) {
                            if (0 < g.length || 0 < p.length) {
                                f += 1;
                                var y = e.querySelectorAll("a[href]")[2].innerText;
                                console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + f), 
                                console.log("F length: " + g.length), console.log("H length: " + p.length), console.log("--------"), 
                                e.style = "display:none!important;";
                            } else if (0 < u.length) {
                                f += 1;
                                y = "Facebook";
                                console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + f), 
                                console.log("Non-declared ad"), console.log("--------"), e.style = "display:none!important;";
                            } else "af" == h ? t(e, "Geborg") : "de" == h || "nl" == h ? o(e, "G", "e", "s", "n") : "am" == h ? t(e, "የተከፈለበት ማስታወቂያ") : "ar" == h ? t(e, "مُموَّل") : "as" == h ? t(e, "পৃষ্ঠপোষকতা কৰা") : "az" == h ? t(e, "Sponsor dəstəkli") : "co" == h ? t(e, "Spunsurizatu") : "bs" == h || "sl" == h || "cs" == h ? o(e, "S", "p", "z", "n") : "da" == h || "en" == h || "et" == h || "fy" == h || "it" == h || "ku" == h || "nb" == h || "nn" == h || "pl" == h || "sq" == h || "sv" == h || "zz" == h ? document.querySelector("body").className.includes("Locale_en_UD") ? t(e, "pəɹosuodS") : o(e, "S", "p", "s", "n") : "be" == h ? t(e, "Рэклама") : "bg" == h ? t(e, "Спонсорирано") : "mk" == h ? t(e, "Спонзорирано") : "br" == h ? t(e, "Paeroniet") : "ca" == h ? t(e, "Patrocinat") : "gl" == h || "pt" == h ? t(e, "Patrocinado") : "bn" == h ? t(e, "সৌজন্যে") : "cb" == h ? t(e, "پاڵپشتیکراو") : "cx" == h ? o(e, "G", "i", "s", "n") : "cy" == h ? t(e, "Noddwyd") : "el" == h ? t(e, "Χορηγούμενη") : "eo" == h ? t(e, "Reklamo") : "es" == h ? o(e, "P", "u", "c", "d") : "eu" == h ? t(e, "Babestua") : "fa" == h ? t(e, "دارای پشتیبانی مالی") : "ff" == h ? t(e, "Yoɓanaama") : "fi" == h ? t(e, "Sponsoroitu") : "fo" == h ? t(e, "Stuðlað") : "fr" == h ? document.querySelector("body").className.includes("Locale_fr_FR") ? o(e, "S", "p", "s", "n") : o(e, "C", "o", "m", "n") : "ga" == h ? t(e, "Urraithe") : "gn" == h ? t(e, "Oñepatrosinapyre") : "gu" == h ? t(e, "પ્રાયોજિત") : "ha" == h ? t(e, "Daukar Nauyi") : "he" == h ? t(e, "ממומן") : "hr" == h ? t(e, "Plaćeni oglas") : "ht" == h ? t(e, "Peye") : "ne" == h || "mr" == h || "hi" == h ? t(e, "प्रायोजित") : "hu" == h ? o(e, "H", "i", "r", "d") : "hy" == h ? t(e, "Գովազդային") : "id" == h ? o(e, "B", "e", "p", "n") : "is" == h ? t(e, "Kostað") : "ja" == h ? t(e, "広告") : "ms" == h ? t(e, "Ditaja") : "jv" == h ? t(e, "Disponsori") : "ka" == h ? t(e, "რეკლამა") : "kk" == h ? t(e, "Демеушілік көрсеткен") : "km" == h ? t(e, "បានឧបត្ថម្ភ") : "kn" == h ? t(e, "ಪ್ರಾಯೋಜಿತ") : "ko" == h ? t(e, "Sponsored") : "ky" == h ? t(e, "Демөөрчүлөнгөн") : "lo" == h ? t(e, "ຜູ້ສະໜັບສະໜູນ") : "lt" == h ? t(e, "Remiama") : "lv" == h ? t(e, "Apmaksāta reklāma") : "mg" == h ? t(e, "Misy Mpiantoka") : "ml" == h ? t(e, "സ്പോൺസർ ചെയ്തത്") : "mn" == h ? t(e, "Ивээн тэтгэсэн") : "mt" == h ? t(e, "Sponsorjat") : "my" == h ? t(e, "ပံ့ပိုးထားသည်") : "or" == h ? t(e, "ପ୍ରଯୋଜିତ") : "pa" == h ? t(e, "ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ") : "ps" == h ? t(e, "تمويل شوي") : "ro" == h ? t(e, "Sponsorizat") : "ru" == h || "uk" == h ? t(e, "Реклама") : "rw" == h ? t(e, "Icyamamaza ndasukirwaho") : "sc" == h ? t(e, "Patronadu de") : "si" == h ? t(e, "අනුග්‍රාහක") : "sk" == h ? t(e, "Sponzorované") : "sn" == h ? t(e, "Zvabhadharirwa") : "so" == h ? t(e, "La maalgeliyey") : "sr" == h ? t(e, "Спонзорисано") : "sw" == h ? t(e, "Imedhaminiwa") : "sy" == h ? t(e, "ܒܘܕܩܐ ܡܡܘܘܢܐ") : "sz" == h ? t(e, "Szpōnzorowane") : "ta" == h ? t(e, "விளம்பரம்") : "te" == h ? t(e, "ప్రాయోజితం చేయబడింది") : "tg" == h ? t(e, "Бо сарпарастӣ") : "th" == h ? t(e, "ได้รับการสนับสนุน") : "tl" == h ? t(e, "May Sponsor") : "tr" == h ? t(e, "Sponsorlu") : "tt" == h ? t(e, "Хәйрияче") : "tz" == h ? t(e, "ⵉⴷⵍ") : "ur" == h ? t(e, "سپانسرڈ") : "uz" == h ? t(e, "Reklama") : "vi" == h ? t(e, "Được tài trợ") : "zh-Hans" == h ? t(e, "赞助内容") : "zh-Hant" == h && t(e, "贊助");
                            if (0 < s.length && 0 < c.length && 0 < d.length && 0 < i.length) {
                                for (cont = 0; cont < s.length; cont++) 0 < s[cont].offsetHeight && (cont = s.length, 
                                n = 1);
                                for (cont1 = 0; cont1 < c.length; cont1++) 0 < c[cont1].offsetHeight && (cont1 = c.length, 
                                a = 1);
                                for (cont2 = 0; cont2 < d.length; cont2++) 0 < d[cont2].offsetHeight && (cont2 = d.length, 
                                l = 1);
                                for (cont3 = 0; cont3 < i.length; cont3++) 0 < i[cont3].offsetHeight && (cont3 = i.length, 
                                r = 1);
                                if (1 == n && 1 == a && 1 == l && 1 == r) {
                                    y = e.querySelectorAll("a[href]")[2].innerText;
                                    f += 1, console.log("--------"), console.log("Ad hidden from: " + y), console.log("Total ads hidden: " + f), 
                                    console.log("--------"), e.style = "display:none!important;";
                                }
                            }
                        }
                    }));
                })), f = 0;
                e.observe(document, {
                    childList: !0,
                    subtree: !0,
                    characterData: !0,
                    attributes: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "c20e5794d5ff5adb72bad3179e0fd5f5", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c20e5794d5ff5adb72bad3179e0fd5f5" due to: ' + error);
        }
    },
    '!function(){var e,o;0<window.location.href.indexOf("marketplace")&&(e=new MutationObserver(function(){document.querySelectorAll(\'div[role="main"] div[class][style^="max-width:"] div[class][style^="max-width:"]\').forEach(function(e){var l,t=e.querySelectorAll(\'a[href*="ads/about"]\');"display: none !important;"==e.getAttribute("style")||e.classList.contains("hidden_elem")||0<t.length&&(o+=1,""==(l=e.querySelectorAll("a[href]")[0].innerText)&&(l=e.querySelectorAll("a[href]")[1].innerText),""==l&&(l=e.querySelectorAll("a[href]")[0].querySelectorAll("a[aria-label]")[0]?.getAttribute("aria-label")),console.log("--------"),console.log("Ad hidden from: "+l),console.log("Total ads hidden: "+o),console.log("H length: "+t.length),console.log("--------"),e.style="display:none!important;")})}),o=0,e.observe(document,{childList:!0,subtree:!0}))}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e6189b04febc53c553beba1616cdd078"] === flag) {
                return;
            }
            !function() {
                var e, o;
                0 < window.location.href.indexOf("marketplace") && (e = new MutationObserver((function() {
                    document.querySelectorAll('div[role="main"] div[class][style^="max-width:"] div[class][style^="max-width:"]').forEach((function(e) {
                        var l, t = e.querySelectorAll('a[href*="ads/about"]');
                        "display: none !important;" == e.getAttribute("style") || e.classList.contains("hidden_elem") || 0 < t.length && (o += 1, 
                        "" == (l = e.querySelectorAll("a[href]")[0].innerText) && (l = e.querySelectorAll("a[href]")[1].innerText), 
                        "" == l && (l = e.querySelectorAll("a[href]")[0].querySelectorAll("a[aria-label]")[0]?.getAttribute("aria-label")), 
                        console.log("--------"), console.log("Ad hidden from: " + l), console.log("Total ads hidden: " + o), 
                        console.log("H length: " + t.length), console.log("--------"), e.style = "display:none!important;");
                    }));
                })), o = 0, e.observe(document, {
                    childList: !0,
                    subtree: !0
                }));
            }();
            Object.defineProperty(Window.prototype.toString, "e6189b04febc53c553beba1616cdd078", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e6189b04febc53c553beba1616cdd078" due to: ' + error);
        }
    },
    '!function(){new MutationObserver(function(){document.querySelectorAll("div[role=\\"main\\"] div[class][style^=\\"max-width:\\"] div[class][style*=\\"max-width:\\"]:not([style*=\\"display: none\\"])").forEach(function(c){Object.keys(c).forEach(function(a){if(a.includes("__reactEvents")||a.includes("__reactProps")){a=c[a];try{a.children?.props?.adSurface?.startsWith("Marketplace")&&(c.style="display: none !important;")}catch(a){}}})})}).observe(document,{childList:!0,subtree:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9201edecacad19e52ef0fb416ec8c902"] === flag) {
                return;
            }
            !function() {
                new MutationObserver((function() {
                    document.querySelectorAll('div[role="main"] div[class][style^="max-width:"] div[class][style*="max-width:"]:not([style*="display: none"])').forEach((function(c) {
                        Object.keys(c).forEach((function(a) {
                            if (a.includes("__reactEvents") || a.includes("__reactProps")) {
                                a = c[a];
                                try {
                                    a.children?.props?.adSurface?.startsWith("Marketplace") && (c.style = "display: none !important;");
                                } catch (a) {}
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "9201edecacad19e52ef0fb416ec8c902", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9201edecacad19e52ef0fb416ec8c902" due to: ' + error);
        }
    },
    '!function(){if(window.location.href.includes("/marketplace/")){new MutationObserver(function(){document.querySelectorAll(\'div[data-testid="marketplace_home_feed"] div[class][data-testid^="MarketplaceUpsell-"] > div > div\').forEach(function(e){var t=e.outerHTML;t&&void 0!==t&&!0===t.includes("/ads/about/")&&(e.style="display:none!important;")})}).observe(document,{childList:!0,subtree:!0})}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["53a0bb610abe908070c9b157e3ec2214"] === flag) {
                return;
            }
            !function() {
                if (window.location.href.includes("/marketplace/")) {
                    new MutationObserver((function() {
                        document.querySelectorAll('div[data-testid="marketplace_home_feed"] div[class][data-testid^="MarketplaceUpsell-"] > div > div').forEach((function(e) {
                            var t = e.outerHTML;
                            t && void 0 !== t && !0 === t.includes("/ads/about/") && (e.style = "display:none!important;");
                        }));
                    })).observe(document, {
                        childList: !0,
                        subtree: !0
                    });
                }
            }();
            Object.defineProperty(Window.prototype.toString, "53a0bb610abe908070c9b157e3ec2214", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "53a0bb610abe908070c9b157e3ec2214" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"click\"!=a&&-1==b.toString().indexOf('about:blank')&&c(a,b,d,e)}.bind(document);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b178c9ef485593de3d7ea5826bcd32c2"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "click" != a && -1 == b.toString().indexOf("about:blank") && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "b178c9ef485593de3d7ea5826bcd32c2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b178c9ef485593de3d7ea5826bcd32c2" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/Object\\[/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3b230fa3fd4e2e2f5fa5fd1889bef31f"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/Object\[/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "3b230fa3fd4e2e2f5fa5fd1889bef31f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3b230fa3fd4e2e2f5fa5fd1889bef31f" due to: ' + error);
        }
    },
    '(function(){Object.defineProperty(window,"open",{writable:!1,enumerable:!1,configurable:!1,value:window.open})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6ad868fcfeb6310fe49001d70d33c6cc"] === flag) {
                return;
            }
            (function() {
                Object.defineProperty(window, "open", {
                    writable: !1,
                    enumerable: !1,
                    configurable: !1,
                    value: window.open
                });
            })();
            Object.defineProperty(Window.prototype.toString, "6ad868fcfeb6310fe49001d70d33c6cc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6ad868fcfeb6310fe49001d70d33c6cc" due to: ' + error);
        }
    },
    "Object.defineProperty(window, 'sas_manager', { get: function() { return { noad: function() {} }; }, set: function() {} });": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["28fca7a5881cbf189a14d7cdf5e6b931"] === flag) {
                return;
            }
            Object.defineProperty(window, "sas_manager", {
                get: function() {
                    return {
                        noad: function() {}
                    };
                },
                set: function() {}
            });
            Object.defineProperty(Window.prototype.toString, "28fca7a5881cbf189a14d7cdf5e6b931", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "28fca7a5881cbf189a14d7cdf5e6b931" due to: ' + error);
        }
    },
    "(function(){var c=document.addEventListener;document.addEventListener=function(a,b,d,e){\"click\"!=a&&-1==b.toString().indexOf('.hi()')&&c(a,b,d,e)}.bind(document);})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fe0404e371f4ffecdbfb5cb284c5f6a9"] === flag) {
                return;
            }
            (function() {
                var c = document.addEventListener;
                document.addEventListener = function(a, b, d, e) {
                    "click" != a && -1 == b.toString().indexOf(".hi()") && c(a, b, d, e);
                }.bind(document);
            })();
            Object.defineProperty(Window.prototype.toString, "fe0404e371f4ffecdbfb5cb284c5f6a9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fe0404e371f4ffecdbfb5cb284c5f6a9" due to: ' + error);
        }
    },
    "document.addEventListener('DOMContentLoaded', function() { if (window.location.href.indexOf(\"hpinterstitialnew.html\") != -1) { window.setCookie1('sitecapture_interstitial', 1, 1); window.location.href = \"http://www.ndtv.com/\"; } })": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9c145fd1fa9c4877477d33378243415b"] === flag) {
                return;
            }
            document.addEventListener("DOMContentLoaded", (function() {
                if (window.location.href.indexOf("hpinterstitialnew.html") != -1) {
                    window.setCookie1("sitecapture_interstitial", 1, 1);
                    window.location.href = "http://www.ndtv.com/";
                }
            }));
            Object.defineProperty(Window.prototype.toString, "9c145fd1fa9c4877477d33378243415b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9c145fd1fa9c4877477d33378243415b" due to: ' + error);
        }
    },
    "window.exo99HL3903jjdxtrnLoad = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ba561ed0ab3a43ea4e1d5efa8fb5a465"] === flag) {
                return;
            }
            window.exo99HL3903jjdxtrnLoad = true;
            Object.defineProperty(Window.prototype.toString, "ba561ed0ab3a43ea4e1d5efa8fb5a465", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ba561ed0ab3a43ea4e1d5efa8fb5a465" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{ prerollskip(); setTimeout(function() { prerollskip(); }, 100); setTimeout(function() { prerollskip(); }, 300); }));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bea12eedfd9b904b94659dc26fd1e724"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    prerollskip();
                    setTimeout((function() {
                        prerollskip();
                    }), 100);
                    setTimeout((function() {
                        prerollskip();
                    }), 300);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "bea12eedfd9b904b94659dc26fd1e724", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bea12eedfd9b904b94659dc26fd1e724" due to: ' + error);
        }
    },
    "!function(a,b){b=new MutationObserver(function(){a.classList.contains('idle')&&a.classList.remove('idle')}),b.observe(a,{attributes:!0,attributeFilter:['class']})}(document.documentElement);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["58ce3922fa2965f0d4a1f9e3d1857281"] === flag) {
                return;
            }
            !function(a, b) {
                b = new MutationObserver((function() {
                    a.classList.contains("idle") && a.classList.remove("idle");
                })), b.observe(a, {
                    attributes: !0,
                    attributeFilter: [ "class" ]
                });
            }(document.documentElement);
            Object.defineProperty(Window.prototype.toString, "58ce3922fa2965f0d4a1f9e3d1857281", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "58ce3922fa2965f0d4a1f9e3d1857281" due to: ' + error);
        }
    },
    'window["pop_clicked"] = 1;': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7388e0f8018a3f9b99906510f5d32edd"] === flag) {
                return;
            }
            window["pop_clicked"] = 1;
            Object.defineProperty(Window.prototype.toString, "7388e0f8018a3f9b99906510f5d32edd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7388e0f8018a3f9b99906510f5d32edd" due to: ' + error);
        }
    },
    "window.canRunAds = !0;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["34f856bab5f3c1916f563203a5ea7281"] === flag) {
                return;
            }
            window.canRunAds = !0;
            Object.defineProperty(Window.prototype.toString, "34f856bab5f3c1916f563203a5ea7281", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "34f856bab5f3c1916f563203a5ea7281" due to: ' + error);
        }
    },
    "window.myatu_bgm = 0;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cdba7f77c6423f0c201c738bf909c4e8"] === flag) {
                return;
            }
            window.myatu_bgm = 0;
            Object.defineProperty(Window.prototype.toString, "cdba7f77c6423f0c201c738bf909c4e8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cdba7f77c6423f0c201c738bf909c4e8" due to: ' + error);
        }
    },
    "window.runad = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["958f02264ba3a90c77c6ba0c98ad72ce"] === flag) {
                return;
            }
            window.runad = function() {};
            Object.defineProperty(Window.prototype.toString, "958f02264ba3a90c77c6ba0c98ad72ce", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "958f02264ba3a90c77c6ba0c98ad72ce" due to: ' + error);
        }
    },
    "setTimeout(function() { window.show_popup=false; window.download_inited = true; }, 300);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dc40c845363864583b847cd52bfc4bd3"] === flag) {
                return;
            }
            setTimeout((function() {
                window.show_popup = false;
                window.download_inited = true;
            }), 300);
            Object.defineProperty(Window.prototype.toString, "dc40c845363864583b847cd52bfc4bd3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dc40c845363864583b847cd52bfc4bd3" due to: ' + error);
        }
    },
    "function setOverlayHTML() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cc37d89d454cab3a16143f6e2ea4a4f3"] === flag) {
                return;
            }
            function setOverlayHTML() {}
            Object.defineProperty(Window.prototype.toString, "cc37d89d454cab3a16143f6e2ea4a4f3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cc37d89d454cab3a16143f6e2ea4a4f3" due to: ' + error);
        }
    },
    "function setOverlayHTML_new() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["085c413105051fb148c3d7a6bf82b5c3"] === flag) {
                return;
            }
            function setOverlayHTML_new() {}
            Object.defineProperty(Window.prototype.toString, "085c413105051fb148c3d7a6bf82b5c3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "085c413105051fb148c3d7a6bf82b5c3" due to: ' + error);
        }
    },
    "setTimeout(removeOverlayHTML, 2000);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b94a9a08e8bfdbb7535bd54ba79a2610"] === flag) {
                return;
            }
            setTimeout(removeOverlayHTML, 2e3);
            Object.defineProperty(Window.prototype.toString, "b94a9a08e8bfdbb7535bd54ba79a2610", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b94a9a08e8bfdbb7535bd54ba79a2610" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,o)=>{try{o[0].src?.includes?.("html-load.com")&&(o[0]=document.createElement("script"))}catch(e){}return Reflect.apply(e,t,o)}};window.Node.prototype.insertBefore=new Proxy(window.Node.prototype.insertBefore,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ed57bbfd824aa9ad074678e5893c0dfa"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, o) => {
                        try {
                            o[0].src?.includes?.("html-load.com") && (o[0] = document.createElement("script"));
                        } catch (e) {}
                        return Reflect.apply(e, t, o);
                    }
                };
                window.Node.prototype.insertBefore = new Proxy(window.Node.prototype.insertBefore, e);
            })();
            Object.defineProperty(Window.prototype.toString, "ed57bbfd824aa9ad074678e5893c0dfa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ed57bbfd824aa9ad074678e5893c0dfa" due to: ' + error);
        }
    },
    '(()=>{const t=/^\\(\\s*\\.\\.\\.\\s*([A-Za-z_$][\\w$]*)\\s*\\)\\s*=>\\s*[A-Za-z_$][\\w$]*\\s*\\.\\s*apply\\s*\\(\\s*this\\s*,\\s*\\1\\s*\\)\\s*$/,e=["requestAnimationFrame","requestIdleCallback","setInterval","setTimeout"],r=/html-load\\.com|loader\\.min\\.js|andwonderful\\.com\\/safe\\.min\\.js|shieldload\\.|:\\/\\/loader\\.|core\\.js|\\/sdk\\.js|\\/app\\.js|\\/main\\.js|\\/vendor\\.js|\\/bundle\\.js|(?:whoinasmuch|assuredwhoa|contentyet)\\.com|\\/(?:routes|output|framework|shared)\\/.*\\.js/,o={apply:Reflect.apply,construct:Reflect.construct,filter:Array.prototype.filter,every:Array.prototype.every,some:Array.prototype.some,isArray:Array.isArray,getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor,includes:String.prototype.includes,regexTest:RegExp.prototype.test,functionToString:Function.prototype.toString,queueMicrotask:window.queueMicrotask},s=new Set,n=()=>o.apply(o.regexTest,r,[(new Error).stack]),p={construct:(t,e,r)=>{let p=!1;try{const[t,r]=e,s=r&&"object"==typeof r?o.getOwnPropertyDescriptor(r,"type")?.value:void 0;("application/javascript"===s||"text/javascript"===s)&&o.isArray(t)&&o.apply(o.every,t,[t=>"string"==typeof t])&&o.apply(o.some,t,[t=>o.apply(o.includes,t,["adshield"])])&&n()&&(e[0]=["(function(){})();"],p=!0)}catch(t){}const a=o.construct(t,e,r);if(p)try{(()=>{const t={};o.apply(o.queueMicrotask,window,[()=>s.delete(t)]),s.add(t)})()}catch(t){}return a}};window.Blob=new Proxy(window.Blob,p);const a={apply:(e,r,p)=>{const a=s.values().next().value;s.delete(a);try{const[e,r]=p;if(a&&"number"==typeof r&&r>=4900&&r<5100){const r="function"==typeof e?o.apply(o.functionToString,e,[]):"string"==typeof e?e:"";(o.apply(o.includes,r,["new Error"])||"function"==typeof e&&o.apply(o.regexTest,t,[r]))&&n()&&(p[0]=()=>{})}}catch(t){}return o.apply(e,r,p)}};window.setTimeout=new Proxy(window.setTimeout,a);const i={apply:(t,r,s)=>{try{"function"==typeof s[0]&&o.isArray(r)&&r.length===e.length&&o.apply(o.every,e,[(t,e)=>r[e]===t])&&n()&&(r=o.apply(o.filter,r,[t=>"setTimeout"!==t]))}catch(t){}return o.apply(t,r,s)}};window.Array.prototype.filter=new Proxy(window.Array.prototype.filter,i)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["073231125b22e78bb6ffc2a5c74693ec"] === flag) {
                return;
            }
            (() => {
                const t = /^\(\s*\.\.\.\s*([A-Za-z_$][\w$]*)\s*\)\s*=>\s*[A-Za-z_$][\w$]*\s*\.\s*apply\s*\(\s*this\s*,\s*\1\s*\)\s*$/, e = [ "requestAnimationFrame", "requestIdleCallback", "setInterval", "setTimeout" ], r = /html-load\.com|loader\.min\.js|andwonderful\.com\/safe\.min\.js|shieldload\.|:\/\/loader\.|core\.js|\/sdk\.js|\/app\.js|\/main\.js|\/vendor\.js|\/bundle\.js|(?:whoinasmuch|assuredwhoa|contentyet)\.com|\/(?:routes|output|framework|shared)\/.*\.js/, o = {
                    apply: Reflect.apply,
                    construct: Reflect.construct,
                    filter: Array.prototype.filter,
                    every: Array.prototype.every,
                    some: Array.prototype.some,
                    isArray: Array.isArray,
                    getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
                    includes: String.prototype.includes,
                    regexTest: RegExp.prototype.test,
                    functionToString: Function.prototype.toString,
                    queueMicrotask: window.queueMicrotask
                }, s = new Set, n = () => o.apply(o.regexTest, r, [ (new Error).stack ]), p = {
                    construct: (t, e, r) => {
                        let p = !1;
                        try {
                            const [t, r] = e, s = r && "object" == typeof r ? o.getOwnPropertyDescriptor(r, "type")?.value : void 0;
                            ("application/javascript" === s || "text/javascript" === s) && o.isArray(t) && o.apply(o.every, t, [ t => "string" == typeof t ]) && o.apply(o.some, t, [ t => o.apply(o.includes, t, [ "adshield" ]) ]) && n() && (e[0] = [ "(function(){})();" ], 
                            p = !0);
                        } catch (t) {}
                        const a = o.construct(t, e, r);
                        if (p) try {
                            (() => {
                                const t = {};
                                o.apply(o.queueMicrotask, window, [ () => s.delete(t) ]), s.add(t);
                            })();
                        } catch (t) {}
                        return a;
                    }
                };
                window.Blob = new Proxy(window.Blob, p);
                const a = {
                    apply: (e, r, p) => {
                        const a = s.values().next().value;
                        s.delete(a);
                        try {
                            const [e, r] = p;
                            if (a && "number" == typeof r && r >= 4900 && r < 5100) {
                                const r = "function" == typeof e ? o.apply(o.functionToString, e, []) : "string" == typeof e ? e : "";
                                (o.apply(o.includes, r, [ "new Error" ]) || "function" == typeof e && o.apply(o.regexTest, t, [ r ])) && n() && (p[0] = () => {});
                            }
                        } catch (t) {}
                        return o.apply(e, r, p);
                    }
                };
                window.setTimeout = new Proxy(window.setTimeout, a);
                const i = {
                    apply: (t, r, s) => {
                        try {
                            "function" == typeof s[0] && o.isArray(r) && r.length === e.length && o.apply(o.every, e, [ (t, e) => r[e] === t ]) && n() && (r = o.apply(o.filter, r, [ t => "setTimeout" !== t ]));
                        } catch (t) {}
                        return o.apply(t, r, s);
                    }
                };
                window.Array.prototype.filter = new Proxy(window.Array.prototype.filter, i);
            })();
            Object.defineProperty(Window.prototype.toString, "073231125b22e78bb6ffc2a5c74693ec", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "073231125b22e78bb6ffc2a5c74693ec" due to: ' + error);
        }
    },
    '(()=>{const t=/^\\(\\s*\\.\\.\\.\\s*([A-Za-z_$][\\w$]*)\\s*\\)\\s*=>\\s*[A-Za-z_$][\\w$]*\\s*\\.\\s*apply\\s*\\(\\s*this\\s*,\\s*\\1\\s*\\)\\s*$/,e=["requestAnimationFrame","requestIdleCallback","setInterval","setTimeout"],r={apply:Reflect.apply,construct:Reflect.construct,filter:Array.prototype.filter,every:Array.prototype.every,some:Array.prototype.some,isArray:Array.isArray,getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor,includes:String.prototype.includes,regexTest:RegExp.prototype.test,functionToString:Function.prototype.toString,queueMicrotask:window.queueMicrotask},o=new Set,p={construct:(t,e,p)=>{let n=!1;try{const[t,o]=e,p=o&&"object"==typeof o?r.getOwnPropertyDescriptor(o,"type")?.value:void 0;("application/javascript"===p||"text/javascript"===p)&&r.isArray(t)&&r.apply(r.every,t,[t=>"string"==typeof t])&&r.apply(r.some,t,[t=>r.apply(r.includes,t,["adshield"])])&&(e[0]=["(function(){})();"],n=!0)}catch(t){}const s=r.construct(t,e,p);if(n)try{(()=>{const t={};r.apply(r.queueMicrotask,window,[()=>o.delete(t)]),o.add(t)})()}catch(t){}return s}};window.Blob=new Proxy(window.Blob,p);const n={apply:(e,p,n)=>{const s=o.values().next().value;o.delete(s);try{const[e,o]=n;if(s&&"number"==typeof o&&o>=4900&&o<5100){const o="function"==typeof e?r.apply(r.functionToString,e,[]):"string"==typeof e?e:"";(r.apply(r.includes,o,["new Error"])||"function"==typeof e&&r.apply(r.regexTest,t,[o]))&&(n[0]=()=>{})}}catch(t){}return r.apply(e,p,n)}};window.setTimeout=new Proxy(window.setTimeout,n);const s={apply:(t,o,p)=>{try{"function"==typeof p[0]&&r.isArray(o)&&o.length===e.length&&r.apply(r.every,e,[(t,e)=>o[e]===t])&&(o=r.apply(r.filter,o,[t=>"setTimeout"!==t]))}catch(t){}return r.apply(t,o,p)}};window.Array.prototype.filter=new Proxy(window.Array.prototype.filter,s)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["32e32e5afa8d8b01260446c0b3620e77"] === flag) {
                return;
            }
            (() => {
                const t = /^\(\s*\.\.\.\s*([A-Za-z_$][\w$]*)\s*\)\s*=>\s*[A-Za-z_$][\w$]*\s*\.\s*apply\s*\(\s*this\s*,\s*\1\s*\)\s*$/, e = [ "requestAnimationFrame", "requestIdleCallback", "setInterval", "setTimeout" ], r = {
                    apply: Reflect.apply,
                    construct: Reflect.construct,
                    filter: Array.prototype.filter,
                    every: Array.prototype.every,
                    some: Array.prototype.some,
                    isArray: Array.isArray,
                    getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
                    includes: String.prototype.includes,
                    regexTest: RegExp.prototype.test,
                    functionToString: Function.prototype.toString,
                    queueMicrotask: window.queueMicrotask
                }, o = new Set, p = {
                    construct: (t, e, p) => {
                        let n = !1;
                        try {
                            const [t, o] = e, p = o && "object" == typeof o ? r.getOwnPropertyDescriptor(o, "type")?.value : void 0;
                            ("application/javascript" === p || "text/javascript" === p) && r.isArray(t) && r.apply(r.every, t, [ t => "string" == typeof t ]) && r.apply(r.some, t, [ t => r.apply(r.includes, t, [ "adshield" ]) ]) && (e[0] = [ "(function(){})();" ], 
                            n = !0);
                        } catch (t) {}
                        const s = r.construct(t, e, p);
                        if (n) try {
                            (() => {
                                const t = {};
                                r.apply(r.queueMicrotask, window, [ () => o.delete(t) ]), o.add(t);
                            })();
                        } catch (t) {}
                        return s;
                    }
                };
                window.Blob = new Proxy(window.Blob, p);
                const n = {
                    apply: (e, p, n) => {
                        const s = o.values().next().value;
                        o.delete(s);
                        try {
                            const [e, o] = n;
                            if (s && "number" == typeof o && o >= 4900 && o < 5100) {
                                const o = "function" == typeof e ? r.apply(r.functionToString, e, []) : "string" == typeof e ? e : "";
                                (r.apply(r.includes, o, [ "new Error" ]) || "function" == typeof e && r.apply(r.regexTest, t, [ o ])) && (n[0] = () => {});
                            }
                        } catch (t) {}
                        return r.apply(e, p, n);
                    }
                };
                window.setTimeout = new Proxy(window.setTimeout, n);
                const s = {
                    apply: (t, o, p) => {
                        try {
                            "function" == typeof p[0] && r.isArray(o) && o.length === e.length && r.apply(r.every, e, [ (t, e) => o[e] === t ]) && (o = r.apply(r.filter, o, [ t => "setTimeout" !== t ]));
                        } catch (t) {}
                        return r.apply(t, o, p);
                    }
                };
                window.Array.prototype.filter = new Proxy(window.Array.prototype.filter, s);
            })();
            Object.defineProperty(Window.prototype.toString, "32e32e5afa8d8b01260446c0b3620e77", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "32e32e5afa8d8b01260446c0b3620e77" due to: ' + error);
        }
    },
    '(()=>{const A={apply:(A,B,Q)=>{try{const A=Q[0];A&&A._uri&&A._uri.startsWith("spotify:ad:")&&A._url&&(A._url="data:video/mp4;base64,AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw")}catch(A){}return Reflect.apply(A,B,Q)}},B={apply:(B,Q,X)=>{try{const B=X[0]?.toString?.();B?.includes("this._getCacheKey")&&(X[0]=new Proxy(X[0],A))}catch(A){}return Reflect.apply(B,Q,X)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,B)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["03d84ff2ff86b8c8fdacb1bde4ca448a"] === flag) {
                return;
            }
            (() => {
                const A = {
                    apply: (A, B, Q) => {
                        try {
                            const A = Q[0];
                            A && A._uri && A._uri.startsWith("spotify:ad:") && A._url && (A._url = "data:video/mp4;base64,AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw");
                        } catch (A) {}
                        return Reflect.apply(A, B, Q);
                    }
                }, B = {
                    apply: (B, Q, X) => {
                        try {
                            const B = X[0]?.toString?.();
                            B?.includes("this._getCacheKey") && (X[0] = new Proxy(X[0], A));
                        } catch (A) {}
                        return Reflect.apply(B, Q, X);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, B);
            })();
            Object.defineProperty(Window.prototype.toString, "03d84ff2ff86b8c8fdacb1bde4ca448a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "03d84ff2ff86b8c8fdacb1bde4ca448a" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,o,n)=>{const e=n[0];return"function"==typeof e&&e.toString().includes("onAbnormalityDetected")&&(n[0]=function(){}),Reflect.apply(t,o,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b149f5f8f73c8f7b2b21d20e1538bea4"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, o, n) => {
                        const e = n[0];
                        return "function" == typeof e && e.toString().includes("onAbnormalityDetected") && (n[0] = function() {}), 
                        Reflect.apply(t, o, n);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, t);
            })();
            Object.defineProperty(Window.prototype.toString, "b149f5f8f73c8f7b2b21d20e1538bea4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b149f5f8f73c8f7b2b21d20e1538bea4" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,n)=>{const o=Reflect.apply(e,t,n);try{o instanceof HTMLIFrameElement&&"about:blank"===o.src&&o.contentWindow&&(o.contentWindow.fetch=window.fetch,o.contentWindow.Request=window.Request)}catch(e){}return o}};Node.prototype.appendChild=new Proxy(Node.prototype.appendChild,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b2938935474adeb9fa9f991bc00ad666"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, n) => {
                        const o = Reflect.apply(e, t, n);
                        try {
                            o instanceof HTMLIFrameElement && "about:blank" === o.src && o.contentWindow && (o.contentWindow.fetch = window.fetch, 
                            o.contentWindow.Request = window.Request);
                        } catch (e) {}
                        return o;
                    }
                };
                Node.prototype.appendChild = new Proxy(Node.prototype.appendChild, e);
            })();
            Object.defineProperty(Window.prototype.toString, "b2938935474adeb9fa9f991bc00ad666", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b2938935474adeb9fa9f991bc00ad666" due to: ' + error);
        }
    },
    '(()=>{let t=document.location.href,e=[],n=[],o="",r=!1;const i=Array.prototype.push,a={apply:(t,o,a)=>(window.yt?.config_?.EXPERIMENT_FLAGS?.html5_enable_ssap_entity_id&&a[0]&&a[0]!==window&&"number"==typeof a[0].start&&a[0].end&&"ssap"===a[0].namespace&&a[0].id&&(r||0!==a[0]?.start||n.includes(a[0].id)||(e.length=0,n.length=0,r=!0,i.call(e,a[0]),i.call(n,a[0].id)),r&&0!==a[0]?.start&&!n.includes(a[0].id)&&(i.call(e,a[0]),i.call(n,a[0].id))),Reflect.apply(t,o,a))};window.Array.prototype.push=new Proxy(window.Array.prototype.push,a),document.addEventListener("DOMContentLoaded",(function(){if(!window.yt?.config_?.EXPERIMENT_FLAGS?.html5_enable_ssap_entity_id)return;const i=()=>{const t=document.querySelector("video");if(t&&e.length){const i=Math.round(t.duration),a=Math.round(e.at(-1).end/1e3),c=n.join(",");if(!1===t.loop&&o!==c&&i&&i===a){const n=e.at(-1).start/1e3;t.currentTime<n&&(t.currentTime=n,r=!1,o=c)}else if(!0===t.loop&&i&&i===a){const n=e.at(-1).start/1e3;t.currentTime<n&&(t.currentTime=n,r=!1,o=c)}}};i();new MutationObserver((()=>{t!==document.location.href&&(t=document.location.href,e.length=0,n.length=0,r=!1),i()})).observe(document,{childList:!0,subtree:!0})}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ae4fa77cc5169989696ccbb4288099b4"] === flag) {
                return;
            }
            (() => {
                let t = document.location.href, e = [], n = [], o = "", r = !1;
                const i = Array.prototype.push, a = {
                    apply: (t, o, a) => (window.yt?.config_?.EXPERIMENT_FLAGS?.html5_enable_ssap_entity_id && a[0] && a[0] !== window && "number" == typeof a[0].start && a[0].end && "ssap" === a[0].namespace && a[0].id && (r || 0 !== a[0]?.start || n.includes(a[0].id) || (e.length = 0, 
                    n.length = 0, r = !0, i.call(e, a[0]), i.call(n, a[0].id)), r && 0 !== a[0]?.start && !n.includes(a[0].id) && (i.call(e, a[0]), 
                    i.call(n, a[0].id))), Reflect.apply(t, o, a))
                };
                window.Array.prototype.push = new Proxy(window.Array.prototype.push, a), document.addEventListener("DOMContentLoaded", (function() {
                    if (!window.yt?.config_?.EXPERIMENT_FLAGS?.html5_enable_ssap_entity_id) return;
                    const i = () => {
                        const t = document.querySelector("video");
                        if (t && e.length) {
                            const i = Math.round(t.duration), a = Math.round(e.at(-1).end / 1e3), c = n.join(",");
                            if (!1 === t.loop && o !== c && i && i === a) {
                                const n = e.at(-1).start / 1e3;
                                t.currentTime < n && (t.currentTime = n, r = !1, o = c);
                            } else if (!0 === t.loop && i && i === a) {
                                const n = e.at(-1).start / 1e3;
                                t.currentTime < n && (t.currentTime = n, r = !1, o = c);
                            }
                        }
                    };
                    i();
                    new MutationObserver((() => {
                        t !== document.location.href && (t = document.location.href, e.length = 0, n.length = 0, 
                        r = !1), i();
                    })).observe(document, {
                        childList: !0,
                        subtree: !0
                    });
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "ae4fa77cc5169989696ccbb4288099b4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ae4fa77cc5169989696ccbb4288099b4" due to: ' + error);
        }
    },
    '(()=>{const e="pyv",t="param_first",a="param_second",n="client_screen",c="ad_type",o="none",r="eAFgAQ",l="8AUB",i="YAHI",s="CHANNEL",y=t;let p=y,u=null;const d=Object.getOwnPropertyDescriptor(Document.prototype,"visibilityState"),b=()=>{try{Object.defineProperty(document,"visibilityState",{get:()=>"visible",configurable:!0})}catch(e){}},m=window.JSON.stringify,f=e=>{p=e};(()=>{try{const e=Object.getOwnPropertyDescriptor(window.JSON,"parse");return!!e&&e.writable}catch(e){return!1}})()||((()=>{const e={apply:(e,t,a)=>{try{const e=t;e?.includes(\'"minimumPlaybackRate":100,"maximumPlaybackRate":100\')&&(t=e.replace(\'"minimumPlaybackRate":100,"maximumPlaybackRate":100\',\'"minimumPlaybackRate":25,"maximumPlaybackRate":200\'))}catch(e){}return Reflect.apply(e,t,a)}};window.String.prototype.replace=new Proxy(window.String.prototype.replace,e)})(),f(n));const x=e=>{(e.playbackContext||e.playerRequest)&&delete e.context?.client?.configInfo?.appInstallData},C=(p,m,C)=>{try{if(!p||!m||!C)return;(e=>{const t=e?.videoId;t&&(u&&u!==t&&f(y),u=t)})(p);const R=document.getElementById("movie_player")?.getPlayerResponse()?.playabilityStatus?.status;if("LOGIN_REQUIRED"!==R&&"CONTENT_CHECK_REQUIRED"!==R||(C=o),C===t&&p.context?.client?.clientScreen!==s&&!p.params?.startsWith(i))return p.params=r,p.playerRequest&&p.playerRequest.params!==r&&(p.playerRequest.params=r),p.playbackContext&&p.playbackContext.params!==r&&(p.playbackContext.params=r),m.contentPlaybackContext.lactMilliseconds=String(Date.now()),b(),void x(p);if(C===a&&p.context?.client?.clientScreen!==s&&!p.params?.startsWith(i))return p.params!==l&&(p.params=l),p.playerRequest&&p.playerRequest.params!==l&&(p.playerRequest.params=l),p.playbackContext&&p.playbackContext.params!==l&&(p.playbackContext.params=l),p.playlistId||(p.context.client.clientScreen=s),m.contentPlaybackContext.lactMilliseconds=String(Date.now()),b(),void x(p);if(!(C!==e||p.context?.client?.clientScreen===s||m.params?.startsWith(r)&&m.params?.startsWith(l)))return m.adPlaybackContext={pyv:!0},m.contentPlaybackContext.lactMilliseconds=String(Date.now()),void x(p);if(C===n&&"WEB"===p.context?.client?.clientName)return p.context.client.clientScreen=s,m.contentPlaybackContext.lactMilliseconds=String(Date.now()),b(),void x(p);if(C===c)return m.adPlaybackContext={adType:"AD_TYPE_INSTREAM"},m.contentPlaybackContext.lactMilliseconds=String(Date.now()),b(),void x(p);if(C===o)return delete m.adPlaybackContext,void(()=>{try{Object.defineProperty(document,"visibilityState",d)}catch(e){}})()}catch(e){}},R=["playerErrorMessageRenderer","UNPLAYABLE"],k={apply:(r,l,i)=>{if(location.href.includes("/shorts/")||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/")||p===o)return Reflect.apply(r,l,i);let s;try{if(s=Reflect.apply(r,l,i),!s.responseContext&&!s.playabilityStatus)return s;const y=m(s);return R.some((e=>y.includes(e)))&&!y.includes("CONTENT_CHECK_REQUIRED")?p===t?(f(a),s):p===a?(f(e),s):p===e?(f(n),s):p===n?(f(c),s):(f(o),s):(p===t&&s.playerConfig?.audioConfig?.muteOnStart&&(location.href.includes("/watch")||s.cards&&!s.playabilityStatus?.miniplayer)&&(delete s.playerConfig.audioConfig.muteOnStart,s.messages?.[0]?.youThereRenderer&&delete s.messages[0].youThereRenderer),p===c&&s.playerConfig?.granularVariableSpeedConfig&&(s.playerConfig.granularVariableSpeedConfig.maximumPlaybackRate=200,s.playerConfig.granularVariableSpeedConfig.minimumPlaybackRate=25),s)}catch(e){}return Reflect.apply(r,l,i)}};window.JSON.parse=new Proxy(window.JSON.parse,k);const w={apply:(e,t,a)=>{if(location.href.includes("/shorts/")||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/"))return Reflect.apply(e,t,a);try{let n=a[0];if(n&&(n.includes(\'"contentPlaybackContext"\')||n.includes(\'"adSignalsInfo"\'))){const c=JSON.parse(n);if(!c.context?.client)return Reflect.apply(e,t,a);c.playbackContext&&C(c,c.playbackContext,p),c.playerRequest&&C(c,c.playerRequest.playbackContext,p),n=m(c),a[0]=n}}catch(e){}return Reflect.apply(e,t,a)}};window.TextEncoder.prototype.encode=new Proxy(window.TextEncoder.prototype.encode,w);const g={apply:(e,t,a)=>{if(location.href.includes("/shorts/")||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/"))return Reflect.apply(e,t,a);try{const n=a[0];if(!n?.context?.client)return Reflect.apply(e,t,a);n.playbackContext&&void 0===n.playbackContext.adPlaybackContext&&C(n,n.playbackContext,p),n.playerRequest&&void 0===n.playerRequest.playbackContext.adPlaybackContext&&C(n,n.playerRequest.playbackContext,p),a[0]=n}catch(e){}return Reflect.apply(e,t,a)}};window.JSON.stringify=new Proxy(window.JSON.stringify,g);const S={construct:(e,t,a)=>{try{const n=t[0];let c=t[1]?.body;if(!n?.includes("youtubei")||location.href.includes("/shorts/")||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/")||!c)return Reflect.construct(e,t,a);if(c.includes(\'"contentPlaybackContext"\')||c.includes(\'"adSignalsInfo"\')){const n=JSON.parse(c);if(!n.context?.client)return Reflect.construct(e,t,a);n.playbackContext&&C(n,n.playbackContext,p),n.playerRequest&&C(n,n.playerRequest.playbackContext,p),c=m(n),t[1].body=c}}catch(e){}return Reflect.construct(e,t,a)}};window.Request=new Proxy(window.Request,S)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["44880ffb9eb9254b1d06b92aaa4a78d0"] === flag) {
                return;
            }
            (() => {
                const e = "pyv", t = "param_first", a = "param_second", n = "client_screen", c = "ad_type", o = "none", r = "eAFgAQ", l = "8AUB", i = "YAHI", s = "CHANNEL", y = t;
                let p = y, u = null;
                const d = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState"), b = () => {
                    try {
                        Object.defineProperty(document, "visibilityState", {
                            get: () => "visible",
                            configurable: !0
                        });
                    } catch (e) {}
                }, m = window.JSON.stringify, f = e => {
                    p = e;
                };
                (() => {
                    try {
                        const e = Object.getOwnPropertyDescriptor(window.JSON, "parse");
                        return !!e && e.writable;
                    } catch (e) {
                        return !1;
                    }
                })() || ((() => {
                    const e = {
                        apply: (e, t, a) => {
                            try {
                                const e = t;
                                e?.includes('"minimumPlaybackRate":100,"maximumPlaybackRate":100') && (t = e.replace('"minimumPlaybackRate":100,"maximumPlaybackRate":100', '"minimumPlaybackRate":25,"maximumPlaybackRate":200'));
                            } catch (e) {}
                            return Reflect.apply(e, t, a);
                        }
                    };
                    window.String.prototype.replace = new Proxy(window.String.prototype.replace, e);
                })(), f(n));
                const x = e => {
                    (e.playbackContext || e.playerRequest) && delete e.context?.client?.configInfo?.appInstallData;
                }, C = (p, m, C) => {
                    try {
                        if (!p || !m || !C) return;
                        (e => {
                            const t = e?.videoId;
                            t && (u && u !== t && f(y), u = t);
                        })(p);
                        const R = document.getElementById("movie_player")?.getPlayerResponse()?.playabilityStatus?.status;
                        if ("LOGIN_REQUIRED" !== R && "CONTENT_CHECK_REQUIRED" !== R || (C = o), C === t && p.context?.client?.clientScreen !== s && !p.params?.startsWith(i)) return p.params = r, 
                        p.playerRequest && p.playerRequest.params !== r && (p.playerRequest.params = r), 
                        p.playbackContext && p.playbackContext.params !== r && (p.playbackContext.params = r), 
                        m.contentPlaybackContext.lactMilliseconds = String(Date.now()), b(), void x(p);
                        if (C === a && p.context?.client?.clientScreen !== s && !p.params?.startsWith(i)) return p.params !== l && (p.params = l), 
                        p.playerRequest && p.playerRequest.params !== l && (p.playerRequest.params = l), 
                        p.playbackContext && p.playbackContext.params !== l && (p.playbackContext.params = l), 
                        p.playlistId || (p.context.client.clientScreen = s), m.contentPlaybackContext.lactMilliseconds = String(Date.now()), 
                        b(), void x(p);
                        if (!(C !== e || p.context?.client?.clientScreen === s || m.params?.startsWith(r) && m.params?.startsWith(l))) return m.adPlaybackContext = {
                            pyv: !0
                        }, m.contentPlaybackContext.lactMilliseconds = String(Date.now()), void x(p);
                        if (C === n && "WEB" === p.context?.client?.clientName) return p.context.client.clientScreen = s, 
                        m.contentPlaybackContext.lactMilliseconds = String(Date.now()), b(), void x(p);
                        if (C === c) return m.adPlaybackContext = {
                            adType: "AD_TYPE_INSTREAM"
                        }, m.contentPlaybackContext.lactMilliseconds = String(Date.now()), b(), void x(p);
                        if (C === o) return delete m.adPlaybackContext, void (() => {
                            try {
                                Object.defineProperty(document, "visibilityState", d);
                            } catch (e) {}
                        })();
                    } catch (e) {}
                }, R = [ "playerErrorMessageRenderer", "UNPLAYABLE" ], k = {
                    apply: (r, l, i) => {
                        if (location.href.includes("/shorts/") || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/") || p === o) return Reflect.apply(r, l, i);
                        let s;
                        try {
                            if (s = Reflect.apply(r, l, i), !s.responseContext && !s.playabilityStatus) return s;
                            const y = m(s);
                            return R.some((e => y.includes(e))) && !y.includes("CONTENT_CHECK_REQUIRED") ? p === t ? (f(a), 
                            s) : p === a ? (f(e), s) : p === e ? (f(n), s) : p === n ? (f(c), s) : (f(o), s) : (p === t && s.playerConfig?.audioConfig?.muteOnStart && (location.href.includes("/watch") || s.cards && !s.playabilityStatus?.miniplayer) && (delete s.playerConfig.audioConfig.muteOnStart, 
                            s.messages?.[0]?.youThereRenderer && delete s.messages[0].youThereRenderer), p === c && s.playerConfig?.granularVariableSpeedConfig && (s.playerConfig.granularVariableSpeedConfig.maximumPlaybackRate = 200, 
                            s.playerConfig.granularVariableSpeedConfig.minimumPlaybackRate = 25), s);
                        } catch (e) {}
                        return Reflect.apply(r, l, i);
                    }
                };
                window.JSON.parse = new Proxy(window.JSON.parse, k);
                const w = {
                    apply: (e, t, a) => {
                        if (location.href.includes("/shorts/") || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/")) return Reflect.apply(e, t, a);
                        try {
                            let n = a[0];
                            if (n && (n.includes('"contentPlaybackContext"') || n.includes('"adSignalsInfo"'))) {
                                const c = JSON.parse(n);
                                if (!c.context?.client) return Reflect.apply(e, t, a);
                                c.playbackContext && C(c, c.playbackContext, p), c.playerRequest && C(c, c.playerRequest.playbackContext, p), 
                                n = m(c), a[0] = n;
                            }
                        } catch (e) {}
                        return Reflect.apply(e, t, a);
                    }
                };
                window.TextEncoder.prototype.encode = new Proxy(window.TextEncoder.prototype.encode, w);
                const g = {
                    apply: (e, t, a) => {
                        if (location.href.includes("/shorts/") || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/")) return Reflect.apply(e, t, a);
                        try {
                            const n = a[0];
                            if (!n?.context?.client) return Reflect.apply(e, t, a);
                            n.playbackContext && void 0 === n.playbackContext.adPlaybackContext && C(n, n.playbackContext, p), 
                            n.playerRequest && void 0 === n.playerRequest.playbackContext.adPlaybackContext && C(n, n.playerRequest.playbackContext, p), 
                            a[0] = n;
                        } catch (e) {}
                        return Reflect.apply(e, t, a);
                    }
                };
                window.JSON.stringify = new Proxy(window.JSON.stringify, g);
                const S = {
                    construct: (e, t, a) => {
                        try {
                            const n = t[0];
                            let c = t[1]?.body;
                            if (!n?.includes("youtubei") || location.href.includes("/shorts/") || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/") || !c) return Reflect.construct(e, t, a);
                            if (c.includes('"contentPlaybackContext"') || c.includes('"adSignalsInfo"')) {
                                const n = JSON.parse(c);
                                if (!n.context?.client) return Reflect.construct(e, t, a);
                                n.playbackContext && C(n, n.playbackContext, p), n.playerRequest && C(n, n.playerRequest.playbackContext, p), 
                                c = m(n), t[1].body = c;
                            }
                        } catch (e) {}
                        return Reflect.construct(e, t, a);
                    }
                };
                window.Request = new Proxy(window.Request, S);
            })();
            Object.defineProperty(Window.prototype.toString, "44880ffb9eb9254b1d06b92aaa4a78d0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "44880ffb9eb9254b1d06b92aaa4a78d0" due to: ' + error);
        }
    },
    '(()=>{const e="movie_player",t="ytd-watch-flexy[player-unavailable]",r=`#${e} > .ytp-error`,n="yt-playability-error-supported-renderers#error-screen:has(>*)",a=\'yt-playability-error-supported-renderers#error-screen a[href^="//support.google.com/youtube/answer/2802245"]\',o="LOGIN_REQUIRED",i="CONTENT_CHECK_REQUIRED",l="pyv",c="param_first",s="param_second",y="client_screen",p="ad_type",d="none",u="eAFgAQ",m="8AUB",f="YAHI",b="CHANNEL",S=c;let v=S,x=null;const g=new Set,C=()=>{const t=document.getElementById(e),r=window.location.search,n=new URLSearchParams(r).get("v")||t?.getVideoData?.().video_id,a=new URLSearchParams(r).get("t")??"0";return{videoId:n,timeInSeconds:parseInt(a,10)}},R=()=>{q();const t=document.getElementById(e);if(t&&"function"==typeof t.loadVideoById)try{const{videoId:e,timeInSeconds:r}=C();t.loadVideoById(e,r)}catch(e){}},I=(()=>{let e=null,t=null,r=0;return n=>{try{if(!n)return!1;const{videoId:a}=C();return!!a&&(e===a&&t===n?r++:(e=a,t=n,r=1),r>=2&&(r=0,!0))}catch(e){return!1}}})(),P=e=>{v=e},h=Object.getOwnPropertyDescriptor(Document.prototype,"visibilityState"),k=()=>{try{Object.defineProperty(document,"visibilityState",{get:()=>"visible",configurable:!0})}catch(e){}},q=()=>{const r=document.getElementById(e),l=document.querySelector(n),c=document.querySelector("yt-playability-error-supported-renderers.ytdMiniplayerPlayerContainerPlayabilityError:has(>*)"),s=document.querySelector(t),y=document.querySelector(a);if(!r||y)return;const p=r.getPlayerResponse?.();p?.playabilityStatus?.status!==o&&p?.playabilityStatus?.status!==i?(s||c)&&(l?.style.setProperty("display","none","important"),c?.style.setProperty("display","none","important"),s?.removeAttribute("player-unavailable")):l?.style.setProperty("display","block","important")},w=e=>{(e.playbackContext||e.playerRequest)&&delete e.context?.client?.configInfo?.appInstallData},E=(e,t,r)=>{try{if(!e||!t||!r)return;if((e=>{const t=e?.videoId;t&&(x&&x!==t&&P(S),x=t)})(e),r===c&&e.context?.client?.clientScreen!==b&&!e.params?.startsWith(f))return e.params=u,e.playerRequest&&e.playerRequest.params!==u&&(e.playerRequest.params=u),e.playbackContext&&e.playbackContext.params!==u&&(e.playbackContext.params=u),t.contentPlaybackContext.lactMilliseconds=String(Date.now()),k(),void w(e);if(r===s&&e.context?.client?.clientScreen!==b&&!e.params?.startsWith(f))return e.params!==m&&(e.params=m),e.playerRequest&&e.playerRequest.params!==m&&(e.playerRequest.params=m),e.playbackContext&&e.playbackContext.params!==m&&(e.playbackContext.params=m),e.playlistId||(e.context.client.clientScreen=b),t.contentPlaybackContext.lactMilliseconds=String(Date.now()),k(),void w(e);if(!(r!==l||e.context?.client?.clientScreen===b||t.params?.startsWith(u)&&t.params?.startsWith(m)))return t.adPlaybackContext={pyv:!0},t.contentPlaybackContext.lactMilliseconds=String(Date.now()),k(),void w(e);if(r===y&&"WEB"===e.context?.client?.clientName)return e.context.client.clientScreen=b,t.contentPlaybackContext.lactMilliseconds=String(Date.now()),k(),void w(e);if(r===p)return t.adPlaybackContext={adType:"AD_TYPE_INSTREAM"},t.contentPlaybackContext.lactMilliseconds=String(Date.now()),k(),void w(e);if(r===d)return delete t.adPlaybackContext,void(()=>{try{Object.defineProperty(document,"visibilityState",h)}catch(e){}})()}catch(e){}};(()=>{const e={apply:(e,t,r)=>{try{let n=r[0];if(!n||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/"))return Reflect.apply(e,t,r);const a=Array.isArray(n),o=a?n[0]:n;if("string"!=typeof o)return Reflect.apply(e,t,r);if(!o.includes(\'"contentPlaybackContext"\')&&!o.includes(\'"adSignalsInfo"\'))return Reflect.apply(e,t,r);const i=JSON.parse(o);if(!i.context?.client)return Reflect.apply(e,t,r);i.playbackContext&&E(i,i.playbackContext,v),i.playerRequest&&E(i,i.playerRequest.playbackContext,v);const l=JSON.stringify(i);a?r[0][0]=l:r[0]=l}catch(e){}return Reflect.apply(e,t,r)}};window.XMLHttpRequest.prototype.send=new Proxy(window.XMLHttpRequest.prototype.send,e)})();const D=document.documentElement;new MutationObserver((()=>{if(document.querySelector(n)&&q(),!(()=>{const l=document.getElementById(e),c=document.querySelector(r),s=document.querySelector(n),y=document.querySelector(t),p=document.querySelector(a);if(!l||p)return!1;const d=l.getPlayerResponse?.();if(d?.playabilityStatus?.status===o||d?.playabilityStatus?.status===i)return!1;const u=l.getVideoData?.();return(s||y||c)&&null!=u?.errorCode})())return;const{videoId:u}=C();(e=>{if(e)for(const t of g)t!==e&&g.delete(t)})(u),(()=>{if(v===c){if(!I(s))return void R();P(s),R()}else if(v===s){if(!I(l))return void R();P(l),R()}else if(v===l){if(!I(y))return void R();P(y),R()}else if(v===y){if(!I(p))return void R();P(p),R()}else if(v===p){if(!I(d))return void R();P(d),R()}else if(v===d){const{videoId:e}=C();if(!e||g.has(e))return void q();g.add(e),R()}})()})).observe(D,{attributes:!0,childList:!0,subtree:!0})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["db1d269c06f73d400756ed71f805dc26"] === flag) {
                return;
            }
            (() => {
                const e = "movie_player", t = "ytd-watch-flexy[player-unavailable]", r = `#${e} > .ytp-error`, n = "yt-playability-error-supported-renderers#error-screen:has(>*)", a = 'yt-playability-error-supported-renderers#error-screen a[href^="//support.google.com/youtube/answer/2802245"]', o = "LOGIN_REQUIRED", i = "CONTENT_CHECK_REQUIRED", l = "pyv", c = "param_first", s = "param_second", y = "client_screen", p = "ad_type", d = "none", u = "eAFgAQ", m = "8AUB", f = "YAHI", b = "CHANNEL", S = c;
                let v = S, x = null;
                const g = new Set, C = () => {
                    const t = document.getElementById(e), r = window.location.search, n = new URLSearchParams(r).get("v") || t?.getVideoData?.().video_id, a = new URLSearchParams(r).get("t") ?? "0";
                    return {
                        videoId: n,
                        timeInSeconds: parseInt(a, 10)
                    };
                }, R = () => {
                    q();
                    const t = document.getElementById(e);
                    if (t && "function" == typeof t.loadVideoById) try {
                        const {videoId: e, timeInSeconds: r} = C();
                        t.loadVideoById(e, r);
                    } catch (e) {}
                }, I = (() => {
                    let e = null, t = null, r = 0;
                    return n => {
                        try {
                            if (!n) return !1;
                            const {videoId: a} = C();
                            return !!a && (e === a && t === n ? r++ : (e = a, t = n, r = 1), r >= 2 && (r = 0, 
                            !0));
                        } catch (e) {
                            return !1;
                        }
                    };
                })(), P = e => {
                    v = e;
                }, h = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState"), k = () => {
                    try {
                        Object.defineProperty(document, "visibilityState", {
                            get: () => "visible",
                            configurable: !0
                        });
                    } catch (e) {}
                }, q = () => {
                    const r = document.getElementById(e), l = document.querySelector(n), c = document.querySelector("yt-playability-error-supported-renderers.ytdMiniplayerPlayerContainerPlayabilityError:has(>*)"), s = document.querySelector(t), y = document.querySelector(a);
                    if (!r || y) return;
                    const p = r.getPlayerResponse?.();
                    p?.playabilityStatus?.status !== o && p?.playabilityStatus?.status !== i ? (s || c) && (l?.style.setProperty("display", "none", "important"), 
                    c?.style.setProperty("display", "none", "important"), s?.removeAttribute("player-unavailable")) : l?.style.setProperty("display", "block", "important");
                }, w = e => {
                    (e.playbackContext || e.playerRequest) && delete e.context?.client?.configInfo?.appInstallData;
                }, E = (e, t, r) => {
                    try {
                        if (!e || !t || !r) return;
                        if ((e => {
                            const t = e?.videoId;
                            t && (x && x !== t && P(S), x = t);
                        })(e), r === c && e.context?.client?.clientScreen !== b && !e.params?.startsWith(f)) return e.params = u, 
                        e.playerRequest && e.playerRequest.params !== u && (e.playerRequest.params = u), 
                        e.playbackContext && e.playbackContext.params !== u && (e.playbackContext.params = u), 
                        t.contentPlaybackContext.lactMilliseconds = String(Date.now()), k(), void w(e);
                        if (r === s && e.context?.client?.clientScreen !== b && !e.params?.startsWith(f)) return e.params !== m && (e.params = m), 
                        e.playerRequest && e.playerRequest.params !== m && (e.playerRequest.params = m), 
                        e.playbackContext && e.playbackContext.params !== m && (e.playbackContext.params = m), 
                        e.playlistId || (e.context.client.clientScreen = b), t.contentPlaybackContext.lactMilliseconds = String(Date.now()), 
                        k(), void w(e);
                        if (!(r !== l || e.context?.client?.clientScreen === b || t.params?.startsWith(u) && t.params?.startsWith(m))) return t.adPlaybackContext = {
                            pyv: !0
                        }, t.contentPlaybackContext.lactMilliseconds = String(Date.now()), k(), void w(e);
                        if (r === y && "WEB" === e.context?.client?.clientName) return e.context.client.clientScreen = b, 
                        t.contentPlaybackContext.lactMilliseconds = String(Date.now()), k(), void w(e);
                        if (r === p) return t.adPlaybackContext = {
                            adType: "AD_TYPE_INSTREAM"
                        }, t.contentPlaybackContext.lactMilliseconds = String(Date.now()), k(), void w(e);
                        if (r === d) return delete t.adPlaybackContext, void (() => {
                            try {
                                Object.defineProperty(document, "visibilityState", h);
                            } catch (e) {}
                        })();
                    } catch (e) {}
                };
                (() => {
                    const e = {
                        apply: (e, t, r) => {
                            try {
                                let n = r[0];
                                if (!n || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/")) return Reflect.apply(e, t, r);
                                const a = Array.isArray(n), o = a ? n[0] : n;
                                if ("string" != typeof o) return Reflect.apply(e, t, r);
                                if (!o.includes('"contentPlaybackContext"') && !o.includes('"adSignalsInfo"')) return Reflect.apply(e, t, r);
                                const i = JSON.parse(o);
                                if (!i.context?.client) return Reflect.apply(e, t, r);
                                i.playbackContext && E(i, i.playbackContext, v), i.playerRequest && E(i, i.playerRequest.playbackContext, v);
                                const l = JSON.stringify(i);
                                a ? r[0][0] = l : r[0] = l;
                            } catch (e) {}
                            return Reflect.apply(e, t, r);
                        }
                    };
                    window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, e);
                })();
                const D = document.documentElement;
                new MutationObserver((() => {
                    if (document.querySelector(n) && q(), !(() => {
                        const l = document.getElementById(e), c = document.querySelector(r), s = document.querySelector(n), y = document.querySelector(t), p = document.querySelector(a);
                        if (!l || p) return !1;
                        const d = l.getPlayerResponse?.();
                        if (d?.playabilityStatus?.status === o || d?.playabilityStatus?.status === i) return !1;
                        const u = l.getVideoData?.();
                        return (s || y || c) && null != u?.errorCode;
                    })()) return;
                    const {videoId: u} = C();
                    (e => {
                        if (e) for (const t of g) t !== e && g.delete(t);
                    })(u), (() => {
                        if (v === c) {
                            if (!I(s)) return void R();
                            P(s), R();
                        } else if (v === s) {
                            if (!I(l)) return void R();
                            P(l), R();
                        } else if (v === l) {
                            if (!I(y)) return void R();
                            P(y), R();
                        } else if (v === y) {
                            if (!I(p)) return void R();
                            P(p), R();
                        } else if (v === p) {
                            if (!I(d)) return void R();
                            P(d), R();
                        } else if (v === d) {
                            const {videoId: e} = C();
                            if (!e || g.has(e)) return void q();
                            g.add(e), R();
                        }
                    })();
                })).observe(D, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "db1d269c06f73d400756ed71f805dc26", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "db1d269c06f73d400756ed71f805dc26" due to: ' + error);
        }
    },
    '(()=>{const e=["param_first","param_second","pyv","client_screen","ad_type"];(()=>{const t="pyv",a="param_first",n="param_second",c="client_screen",o="ad_type",r="none",l="eAFgAQ",i="8AUB",y="YAHI",p="CHANNEL",s=e[0]??r;let u=s,d=null,b=!1;const f=()=>location.href.includes("/shorts/")||location.href.includes("youtube.com/tv"),m=Object.getOwnPropertyDescriptor(Document.prototype,"visibilityState"),C=()=>{try{Object.defineProperty(document,"visibilityState",{get:()=>"visible",configurable:!0})}catch(e){}},x=window.JSON.stringify,R=e=>{u=e};(()=>{try{const e=Object.getOwnPropertyDescriptor(window.JSON,"parse");return!!e&&e.writable}catch(e){return!1}})()||((()=>{const e={apply:(e,t,a)=>{try{const e=t;e?.includes(\'"minimumPlaybackRate":100,"maximumPlaybackRate":100\')&&(t=e.replace(\'"minimumPlaybackRate":100,"maximumPlaybackRate":100\',\'"minimumPlaybackRate":25,"maximumPlaybackRate":200\'))}catch(e){}return Reflect.apply(e,t,a)}};window.String.prototype.replace=new Proxy(window.String.prototype.replace,e)})(),R(c));const k=e=>{(e.playbackContext||e.playerRequest)&&delete e.context?.client?.configInfo?.appInstallData},P=e=>{e.context.client.clientScreen!==p&&(b=!0,e.context.client.clientScreen=p)},w=(e,f,x)=>{try{if(!e?.context?.client||!f||"object"!=typeof f||!x)return;const w=document.getElementById("movie_player")?.getPlayerResponse?.()?.playabilityStatus?.status;"CONTENT_CHECK_REQUIRED"!==w&&"1"!==new URLSearchParams(location.search).get("rco")||(e.racyCheckOk=!0,e.playerRequest&&(e.playerRequest.racyCheckOk=!0)),(e=>{const t=e?.videoId||e?.playerRequest?.videoId;t&&(d&&d!==t&&(R(s),b=!1),d=t)})(e),x=u,((e,t)=>{const a=[e,e.playerRequest,t];e.context.client.clientScreen===p&&a.some(e=>e?.params===i)&&(b=!0);for(const e of a)e?.params!==l&&e?.params!==i||delete e.params;const n=t.adPlaybackContext;!0===n?.pyv&&delete n.pyv,"AD_TYPE_INSTREAM"===n?.adType&&delete n.adType,n&&0===Object.keys(n).length&&delete t.adPlaybackContext})(e,f);const g=e.context.client.clientScreen!==p||b;if(("LOGIN_REQUIRED"===w||"CONTENT_CHECK_REQUIRED"===w&&!e?.racyCheckOk)&&(x=r),x===a&&g&&!e.params?.startsWith(y))return e.params=l,f.params=l,e.playerRequest&&e.playerRequest.params!==l&&(e.playerRequest.params=l),e.playbackContext&&e.playbackContext.params!==l&&(e.playbackContext.params=l),f.contentPlaybackContext&&"object"==typeof f.contentPlaybackContext&&(f.contentPlaybackContext.lactMilliseconds=String(Date.now())),C(),void k(e);if(x===n&&g&&!e.params?.startsWith(y))return f.params=i,e.params!==i&&(e.params=i),e.playerRequest&&e.playerRequest.params!==i&&(e.playerRequest.params=i),e.playbackContext&&e.playbackContext.params!==i&&(e.playbackContext.params=i),e.playlistId||P(e),f.contentPlaybackContext&&"object"==typeof f.contentPlaybackContext&&(f.contentPlaybackContext.lactMilliseconds=String(Date.now())),C(),void k(e);if(x===t&&g&&!f.params?.startsWith(l)&&!f.params?.startsWith(i))return f.adPlaybackContext={...f.adPlaybackContext,pyv:!0},f.contentPlaybackContext&&"object"==typeof f.contentPlaybackContext&&(f.contentPlaybackContext.lactMilliseconds=String(Date.now())),void k(e);if(x===c&&"WEB"===e.context?.client?.clientName)return P(e),f.contentPlaybackContext&&"object"==typeof f.contentPlaybackContext&&(f.contentPlaybackContext.lactMilliseconds=String(Date.now())),C(),void k(e);if(x===o)return f.adPlaybackContext={...f.adPlaybackContext,adType:"AD_TYPE_INSTREAM"},f.contentPlaybackContext&&"object"==typeof f.contentPlaybackContext&&(f.contentPlaybackContext.lactMilliseconds=String(Date.now())),C(),void k(e);if(x===r)return void(()=>{try{Object.defineProperty(document,"visibilityState",m)}catch(e){}})()}catch(e){}},g=["playerErrorMessageRenderer","UNPLAYABLE"],S={apply:(t,n,c)=>{if(f()||u===r)return Reflect.apply(t,n,c);let l;try{if(l=Reflect.apply(t,n,c),!l.responseContext&&!l.playabilityStatus)return l;const i=x(l);return g.some(e=>i.includes(e))&&!i.includes("CONTENT_CHECK_REQUIRED")?(R((()=>{const t=e.indexOf(u);return t<0?r:e[t+1]??r})()),l):(u===a&&l.playerConfig?.audioConfig?.muteOnStart&&(location.href.includes("/watch")||l.cards&&!l.playabilityStatus?.miniplayer)&&(delete l.playerConfig.audioConfig.muteOnStart,l.messages?.[0]?.youThereRenderer&&delete l.messages[0].youThereRenderer),u===o&&l.playerConfig?.granularVariableSpeedConfig&&(l.playerConfig.granularVariableSpeedConfig.maximumPlaybackRate=200,l.playerConfig.granularVariableSpeedConfig.minimumPlaybackRate=25),l)}catch(e){}return Reflect.apply(t,n,c)}};window.JSON.parse=new Proxy(window.JSON.parse,S);const E={apply:(e,t,a)=>{if(f())return Reflect.apply(e,t,a);try{let n=a[0];if(n&&(n.includes(\'"contentPlaybackContext"\')||n.includes(\'"adSignalsInfo"\'))){const c=JSON.parse(n);if(!c.context?.client)return Reflect.apply(e,t,a);c.playbackContext&&w(c,c.playbackContext,u),c.playerRequest&&w(c,c.playerRequest.playbackContext,u),n=x(c),a[0]=n}}catch(e){}return Reflect.apply(e,t,a)}};window.TextEncoder.prototype.encode=new Proxy(window.TextEncoder.prototype.encode,E);const h={apply:(e,t,a)=>{if(f())return Reflect.apply(e,t,a);try{const n=a[0];if(!n?.context?.client)return Reflect.apply(e,t,a);for(const e of [n.playbackContext,n.playerRequest?.playbackContext]){const t=e?.adPlaybackContext;!e||t&&!0!==t.pyv&&"AD_TYPE_INSTREAM"!==t.adType||w(n,e,u)}a[0]=n}catch(e){}return Reflect.apply(e,t,a)}};window.JSON.stringify=new Proxy(window.JSON.stringify,h);const O={construct:(e,t,a)=>{try{const n=t[0];let c=t[1]?.body;if(!n?.includes("youtubei")||f()||!c)return Reflect.construct(e,t,a);if(c.includes(\'"contentPlaybackContext"\')||c.includes(\'"adSignalsInfo"\')){const n=JSON.parse(c);if(!n.context?.client)return Reflect.construct(e,t,a);n.playbackContext&&w(n,n.playbackContext,u),n.playerRequest&&w(n,n.playerRequest.playbackContext,u),c=x(n),t[1].body=c}}catch(e){}return Reflect.construct(e,t,a)}};window.Request=new Proxy(window.Request,O)})()})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["eb4ffb78966ac5f7c7523e358dbf0ccd"] === flag) {
                return;
            }
            (() => {
                const e = [ "param_first", "param_second", "pyv", "client_screen", "ad_type" ];
                (() => {
                    const t = "pyv", a = "param_first", n = "param_second", c = "client_screen", o = "ad_type", r = "none", l = "eAFgAQ", i = "8AUB", y = "YAHI", p = "CHANNEL", s = e[0] ?? r;
                    let u = s, d = null, b = !1;
                    const f = () => location.href.includes("/shorts/") || location.href.includes("youtube.com/tv"), m = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState"), C = () => {
                        try {
                            Object.defineProperty(document, "visibilityState", {
                                get: () => "visible",
                                configurable: !0
                            });
                        } catch (e) {}
                    }, x = window.JSON.stringify, R = e => {
                        u = e;
                    };
                    (() => {
                        try {
                            const e = Object.getOwnPropertyDescriptor(window.JSON, "parse");
                            return !!e && e.writable;
                        } catch (e) {
                            return !1;
                        }
                    })() || ((() => {
                        const e = {
                            apply: (e, t, a) => {
                                try {
                                    const e = t;
                                    e?.includes('"minimumPlaybackRate":100,"maximumPlaybackRate":100') && (t = e.replace('"minimumPlaybackRate":100,"maximumPlaybackRate":100', '"minimumPlaybackRate":25,"maximumPlaybackRate":200'));
                                } catch (e) {}
                                return Reflect.apply(e, t, a);
                            }
                        };
                        window.String.prototype.replace = new Proxy(window.String.prototype.replace, e);
                    })(), R(c));
                    const k = e => {
                        (e.playbackContext || e.playerRequest) && delete e.context?.client?.configInfo?.appInstallData;
                    }, P = e => {
                        e.context.client.clientScreen !== p && (b = !0, e.context.client.clientScreen = p);
                    }, w = (e, f, x) => {
                        try {
                            if (!e?.context?.client || !f || "object" != typeof f || !x) return;
                            const w = document.getElementById("movie_player")?.getPlayerResponse?.()?.playabilityStatus?.status;
                            "CONTENT_CHECK_REQUIRED" !== w && "1" !== new URLSearchParams(location.search).get("rco") || (e.racyCheckOk = !0, 
                            e.playerRequest && (e.playerRequest.racyCheckOk = !0)), (e => {
                                const t = e?.videoId || e?.playerRequest?.videoId;
                                t && (d && d !== t && (R(s), b = !1), d = t);
                            })(e), x = u, ((e, t) => {
                                const a = [ e, e.playerRequest, t ];
                                e.context.client.clientScreen === p && a.some((e => e?.params === i)) && (b = !0);
                                for (const e of a) e?.params !== l && e?.params !== i || delete e.params;
                                const n = t.adPlaybackContext;
                                !0 === n?.pyv && delete n.pyv, "AD_TYPE_INSTREAM" === n?.adType && delete n.adType, 
                                n && 0 === Object.keys(n).length && delete t.adPlaybackContext;
                            })(e, f);
                            const g = e.context.client.clientScreen !== p || b;
                            if (("LOGIN_REQUIRED" === w || "CONTENT_CHECK_REQUIRED" === w && !e?.racyCheckOk) && (x = r), 
                            x === a && g && !e.params?.startsWith(y)) return e.params = l, f.params = l, e.playerRequest && e.playerRequest.params !== l && (e.playerRequest.params = l), 
                            e.playbackContext && e.playbackContext.params !== l && (e.playbackContext.params = l), 
                            f.contentPlaybackContext && "object" == typeof f.contentPlaybackContext && (f.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            C(), void k(e);
                            if (x === n && g && !e.params?.startsWith(y)) return f.params = i, e.params !== i && (e.params = i), 
                            e.playerRequest && e.playerRequest.params !== i && (e.playerRequest.params = i), 
                            e.playbackContext && e.playbackContext.params !== i && (e.playbackContext.params = i), 
                            e.playlistId || P(e), f.contentPlaybackContext && "object" == typeof f.contentPlaybackContext && (f.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            C(), void k(e);
                            if (x === t && g && !f.params?.startsWith(l) && !f.params?.startsWith(i)) return f.adPlaybackContext = {
                                ...f.adPlaybackContext,
                                pyv: !0
                            }, f.contentPlaybackContext && "object" == typeof f.contentPlaybackContext && (f.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            void k(e);
                            if (x === c && "WEB" === e.context?.client?.clientName) return P(e), f.contentPlaybackContext && "object" == typeof f.contentPlaybackContext && (f.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            C(), void k(e);
                            if (x === o) return f.adPlaybackContext = {
                                ...f.adPlaybackContext,
                                adType: "AD_TYPE_INSTREAM"
                            }, f.contentPlaybackContext && "object" == typeof f.contentPlaybackContext && (f.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            C(), void k(e);
                            if (x === r) return void (() => {
                                try {
                                    Object.defineProperty(document, "visibilityState", m);
                                } catch (e) {}
                            })();
                        } catch (e) {}
                    }, g = [ "playerErrorMessageRenderer", "UNPLAYABLE" ], S = {
                        apply: (t, n, c) => {
                            if (f() || u === r) return Reflect.apply(t, n, c);
                            let l;
                            try {
                                if (l = Reflect.apply(t, n, c), !l.responseContext && !l.playabilityStatus) return l;
                                const i = x(l);
                                return g.some((e => i.includes(e))) && !i.includes("CONTENT_CHECK_REQUIRED") ? (R((() => {
                                    const t = e.indexOf(u);
                                    return t < 0 ? r : e[t + 1] ?? r;
                                })()), l) : (u === a && l.playerConfig?.audioConfig?.muteOnStart && (location.href.includes("/watch") || l.cards && !l.playabilityStatus?.miniplayer) && (delete l.playerConfig.audioConfig.muteOnStart, 
                                l.messages?.[0]?.youThereRenderer && delete l.messages[0].youThereRenderer), u === o && l.playerConfig?.granularVariableSpeedConfig && (l.playerConfig.granularVariableSpeedConfig.maximumPlaybackRate = 200, 
                                l.playerConfig.granularVariableSpeedConfig.minimumPlaybackRate = 25), l);
                            } catch (e) {}
                            return Reflect.apply(t, n, c);
                        }
                    };
                    window.JSON.parse = new Proxy(window.JSON.parse, S);
                    const E = {
                        apply: (e, t, a) => {
                            if (f()) return Reflect.apply(e, t, a);
                            try {
                                let n = a[0];
                                if (n && (n.includes('"contentPlaybackContext"') || n.includes('"adSignalsInfo"'))) {
                                    const c = JSON.parse(n);
                                    if (!c.context?.client) return Reflect.apply(e, t, a);
                                    c.playbackContext && w(c, c.playbackContext, u), c.playerRequest && w(c, c.playerRequest.playbackContext, u), 
                                    n = x(c), a[0] = n;
                                }
                            } catch (e) {}
                            return Reflect.apply(e, t, a);
                        }
                    };
                    window.TextEncoder.prototype.encode = new Proxy(window.TextEncoder.prototype.encode, E);
                    const h = {
                        apply: (e, t, a) => {
                            if (f()) return Reflect.apply(e, t, a);
                            try {
                                const n = a[0];
                                if (!n?.context?.client) return Reflect.apply(e, t, a);
                                for (const e of [ n.playbackContext, n.playerRequest?.playbackContext ]) {
                                    const t = e?.adPlaybackContext;
                                    !e || t && !0 !== t.pyv && "AD_TYPE_INSTREAM" !== t.adType || w(n, e, u);
                                }
                                a[0] = n;
                            } catch (e) {}
                            return Reflect.apply(e, t, a);
                        }
                    };
                    window.JSON.stringify = new Proxy(window.JSON.stringify, h);
                    const O = {
                        construct: (e, t, a) => {
                            try {
                                const n = t[0];
                                let c = t[1]?.body;
                                if (!n?.includes("youtubei") || f() || !c) return Reflect.construct(e, t, a);
                                if (c.includes('"contentPlaybackContext"') || c.includes('"adSignalsInfo"')) {
                                    const n = JSON.parse(c);
                                    if (!n.context?.client) return Reflect.construct(e, t, a);
                                    n.playbackContext && w(n, n.playbackContext, u), n.playerRequest && w(n, n.playerRequest.playbackContext, u), 
                                    c = x(n), t[1].body = c;
                                }
                            } catch (e) {}
                            return Reflect.construct(e, t, a);
                        }
                    };
                    window.Request = new Proxy(window.Request, O);
                })();
            })();
            Object.defineProperty(Window.prototype.toString, "eb4ffb78966ac5f7c7523e358dbf0ccd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "eb4ffb78966ac5f7c7523e358dbf0ccd" due to: ' + error);
        }
    },
    '(()=>{const t=["param_first","param_second","pyv","client_screen","ad_type"];(()=>{const e="movie_player",a="ytd-watch-flexy[player-unavailable]",n=`#${e} > .ytp-error`,r="yt-playability-error-supported-renderers#error-screen:has(>*)",o=\'yt-playability-error-supported-renderers#error-screen a[href^="//support.google.com/youtube/answer/2802245"]\',c="LOGIN_REQUIRED",l="pyv",s="param_first",i="param_second",y="client_screen",p="ad_type",d="none",u="eAFgAQ",b="8AUB",m="YAHI",f="CHANNEL",C=t[0]??d;let x=C,k=null,P=!1;const S=new Set,v=()=>location.pathname.startsWith("/embed/"),R=(t,{videoId:e,timeInSeconds:a})=>{if(t&&"function"==typeof t.loadVideoById)try{t.loadVideoById(e,a)}catch(t){}},h=()=>{let t=null,e=null,a=0;return(n,r)=>{try{return!!n&&(!!r&&(t===r&&e===n?a++:(t=r,e=n,a=1),a>=2&&(a=0,!0)))}catch(t){return!1}}};let g=h();const I=t=>{x=t},q=t=>{const e=t?.videoId||t?.playerRequest?.videoId;e&&(k!==e&&(I(C),P=!1,g=h(),S.clear()),k=e)},E=Object.getOwnPropertyDescriptor(Document.prototype,"visibilityState"),_=()=>{try{Object.defineProperty(document,"visibilityState",{get:()=>"visible",configurable:!0})}catch(t){}},w=t=>{(t.playbackContext||t.playerRequest)&&delete t.context?.client?.configInfo?.appInstallData},D=t=>{t.context.client.clientScreen!==f&&(P=!0,t.context.client.clientScreen=f)},O=(t,a,n)=>{try{if(!t?.context?.client||!a||"object"!=typeof a||!n)return;const r=document.getElementById(e)?.getPlayerResponse?.()?.playabilityStatus?.status;"CONTENT_CHECK_REQUIRED"!==r&&"1"!==new URLSearchParams(location.search).get("rco")||(t.racyCheckOk=!0,t.playerRequest&&(t.playerRequest.racyCheckOk=!0)),q(t),n=x,((t,e)=>{const a=[t,t.playerRequest,e];t.context.client.clientScreen===f&&a.some(t=>t?.params===b)&&(P=!0);for(const t of a)t?.params!==u&&t?.params!==b||delete t.params;const n=e.adPlaybackContext;!0===n?.pyv&&delete n.pyv,"AD_TYPE_INSTREAM"===n?.adType&&delete n.adType,n&&0===Object.keys(n).length&&delete e.adPlaybackContext})(t,a);const o=t.context.client.clientScreen!==f||P;if(n===s&&o&&!t.params?.startsWith(m))return t.params=u,a.params=u,t.playerRequest&&t.playerRequest.params!==u&&(t.playerRequest.params=u),t.playbackContext&&t.playbackContext.params!==u&&(t.playbackContext.params=u),a.contentPlaybackContext&&"object"==typeof a.contentPlaybackContext&&(a.contentPlaybackContext.lactMilliseconds=String(Date.now())),_(),void w(t);if(n===i&&o&&!t.params?.startsWith(m))return a.params=b,t.params!==b&&(t.params=b),t.playerRequest&&t.playerRequest.params!==b&&(t.playerRequest.params=b),t.playbackContext&&t.playbackContext.params!==b&&(t.playbackContext.params=b),t.playlistId||D(t),a.contentPlaybackContext&&"object"==typeof a.contentPlaybackContext&&(a.contentPlaybackContext.lactMilliseconds=String(Date.now())),_(),void w(t);if(n===l&&o&&!a.params?.startsWith(u)&&!a.params?.startsWith(b))return a.adPlaybackContext={...a.adPlaybackContext,pyv:!0},a.contentPlaybackContext&&"object"==typeof a.contentPlaybackContext&&(a.contentPlaybackContext.lactMilliseconds=String(Date.now())),_(),void w(t);if(n===y&&"WEB"===t.context?.client?.clientName)return D(t),a.contentPlaybackContext&&"object"==typeof a.contentPlaybackContext&&(a.contentPlaybackContext.lactMilliseconds=String(Date.now())),_(),void w(t);if(n===p)return a.adPlaybackContext={...a.adPlaybackContext,adType:"AD_TYPE_INSTREAM"},a.contentPlaybackContext&&"object"==typeof a.contentPlaybackContext&&(a.contentPlaybackContext.lactMilliseconds=String(Date.now())),_(),void w(t);if(n===d)return void(()=>{try{Object.defineProperty(document,"visibilityState",E)}catch(t){}})()}catch(t){}},A={apply:(t,e,a)=>{try{let n=a[0];if(!n||location.href.includes("youtube.com/tv"))return Reflect.apply(t,e,a);const r=Array.isArray(n),o=r?n[0]:n;if("string"!=typeof o)return Reflect.apply(t,e,a);if(!o.includes(\'"contentPlaybackContext"\')&&!o.includes(\'"adSignalsInfo"\'))return Reflect.apply(t,e,a);const c=JSON.parse(o);if(!c.context?.client)return Reflect.apply(t,e,a);c.playbackContext&&O(c,c.playbackContext,x),c.playerRequest&&O(c,c.playerRequest.playbackContext,x);const l=JSON.stringify(c);r?a[0][0]=l:a[0]=l}catch(t){}return Reflect.apply(t,e,a)}};window.XMLHttpRequest.prototype.send=new Proxy(window.XMLHttpRequest.prototype.send,A);const N=document.documentElement,T=(e,a)=>{if(x===d){const{videoId:t}=a;if(!t||S.has(t))return;return S.add(t),void R(e,a)}const n=(()=>{const e=t.indexOf(x);return e<0?d:t[e+1]??d})();g(n,a.videoId)&&I(n),R(e,a)};new MutationObserver(()=>{const t=document.getElementById(e),l=(t=>new URLSearchParams(location.search).get("v")||(v()?location.pathname.split("/")[2]:null)||t?.getVideoData?.()?.video_id)(t);if(!l)return;q({videoId:l});const s=t?.getPlayerResponse?.();((t,e)=>{const n=document.querySelector(r),l=document.querySelector("yt-playability-error-supported-renderers.ytdMiniplayerPlayerContainerPlayabilityError:has(>*)"),s=document.querySelector(a),i=document.querySelector(o);t&&!i&&(e?.playabilityStatus?.status!==c?(s||l)&&(n?.style.setProperty("display","none","important"),l?.style.setProperty("display","none","important"),s?.removeAttribute("player-unavailable")):n?.style.setProperty("display","block","important"))})(t,s),((t,e)=>{const l=document.querySelector(n),s=document.querySelector(r),i=document.querySelector(a),y=document.querySelector(o);if(!t||y)return!1;if(e?.playabilityStatus?.status===c||"CONTENT_CHECK_REQUIRED"===e?.playabilityStatus?.status)return!1;const p=t.getVideoData?.();return(s||i||l)&&null!=p?.errorCode})(t,s)&&(v()&&!s||x===d&&S.has(l)||T(t,((t,e)=>{const a=new URLSearchParams(location.search).get("t"),n=t?.getVideoData?.()?.video_id,r=a??(n===e?t?.getCurrentTime?.():0);return{videoId:e,timeInSeconds:parseInt(r,10)||0}})(t,l)))}).observe(N,{attributes:!0,childList:!0,subtree:!0})})()})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d90d199e1cee44dcedf33bc6f0391617"] === flag) {
                return;
            }
            (() => {
                const t = [ "param_first", "param_second", "pyv", "client_screen", "ad_type" ];
                (() => {
                    const e = "movie_player", a = "ytd-watch-flexy[player-unavailable]", n = `#${e} > .ytp-error`, r = "yt-playability-error-supported-renderers#error-screen:has(>*)", o = 'yt-playability-error-supported-renderers#error-screen a[href^="//support.google.com/youtube/answer/2802245"]', c = "LOGIN_REQUIRED", l = "pyv", s = "param_first", i = "param_second", y = "client_screen", p = "ad_type", d = "none", u = "eAFgAQ", b = "8AUB", m = "YAHI", f = "CHANNEL", C = t[0] ?? d;
                    let x = C, k = null, P = !1;
                    const S = new Set, v = () => location.pathname.startsWith("/embed/"), R = (t, {videoId: e, timeInSeconds: a}) => {
                        if (t && "function" == typeof t.loadVideoById) try {
                            t.loadVideoById(e, a);
                        } catch (t) {}
                    }, h = () => {
                        let t = null, e = null, a = 0;
                        return (n, r) => {
                            try {
                                return !!n && (!!r && (t === r && e === n ? a++ : (t = r, e = n, a = 1), a >= 2 && (a = 0, 
                                !0)));
                            } catch (t) {
                                return !1;
                            }
                        };
                    };
                    let g = h();
                    const I = t => {
                        x = t;
                    }, q = t => {
                        const e = t?.videoId || t?.playerRequest?.videoId;
                        e && (k !== e && (I(C), P = !1, g = h(), S.clear()), k = e);
                    }, E = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState"), _ = () => {
                        try {
                            Object.defineProperty(document, "visibilityState", {
                                get: () => "visible",
                                configurable: !0
                            });
                        } catch (t) {}
                    }, w = t => {
                        (t.playbackContext || t.playerRequest) && delete t.context?.client?.configInfo?.appInstallData;
                    }, D = t => {
                        t.context.client.clientScreen !== f && (P = !0, t.context.client.clientScreen = f);
                    }, O = (t, a, n) => {
                        try {
                            if (!t?.context?.client || !a || "object" != typeof a || !n) return;
                            const r = document.getElementById(e)?.getPlayerResponse?.()?.playabilityStatus?.status;
                            "CONTENT_CHECK_REQUIRED" !== r && "1" !== new URLSearchParams(location.search).get("rco") || (t.racyCheckOk = !0, 
                            t.playerRequest && (t.playerRequest.racyCheckOk = !0)), q(t), n = x, ((t, e) => {
                                const a = [ t, t.playerRequest, e ];
                                t.context.client.clientScreen === f && a.some((t => t?.params === b)) && (P = !0);
                                for (const t of a) t?.params !== u && t?.params !== b || delete t.params;
                                const n = e.adPlaybackContext;
                                !0 === n?.pyv && delete n.pyv, "AD_TYPE_INSTREAM" === n?.adType && delete n.adType, 
                                n && 0 === Object.keys(n).length && delete e.adPlaybackContext;
                            })(t, a);
                            const o = t.context.client.clientScreen !== f || P;
                            if (n === s && o && !t.params?.startsWith(m)) return t.params = u, a.params = u, 
                            t.playerRequest && t.playerRequest.params !== u && (t.playerRequest.params = u), 
                            t.playbackContext && t.playbackContext.params !== u && (t.playbackContext.params = u), 
                            a.contentPlaybackContext && "object" == typeof a.contentPlaybackContext && (a.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            _(), void w(t);
                            if (n === i && o && !t.params?.startsWith(m)) return a.params = b, t.params !== b && (t.params = b), 
                            t.playerRequest && t.playerRequest.params !== b && (t.playerRequest.params = b), 
                            t.playbackContext && t.playbackContext.params !== b && (t.playbackContext.params = b), 
                            t.playlistId || D(t), a.contentPlaybackContext && "object" == typeof a.contentPlaybackContext && (a.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            _(), void w(t);
                            if (n === l && o && !a.params?.startsWith(u) && !a.params?.startsWith(b)) return a.adPlaybackContext = {
                                ...a.adPlaybackContext,
                                pyv: !0
                            }, a.contentPlaybackContext && "object" == typeof a.contentPlaybackContext && (a.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            _(), void w(t);
                            if (n === y && "WEB" === t.context?.client?.clientName) return D(t), a.contentPlaybackContext && "object" == typeof a.contentPlaybackContext && (a.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            _(), void w(t);
                            if (n === p) return a.adPlaybackContext = {
                                ...a.adPlaybackContext,
                                adType: "AD_TYPE_INSTREAM"
                            }, a.contentPlaybackContext && "object" == typeof a.contentPlaybackContext && (a.contentPlaybackContext.lactMilliseconds = String(Date.now())), 
                            _(), void w(t);
                            if (n === d) return void (() => {
                                try {
                                    Object.defineProperty(document, "visibilityState", E);
                                } catch (t) {}
                            })();
                        } catch (t) {}
                    }, A = {
                        apply: (t, e, a) => {
                            try {
                                let n = a[0];
                                if (!n || location.href.includes("youtube.com/tv")) return Reflect.apply(t, e, a);
                                const r = Array.isArray(n), o = r ? n[0] : n;
                                if ("string" != typeof o) return Reflect.apply(t, e, a);
                                if (!o.includes('"contentPlaybackContext"') && !o.includes('"adSignalsInfo"')) return Reflect.apply(t, e, a);
                                const c = JSON.parse(o);
                                if (!c.context?.client) return Reflect.apply(t, e, a);
                                c.playbackContext && O(c, c.playbackContext, x), c.playerRequest && O(c, c.playerRequest.playbackContext, x);
                                const l = JSON.stringify(c);
                                r ? a[0][0] = l : a[0] = l;
                            } catch (t) {}
                            return Reflect.apply(t, e, a);
                        }
                    };
                    window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, A);
                    const N = document.documentElement, T = (e, a) => {
                        if (x === d) {
                            const {videoId: t} = a;
                            if (!t || S.has(t)) return;
                            return S.add(t), void R(e, a);
                        }
                        const n = (() => {
                            const e = t.indexOf(x);
                            return e < 0 ? d : t[e + 1] ?? d;
                        })();
                        g(n, a.videoId) && I(n), R(e, a);
                    };
                    new MutationObserver((() => {
                        const t = document.getElementById(e), l = (t => new URLSearchParams(location.search).get("v") || (v() ? location.pathname.split("/")[2] : null) || t?.getVideoData?.()?.video_id)(t);
                        if (!l) return;
                        q({
                            videoId: l
                        });
                        const s = t?.getPlayerResponse?.();
                        ((t, e) => {
                            const n = document.querySelector(r), l = document.querySelector("yt-playability-error-supported-renderers.ytdMiniplayerPlayerContainerPlayabilityError:has(>*)"), s = document.querySelector(a), i = document.querySelector(o);
                            t && !i && (e?.playabilityStatus?.status !== c ? (s || l) && (n?.style.setProperty("display", "none", "important"), 
                            l?.style.setProperty("display", "none", "important"), s?.removeAttribute("player-unavailable")) : n?.style.setProperty("display", "block", "important"));
                        })(t, s), ((t, e) => {
                            const l = document.querySelector(n), s = document.querySelector(r), i = document.querySelector(a), y = document.querySelector(o);
                            if (!t || y) return !1;
                            if (e?.playabilityStatus?.status === c || "CONTENT_CHECK_REQUIRED" === e?.playabilityStatus?.status) return !1;
                            const p = t.getVideoData?.();
                            return (s || i || l) && null != p?.errorCode;
                        })(t, s) && (v() && !s || x === d && S.has(l) || T(t, ((t, e) => {
                            const a = new URLSearchParams(location.search).get("t"), n = t?.getVideoData?.()?.video_id, r = a ?? (n === e ? t?.getCurrentTime?.() : 0);
                            return {
                                videoId: e,
                                timeInSeconds: parseInt(r, 10) || 0
                            };
                        })(t, l)));
                    })).observe(N, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0
                    });
                })();
            })();
            Object.defineProperty(Window.prototype.toString, "d90d199e1cee44dcedf33bc6f0391617", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d90d199e1cee44dcedf33bc6f0391617" due to: ' + error);
        }
    },
    '(()=>{const t=Function.prototype.call;let e=!1,o=!1,n=!1;const c={apply:(c,r,a)=>{const i=a[0];if(i?.requestNumber&&i?.snapshot)try{o=((t,e=5)=>{if("object"!=typeof t||null===t)return!1;const o=new Array(1e3);let c=0;const r=new WeakSet;for(o[c++]={obj:t,depth:0};c>0&&!n;){const{obj:t,depth:a}=o[--c];if(a>e||"object"!=typeof t||null===t||r.has(t))continue;let i;r.add(t);try{i=Object.hasOwn(t,"backoffTimeMs")}catch(t){}if(i)return void 0!==t.backoffTimeMs||(n=!0,!1);for(const e in t)if(Object.hasOwn(t,e)){let n;try{n=t[e]}catch(t){}null!==n&&"object"==typeof n&&!r.has(n)&&c<o.length&&(o[c++]={obj:n,depth:a+1})}}return!1})(i),e=!0,(o||n)&&(Function.prototype.call=t)}catch(t){}return Reflect.apply(c,r,a)}};window.Function.prototype.call=new Proxy(window.Function.prototype.call,c);window.addEventListener("DOMContentLoaded",(async()=>{if(Function.prototype.call=t,!o&&e)return;const n=window.location.search,c=new URLSearchParams(n).get("v");if(!c)return;const r=await(a="#movie_player",i=200,l=1e4,new Promise((t=>{if(!a||!i||!l)return void t(null);const e=Date.now()+l,o=()=>{const n=document.querySelector(a);n?t(n):Date.now()>e?t(null):setTimeout(o,i)};o()})));var a,i,l;if(!r)return;const s=new URLSearchParams(n).get("t")??"0",u=parseInt(s,10);if("function"==typeof r.loadVideoById)try{r.loadVideoById(c,u)}catch(t){}}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["af468cefec0552b8b5bf95042e3b10c0"] === flag) {
                return;
            }
            (() => {
                const t = Function.prototype.call;
                let e = !1, o = !1, n = !1;
                const c = {
                    apply: (c, r, a) => {
                        const i = a[0];
                        if (i?.requestNumber && i?.snapshot) try {
                            o = ((t, e = 5) => {
                                if ("object" != typeof t || null === t) return !1;
                                const o = new Array(1e3);
                                let c = 0;
                                const r = new WeakSet;
                                for (o[c++] = {
                                    obj: t,
                                    depth: 0
                                }; c > 0 && !n; ) {
                                    const {obj: t, depth: a} = o[--c];
                                    if (a > e || "object" != typeof t || null === t || r.has(t)) continue;
                                    let i;
                                    r.add(t);
                                    try {
                                        i = Object.hasOwn(t, "backoffTimeMs");
                                    } catch (t) {}
                                    if (i) return void 0 !== t.backoffTimeMs || (n = !0, !1);
                                    for (const e in t) if (Object.hasOwn(t, e)) {
                                        let n;
                                        try {
                                            n = t[e];
                                        } catch (t) {}
                                        null !== n && "object" == typeof n && !r.has(n) && c < o.length && (o[c++] = {
                                            obj: n,
                                            depth: a + 1
                                        });
                                    }
                                }
                                return !1;
                            })(i), e = !0, (o || n) && (Function.prototype.call = t);
                        } catch (t) {}
                        return Reflect.apply(c, r, a);
                    }
                };
                window.Function.prototype.call = new Proxy(window.Function.prototype.call, c);
                window.addEventListener("DOMContentLoaded", (async () => {
                    if (Function.prototype.call = t, !o && e) return;
                    const n = window.location.search, c = new URLSearchParams(n).get("v");
                    if (!c) return;
                    const r = await (a = "#movie_player", i = 200, l = 1e4, new Promise((t => {
                        if (!a || !i || !l) return void t(null);
                        const e = Date.now() + l, o = () => {
                            const n = document.querySelector(a);
                            n ? t(n) : Date.now() > e ? t(null) : setTimeout(o, i);
                        };
                        o();
                    })));
                    var a, i, l;
                    if (!r) return;
                    const s = new URLSearchParams(n).get("t") ?? "0", u = parseInt(s, 10);
                    if ("function" == typeof r.loadVideoById) try {
                        r.loadVideoById(c, u);
                    } catch (t) {}
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "af468cefec0552b8b5bf95042e3b10c0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "af468cefec0552b8b5bf95042e3b10c0" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,r,t)=>{const n=t[0];if("string"==typeof n?.value&&n.value.includes("playerResponse"))try{n.value=(l=n.value,(location.href.includes("/watch")||l.includes("cards")&&!l.includes(\'"miniplayer"\'))&&l.includes(\'"muteOnStart":true\')&&(l=l.replace(\'"muteOnStart":true\',\'"muteOnStart":false\')).includes(\'"youThereRenderer":\')&&(l=l.replace(\'"youThereRenderer":\',\'"no_youThereRenderer":\')),l.replace(/"(adSlots|playerAds)":/g,\'"no_ads":\')),t[0]=n}catch(e){}var l;return Reflect.apply(e,r,t)}},r={apply:(r,t,n)=>{const l=n[0];return"function"==typeof l&&l.toString().includes(".next(")&&(n[0]=new Proxy(l,e)),Reflect.apply(r,t,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,r)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6538866de1d555f6662421f37564b39c"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, r, t) => {
                        const n = t[0];
                        if ("string" == typeof n?.value && n.value.includes("playerResponse")) try {
                            n.value = (l = n.value, (location.href.includes("/watch") || l.includes("cards") && !l.includes('"miniplayer"')) && l.includes('"muteOnStart":true') && (l = l.replace('"muteOnStart":true', '"muteOnStart":false')).includes('"youThereRenderer":') && (l = l.replace('"youThereRenderer":', '"no_youThereRenderer":')), 
                            l.replace(/"(adSlots|playerAds)":/g, '"no_ads":')), t[0] = n;
                        } catch (e) {}
                        var l;
                        return Reflect.apply(e, r, t);
                    }
                }, r = {
                    apply: (r, t, n) => {
                        const l = n[0];
                        return "function" == typeof l && l.toString().includes(".next(") && (n[0] = new Proxy(l, e)), 
                        Reflect.apply(r, t, n);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, r);
            })();
            Object.defineProperty(Window.prototype.toString, "6538866de1d555f6662421f37564b39c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6538866de1d555f6662421f37564b39c" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,o)=>{const n=Reflect.apply(e,t,o);if(n?.responseContext)try{delete n.adSlots,delete n.playerAds,n.playerConfig?.audioConfig?.muteOnStart&&(location.href.includes("/watch")||n.cards&&!n.playabilityStatus?.miniplayer)&&(delete n.playerConfig.audioConfig.muteOnStart,n.messages[0]?.youThereRenderer&&delete n.messages[0].youThereRenderer)}catch(e){}return n}},t={apply:(t,o,n)=>{const r=n[0];return"function"==typeof r&&r.toString().includes("jspbResponseCtor")&&(n[0]=new Proxy(r,e)),Reflect.apply(t,o,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cc07a31f6361dd25da8c32728ac08e9f"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, o) => {
                        const n = Reflect.apply(e, t, o);
                        if (n?.responseContext) try {
                            delete n.adSlots, delete n.playerAds, n.playerConfig?.audioConfig?.muteOnStart && (location.href.includes("/watch") || n.cards && !n.playabilityStatus?.miniplayer) && (delete n.playerConfig.audioConfig.muteOnStart, 
                            n.messages[0]?.youThereRenderer && delete n.messages[0].youThereRenderer);
                        } catch (e) {}
                        return n;
                    }
                }, t = {
                    apply: (t, o, n) => {
                        const r = n[0];
                        return "function" == typeof r && r.toString().includes("jspbResponseCtor") && (n[0] = new Proxy(r, e)), 
                        Reflect.apply(t, o, n);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, t);
            })();
            Object.defineProperty(Window.prototype.toString, "cc07a31f6361dd25da8c32728ac08e9f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cc07a31f6361dd25da8c32728ac08e9f" due to: ' + error);
        }
    },
    "(()=>{let t=!1;const i={apply:(i,n,a)=>{try{!t&&window.ytInitialData&&(window.ytInitialData=JSON.parse(JSON.stringify(window.ytInitialData)),t=!0)}catch(t){}return Reflect.apply(i,n,a)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,i)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4fb0d297efd8c2d39f1903c82ecb7031"] === flag) {
                return;
            }
            (() => {
                let t = !1;
                const i = {
                    apply: (i, n, a) => {
                        try {
                            !t && window.ytInitialData && (window.ytInitialData = JSON.parse(JSON.stringify(window.ytInitialData)), 
                            t = !0);
                        } catch (t) {}
                        return Reflect.apply(i, n, a);
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, i);
            })();
            Object.defineProperty(Window.prototype.toString, "4fb0d297efd8c2d39f1903c82ecb7031", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4fb0d297efd8c2d39f1903c82ecb7031" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,n)=>{if(location.href.includes("/shorts/")||location.href.includes("youtube.com/tv")||location.href.includes("youtube.com/embed/"))return Reflect.apply(t,e,n);try{const a=n[0];if(!a?.context?.client)return Reflect.apply(t,e,n);const o=String(Date.now());a.playbackContext&&void 0===a.playbackContext.adPlaybackContext&&(a.playbackContext.contentPlaybackContext.lactMilliseconds=o),a.playerRequest&&void 0===a.playerRequest.playbackContext?.adPlaybackContext&&(a.playerRequest.playbackContext.contentPlaybackContext.lactMilliseconds=o),n[0]=a}catch(t){}return Reflect.apply(t,e,n)}};window.JSON.stringify=new Proxy(window.JSON.stringify,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ab30cf651bf4f7660cc398c45c285c13"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, n) => {
                        if (location.href.includes("/shorts/") || location.href.includes("youtube.com/tv") || location.href.includes("youtube.com/embed/")) return Reflect.apply(t, e, n);
                        try {
                            const a = n[0];
                            if (!a?.context?.client) return Reflect.apply(t, e, n);
                            const o = String(Date.now());
                            a.playbackContext && void 0 === a.playbackContext.adPlaybackContext && (a.playbackContext.contentPlaybackContext.lactMilliseconds = o), 
                            a.playerRequest && void 0 === a.playerRequest.playbackContext?.adPlaybackContext && (a.playerRequest.playbackContext.contentPlaybackContext.lactMilliseconds = o), 
                            n[0] = a;
                        } catch (t) {}
                        return Reflect.apply(t, e, n);
                    }
                };
                window.JSON.stringify = new Proxy(window.JSON.stringify, t);
            })();
            Object.defineProperty(Window.prototype.toString, "ab30cf651bf4f7660cc398c45c285c13", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ab30cf651bf4f7660cc398c45c285c13" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelector(\'astro-island[uid][props*="https://file-upload.org/file-redirect.html?url=https"]\'),e=t?.getAttribute("props")?.match(/https:\\/\\/file-upload\\.org\\/file-redirect\\.html\\?url=[^"]+/)?.[0];e&&location.assign(e)}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["896d4e7886873212c99d5f3f2e740d13"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    const t = document.querySelector('astro-island[uid][props*="https://file-upload.org/file-redirect.html?url=https"]'), e = t?.getAttribute("props")?.match(/https:\/\/file-upload\.org\/file-redirect\.html\?url=[^"]+/)?.[0];
                    e && location.assign(e);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "896d4e7886873212c99d5f3f2e740d13", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "896d4e7886873212c99d5f3f2e740d13" due to: ' + error);
        }
    },
    '(()=>{let t=!1;document.addEventListener("click",(e=>{const s=e.target.matches(".episode-item, .tray-slide, .top10-post")?e.target:e.target.closest(".episode-item, .tray-slide, .top10-post");s&&!t&&(((t,e=1,s=10)=>{if(!t||e<=0)return;let i=0;const o=()=>{i>=e||(t.click(),i++,i<e&&setTimeout(o,s))};setTimeout(o,s)})(s,2),t=!0)}),!0)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ddd60bb3848c953e31a4308a3fd1de65"] === flag) {
                return;
            }
            (() => {
                let t = !1;
                document.addEventListener("click", (e => {
                    const s = e.target.matches(".episode-item, .tray-slide, .top10-post") ? e.target : e.target.closest(".episode-item, .tray-slide, .top10-post");
                    s && !t && (((t, e = 1, s = 10) => {
                        if (!t || e <= 0) return;
                        let i = 0;
                        const o = () => {
                            i >= e || (t.click(), i++, i < e && setTimeout(o, s));
                        };
                        setTimeout(o, s);
                    })(s, 2), t = !0);
                }), !0);
            })();
            Object.defineProperty(Window.prototype.toString, "ddd60bb3848c953e31a4308a3fd1de65", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ddd60bb3848c953e31a4308a3fd1de65" due to: ' + error);
        }
    },
    '(()=>{let e=0;const t=new WeakSet,n=t=>{const n=t?.currentTarget||t?.target;if(n)try{if(e>0&&n.currentTime<e)return void(n.currentTime=e)}catch(e){}},r={apply:(r,c,i)=>{try{const r=c.currentSrc;e>0&&c.currentTime<e&&r?.includes("livestitches")&&(c.currentTime=e,t.has(c)||(c.addEventListener("timeupdate",n),t.add(c)))}catch(e){}return Reflect.apply(r,c,i)}};window.HTMLMediaElement.prototype.play=new Proxy(window.HTMLMediaElement.prototype.play,r);const c={apply:(t,n,r)=>{try{const t=r[1]?.response?.result;if(t){const n=t?.timeline?.[0];n&&"ad"===n?.type&&(e=n?.duration||0,delete r[1].response.result.timeline)}}catch(e){}return Reflect.apply(t,n,r)}};window.Function.prototype.call=new Proxy(window.Function.prototype.call,c)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1c396fe6bd39e959a9fa82c669329bca"] === flag) {
                return;
            }
            (() => {
                let e = 0;
                const t = new WeakSet, n = t => {
                    const n = t?.currentTarget || t?.target;
                    if (n) try {
                        if (e > 0 && n.currentTime < e) return void (n.currentTime = e);
                    } catch (e) {}
                }, r = {
                    apply: (r, c, i) => {
                        try {
                            const r = c.currentSrc;
                            e > 0 && c.currentTime < e && r?.includes("livestitches") && (c.currentTime = e, 
                            t.has(c) || (c.addEventListener("timeupdate", n), t.add(c)));
                        } catch (e) {}
                        return Reflect.apply(r, c, i);
                    }
                };
                window.HTMLMediaElement.prototype.play = new Proxy(window.HTMLMediaElement.prototype.play, r);
                const c = {
                    apply: (t, n, r) => {
                        try {
                            const t = r[1]?.response?.result;
                            if (t) {
                                const n = t?.timeline?.[0];
                                n && "ad" === n?.type && (e = n?.duration || 0, delete r[1].response.result.timeline);
                            }
                        } catch (e) {}
                        return Reflect.apply(t, n, r);
                    }
                };
                window.Function.prototype.call = new Proxy(window.Function.prototype.call, c);
            })();
            Object.defineProperty(Window.prototype.toString, "1c396fe6bd39e959a9fa82c669329bca", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1c396fe6bd39e959a9fa82c669329bca" due to: ' + error);
        }
    },
    '(()=>{const t="/file/";if(!location.pathname.includes(t))return;const e=(new Date).toISOString(),n=location.pathname.split(t)[1];document.cookie=`adsRedirect_${n}=${e}; path=/;`})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2e6eacfae44118fb1fa0397d0470917e"] === flag) {
                return;
            }
            (() => {
                const t = "/file/";
                if (!location.pathname.includes(t)) return;
                const e = (new Date).toISOString(), n = location.pathname.split(t)[1];
                document.cookie = `adsRedirect_${n}=${e}; path=/;`;
            })();
            Object.defineProperty(Window.prototype.toString, "2e6eacfae44118fb1fa0397d0470917e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2e6eacfae44118fb1fa0397d0470917e" due to: ' + error);
        }
    },
    '(()=>{const e={apply:async(n,o,t)=>(t[0]?.toString?.().includes("function () { [native code] }")&&(t[0]=new Proxy(t[0],e)),"object"==typeof t[0]&&t[0].linearAdBreaks&&(t[0].linearAdBreaks=[]),Reflect.apply(n,o,t))},n={construct:(n,o,t)=>{const r=o[0],c=r?.toString(),i=c?.includes("ad breaks");return i&&(o[0]=new Proxy(r,e)),Reflect.construct(n,o,t)}};window.Promise=new Proxy(window.Promise,n)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f9fdd7bf50948a3a4434700b9afa2851"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: async (n, o, t) => (t[0]?.toString?.().includes("function () { [native code] }") && (t[0] = new Proxy(t[0], e)), 
                    "object" == typeof t[0] && t[0].linearAdBreaks && (t[0].linearAdBreaks = []), Reflect.apply(n, o, t))
                }, n = {
                    construct: (n, o, t) => {
                        const r = o[0], c = r?.toString(), i = c?.includes("ad breaks");
                        return i && (o[0] = new Proxy(r, e)), Reflect.construct(n, o, t);
                    }
                };
                window.Promise = new Proxy(window.Promise, n);
            })();
            Object.defineProperty(Window.prototype.toString, "f9fdd7bf50948a3a4434700b9afa2851", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f9fdd7bf50948a3a4434700b9afa2851" due to: ' + error);
        }
    },
    '(()=>{const e=!1,r=\':is(aside, div[role="complementary"])\',t=/"ads[A-Z]\\w*"\\s*:/,o=Reflect.apply,n=e=>{if(!e.matches(r))return!1;for(const r of e.querySelectorAll(\':scope > script[type="application/json"]\'))if(t.test(r.textContent))return!0;return!1},p=e=>{if(1===e?.nodeType&&n(e))return!0;if(1!==e?.nodeType&&11!==e?.nodeType)return!1;for(const t of e.querySelectorAll(r))if(n(t))return!0;return!1};window.Element.prototype.replaceChildren=new Proxy(window.Element.prototype.replaceChildren,{apply:(r,t,n)=>{try{for(const e of n)if(p(e))return void 0}catch(r){e}return o(r,t,n)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["18d6cf6971be6845e7549a55856cac3a"] === flag) {
                return;
            }
            (() => {
                const e = !1, r = ':is(aside, div[role="complementary"])', t = /"ads[A-Z]\w*"\s*:/, o = Reflect.apply, n = e => {
                    if (!e.matches(r)) return !1;
                    for (const r of e.querySelectorAll(':scope > script[type="application/json"]')) if (t.test(r.textContent)) return !0;
                    return !1;
                }, p = e => {
                    if (1 === e?.nodeType && n(e)) return !0;
                    if (1 !== e?.nodeType && 11 !== e?.nodeType) return !1;
                    for (const t of e.querySelectorAll(r)) if (n(t)) return !0;
                    return !1;
                };
                window.Element.prototype.replaceChildren = new Proxy(window.Element.prototype.replaceChildren, {
                    apply: (r, t, n) => {
                        try {
                            for (const e of n) if (p(e)) return void 0;
                        } catch (r) {
                            e;
                        }
                        return o(r, t, n);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "18d6cf6971be6845e7549a55856cac3a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "18d6cf6971be6845e7549a55856cac3a" due to: ' + error);
        }
    },
    'function GoogleIma3Dai(){const t=t=>"object"==typeof t&&null!==t,e=e=>{if(!t(e))return{};const s={},i=Object.keys(e);for(let t=0;t<i.length;t+=1){const o=i[t];s[o]=String(e[o])}return s},s=t=>"string"==typeof t&&t.length>0?t:null,i=t=>{t.listeners=new Map},o=t=>{if("string"==typeof t)return[t];if(!Array.isArray(t))return[];const e=[];for(let s=0;s<t.length;s+=1){const i=t[s];"string"==typeof i&&e.push(i)}return e},n=(s,i)=>{s.adTagParameters={},s.apiKey=null,s.authToken=null,s.format="hls",s.networkCode=null,s.omidAccessModeRules=null,s.streamActivityMonitorId=null,s.ui={custom:null},t(i)&&Object.assign(s,i),s.adTagParameters=e(s.adTagParameters),s.ui=(e=>{if(!t(e))return{custom:null};const s=Object.assign({custom:null},e);return s.custom=t(s.custom)?s.custom:null,s})(s.ui),"string"==typeof s.format&&0!==s.format.length||(s.format="hls")},r=(t,e)=>{n(t,e),t.customAssetKey="string"==typeof t.customAssetKey?t.customAssetKey:""},a=function(){i(this)};a.prototype.addEventListener=function(t,e){if("function"!=typeof e)return;const s=o(t);for(let t=0;t<s.length;t+=1){const i=s[t];this.listeners.has(i)||this.listeners.set(i,new Set);const o=this.listeners.get(i);o&&o.add(e)}},a.prototype.removeEventListener=function(t,e){if("function"!=typeof e)return;const s=o(t);for(let t=0;t<s.length;t+=1){const i=this.listeners.get(s[t]);i&&i.delete(e)}},a.prototype.dispatchEvent=function(t){const e=this.listeners.get(t.type);if(e)for(const s of Array.from(e))try{s(t)}catch(t){logMessage(source,t)}};const c=function(t){n(this,t)};c.StreamFormat={DASH:"dash",HLS:"hls"};const u=function(t){n(this,t),this.assetKey="string"==typeof this.assetKey?this.assetKey:""};Object.setPrototypeOf(u.prototype,c.prototype);const h=function(t){r(this,t)};Object.setPrototypeOf(h.prototype,c.prototype);const l=function(e){r(this,e),this.liveStreamEventId="string"==typeof this.liveStreamEventId?this.liveStreamEventId:"",this.oAuthToken="string"==typeof this.oAuthToken?this.oAuthToken:null,this.projectNumber="string"==typeof this.projectNumber?this.projectNumber:null,this.region="string"==typeof this.region?this.region:null,this.videoStitcherSessionOptions=t(this.videoStitcherSessionOptions)?this.videoStitcherSessionOptions:null};Object.setPrototypeOf(l.prototype,h.prototype);const p=function(e){n(this,e),this.adTagUrl="string"==typeof this.adTagUrl?this.adTagUrl:"",this.contentSourceUrl="string"==typeof this.contentSourceUrl?this.contentSourceUrl:"",this.oAuthToken="string"==typeof this.oAuthToken?this.oAuthToken:null,this.projectNumber="string"==typeof this.projectNumber?this.projectNumber:null,this.region="string"==typeof this.region?this.region:null,this.videoStitcherSessionOptions=t(this.videoStitcherSessionOptions)?this.videoStitcherSessionOptions:null,this.vodConfigId="string"==typeof this.vodConfigId?this.vodConfigId:""};Object.setPrototypeOf(p.prototype,c.prototype);const d=function(t){n(this,t),this.contentSourceId="string"==typeof this.contentSourceId?this.contentSourceId:"",this.videoId="string"==typeof this.videoId?this.videoId:""};Object.setPrototypeOf(d.prototype,c.prototype);const f=function(e){this.adPeriodData=null,this.adProgressData=null,this.cuepoints=[],this.errorMessage=null,this.manifestFormat="HLS",this.streamId=null,this.subtitles=[],this.url="",t(e)&&Object.assign(this,e)},m=function(t,e,s){this.type=t,this.streamData=e||new f,this.ad=s||null};m.Type={AD_BREAK_ENDED:"adBreakEnded",AD_BREAK_STARTED:"adBreakStarted",AD_PERIOD_ENDED:"adPeriodEnded",AD_PERIOD_STARTED:"adPeriodStarted",AD_PROGRESS:"adProgress",CLICK:"click",COMPLETE:"complete",CUEPOINTS_CHANGED:"cuepointsChanged",ERROR:"error",FIRST_QUARTILE:"firstquartile",HIDE_AD_UI:"hideAdUi",LOADED:"loaded",MIDPOINT:"midpoint",PAUSED:"paused",RESUMED:"resumed",SHOW_AD_UI:"showAdUi",SKIPPABLE_STATE_CHANGED:"skippableStateChanged",SKIPPED:"skip",STARTED:"started",STREAM_INITIALIZED:"streamInitialized",THIRD_QUARTILE:"thirdquartile",VIDEO_CLICKED:"videoClicked"},m.prototype.getAd=function(){return this.ad},m.prototype.getStreamData=function(){return this.streamData};const g=function(){this.locale="en"};g.prototype.getLocale=function(){return this.locale},g.prototype.setLocale=function(t){"string"==typeof t&&t.length>0&&(this.locale=t)};const y={EXTERNAL:"external",NOT_SUPPORTED:"notSupported"},S=function(e){this.altText="",this.height=0,this.url="",this.width=0,t(e)&&Object.assign(this,e),this.altText=s(this.altText)||"",this.height="number"==typeof this.height?this.height:0,this.url=s(this.url)||"",this.width="number"==typeof this.width?this.width:0},T=function(e){if(this.clickable=!1,this.required=!1,t(e)&&Object.assign(this,e),this.clickable=Boolean(this.clickable),this.required=Boolean(this.required),Array.isArray(this.imageVariants)){const t=[];for(let e=0;e<this.imageVariants.length;e+=1)t.push(new S(this.imageVariants[e]));this.imageVariants=t}};T.UiImage=S;const E=function(e){this.aboutThisAdSupport=!1,this.clickThroughNavigation=y.NOT_SUPPORTED,this.skippableSupport=!1,t(e)&&Object.assign(this,e),this.aboutThisAdSupport=Boolean(this.aboutThisAdSupport),this.clickThroughNavigation=this.clickThroughNavigation===y.EXTERNAL?y.EXTERNAL:y.NOT_SUPPORTED,this.skippableSupport=Boolean(this.skippableSupport)};E.ClickThroughNavigation=y;const I=new WeakMap,A=function(e){I.set(this,t(e)?e:{})};A.prototype.onClick=function(t,e){const s=I.get(this);s&&"function"==typeof s.onClick&&s.onClick(t,e)},A.prototype.setVisibleElements=function(t){const e=I.get(this);e&&"function"==typeof e.setVisibleElements&&e.setVisibleElements(t)},A.prototype.getConfig=function(){const t=I.get(this);if(!t||"function"!=typeof t.getConfig)return new Map;const e=t.getConfig();return e instanceof Map?e:new Map},A.UiData=T,A.UiKey={ABOUT_THIS_AD_FALLBACK_IMAGE:"aboutThisAdFallbackImage",ABOUT_THIS_AD_ICON:"aboutThisAdIcon",AD_TITLE:"adTitle",ATTRIBUTION:"attribution",AUTHOR_ICON:"authorIcon",AUTHOR_TITLE:"authorTitle",CALL_TO_ACTION:"callToAction",PRE_SKIP:"preSkip",SKIP_BUTTON:"skipButton",VIDEO_OVERLAY:"videoOverlay"},A.UiOptions=E;const v=new WeakMap,O=function(){v.set(this,{})};O.prototype.getFeatureFlags=function(){return(t=>{const e=v.get(t);if(e)return e;const s={};return v.set(t,s),s})(this)},O.prototype.setFeatureFlags=function(t){v.set(this,Object.assign({},t))};const D=t=>{const e=t;return"string"==typeof e.assetKey&&e.assetKey.length>0},b=t=>{const e=t;return"string"==typeof e.networkCode&&e.networkCode.length>0&&"string"==typeof e.customAssetKey&&e.customAssetKey.length>0},k=t=>{const e=t;return"string"==typeof e.contentSourceId&&e.contentSourceId.length>0&&"string"==typeof e.videoId&&e.videoId.length>0},R=t=>{const e=t,s=t,i=t,o=t;return"string"==typeof i.vodConfigId&&i.vodConfigId.length>0?`mock-video-stitcher-vod-${i.vodConfigId}`:"string"==typeof i.contentSourceUrl&&i.contentSourceUrl.length>0?"mock-video-stitcher-vod":"string"==typeof s.liveStreamEventId&&s.liveStreamEventId.length>0?`mock-video-stitcher-live-${s.liveStreamEventId}`:"string"==typeof e.assetKey&&e.assetKey.length>0?`mock-live-${e.assetKey}`:"string"==typeof o.videoId&&o.videoId.length>0?`mock-vod-${o.videoId}`:"mock-stream"},_=t=>"string"==typeof t.format&&"dash"===t.format.toLowerCase()?"DASH":"HLS",w=(e,s,i,o)=>{const n=new f({cuepoints:s.slice(),errorMessage:i,manifestFormat:_(e),streamId:R(e),url:""});return t(o)&&Object.assign(n,o),n},U=(t,e)=>{const s=Object.keys(e.adTagParameters);for(let i=0;i<s.length;i+=1){const o=s[i];t.searchParams.set(o,e.adTagParameters[o])}e.apiKey&&t.searchParams.set("api-key",e.apiKey),e.authToken&&t.searchParams.set("auth-token",e.authToken),e.streamActivityMonitorId&&t.searchParams.set("dai-sam-id",e.streamActivityMonitorId)},P=(t,e)=>{const s=new URL(`${e}/ssai/event/${t.assetKey}/streams`);return U(s,t),s.toString()},C=(t,e)=>{const s=new URL(`${e}/ssai/pods/api/v1/network/${t.networkCode}/custom_asset/${t.customAssetKey}/stream`),i="dash"===t.format.toLowerCase()?"dash":"hls";return U(s,t),s.searchParams.set("manifest-type",i),s.toString()},L=(t,e)=>{const s="dash"===t.format.toLowerCase()?"dash":"hls",i=new URL(`${e}/ondemand/${s}/content/${t.contentSourceId}/vid/${t.videoId}/streams`);return U(i,t),i.toString()},M="https://dai.google.com",K="https://pubads.g.doubleclick.net",N=(t,e,i)=>{const o=s(i.pod_manifest_url)||s(i.podManifestUrl)||"",n=s(i.stream_id)||s(i.streamId),r=s(i.stream_manifest)||s(i.streamUrl)||o||"",a=(t=>s(t.errorMessage)||s(t.error_message))(i),c=r.length>0||null!==n&&n.length>0,u=a||(c?null:"Stream initialization response missing stream URL"),h=s(i.manifest_format)||s(i.manifestFormat)||_(t),l=n||R(t),p=Array.isArray(i.subtitles)?i.subtitles:[];return w(t,e,u,{manifestFormat:h,podManifestUrl:o,pod_manifest_url:o,streamId:l,subtitles:p,url:r})},j=t=>{(t=>{t.adUiElement&&(t.adUiElement.style.display="none")})(t),(t=>{t.videoElement&&!t.videoElement.controls&&(t.videoElement.controls=!0)})(t)},q=function(t,e,s){i(this),this.videoElement=t||null,this.adUiElement=e||null,this.uiSettings=s||new g,this.clickElement=e||null,this.streamData=new f,this.streamMonitor={},this.streamRequest=null,this.cuepoints=[],this.lastMetadata=null,this.lastTimedMetadata=null};Object.setPrototypeOf(q.prototype,a.prototype),q.prototype.contentTimeForStreamTime=function(t){return"number"==typeof t?t:0},q.prototype.destroy=function(){this.reset()},q.prototype.focus=function(){const t=this.clickElement;if(t&&"function"==typeof t.focus)try{t.focus()}catch(t){logMessage(source,t)}},q.prototype.getAdSkippableState=function(){return!0},q.prototype.getStreamData=function(){return this.streamData},q.prototype.loadStreamMetadata=function(){j(this),this.dispatchEvent(new m(m.Type.LOADED,this.streamData))},q.prototype.onTimedMetadata=function(t){this.lastTimedMetadata=t},q.prototype.previousCuePointForStreamTime=function(t){let e=null;for(let s=0;s<this.cuepoints.length;s+=1){const i=this.cuepoints[s];"number"==typeof i.start&&(i.start<=t&&(e=i))}return e},q.prototype.processMetadata=function(t,e,s){this.lastMetadata={data:e,timestamp:s,type:t}},q.prototype.replaceAdTagParameters=function(t){this.streamRequest||(this.streamRequest=new c),this.streamRequest.adTagParameters=e(t)},q.prototype.requestStream=function(e){const s=(e=>{if(e instanceof c)return e;if(t(e)){if("string"==typeof e.liveStreamEventId)return new l(e);if("string"==typeof e.contentSourceUrl||"string"==typeof e.vodConfigId||"string"==typeof e.adTagUrl)return new p(e);if("string"==typeof e.customAssetKey)return new h(e);if("string"==typeof e.assetKey)return new u(e);if("string"==typeof e.contentSourceId||"string"==typeof e.videoId)return new d(e)}return new c})(e);this.streamRequest=s;const i=(t,e)=>{var s;this.streamData=e,(t=>t===m.Type.LOADED||t===m.Type.STREAM_INITIALIZED)(t)&&j(this),s=()=>{this.dispatchEvent(new m(m.Type.STREAM_INITIALIZED,e)),this.dispatchEvent(new m(t,e))},"function"!=typeof requestAnimationFrame?setTimeout(s,0):requestAnimationFrame(s)};if(!(t=>D(t)||b(t)||(t=>{const e=t;return"string"==typeof e.liveStreamEventId&&e.liveStreamEventId.length>0})(t)||(t=>{const e=t,s="string"==typeof e.contentSourceUrl&&e.contentSourceUrl.length>0,i="string"==typeof e.vodConfigId&&e.vodConfigId.length>0;return s||i})(t)||k(t))(s))return void i(m.Type.ERROR,w(s,this.cuepoints,"Missing stream request identifiers"));const o=(t=>b(t)?[C(t,M),C(t,K)]:D(t)?[P(t,M),P(t,K)]:k(t)?[L(t,M),L(t,K)]:[])(s);if(o.length>0){const e=s,n=async s=>{try{const n=await fetch(o[s],{method:"POST",credentials:"include"}),r=await(async e=>{const s=e;if(s&&!1===s.ok)throw new Error(`Stream initialization failed with status ${String(s.status||0)}`);if(s&&"function"==typeof s.json){const e=await s.json();return t(e)?e:{}}return t(e)?e:{}})(n);if(this.streamRequest!==e)return;const a=N(e,this.cuepoints,r),c=a.errorMessage?m.Type.ERROR:m.Type.LOADED;i(c,a)}catch(r){if(this.streamRequest!==e)return;if(s+1<o.length)return void await n(s+1);i(m.Type.ERROR,w(e,this.cuepoints,(e=>t(e)&&"string"==typeof e.message&&e.message.length>0?e.message:"Stream initialization failed")(r)))}};n(0)}else i(m.Type.LOADED,w(s,this.cuepoints,null))},q.prototype.reset=function(){this.cuepoints=[],this.lastMetadata=null,this.lastTimedMetadata=null,this.streamData=new f,this.streamRequest=null},q.prototype.setClickElement=function(t){this.adUiElement||(this.clickElement=t)},q.prototype.streamTimeForContentTime=function(t){return"number"==typeof t?t:0};const B={customUi:{UiOptions:function(e){this.aboutThisAdSupport=!1,this.skippableSupport=!1,t(e)&&Object.assign(this,e),this.aboutThisAdSupport=Boolean(this.aboutThisAdSupport),this.skippableSupport=Boolean(this.skippableSupport)}},DaiSdkSettings:new O,LiveStreamRequest:u,PodStreamRequest:h,StreamData:f,StreamEvent:m,StreamManager:q,StreamRequest:c,ui:A,UiSettings:g,VideoStitcherLiveStreamRequest:l,VideoStitcherVodStreamRequest:p,VODStreamRequest:d},F=window,H=t(F.google)?F.google:{};t(F.google)||(F.google=H);const V=t(H.ima)?H.ima:{};H.ima=V;const $=t(V.dai)?V.dai:{};V.dai=$;const G=t($.api)?$.api:{};$.api=G,Object.assign(G,B)}GoogleIma3Dai();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f04ef6cd522f3510fa620286ce3aaa5e"] === flag) {
                return;
            }
            function GoogleIma3Dai() {
                const t = t => "object" == typeof t && null !== t, e = e => {
                    if (!t(e)) return {};
                    const s = {}, i = Object.keys(e);
                    for (let t = 0; t < i.length; t += 1) {
                        const o = i[t];
                        s[o] = String(e[o]);
                    }
                    return s;
                }, s = t => "string" == typeof t && t.length > 0 ? t : null, i = t => {
                    t.listeners = new Map;
                }, o = t => {
                    if ("string" == typeof t) return [ t ];
                    if (!Array.isArray(t)) return [];
                    const e = [];
                    for (let s = 0; s < t.length; s += 1) {
                        const i = t[s];
                        "string" == typeof i && e.push(i);
                    }
                    return e;
                }, n = (s, i) => {
                    s.adTagParameters = {}, s.apiKey = null, s.authToken = null, s.format = "hls", s.networkCode = null, 
                    s.omidAccessModeRules = null, s.streamActivityMonitorId = null, s.ui = {
                        custom: null
                    }, t(i) && Object.assign(s, i), s.adTagParameters = e(s.adTagParameters), s.ui = (e => {
                        if (!t(e)) return {
                            custom: null
                        };
                        const s = Object.assign({
                            custom: null
                        }, e);
                        return s.custom = t(s.custom) ? s.custom : null, s;
                    })(s.ui), "string" == typeof s.format && 0 !== s.format.length || (s.format = "hls");
                }, r = (t, e) => {
                    n(t, e), t.customAssetKey = "string" == typeof t.customAssetKey ? t.customAssetKey : "";
                }, a = function() {
                    i(this);
                };
                a.prototype.addEventListener = function(t, e) {
                    if ("function" != typeof e) return;
                    const s = o(t);
                    for (let t = 0; t < s.length; t += 1) {
                        const i = s[t];
                        this.listeners.has(i) || this.listeners.set(i, new Set);
                        const o = this.listeners.get(i);
                        o && o.add(e);
                    }
                }, a.prototype.removeEventListener = function(t, e) {
                    if ("function" != typeof e) return;
                    const s = o(t);
                    for (let t = 0; t < s.length; t += 1) {
                        const i = this.listeners.get(s[t]);
                        i && i.delete(e);
                    }
                }, a.prototype.dispatchEvent = function(t) {
                    const e = this.listeners.get(t.type);
                    if (e) for (const s of Array.from(e)) try {
                        s(t);
                    } catch (t) {
                        logMessage(source, t);
                    }
                };
                const c = function(t) {
                    n(this, t);
                };
                c.StreamFormat = {
                    DASH: "dash",
                    HLS: "hls"
                };
                const u = function(t) {
                    n(this, t), this.assetKey = "string" == typeof this.assetKey ? this.assetKey : "";
                };
                Object.setPrototypeOf(u.prototype, c.prototype);
                const h = function(t) {
                    r(this, t);
                };
                Object.setPrototypeOf(h.prototype, c.prototype);
                const l = function(e) {
                    r(this, e), this.liveStreamEventId = "string" == typeof this.liveStreamEventId ? this.liveStreamEventId : "", 
                    this.oAuthToken = "string" == typeof this.oAuthToken ? this.oAuthToken : null, this.projectNumber = "string" == typeof this.projectNumber ? this.projectNumber : null, 
                    this.region = "string" == typeof this.region ? this.region : null, this.videoStitcherSessionOptions = t(this.videoStitcherSessionOptions) ? this.videoStitcherSessionOptions : null;
                };
                Object.setPrototypeOf(l.prototype, h.prototype);
                const p = function(e) {
                    n(this, e), this.adTagUrl = "string" == typeof this.adTagUrl ? this.adTagUrl : "", 
                    this.contentSourceUrl = "string" == typeof this.contentSourceUrl ? this.contentSourceUrl : "", 
                    this.oAuthToken = "string" == typeof this.oAuthToken ? this.oAuthToken : null, this.projectNumber = "string" == typeof this.projectNumber ? this.projectNumber : null, 
                    this.region = "string" == typeof this.region ? this.region : null, this.videoStitcherSessionOptions = t(this.videoStitcherSessionOptions) ? this.videoStitcherSessionOptions : null, 
                    this.vodConfigId = "string" == typeof this.vodConfigId ? this.vodConfigId : "";
                };
                Object.setPrototypeOf(p.prototype, c.prototype);
                const d = function(t) {
                    n(this, t), this.contentSourceId = "string" == typeof this.contentSourceId ? this.contentSourceId : "", 
                    this.videoId = "string" == typeof this.videoId ? this.videoId : "";
                };
                Object.setPrototypeOf(d.prototype, c.prototype);
                const f = function(e) {
                    this.adPeriodData = null, this.adProgressData = null, this.cuepoints = [], this.errorMessage = null, 
                    this.manifestFormat = "HLS", this.streamId = null, this.subtitles = [], this.url = "", 
                    t(e) && Object.assign(this, e);
                }, m = function(t, e, s) {
                    this.type = t, this.streamData = e || new f, this.ad = s || null;
                };
                m.Type = {
                    AD_BREAK_ENDED: "adBreakEnded",
                    AD_BREAK_STARTED: "adBreakStarted",
                    AD_PERIOD_ENDED: "adPeriodEnded",
                    AD_PERIOD_STARTED: "adPeriodStarted",
                    AD_PROGRESS: "adProgress",
                    CLICK: "click",
                    COMPLETE: "complete",
                    CUEPOINTS_CHANGED: "cuepointsChanged",
                    ERROR: "error",
                    FIRST_QUARTILE: "firstquartile",
                    HIDE_AD_UI: "hideAdUi",
                    LOADED: "loaded",
                    MIDPOINT: "midpoint",
                    PAUSED: "paused",
                    RESUMED: "resumed",
                    SHOW_AD_UI: "showAdUi",
                    SKIPPABLE_STATE_CHANGED: "skippableStateChanged",
                    SKIPPED: "skip",
                    STARTED: "started",
                    STREAM_INITIALIZED: "streamInitialized",
                    THIRD_QUARTILE: "thirdquartile",
                    VIDEO_CLICKED: "videoClicked"
                }, m.prototype.getAd = function() {
                    return this.ad;
                }, m.prototype.getStreamData = function() {
                    return this.streamData;
                };
                const g = function() {
                    this.locale = "en";
                };
                g.prototype.getLocale = function() {
                    return this.locale;
                }, g.prototype.setLocale = function(t) {
                    "string" == typeof t && t.length > 0 && (this.locale = t);
                };
                const y = {
                    EXTERNAL: "external",
                    NOT_SUPPORTED: "notSupported"
                }, S = function(e) {
                    this.altText = "", this.height = 0, this.url = "", this.width = 0, t(e) && Object.assign(this, e), 
                    this.altText = s(this.altText) || "", this.height = "number" == typeof this.height ? this.height : 0, 
                    this.url = s(this.url) || "", this.width = "number" == typeof this.width ? this.width : 0;
                }, T = function(e) {
                    if (this.clickable = !1, this.required = !1, t(e) && Object.assign(this, e), this.clickable = Boolean(this.clickable), 
                    this.required = Boolean(this.required), Array.isArray(this.imageVariants)) {
                        const t = [];
                        for (let e = 0; e < this.imageVariants.length; e += 1) t.push(new S(this.imageVariants[e]));
                        this.imageVariants = t;
                    }
                };
                T.UiImage = S;
                const E = function(e) {
                    this.aboutThisAdSupport = !1, this.clickThroughNavigation = y.NOT_SUPPORTED, this.skippableSupport = !1, 
                    t(e) && Object.assign(this, e), this.aboutThisAdSupport = Boolean(this.aboutThisAdSupport), 
                    this.clickThroughNavigation = this.clickThroughNavigation === y.EXTERNAL ? y.EXTERNAL : y.NOT_SUPPORTED, 
                    this.skippableSupport = Boolean(this.skippableSupport);
                };
                E.ClickThroughNavigation = y;
                const I = new WeakMap, A = function(e) {
                    I.set(this, t(e) ? e : {});
                };
                A.prototype.onClick = function(t, e) {
                    const s = I.get(this);
                    s && "function" == typeof s.onClick && s.onClick(t, e);
                }, A.prototype.setVisibleElements = function(t) {
                    const e = I.get(this);
                    e && "function" == typeof e.setVisibleElements && e.setVisibleElements(t);
                }, A.prototype.getConfig = function() {
                    const t = I.get(this);
                    if (!t || "function" != typeof t.getConfig) return new Map;
                    const e = t.getConfig();
                    return e instanceof Map ? e : new Map;
                }, A.UiData = T, A.UiKey = {
                    ABOUT_THIS_AD_FALLBACK_IMAGE: "aboutThisAdFallbackImage",
                    ABOUT_THIS_AD_ICON: "aboutThisAdIcon",
                    AD_TITLE: "adTitle",
                    ATTRIBUTION: "attribution",
                    AUTHOR_ICON: "authorIcon",
                    AUTHOR_TITLE: "authorTitle",
                    CALL_TO_ACTION: "callToAction",
                    PRE_SKIP: "preSkip",
                    SKIP_BUTTON: "skipButton",
                    VIDEO_OVERLAY: "videoOverlay"
                }, A.UiOptions = E;
                const v = new WeakMap, O = function() {
                    v.set(this, {});
                };
                O.prototype.getFeatureFlags = function() {
                    return (t => {
                        const e = v.get(t);
                        if (e) return e;
                        const s = {};
                        return v.set(t, s), s;
                    })(this);
                }, O.prototype.setFeatureFlags = function(t) {
                    v.set(this, Object.assign({}, t));
                };
                const D = t => {
                    const e = t;
                    return "string" == typeof e.assetKey && e.assetKey.length > 0;
                }, b = t => {
                    const e = t;
                    return "string" == typeof e.networkCode && e.networkCode.length > 0 && "string" == typeof e.customAssetKey && e.customAssetKey.length > 0;
                }, k = t => {
                    const e = t;
                    return "string" == typeof e.contentSourceId && e.contentSourceId.length > 0 && "string" == typeof e.videoId && e.videoId.length > 0;
                }, R = t => {
                    const e = t, s = t, i = t, o = t;
                    return "string" == typeof i.vodConfigId && i.vodConfigId.length > 0 ? `mock-video-stitcher-vod-${i.vodConfigId}` : "string" == typeof i.contentSourceUrl && i.contentSourceUrl.length > 0 ? "mock-video-stitcher-vod" : "string" == typeof s.liveStreamEventId && s.liveStreamEventId.length > 0 ? `mock-video-stitcher-live-${s.liveStreamEventId}` : "string" == typeof e.assetKey && e.assetKey.length > 0 ? `mock-live-${e.assetKey}` : "string" == typeof o.videoId && o.videoId.length > 0 ? `mock-vod-${o.videoId}` : "mock-stream";
                }, _ = t => "string" == typeof t.format && "dash" === t.format.toLowerCase() ? "DASH" : "HLS", w = (e, s, i, o) => {
                    const n = new f({
                        cuepoints: s.slice(),
                        errorMessage: i,
                        manifestFormat: _(e),
                        streamId: R(e),
                        url: ""
                    });
                    return t(o) && Object.assign(n, o), n;
                }, U = (t, e) => {
                    const s = Object.keys(e.adTagParameters);
                    for (let i = 0; i < s.length; i += 1) {
                        const o = s[i];
                        t.searchParams.set(o, e.adTagParameters[o]);
                    }
                    e.apiKey && t.searchParams.set("api-key", e.apiKey), e.authToken && t.searchParams.set("auth-token", e.authToken), 
                    e.streamActivityMonitorId && t.searchParams.set("dai-sam-id", e.streamActivityMonitorId);
                }, P = (t, e) => {
                    const s = new URL(`${e}/ssai/event/${t.assetKey}/streams`);
                    return U(s, t), s.toString();
                }, C = (t, e) => {
                    const s = new URL(`${e}/ssai/pods/api/v1/network/${t.networkCode}/custom_asset/${t.customAssetKey}/stream`), i = "dash" === t.format.toLowerCase() ? "dash" : "hls";
                    return U(s, t), s.searchParams.set("manifest-type", i), s.toString();
                }, L = (t, e) => {
                    const s = "dash" === t.format.toLowerCase() ? "dash" : "hls", i = new URL(`${e}/ondemand/${s}/content/${t.contentSourceId}/vid/${t.videoId}/streams`);
                    return U(i, t), i.toString();
                }, M = "https://dai.google.com", K = "https://pubads.g.doubleclick.net", N = (t, e, i) => {
                    const o = s(i.pod_manifest_url) || s(i.podManifestUrl) || "", n = s(i.stream_id) || s(i.streamId), r = s(i.stream_manifest) || s(i.streamUrl) || o || "", a = (t => s(t.errorMessage) || s(t.error_message))(i), c = r.length > 0 || null !== n && n.length > 0, u = a || (c ? null : "Stream initialization response missing stream URL"), h = s(i.manifest_format) || s(i.manifestFormat) || _(t), l = n || R(t), p = Array.isArray(i.subtitles) ? i.subtitles : [];
                    return w(t, e, u, {
                        manifestFormat: h,
                        podManifestUrl: o,
                        pod_manifest_url: o,
                        streamId: l,
                        subtitles: p,
                        url: r
                    });
                }, j = t => {
                    (t => {
                        t.adUiElement && (t.adUiElement.style.display = "none");
                    })(t), (t => {
                        t.videoElement && !t.videoElement.controls && (t.videoElement.controls = !0);
                    })(t);
                }, q = function(t, e, s) {
                    i(this), this.videoElement = t || null, this.adUiElement = e || null, this.uiSettings = s || new g, 
                    this.clickElement = e || null, this.streamData = new f, this.streamMonitor = {}, 
                    this.streamRequest = null, this.cuepoints = [], this.lastMetadata = null, this.lastTimedMetadata = null;
                };
                Object.setPrototypeOf(q.prototype, a.prototype), q.prototype.contentTimeForStreamTime = function(t) {
                    return "number" == typeof t ? t : 0;
                }, q.prototype.destroy = function() {
                    this.reset();
                }, q.prototype.focus = function() {
                    const t = this.clickElement;
                    if (t && "function" == typeof t.focus) try {
                        t.focus();
                    } catch (t) {
                        logMessage(source, t);
                    }
                }, q.prototype.getAdSkippableState = function() {
                    return !0;
                }, q.prototype.getStreamData = function() {
                    return this.streamData;
                }, q.prototype.loadStreamMetadata = function() {
                    j(this), this.dispatchEvent(new m(m.Type.LOADED, this.streamData));
                }, q.prototype.onTimedMetadata = function(t) {
                    this.lastTimedMetadata = t;
                }, q.prototype.previousCuePointForStreamTime = function(t) {
                    let e = null;
                    for (let s = 0; s < this.cuepoints.length; s += 1) {
                        const i = this.cuepoints[s];
                        "number" == typeof i.start && (i.start <= t && (e = i));
                    }
                    return e;
                }, q.prototype.processMetadata = function(t, e, s) {
                    this.lastMetadata = {
                        data: e,
                        timestamp: s,
                        type: t
                    };
                }, q.prototype.replaceAdTagParameters = function(t) {
                    this.streamRequest || (this.streamRequest = new c), this.streamRequest.adTagParameters = e(t);
                }, q.prototype.requestStream = function(e) {
                    const s = (e => {
                        if (e instanceof c) return e;
                        if (t(e)) {
                            if ("string" == typeof e.liveStreamEventId) return new l(e);
                            if ("string" == typeof e.contentSourceUrl || "string" == typeof e.vodConfigId || "string" == typeof e.adTagUrl) return new p(e);
                            if ("string" == typeof e.customAssetKey) return new h(e);
                            if ("string" == typeof e.assetKey) return new u(e);
                            if ("string" == typeof e.contentSourceId || "string" == typeof e.videoId) return new d(e);
                        }
                        return new c;
                    })(e);
                    this.streamRequest = s;
                    const i = (t, e) => {
                        var s;
                        this.streamData = e, (t => t === m.Type.LOADED || t === m.Type.STREAM_INITIALIZED)(t) && j(this), 
                        s = () => {
                            this.dispatchEvent(new m(m.Type.STREAM_INITIALIZED, e)), this.dispatchEvent(new m(t, e));
                        }, "function" != typeof requestAnimationFrame ? setTimeout(s, 0) : requestAnimationFrame(s);
                    };
                    if (!(t => D(t) || b(t) || (t => {
                        const e = t;
                        return "string" == typeof e.liveStreamEventId && e.liveStreamEventId.length > 0;
                    })(t) || (t => {
                        const e = t, s = "string" == typeof e.contentSourceUrl && e.contentSourceUrl.length > 0, i = "string" == typeof e.vodConfigId && e.vodConfigId.length > 0;
                        return s || i;
                    })(t) || k(t))(s)) return void i(m.Type.ERROR, w(s, this.cuepoints, "Missing stream request identifiers"));
                    const o = (t => b(t) ? [ C(t, M), C(t, K) ] : D(t) ? [ P(t, M), P(t, K) ] : k(t) ? [ L(t, M), L(t, K) ] : [])(s);
                    if (o.length > 0) {
                        const e = s, n = async s => {
                            try {
                                const n = await fetch(o[s], {
                                    method: "POST",
                                    credentials: "include"
                                }), r = await (async e => {
                                    const s = e;
                                    if (s && !1 === s.ok) throw new Error(`Stream initialization failed with status ${String(s.status || 0)}`);
                                    if (s && "function" == typeof s.json) {
                                        const e = await s.json();
                                        return t(e) ? e : {};
                                    }
                                    return t(e) ? e : {};
                                })(n);
                                if (this.streamRequest !== e) return;
                                const a = N(e, this.cuepoints, r), c = a.errorMessage ? m.Type.ERROR : m.Type.LOADED;
                                i(c, a);
                            } catch (r) {
                                if (this.streamRequest !== e) return;
                                if (s + 1 < o.length) return void await n(s + 1);
                                i(m.Type.ERROR, w(e, this.cuepoints, (e => t(e) && "string" == typeof e.message && e.message.length > 0 ? e.message : "Stream initialization failed")(r)));
                            }
                        };
                        n(0);
                    } else i(m.Type.LOADED, w(s, this.cuepoints, null));
                }, q.prototype.reset = function() {
                    this.cuepoints = [], this.lastMetadata = null, this.lastTimedMetadata = null, this.streamData = new f, 
                    this.streamRequest = null;
                }, q.prototype.setClickElement = function(t) {
                    this.adUiElement || (this.clickElement = t);
                }, q.prototype.streamTimeForContentTime = function(t) {
                    return "number" == typeof t ? t : 0;
                };
                const B = {
                    customUi: {
                        UiOptions: function(e) {
                            this.aboutThisAdSupport = !1, this.skippableSupport = !1, t(e) && Object.assign(this, e), 
                            this.aboutThisAdSupport = Boolean(this.aboutThisAdSupport), this.skippableSupport = Boolean(this.skippableSupport);
                        }
                    },
                    DaiSdkSettings: new O,
                    LiveStreamRequest: u,
                    PodStreamRequest: h,
                    StreamData: f,
                    StreamEvent: m,
                    StreamManager: q,
                    StreamRequest: c,
                    ui: A,
                    UiSettings: g,
                    VideoStitcherLiveStreamRequest: l,
                    VideoStitcherVodStreamRequest: p,
                    VODStreamRequest: d
                }, F = window, H = t(F.google) ? F.google : {};
                t(F.google) || (F.google = H);
                const V = t(H.ima) ? H.ima : {};
                H.ima = V;
                const $ = t(V.dai) ? V.dai : {};
                V.dai = $;
                const G = t($.api) ? $.api : {};
                $.api = G, Object.assign(G, B);
            }
            GoogleIma3Dai();
            Object.defineProperty(Window.prototype.toString, "f04ef6cd522f3510fa620286ce3aaa5e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f04ef6cd522f3510fa620286ce3aaa5e" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(\'a[href^="https://af.gog.com/game/"]\').forEach((t=>{const e=t.getAttribute("href").replace("https://af.gog.com/","https://www.gog.com/");t.setAttribute("href",e)}))}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["639105ecfaab3d5ad7901b589aedc339"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    document.querySelectorAll('a[href^="https://af.gog.com/game/"]').forEach((t => {
                        const e = t.getAttribute("href").replace("https://af.gog.com/", "https://www.gog.com/");
                        t.setAttribute("href", e);
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "639105ecfaab3d5ad7901b589aedc339", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "639105ecfaab3d5ad7901b589aedc339" due to: ' + error);
        }
    },
    "new MutationObserver((_,o)=>{const c=document.getElementById('bookingPromo');c?.checked&&(c.click(),o.disconnect())}).observe(document,{childList:true,subtree:true});": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1b4d1beb1c6a9dd1e3de56f33c55dfcf"] === flag) {
                return;
            }
            new MutationObserver(((_, o) => {
                const c = document.getElementById("bookingPromo");
                c?.checked && (c.click(), o.disconnect());
            })).observe(document, {
                childList: true,
                subtree: true
            });
            Object.defineProperty(Window.prototype.toString, "1b4d1beb1c6a9dd1e3de56f33c55dfcf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1b4d1beb1c6a9dd1e3de56f33c55dfcf" due to: ' + error);
        }
    },
    'window.addEventListener("load",(()=>{window.stop()}));': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["30a2cb89c6bbab38b94dced993fe90d2"] === flag) {
                return;
            }
            window.addEventListener("load", (() => {
                window.stop();
            }));
            Object.defineProperty(Window.prototype.toString, "30a2cb89c6bbab38b94dced993fe90d2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "30a2cb89c6bbab38b94dced993fe90d2" due to: ' + error);
        }
    },
    '(()=>{const e={apply:(e,t,n)=>{try{const[e,r]=n,a=r?.toString();if("click"===e&&a?.includes("attached")&&t instanceof HTMLElement&&t.matches(".share-embed-container"))return}catch(e){}return Reflect.apply(e,t,n)}};window.EventTarget.prototype.addEventListener=new Proxy(window.EventTarget.prototype.addEventListener,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["671bbc53b2753ab1de38c607e44cff6b"] === flag) {
                return;
            }
            (() => {
                const e = {
                    apply: (e, t, n) => {
                        try {
                            const [e, r] = n, a = r?.toString();
                            if ("click" === e && a?.includes("attached") && t instanceof HTMLElement && t.matches(".share-embed-container")) return;
                        } catch (e) {}
                        return Reflect.apply(e, t, n);
                    }
                };
                window.EventTarget.prototype.addEventListener = new Proxy(window.EventTarget.prototype.addEventListener, e);
            })();
            Object.defineProperty(Window.prototype.toString, "671bbc53b2753ab1de38c607e44cff6b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "671bbc53b2753ab1de38c607e44cff6b" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,n)=>"data:text/javascript;base64,KCk9Pnt9"!==e&&Reflect.apply(t,e,n)};window.String.prototype.includes=new Proxy(window.String.prototype.includes,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["be0a03459654f3c6591908806278974c"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, n) => "data:text/javascript;base64,KCk9Pnt9" !== e && Reflect.apply(t, e, n)
                };
                window.String.prototype.includes = new Proxy(window.String.prototype.includes, t);
            })();
            Object.defineProperty(Window.prototype.toString, "be0a03459654f3c6591908806278974c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "be0a03459654f3c6591908806278974c" due to: ' + error);
        }
    },
    '(()=>{window.addEventListener("click",(function(t){const e=t?.target?.closest?.(".BottomRecirc a[href].Post-item");e&&(t.preventDefault(),location.assign(e.href))}),!0);})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4dc032bef8d7d5715dc533a301523f7e"] === flag) {
                return;
            }
            (() => {
                window.addEventListener("click", (function(t) {
                    const e = t?.target?.closest?.(".BottomRecirc a[href].Post-item");
                    e && (t.preventDefault(), location.assign(e.href));
                }), !0);
            })();
            Object.defineProperty(Window.prototype.toString, "4dc032bef8d7d5715dc533a301523f7e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4dc032bef8d7d5715dc533a301523f7e" due to: ' + error);
        }
    },
    '(()=>{const t={apply:async(t,e,r)=>{try{const o=await Reflect.apply(t,e,r);return o?.feed&&Array.isArray(o.feed)&&o.feed.forEach((t=>{t?.data?.shortUrl&&t?.data?.webStoryAction&&Object.keys(t.data.webStoryAction).forEach((e=>{const r=t.data.webStoryAction.webUrl;if("string"==typeof r){const e=r.split("web-blocker"),o=e.length>1?e[1]:null;if(o){const e=document.querySelector(`a[href*="${o}"]`);e&&(e.href=t.data.shortUrl,e.setAttribute("web-blocker","true"))}}t.data.webStoryAction[e]=t.data.shortUrl}))})),o}catch(t){console.trace("Error occurred:",t)}return await Reflect.apply(t,e,r)}};window.Response.prototype.json=new Proxy(window.Response.prototype.json,t),window.addEventListener("click",(function(t){t&&("A"===t.target?.nodeName||"H3"===t.target?.nodeName&&t.target?.closest("li")?.querySelector(\'a[web-blocker="true"]\'))&&t.stopPropagation()}),!0)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["32d2bdde9819ba509479277938f60b35"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: async (t, e, r) => {
                        try {
                            const o = await Reflect.apply(t, e, r);
                            return o?.feed && Array.isArray(o.feed) && o.feed.forEach((t => {
                                t?.data?.shortUrl && t?.data?.webStoryAction && Object.keys(t.data.webStoryAction).forEach((e => {
                                    const r = t.data.webStoryAction.webUrl;
                                    if ("string" == typeof r) {
                                        const e = r.split("web-blocker"), o = e.length > 1 ? e[1] : null;
                                        if (o) {
                                            const e = document.querySelector(`a[href*="${o}"]`);
                                            e && (e.href = t.data.shortUrl, e.setAttribute("web-blocker", "true"));
                                        }
                                    }
                                    t.data.webStoryAction[e] = t.data.shortUrl;
                                }));
                            })), o;
                        } catch (t) {
                            console.trace("Error occurred:", t);
                        }
                        return await Reflect.apply(t, e, r);
                    }
                };
                window.Response.prototype.json = new Proxy(window.Response.prototype.json, t), window.addEventListener("click", (function(t) {
                    t && ("A" === t.target?.nodeName || "H3" === t.target?.nodeName && t.target?.closest("li")?.querySelector('a[web-blocker="true"]')) && t.stopPropagation();
                }), !0);
            })();
            Object.defineProperty(Window.prototype.toString, "32d2bdde9819ba509479277938f60b35", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "32d2bdde9819ba509479277938f60b35" due to: ' + error);
        }
    },
    'document.cookie="dl-mobile-banner=hidden;path=/";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8b440f9710dbfd56131d1f8c2abc993c"] === flag) {
                return;
            }
            document.cookie = "dl-mobile-banner=hidden;path=/";
            Object.defineProperty(Window.prototype.toString, "8b440f9710dbfd56131d1f8c2abc993c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8b440f9710dbfd56131d1f8c2abc993c" due to: ' + error);
        }
    },
    'document.cookie="downloadcta-state=hidden;path=/";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1d980de172103bc108eaf73424fc9bb2"] === flag) {
                return;
            }
            document.cookie = "downloadcta-state=hidden;path=/";
            Object.defineProperty(Window.prototype.toString, "1d980de172103bc108eaf73424fc9bb2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1d980de172103bc108eaf73424fc9bb2" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("native-app-topper")&&(document.cookie="native-app-topper="+Date.now()+"; path=/;",location.reload())})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9d74c934588df2de463c39e31e3adc10"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("native-app-topper") && (document.cookie = "native-app-topper=" + Date.now() + "; path=/;", 
                location.reload());
            })();
            Object.defineProperty(Window.prototype.toString, "9d74c934588df2de463c39e31e3adc10", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9d74c934588df2de463c39e31e3adc10" due to: ' + error);
        }
    },
    '(function(){var a=new Date;a=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();document.cookie="closed="+a})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fe33bd03974a18f9ee09ea4bd62ae980"] === flag) {
                return;
            }
            (function() {
                var a = new Date;
                a = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
                document.cookie = "closed=" + a;
            })();
            Object.defineProperty(Window.prototype.toString, "fe33bd03974a18f9ee09ea4bd62ae980", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fe33bd03974a18f9ee09ea4bd62ae980" due to: ' + error);
        }
    },
    'document.cookie="com.digidust.elokence.akinator.freemium-smartbanner-closed=true; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6e884abc83f56c42a030fb5b7c6a7e21"] === flag) {
                return;
            }
            document.cookie = "com.digidust.elokence.akinator.freemium-smartbanner-closed=true; path=/;";
            Object.defineProperty(Window.prototype.toString, "6e884abc83f56c42a030fb5b7c6a7e21", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6e884abc83f56c42a030fb5b7c6a7e21" due to: ' + error);
        }
    },
    'document.cookie="sb-closed=true; path=/;";': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5d933778415cb98cdeaf6df08d1c3ad3"] === flag) {
                return;
            }
            document.cookie = "sb-closed=true; path=/;";
            Object.defineProperty(Window.prototype.toString, "5d933778415cb98cdeaf6df08d1c3ad3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5d933778415cb98cdeaf6df08d1c3ad3" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/loadAppStoreBanner/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4a9a4c88d375de003f5ff00b3d926a2e"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/loadAppStoreBanner/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "4a9a4c88d375de003f5ff00b3d926a2e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4a9a4c88d375de003f5ff00b3d926a2e" due to: ' + error);
        }
    },
    '(()=>{const t={construct:(t,e,n)=>{const r=e[0],o=r?.toString(),c=o?.includes("if(null==e?void 0:e.length)");return c&&(e[0]=()=>{}),Reflect.construct(t,e,n)}};window.IntersectionObserver=new Proxy(window.IntersectionObserver,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0086f61b25ccbf8ddee8ffb7e31168e9"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, e, n) => {
                        const r = e[0], o = r?.toString(), c = o?.includes("if(null==e?void 0:e.length)");
                        return c && (e[0] = () => {}), Reflect.construct(t, e, n);
                    }
                };
                window.IntersectionObserver = new Proxy(window.IntersectionObserver, t);
            })();
            Object.defineProperty(Window.prototype.toString, "0086f61b25ccbf8ddee8ffb7e31168e9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0086f61b25ccbf8ddee8ffb7e31168e9" due to: ' + error);
        }
    },
    '(()=>{const t={construct:(t,e,n)=>{const r=e[0],o=r?.toString(),c=o?.includes("vidFloating");return c&&(e[0]=()=>{}),Reflect.construct(t,e,n)}};window.IntersectionObserver=new Proxy(window.IntersectionObserver,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["173c399349bb9c62a10677e96355749b"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, e, n) => {
                        const r = e[0], o = r?.toString(), c = o?.includes("vidFloating");
                        return c && (e[0] = () => {}), Reflect.construct(t, e, n);
                    }
                };
                window.IntersectionObserver = new Proxy(window.IntersectionObserver, t);
            })();
            Object.defineProperty(Window.prototype.toString, "173c399349bb9c62a10677e96355749b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "173c399349bb9c62a10677e96355749b" due to: ' + error);
        }
    },
    '(()=>{var b=EventTarget.prototype.addEventListener,c=function(a,b){var c=document.querySelector("button.AppHeader-login, .AppHeader-userInfo > .AppHeader-profile > div > button.Button--blue");c&&b.bind(c)("click",function(){d.disconnect()},{once:!0})},d=new MutationObserver(function(){var a=document.querySelector(".Modal-wrapper .signFlowModal > .Modal-closeButton");a&&(d.disconnect(),e.disconnect(),a.click())});d.observe(document,{childList:!0,subtree:!0});var e=new MutationObserver(a=>{c(a,b)});e.observe(document,{childList:!0,subtree:!0}),setTimeout(function(){e.disconnect(),d.disconnect()},5E3)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f8538b151cd703002da3f4fc86771de0"] === flag) {
                return;
            }
            (() => {
                var b = EventTarget.prototype.addEventListener, c = function(a, b) {
                    var c = document.querySelector("button.AppHeader-login, .AppHeader-userInfo > .AppHeader-profile > div > button.Button--blue");
                    c && b.bind(c)("click", (function() {
                        d.disconnect();
                    }), {
                        once: !0
                    });
                }, d = new MutationObserver((function() {
                    var a = document.querySelector(".Modal-wrapper .signFlowModal > .Modal-closeButton");
                    a && (d.disconnect(), e.disconnect(), a.click());
                }));
                d.observe(document, {
                    childList: !0,
                    subtree: !0
                });
                var e = new MutationObserver((a => {
                    c(a, b);
                }));
                e.observe(document, {
                    childList: !0,
                    subtree: !0
                }), setTimeout((function() {
                    e.disconnect(), d.disconnect();
                }), 5e3);
            })();
            Object.defineProperty(Window.prototype.toString, "f8538b151cd703002da3f4fc86771de0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f8538b151cd703002da3f4fc86771de0" due to: ' + error);
        }
    },
    '(function(){if(!document.cookie.includes("zip_and_city=")){var a=encodeURIComponent(\'{"zip":"","city":""}\');document.cookie="zip_and_city="+a+"; path=/;"}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["150eefbfeffab2cb6822c774c048adf4"] === flag) {
                return;
            }
            (function() {
                if (!document.cookie.includes("zip_and_city=")) {
                    var a = encodeURIComponent('{"zip":"","city":""}');
                    document.cookie = "zip_and_city=" + a + "; path=/;";
                }
            })();
            Object.defineProperty(Window.prototype.toString, "150eefbfeffab2cb6822c774c048adf4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "150eefbfeffab2cb6822c774c048adf4" due to: ' + error);
        }
    },
    "(function(){var b=window.alert;window.alert=function(a){if(!/do geolokalizacji/.test(a.toString()))return b(a)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1362854a89198b0689400538f0b1a4dc"] === flag) {
                return;
            }
            (function() {
                var b = window.alert;
                window.alert = function(a) {
                    if (!/do geolokalizacji/.test(a.toString())) return b(a);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "1362854a89198b0689400538f0b1a4dc", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1362854a89198b0689400538f0b1a4dc" due to: ' + error);
        }
    },
    '!function(){if(decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=portal.abczdrowie.pl")||decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=parenting.pl"))try{var a=(new URL(window.location.href)).searchParams.get("s");location.replace("https://"+a)}catch(b){}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ec8cfc984fdc64eb0423e2b09bc54f74"] === flag) {
                return;
            }
            !function() {
                if (decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=portal.abczdrowie.pl") || decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=parenting.pl")) try {
                    var a = new URL(window.location.href).searchParams.get("s");
                    location.replace("https://" + a);
                } catch (b) {}
            }();
            Object.defineProperty(Window.prototype.toString, "ec8cfc984fdc64eb0423e2b09bc54f74", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ec8cfc984fdc64eb0423e2b09bc54f74" due to: ' + error);
        }
    },
    '!function(){if(decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=https://"))try{var a=(new URL(window.location.href)).searchParams.get("s");location.replace(a)}catch(b){}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8b26d974cb42343c8f14233fe3c568e8"] === flag) {
                return;
            }
            !function() {
                if (decodeURIComponent(location.href).startsWith("https://www.wp.pl/?s=https://")) try {
                    var a = new URL(window.location.href).searchParams.get("s");
                    location.replace(a);
                } catch (b) {}
            }();
            Object.defineProperty(Window.prototype.toString, "8b26d974cb42343c8f14233fe3c568e8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8b26d974cb42343c8f14233fe3c568e8" due to: ' + error);
        }
    },
    '(function(){var a=new Date,b=a.getTime();document.cookie="ucs=lbit="+b})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bc114c1bbc5dee318bd43b511cdcb308"] === flag) {
                return;
            }
            (function() {
                var a = new Date, b = a.getTime();
                document.cookie = "ucs=lbit=" + b;
            })();
            Object.defineProperty(Window.prototype.toString, "bc114c1bbc5dee318bd43b511cdcb308", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bc114c1bbc5dee318bd43b511cdcb308" due to: ' + error);
        }
    },
    "var _st = window.setTimeout; window.setTimeout = function(a, b) { if(!/loginPopup.show/.test(a)){ _st(a,b);}};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1042964cb83bcd640195f230a152da77"] === flag) {
                return;
            }
            var _st = window.setTimeout;
            window.setTimeout = function(a, b) {
                if (!/loginPopup.show/.test(a)) {
                    _st(a, b);
                }
            };
            Object.defineProperty(Window.prototype.toString, "1042964cb83bcd640195f230a152da77", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1042964cb83bcd640195f230a152da77" due to: ' + error);
        }
    },
    '!function(){var e=new MutationObserver(function(){document.querySelectorAll(\'div[id^="substream_"] div[id^="hyperfeed_story_id"]\').forEach(function(e){var n=e.querySelectorAll(".userContentWrapper > div[class] > div[class] > div[class]"),o=e.querySelectorAll(".userContentWrapper > div[class] > div > div span");if("display: none !important;"!=e.getAttribute("style")){if(0<n.length&&n[0].innerText.contains("Suggested")){console.log("--------"),t+=1;var l=e.querySelectorAll("a[href]")[2].innerText;console.log("Annoyance hidden from: "+l),console.log("Total annoyances Hidden: "+t),console.log("F length: "+n.length),console.log("--------"),e.style="display:none!important;"}if(0<o.length&&o[0].innerText.contains("People you may know"))console.log("--------"),t+=1,""==(l=e.querySelectorAll("a[href]")[2].innerText)&&(l="Facebook"),console.log("Annoyance hidden from: "+l),console.log("Total annoyances Hidden: "+t),console.log("F length: "+n.length),console.log("--------"),e.style="display:none!important;"}})}),t=0;e.observe(document,{childList:!0,subtree:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2d5a4b03ebe219d77f997c0a788b2eed"] === flag) {
                return;
            }
            !function() {
                var e = new MutationObserver((function() {
                    document.querySelectorAll('div[id^="substream_"] div[id^="hyperfeed_story_id"]').forEach((function(e) {
                        var n = e.querySelectorAll(".userContentWrapper > div[class] > div[class] > div[class]"), o = e.querySelectorAll(".userContentWrapper > div[class] > div > div span");
                        if ("display: none !important;" != e.getAttribute("style")) {
                            if (0 < n.length && n[0].innerText.contains("Suggested")) {
                                console.log("--------"), t += 1;
                                var l = e.querySelectorAll("a[href]")[2].innerText;
                                console.log("Annoyance hidden from: " + l), console.log("Total annoyances Hidden: " + t), 
                                console.log("F length: " + n.length), console.log("--------"), e.style = "display:none!important;";
                            }
                            if (0 < o.length && o[0].innerText.contains("People you may know")) console.log("--------"), 
                            t += 1, "" == (l = e.querySelectorAll("a[href]")[2].innerText) && (l = "Facebook"), 
                            console.log("Annoyance hidden from: " + l), console.log("Total annoyances Hidden: " + t), 
                            console.log("F length: " + n.length), console.log("--------"), e.style = "display:none!important;";
                        }
                    }));
                })), t = 0;
                e.observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "2d5a4b03ebe219d77f997c0a788b2eed", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2d5a4b03ebe219d77f997c0a788b2eed" due to: ' + error);
        }
    },
    'new MutationObserver(function(){document.querySelectorAll(\'div[role="feed"] > div[data-pagelet^="FeedUnit"] > div[class]:not([style*="height"])\').forEach(function(e){"display: none !important;"==e.getAttribute("style")||e.classList.contains("hidden_elem")||e.querySelectorAll("div[aria-posinset] div[style] div[class] > div[class] > div[class] > div[class] > span")[0].innerText.contains("Suggested for you")&&(console.log("--------"),console.log("Annoyances hidden (Suggested for you)"),e.style="display:none!important;")})}).observe(document,{childList:!0,subtree:!0});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["03e8fcb55c09dc00ea2c8fbc43ccc9ac"] === flag) {
                return;
            }
            new MutationObserver((function() {
                document.querySelectorAll('div[role="feed"] > div[data-pagelet^="FeedUnit"] > div[class]:not([style*="height"])').forEach((function(e) {
                    "display: none !important;" == e.getAttribute("style") || e.classList.contains("hidden_elem") || e.querySelectorAll("div[aria-posinset] div[style] div[class] > div[class] > div[class] > div[class] > span")[0].innerText.contains("Suggested for you") && (console.log("--------"), 
                    console.log("Annoyances hidden (Suggested for you)"), e.style = "display:none!important;");
                }));
            })).observe(document, {
                childList: !0,
                subtree: !0
            });
            Object.defineProperty(Window.prototype.toString, "03e8fcb55c09dc00ea2c8fbc43ccc9ac", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "03e8fcb55c09dc00ea2c8fbc43ccc9ac" due to: ' + error);
        }
    },
    'new MutationObserver(function(){document.querySelectorAll(\'div[role="feed"] > span\').forEach(function(e){"display: none !important;"==e.getAttribute("style")||e.classList.contains("hidden_elem")||e.querySelectorAll("div[aria-posinset] div[style] div[class] > div[class] > div[class] > div[class] > span")[0].innerText.contains("Suggested for you")&&(console.log("--------"),console.log("Annoyances hidden (Suggested for you)"),e.style="display:none!important;")})}).observe(document,{childList:!0,subtree:!0});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7658e09af099cd1524b0fba53dd1cb1c"] === flag) {
                return;
            }
            new MutationObserver((function() {
                document.querySelectorAll('div[role="feed"] > span').forEach((function(e) {
                    "display: none !important;" == e.getAttribute("style") || e.classList.contains("hidden_elem") || e.querySelectorAll("div[aria-posinset] div[style] div[class] > div[class] > div[class] > div[class] > span")[0].innerText.contains("Suggested for you") && (console.log("--------"), 
                    console.log("Annoyances hidden (Suggested for you)"), e.style = "display:none!important;");
                }));
            })).observe(document, {
                childList: !0,
                subtree: !0
            });
            Object.defineProperty(Window.prototype.toString, "7658e09af099cd1524b0fba53dd1cb1c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7658e09af099cd1524b0fba53dd1cb1c" due to: ' + error);
        }
    },
    '!function(){var b=0,d=[];new MutationObserver(function(){document.querySelectorAll("#ssrb_feed_start + div > div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div span > h3 ~ div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div h3~ div[class]:not([style*=\\"display: none\\"]), #ssrb_feed_start + div h3 ~ div > div[class]:not([style*=\\"display: none\\"]), div[role=\\"main\\"] div > h3 ~ div > div[class]:not([style*=\\"display: none\\"])").forEach(function(e){Object.keys(e).forEach(function(a){if(a.includes("__reactEvents")||a.includes("__reactProps")){a=e[a];try{if(a.children?.props?.category?.includes("SHOWCASE")||a.children?.props?.children?.props?.category?.includes("SHOWCASE")||a.children?.props?.children?.props?.feedEdge?.category?.includes("SHOWCASE")||a.children?.props?.category?.includes("FB_SHORTS")||a.children?.props?.children?.props?.category?.includes("FB_SHORTS")||a.children?.props?.children?.props?.feedEdge?.category?.includes("FB_SHORTS")){b++,e.style="display: none !important;";var f=e.querySelector("a[href][aria-label]:not([aria-hidden])");f&&(d.push(["SHOWCASE post blocked based on property ["+b+"] -> "+f.ariaLabel]),console.table(d))}}catch(a){}}})})}).observe(document,{childList:!0,subtree:!0})}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b1df923a63194358ca6f0ed1143474e5"] === flag) {
                return;
            }
            !function() {
                var b = 0, d = [];
                new MutationObserver((function() {
                    document.querySelectorAll('#ssrb_feed_start + div > div[class]:not([style*="display: none"]), #ssrb_feed_start + div span > h3 ~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3~ div[class]:not([style*="display: none"]), #ssrb_feed_start + div h3 ~ div > div[class]:not([style*="display: none"]), div[role="main"] div > h3 ~ div > div[class]:not([style*="display: none"])').forEach((function(e) {
                        Object.keys(e).forEach((function(a) {
                            if (a.includes("__reactEvents") || a.includes("__reactProps")) {
                                a = e[a];
                                try {
                                    if (a.children?.props?.category?.includes("SHOWCASE") || a.children?.props?.children?.props?.category?.includes("SHOWCASE") || a.children?.props?.children?.props?.feedEdge?.category?.includes("SHOWCASE") || a.children?.props?.category?.includes("FB_SHORTS") || a.children?.props?.children?.props?.category?.includes("FB_SHORTS") || a.children?.props?.children?.props?.feedEdge?.category?.includes("FB_SHORTS")) {
                                        b++, e.style = "display: none !important;";
                                        var f = e.querySelector("a[href][aria-label]:not([aria-hidden])");
                                        f && (d.push([ "SHOWCASE post blocked based on property [" + b + "] -> " + f.ariaLabel ]), 
                                        console.table(d));
                                    }
                                } catch (a) {}
                            }
                        }));
                    }));
                })).observe(document, {
                    childList: !0,
                    subtree: !0
                });
            }();
            Object.defineProperty(Window.prototype.toString, "b1df923a63194358ca6f0ed1143474e5", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b1df923a63194358ca6f0ed1143474e5" due to: ' + error);
        }
    },
    "setInterval(function() { var el = document.querySelector('.howto-video video'); if (el) { el.pause(); el.src = ''; }}, 100);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6037ae33aba3b05f056f756787dd2f13"] === flag) {
                return;
            }
            setInterval((function() {
                var el = document.querySelector(".howto-video video");
                if (el) {
                    el.pause();
                    el.src = "";
                }
            }), 100);
            Object.defineProperty(Window.prototype.toString, "6037ae33aba3b05f056f756787dd2f13", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6037ae33aba3b05f056f756787dd2f13" due to: ' + error);
        }
    },
    'document.addEventListener(\'DOMContentLoaded\', function(){setTimeout(function(){var a=document.querySelector(".onp-sl-content");if("function"===typeof jQuery&&"object"===typeof bizpanda.lockerOptions&&a)try{a=0;for(var c=Object.keys(bizpanda.lockerOptions);a<c.length;a++){var d=c[a];if(d.includes("onpLock")){var b=bizpanda.lockerOptions[d];b&&jQuery.ajax({url:b.ajaxUrl,method:"post",data:{lockerId:b.lockerId,action:"opanda_loader",hash:b.contentHash},success:function(a){var b=jQuery(".onp-sl-content"),c=jQuery(".onp-sl-social-locker"); b.append(a);b.css("display","block");c.css("display","none")}})}}}catch(e){}},1E3)});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f8726a98e9ee7f87afd7c9376374eb99"] === flag) {
                return;
            }
            document.addEventListener("DOMContentLoaded", (function() {
                setTimeout((function() {
                    var a = document.querySelector(".onp-sl-content");
                    if ("function" === typeof jQuery && "object" === typeof bizpanda.lockerOptions && a) try {
                        a = 0;
                        for (var c = Object.keys(bizpanda.lockerOptions); a < c.length; a++) {
                            var d = c[a];
                            if (d.includes("onpLock")) {
                                var b = bizpanda.lockerOptions[d];
                                b && jQuery.ajax({
                                    url: b.ajaxUrl,
                                    method: "post",
                                    data: {
                                        lockerId: b.lockerId,
                                        action: "opanda_loader",
                                        hash: b.contentHash
                                    },
                                    success: function(a) {
                                        var b = jQuery(".onp-sl-content"), c = jQuery(".onp-sl-social-locker");
                                        b.append(a);
                                        b.css("display", "block");
                                        c.css("display", "none");
                                    }
                                });
                            }
                        }
                    } catch (e) {}
                }), 1e3);
            }));
            Object.defineProperty(Window.prototype.toString, "f8726a98e9ee7f87afd7c9376374eb99", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f8726a98e9ee7f87afd7c9376374eb99" due to: ' + error);
        }
    },
    "document.addEventListener('DOMContentLoaded',function(){const o=new MutationObserver(function(m,b){const e=document.querySelector('.gtp-wrap.gtp-open button.gtp-decline');e&&e.click()});setTimeout(function(){o.disconnect()},60000);o.observe(document.body,{childList:!0,subtree:!0})})": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5d2ed20fe2cf48b0e460c65c0cdeff79"] === flag) {
                return;
            }
            document.addEventListener("DOMContentLoaded", (function() {
                const o = new MutationObserver((function(m, b) {
                    const e = document.querySelector(".gtp-wrap.gtp-open button.gtp-decline");
                    e && e.click();
                }));
                setTimeout((function() {
                    o.disconnect();
                }), 6e4);
                o.observe(document.body, {
                    childList: !0,
                    subtree: !0
                });
            }));
            Object.defineProperty(Window.prototype.toString, "5d2ed20fe2cf48b0e460c65c0cdeff79", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5d2ed20fe2cf48b0e460c65c0cdeff79" due to: ' + error);
        }
    },
    '(()=>{let t,e=!0;document.addEventListener("click",(i=>{if(i.target.matches("button.button-login"))return e=!1,void(t&&(t.style.visibility="visible"));i.target.matches("button.close")&&document.querySelector("dialog.PartLoginModal").contains(i.target)&&(e=!0)}),!0),document.addEventListener("toggle",(i=>{i.target.matches("dialog.PartLoginModal")&&"open"===i.newState&&e&&(t=i.target,t.style.visibility="hidden",t.querySelector("button.close").click())}),!0)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["49ea6d8a2498702a6527351de1b83b18"] === flag) {
                return;
            }
            (() => {
                let t, e = !0;
                document.addEventListener("click", (i => {
                    if (i.target.matches("button.button-login")) return e = !1, void (t && (t.style.visibility = "visible"));
                    i.target.matches("button.close") && document.querySelector("dialog.PartLoginModal").contains(i.target) && (e = !0);
                }), !0), document.addEventListener("toggle", (i => {
                    i.target.matches("dialog.PartLoginModal") && "open" === i.newState && e && (t = i.target, 
                    t.style.visibility = "hidden", t.querySelector("button.close").click());
                }), !0);
            })();
            Object.defineProperty(Window.prototype.toString, "49ea6d8a2498702a6527351de1b83b18", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "49ea6d8a2498702a6527351de1b83b18" due to: ' + error);
        }
    },
    '(()=>{if(!location.href.includes("/download-"))return;document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(\'#downloadpage > form[action][method="POST"] > input[value^="https://"]\').forEach((e=>{const o=e.closest("form");var t,n;o&&(t=o,n=e.value,t.addEventListener("click",(e=>{e.preventDefault(),window.location.href=n})))}))}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7d835d508a44fa6f33710266eee3a2c3"] === flag) {
                return;
            }
            (() => {
                if (!location.href.includes("/download-")) return;
                document.addEventListener("DOMContentLoaded", (() => {
                    document.querySelectorAll('#downloadpage > form[action][method="POST"] > input[value^="https://"]').forEach((e => {
                        const o = e.closest("form");
                        var t, n;
                        o && (t = o, n = e.value, t.addEventListener("click", (e => {
                            e.preventDefault(), window.location.href = n;
                        })));
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "7d835d508a44fa6f33710266eee3a2c3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7d835d508a44fa6f33710266eee3a2c3" due to: ' + error);
        }
    },
    '(function(){try{var a=location.href.split("/#");if(a[1]){a=a[1];for(var b=0;10>b;b++){a=atob(a);try{new URL(decodeURIComponent(a));var c=!0}catch(d){c=!1}if(c)try{location.assign(decodeURIComponent(a));break}catch(d){}}}}catch(d){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["32d9aaa2320ef0aacd203039342dcf58"] === flag) {
                return;
            }
            (function() {
                try {
                    var a = location.href.split("/#");
                    if (a[1]) {
                        a = a[1];
                        for (var b = 0; 10 > b; b++) {
                            a = atob(a);
                            try {
                                new URL(decodeURIComponent(a));
                                var c = !0;
                            } catch (d) {
                                c = !1;
                            }
                            if (c) try {
                                location.assign(decodeURIComponent(a));
                                break;
                            } catch (d) {}
                        }
                    }
                } catch (d) {}
            })();
            Object.defineProperty(Window.prototype.toString, "32d9aaa2320ef0aacd203039342dcf58", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "32d9aaa2320ef0aacd203039342dcf58" due to: ' + error);
        }
    },
    '(()=>{if(location.href.includes("?s=http")){const a=location.href.split("?s=").slice(1);try{location.assign(decodeURIComponent(a))}catch(a){}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["89966e93a718e4bf486ce24ffd372a32"] === flag) {
                return;
            }
            (() => {
                if (location.href.includes("?s=http")) {
                    const a = location.href.split("?s=").slice(1);
                    try {
                        location.assign(decodeURIComponent(a));
                    } catch (a) {}
                }
            })();
            Object.defineProperty(Window.prototype.toString, "89966e93a718e4bf486ce24ffd372a32", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "89966e93a718e4bf486ce24ffd372a32" due to: ' + error);
        }
    },
    '!function(){if(location.href.includes("wpsafelink")){var e=new MutationObserver((function(){try{var t=document.querySelector(\'form#landing > input[name="go"][value]\'),n=document.querySelector("body > script");t&&t.value.startsWith("aHR0c")&&n&&n.textContent.includes("document.getElementById(\'landing\').submit();")&&(n.remove(),e.disconnect(),location.assign(atob(t.value)))}catch(e){}}));e.observe(document,{childList:!0,subtree:!0}),setTimeout((function(){e.disconnect()}),1e4)}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["eb7c35a03ee3cc3b96b7bb0b0d90a333"] === flag) {
                return;
            }
            !function() {
                if (location.href.includes("wpsafelink")) {
                    var e = new MutationObserver((function() {
                        try {
                            var t = document.querySelector('form#landing > input[name="go"][value]'), n = document.querySelector("body > script");
                            t && t.value.startsWith("aHR0c") && n && n.textContent.includes("document.getElementById('landing').submit();") && (n.remove(), 
                            e.disconnect(), location.assign(atob(t.value)));
                        } catch (e) {}
                    }));
                    e.observe(document, {
                        childList: !0,
                        subtree: !0
                    }), setTimeout((function() {
                        e.disconnect();
                    }), 1e4);
                }
            }();
            Object.defineProperty(Window.prototype.toString, "eb7c35a03ee3cc3b96b7bb0b0d90a333", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "eb7c35a03ee3cc3b96b7bb0b0d90a333" due to: ' + error);
        }
    },
    '!function(){if(-1<location.href.indexOf("?data=aHR0c")){var a=(new URL(window.location.href)).searchParams.get("data");if(a)try{window.location.assign(atob(a))}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["44bad01b6f166fd09caa76089752d560"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.href.indexOf("?data=aHR0c")) {
                    var a = new URL(window.location.href).searchParams.get("data");
                    if (a) try {
                        window.location.assign(atob(a));
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "44bad01b6f166fd09caa76089752d560", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "44bad01b6f166fd09caa76089752d560" due to: ' + error);
        }
    },
    '!function(){if(-1<location.href.indexOf("?wpsafelink=http")){var a=(new URL(window.location.href)).searchParams.get("wpsafelink");if(a)try{window.location.assign(a)}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["11a8706f0dda4c1354a0f23ace755f3f"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.href.indexOf("?wpsafelink=http")) {
                    var a = new URL(window.location.href).searchParams.get("wpsafelink");
                    if (a) try {
                        window.location.assign(a);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "11a8706f0dda4c1354a0f23ace755f3f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "11a8706f0dda4c1354a0f23ace755f3f" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/?go=")){var a=location.href.split("?go=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["74acd4f9bf691bd110a5d483c18ecd56"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/?go=")) {
                    var a = location.href.split("?go=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "74acd4f9bf691bd110a5d483c18ecd56", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "74acd4f9bf691bd110a5d483c18ecd56" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/?redirect=aHR0c")){var a=location.href.split("/?redirect=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["18e9f4638ee3f7cd8505ffa2c9efb0db"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/?redirect=aHR0c")) {
                    var a = location.href.split("/?redirect=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "18e9f4638ee3f7cd8505ffa2c9efb0db", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "18e9f4638ee3f7cd8505ffa2c9efb0db" due to: ' + error);
        }
    },
    '!function(){if(-1<location.href.indexOf("?data=")){var b=(new URL(window.location.href)).searchParams.get("data");if(b)try{var a=atob(b);a=a.split("&ulink=")[1];a.startsWith("http")&&window.location.assign(a)}catch(c){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d6c3eb40b31cb88fd93e2cbf35857f8c"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.href.indexOf("?data=")) {
                    var b = new URL(window.location.href).searchParams.get("data");
                    if (b) try {
                        var a = atob(b);
                        a = a.split("&ulink=")[1];
                        a.startsWith("http") && window.location.assign(a);
                    } catch (c) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "d6c3eb40b31cb88fd93e2cbf35857f8c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d6c3eb40b31cb88fd93e2cbf35857f8c" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/?r=aHR0c")){var a=location.href.split("/?r=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8407ee6883a7daf63bdaba9212c0a5f4"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/?r=aHR0c")) {
                    var a = location.href.split("/?r=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "8407ee6883a7daf63bdaba9212c0a5f4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8407ee6883a7daf63bdaba9212c0a5f4" due to: ' + error);
        }
    },
    '(function(){if(location.href.includes("/to/aHR0c"))try{var a=location.href.split("/to/");a=atob(a[1]);location=decodeURIComponent(a)}catch(b){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["faa1e5b373e282c3295d2edb730eab59"] === flag) {
                return;
            }
            (function() {
                if (location.href.includes("/to/aHR0c")) try {
                    var a = location.href.split("/to/");
                    a = atob(a[1]);
                    location = decodeURIComponent(a);
                } catch (b) {}
            })();
            Object.defineProperty(Window.prototype.toString, "faa1e5b373e282c3295d2edb730eab59", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "faa1e5b373e282c3295d2edb730eab59" due to: ' + error);
        }
    },
    '(function(){"function"===typeof fetch&&location.href.includes("/?id=")&&fetch(location.href).then(function(e){e.headers.forEach(function(a,f){if("refresh"===f&&a.includes("url=http"))try{if(a.includes("&url=aHR0c")){var b,c=null==(b=a.split(/&url=/))?void 0:b[1];location=atob(c)}else{var d;location=c=null==(d=a.split(/url=(.+)/))?void 0:d[1]}}catch(g){}})})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1aa697d9b99b2928e92895ee3e7133f4"] === flag) {
                return;
            }
            (function() {
                "function" === typeof fetch && location.href.includes("/?id=") && fetch(location.href).then((function(e) {
                    e.headers.forEach((function(a, f) {
                        if ("refresh" === f && a.includes("url=http")) try {
                            if (a.includes("&url=aHR0c")) {
                                var b, c = null == (b = a.split(/&url=/)) ? void 0 : b[1];
                                location = atob(c);
                            } else {
                                var d;
                                location = c = null == (d = a.split(/url=(.+)/)) ? void 0 : d[1];
                            }
                        } catch (g) {}
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "1aa697d9b99b2928e92895ee3e7133f4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1aa697d9b99b2928e92895ee3e7133f4" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("out/?aHR0c")){var a=location.href.split("out/?");if(a&&a[1])try{window.location=atob(decodeURIComponent(a[1]))}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["14e7b6eeaed2b6c9766d1673c27e5f11"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("out/?aHR0c")) {
                    var a = location.href.split("out/?");
                    if (a && a[1]) try {
                        window.location = atob(decodeURIComponent(a[1]));
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "14e7b6eeaed2b6c9766d1673c27e5f11", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "14e7b6eeaed2b6c9766d1673c27e5f11" due to: ' + error);
        }
    },
    '!function(){if(window.location.href.includes("api")&&window.location.href.includes("&url=")){var b=location.href.split("&url=")[1];a:{try{var a=new URL(b)}catch(c){a=!1;break a}a="http:"===a.protocol||"https:"===a.protocol}if(a)try{window.location=b}catch(c){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a7aa2c291e20b59040377e4089cb13d8"] === flag) {
                return;
            }
            !function() {
                if (window.location.href.includes("api") && window.location.href.includes("&url=")) {
                    var b = location.href.split("&url=")[1];
                    a: {
                        try {
                            var a = new URL(b);
                        } catch (c) {
                            a = !1;
                            break a;
                        }
                        a = "http:" === a.protocol || "https:" === a.protocol;
                    }
                    if (a) try {
                        window.location = b;
                    } catch (c) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "a7aa2c291e20b59040377e4089cb13d8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a7aa2c291e20b59040377e4089cb13d8" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/download.php?")&&-1<window.location.href.indexOf("link=aHR0c")){var a=location.href.split("link=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fbed59262d4b4df211cd5517c4c36cf1"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/download.php?") && -1 < window.location.href.indexOf("link=aHR0c")) {
                    var a = location.href.split("link=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "fbed59262d4b4df211cd5517c4c36cf1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fbed59262d4b4df211cd5517c4c36cf1" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{const a=function(a){const b=new DOMParser().parseFromString(a,"text/html");return b.documentElement.textContent},b=function(){if("object"==typeof _sharedData&&"string"==typeof _sharedData[0]?.destination){const b=a(_sharedData[0].destination);if(b.startsWith("http"))try{window.location=b}catch(a){}}};if(window._sharedData)b();else{const a=new MutationObserver(function(){window._sharedData&&(a.disconnect(),b())});a.observe(document,{childList:!0,subtree:!0}),setTimeout(function(){a.disconnect()},1E4)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9cac65361b045047e010c7826d557bc0"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    const a = function(a) {
                        const b = (new DOMParser).parseFromString(a, "text/html");
                        return b.documentElement.textContent;
                    }, b = function() {
                        if ("object" == typeof _sharedData && "string" == typeof _sharedData[0]?.destination) {
                            const b = a(_sharedData[0].destination);
                            if (b.startsWith("http")) try {
                                window.location = b;
                            } catch (a) {}
                        }
                    };
                    if (window._sharedData) b(); else {
                        const a = new MutationObserver((function() {
                            window._sharedData && (a.disconnect(), b());
                        }));
                        a.observe(document, {
                            childList: !0,
                            subtree: !0
                        }), setTimeout((function() {
                            a.disconnect();
                        }), 1e4);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "9cac65361b045047e010c7826d557bc0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9cac65361b045047e010c7826d557bc0" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf(".html?url=aHR0c")){var a=location.href.split(".html?url=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0b9c803325dd9cf5e623a58f3f42c964"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf(".html?url=aHR0c")) {
                    var a = location.href.split(".html?url=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "0b9c803325dd9cf5e623a58f3f42c964", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0b9c803325dd9cf5e623a58f3f42c964" due to: ' + error);
        }
    },
    '!function(){if(-1<location.href.indexOf("/aHR0c")){var a=location.href.split("/").pop();if(a&&a.includes("aHR0c"))try{location=decodeURIComponent(atob(a))}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fa04035c4b218bf538509b1f9bca93d9"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.href.indexOf("/aHR0c")) {
                    var a = location.href.split("/").pop();
                    if (a && a.includes("aHR0c")) try {
                        location = decodeURIComponent(atob(a));
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "fa04035c4b218bf538509b1f9bca93d9", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fa04035c4b218bf538509b1f9bca93d9" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/gotothedl.html?url=")){var a=location.href.split("/gotothedl.html?url=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fd6511a662b1e2713ee805351331ec88"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/gotothedl.html?url=")) {
                    var a = location.href.split("/gotothedl.html?url=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "fd6511a662b1e2713ee805351331ec88", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fd6511a662b1e2713ee805351331ec88" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/link/?link=aHR0c")){var a=location.href.split("/link/?link=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d182d7cd6901d7ba2db76b7116137d30"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/link/?link=aHR0c")) {
                    var a = location.href.split("/link/?link=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "d182d7cd6901d7ba2db76b7116137d30", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d182d7cd6901d7ba2db76b7116137d30" due to: ' + error);
        }
    },
    '!function(){if(-1<location.pathname.indexOf("/view.php")){var a=(new URL(window.location.href)).searchParams.get("id");if(a&&-1==document.cookie.indexOf(a))try{document.cookie=a+"=user; path=/;";location.reload();}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["89696970bfadbdff1c23f38046797c74"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.pathname.indexOf("/view.php")) {
                    var a = new URL(window.location.href).searchParams.get("id");
                    if (a && -1 == document.cookie.indexOf(a)) try {
                        document.cookie = a + "=user; path=/;";
                        location.reload();
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "89696970bfadbdff1c23f38046797c74", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "89696970bfadbdff1c23f38046797c74" due to: ' + error);
        }
    },
    '(function(){-1==document.cookie.indexOf("exUserId")&&(document.cookie="exUserId=1; domain=.4shared.com; path=/;")})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["83200f16f2ddab39b258418b8f092a1e"] === flag) {
                return;
            }
            (function() {
                -1 == document.cookie.indexOf("exUserId") && (document.cookie = "exUserId=1; domain=.4shared.com; path=/;");
            })();
            Object.defineProperty(Window.prototype.toString, "83200f16f2ddab39b258418b8f092a1e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "83200f16f2ddab39b258418b8f092a1e" due to: ' + error);
        }
    },
    '!function(){if(-1<location.pathname.indexOf("/redirect")){var a=(new URL(window.location.href)).searchParams.get("to");if(a)try{window.location=atob(a)}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["af354057b5f1999097c4f848b8100343"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.pathname.indexOf("/redirect")) {
                    var a = new URL(window.location.href).searchParams.get("to");
                    if (a) try {
                        window.location = atob(a);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "af354057b5f1999097c4f848b8100343", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "af354057b5f1999097c4f848b8100343" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("?url=")){var a=location.href.split("?url=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8015f163e0243425947c898a301100ae"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("?url=")) {
                    var a = location.href.split("?url=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "8015f163e0243425947c898a301100ae", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8015f163e0243425947c898a301100ae" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{if(-1<location.pathname.indexOf("/go/")){var b=new MutationObserver(function(){if(document.querySelector("#get_link_btn"))try{[].slice.call(document.getElementsByTagName("script")).some(function(a){a.text.match(/goToUrl \\("/)&&(a=a.text.split(/goToUrl \\("([\\s\\S]*?)"\\);/),location=a[1])})}catch(a){}});b.observe(document,{childList:!0,subtree:!0});setTimeout(function(){b.disconnect()},1E4)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1b7a3b5c1b1b60eb96bdd9dfb49f36ed"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (-1 < location.pathname.indexOf("/go/")) {
                        var b = new MutationObserver((function() {
                            if (document.querySelector("#get_link_btn")) try {
                                [].slice.call(document.getElementsByTagName("script")).some((function(a) {
                                    a.text.match(/goToUrl \("/) && (a = a.text.split(/goToUrl \("([\s\S]*?)"\);/), location = a[1]);
                                }));
                            } catch (a) {}
                        }));
                        b.observe(document, {
                            childList: !0,
                            subtree: !0
                        });
                        setTimeout((function() {
                            b.disconnect();
                        }), 1e4);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "1b7a3b5c1b1b60eb96bdd9dfb49f36ed", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1b7a3b5c1b1b60eb96bdd9dfb49f36ed" due to: ' + error);
        }
    },
    "document.addEventListener('DOMContentLoad', function() { setTimeout(function() { second = 0; }, 300); });": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["034a6d2e27669874997985e584d3fc8b"] === flag) {
                return;
            }
            document.addEventListener("DOMContentLoad", (function() {
                setTimeout((function() {
                    second = 0;
                }), 300);
            }));
            Object.defineProperty(Window.prototype.toString, "034a6d2e27669874997985e584d3fc8b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "034a6d2e27669874997985e584d3fc8b" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/?r=")){var a=location.href.split("?r=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["307379e4f228b3973b29e647d7b9d240"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/?r=")) {
                    var a = location.href.split("?r=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "307379e4f228b3973b29e647d7b9d240", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "307379e4f228b3973b29e647d7b9d240" due to: ' + error);
        }
    },
    "(function(){var c=window.setInterval;window.setInterval=function(f,g){return g===1e3&&/removeAttr\\('disabled'\\)/.test(f.toString())&&(g*=0.01),c.apply(this,arguments)}.bind(window)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8a9f85f8cf15c1e19462f7c54155e865"] === flag) {
                return;
            }
            (function() {
                var c = window.setInterval;
                window.setInterval = function(f, g) {
                    return g === 1e3 && /removeAttr\('disabled'\)/.test(f.toString()) && (g *= .01), 
                    c.apply(this, arguments);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "8a9f85f8cf15c1e19462f7c54155e865", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8a9f85f8cf15c1e19462f7c54155e865" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{setTimeout(function(){if("undefined"!==typeof aesCrypto&&"function"===typeof aesCrypto.decrypt&&-1<window.location.href.indexOf("#?o="))try{window.location=aesCrypto.decrypt(window.location.href.split("#?o=")[1].replace(/^\\s+/,"").replace(/\\s+$/,""),"root".replace(/^\\s+/,"").replace(/\\s+$/,""))}catch(a){}},300)})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6d9ca9f617340a6d9976710f1e5a7b50"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        if ("undefined" !== typeof aesCrypto && "function" === typeof aesCrypto.decrypt && -1 < window.location.href.indexOf("#?o=")) try {
                            window.location = aesCrypto.decrypt(window.location.href.split("#?o=")[1].replace(/^\s+/, "").replace(/\s+$/, ""), "root".replace(/^\s+/, "").replace(/\s+$/, ""));
                        } catch (a) {}
                    }), 300);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "6d9ca9f617340a6d9976710f1e5a7b50", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6d9ca9f617340a6d9976710f1e5a7b50" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{setTimeout(function(){if("undefined"!==typeof aesCrypto&&"function"===typeof aesCrypto.decrypt&&-1<window.location.href.indexOf("#?o="))try{window.location=aesCrypto.decrypt($.urlParam("o").replace(/^\\s+/,"").replace(/\\s+$/,""),"root".replace(/^\\s+/,"").replace(/\\s+$/,""))}catch(a){}},300)})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e3c828d254377a11d58cabf38f975080"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        if ("undefined" !== typeof aesCrypto && "function" === typeof aesCrypto.decrypt && -1 < window.location.href.indexOf("#?o=")) try {
                            window.location = aesCrypto.decrypt($.urlParam("o").replace(/^\s+/, "").replace(/\s+$/, ""), "root".replace(/^\s+/, "").replace(/\s+$/, ""));
                        } catch (a) {}
                    }), 300);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "e3c828d254377a11d58cabf38f975080", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e3c828d254377a11d58cabf38f975080" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{setTimeout(function(){if("function"===typeof convertstr&&"function"===typeof aesCrypto.decrypt&&-1<window.location.href.indexOf("html#?o="))try{window.location=aesCrypto.decrypt(convertstr($.urlParam("o")),convertstr("root"))}catch(a){}},300)})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e50329594db3b07068dcf74209e441a3"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        if ("function" === typeof convertstr && "function" === typeof aesCrypto.decrypt && -1 < window.location.href.indexOf("html#?o=")) try {
                            window.location = aesCrypto.decrypt(convertstr($.urlParam("o")), convertstr("root"));
                        } catch (a) {}
                    }), 300);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "e50329594db3b07068dcf74209e441a3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e50329594db3b07068dcf74209e441a3" due to: ' + error);
        }
    },
    "(function(){var c=window.setInterval;window.setInterval=function(f,g){return g===1e3&&/'#timer'/.test(f.toString())&&(g*=0.01),c.apply(this,arguments)}.bind(window)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["de338228231bafa3ab4463a596c1790d"] === flag) {
                return;
            }
            (function() {
                var c = window.setInterval;
                window.setInterval = function(f, g) {
                    return g === 1e3 && /'#timer'/.test(f.toString()) && (g *= .01), c.apply(this, arguments);
                }.bind(window);
            })();
            Object.defineProperty(Window.prototype.toString, "de338228231bafa3ab4463a596c1790d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "de338228231bafa3ab4463a596c1790d" due to: ' + error);
        }
    },
    '(()=>{const a=new MutationObserver(function(){const b=document.querySelector("script[src^=\\"/assets/js/unlock.js\\"]");if(b){a.disconnect();let c;for(let a of b.attributes)if(a.textContent.includes("aHR0c")){c=a.textContent;break}c&&setTimeout(function(){location.assign(atob(c))},500)}});a.observe(document,{childList:!0,subtree:!0})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["36bc1f9853e93deac861c56d6200a5b0"] === flag) {
                return;
            }
            (() => {
                const a = new MutationObserver((function() {
                    const b = document.querySelector('script[src^="/assets/js/unlock.js"]');
                    if (b) {
                        a.disconnect();
                        let c;
                        for (let a of b.attributes) if (a.textContent.includes("aHR0c")) {
                            c = a.textContent;
                            break;
                        }
                        c && setTimeout((function() {
                            location.assign(atob(c));
                        }), 500);
                    }
                }));
                a.observe(document, {
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "36bc1f9853e93deac861c56d6200a5b0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "36bc1f9853e93deac861c56d6200a5b0" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener(\'DOMContentLoaded\',()=>{if(-1!==window.location.href.indexOf("onet.pl/?utm_source=")){const o=new MutationObserver(function(){var e=document.querySelector(\'a[href][onclick*="Nitro_clickmore"][onclick*="czytaj_wiecej"], a[href][class^="NitroCard_sectionLink_"], article[class^="NitroCard_nitroCard__"] > a[href][class^="Common_sectionLink__"]:not([href^="undefined"])\');e&&(o.disconnect(),location.replace(e.href))});o.observe(document,{childList:!0,subtree:!0}),setTimeout(function(){o.disconnect()},1e4)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1ef1848adf82a2225338e1cf0d384d9f"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    if (-1 !== window.location.href.indexOf("onet.pl/?utm_source=")) {
                        const o = new MutationObserver((function() {
                            var e = document.querySelector('a[href][onclick*="Nitro_clickmore"][onclick*="czytaj_wiecej"], a[href][class^="NitroCard_sectionLink_"], article[class^="NitroCard_nitroCard__"] > a[href][class^="Common_sectionLink__"]:not([href^="undefined"])');
                            e && (o.disconnect(), location.replace(e.href));
                        }));
                        o.observe(document, {
                            childList: !0,
                            subtree: !0
                        }), setTimeout((function() {
                            o.disconnect();
                        }), 1e4);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "1ef1848adf82a2225338e1cf0d384d9f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1ef1848adf82a2225338e1cf0d384d9f" due to: ' + error);
        }
    },
    "!function(){if(-1<location.pathname.indexOf(\"/pushredirect/\")){var url=new URL(window.location.href); var dest=url.searchParams.get('dest'); if(dest){location=dest;}}}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6b5cea966014c82ed21c8c5706e0bee8"] === flag) {
                return;
            }
            !function() {
                if (-1 < location.pathname.indexOf("/pushredirect/")) {
                    var url = new URL(window.location.href);
                    var dest = url.searchParams.get("dest");
                    if (dest) {
                        location = dest;
                    }
                }
            }();
            Object.defineProperty(Window.prototype.toString, "6b5cea966014c82ed21c8c5706e0bee8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6b5cea966014c82ed21c8c5706e0bee8" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("dynamic?r=")&&!/https?:\\/\\/(www\\.)?h-gen\\.xyz\\//.test(document.referrer)){var a=location.href.split("?r=");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fefa615247862ad4c7b0ecd9355c39fd"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("dynamic?r=") && !/https?:\/\/(www\.)?h-gen\.xyz\//.test(document.referrer)) {
                    var a = location.href.split("?r=");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "fefa615247862ad4c7b0ecd9355c39fd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fefa615247862ad4c7b0ecd9355c39fd" due to: ' + error);
        }
    },
    "!function(){const t={apply:(t,e,n)=>{const a=Reflect.apply(t,e,n);return a?.data?.getDetailPageContent?.linkCustomAdOffers&&(a.data.getDetailPageContent.linkCustomAdOffers=[]),a}};window.JSON.parse=new Proxy(window.JSON.parse,t)}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c4448628d8540260def416c0db16d29f"] === flag) {
                return;
            }
            !function() {
                const t = {
                    apply: (t, e, n) => {
                        const a = Reflect.apply(t, e, n);
                        return a?.data?.getDetailPageContent?.linkCustomAdOffers && (a.data.getDetailPageContent.linkCustomAdOffers = []), 
                        a;
                    }
                };
                window.JSON.parse = new Proxy(window.JSON.parse, t);
            }();
            Object.defineProperty(Window.prototype.toString, "c4448628d8540260def416c0db16d29f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c4448628d8540260def416c0db16d29f" due to: ' + error);
        }
    },
    "(() => {document.addEventListener(\"DOMContentLoaded\", (() => {setTimeout(function() { if(typeof player.pause != 'undefined') { player.pause(); } }, 3000);}));})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a74d879c7ac45de88fa5296db6cc0537"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    setTimeout((function() {
                        if (typeof player.pause != "undefined") {
                            player.pause();
                        }
                    }), 3e3);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "a74d879c7ac45de88fa5296db6cc0537", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a74d879c7ac45de88fa5296db6cc0537" due to: ' + error);
        }
    },
    '(function(){var a="http"+(new URL(window.location.href)).searchParams.get("xurl");try{new URL(a);var b=!0}catch(c){b=!1}if(b)try{window.location=a}catch(c){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["df209bc351ff0553f6a35cad491038e2"] === flag) {
                return;
            }
            (function() {
                var a = "http" + new URL(window.location.href).searchParams.get("xurl");
                try {
                    new URL(a);
                    var b = !0;
                } catch (c) {
                    b = !1;
                }
                if (b) try {
                    window.location = a;
                } catch (c) {}
            })();
            Object.defineProperty(Window.prototype.toString, "df209bc351ff0553f6a35cad491038e2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "df209bc351ff0553f6a35cad491038e2" due to: ' + error);
        }
    },
    "window.self = window.top;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["443a08e7b42a84571d7f5117b4d64c9f"] === flag) {
                return;
            }
            window.self = window.top;
            Object.defineProperty(Window.prototype.toString, "443a08e7b42a84571d7f5117b4d64c9f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "443a08e7b42a84571d7f5117b4d64c9f" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{var b=document.getElementById("sm_dl_wait");if(b){var c=document.createElement("a");c.setAttribute("href",b.getAttribute("data-id"));c.innerHTML="<b>"+("function"==typeof window.a?IMSLPGetMsg("js-s"):"Click here to continue your download.")+"</b>";var d=document.createElement("style");d.innerHTML="#sm_dl_wait{display:none!important;}";b.parentNode.insertBefore(c,b);b.parentNode.insertBefore(d,b)}}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7b45e913b52ddafeab6005ad59c3472a"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    var b = document.getElementById("sm_dl_wait");
                    if (b) {
                        var c = document.createElement("a");
                        c.setAttribute("href", b.getAttribute("data-id"));
                        c.innerHTML = "<b>" + ("function" == typeof window.a ? IMSLPGetMsg("js-s") : "Click here to continue your download.") + "</b>";
                        var d = document.createElement("style");
                        d.innerHTML = "#sm_dl_wait{display:none!important;}";
                        b.parentNode.insertBefore(c, b);
                        b.parentNode.insertBefore(d, b);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "7b45e913b52ddafeab6005ad59c3472a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7b45e913b52ddafeab6005ad59c3472a" due to: ' + error);
        }
    },
    '(()=>{["contextmenu","copy","selectstart"].forEach((o=>{window.addEventListener(o,(o=>{o.stopPropagation()}),!0)}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["58381ff8715080c5ddef89be33326b0c"] === flag) {
                return;
            }
            (() => {
                [ "contextmenu", "copy", "selectstart" ].forEach((o => {
                    window.addEventListener(o, (o => {
                        o.stopPropagation();
                    }), !0);
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "58381ff8715080c5ddef89be33326b0c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "58381ff8715080c5ddef89be33326b0c" due to: ' + error);
        }
    },
    'window.addEventListener("contextmenu",function(a){a.stopPropagation()},!0); window.addEventListener("copy",function(a){a.stopPropagation()},!0);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f5bda0983617c9e82a78a551426bbb32"] === flag) {
                return;
            }
            window.addEventListener("contextmenu", (function(a) {
                a.stopPropagation();
            }), !0);
            window.addEventListener("copy", (function(a) {
                a.stopPropagation();
            }), !0);
            Object.defineProperty(Window.prototype.toString, "f5bda0983617c9e82a78a551426bbb32", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f5bda0983617c9e82a78a551426bbb32" due to: ' + error);
        }
    },
    'window.addEventListener("selectstart",function(a){a.stopPropagation()},!0);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bd1b4f0e1559b5644a30844b6213ffd3"] === flag) {
                return;
            }
            window.addEventListener("selectstart", (function(a) {
                a.stopPropagation();
            }), !0);
            Object.defineProperty(Window.prototype.toString, "bd1b4f0e1559b5644a30844b6213ffd3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bd1b4f0e1559b5644a30844b6213ffd3" due to: ' + error);
        }
    },
    "(function(){z=self.EventTarget.prototype.addEventListener;self.EventTarget.prototype.addEventListener=function(a,b){if(!/cut|copy|paste/.test(a.toString()))return z.apply(this,arguments)}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8342d640dabc53d6d2d38df78178b78e"] === flag) {
                return;
            }
            (function() {
                z = self.EventTarget.prototype.addEventListener;
                self.EventTarget.prototype.addEventListener = function(a, b) {
                    if (!/cut|copy|paste/.test(a.toString())) return z.apply(this, arguments);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8342d640dabc53d6d2d38df78178b78e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8342d640dabc53d6d2d38df78178b78e" due to: ' + error);
        }
    },
    'window.addEventListener("contextmenu",function(a){a.stopPropagation()},!0);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["99382d0bad7923913149eaceb54a5bcd"] === flag) {
                return;
            }
            window.addEventListener("contextmenu", (function(a) {
                a.stopPropagation();
            }), !0);
            Object.defineProperty(Window.prototype.toString, "99382d0bad7923913149eaceb54a5bcd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "99382d0bad7923913149eaceb54a5bcd" due to: ' + error);
        }
    },
    '(function(){const b=function(d){const a=Math.pow(10,d-1),b=Math.pow(10,d);return Math.floor(Math.random()*(b-a)+a)}(12);window.addEventListener("load",function(){window.google_image_requests=[],window.google_global_correlator=b,window._hmt=window._hmt||[],_hmt.id=b})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["eb04a415377ef4ca383dbeb96bc0959d"] === flag) {
                return;
            }
            (function() {
                const b = function(d) {
                    const a = Math.pow(10, d - 1), b = Math.pow(10, d);
                    return Math.floor(Math.random() * (b - a) + a);
                }(12);
                window.addEventListener("load", (function() {
                    window.google_image_requests = [], window.google_global_correlator = b, window._hmt = window._hmt || [], 
                    _hmt.id = b;
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "eb04a415377ef4ca383dbeb96bc0959d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "eb04a415377ef4ca383dbeb96bc0959d" due to: ' + error);
        }
    },
    'function preventError(d){window.addEventListener("error",function(a){if(a.srcElement&&a.srcElement.src){const b=new RegExp(d);b.test(a.srcElement.src)&&(a.srcElement.onerror=function(){})}},!0)}preventError(/^(?!.*(rt-error.js)).*$/);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2c65b37bc179c213f5741f032fbc81bd"] === flag) {
                return;
            }
            function preventError(d) {
                window.addEventListener("error", (function(a) {
                    if (a.srcElement && a.srcElement.src) {
                        const b = new RegExp(d);
                        b.test(a.srcElement.src) && (a.srcElement.onerror = function() {});
                    }
                }), !0);
            }
            preventError(/^(?!.*(rt-error.js)).*$/);
            Object.defineProperty(Window.prototype.toString, "2c65b37bc179c213f5741f032fbc81bd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2c65b37bc179c213f5741f032fbc81bd" due to: ' + error);
        }
    },
    "window.ad = window.ads = window.dzad = window.dzads = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["ae3e820b38653aaf630b5b70d22a1bb6"] === flag) {
                return;
            }
            window.ad = window.ads = window.dzad = window.dzads = true;
            Object.defineProperty(Window.prototype.toString, "ae3e820b38653aaf630b5b70d22a1bb6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "ae3e820b38653aaf630b5b70d22a1bb6" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/Adblock/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e156fcdd4472579f7801d0e4acc20c97"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/Adblock/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "e156fcdd4472579f7801d0e4acc20c97", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e156fcdd4472579f7801d0e4acc20c97" due to: ' + error);
        }
    },
    "(function(){window._czc={push:function(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["23ea3840e6c6f4717038a47e91ac5633"] === flag) {
                return;
            }
            (function() {
                window._czc = {
                    push: function() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "23ea3840e6c6f4717038a47e91ac5633", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "23ea3840e6c6f4717038a47e91ac5633" due to: ' + error);
        }
    },
    "(()=>{const t={apply:(t,o,a)=>{try{const t=o?.[0]?.data?.data??o?.data;t?.ad&&(t.ad={}),t?.ykad&&(t.ykad={})}catch(t){}return Reflect.apply(t,o,a)}};window.Array.prototype.slice=new Proxy(window.Array.prototype.slice,t),window.Object.prototype.hasOwnProperty=new Proxy(window.Object.prototype.hasOwnProperty,t)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["77bcd5521c5ec38b72cb9eb02b922338"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, o, a) => {
                        try {
                            const t = o?.[0]?.data?.data ?? o?.data;
                            t?.ad && (t.ad = {}), t?.ykad && (t.ykad = {});
                        } catch (t) {}
                        return Reflect.apply(t, o, a);
                    }
                };
                window.Array.prototype.slice = new Proxy(window.Array.prototype.slice, t), window.Object.prototype.hasOwnProperty = new Proxy(window.Object.prototype.hasOwnProperty, t);
            })();
            Object.defineProperty(Window.prototype.toString, "77bcd5521c5ec38b72cb9eb02b922338", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "77bcd5521c5ec38b72cb9eb02b922338" due to: ' + error);
        }
    },
    '(()=>{const e="cna",t=()=>null!==document.cookie.match(new RegExp(`^${e}=|; ${e}=`));if(t())return;const o=new MutationObserver((()=>{const o=document.querySelector("preplay-layer > error-layer .preLayer-title");o&&o.textContent.includes("请关闭VPN代理软件或广告拦截插件后重试")&&!t()&&(document.cookie=`${e}=MwCHGEQKugYCAWoLKcbU0UGk;`,window.location.reload())})),n=document.documentElement;o.observe(n,{attributes:!0,childList:!0,subtree:!0}),setTimeout((()=>o.disconnect()),1e4)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5f869f3607985cefd0f1d204585853ad"] === flag) {
                return;
            }
            (() => {
                const e = "cna", t = () => null !== document.cookie.match(new RegExp(`^${e}=|; ${e}=`));
                if (t()) return;
                const o = new MutationObserver((() => {
                    const o = document.querySelector("preplay-layer > error-layer .preLayer-title");
                    o && o.textContent.includes("请关闭VPN代理软件或广告拦截插件后重试") && !t() && (document.cookie = `${e}=MwCHGEQKugYCAWoLKcbU0UGk;`, 
                    window.location.reload());
                })), n = document.documentElement;
                o.observe(n, {
                    attributes: !0,
                    childList: !0,
                    subtree: !0
                }), setTimeout((() => o.disconnect()), 1e4);
            })();
            Object.defineProperty(Window.prototype.toString, "5f869f3607985cefd0f1d204585853ad", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5f869f3607985cefd0f1d204585853ad" due to: ' + error);
        }
    },
    "(()=>{let e=!1;window.qyMesh=window.qyMesh||{},window.qyMesh=new Proxy(window.qyMesh,{get:function(a,t,d){return!e&&a?.preload?.Page_recommend_1?.response?.items&&(a.preload.Page_recommend_1.response.items.forEach((e=>{e.extData?.dataExtAd&&(e.extData.dataExtAd={}),e.video&&e.video.forEach((e=>{e.adverts&&(e.adverts=[]),e.data&&(e.data=e.data.filter((e=>!e.ad)))}))})),e=!0),Reflect.get(a,t,d)}})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fde1dae48543296e9f6bd72f2157ce95"] === flag) {
                return;
            }
            (() => {
                let e = !1;
                window.qyMesh = window.qyMesh || {}, window.qyMesh = new Proxy(window.qyMesh, {
                    get: function(a, t, d) {
                        return !e && a?.preload?.Page_recommend_1?.response?.items && (a.preload.Page_recommend_1.response.items.forEach((e => {
                            e.extData?.dataExtAd && (e.extData.dataExtAd = {}), e.video && e.video.forEach((e => {
                                e.adverts && (e.adverts = []), e.data && (e.data = e.data.filter((e => !e.ad)));
                            }));
                        })), e = !0), Reflect.get(a, t, d);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "fde1dae48543296e9f6bd72f2157ce95", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fde1dae48543296e9f6bd72f2157ce95" due to: ' + error);
        }
    },
    '(function(){window.eval=new Proxy(eval,{apply:(e,c,n)=>{const o=Reflect.apply(e,c,n);if("object"==typeof o&&o.banners)try{o.banners.forEach(((e,c)=>{e.commercial&&(e.commercial={})}))}catch(e){console.debug(e)}return o}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["119696f6d27a9b6c225cdaa7954a52fd"] === flag) {
                return;
            }
            (function() {
                window.eval = new Proxy(eval, {
                    apply: (e, c, n) => {
                        const o = Reflect.apply(e, c, n);
                        if ("object" == typeof o && o.banners) try {
                            o.banners.forEach(((e, c) => {
                                e.commercial && (e.commercial = {});
                            }));
                        } catch (e) {
                            console.debug(e);
                        }
                        return o;
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "119696f6d27a9b6c225cdaa7954a52fd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "119696f6d27a9b6c225cdaa7954a52fd" due to: ' + error);
        }
    },
    '(()=>{const e=Promise.resolve({code:200}),t=()=>{},s=()=>({promise:e}),n=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"],r=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],o=()=>{const e={};return n.forEach(t=>{e[t]=s}),r.forEach(s=>{e[s]=t}),e},i=function(){},c=function(){return this};["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"].forEach(e=>{i.prototype[e]=c}),i.prototype.getUserProperties=()=>({}),i.prototype.getEventProperties=()=>({});const d=(t,s=[])=>{s.forEach(t=>{t.resolve?.(e)})},p=window.amplitude||{};Object.assign(p,o(),{createInstance:e=>{const t=o();return e&&p._iq&&(p._iq[e]=t),t},runQueuedFunctions:d,Identify:i,Revenue:i}),window.amplitude=p,p.invoked&&(d(0,p._q),p._q=[],Object.keys(p._iq||{}).forEach(e=>{const t=Object.assign(p._iq[e],o());d(0,t._q),t._q=[]}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["3ab24128eccb37db781483fefedba398"] === flag) {
                return;
            }
            (() => {
                const e = Promise.resolve({
                    code: 200
                }), t = () => {}, s = () => ({
                    promise: e
                }), n = [ "init", "add", "remove", "track", "logEvent", "identify", "groupIdentify", "setGroup", "revenue", "flush" ], r = [ "getDeviceId", "setDeviceId", "getSessionId", "setSessionId", "getUserId", "setUserId", "setOptOut", "setTransport", "reset", "extendSession" ], o = () => {
                    const e = {};
                    return n.forEach((t => {
                        e[t] = s;
                    })), r.forEach((s => {
                        e[s] = t;
                    })), e;
                }, i = function() {}, c = function() {
                    return this;
                };
                [ "add", "append", "clearAll", "prepend", "set", "setOnce", "unset", "preInsert", "postInsert", "remove", "setProductId", "setQuantity", "setPrice", "setRevenue", "setRevenueType", "setEventProperties" ].forEach((e => {
                    i.prototype[e] = c;
                })), i.prototype.getUserProperties = () => ({}), i.prototype.getEventProperties = () => ({});
                const d = (t, s = []) => {
                    s.forEach((t => {
                        t.resolve?.(e);
                    }));
                }, p = window.amplitude || {};
                Object.assign(p, o(), {
                    createInstance: e => {
                        const t = o();
                        return e && p._iq && (p._iq[e] = t), t;
                    },
                    runQueuedFunctions: d,
                    Identify: i,
                    Revenue: i
                }), window.amplitude = p, p.invoked && (d(0, p._q), p._q = [], Object.keys(p._iq || {}).forEach((e => {
                    const t = Object.assign(p._iq[e], o());
                    d(0, t._q), t._q = [];
                })));
            })();
            Object.defineProperty(Window.prototype.toString, "3ab24128eccb37db781483fefedba398", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "3ab24128eccb37db781483fefedba398" due to: ' + error);
        }
    },
    '(()=>{const t={detect:()=>({bot:!1})},e={apply:(e,o,n)=>{try{const r=n[0];return"function"==typeof r&&r.toString().includes("Botd.load")?Promise.resolve(t):Reflect.apply(e,o,n)}catch(t){return Reflect.apply(e,o,n)}}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,e)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f9f6bbf8384615ad0ee86c40539bb83e"] === flag) {
                return;
            }
            (() => {
                const t = {
                    detect: () => ({
                        bot: !1
                    })
                }, e = {
                    apply: (e, o, n) => {
                        try {
                            const r = n[0];
                            return "function" == typeof r && r.toString().includes("Botd.load") ? Promise.resolve(t) : Reflect.apply(e, o, n);
                        } catch (t) {
                            return Reflect.apply(e, o, n);
                        }
                    }
                };
                window.Promise.prototype.then = new Proxy(window.Promise.prototype.then, e);
            })();
            Object.defineProperty(Window.prototype.toString, "f9f6bbf8384615ad0ee86c40539bb83e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f9f6bbf8384615ad0ee86c40539bb83e" due to: ' + error);
        }
    },
    '(()=>{const i=function(){};window.__uid2=window.__uid2||{},window.__uid2.init=i,window.__uid2.setIdentityFromEmail=i,window.__uid2.callbacks=window.__uid2.callbacks||[],window.__uid2.callbacks.push=function(i){"function"==typeof i&&i("InitCompleted",{identity:null})}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b2a535efb393e3b426f36ad8e34ba1f7"] === flag) {
                return;
            }
            (() => {
                const i = function() {};
                window.__uid2 = window.__uid2 || {}, window.__uid2.init = i, window.__uid2.setIdentityFromEmail = i, 
                window.__uid2.callbacks = window.__uid2.callbacks || [], window.__uid2.callbacks.push = function(i) {
                    "function" == typeof i && i("InitCompleted", {
                        identity: null
                    });
                };
            })();
            Object.defineProperty(Window.prototype.toString, "b2a535efb393e3b426f36ad8e34ba1f7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b2a535efb393e3b426f36ad8e34ba1f7" due to: ' + error);
        }
    },
    "setTimeout(function() { var el = document.querySelector('input[name=\"dfp\"]'); if(el){el.value = '1234567890123456';} }, 300);": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a07f45c054f1a02c9581416dcc133e06"] === flag) {
                return;
            }
            setTimeout((function() {
                var el = document.querySelector('input[name="dfp"]');
                if (el) {
                    el.value = "1234567890123456";
                }
            }), 300);
            Object.defineProperty(Window.prototype.toString, "a07f45c054f1a02c9581416dcc133e06", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a07f45c054f1a02c9581416dcc133e06" due to: ' + error);
        }
    },
    "(()=>{const n=function(){};window.pa={avInsights:{Media:function(){return{set:n}}},setConfigurations:n,sendEvent:n,refresh:n,getVisitorId:n}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["79d1903ec5ebd79ef6e85148b259526b"] === flag) {
                return;
            }
            (() => {
                const n = function() {};
                window.pa = {
                    avInsights: {
                        Media: function() {
                            return {
                                set: n
                            };
                        }
                    },
                    setConfigurations: n,
                    sendEvent: n,
                    refresh: n,
                    getVisitorId: n
                };
            })();
            Object.defineProperty(Window.prototype.toString, "79d1903ec5ebd79ef6e85148b259526b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "79d1903ec5ebd79ef6e85148b259526b" due to: ' + error);
        }
    },
    '(()=>{window.analytics=[],analytics.user=function(){return this},analytics.track=function(){},analytics.anonymousId=function(){},analytics.push=function(){[...arguments].forEach((n=>{if("function"==typeof n)try{n()}catch(n){console.debug(n)}Array.isArray(n)&&[...n].forEach((n=>{if("function"==typeof n)try{n()}catch(n){console.debug(n)}}))}))};})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c5eccff17c5bfd7b81d14b2ae2d579e6"] === flag) {
                return;
            }
            (() => {
                window.analytics = [], analytics.user = function() {
                    return this;
                }, analytics.track = function() {}, analytics.anonymousId = function() {}, analytics.push = function() {
                    [ ...arguments ].forEach((n => {
                        if ("function" == typeof n) try {
                            n();
                        } catch (n) {
                            console.debug(n);
                        }
                        Array.isArray(n) && [ ...n ].forEach((n => {
                            if ("function" == typeof n) try {
                                n();
                            } catch (n) {
                                console.debug(n);
                            }
                        }));
                    }));
                };
            })();
            Object.defineProperty(Window.prototype.toString, "c5eccff17c5bfd7b81d14b2ae2d579e6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c5eccff17c5bfd7b81d14b2ae2d579e6" due to: ' + error);
        }
    },
    '(()=>{window.ga=function(){const a=arguments.length;if(0===a)return;const b=arguments[a-1];let c;b instanceof Object&&null!==b&&"function"==typeof b.hitCallback?c=b.hitCallback:"function"==typeof b&&(c=()=>{b(ga.create())});try{setTimeout(c,1)}catch(a){}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c36460b31e5b7f98f266af7f13766c20"] === flag) {
                return;
            }
            (() => {
                window.ga = function() {
                    const a = arguments.length;
                    if (0 === a) return;
                    const b = arguments[a - 1];
                    let c;
                    b instanceof Object && null !== b && "function" == typeof b.hitCallback ? c = b.hitCallback : "function" == typeof b && (c = () => {
                        b(ga.create());
                    });
                    try {
                        setTimeout(c, 1);
                    } catch (a) {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "c36460b31e5b7f98f266af7f13766c20", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c36460b31e5b7f98f266af7f13766c20" due to: ' + error);
        }
    },
    "(()=>{const t={getExperimentStates:function(){return[]}};window.optimizely={get:function(){return t}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f7c0c8e9372a7fa53bbbce0298119df8"] === flag) {
                return;
            }
            (() => {
                const t = {
                    getExperimentStates: function() {
                        return [];
                    }
                };
                window.optimizely = {
                    get: function() {
                        return t;
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "f7c0c8e9372a7fa53bbbce0298119df8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f7c0c8e9372a7fa53bbbce0298119df8" due to: ' + error);
        }
    },
    "(()=>{window.google_optimize={get(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["36df238a158cc003e8a8e5fdca90b30c"] === flag) {
                return;
            }
            (() => {
                window.google_optimize = {
                    get() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "36df238a158cc003e8a8e5fdca90b30c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "36df238a158cc003e8a8e5fdca90b30c" due to: ' + error);
        }
    },
    "(()=>{window.tC={event:{track(){}}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["99d72f7c5b99c10e8cdafc4f2cfcb2fd"] === flag) {
                return;
            }
            (() => {
                window.tC = {
                    event: {
                        track() {}
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "99d72f7c5b99c10e8cdafc4f2cfcb2fd", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "99d72f7c5b99c10e8cdafc4f2cfcb2fd" due to: ' + error);
        }
    },
    "(()=>{window.CQ_Analytics={SegmentMgr:{loadSegments(){}},ClientContextUtils:{init(){}}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8715a0ec32e4b4aacff2e980a0cc496f"] === flag) {
                return;
            }
            (() => {
                window.CQ_Analytics = {
                    SegmentMgr: {
                        loadSegments() {}
                    },
                    ClientContextUtils: {
                        init() {}
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8715a0ec32e4b4aacff2e980a0cc496f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8715a0ec32e4b4aacff2e980a0cc496f" due to: ' + error);
        }
    },
    "(function(){window.DD_LOGS={onReady:function(){},logger:{log:function(){}}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8b87d29cf52f44fbcd9dd5303e9f1ad3"] === flag) {
                return;
            }
            (function() {
                window.DD_LOGS = {
                    onReady: function() {},
                    logger: {
                        log: function() {}
                    }
                };
            })();
            Object.defineProperty(Window.prototype.toString, "8b87d29cf52f44fbcd9dd5303e9f1ad3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8b87d29cf52f44fbcd9dd5303e9f1ad3" due to: ' + error);
        }
    },
    "(function(){window.swua={swEvent:function(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f28a1bc10a399048b74c1518d0e7b0c4"] === flag) {
                return;
            }
            (function() {
                window.swua = {
                    swEvent: function() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "f28a1bc10a399048b74c1518d0e7b0c4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f28a1bc10a399048b74c1518d0e7b0c4" due to: ' + error);
        }
    },
    "!function(){window.pSUPERFLY={virtualPage:function(){}};}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["400e65f5eeab811a9c314d5e9dc23b9a"] === flag) {
                return;
            }
            !function() {
                window.pSUPERFLY = {
                    virtualPage: function() {}
                };
            }();
            Object.defineProperty(Window.prototype.toString, "400e65f5eeab811a9c314d5e9dc23b9a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "400e65f5eeab811a9c314d5e9dc23b9a" due to: ' + error);
        }
    },
    'new MutationObserver(function(){var t=["?fbclid","%3Ffbclid","&fbclid","%26fbclid","&__tn__","%__26tn__","%3Futm","?utm","&fbc=","%26fbc%3D","?share=","%3Fshare%3D","%3F__twitter_impression%3D","?__twitter_impression=","?wtmc=","%3Fwtmc%3D","?originalReferrer=","%3ForiginalReferrer%3D","?wtrid=","%3Fwtrid%3D","?trbo=","%3Ftrbo%3D","?GEPC=","%3FGEPC%3D","?whatsapp=","%3Fwhatsapp%3D","?fbc=","%3Ffbc%3D","?dmcid=","%3Fdmcid%3D"];document.querySelectorAll(\'a[target="_blank"]\').forEach(function(e){for(i=0;i<t.length;i++){var r;e.href.includes(t[i])&&(r=(r=(r=e.href.split("#!")[1])||e.href.split("%23%21")[1])||"",e.href.includes("#!")&&(r="#!"+r),e.href.includes("%23%21")&&(r="%23%21"+r),r=(r=(r=e.href.split("&feature=share&")[1])||e.href.split("%26feature%3Dshare%26")[1])||"",e.href.includes("&feature=share&")&&(r="?"+r),e.href.includes("%26feature%3Dshare%26")&&(r="%3F"+r),r=(r=(r=e.href.split("&h=")[1])||e.href.split("%26h%3D")[1])||"",e.href.includes("&h=")&&(r="&h="+r),e.href.includes("%26h%3D")&&(r="%26h%3D"+r),e.setAttribute("href",e.href.split(t[i])[0]+r))}})}).observe(document,{childList:!0,subtree:!0});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["2ca94c74fb35fa6f5e63d15da842f5b6"] === flag) {
                return;
            }
            new MutationObserver((function() {
                var t = [ "?fbclid", "%3Ffbclid", "&fbclid", "%26fbclid", "&__tn__", "%__26tn__", "%3Futm", "?utm", "&fbc=", "%26fbc%3D", "?share=", "%3Fshare%3D", "%3F__twitter_impression%3D", "?__twitter_impression=", "?wtmc=", "%3Fwtmc%3D", "?originalReferrer=", "%3ForiginalReferrer%3D", "?wtrid=", "%3Fwtrid%3D", "?trbo=", "%3Ftrbo%3D", "?GEPC=", "%3FGEPC%3D", "?whatsapp=", "%3Fwhatsapp%3D", "?fbc=", "%3Ffbc%3D", "?dmcid=", "%3Fdmcid%3D" ];
                document.querySelectorAll('a[target="_blank"]').forEach((function(e) {
                    for (i = 0; i < t.length; i++) {
                        var r;
                        e.href.includes(t[i]) && (r = (r = (r = e.href.split("#!")[1]) || e.href.split("%23%21")[1]) || "", 
                        e.href.includes("#!") && (r = "#!" + r), e.href.includes("%23%21") && (r = "%23%21" + r), 
                        r = (r = (r = e.href.split("&feature=share&")[1]) || e.href.split("%26feature%3Dshare%26")[1]) || "", 
                        e.href.includes("&feature=share&") && (r = "?" + r), e.href.includes("%26feature%3Dshare%26") && (r = "%3F" + r), 
                        r = (r = (r = e.href.split("&h=")[1]) || e.href.split("%26h%3D")[1]) || "", e.href.includes("&h=") && (r = "&h=" + r), 
                        e.href.includes("%26h%3D") && (r = "%26h%3D" + r), e.setAttribute("href", e.href.split(t[i])[0] + r));
                    }
                }));
            })).observe(document, {
                childList: !0,
                subtree: !0
            });
            Object.defineProperty(Window.prototype.toString, "2ca94c74fb35fa6f5e63d15da842f5b6", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "2ca94c74fb35fa6f5e63d15da842f5b6" due to: ' + error);
        }
    },
    'new MutationObserver(function(){var t=["&eid=","%26eid%3D","?eid=","%3Feid%3D","?__tn__=","%3F%5F%5Ftn%5F%5F%3D","&__tn__=","%26%5F%5Ftn%5F%5F%3D","?source=","%3Fsource%3D","?__xts__","%3F%5F%5Fxts%5F%5F","&__xts__","%26%5F%5Fxts%5F%5F","&amp;__xts__%5B","?ref=","%3Fref%3D","?fref=","%3Ffref%3D","?epa=","%3Fepa%3D","&ifg=","%26ifg%3D","?comment_tracking=","%3Fcomment_tracking%3D","?av=","%3Fav%3D","&av=","%26av%3D","?acontext=","%3Facontext%3D","&session_id=","%26session_id%3D","&amp;session_id=","?hc_location=","%3Fhc_location%3D","&fref=","%26fref%3D","?__cft","%3f__cft"];document.querySelectorAll(\'a:not([target="_blank"]):not([href*="2fac/"])\').forEach(function(e){for(i=0;i<t.length;i++)e.href.includes(t[i])&&e.setAttribute("href",e.href.split(t[i])[0])})}).observe(document,{childList:!0,subtree:!0});': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b53943d876c5b199f25b9db1658e015b"] === flag) {
                return;
            }
            new MutationObserver((function() {
                var t = [ "&eid=", "%26eid%3D", "?eid=", "%3Feid%3D", "?__tn__=", "%3F%5F%5Ftn%5F%5F%3D", "&__tn__=", "%26%5F%5Ftn%5F%5F%3D", "?source=", "%3Fsource%3D", "?__xts__", "%3F%5F%5Fxts%5F%5F", "&__xts__", "%26%5F%5Fxts%5F%5F", "&amp;__xts__%5B", "?ref=", "%3Fref%3D", "?fref=", "%3Ffref%3D", "?epa=", "%3Fepa%3D", "&ifg=", "%26ifg%3D", "?comment_tracking=", "%3Fcomment_tracking%3D", "?av=", "%3Fav%3D", "&av=", "%26av%3D", "?acontext=", "%3Facontext%3D", "&session_id=", "%26session_id%3D", "&amp;session_id=", "?hc_location=", "%3Fhc_location%3D", "&fref=", "%26fref%3D", "?__cft", "%3f__cft" ];
                document.querySelectorAll('a:not([target="_blank"]):not([href*="2fac/"])').forEach((function(e) {
                    for (i = 0; i < t.length; i++) e.href.includes(t[i]) && e.setAttribute("href", e.href.split(t[i])[0]);
                }));
            })).observe(document, {
                childList: !0,
                subtree: !0
            });
            Object.defineProperty(Window.prototype.toString, "b53943d876c5b199f25b9db1658e015b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b53943d876c5b199f25b9db1658e015b" due to: ' + error);
        }
    },
    "var _gaq = []; var _gat = { _getTracker: function() { return { _initData: function(){}, _trackPageview: function(){}, _trackEvent: function(){}, _setAllowLinker: function() {}, _setCustomVar: function() {} } }, _createTracker: function() { return this._getTracker(); }, _anonymizeIp: function() {} };": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9af1bf2ffd37b0dabb58c7227027d089"] === flag) {
                return;
            }
            var _gaq = [];
            var _gat = {
                _getTracker: function() {
                    return {
                        _initData: function() {},
                        _trackPageview: function() {},
                        _trackEvent: function() {},
                        _setAllowLinker: function() {},
                        _setCustomVar: function() {}
                    };
                },
                _createTracker: function() {
                    return this._getTracker();
                },
                _anonymizeIp: function() {}
            };
            Object.defineProperty(Window.prototype.toString, "9af1bf2ffd37b0dabb58c7227027d089", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9af1bf2ffd37b0dabb58c7227027d089" due to: ' + error);
        }
    },
    "function urchinTracker() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["aad463a3895c1cb1e7e6311e112123e8"] === flag) {
                return;
            }
            function urchinTracker() {}
            Object.defineProperty(Window.prototype.toString, "aad463a3895c1cb1e7e6311e112123e8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "aad463a3895c1cb1e7e6311e112123e8" due to: ' + error);
        }
    },
    "window.ga = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a760a3059d00f32d9d1298bce181428e"] === flag) {
                return;
            }
            window.ga = function() {};
            Object.defineProperty(Window.prototype.toString, "a760a3059d00f32d9d1298bce181428e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a760a3059d00f32d9d1298bce181428e" due to: ' + error);
        }
    },
    "window.google_trackConversion = function() {};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["71153fe6d998e6884985cac5294b8a71"] === flag) {
                return;
            }
            window.google_trackConversion = function() {};
            Object.defineProperty(Window.prototype.toString, "71153fe6d998e6884985cac5294b8a71", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "71153fe6d998e6884985cac5294b8a71" due to: ' + error);
        }
    },
    "(()=>{window.a2a={init(){}}})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c0325f223958d06b946b83a6dd260418"] === flag) {
                return;
            }
            (() => {
                window.a2a = {
                    init() {}
                };
            })();
            Object.defineProperty(Window.prototype.toString, "c0325f223958d06b946b83a6dd260418", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c0325f223958d06b946b83a6dd260418" due to: ' + error);
        }
    },
    "twttr={events: { bind: function() {} }};": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["14a0dfcfc56570b45c7aa35014affd67"] === flag) {
                return;
            }
            twttr = {
                events: {
                    bind: function() {}
                }
            };
            Object.defineProperty(Window.prototype.toString, "14a0dfcfc56570b45c7aa35014affd67", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "14a0dfcfc56570b45c7aa35014affd67" due to: ' + error);
        }
    },
    "!function(){window.somtag={cmd:function(){}};}();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["54ae50f5a5c3a82be06ee24cd3c05183"] === flag) {
                return;
            }
            !function() {
                window.somtag = {
                    cmd: function() {}
                };
            }();
            Object.defineProperty(Window.prototype.toString, "54ae50f5a5c3a82be06ee24cd3c05183", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "54ae50f5a5c3a82be06ee24cd3c05183" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/\\]\\.bab\\(window/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["346833de4a18e6e5f53bde8d214083c7"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/\]\.bab\(window/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "346833de4a18e6e5f53bde8d214083c7", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "346833de4a18e6e5f53bde8d214083c7" due to: ' + error);
        }
    },
    "window.werbeblocker = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["0f7c5eb1cea174c4baeb46ecd074e090"] === flag) {
                return;
            }
            window.werbeblocker = true;
            Object.defineProperty(Window.prototype.toString, "0f7c5eb1cea174c4baeb46ecd074e090", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "0f7c5eb1cea174c4baeb46ecd074e090" due to: ' + error);
        }
    },
    "adet = false;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a44a6107aec5ff60e35ccabb1052df4d"] === flag) {
                return;
            }
            adet = false;
            Object.defineProperty(Window.prototype.toString, "a44a6107aec5ff60e35ccabb1052df4d", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a44a6107aec5ff60e35ccabb1052df4d" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{"function"==typeof initPage&&initPage()}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["094835ecb49c317258d87cdb8826694a"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    "function" == typeof initPage && initPage();
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "094835ecb49c317258d87cdb8826694a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "094835ecb49c317258d87cdb8826694a" due to: ' + error);
        }
    },
    "(()=>{const t={construct:(t,n,e)=>{const o=n[0],r=o?.toString();return r&&r.length>500&&r.length<1e3&&/=>[\\s\\S]*?for[\\s\\S]*?\\[.+\\]/.test(r)&&(n[0]=()=>{}),Reflect.construct(t,n,e)}};window.MutationObserver=new Proxy(window.MutationObserver,t)})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c7d43d7f4bded61bedc6218a5f6b0727"] === flag) {
                return;
            }
            (() => {
                const t = {
                    construct: (t, n, e) => {
                        const o = n[0], r = o?.toString();
                        return r && r.length > 500 && r.length < 1e3 && /=>[\s\S]*?for[\s\S]*?\[.+\]/.test(r) && (n[0] = () => {}), 
                        Reflect.construct(t, n, e);
                    }
                };
                window.MutationObserver = new Proxy(window.MutationObserver, t);
            })();
            Object.defineProperty(Window.prototype.toString, "c7d43d7f4bded61bedc6218a5f6b0727", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c7d43d7f4bded61bedc6218a5f6b0727" due to: ' + error);
        }
    },
    "(()=>{document.addEventListener('DOMContentLoaded',()=>{const o=[];[...document.scripts].forEach((c=>{const n=c.innerText,t=/window\\..*\\[\"(.*)\"]/;if(n.includes('\"impr\":')){const c=n.match(t)[1];o.push(c)}})),o.forEach((o=>{const c=document.querySelector(`.${o}`);c&&c.remove()}))})})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["457e0165e3e3728dbee48f0406d58268"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    const o = [];
                    [ ...document.scripts ].forEach((c => {
                        const n = c.innerText, t = /window\..*\["(.*)"]/;
                        if (n.includes('"impr":')) {
                            const c = n.match(t)[1];
                            o.push(c);
                        }
                    })), o.forEach((o => {
                        const c = document.querySelector(`.${o}`);
                        c && c.remove();
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "457e0165e3e3728dbee48f0406d58268", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "457e0165e3e3728dbee48f0406d58268" due to: ' + error);
        }
    },
    '(()=>{window.XMLHttpRequest.prototype.send=new Proxy(window.XMLHttpRequest.prototype.send,{apply:(a,b,c)=>{const d=b.urlCalled;return"string"!=typeof d||0===d.length?Reflect.apply(a,b,c):d.match(/\\.damoh\\./)?void 0:Reflect.apply(a,b,c)}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cc36ce7238df0916503c980264bdfe26"] === flag) {
                return;
            }
            (() => {
                window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, {
                    apply: (a, b, c) => {
                        const d = b.urlCalled;
                        return "string" != typeof d || 0 === d.length ? Reflect.apply(a, b, c) : d.match(/\.damoh\./) ? void 0 : Reflect.apply(a, b, c);
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "cc36ce7238df0916503c980264bdfe26", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cc36ce7238df0916503c980264bdfe26" due to: ' + error);
        }
    },
    '!function(){var n={cmd:[],public:{getVideoAdUrl:function(){},createNewPosition:function(){},refreshAds:function(){},setTargetingOnPosition:function(){},getDailymotionAdsParamsForScript:function(n,t){if("function"==typeof t)try{1===t.length&&t({preroll:"moviepilot"})}catch(t){}},setConfig:function(){},loadPositions:function(){},displayPositions:function(){}}};n.cmd.push=function(n){let t=function(){try{"function"==typeof n&&n()}catch(n){}};"complete"===document.readyState?t():window.addEventListener("load",(()=>{t()}))},window.jad=n}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["f1c7875f7971c5540a49992dc8a2bd9e"] === flag) {
                return;
            }
            !function() {
                var n = {
                    cmd: [],
                    public: {
                        getVideoAdUrl: function() {},
                        createNewPosition: function() {},
                        refreshAds: function() {},
                        setTargetingOnPosition: function() {},
                        getDailymotionAdsParamsForScript: function(n, t) {
                            if ("function" == typeof t) try {
                                1 === t.length && t({
                                    preroll: "moviepilot"
                                });
                            } catch (t) {}
                        },
                        setConfig: function() {},
                        loadPositions: function() {},
                        displayPositions: function() {}
                    }
                };
                n.cmd.push = function(n) {
                    let t = function() {
                        try {
                            "function" == typeof n && n();
                        } catch (n) {}
                    };
                    "complete" === document.readyState ? t() : window.addEventListener("load", (() => {
                        t();
                    }));
                }, window.jad = n;
            }();
            Object.defineProperty(Window.prototype.toString, "f1c7875f7971c5540a49992dc8a2bd9e", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "f1c7875f7971c5540a49992dc8a2bd9e" due to: ' + error);
        }
    },
    'var st = ".sidebar > div.widget-container:first-of-type, .sidebar > a[href^=\\"http://future-sale-system.de\\"], #messageList > li.message:not([id]), .sidebar > a[target=\\"_blank\\"] > img {display: none!important; }", a=document.createElement("style");a.type="text/css";a.styleSheet?a.styleSheet.cssText=st:a.innerHTML=st;document.getElementsByTagName("head")[0].appendChild(a);': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["d5fec51f23abfe393fc62b4a6d96a44b"] === flag) {
                return;
            }
            var st = '.sidebar > div.widget-container:first-of-type, .sidebar > a[href^="http://future-sale-system.de"], #messageList > li.message:not([id]), .sidebar > a[target="_blank"] > img {display: none!important; }', a = document.createElement("style");
            a.type = "text/css";
            a.styleSheet ? a.styleSheet.cssText = st : a.innerHTML = st;
            document.getElementsByTagName("head")[0].appendChild(a);
            Object.defineProperty(Window.prototype.toString, "d5fec51f23abfe393fc62b4a6d96a44b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "d5fec51f23abfe393fc62b4a6d96a44b" due to: ' + error);
        }
    },
    "window.disablePopUnder = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b80435e9460675a80ec183f27eb50cbf"] === flag) {
                return;
            }
            window.disablePopUnder = true;
            Object.defineProperty(Window.prototype.toString, "b80435e9460675a80ec183f27eb50cbf", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b80435e9460675a80ec183f27eb50cbf" due to: ' + error);
        }
    },
    "var originalUserAgent = navigator.userAgent; Object.defineProperty(navigator, 'userAgent', { get: function() { return originalUserAgent + ' Edge'; } });": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c3123d07eda7051ae1561c7613cf6cd8"] === flag) {
                return;
            }
            var originalUserAgent = navigator.userAgent;
            Object.defineProperty(navigator, "userAgent", {
                get: function() {
                    return originalUserAgent + " Edge";
                }
            });
            Object.defineProperty(Window.prototype.toString, "c3123d07eda7051ae1561c7613cf6cd8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c3123d07eda7051ae1561c7613cf6cd8" due to: ' + error);
        }
    },
    '(()=>{let e=[];document.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelector("body script").textContent.match(/"] = \'(.*?)\'/g);if(!t)return;t.forEach((t=>{const r=t.replace(/.*\'(.*?)\'/,"$1");e.push(r)}));const r=document.querySelector(\'.dl_button[href*="preview"]\').href.split("?")[1];e.includes(r)&&(e=e.filter((e=>e!==r)));document.querySelectorAll(".dl_button[href]").forEach((t=>{let r=t.cloneNode(!0);r.href=t.href.replace(/\\?.*/,`?${e[0]}`),t.after(r);let o=t.cloneNode(!0);o.href=t.href.replace(/\\?.*/,`?${e[1]}`),t.after(o)}))}))})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["dd2ab3ea1b069f5b262d0c2924b695ca"] === flag) {
                return;
            }
            (() => {
                let e = [];
                document.addEventListener("DOMContentLoaded", (() => {
                    const t = document.querySelector("body script").textContent.match(/"] = '(.*?)'/g);
                    if (!t) return;
                    t.forEach((t => {
                        const r = t.replace(/.*'(.*?)'/, "$1");
                        e.push(r);
                    }));
                    const r = document.querySelector('.dl_button[href*="preview"]').href.split("?")[1];
                    e.includes(r) && (e = e.filter((e => e !== r)));
                    document.querySelectorAll(".dl_button[href]").forEach((t => {
                        let r = t.cloneNode(!0);
                        r.href = t.href.replace(/\?.*/, `?${e[0]}`), t.after(r);
                        let o = t.cloneNode(!0);
                        o.href = t.href.replace(/\?.*/, `?${e[1]}`), t.after(o);
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "dd2ab3ea1b069f5b262d0c2924b695ca", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "dd2ab3ea1b069f5b262d0c2924b695ca" due to: ' + error);
        }
    },
    '(function(){const a=Function.prototype.toString;window.EventTarget.prototype.addEventListener=new Proxy(window.EventTarget.prototype.addEventListener,{apply:(b,c,d)=>{const e=d[1],f=/detail.adblockDetected|handleAdblockDetect|Flags.autoRecov/;return e&&"function"==typeof e&&(f.test(a.call(e))||f.test(e.toString()))&&(d[1]=function(){}),Reflect.apply(b,c,d)}});Function.prototype.bind=new Proxy(Function.prototype.bind,{apply:(b,c,d)=>{const e=a.call(c),f=Reflect.apply(b,c,d);return f.toString=function(){return e},f}})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e33ef1a5a53f3c2f5bbed2ef8c665146"] === flag) {
                return;
            }
            (function() {
                const a = Function.prototype.toString;
                window.EventTarget.prototype.addEventListener = new Proxy(window.EventTarget.prototype.addEventListener, {
                    apply: (b, c, d) => {
                        const e = d[1], f = /detail.adblockDetected|handleAdblockDetect|Flags.autoRecov/;
                        return e && "function" == typeof e && (f.test(a.call(e)) || f.test(e.toString())) && (d[1] = function() {}), 
                        Reflect.apply(b, c, d);
                    }
                });
                Function.prototype.bind = new Proxy(Function.prototype.bind, {
                    apply: (b, c, d) => {
                        const e = a.call(c), f = Reflect.apply(b, c, d);
                        return f.toString = function() {
                            return e;
                        }, f;
                    }
                });
            })();
            Object.defineProperty(Window.prototype.toString, "e33ef1a5a53f3c2f5bbed2ef8c665146", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e33ef1a5a53f3c2f5bbed2ef8c665146" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,n)=>{try{if((new Error).stack.includes("Popup"))return Reflect.apply(t,e,n);"function"==typeof e&&e.toString().includes(".offsetHeight||0===")&&(e=()=>new Promise((t=>t(!1))))}catch(t){}return Reflect.apply(t,e,n)}};window.Function.prototype.apply=new Proxy(window.Function.prototype.apply,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b63c5cffdd3d07d24388045672104422"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, n) => {
                        try {
                            if ((new Error).stack.includes("Popup")) return Reflect.apply(t, e, n);
                            "function" == typeof e && e.toString().includes(".offsetHeight||0===") && (e = () => new Promise((t => t(!1))));
                        } catch (t) {}
                        return Reflect.apply(t, e, n);
                    }
                };
                window.Function.prototype.apply = new Proxy(window.Function.prototype.apply, t);
            })();
            Object.defineProperty(Window.prototype.toString, "b63c5cffdd3d07d24388045672104422", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b63c5cffdd3d07d24388045672104422" due to: ' + error);
        }
    },
    '(()=>{const o={apply:(o,e,t)=>{try{const o=t[0];if(o?.src?.includes?.("imasdk.googleapis.com/js/sdkloader/ima")){const e=document.createElement("script");t[0]=e,setTimeout((()=>{if("function"==typeof o?.onload)try{o.onload()}catch(o){}}),1e3)}}catch(o){}return Reflect.apply(o,e,t)}};window.Node.prototype.appendChild=new Proxy(window.Node.prototype.appendChild,o)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["1898836430be91f5fd6d4c0c6cfd2d7c"] === flag) {
                return;
            }
            (() => {
                const o = {
                    apply: (o, e, t) => {
                        try {
                            const o = t[0];
                            if (o?.src?.includes?.("imasdk.googleapis.com/js/sdkloader/ima")) {
                                const e = document.createElement("script");
                                t[0] = e, setTimeout((() => {
                                    if ("function" == typeof o?.onload) try {
                                        o.onload();
                                    } catch (o) {}
                                }), 1e3);
                            }
                        } catch (o) {}
                        return Reflect.apply(o, e, t);
                    }
                };
                window.Node.prototype.appendChild = new Proxy(window.Node.prototype.appendChild, o);
            })();
            Object.defineProperty(Window.prototype.toString, "1898836430be91f5fd6d4c0c6cfd2d7c", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "1898836430be91f5fd6d4c0c6cfd2d7c" due to: ' + error);
        }
    },
    '!function(){var t={cmd:[],public:{getVideoAdUrl:function(){},createNewPosition:function(){},refreshAds:function(){},setTargetingOnPosition:function(){},getDailymotionAdsParamsForScript:function(t,n){if("function"==typeof n)try{if(1===n.length){const o=t[0];n({[o]:o})}}catch(n){console.debug(n)}}}};t.cmd.push=function(t){let n=function(){try{"function"==typeof t&&t()}catch(t){}};"complete"===document.readyState?n():window.addEventListener("load",(()=>{n()}))},window.jad=t}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["4b02efce565c43abd97593b12856ccd8"] === flag) {
                return;
            }
            !function() {
                var t = {
                    cmd: [],
                    public: {
                        getVideoAdUrl: function() {},
                        createNewPosition: function() {},
                        refreshAds: function() {},
                        setTargetingOnPosition: function() {},
                        getDailymotionAdsParamsForScript: function(t, n) {
                            if ("function" == typeof n) try {
                                if (1 === n.length) {
                                    const o = t[0];
                                    n({
                                        [o]: o
                                    });
                                }
                            } catch (n) {
                                console.debug(n);
                            }
                        }
                    }
                };
                t.cmd.push = function(t) {
                    let n = function() {
                        try {
                            "function" == typeof t && t();
                        } catch (t) {}
                    };
                    "complete" === document.readyState ? n() : window.addEventListener("load", (() => {
                        n();
                    }));
                }, window.jad = t;
            }();
            Object.defineProperty(Window.prototype.toString, "4b02efce565c43abd97593b12856ccd8", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "4b02efce565c43abd97593b12856ccd8" due to: ' + error);
        }
    },
    '!function(){if(-1<window.location.href.indexOf("/#aHR0c")){var a=location.href.split("/#");if(a&&a[1])try{window.location=atob(a[1])}catch(b){}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["8b3aa220c71f03621cb9cd086eb59619"] === flag) {
                return;
            }
            !function() {
                if (-1 < window.location.href.indexOf("/#aHR0c")) {
                    var a = location.href.split("/#");
                    if (a && a[1]) try {
                        window.location = atob(a[1]);
                    } catch (b) {}
                }
            }();
            Object.defineProperty(Window.prototype.toString, "8b3aa220c71f03621cb9cd086eb59619", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "8b3aa220c71f03621cb9cd086eb59619" due to: ' + error);
        }
    },
    '(function(){var b=XMLHttpRequest.prototype.open,c=/pagead2\\.googlesyndication\\.com/i;XMLHttpRequest.prototype.open=function(d,a){if("GET"===d&&c.test(a))this.send=function(){return null},this.setRequestHeader=function(){return null},console.log("AG has blocked request: ",a);else return b.apply(this,arguments)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["b56615f06c5a4f3d6dbd34cd41a23997"] === flag) {
                return;
            }
            (function() {
                var b = XMLHttpRequest.prototype.open, c = /pagead2\.googlesyndication\.com/i;
                XMLHttpRequest.prototype.open = function(d, a) {
                    if ("GET" === d && c.test(a)) this.send = function() {
                        return null;
                    }, this.setRequestHeader = function() {
                        return null;
                    }, console.log("AG has blocked request: ", a); else return b.apply(this, arguments);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "b56615f06c5a4f3d6dbd34cd41a23997", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "b56615f06c5a4f3d6dbd34cd41a23997" due to: ' + error);
        }
    },
    '(()=>{let e="";const t={adsbygoogle:{url:"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",value:"google_plmetrics"},outbrain:{url:"//widgets.outbrain.com/outbrain.js",value:"outbrain"},cdnpcStyleMin:{url:"//s4.cdnpc.net/front/css/style.min.css",value:"slider--features"},cdnpcMain:{url:"//s4.cdnpc.net/vite-bundle/main.css",value:"data-v-d23a26c8"},taboola:{url:"//cdn.taboola.com/libtrc/san1go-network/loader.js",value:"feOffset"}},n=n=>{try{const o=n;if(!o.responseText){const n=(e=>{const n=Object.values(t).find((t=>e.includes(t.url)));return n?n.value:""})(e);Object.defineProperty(o,"responseText",{value:n})}"function"==typeof o.onload&&o.onload(),"function"==typeof o.onreadystatechange&&(Object.defineProperty(o,"status",{value:200}),Object.defineProperty(o,"readyState",{value:4}),o.onreadystatechange())}catch(e){console.trace(e)}},o={apply:(n,o,a)=>{const r=a[1];return r&&(e=>Object.values(t).some((t=>e.includes(t.url))))(r)&&(o.prevent=!0,e=r),Reflect.apply(n,o,a)}};window.XMLHttpRequest.prototype.open=new Proxy(window.XMLHttpRequest.prototype.open,o);const a={apply:async(t,o,a)=>{if(!o.prevent)return Reflect.apply(t,o,a);try{const t=await fetch(e);if((await t.text()).length<2e3)return n(o)}catch(e){return console.trace(e),n(o)}return Reflect.apply(t,o,a)}};window.XMLHttpRequest.prototype.send=new Proxy(window.XMLHttpRequest.prototype.send,a)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["999651d762087524799a382abaeba96f"] === flag) {
                return;
            }
            (() => {
                let e = "";
                const t = {
                    adsbygoogle: {
                        url: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                        value: "google_plmetrics"
                    },
                    outbrain: {
                        url: "//widgets.outbrain.com/outbrain.js",
                        value: "outbrain"
                    },
                    cdnpcStyleMin: {
                        url: "//s4.cdnpc.net/front/css/style.min.css",
                        value: "slider--features"
                    },
                    cdnpcMain: {
                        url: "//s4.cdnpc.net/vite-bundle/main.css",
                        value: "data-v-d23a26c8"
                    },
                    taboola: {
                        url: "//cdn.taboola.com/libtrc/san1go-network/loader.js",
                        value: "feOffset"
                    }
                }, n = n => {
                    try {
                        const o = n;
                        if (!o.responseText) {
                            const n = (e => {
                                const n = Object.values(t).find((t => e.includes(t.url)));
                                return n ? n.value : "";
                            })(e);
                            Object.defineProperty(o, "responseText", {
                                value: n
                            });
                        }
                        "function" == typeof o.onload && o.onload(), "function" == typeof o.onreadystatechange && (Object.defineProperty(o, "status", {
                            value: 200
                        }), Object.defineProperty(o, "readyState", {
                            value: 4
                        }), o.onreadystatechange());
                    } catch (e) {
                        console.trace(e);
                    }
                }, o = {
                    apply: (n, o, a) => {
                        const r = a[1];
                        return r && (e => Object.values(t).some((t => e.includes(t.url))))(r) && (o.prevent = !0, 
                        e = r), Reflect.apply(n, o, a);
                    }
                };
                window.XMLHttpRequest.prototype.open = new Proxy(window.XMLHttpRequest.prototype.open, o);
                const a = {
                    apply: async (t, o, a) => {
                        if (!o.prevent) return Reflect.apply(t, o, a);
                        try {
                            const t = await fetch(e);
                            if ((await t.text()).length < 2e3) return n(o);
                        } catch (e) {
                            return console.trace(e), n(o);
                        }
                        return Reflect.apply(t, o, a);
                    }
                };
                window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, a);
            })();
            Object.defineProperty(Window.prototype.toString, "999651d762087524799a382abaeba96f", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "999651d762087524799a382abaeba96f" due to: ' + error);
        }
    },
    "window.loadingAds = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["92cb1336a3ae04946fb7472ef921e5a2"] === flag) {
                return;
            }
            window.loadingAds = true;
            Object.defineProperty(Window.prototype.toString, "92cb1336a3ae04946fb7472ef921e5a2", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "92cb1336a3ae04946fb7472ef921e5a2" due to: ' + error);
        }
    },
    "window.N3CanRunAds = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["bf2528e3820489391dd14ff4e676bf77"] === flag) {
                return;
            }
            window.N3CanRunAds = true;
            Object.defineProperty(Window.prototype.toString, "bf2528e3820489391dd14ff4e676bf77", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "bf2528e3820489391dd14ff4e676bf77" due to: ' + error);
        }
    },
    "window.UFads = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6f1638cef962ca7bcf9ae1cd4762f141"] === flag) {
                return;
            }
            window.UFads = true;
            Object.defineProperty(Window.prototype.toString, "6f1638cef962ca7bcf9ae1cd4762f141", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6f1638cef962ca7bcf9ae1cd4762f141" due to: ' + error);
        }
    },
    "window.pr_okvalida=true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9cea5435efc0d37e874e0db2f82cafe5"] === flag) {
                return;
            }
            window.pr_okvalida = true;
            Object.defineProperty(Window.prototype.toString, "9cea5435efc0d37e874e0db2f82cafe5", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9cea5435efc0d37e874e0db2f82cafe5" due to: ' + error);
        }
    },
    "window.pr_okAd = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a20a9b76443176de1d59662b7bec69ac"] === flag) {
                return;
            }
            window.pr_okAd = true;
            Object.defineProperty(Window.prototype.toString, "a20a9b76443176de1d59662b7bec69ac", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a20a9b76443176de1d59662b7bec69ac" due to: ' + error);
        }
    },
    "window.adblockDetecter = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["077ad96f9724037e5e50572b0e1dad20"] === flag) {
                return;
            }
            window.adblockDetecter = true;
            Object.defineProperty(Window.prototype.toString, "077ad96f9724037e5e50572b0e1dad20", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "077ad96f9724037e5e50572b0e1dad20" due to: ' + error);
        }
    },
    "window.isAdsDisplayed = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["6fdd528c721ed150a4988b0a7c6d81fb"] === flag) {
                return;
            }
            window.isAdsDisplayed = true;
            Object.defineProperty(Window.prototype.toString, "6fdd528c721ed150a4988b0a7c6d81fb", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "6fdd528c721ed150a4988b0a7c6d81fb" due to: ' + error);
        }
    },
    "window.pr_okvalida = true;": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["61d8c36d64bce12eddcaa6d5227fb569"] === flag) {
                return;
            }
            window.pr_okvalida = true;
            Object.defineProperty(Window.prototype.toString, "61d8c36d64bce12eddcaa6d5227fb569", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "61d8c36d64bce12eddcaa6d5227fb569" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{try{let t;"function"==typeof decode_link&&"string"==typeof link_out&&(t=decode_link(atob(link_out)),location.assign(t)),"string"==typeof api_key&&(document.cookie=`${api_key}=Wn275; path=/`);const e=document.querySelector("* > .button#contador");e&&t&&setTimeout((()=>{const o=e.cloneNode(!0);e.parentNode.replaceChild(o,e),o.addEventListener("click",(function(){location.assign(t)}),!1)}),500)}catch(t){}}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["90c94b5e54df0c8bc3584e6dd04ae87a"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    try {
                        let t;
                        "function" == typeof decode_link && "string" == typeof link_out && (t = decode_link(atob(link_out)), 
                        location.assign(t)), "string" == typeof api_key && (document.cookie = `${api_key}=Wn275; path=/`);
                        const e = document.querySelector("* > .button#contador");
                        e && t && setTimeout((() => {
                            const o = e.cloneNode(!0);
                            e.parentNode.replaceChild(o, e), o.addEventListener("click", (function() {
                                location.assign(t);
                            }), !1);
                        }), 500);
                    } catch (t) {}
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "90c94b5e54df0c8bc3584e6dd04ae87a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "90c94b5e54df0c8bc3584e6dd04ae87a" due to: ' + error);
        }
    },
    '(()=>{window.addEventListener("load",(()=>{document.querySelectorAll(\'.count > li > a[href*="/#!"]\').forEach((t=>{const e=(t=>{let e=t;for(let t=0;t<10;t++)try{e=atob(e)}catch(t){break}return decodeURIComponent(e)})(t.href.split("/#!")[1]);(t=>{let e=t;try{e=new URL(t)}catch(t){return!1}return"http:"===e.protocol||"https:"===e.protocol})(e)&&t.setAttribute("href",e)}))}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["96e43c3e77d12216cc72163eb5a036f3"] === flag) {
                return;
            }
            (() => {
                window.addEventListener("load", (() => {
                    document.querySelectorAll('.count > li > a[href*="/#!"]').forEach((t => {
                        const e = (t => {
                            let e = t;
                            for (let t = 0; t < 10; t++) try {
                                e = atob(e);
                            } catch (t) {
                                break;
                            }
                            return decodeURIComponent(e);
                        })(t.href.split("/#!")[1]);
                        (t => {
                            let e = t;
                            try {
                                e = new URL(t);
                            } catch (t) {
                                return !1;
                            }
                            return "http:" === e.protocol || "https:" === e.protocol;
                        })(e) && t.setAttribute("href", e);
                    }));
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "96e43c3e77d12216cc72163eb5a036f3", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "96e43c3e77d12216cc72163eb5a036f3" due to: ' + error);
        }
    },
    '!function(){if(window.location.href.includes(".php?")&&window.location.href.includes("=")){const o=location.href.split("=");if(o&&o[1]){let t=o[1];for(let o=0;o<10;o++)try{t=atob(t)}catch(o){const n=decodeURIComponent(t);let c=!1;try{new URL(n),c=!0}catch(o){c=!1}if(c){location.assign(n);break}}}}}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["aed92a9e5fa43ee06d13ea0740f42251"] === flag) {
                return;
            }
            !function() {
                if (window.location.href.includes(".php?") && window.location.href.includes("=")) {
                    const o = location.href.split("=");
                    if (o && o[1]) {
                        let t = o[1];
                        for (let o = 0; o < 10; o++) try {
                            t = atob(t);
                        } catch (o) {
                            const n = decodeURIComponent(t);
                            let c = !1;
                            try {
                                new URL(n), c = !0;
                            } catch (o) {
                                c = !1;
                            }
                            if (c) {
                                location.assign(n);
                                break;
                            }
                        }
                    }
                }
            }();
            Object.defineProperty(Window.prototype.toString, "aed92a9e5fa43ee06d13ea0740f42251", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "aed92a9e5fa43ee06d13ea0740f42251" due to: ' + error);
        }
    },
    '(function(){if(-1<window.location.href.indexOf("/#")){var b=location.href.split("/#");if(b&&b[1]){b=b[1];for(var f=0;10>f;f++)try{b=atob(b)}catch(a){var g=decodeURIComponent(b);g=g.split("&url=")[1];try{new URL(g);var h=!0}catch(a){h=!1}if(h){location.assign(g);break}}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["e461bea6c1765b5004b1bdf45a657484"] === flag) {
                return;
            }
            (function() {
                if (-1 < window.location.href.indexOf("/#")) {
                    var b = location.href.split("/#");
                    if (b && b[1]) {
                        b = b[1];
                        for (var f = 0; 10 > f; f++) try {
                            b = atob(b);
                        } catch (a) {
                            var g = decodeURIComponent(b);
                            g = g.split("&url=")[1];
                            try {
                                new URL(g);
                                var h = !0;
                            } catch (a) {
                                h = !1;
                            }
                            if (h) {
                                location.assign(g);
                                break;
                            }
                        }
                    }
                }
            })();
            Object.defineProperty(Window.prototype.toString, "e461bea6c1765b5004b1bdf45a657484", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "e461bea6c1765b5004b1bdf45a657484" due to: ' + error);
        }
    },
    '(function(){if(-1<window.location.href.indexOf("/#")){var b=location.href.split("/#");if(b&&b[1]){b=b[1];for(var f=0;10>f;f++)try{b=atob(b)}catch(a){var g=decodeURIComponent(b);try{new URL(g);var h=!0}catch(a){h=!1}if(h){location.assign(g);break}}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["9b5e9479cf0e6f4ce35ed63d4353bab4"] === flag) {
                return;
            }
            (function() {
                if (-1 < window.location.href.indexOf("/#")) {
                    var b = location.href.split("/#");
                    if (b && b[1]) {
                        b = b[1];
                        for (var f = 0; 10 > f; f++) try {
                            b = atob(b);
                        } catch (a) {
                            var g = decodeURIComponent(b);
                            try {
                                new URL(g);
                                var h = !0;
                            } catch (a) {
                                h = !1;
                            }
                            if (h) {
                                location.assign(g);
                                break;
                            }
                        }
                    }
                }
            })();
            Object.defineProperty(Window.prototype.toString, "9b5e9479cf0e6f4ce35ed63d4353bab4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "9b5e9479cf0e6f4ce35ed63d4353bab4" due to: ' + error);
        }
    },
    '(function(){if(-1<window.location.href.indexOf("/#!")){var b=location.href.split("/#!");if(b&&b[1]){b=b[1];for(var f=0;10>f;f++)try{b=atob(b)}catch(a){var g=decodeURIComponent(b);try{new URL(g);var h=!0}catch(a){h=!1}if(h){location.assign(g);break}}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["06564135eca95acc020e6910b740c355"] === flag) {
                return;
            }
            (function() {
                if (-1 < window.location.href.indexOf("/#!")) {
                    var b = location.href.split("/#!");
                    if (b && b[1]) {
                        b = b[1];
                        for (var f = 0; 10 > f; f++) try {
                            b = atob(b);
                        } catch (a) {
                            var g = decodeURIComponent(b);
                            try {
                                new URL(g);
                                var h = !0;
                            } catch (a) {
                                h = !1;
                            }
                            if (h) {
                                location.assign(g);
                                break;
                            }
                        }
                    }
                }
            })();
            Object.defineProperty(Window.prototype.toString, "06564135eca95acc020e6910b740c355", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "06564135eca95acc020e6910b740c355" due to: ' + error);
        }
    },
    '(function(){if(-1<window.location.href.indexOf("o.php?l=")){var b=location.href.split("o.php?l=");if(b&&b[1]){b=b[1].replace(/\\|\\d/,\'\');for(var f=0;10>f;f++)try{b=atob(b)}catch(a){var g=decodeURIComponent(b);try{new URL(g);var h=!0}catch(a){h=!1}if(h){location.assign(g);break}}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["7236b4fca7e3b34846de4af64f512064"] === flag) {
                return;
            }
            (function() {
                if (-1 < window.location.href.indexOf("o.php?l=")) {
                    var b = location.href.split("o.php?l=");
                    if (b && b[1]) {
                        b = b[1].replace(/\|\d/, "");
                        for (var f = 0; 10 > f; f++) try {
                            b = atob(b);
                        } catch (a) {
                            var g = decodeURIComponent(b);
                            try {
                                new URL(g);
                                var h = !0;
                            } catch (a) {
                                h = !1;
                            }
                            if (h) {
                                location.assign(g);
                                break;
                            }
                        }
                    }
                }
            })();
            Object.defineProperty(Window.prototype.toString, "7236b4fca7e3b34846de4af64f512064", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "7236b4fca7e3b34846de4af64f512064" due to: ' + error);
        }
    },
    '(()=>{document.addEventListener("DOMContentLoaded",(()=>{try{"function"==typeof window.noobBypass&&noobBypass()}catch(b){}}));})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cf094940c140bb6a8015c9e1f15490f1"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (() => {
                    try {
                        "function" == typeof window.noobBypass && noobBypass();
                    } catch (b) {}
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "cf094940c140bb6a8015c9e1f15490f1", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cf094940c140bb6a8015c9e1f15490f1" due to: ' + error);
        }
    },
    '(()=>{const t={apply:(t,e,o)=>{try{return o[1]&&o[1].includes("tab2")&&(o[1]=o[1].replace(/window\\[.\\[\\d+\\]\\](\\(\\("")/,"location.assign$1"),o[1]=o[1].replace(/(openPopup\\(\\){(this.*?)= )window.*?(;const)/,\'$1document.createElement("iframe");$2.style.display="none";document.body.appendChild($2)$3\'),o[1]=o[1].replace(/(this\\[.\\[\\d+\\]\\]).{1,20}(\\(.\\)\\} checkPopupStatus\\(\\)\\{)/,"$1.contentWindow.document.write$2$1=window;postMessage(\'_clicked_b\', location.origin);return;")),Reflect.apply(t,e,o)}catch(n){return Reflect.apply(t,e,o)}}};window.Function.prototype.constructor=new Proxy(window.Function.prototype.constructor,t)})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["cc1451a3253dfa9862cb5daaea0f974b"] === flag) {
                return;
            }
            (() => {
                const t = {
                    apply: (t, e, o) => {
                        try {
                            return o[1] && o[1].includes("tab2") && (o[1] = o[1].replace(/window\[.\[\d+\]\](\(\("")/, "location.assign$1"), 
                            o[1] = o[1].replace(/(openPopup\(\){(this.*?)= )window.*?(;const)/, '$1document.createElement("iframe");$2.style.display="none";document.body.appendChild($2)$3'), 
                            o[1] = o[1].replace(/(this\[.\[\d+\]\]).{1,20}(\(.\)\} checkPopupStatus\(\)\{)/, "$1.contentWindow.document.write$2$1=window;postMessage('_clicked_b', location.origin);return;")), 
                            Reflect.apply(t, e, o);
                        } catch (n) {
                            return Reflect.apply(t, e, o);
                        }
                    }
                };
                window.Function.prototype.constructor = new Proxy(window.Function.prototype.constructor, t);
            })();
            Object.defineProperty(Window.prototype.toString, "cc1451a3253dfa9862cb5daaea0f974b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "cc1451a3253dfa9862cb5daaea0f974b" due to: ' + error);
        }
    },
    '!function(){const e=e=>{const o=new XMLHttpRequest;o.open("POST","/check.php",!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.send("a");const t=atob(window.ext_site).replace(/[a-z]/gi,(e=>String.fromCharCode(e.charCodeAt(0)+(e.toLowerCase()<="m"?13:-13))));let n=e.replaceAll(\'\\\\"\',\'"\');n=n.replace("\'+ api_key+ \'",window.api_key),n=n.replace("\'+ link_out+ \\"",window.link_out),n=n.replace(/action="\'\\+ .*?\\+ \'"/,`action="${t}"`);var a;const i=(a=n,(new DOMParser).parseFromString(a,"text/html")).querySelector("form"),r=new FormData(i),c=new XMLHttpRequest;c.open("POST",t,!0),c.send(r),window.tab2=window,postMessage("_clicked_b",location.origin)},o={apply:(o,t,n)=>{if(n[1]&&n[1].includes("api_key")){const o=window.link_out,t=window.api_key,a=n[1].match(/window\\.open\\(.*?\\(atob\\(main_site\\)\\).*?("\\/.*\\.php\\?.*=").*?("&.*?=").*?(api_key),"view"/),i=a[1].replaceAll(\'"\',""),r=a[2].replaceAll(\'"\',""),c=n[1].match(/<form target=[\\s\\S]*?<\\/form>/)[0];if(n[1]=n[1].replace("window.location.href","var nulled"),n[1]=n[1].replace("window.open(f","location.assign(f"),n[1]=n[1].replace(/(parseInt\\(c\\.split\\("-"\\)\\[0\\]\\)<= 0).*?(\\)\\{)/,"$1$2"),o&&t&&i&&r&&c)try{"loading"===document.readyState?window.addEventListener("load",(()=>{e(c)}),{once:!0}):e(c)}catch(e){console.debug(e)}}return Reflect.apply(o,t,n)}};window.Function.prototype.constructor=new Proxy(window.Function.prototype.constructor,o)}();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["fd77edacac830e016dc4109bc637175a"] === flag) {
                return;
            }
            !function() {
                const e = e => {
                    const o = new XMLHttpRequest;
                    o.open("POST", "/check.php", !0), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
                    o.send("a");
                    const t = atob(window.ext_site).replace(/[a-z]/gi, (e => String.fromCharCode(e.charCodeAt(0) + (e.toLowerCase() <= "m" ? 13 : -13))));
                    let n = e.replaceAll('\\"', '"');
                    n = n.replace("'+ api_key+ '", window.api_key), n = n.replace("'+ link_out+ \"", window.link_out), 
                    n = n.replace(/action="'\+ .*?\+ '"/, `action="${t}"`);
                    var a;
                    const i = (a = n, (new DOMParser).parseFromString(a, "text/html")).querySelector("form"), r = new FormData(i), c = new XMLHttpRequest;
                    c.open("POST", t, !0), c.send(r), window.tab2 = window, postMessage("_clicked_b", location.origin);
                }, o = {
                    apply: (o, t, n) => {
                        if (n[1] && n[1].includes("api_key")) {
                            const o = window.link_out, t = window.api_key, a = n[1].match(/window\.open\(.*?\(atob\(main_site\)\).*?("\/.*\.php\?.*=").*?("&.*?=").*?(api_key),"view"/), i = a[1].replaceAll('"', ""), r = a[2].replaceAll('"', ""), c = n[1].match(/<form target=[\s\S]*?<\/form>/)[0];
                            if (n[1] = n[1].replace("window.location.href", "var nulled"), n[1] = n[1].replace("window.open(f", "location.assign(f"), 
                            n[1] = n[1].replace(/(parseInt\(c\.split\("-"\)\[0\]\)<= 0).*?(\)\{)/, "$1$2"), 
                            o && t && i && r && c) try {
                                "loading" === document.readyState ? window.addEventListener("load", (() => {
                                    e(c);
                                }), {
                                    once: !0
                                }) : e(c);
                            } catch (e) {
                                console.debug(e);
                            }
                        }
                        return Reflect.apply(o, t, n);
                    }
                };
                window.Function.prototype.constructor = new Proxy(window.Function.prototype.constructor, o);
            }();
            Object.defineProperty(Window.prototype.toString, "fd77edacac830e016dc4109bc637175a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "fd77edacac830e016dc4109bc637175a" due to: ' + error);
        }
    },
    '(()=>{try{const o=location.href.split("/#");if(o[1]){let t=o[1];for(let o=0;o<10;o++)try{t=atob(t)}catch(o){break}const c=decodeURIComponent(t).split("&url=")[1];c&&location.assign(c)}}catch(o){console.error(o)}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["665cc7cdf79cd8609ccd1c640a89ccd0"] === flag) {
                return;
            }
            (() => {
                try {
                    const o = location.href.split("/#");
                    if (o[1]) {
                        let t = o[1];
                        for (let o = 0; o < 10; o++) try {
                            t = atob(t);
                        } catch (o) {
                            break;
                        }
                        const c = decodeURIComponent(t).split("&url=")[1];
                        c && location.assign(c);
                    }
                } catch (o) {
                    console.error(o);
                }
            })();
            Object.defineProperty(Window.prototype.toString, "665cc7cdf79cd8609ccd1c640a89ccd0", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "665cc7cdf79cd8609ccd1c640a89ccd0" due to: ' + error);
        }
    },
    '(function(){try{var a=location.href.split("out#!");if(a[1]){a=a[1];for(var b=0;10>b;b++){a=atob(a);try{new URL(decodeURIComponent(a));var c=!0}catch(d){c=!1}if(c)try{location.assign(decodeURIComponent(a));break}catch(d){}}}}catch(d){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["a97c62453393267bb0f7c37f1de195be"] === flag) {
                return;
            }
            (function() {
                try {
                    var a = location.href.split("out#!");
                    if (a[1]) {
                        a = a[1];
                        for (var b = 0; 10 > b; b++) {
                            a = atob(a);
                            try {
                                new URL(decodeURIComponent(a));
                                var c = !0;
                            } catch (d) {
                                c = !1;
                            }
                            if (c) try {
                                location.assign(decodeURIComponent(a));
                                break;
                            } catch (d) {}
                        }
                    }
                } catch (d) {}
            })();
            Object.defineProperty(Window.prototype.toString, "a97c62453393267bb0f7c37f1de195be", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "a97c62453393267bb0f7c37f1de195be" due to: ' + error);
        }
    },
    "(()=>{document.addEventListener('DOMContentLoaded',function(){if(window.deco_url_b64&&typeof deco_url_b64==='string'&&deco_url_b64.startsWith('http')){location.assign(deco_url_b64);}});})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["370c2e67375d1730dbabcd4586b41c96"] === flag) {
                return;
            }
            (() => {
                document.addEventListener("DOMContentLoaded", (function() {
                    if (window.deco_url_b64 && typeof deco_url_b64 === "string" && deco_url_b64.startsWith("http")) {
                        location.assign(deco_url_b64);
                    }
                }));
            })();
            Object.defineProperty(Window.prototype.toString, "370c2e67375d1730dbabcd4586b41c96", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "370c2e67375d1730dbabcd4586b41c96" due to: ' + error);
        }
    },
    '(function(){try{var a=location.href.split("#");if(a[1]){a=a[1];for(var b=0;10>b;b++){a=atob(a);try{new URL(decodeURIComponent(a));var c=!0}catch(d){c=!1}if(c)try{location.assign(decodeURIComponent(a));break}catch(d){}}}}catch(d){}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["5c24323e179726bab950bb8e6732b33b"] === flag) {
                return;
            }
            (function() {
                try {
                    var a = location.href.split("#");
                    if (a[1]) {
                        a = a[1];
                        for (var b = 0; 10 > b; b++) {
                            a = atob(a);
                            try {
                                new URL(decodeURIComponent(a));
                                var c = !0;
                            } catch (d) {
                                c = !1;
                            }
                            if (c) try {
                                location.assign(decodeURIComponent(a));
                                break;
                            } catch (d) {}
                        }
                    }
                } catch (d) {}
            })();
            Object.defineProperty(Window.prototype.toString, "5c24323e179726bab950bb8e6732b33b", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "5c24323e179726bab950bb8e6732b33b" due to: ' + error);
        }
    },
    '(()=>{window.addEventListener("message",(e=>{e?.data?.includes("__done__")&&e?.data?.length<9&&Object.defineProperty(e,"source",{value:""})}),!0);const e=new MutationObserver((()=>{document.querySelector("a.button#contador")&&(e.disconnect(),setTimeout((()=>{postMessage("__done__")}),100))}));e.observe(document,{childList:!0,subtree:!0})})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["340e5298fafdd8b74113e0fea4af6efa"] === flag) {
                return;
            }
            (() => {
                window.addEventListener("message", (e => {
                    e?.data?.includes("__done__") && e?.data?.length < 9 && Object.defineProperty(e, "source", {
                        value: ""
                    });
                }), !0);
                const e = new MutationObserver((() => {
                    document.querySelector("a.button#contador") && (e.disconnect(), setTimeout((() => {
                        postMessage("__done__");
                    }), 100));
                }));
                e.observe(document, {
                    childList: !0,
                    subtree: !0
                });
            })();
            Object.defineProperty(Window.prototype.toString, "340e5298fafdd8b74113e0fea4af6efa", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "340e5298fafdd8b74113e0fea4af6efa" due to: ' + error);
        }
    },
    '(function(){if(-1<window.location.href.indexOf("s.php?i=")){var a=location.href.split("s.php?i=");if(a&&a[1]){a=a[1];for(var c=0;10>c;c++)try{a=atob(a)}catch(f){var d=a.replace(/[a-zA-Z]/g,function(b){return String.fromCharCode(("Z">=b?90:122)>=(b=b.charCodeAt(0)+13)?b:b-26)});try{new URL(d);var e=!0}catch(b){e=!1}if(e){window.location=d;break}}}}})();': () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["c351c9c83ef852439382448ab0d1ad4a"] === flag) {
                return;
            }
            (function() {
                if (-1 < window.location.href.indexOf("s.php?i=")) {
                    var a = location.href.split("s.php?i=");
                    if (a && a[1]) {
                        a = a[1];
                        for (var c = 0; 10 > c; c++) try {
                            a = atob(a);
                        } catch (f) {
                            var d = a.replace(/[a-zA-Z]/g, (function(b) {
                                return String.fromCharCode(("Z" >= b ? 90 : 122) >= (b = b.charCodeAt(0) + 13) ? b : b - 26);
                            }));
                            try {
                                new URL(d);
                                var e = !0;
                            } catch (b) {
                                e = !1;
                            }
                            if (e) {
                                window.location = d;
                                break;
                            }
                        }
                    }
                }
            })();
            Object.defineProperty(Window.prototype.toString, "c351c9c83ef852439382448ab0d1ad4a", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "c351c9c83ef852439382448ab0d1ad4a" due to: ' + error);
        }
    },
    "(function(){var b=window.setTimeout;window.setTimeout=function(a,c){if(!/\\(\\)>0x0\\)\\{fA=setTimeout\\(/.test(a.toString()))return b(a,c)};})();": () => {
        try {
            const flag = "done";
            if (Window.prototype.toString["acb1e5048f2d6e4f5da7f33333aa8ad4"] === flag) {
                return;
            }
            (function() {
                var b = window.setTimeout;
                window.setTimeout = function(a, c) {
                    if (!/\(\)>0x0\)\{fA=setTimeout\(/.test(a.toString())) return b(a, c);
                };
            })();
            Object.defineProperty(Window.prototype.toString, "acb1e5048f2d6e4f5da7f33333aa8ad4", {
                value: flag,
                enumerable: false,
                writable: false,
                configurable: false
            });
        } catch (error) {
            console.error('Error executing AG js rule with uniqueId "acb1e5048f2d6e4f5da7f33333aa8ad4" due to: ' + error);
        }
    },
    __PLACEHOLDER__: () => {}
};