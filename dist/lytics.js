(function () {var a={};function l(t){return t.split("-").map(function(t,e){return 0===e?t:t[0].toUpperCase()+t.slice(1,t.length)}).join("")}function g(t){for(var e=[],r=0;r<t.attributes.length;r++)e.push(t.attributes[r].nodeName);return e}function h(t){return g(t).filter(function(t){return"data-lytics-trigger"!==(t=t.toLowerCase())&&("data-lytics"===t||0===t.indexOf("data-lytics-"))})}function o(t){return"data-lytics"===t?"trigger":t=l(t.toLowerCase().replace("data-lytics-",""))}function d(t){var e={};return h(t).forEach(function(r){e[o(r)]=t.getAttribute(r)}),e}var c={};function b(t,e,r,a,n){var i=e.querySelectorAll("*[data-lytics=".concat(t,"]"));if(i&&0!==i.length){var c=function(e){if(!a||e.isTrusted)for(var i=e.target;i&&i!==e.currentTarget;)v(i,e,t,r,n),i=i.parentElement};return e.addEventListener(t,c,!0),function(){e.removeEventListner(t,c)}}}function i(t,e,r,a){var n=b("click",t,e,r,a),i=b("submit",t,e,r,a);return function(){n(),i()}}function j(){}function k(r,t,a,e,$){var c=d(r);if(0!==Object.getOwnPropertyNames(c).length){var k,b=r.nodeName.toLowerCase();"click"===a?"a"===b&&(k=f(p,r,t)):"submit"===a&&"form"===b&&(k=f(q,r,t)),k||(k=j),e(c,k=s(k,$))}}function v(r,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"click",e=arguments.length>3?arguments[3]:void 0,$=arguments.length>4?arguments[4]:void 0;if(r){var c=d(r);c.trigger&&c.trigger===a&&k(r,t,a,e,$)}}function m(t){return t.ctrlKey||t.metaKey||t.shiftKey}function n(t,e){if(!m(t))return t.preventDefault(),e}function f(t,e,a){var r=t.call(null,e,a);return r&&(r=n(a,r)),r}function p(t){var e=t.getAttribute("target");if(!e||"_self"===e)return function(){var e=t.getAttribute("href");e&&(window.location.href=e)}}function q(t){var e=t.getAttribute("target");if(!e||"_self"===e)return function(){t.submit()}}function s(t,e){var a=!1;return e>0&&setTimeout(function(){a=!0,t()},e),function(){a||(a=!0,t())}}c.initListeners=i;var u=function(e,t){t()};function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.parent,r=void 0===t?document.documentElement:t,$=e.tracker,i=void 0===$?u:$,o=e.ignoreSynthetic,n=void 0===o||o,s=e.timeout,b=void 0===s?300:s;if("string"==typeof r&&(r=document.querySelector(r)),r instanceof HTMLElement)return{off:c.initListeners(r,i,n,b)}}var t=r;a.init=t;var e=d;a.getAttributesOfEl=e;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=a}else if(typeof define==="function"&&define.amd){define(function(){return a})}else{this["lytics"]=a}})();