(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{qSUR:function(t,e,n){"use strict";
/*!
 * vue-i18n v8.15.0 
 * (c) 2019 kazuya kawaguchi
 * Released under the MIT License.
 */var f=["style","currency","currencyDisplay","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","localeMatcher","formatMatcher"];function h(t,e){"undefined"!=typeof console&&(console.warn("[vue-i18n] "+t),e&&console.warn(e.stack))}function p(t){return null!==t&&"object"==typeof t}var r=Object.prototype.toString,i="[object Object]";function m(t){return r.call(t)===i}function g(t){return null==t}function u(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var n=null,r=null;return 1===t.length?p(t[0])||Array.isArray(t[0])?r=t[0]:"string"==typeof t[0]&&(n=t[0]):2===t.length&&("string"==typeof t[0]&&(n=t[0]),(p(t[1])||Array.isArray(t[1]))&&(r=t[1])),{locale:n,params:r}}function a(t){return JSON.parse(JSON.stringify(t))}var l=Object.prototype.hasOwnProperty;function c(t){for(var e,n,r=arguments,i=Object(t),a=1;a<arguments.length;a++){var s=r[a];if(null!=s){var o=void 0;for(o in s)e=s,n=o,l.call(e,n)&&(p(s[o])?i[o]=c(i[o],s[o]):i[o]=s[o])}}return i}function _(e,n){if(e===n)return!0;var t=p(e),r=p(n);if(!t||!r)return!t&&!r&&String(e)===String(n);try{var i=Array.isArray(e),a=Array.isArray(n);if(i&&a)return e.length===n.length&&e.every(function(t,e){return _(t,n[e])});if(i||a)return!1;var s=Object.keys(e),o=Object.keys(n);return s.length===o.length&&s.every(function(t){return _(e[t],n[t])})}catch(t){return!1}}var s={beforeCreate:function(){var e=this.$options;if(e.i18n=e.i18n||(e.__i18n?{}:null),e.i18n)if(e.i18n instanceof J){if(e.__i18n)try{var n={};e.__i18n.forEach(function(t){n=c(n,JSON.parse(t))}),Object.keys(n).forEach(function(t){e.i18n.mergeLocaleMessage(t,n[t])})}catch(t){0}this._i18n=e.i18n,this._i18nWatcher=this._i18n.watchI18nData()}else if(m(e.i18n)){if(this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J&&(e.i18n.root=this.$root,e.i18n.formatter=this.$root.$i18n.formatter,e.i18n.fallbackLocale=this.$root.$i18n.fallbackLocale,e.i18n.formatFallbackMessages=this.$root.$i18n.formatFallbackMessages,e.i18n.silentTranslationWarn=this.$root.$i18n.silentTranslationWarn,e.i18n.silentFallbackWarn=this.$root.$i18n.silentFallbackWarn,e.i18n.pluralizationRules=this.$root.$i18n.pluralizationRules,e.i18n.preserveDirectiveContent=this.$root.$i18n.preserveDirectiveContent),e.__i18n)try{var r={};e.__i18n.forEach(function(t){r=c(r,JSON.parse(t))}),e.i18n.messages=r}catch(t){0}var t=e.i18n.sharedMessages;t&&m(t)&&(e.i18n.messages=c(e.i18n.messages,t)),this._i18n=new J(e.i18n),this._i18nWatcher=this._i18n.watchI18nData(),void 0!==e.i18n.sync&&!e.i18n.sync||(this._localeWatcher=this.$i18n.watchLocale())}else 0;else this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J?this._i18n=this.$root.$i18n:e.parent&&e.parent.$i18n&&e.parent.$i18n instanceof J&&(this._i18n=e.parent.$i18n)},beforeMount:function(){var t=this.$options;t.i18n=t.i18n||(t.__i18n?{}:null),t.i18n?t.i18n instanceof J?(this._i18n.subscribeDataChanging(this),this._subscribing=!0):m(t.i18n)&&(this._i18n.subscribeDataChanging(this),this._subscribing=!0):this.$root&&this.$root.$i18n&&this.$root.$i18n instanceof J?(this._i18n.subscribeDataChanging(this),this._subscribing=!0):t.parent&&t.parent.$i18n&&t.parent.$i18n instanceof J&&(this._i18n.subscribeDataChanging(this),this._subscribing=!0)},beforeDestroy:function(){if(this._i18n){var t=this;this.$nextTick(function(){t._subscribing&&(t._i18n.unsubscribeDataChanging(t),delete t._subscribing),t._i18nWatcher&&(t._i18nWatcher(),t._i18n.destroyVM(),delete t._i18nWatcher),t._localeWatcher&&(t._localeWatcher(),delete t._localeWatcher),t._i18n=null})}}},o={name:"i18n",functional:!0,props:{tag:{type:String},path:{type:String,required:!0},locale:{type:String},places:{type:[Array,Object]}},render:function(t,e){var n=e.data,r=e.parent,i=e.props,a=e.slots,s=r.$i18n;if(s){var o=i.path,l=i.locale,c=i.places,u=a(),f=s.i(o,l,function(t){var e;for(e in t)if("default"!==e)return!1;return Boolean(e)}(u)||c?function(t,e){var n=e?function(t){0;return Array.isArray(t)?t.reduce(y,{}):Object.assign({},t)}(e):{};if(!t)return n;var r=(t=t.filter(function(t){return t.tag||""!==t.text.trim()})).every(b);0;return t.reduce(r?v:y,n)}(u.default,c):u),h=i.tag||"span";return h?t(h,n,f):f}}};function v(t,e){return e.data&&e.data.attrs&&e.data.attrs.place&&(t[e.data.attrs.place]=e),t}function y(t,e,n){return t[n]=e,t}function b(t){return Boolean(t.data&&t.data.attrs&&t.data.attrs.place)}var d,w={name:"i18n-n",functional:!0,props:{tag:{type:String,default:"span"},value:{type:Number,required:!0},format:{type:[String,Object]},locale:{type:String}},render:function(t,e){var r=e.props,n=e.parent,i=e.data,a=n.$i18n;if(!a)return null;var s=null,o=null;"string"==typeof r.format?s=r.format:p(r.format)&&(r.format.key&&(s=r.format.key),o=Object.keys(r.format).reduce(function(t,e){var n;return f.includes(e)?Object.assign({},t,((n={})[e]=r.format[e],n)):t},null));var l=r.locale||a.locale,c=a._ntp(r.value,l,s,o),u=c.map(function(t,e){var n,r=i.scopedSlots&&i.scopedSlots[t.type];return r?r(((n={})[t.type]=t.value,n.index=e,n.parts=c,n)):t.value});return t(r.tag,{attrs:i.attrs,class:i.class,staticClass:i.staticClass},u)}};function k(t,e,n){M(t,n)&&D(t,e,n)}function F(t,e,n,r){if(M(t,n)){var i=n.context.$i18n;(function(t,e){var n=e.context;return t._locale===n.$i18n.locale})(t,n)&&_(e.value,e.oldValue)&&_(t._localeMessage,i.getLocaleMessage(i.locale))||D(t,e,n)}}function $(t,e,n,r){if(n.context){var i=n.context.$i18n||{};e.modifiers.preserve||i.preserveDirectiveContent||(t.textContent=""),t._vt=void 0,delete t._vt,t._locale=void 0,delete t._locale,t._localeMessage=void 0,delete t._localeMessage}else h("Vue instance does not exists in VNode context")}function M(t,e){var n=e.context;return n?!!n.$i18n||(h("VueI18n instance does not exists in Vue instance"),!1):(h("Vue instance does not exists in VNode context"),!1)}function D(t,e,n){var r,i,a=function(t){var e,n,r,i;"string"==typeof t?e=t:m(t)&&(e=t.path,n=t.locale,r=t.args,i=t.choice);return{path:e,locale:n,args:r,choice:i}}(e.value),s=a.path,o=a.locale,l=a.args,c=a.choice;if(s||o||l)if(s){var u=n.context;t._vt=t.textContent=c?(r=u.$i18n).tc.apply(r,[s,c].concat(T(o,l))):(i=u.$i18n).t.apply(i,[s].concat(T(o,l))),t._locale=u.$i18n.locale,t._localeMessage=u.$i18n.getLocaleMessage(u.$i18n.locale)}else h("`path` is required in v-t directive");else h("value type not supported")}function T(t,e){var n=[];return t&&n.push(t),e&&(Array.isArray(e)||m(e))&&n.push(e),n}function L(t){L.installed=!0;(d=t).version&&Number(d.version.split(".")[0]);(function(t){t.prototype.hasOwnProperty("$i18n")||Object.defineProperty(t.prototype,"$i18n",{get:function(){return this._i18n}}),t.prototype.$t=function(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];var r=this.$i18n;return r._t.apply(r,[t,r.locale,r._getMessages(),this].concat(e))},t.prototype.$tc=function(t,e){for(var n=[],r=arguments.length-2;0<r--;)n[r]=arguments[r+2];var i=this.$i18n;return i._tc.apply(i,[t,i.locale,i._getMessages(),this,e].concat(n))},t.prototype.$te=function(t,e){var n=this.$i18n;return n._te(t,n.locale,n._getMessages(),e)},t.prototype.$d=function(t){for(var e,n=[],r=arguments.length-1;0<r--;)n[r]=arguments[r+1];return(e=this.$i18n).d.apply(e,[t].concat(n))},t.prototype.$n=function(t){for(var e,n=[],r=arguments.length-1;0<r--;)n[r]=arguments[r+1];return(e=this.$i18n).n.apply(e,[t].concat(n))}})(d),d.mixin(s),d.directive("t",{bind:k,update:F,unbind:$}),d.component(o.name,o),d.component(w.name,w),d.config.optionMergeStrategies.i18n=function(t,e){return void 0===e?t:e}}function I(){this._caches=Object.create(null)}I.prototype.interpolate=function(t,e){if(!e)return[t];var n=this._caches[t];return n||(n=function(t){var e=[],n=0,r="";for(;n<t.length;){var i=t[n++];if("{"===i){r&&e.push({type:"text",value:r});var a=r="";for(i=t[n++];void 0!==i&&"}"!==i;)a+=i,i=t[n++];var s="}"===i,o=x.test(a)?"list":s&&O.test(a)?"named":"unknown";e.push({value:a,type:o})}else"%"===i?"{"!==t[n]&&(r+=i):r+=i}return r&&e.push({type:"text",value:r}),e}(t),this._caches[t]=n),function(t,e){var n=[],r=0,i=Array.isArray(e)?"list":p(e)?"named":"unknown";if("unknown"==i)return n;for(;r<t.length;){var a=t[r];switch(a.type){case"text":n.push(a.value);break;case"list":n.push(e[parseInt(a.value,10)]);break;case"named":"named"==i&&n.push(e[a.value]);break;case"unknown":0}r++}return n}(n,e)};var x=/^(?:\d)+/,O=/^(?:\w)+/;var W=[];W[0]={ws:[0],ident:[3,0],"[":[4],eof:[7]},W[1]={ws:[1],".":[2],"[":[4],eof:[7]},W[2]={ws:[2],ident:[3,0],0:[3,0],number:[3,0]},W[3]={ident:[3,0],0:[3,0],number:[3,0],ws:[1,1],".":[2,1],"[":[4,1],eof:[7,1]},W[4]={"'":[5,0],'"':[6,0],"[":[4,2],"]":[1,3],eof:8,else:[4,0]},W[5]={"'":[4,0],eof:8,else:[5,0]},W[6]={'"':[4,0],eof:8,else:[6,0]};var C=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function j(t){if(null==t)return"eof";switch(t.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return t;case 95:case 36:case 45:return"ident";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return"ident"}function S(t){var e=t.trim();return("0"!==t.charAt(0)||!isNaN(t))&&(function(t){return C.test(t)}(e)?function(t){var e=t.charCodeAt(0);return e!==t.charCodeAt(t.length-1)||34!==e&&39!==e?t:t.slice(1,-1)}(e):"*"+e)}function N(){this._cache=Object.create(null)}N.prototype.parsePath=function(t){var e=this._cache[t];return e||(e=function(e){var t,n,r,i,a,s,o,l=[],c=-1,u=0,f=0,h=[];function p(){var t=e[c+1];if(5===u&&"'"===t||6===u&&'"'===t)return c++,r="\\"+t,h[0](),!0}for(h[1]=function(){void 0!==n&&(l.push(n),n=void 0)},h[0]=function(){void 0===n?n=r:n+=r},h[2]=function(){h[0](),f++},h[3]=function(){if(0<f)f--,u=4,h[0]();else{if(void(f=0)===n)return!1;if(!1===(n=S(n)))return!1;h[1]()}};null!==u;)if("\\"!==(t=e[++c])||!p()){if(i=j(t),8===(a=(o=W[u])[i]||o.else||8))return;if(u=a[0],(s=h[a[1]])&&(r=void 0===(r=a[2])?t:r,!1===s()))return;if(7===u)return l}}(t))&&(this._cache[t]=e),e||[]},N.prototype.getPathValue=function(t,e){if(!p(t))return null;var n=this.parsePath(e);if(0===n.length)return null;for(var r=n.length,i=t,a=0;a<r;){var s=i[n[a]];if(void 0===s)return null;i=s,a++}return i};var A,H=/<\/?[\w\s="/.':;#-\/]+>/,R=/(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g,V=/^@(?:\.([a-z]+))?:/,E=/[()]/g,P={upper:function(t){return t.toLocaleUpperCase()},lower:function(t){return t.toLocaleLowerCase()}},z=new I,J=function(t){var n=this;void 0===t&&(t={}),!d&&"undefined"!=typeof window&&window.Vue&&L(window.Vue);var e=t.locale||"en-US",r=t.fallbackLocale||"en-US",i=t.messages||{},a=t.dateTimeFormats||{},s=t.numberFormats||{};this._vm=null,this._formatter=t.formatter||z,this._modifiers=t.modifiers||{},this._missing=t.missing||null,this._root=t.root||null,this._sync=void 0===t.sync||!!t.sync,this._fallbackRoot=void 0===t.fallbackRoot||!!t.fallbackRoot,this._formatFallbackMessages=void 0!==t.formatFallbackMessages&&!!t.formatFallbackMessages,this._silentTranslationWarn=void 0!==t.silentTranslationWarn&&t.silentTranslationWarn,this._silentFallbackWarn=void 0!==t.silentFallbackWarn&&!!t.silentFallbackWarn,this._dateTimeFormatters={},this._numberFormatters={},this._path=new N,this._dataListeners=[],this._preserveDirectiveContent=void 0!==t.preserveDirectiveContent&&!!t.preserveDirectiveContent,this.pluralizationRules=t.pluralizationRules||{},this._warnHtmlInMessage=t.warnHtmlInMessage||"off",this._exist=function(t,e){return!(!t||!e)&&(!g(n._path.getPathValue(t,e))||!!t[e])},"warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||Object.keys(i).forEach(function(t){n._checkLocaleMessage(t,n._warnHtmlInMessage,i[t])}),this._initVM({locale:e,fallbackLocale:r,messages:i,dateTimeFormats:a,numberFormats:s})},U={vm:{configurable:!0},messages:{configurable:!0},dateTimeFormats:{configurable:!0},numberFormats:{configurable:!0},availableLocales:{configurable:!0},locale:{configurable:!0},fallbackLocale:{configurable:!0},formatFallbackMessages:{configurable:!0},missing:{configurable:!0},formatter:{configurable:!0},silentTranslationWarn:{configurable:!0},silentFallbackWarn:{configurable:!0},preserveDirectiveContent:{configurable:!0},warnHtmlInMessage:{configurable:!0}};J.prototype._checkLocaleMessage=function(t,e,n){var s=function(n,r,i,a){if(m(i))Object.keys(i).forEach(function(t){var e=i[t];m(e)?(a.push(t),a.push("."),s(n,r,e,a),a.pop()):(a.push(t),s(n,r,e,a)),a.pop()});else if(Array.isArray(i))i.forEach(function(t,e){m(t)?(a.push("["+e+"]"),a.push("."),s(n,r,t,a),a.pop()):(a.push("["+e+"]"),s(n,r,t,a)),a.pop()});else if("string"==typeof i){if(H.test(i)){var t="Detected HTML in message '"+i+"' of keypath '"+a.join("")+"' at '"+r+"'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";"warn"===n?h(t):"error"===n&&function(t,e){"undefined"!=typeof console&&(console.error("[vue-i18n] "+t),e&&console.error(e.stack))}(t)}}};s(e,t,n,[])},J.prototype._initVM=function(t){var e=d.config.silent;d.config.silent=!0,this._vm=new d({data:t}),d.config.silent=e},J.prototype.destroyVM=function(){this._vm.$destroy()},J.prototype.subscribeDataChanging=function(t){this._dataListeners.push(t)},J.prototype.unsubscribeDataChanging=function(t){!function(t,e){if(t.length){var n=t.indexOf(e);if(-1<n)t.splice(n,1)}}(this._dataListeners,t)},J.prototype.watchI18nData=function(){var e=this;return this._vm.$watch("$data",function(){for(var t=e._dataListeners.length;t--;)d.nextTick(function(){e._dataListeners[t]&&e._dataListeners[t].$forceUpdate()})},{deep:!0})},J.prototype.watchLocale=function(){if(!this._sync||!this._root)return null;var e=this._vm;return this._root.$i18n.vm.$watch("locale",function(t){e.$set(e,"locale",t),e.$forceUpdate()},{immediate:!0})},U.vm.get=function(){return this._vm},U.messages.get=function(){return a(this._getMessages())},U.dateTimeFormats.get=function(){return a(this._getDateTimeFormats())},U.numberFormats.get=function(){return a(this._getNumberFormats())},U.availableLocales.get=function(){return Object.keys(this.messages).sort()},U.locale.get=function(){return this._vm.locale},U.locale.set=function(t){this._vm.$set(this._vm,"locale",t)},U.fallbackLocale.get=function(){return this._vm.fallbackLocale},U.fallbackLocale.set=function(t){this._vm.$set(this._vm,"fallbackLocale",t)},U.formatFallbackMessages.get=function(){return this._formatFallbackMessages},U.formatFallbackMessages.set=function(t){this._formatFallbackMessages=t},U.missing.get=function(){return this._missing},U.missing.set=function(t){this._missing=t},U.formatter.get=function(){return this._formatter},U.formatter.set=function(t){this._formatter=t},U.silentTranslationWarn.get=function(){return this._silentTranslationWarn},U.silentTranslationWarn.set=function(t){this._silentTranslationWarn=t},U.silentFallbackWarn.get=function(){return this._silentFallbackWarn},U.silentFallbackWarn.set=function(t){this._silentFallbackWarn=t},U.preserveDirectiveContent.get=function(){return this._preserveDirectiveContent},U.preserveDirectiveContent.set=function(t){this._preserveDirectiveContent=t},U.warnHtmlInMessage.get=function(){return this._warnHtmlInMessage},U.warnHtmlInMessage.set=function(t){var e=this;if(this._warnHtmlInMessage!==(this._warnHtmlInMessage=t)&&("warn"===t||"error"===t)){var n=this._getMessages();Object.keys(n).forEach(function(t){e._checkLocaleMessage(t,e._warnHtmlInMessage,n[t])})}},J.prototype._getMessages=function(){return this._vm.messages},J.prototype._getDateTimeFormats=function(){return this._vm.dateTimeFormats},J.prototype._getNumberFormats=function(){return this._vm.numberFormats},J.prototype._warnDefault=function(t,e,n,r,i){if(!g(n))return n;if(this._missing){var a=this._missing.apply(null,[t,e,r,i]);if("string"==typeof a)return a}else 0;if(this._formatFallbackMessages){var s=u.apply(void 0,i);return this._render(e,"string",s.params,e)}return e},J.prototype._isFallbackRoot=function(t){return!t&&!g(this._root)&&this._fallbackRoot},J.prototype._isSilentFallbackWarn=function(t){return this._silentFallbackWarn instanceof RegExp?this._silentFallbackWarn.test(t):this._silentFallbackWarn},J.prototype._isSilentFallback=function(t,e){return this._isSilentFallbackWarn(e)&&(this._isFallbackRoot()||t!==this.fallbackLocale)},J.prototype._isSilentTranslationWarn=function(t){return this._silentTranslationWarn instanceof RegExp?this._silentTranslationWarn.test(t):this._silentTranslationWarn},J.prototype._interpolate=function(t,e,n,r,i,a,s){if(!e)return null;var o,l=this._path.getPathValue(e,n);if(Array.isArray(l)||m(l))return l;if(g(l)){if(!m(e))return null;if("string"!=typeof(o=e[n]))return null}else{if("string"!=typeof l)return null;o=l}return(0<=o.indexOf("@:")||0<=o.indexOf("@."))&&(o=this._link(t,e,o,r,"raw",a,s)),this._render(o,i,a,n)},J.prototype._link=function(t,e,n,r,i,a,s){var o=n,l=o.match(R);for(var c in l)if(l.hasOwnProperty(c)){var u=l[c],f=u.match(V),h=f[0],p=f[1],m=u.replace(h,"").replace(E,"");if(s.includes(m))return o;s.push(m);var g=this._interpolate(t,e,m,r,"raw"===i?"string":i,"raw"===i?void 0:a,s);if(this._isFallbackRoot(g)){if(!this._root)throw Error("unexpected error");var _=this._root.$i18n;g=_._translate(_._getMessages(),_.locale,_.fallbackLocale,m,r,i,a)}g=this._warnDefault(t,m,g,r,Array.isArray(a)?a:[a]),this._modifiers.hasOwnProperty(p)?g=this._modifiers[p](g):P.hasOwnProperty(p)&&(g=P[p](g)),s.pop(),o=g?o.replace(u,g):o}return o},J.prototype._render=function(t,e,n,r){var i=this._formatter.interpolate(t,n,r);return i=i||z.interpolate(t,n,r),"string"===e?i.join(""):i},J.prototype._translate=function(t,e,n,r,i,a,s){var o=this._interpolate(e,t[e],r,i,a,s,[r]);return g(o)&&g(o=this._interpolate(n,t[n],r,i,a,s,[r]))?null:o},J.prototype._t=function(t,e,n,r){for(var i,a=[],s=arguments.length-4;0<s--;)a[s]=arguments[s+4];if(!t)return"";var o=u.apply(void 0,a),l=o.locale||e,c=this._translate(n,l,this.fallbackLocale,t,r,"string",o.params);if(this._isFallbackRoot(c)){if(!this._root)throw Error("unexpected error");return(i=this._root).$t.apply(i,[t].concat(a))}return this._warnDefault(l,t,c,r,a)},J.prototype.t=function(t){for(var e,n=[],r=arguments.length-1;0<r--;)n[r]=arguments[r+1];return(e=this)._t.apply(e,[t,this.locale,this._getMessages(),null].concat(n))},J.prototype._i=function(t,e,n,r,i){var a=this._translate(n,e,this.fallbackLocale,t,r,"raw",i);if(this._isFallbackRoot(a)){if(!this._root)throw Error("unexpected error");return this._root.$i18n.i(t,e,i)}return this._warnDefault(e,t,a,r,[i])},J.prototype.i=function(t,e,n){return t?("string"!=typeof e&&(e=this.locale),this._i(t,e,this._getMessages(),null,n)):""},J.prototype._tc=function(t,e,n,r,i){for(var a,s=[],o=arguments.length-5;0<o--;)s[o]=arguments[o+5];if(!t)return"";void 0===i&&(i=1);var l={count:i,n:i},c=u.apply(void 0,s);return c.params=Object.assign(l,c.params),s=null===c.locale?[c.params]:[c.locale,c.params],this.fetchChoice((a=this)._t.apply(a,[t,e,n,r].concat(s)),i)},J.prototype.fetchChoice=function(t,e){if(!t&&"string"!=typeof t)return null;var n=t.split("|");return n[e=this.getChoiceIndex(e,n.length)]?n[e].trim():t},J.prototype.getChoiceIndex=function(t,e){var n,r;return this.locale in this.pluralizationRules?this.pluralizationRules[this.locale].apply(this,[t,e]):(n=t,r=e,n=Math.abs(n),2===r?n?1<n?1:0:1:n?Math.min(n,2):0)},J.prototype.tc=function(t,e){for(var n,r=[],i=arguments.length-2;0<i--;)r[i]=arguments[i+2];return(n=this)._tc.apply(n,[t,this.locale,this._getMessages(),null,e].concat(r))},J.prototype._te=function(t,e,n){for(var r=[],i=arguments.length-3;0<i--;)r[i]=arguments[i+3];var a=u.apply(void 0,r).locale||e;return this._exist(n[a],t)},J.prototype.te=function(t,e){return this._te(t,this.locale,this._getMessages(),e)},J.prototype.getLocaleMessage=function(t){return a(this._vm.messages[t]||{})},J.prototype.setLocaleMessage=function(t,e){("warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||(this._checkLocaleMessage(t,this._warnHtmlInMessage,e),"error"!==this._warnHtmlInMessage))&&this._vm.$set(this._vm.messages,t,e)},J.prototype.mergeLocaleMessage=function(t,e){("warn"!==this._warnHtmlInMessage&&"error"!==this._warnHtmlInMessage||(this._checkLocaleMessage(t,this._warnHtmlInMessage,e),"error"!==this._warnHtmlInMessage))&&this._vm.$set(this._vm.messages,t,c(this._vm.messages[t]||{},e))},J.prototype.getDateTimeFormat=function(t){return a(this._vm.dateTimeFormats[t]||{})},J.prototype.setDateTimeFormat=function(t,e){this._vm.$set(this._vm.dateTimeFormats,t,e)},J.prototype.mergeDateTimeFormat=function(t,e){this._vm.$set(this._vm.dateTimeFormats,t,c(this._vm.dateTimeFormats[t]||{},e))},J.prototype._localizeDateTime=function(t,e,n,r,i){var a=e,s=r[a];if((g(s)||g(s[i]))&&(s=r[a=n]),g(s)||g(s[i]))return null;var o=s[i],l=a+"__"+i,c=this._dateTimeFormatters[l];return(c=c||(this._dateTimeFormatters[l]=new Intl.DateTimeFormat(a,o))).format(t)},J.prototype._d=function(t,e,n){if(!n)return new Intl.DateTimeFormat(e).format(t);var r=this._localizeDateTime(t,e,this.fallbackLocale,this._getDateTimeFormats(),n);if(this._isFallbackRoot(r)){if(!this._root)throw Error("unexpected error");return this._root.$i18n.d(t,n,e)}return r||""},J.prototype.d=function(t){for(var e=[],n=arguments.length-1;0<n--;)e[n]=arguments[n+1];var r=this.locale,i=null;return 1===e.length?"string"==typeof e[0]?i=e[0]:p(e[0])&&(e[0].locale&&(r=e[0].locale),e[0].key&&(i=e[0].key)):2===e.length&&("string"==typeof e[0]&&(i=e[0]),"string"==typeof e[1]&&(r=e[1])),this._d(t,r,i)},J.prototype.getNumberFormat=function(t){return a(this._vm.numberFormats[t]||{})},J.prototype.setNumberFormat=function(t,e){this._vm.$set(this._vm.numberFormats,t,e)},J.prototype.mergeNumberFormat=function(t,e){this._vm.$set(this._vm.numberFormats,t,c(this._vm.numberFormats[t]||{},e))},J.prototype._getNumberFormatter=function(t,e,n,r,i,a){var s=e,o=r[s];if((g(o)||g(o[i]))&&(o=r[s=n]),g(o)||g(o[i]))return null;var l,c=o[i];if(a)l=new Intl.NumberFormat(s,Object.assign({},c,a));else{var u=s+"__"+i;l=(l=this._numberFormatters[u])||(this._numberFormatters[u]=new Intl.NumberFormat(s,c))}return l},J.prototype._n=function(t,e,n,r){if(!J.availabilities.numberFormat)return"";if(!n)return(r?new Intl.NumberFormat(e,r):new Intl.NumberFormat(e)).format(t);var i=this._getNumberFormatter(t,e,this.fallbackLocale,this._getNumberFormats(),n,r),a=i&&i.format(t);if(this._isFallbackRoot(a)){if(!this._root)throw Error("unexpected error");return this._root.$i18n.n(t,Object.assign({},{key:n,locale:e},r))}return a||""},J.prototype.n=function(t){for(var r=[],e=arguments.length-1;0<e--;)r[e]=arguments[e+1];var n=this.locale,i=null,a=null;return 1===r.length?"string"==typeof r[0]?i=r[0]:p(r[0])&&(r[0].locale&&(n=r[0].locale),r[0].key&&(i=r[0].key),a=Object.keys(r[0]).reduce(function(t,e){var n;return f.includes(e)?Object.assign({},t,((n={})[e]=r[0][e],n)):t},null)):2===r.length&&("string"==typeof r[0]&&(i=r[0]),"string"==typeof r[1]&&(n=r[1])),this._n(t,n,i,a)},J.prototype._ntp=function(t,e,n,r){if(!J.availabilities.numberFormat)return[];if(!n)return(r?new Intl.NumberFormat(e,r):new Intl.NumberFormat(e)).formatToParts(t);var i=this._getNumberFormatter(t,e,this.fallbackLocale,this._getNumberFormats(),n,r),a=i&&i.formatToParts(t);if(this._isFallbackRoot(a)){if(!this._root)throw Error("unexpected error");return this._root.$i18n._ntp(t,e,n,r)}return a||[]},Object.defineProperties(J.prototype,U),Object.defineProperty(J,"availabilities",{get:function(){if(!A){var t="undefined"!=typeof Intl;A={dateTimeFormat:t&&void 0!==Intl.DateTimeFormat,numberFormat:t&&void 0!==Intl.NumberFormat}}return A}}),J.install=L,J.version="8.15.0",e.a=J}}]);