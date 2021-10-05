!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("stimulus"),require("lodash.debounce")):"function"==typeof define&&define.amd?define(["exports","stimulus","lodash.debounce"],e):e((t||self).stimulusAutocomplete={},t.stimulus,t.debounce)}(this,function(t,e,n){function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var s=i(n);function r(t,e){return r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(t,e)}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u=function(t){var e,n;function i(){for(var e,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))||this).extractTextValue=function(t){return t.hasAttribute("data-autocomplete-label")?t.getAttribute("data-autocomplete-label"):t.textContent.trim()},e}n=t,(e=i).prototype=Object.create(n.prototype),e.prototype.constructor=e,r(e,n);var o=i.prototype;return o.connect=function(){this.close(),this.inputTarget.setAttribute("autocomplete","off"),this.inputTarget.setAttribute("spellcheck","false"),this.mouseDown=!1,this.onInputChange=s.default(this.onInputChange.bind(this),300),this.onResultsClick=this.onResultsClick.bind(this),this.onResultsMouseDown=this.onResultsMouseDown.bind(this),this.onInputBlur=this.onInputBlur.bind(this),this.onKeydown=this.onKeydown.bind(this),this.inputTarget.addEventListener("keydown",this.onKeydown),this.inputTarget.addEventListener("blur",this.onInputBlur),this.inputTarget.addEventListener("input",this.onInputChange),this.resultsTarget.addEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.addEventListener("click",this.onResultsClick),"string"==typeof this.inputTarget.getAttribute("autofocus")&&this.inputTarget.focus()},o.disconnect=function(){this.hasInputTarget&&(this.inputTarget.removeEventListener("keydown",this.onKeydown),this.inputTarget.removeEventListener("focus",this.onInputFocus),this.inputTarget.removeEventListener("blur",this.onInputBlur),this.inputTarget.removeEventListener("input",this.onInputChange)),this.hasResultsTarget&&(this.resultsTarget.removeEventListener("mousedown",this.onResultsMouseDown),this.resultsTarget.removeEventListener("click",this.onResultsClick))},o.sibling=function(t){var e=Array.from(this.resultsTarget.querySelectorAll('[role="option"]:not([aria-disabled])')),n=this.resultsTarget.querySelector('[aria-selected="true"]'),i=e.indexOf(n);return(t?e[i+1]:e[i-1])||(t?e[0]:e[e.length-1])},o.select=function(t){for(var e,n=a(this.resultsTarget.querySelectorAll('[aria-selected="true"]'));!(e=n()).done;){var i=e.value;i.removeAttribute("aria-selected"),i.classList.remove("active")}t.setAttribute("aria-selected","true"),t.classList.add("active"),this.inputTarget.setAttribute("aria-activedescendant",t.id),t.scrollIntoView(!1)},o.onKeydown=function(t){switch(t.key){case"Escape":this.isHidden||(this.hideAndRemoveOptions(),t.stopPropagation(),t.preventDefault());break;case"ArrowDown":var e=this.sibling(!0);e&&this.select(e),t.preventDefault();break;case"ArrowUp":var n=this.sibling(!1);n&&this.select(n),t.preventDefault();break;case"Tab":var i=this.resultsTarget.querySelector('[aria-selected="true"]');i&&this.commit(i);break;case"Enter":var s=this.resultsTarget.querySelector('[aria-selected="true"]');s&&!this.isHidden&&(this.commit(s),this.hasSubmitOnEnterValue||t.preventDefault())}},o.onInputBlur=function(){this.mouseDown||this.close()},o.commit=function(t){if("true"!==t.getAttribute("aria-disabled")){if(t instanceof HTMLAnchorElement)return t.click(),void this.close();var e=this.extractTextValue(t),n=t.getAttribute("data-autocomplete-value")||e;this.inputTarget.value=e,this.hasHiddenTarget?(this.hiddenTarget.value=n,this.hiddenTarget.dispatchEvent(new Event("input")),this.hiddenTarget.dispatchEvent(new Event("change"))):this.inputTarget.value=n,this.inputTarget.focus(),this.hideAndRemoveOptions(),this.element.dispatchEvent(new CustomEvent("autocomplete.change",{bubbles:!0,detail:{value:n,textValue:e}}))}},o.onResultsClick=function(t){if(t.target instanceof Element){var e=t.target.closest('[role="option"]');e&&this.commit(e)}},o.onResultsMouseDown=function(){var t=this;this.mouseDown=!0,this.resultsTarget.addEventListener("mouseup",function(){return t.mouseDown=!1},{once:!0})},o.onInputChange=function(){this.element.removeAttribute("value"),this.fetchResults()},o.identifyOptions=function(){for(var t,e=0,n=a(this.resultsTarget.querySelectorAll('[role="option"]:not([id])'));!(t=n()).done;)t.value.id=this.resultsTarget.id+"-option-"+e++},o.hideAndRemoveOptions=function(){this.close(),this.resultsTarget.innerHTML=null},o.fetchResults=function(){var t=this,e=this.inputTarget.value.trim();if(!e||e.length<this.minLengthValue)this.hideAndRemoveOptions();else if(this.hasUrlValue){var n=new URL(this.urlValue,window.location.href),i=new URLSearchParams(n.search.slice(1));i.append("q",e),n.search=i.toString(),this.element.dispatchEvent(new CustomEvent("loadstart")),fetch(n.toString(),{headers:{"X-Requested-With":"XMLHttpRequest"}}).then(function(t){return t.text()}).then(function(e){t.resultsTarget.innerHTML=e,t.identifyOptions(),t.resultsTarget.querySelector('[role="option"]')?t.open():t.close(),t.element.dispatchEvent(new CustomEvent("load")),t.element.dispatchEvent(new CustomEvent("loadend"))}).catch(function(){t.element.dispatchEvent(new CustomEvent("error")),t.element.dispatchEvent(new CustomEvent("loadend"))})}},o.open=function(){this.isHidden&&(this.hasSkipHiddenPropertyValue||(this.resultsTarget.hidden=!1),this.isHidden=!1,this.element.setAttribute("aria-expanded","true"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{action:"open",inputTarget:this.inputTarget,resultsTarget:this.resultsTarget}})))},o.close=function(){this.isHidden||(this.hasSkipHiddenPropertyValue||(this.resultsTarget.hidden=!0),this.isHidden=!0,this.inputTarget.removeAttribute("aria-activedescendant"),this.element.setAttribute("aria-expanded","false"),this.element.dispatchEvent(new CustomEvent("toggle",{detail:{action:"close",inputTarget:this.inputTarget,resultsTarget:this.resultsTarget}})))},i}(e.Controller);u.targets=["input","hidden","results"],u.values={submitOnEnter:Boolean,url:String,minLength:Number,skipHiddenProperty:Boolean},t.Autocomplete=u});
//# sourceMappingURL=stimulus-autocomplete.umd.js.map
