if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),u={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-42e3e3c7"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-08d7ebab.js",revision:null},{url:"assets/index-2630fb99.js",revision:null},{url:"assets/index-26bec9bc.css",revision:null},{url:"assets/index-6f8c63bf.js",revision:null},{url:"assets/index-b84085a1.js",revision:null},{url:"assets/index-baaa9755.js",revision:null},{url:"index.html",revision:"e76e7b0e2f78c6459b7f0d5136b7c6ac"},{url:"registerSW.js",revision:"bfba3a8eaf826c59a5aeac19cc86fd01"},{url:"manifest.webmanifest",revision:"1666b696055943128537fea56dbffb21"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));