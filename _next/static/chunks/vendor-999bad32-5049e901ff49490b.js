"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[810],{56118:function(e,l,t){Object.defineProperty(l,"__esModule",{value:!0}),function(e,l){for(var t in l)Object.defineProperty(e,t,{enumerable:!0,get:l[t]})}(l,{abortTask:function(){return d},listenForDynamicRequest:function(){return a},updateCacheNodeOnNavigation:function(){return function e(l,t,a,d,c){let f=t[1],s=a[1],h=d[1],p=l.parallelRoutes,v=new Map(p),g={},R=null;for(let l in s){let t;let a=s[l],d=f[l],y=p.get(l),_=h[l],m=a[0],M=(0,o.createRouterCacheKey)(m),b=void 0!==d?d[0]:void 0,w=void 0!==y?y.get(M):void 0;if(null!==(t=m===n.PAGE_SEGMENT_KEY?r(a,void 0!==_?_:null,c):m===n.DEFAULT_SEGMENT_KEY?void 0!==d?{route:d,node:null,children:null}:r(a,void 0!==_?_:null,c):void 0!==b&&(0,u.matchSegment)(m,b)&&void 0!==w&&void 0!==d?null!=_?e(w,d,a,_,c):function(e){let l=i(e,null,null);return{route:e,node:l,children:null}}(a):r(a,void 0!==_?_:null,c))){null===R&&(R=new Map),R.set(l,t);let e=t.node;if(null!==e){let t=new Map(y);t.set(M,e),v.set(l,t)}g[l]=t.route}else g[l]=a}if(null===R)return null;let y={lazyData:null,rsc:l.rsc,prefetchRsc:l.prefetchRsc,head:l.head,prefetchHead:l.prefetchHead,loading:l.loading,parallelRoutes:v,lazyDataResolved:!1};return{route:function(e,l){let t=[e[0],l];return 2 in e&&(t[2]=e[2]),3 in e&&(t[3]=e[3]),4 in e&&(t[4]=e[4]),t}(a,g),node:y,children:R}}},updateCacheNodeOnPopstateRestoration:function(){return function e(l,t){let n=t[1],u=l.parallelRoutes,r=new Map(u);for(let l in n){let t=n[l],a=t[0],i=(0,o.createRouterCacheKey)(a),d=u.get(l);if(void 0!==d){let n=d.get(i);if(void 0!==n){let u=e(n,t),o=new Map(d);o.set(i,u),r.set(l,o)}}}let a=l.rsc,i=s(a)&&"pending"===a.status;return{lazyData:null,rsc:a,head:l.head,prefetchHead:i?l.prefetchHead:null,prefetchRsc:i?l.prefetchRsc:null,loading:i?l.loading:null,parallelRoutes:r,lazyDataResolved:!1}}}});let n=t(84541),u=t(76015),o=t(78505);function r(e,l,t){let n=i(e,l,t);return{route:e,node:n,children:null}}function a(e,l){l.then(l=>{for(let t of l[0]){let l=t.slice(0,-3),n=t[t.length-3],r=t[t.length-2],a=t[t.length-1];"string"!=typeof l&&function(e,l,t,n,r){let a=e;for(let e=0;e<l.length;e+=2){let t=l[e],n=l[e+1],o=a.children;if(null!==o){let e=o.get(t);if(void 0!==e){let l=e.route[0];if((0,u.matchSegment)(n,l)){a=e;continue}}}return}!function e(l,t,n,r){let a=l.children,i=l.node;if(null===a){null!==i&&(function e(l,t,n,r,a){let i=t[1],d=n[1],f=r[1],h=l.parallelRoutes;for(let l in i){let t=i[l],n=d[l],r=f[l],s=h.get(l),p=t[0],v=(0,o.createRouterCacheKey)(p),g=void 0!==s?s.get(v):void 0;void 0!==g&&(void 0!==n&&(0,u.matchSegment)(p,n[0])&&null!=r?e(g,t,n,r,a):c(t,g,null))}let p=l.rsc,v=r[2];null===p?l.rsc=v:s(p)&&p.resolve(v);let g=l.head;s(g)&&g.resolve(a)}(i,l.route,t,n,r),l.node=null);return}let d=t[1],f=n[1];for(let l in t){let t=d[l],n=f[l],o=a.get(l);if(void 0!==o){let l=o.route[0];if((0,u.matchSegment)(t[0],l)&&null!=n)return e(o,t,n,r)}}}(a,t,n,r)}(e,l,n,r,a)}d(e,null)},l=>{d(e,l)})}function i(e,l,t){let n=e[1],u=null!==l?l[1]:null,r=new Map;for(let e in n){let l=n[e],a=null!==u?u[e]:null,d=l[0],c=(0,o.createRouterCacheKey)(d),f=i(l,void 0===a?null:a,t),s=new Map;s.set(c,f),r.set(e,s)}let a=0===r.size,d=null!==l?l[2]:null,c=null!==l?l[3]:null;return{lazyData:null,parallelRoutes:r,prefetchRsc:void 0!==d?d:null,prefetchHead:a?t:null,loading:void 0!==c?c:null,rsc:h(),head:a?h():null,lazyDataResolved:!1}}function d(e,l){let t=e.node;if(null===t)return;let n=e.children;if(null===n)c(e.route,t,l);else for(let e of n.values())d(e,l);e.node=null}function c(e,l,t){let n=e[1],u=l.parallelRoutes;for(let e in n){let l=n[e],r=u.get(e);if(void 0===r)continue;let a=l[0],i=(0,o.createRouterCacheKey)(a),d=r.get(i);void 0!==d&&c(l,d,t)}let r=l.rsc;s(r)&&(null===t?r.resolve(null):r.reject(t));let a=l.head;s(a)&&a.resolve(null)}let f=Symbol();function s(e){return e&&e.tag===f}function h(){let e,l;let t=new Promise((t,n)=>{e=t,l=n});return t.status="pending",t.resolve=l=>{"pending"===t.status&&(t.status="fulfilled",t.value=l,e(l))},t.reject=e=>{"pending"===t.status&&(t.status="rejected",t.reason=e,l(e))},t.tag=f,t}("function"==typeof l.default||"object"==typeof l.default&&null!==l.default)&&void 0===l.default.__esModule&&(Object.defineProperty(l.default,"__esModule",{value:!0}),Object.assign(l.default,l),e.exports=l.default)}}]);