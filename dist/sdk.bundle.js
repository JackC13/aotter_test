!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1),n(2)},function(e,t,n){},function(e,t){function n(e,t,n){"VIDEO"==e?a(`<div class="video-container"><iframe width="100%" height="315"\n    src="${t.video_url}" frameborder="0"\n    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div>`,n):"BANNER"==e&&a(`<div class="banner-container" \n    style="background:Url('${t.image}');background-size:cover;background-repeat:no-repeat;background-position:center;"><div>`,n),o[n].getElementsByClassName("ad-info")[0].getElementsByClassName("title")[0].innerHTML=`<div class="title-word">${t.description}</div>`}function i(){let e,t=r.getAttribute("ad-type");e=t?c.filter((e,n,i)=>{if(e.success&&e.type===t)return e}):c;for(let t=0;t<e.length;t++)e[t].success?(o[t]=s(o[t]),o[t].children["ad-media"].addEventListener("addAD",function(e){o[t].children["ad-media"].innerHTML=e.detail.html}),n(e[t].type,e[t],t)):(o[t].addEventListener("faillAD",function(e){o[t].innerHTML=e.detail.html}),d("<div>載入失敗</div>",t));r.addEventListener("finishAD",function(e){r.setAttribute("is-success",e.detail.attr)}),function(e,t,n){const i=new CustomEvent("finishAD",{detail:{attr:e}});console.log("廣告觀看超過"+n+"毫秒"),r.dispatchEvent(i),setTimeout(()=>{},n)}("y",e[0].impression_url,2e3)}var r,o;function a(e,t){const n=new CustomEvent("addAD",{detail:{html:e}});console.log("第"+t+"個廣告載入成功"),o[t].children["ad-media"].dispatchEvent(n)}function d(e,t){const n=new CustomEvent("faillAD",{detail:{html:e}});console.log("第"+t+"個廣告載入失敗"),o[t].dispatchEvent(n)}document.addEventListener("DOMContentLoaded",function(e){(r=void 0===document.getElementById("ad_box")?null:document.getElementById("ad_box"))&&(o=r.children[0].getElementsByClassName("ad-block"),function(){for(let e=0;e<o.length;e++)!function(e){l[e]=new XMLHttpRequest,l[e].open("GET","http://localhost:3000/ads",!1),l[e].onreadystatechange=function(){4===l[e].readyState&&200===l[e].status&&c.push(JSON.parse(l[e].responseText))},l[e].send()}(e)}(),i())});var l=[],c=new Array;function s(e){let t=document.createElement("div");t.id="ad-media",t.className="ad-media";let n=document.createElement("div");n.className="ad-info";let i=document.createElement("div");i.className="word",i.textContent="AGIRLS.AOTTER.NET";let r=document.createElement("div");return r.id="title",r.className="title",n.append(i),n.append(r),e.append(t),e.append(n),e}}]);