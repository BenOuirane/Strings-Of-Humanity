!function(e){var t={};function o(a){if(t[a])return t[a].exports;var l=t[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,o),l.l=!0,l.exports}o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(a,l,function(t){return e[t]}.bind(null,l));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist/",o(o.s=4)}([,function(e,t){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),o=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var a=arguments[1],l=0;l<o;){var n=t[l];if(e.call(a,n,l,t))return n;l++}},configurable:!0,writable:!0})},function(e,t){Array.prototype.filter||(Array.prototype.filter=function(e,t){"use strict";if("Function"!=typeof e&&"function"!=typeof e||!this)throw new TypeError;var o=this.length>>>0,a=new Array(o),l=this,n=0,r=-1;if(void 0===t)for(;++r!==o;)r in this&&e(l[r],r,l)&&(a[n++]=l[r]);else for(;++r!==o;)r in this&&e.call(t,l[r],r,l)&&(a[n++]=l[r]);return a.length=n,a})},,function(e,t,o){"use strict";o.r(t);var a=function(){const e=jQuery;let t;const o=()=>{let o=e("#original_language").val();e("#original_language").on("change",(function(a){const l=o,n=o;o=a.target.value,t[0].selectize.removeOption(o);const r=weglot_languages.available.find(e=>e.internal_code===n),s=weglot_languages.available.find(e=>e.internal_code===o);t[0].selectize.addOption(r);const i=e("#is_fullname").is(":checked");let c="";e("#with_name").is(":checked")&&(c=i?s.local:s.internal_code.toUpperCase()),e(".wgcurrent.wg-li").removeClass(l).addClass(o).attr("data-code-language",o).find("span").text(c)})),t=e(".weglot-select-destination").selectize({delimiter:"|",persist:!1,valueField:"internal_code",labelField:"local",searchField:["internal_code","english","local"],sortField:[{field:"english",direction:"asc"}],maxItems:weglot_languages.limit,plugins:["remove_button"],options:weglot_languages.available.filter(e=>e.internal_code!==weglot_languages.original),render:{option:function(e,t){return`<div class="weglot__choice__language"><span class="weglot__choice__language--english">${t(e.english)}</span><span class="weglot__choice__language--local">${t(e.local)}[${t(e.external_code)}]</span></div>`}}}).on("change",o=>{const a=t[0].selectize.getValue(),l=e("#li-button-tpl");if(0===l.length)return;const n=e("#is_fullname").is(":checked"),r=e("#with_name").is(":checked"),s=e("#with_flags").is(":checked");let i="";s&&(i="weglot-flags");let c="";var g=e("label.weglot-flags").attr("class").split(/\s+/);e.each(g,(function(e,t){if(1==t.includes("flag-"))return i+=" "+t,!1})),a.forEach(e=>{const t=weglot_languages.available.find(t=>t.internal_code===e);let o="";r&&(o=n?t.local:e.toUpperCase()),c+=l.html().replace("{LABEL_LANGUAGE}",o).replace(new RegExp("{CODE_LANGUAGE}","g"),e).replace("{CLASSES}",i)}),e(".country-selector ul").html(c)}),window.addEventListener("weglotCheckApi",e=>{t[0].selectize.settings.maxItems=weglot_languages.limit})};document.addEventListener("DOMContentLoaded",()=>{o()})};var l=function(){const e=jQuery;document.addEventListener("DOMContentLoaded",()=>{e("#weglot-box-first-settings .weglot-btn-close").on("click",(function(t){t.preventDefault(),e("#weglot-box-first-settings").hide()}))})};var n=function(){const e=()=>{document.querySelector("#tpl-exclusion-url");const e=document.querySelector("#tpl-exclusion-block"),t=document.querySelector("#container-exclude_blocks");function o(e){e.preventDefault(),this.parentNode.remove()}document.querySelector("#js-add-exclude-block")&&document.querySelector("#js-add-exclude-block").addEventListener("click",a=>{a.preventDefault(),t.insertAdjacentHTML("beforeend",e.innerHTML),document.querySelector("#container-exclude_blocks .item-exclude:last-child .js-btn-remove-exclude").addEventListener("click",o)});document.querySelectorAll(".js-btn-remove").forEach(e=>{e.addEventListener("click",o)})};document.addEventListener("DOMContentLoaded",()=>{e()})};var r=function(){const e=jQuery,t=()=>{let t=e("#type_flags option:selected").data("value"),o=[];o.push(e(".country-selector label").data("code-language")),e(".country-selector li").each((t,a)=>{o.push(e(a).data("code-language"))});const a=weglot_languages.available.filter(e=>o.indexOf(e.external_code)>=0);e("#weglot-css-inline").text(weglot_css.inline),e("#is_dropdown").on("change",(function(){e(".country-selector").toggleClass("weglot-inline"),e(".country-selector").toggleClass("weglot-dropdown")})),e("#with_flags").on("change",(function(){e(".country-selector label, .country-selector li").toggleClass("weglot-flags")})),e("#type_flags").on("change",(function(o){e(".country-selector label, .country-selector li").removeClass("flag-"+t);const a=e(":selected",this).data("value");e(".country-selector label, .country-selector li").addClass("flag-"+a),t=a}));const l=()=>{const t=a.find(t=>t.external_code===e(".country-selector label").data("code-language")),o=e("#is_fullname").is(":checked"),l=o?t.local:t.internal_code.toUpperCase();e(".country-selector label a, .country-selector label span").text(l),e(".country-selector li").each((t,l)=>{const n=a.find(t=>t.internal_code===e(l).data("code-language")),r=o?n.local:n.internal_code.toUpperCase();e(l).find("a").text(r)})};e("#with_name").on("change",(function(t){t.target.checked?l():(e(".country-selector label a, .country-selector label span").text(""),e(".country-selector li a, .country-selector li span").each((t,o)=>{e(o).text("")}))})),e("#is_fullname").on("change",(function(t){if(e("#with_name").is(":checked"))if(t.target.checked)l();else{const t=a.find(t=>t.internal_code===e(".country-selector label").data("code-language"));e(".country-selector label a, .country-selector label span").text(t.internal_code.toUpperCase()),e(".country-selector li").each((t,o)=>{const l=a.find(t=>t.internal_code===e(o).data("code-language"));e(o).find("a").text(l.internal_code.toUpperCase()),e(o).find("span").text(l.internal_code.toUpperCase())})}})),e("#override_css").on("keyup",(function(t){e("#weglot-css-inline").text(t.target.value)}))};document.addEventListener("DOMContentLoaded",()=>{0!==e(".weglot-preview").length&&t()})};var s=function(){const e=jQuery,t=()=>{e("#api_key_private").blur((function(){var t=e(this).val();if(0===t.length)return e(".weglot-keyres").remove(),e("#api_key_private").after('<span class="weglot-keyres weglot-nokkey"></span>'),void e("#wrap-weglot #submit").prop("disabled",!0);function o(){e(".weglot-keyres").remove(),e("#api_key_private").after('<span class="weglot-keyres weglot-nokkey"></span><p class="weglot-keyres">Make sure you enter a valid Weglot API key. If the key is still not validating, you can contact your host provider and ask if it\'s possible to whitelist api.weglot.com and weglot.com</p>'),e("#wrap-weglot #submit").prop("disabled",!0)}e(".weglot-keyres").remove(),e("#api_key_private").after('<span class="weglot-keyres weglot-ckeckkey"></span>'),e.ajax({method:"POST",url:ajaxurl,data:{action:"get_user_info",api_key:t},success:({data:t,success:a})=>{e(".weglot-keyres").remove(),a?function(t){e(".weglot-keyres").remove(),e("#api_key_private").after('<span class="weglot-keyres weglot-okkey"></span>'),e("#wrap-weglot #submit").prop("disabled",!1);const o=new CustomEvent("weglotCheckApi",{detail:t});window.dispatchEvent(o)}(t):o()}}).fail((function(){o()}))})),e(".toplevel_page_weglot-settings form").submit((function(t){e("#wrap-weglot #submit").prop("disabled",!0)}))};document.addEventListener("DOMContentLoaded",()=>{t()})};var i=function(){jQuery;document.addEventListener("DOMContentLoaded",()=>{jQuery(document).ready((function(e){wp.codeEditor.initialize(e("#override_css"),cm_settings)}))})};var c=function(){const e=jQuery;"undefined"!=typeof weglot_css&&e("#weglot-css-flag-css").text(weglot_css.flag_css);const t=()=>{e(".flag-style-openclose").on("click",(function(){e(".flag-style-wrapper").toggle()})),e(".old-flag-style").on("click",(function(){e(".old-flag-wrapper").toggle()})),e("select.flag-en-type, select.flag-es-type, select.flag-pt-type, select.flag-fr-type, select.flag-ar-type, select.flag-tw-type, select.flag-zh-type").on("change",(function(){!function(){var t=new Array,o=new Array,a=new Array,l=new Array,n=new Array,r=new Array,s=new Array;t[1]=[3570,7841,48,2712],t[2]=[3720,449,3048,4440],t[3]=[3840,1281,2712,4224],t[4]=[3240,5217,1224,2112],t[5]=[4050,3585,1944,2496],t[6]=[2340,3457,2016,2016],o[1]=[4320,4641,3144,3552],o[2]=[3750,353,2880,4656],o[3]=[4200,1601,2568,3192],o[4]=[3990,5793,1032,2232],o[5]=[5460,897,4104,3120],o[6]=[3810,7905,216,3888],o[7]=[3630,8065,192,2376],o[8]=[3780,1473,2496,4104],o[9]=[6120,2145,4680,2568],o[10]=[4440,3009,3240,1176],o[11]=[5280,1825,3936,2976],o[12]=[4770,2081,3624,1008],o[13]=[4080,3201,2160,2544],o[14]=[4590,5761,3432,624],o[15]=[4350,2209,3360,2688],o[16]=[5610,5249,3168,528],o[17]=[5070,1729,3792,2952],o[18]=[6870,5953,96,3408],o[19]=[4020,5697,1056,1224],a[1]=[2760,736,2856,4416],a[2]=[3840,1280,2712,4224],a[3]=[5700,7201,5016,2400],a[4]=[2220,4160,1632,1944],l[1]=[1830,129,3096,5664],l[2]=[5100,2177,3840,2904],l[3]=[4890,3425,3648,2136],l[4]=[1320,3681,1896,4080],l[5]=[1260,3841,1824,1200],l[6]=[1020,3969,1608,312],l[7]=[4800,4065,3600,72],l[8]=[4710,4865,3504,480],l[9]=[6720,5984,5112,3792],l[10]=[4500,7233,3288,1800],l[11]=[720,7522,384,3936],l[12]=[690,7745,336,1104],l[13]=[600,8225,120,1272],l[14]=[660,5569,840,576],n[1]=[3690,1505,2592,3240],n[2]=[3600,3233,2112,48],r[1]=[2970,6369,3408,4008],r[2]=[3600,3233,2112,48],s[1]=[6630,993,2784,4344];var i=e("select.flag-en-type").val(),c=e("select.flag-es-type").val(),g=e("select.flag-fr-type").val(),f=e("select.flag-ar-type").val(),p=e("select.flag-tw-type").val(),d=e("select.flag-zh-type").val(),u=e("select.flag-pt-type").val(),w=i<=0?"":".weglot-flags.en > a:before, .weglot-flags.en > span:before { background-position: -"+t[i][0]+"px 0 !important; } .weglot-flags.flag-1.en > a:before, .weglot-flags.flag-1.en > span:before { background-position: -"+t[i][1]+"px 0 !important; } .weglot-flags.flag-2.en > a:before, .weglot-flags.flag-2.en > span:before { background-position: -"+t[i][2]+"px 0 !important; } .weglot-flags.flag-3.en > a:before, .weglot-flags.flag-3.en > span:before { background-position: -"+t[i][3]+"px 0 !important; } ",b=c<=0?"":".weglot-flags.es > a:before, .weglot-flags.es > span:before { background-position: -"+o[c][0]+"px 0 !important; } .weglot-flags.flag-1.es > a:before, .weglot-flags.flag-1.es > span:before { background-position: -"+o[c][1]+"px 0 !important; } .weglot-flags.flag-2.es > a:before, .weglot-flags.flag-2.es > span:before { background-position: -"+o[c][2]+"px 0 !important; } .weglot-flags.flag-3.es > a:before, .weglot-flags.flag-3.es > span:before { background-position: -"+o[c][3]+"px 0 !important; } ",y=g<=0?"":".weglot-flags.fr > a:before, .weglot-flags.fr > span:before { background-position: -"+a[g][0]+"px 0 !important; } .weglot-flags.flag-1.fr > a:before, .weglot-flags.flag-1.fr > span:before { background-position: -"+a[g][1]+"px 0 !important; } .weglot-flags.flag-2.fr > a:before, .weglot-flags.flag-2.fr > span:before { background-position: -"+a[g][2]+"px 0 !important; } .weglot-flags.flag-3.fr > a:before, .weglot-flags.flag-3.fr > span:before { background-position: -"+a[g][3]+"px 0 !important; } ",m=f<=0?"":".weglot-flags.ar > a:before, .weglot-flags.ar > span:before { background-position: -"+l[f][0]+"px 0 !important; } .weglot-flags.flag-1.ar > a:before, .weglot-flags.flag-1.ar > span:before { background-position: -"+l[f][1]+"px 0 !important; } .weglot-flags.flag-2.ar > a:before, .weglot-flags.flag-2.ar > span:before { background-position: -"+l[f][2]+"px 0 !important; } .weglot-flags.flag-3.ar > a:before, .weglot-flags.flag-3.ar > span:before { background-position: -"+l[f][3]+"px 0 !important; } ",v=p<=0?"":".weglot-flags.tw > a:before, .weglot-flags.tw > span:before { background-position: -"+n[p][0]+"px 0 !important; } .weglot-flags.flag-1.tw > a:before, .weglot-flags.flag-1.tw > span:before { background-position: -"+n[p][1]+"px 0 !important; } .weglot-flags.flag-2.tw > a:before, .weglot-flags.flag-2.tw > span:before { background-position: -"+n[p][2]+"px 0 !important; } .weglot-flags.flag-3.tw > a:before, .weglot-flags.flag-3.tw > span:before { background-position: -"+n[p][3]+"px 0 !important; } ",h=d<=0?"":".weglot-flags.zh > a:before, .weglot-flags.zh > span:before { background-position: -"+r[d][0]+"px 0 !important; } .weglot-flags.flag-1.zh > a:before, .weglot-flags.flag-1.zh > span:before { background-position: -"+r[d][1]+"px 0 !important; } .weglot-flags.flag-2.zh > a:before, .weglot-flags.flag-2.zh > span:before { background-position: -"+r[d][2]+"px 0 !important; } .weglot-flags.flag-3.zh > a:before, .weglot-flags.flag-3.zh > span:before { background-position: -"+r[d][3]+"px 0 !important; } ",_=u<=0?"":".weglot-flags.pt > a:before, .weglot-flags.pt > span:before { background-position: -"+s[u][0]+"px 0 !important; } .weglot-flags.flag-1.pt > a:before, .weglot-flags.flag-1.pt > span:before { background-position: -"+s[u][1]+"px 0 !important; } .weglot-flags.flag-2.pt > a:before, .weglot-flags.flag-2.pt > span:before { background-position: -"+s[u][2]+"px 0 !important; } .weglot-flags.flag-3.pt > a:before, .weglot-flags.flag-3.pt > span:before { background-position: -"+s[u][3]+"px 0 !important; } ";e("#flag_css, #weglot-css-flag-css").text(w+b+y+m+v+h+_)}()}));var t=e("#flag_css").text();t.trim()&&e("#weglot-css-flag-css").text(t)};document.addEventListener("DOMContentLoaded",()=>{t()})};var g=function(){jQuery;document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#private_mode");e&&0!=e.length&&(document.querySelector("#private_mode").addEventListener("change",(function(e){document.querySelectorAll(".private-mode-lang--input").forEach(t=>{t.checked=e.target.checked})})),document.querySelectorAll(".private-mode-lang--input").forEach(e=>{e.addEventListener("change",(function(e){0===document.querySelectorAll(".private-mode-lang--input:checked").length&&(document.querySelector("#private_mode").checked=!1)}))}))})};o(1),o(2);a(),n(),l(),r(),s(),i(),c(),g()}]);