(()=>{"use strict";var e={679:(e,n,t)=>{var o=t(81),r=t.n(o),i=t(645);t.n(i)()(r()).push([e.id,".bigContainer {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n}\n.smallContainer {\n  border-bottom: 2px solid black;\n  width: 80%;\n  height: 5em;\n  margin-bottom: 2em;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n}\n.title {\n  font-size: x-large;\n  font-family: serif;\n  margin-left: 2em;\n}\n.buttonDescription {\n  padding: 2em;\n  border: 4px solid blueviolet;\n  width: 12em;\n  height: 0.5rem;\n  border-radius: 40%;\n  margin-left: 1em;\n  margin-top: 0.5em;\n  display: flex;\n  align-items: center;\n  font-family: sans-serif;\n}\n",""])},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(o)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(a[c]=!0)}for(var d=0;d<e.length;d++){var s=[].concat(e[d]);o&&a[s[0]]||(void 0!==i&&(void 0===s[5]||(s[1]="@layer".concat(s[5].length>0?" ".concat(s[5]):""," {").concat(s[1],"}")),s[5]=i),t&&(s[2]?(s[1]="@media ".concat(s[2]," {").concat(s[1],"}"),s[2]=t):s[2]=t),r&&(s[4]?(s[1]="@supports (".concat(s[4],") {").concat(s[1],"}"),s[4]=r):s[4]="".concat(r)),n.push(s))}},n}},81:e=>{e.exports=function(e){return e[1]}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={id:o,exports:{}};return e[o](i,i.exports,t),i.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{t(679),document.getElementById("div");let e,n,o,r,i=document.getElementById("output"),a=document.getElementById("buttonSearch"),l=document.getElementById("genre_input");a.addEventListener("click",(()=>{e=l.value,console.log(e),document.getElementById("genre_input").value="",i.hasChildNodes()&&""!==e&&(i.innerHTML=""),async function(){const t=await(a=e,fetch(`https://openlibrary.org/subjects/${a}.json`));var a;n=await t.json();let l=n.works;r=l.key;for(let e=0;e<l.length;e++){let n=l[e].authors,t=document.createElement("div"),a=document.createElement("div");o=document.createElement("button"),o.className="buttonDescription",o.innerHTML="read the description",i.appendChild(a),a.appendChild(t),a.className="bigContainer",a.appendChild(o),t.className="smallContainer";let c=document.createElement("h2");c.className="title",t.appendChild(c),c.innerHTML=l[e].title,r=l[e].key;for(let e=0;e<n.length;e++){let o=document.createElement("ul"),r=document.createElement("li");t.appendChild(o),o.appendChild(r),r.innerHTML=n[e].name}}}()}))})()})();