"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6532],{56797:function(t,e,n){n.d(e,{eI:function(){return N}});var r=n(13221),i=n(49808),o=n(3491);class s extends Error{constructor(t){super(t),this.__isStorageError=!0,this.name="StorageError"}}function a(t){return"object"==typeof t&&null!==t&&"__isStorageError"in t}class u extends s{constructor(t,e){super(t),this.name="StorageApiError",this.status=e}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class c extends s{constructor(t,e){super(t),this.name="StorageUnknownError",this.originalError=e}}let l=t=>{let e;return t?e=t:"undefined"==typeof fetch?e=(...t)=>Promise.resolve().then(n.bind(n,80485)).then(({default:e})=>e(...t)):e=fetch,(...t)=>e(...t)},h=()=>{var t,e,r,i;return t=void 0,e=void 0,r=void 0,i=function*(){return"undefined"==typeof Response?(yield Promise.resolve().then(n.bind(n,80485))).Response:Response},new(r||(r=Promise))(function(n,o){function s(t){try{u(i.next(t))}catch(t){o(t)}}function a(t){try{u(i.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?n(t.value):((e=t.value)instanceof r?e:new r(function(t){t(e)})).then(s,a)}u((i=i.apply(t,e||[])).next())})},d=t=>{if(Array.isArray(t))return t.map(t=>d(t));if("function"==typeof t||t!==Object(t))return t;let e={};return Object.entries(t).forEach(([t,n])=>{e[t.replace(/([-_][a-z])/gi,t=>t.toUpperCase().replace(/[-_]/g,""))]=d(n)}),e};var f=function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):((e=t.value)instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((r=r.apply(t,e||[])).next())})};let p=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),v=(t,e,n)=>f(void 0,void 0,void 0,function*(){t instanceof(yield h())&&!(null==n?void 0:n.noResolveJson)?t.json().then(n=>{e(new u(p(n),t.status||500))}).catch(t=>{e(new c(p(t),t))}):e(new c(p(t),t))}),y=(t,e,n,r)=>{let i={method:t,headers:(null==e?void 0:e.headers)||{}};return"GET"===t?i:(i.headers=Object.assign({"Content-Type":"application/json"},null==e?void 0:e.headers),r&&(i.body=JSON.stringify(r)),Object.assign(Object.assign({},i),n))};function b(t,e,n,r,i,o){return f(this,void 0,void 0,function*(){return new Promise((s,a)=>{t(n,y(e,r,i,o)).then(t=>{if(!t.ok)throw t;return(null==r?void 0:r.noResolveJson)?t:t.json()}).then(t=>s(t)).catch(t=>v(t,a,r))})})}function g(t,e,n,r){return f(this,void 0,void 0,function*(){return b(t,"GET",e,n,r)})}function m(t,e,n,r,i){return f(this,void 0,void 0,function*(){return b(t,"POST",e,r,i,n)})}function w(t,e,n,r,i){return f(this,void 0,void 0,function*(){return b(t,"DELETE",e,r,i,n)})}var _=n(82957).lW,j=function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):((e=t.value)instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((r=r.apply(t,e||[])).next())})};let O={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},k={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};class ${constructor(t,e={},n,r){this.url=t,this.headers=e,this.bucketId=n,this.fetch=l(r)}uploadOrUpdate(t,e,n,r){return j(this,void 0,void 0,function*(){try{let i;let o=Object.assign(Object.assign({},k),r),s=Object.assign(Object.assign({},this.headers),"POST"===t&&{"x-upsert":String(o.upsert)}),a=o.metadata;"undefined"!=typeof Blob&&n instanceof Blob?((i=new FormData).append("cacheControl",o.cacheControl),a&&i.append("metadata",this.encodeMetadata(a)),i.append("",n)):"undefined"!=typeof FormData&&n instanceof FormData?((i=n).append("cacheControl",o.cacheControl),a&&i.append("metadata",this.encodeMetadata(a))):(i=n,s["cache-control"]=`max-age=${o.cacheControl}`,s["content-type"]=o.contentType,a&&(s["x-metadata"]=this.toBase64(this.encodeMetadata(a)))),(null==r?void 0:r.headers)&&(s=Object.assign(Object.assign({},s),r.headers));let u=this._removeEmptyFolders(e),c=this._getFinalPath(u),l=yield this.fetch(`${this.url}/object/${c}`,Object.assign({method:t,body:i,headers:s},(null==o?void 0:o.duplex)?{duplex:o.duplex}:{})),h=yield l.json();if(l.ok)return{data:{path:u,id:h.Id,fullPath:h.Key},error:null};return{data:null,error:h}}catch(t){if(a(t))return{data:null,error:t};throw t}})}upload(t,e,n){return j(this,void 0,void 0,function*(){return this.uploadOrUpdate("POST",t,e,n)})}uploadToSignedUrl(t,e,n,r){return j(this,void 0,void 0,function*(){let i=this._removeEmptyFolders(t),o=this._getFinalPath(i),s=new URL(this.url+`/object/upload/sign/${o}`);s.searchParams.set("token",e);try{let t;let e=Object.assign({upsert:k.upsert},r),o=Object.assign(Object.assign({},this.headers),{"x-upsert":String(e.upsert)});"undefined"!=typeof Blob&&n instanceof Blob?((t=new FormData).append("cacheControl",e.cacheControl),t.append("",n)):"undefined"!=typeof FormData&&n instanceof FormData?(t=n).append("cacheControl",e.cacheControl):(t=n,o["cache-control"]=`max-age=${e.cacheControl}`,o["content-type"]=e.contentType);let a=yield this.fetch(s.toString(),{method:"PUT",body:t,headers:o}),u=yield a.json();if(a.ok)return{data:{path:i,fullPath:u.Key},error:null};return{data:null,error:u}}catch(t){if(a(t))return{data:null,error:t};throw t}})}createSignedUploadUrl(t,e){return j(this,void 0,void 0,function*(){try{let n=this._getFinalPath(t),r=Object.assign({},this.headers);(null==e?void 0:e.upsert)&&(r["x-upsert"]="true");let i=yield m(this.fetch,`${this.url}/object/upload/sign/${n}`,{},{headers:r}),o=new URL(this.url+i.url),a=o.searchParams.get("token");if(!a)throw new s("No token returned by API");return{data:{signedUrl:o.toString(),path:t,token:a},error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}update(t,e,n){return j(this,void 0,void 0,function*(){return this.uploadOrUpdate("PUT",t,e,n)})}move(t,e,n){return j(this,void 0,void 0,function*(){try{return{data:yield m(this.fetch,`${this.url}/object/move`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:null==n?void 0:n.destinationBucket},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}copy(t,e,n){return j(this,void 0,void 0,function*(){try{return{data:{path:(yield m(this.fetch,`${this.url}/object/copy`,{bucketId:this.bucketId,sourceKey:t,destinationKey:e,destinationBucket:null==n?void 0:n.destinationBucket},{headers:this.headers})).Key},error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}createSignedUrl(t,e,n){return j(this,void 0,void 0,function*(){try{let r=this._getFinalPath(t),i=yield m(this.fetch,`${this.url}/object/sign/${r}`,Object.assign({expiresIn:e},(null==n?void 0:n.transform)?{transform:n.transform}:{}),{headers:this.headers}),o=(null==n?void 0:n.download)?`&download=${!0===n.download?"":n.download}`:"";return{data:i={signedUrl:encodeURI(`${this.url}${i.signedURL}${o}`)},error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}createSignedUrls(t,e,n){return j(this,void 0,void 0,function*(){try{let r=yield m(this.fetch,`${this.url}/object/sign/${this.bucketId}`,{expiresIn:e,paths:t},{headers:this.headers}),i=(null==n?void 0:n.download)?`&download=${!0===n.download?"":n.download}`:"";return{data:r.map(t=>Object.assign(Object.assign({},t),{signedUrl:t.signedURL?encodeURI(`${this.url}${t.signedURL}${i}`):null})),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}download(t,e){return j(this,void 0,void 0,function*(){let n=void 0!==(null==e?void 0:e.transform),r=this.transformOptsToQueryString((null==e?void 0:e.transform)||{}),i=r?`?${r}`:"";try{let e=this._getFinalPath(t),r=yield g(this.fetch,`${this.url}/${n?"render/image/authenticated":"object"}/${e}${i}`,{headers:this.headers,noResolveJson:!0});return{data:yield r.blob(),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}info(t){return j(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{let t=yield g(this.fetch,`${this.url}/object/info/${e}`,{headers:this.headers});return{data:d(t),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}exists(t){return j(this,void 0,void 0,function*(){let e=this._getFinalPath(t);try{return yield function(t,e,n,r){return f(this,void 0,void 0,function*(){return b(t,"HEAD",e,Object.assign(Object.assign({},n),{noResolveJson:!0}),void 0)})}(this.fetch,`${this.url}/object/${e}`,{headers:this.headers}),{data:!0,error:null}}catch(t){if(a(t)&&t instanceof c){let e=t.originalError;if([400,404].includes(null==e?void 0:e.status))return{data:!1,error:t}}throw t}})}getPublicUrl(t,e){let n=this._getFinalPath(t),r=[],i=(null==e?void 0:e.download)?`download=${!0===e.download?"":e.download}`:"";""!==i&&r.push(i);let o=void 0!==(null==e?void 0:e.transform),s=this.transformOptsToQueryString((null==e?void 0:e.transform)||{});""!==s&&r.push(s);let a=r.join("&");return""!==a&&(a=`?${a}`),{data:{publicUrl:encodeURI(`${this.url}/${o?"render/image":"object"}/public/${n}${a}`)}}}remove(t){return j(this,void 0,void 0,function*(){try{return{data:yield w(this.fetch,`${this.url}/object/${this.bucketId}`,{prefixes:t},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}list(t,e,n){return j(this,void 0,void 0,function*(){try{let r=Object.assign(Object.assign(Object.assign({},O),e),{prefix:t||""});return{data:yield m(this.fetch,`${this.url}/object/list/${this.bucketId}`,r,{headers:this.headers},n),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return void 0!==_?_.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(t){let e=[];return t.width&&e.push(`width=${t.width}`),t.height&&e.push(`height=${t.height}`),t.resize&&e.push(`resize=${t.resize}`),t.format&&e.push(`format=${t.format}`),t.quality&&e.push(`quality=${t.quality}`),e.join("&")}}let T={"X-Client-Info":"storage-js/2.7.1"};var P=function(t,e,n,r){return new(n||(n=Promise))(function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):((e=t.value)instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((r=r.apply(t,e||[])).next())})};class U{constructor(t,e={},n){this.url=t,this.headers=Object.assign(Object.assign({},T),e),this.fetch=l(n)}listBuckets(){return P(this,void 0,void 0,function*(){try{return{data:yield g(this.fetch,`${this.url}/bucket`,{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}getBucket(t){return P(this,void 0,void 0,function*(){try{return{data:yield g(this.fetch,`${this.url}/bucket/${t}`,{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}createBucket(t,e={public:!1}){return P(this,void 0,void 0,function*(){try{return{data:yield m(this.fetch,`${this.url}/bucket`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}updateBucket(t,e){return P(this,void 0,void 0,function*(){try{return{data:yield function(t,e,n,r,i){return f(this,void 0,void 0,function*(){return b(t,"PUT",e,r,void 0,n)})}(this.fetch,`${this.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}emptyBucket(t){return P(this,void 0,void 0,function*(){try{return{data:yield m(this.fetch,`${this.url}/bucket/${t}/empty`,{},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}deleteBucket(t){return P(this,void 0,void 0,function*(){try{return{data:yield w(this.fetch,`${this.url}/bucket/${t}`,{},{headers:this.headers}),error:null}}catch(t){if(a(t))return{data:null,error:t};throw t}})}}class S extends U{constructor(t,e={},n){super(t,e,n)}from(t){return new $(this.url,this.headers,t,this.fetch)}}let E="";"undefined"!=typeof Deno?E="deno":"undefined"!=typeof document?E="web":"undefined"!=typeof navigator&&"ReactNative"===navigator.product?E="react-native":E="node";let x={headers:{"X-Client-Info":`supabase-js-${E}/2.47.10`}},C={schema:"public"},A={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},F={};var R=n(80485);let I=t=>{let e;return t?e=t:"undefined"==typeof fetch?e=R.default:e=fetch,(...t)=>e(...t)},B=()=>"undefined"==typeof Headers?R.Headers:Headers,K=(t,e,n)=>{let r=I(n),i=B();return(n,o)=>{var s,a,u,c;return s=void 0,a=void 0,u=void 0,c=function*(){var s;let a=null!==(s=yield e())&&void 0!==s?s:t,u=new i(null==o?void 0:o.headers);return u.has("apikey")||u.set("apikey",t),u.has("Authorization")||u.set("Authorization",`Bearer ${a}`),r(n,Object.assign(Object.assign({},o),{headers:u}))},new(u||(u=Promise))(function(t,e){function n(t){try{i(c.next(t))}catch(t){e(t)}}function r(t){try{i(c.throw(t))}catch(t){e(t)}}function i(e){var i;e.done?t(e.value):((i=e.value)instanceof u?i:new u(function(t){t(i)})).then(n,r)}i((c=c.apply(s,a||[])).next())})}};var D=n(71470);class M extends D.LY{constructor(t){super(t)}}class z{constructor(t,e,n){var r,o,s;if(this.supabaseUrl=t,this.supabaseKey=e,!t)throw Error("supabaseUrl is required.");if(!e)throw Error("supabaseKey is required.");let a=t.replace(/\/$/,"");this.realtimeUrl=`${a}/realtime/v1`.replace(/^http/i,"ws"),this.authUrl=`${a}/auth/v1`,this.storageUrl=`${a}/storage/v1`,this.functionsUrl=`${a}/functions/v1`;let u=`sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,c=function(t,e){let{db:n,auth:r,realtime:i,global:o}=t,{db:s,auth:a,realtime:u,global:c}=e,l={db:Object.assign(Object.assign({},s),n),auth:Object.assign(Object.assign({},a),r),realtime:Object.assign(Object.assign({},u),i),global:Object.assign(Object.assign({},c),o),accessToken:()=>{var t,e,n,r;return t=this,e=void 0,r=function*(){return""},new(n=void 0,n=Promise)(function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):((e=t.value)instanceof n?e:new n(function(t){t(e)})).then(s,a)}u((r=r.apply(t,e||[])).next())})}};return t.accessToken?l.accessToken=t.accessToken:delete l.accessToken,l}(null!=n?n:{},{db:C,realtime:F,auth:Object.assign(Object.assign({},A),{storageKey:u}),global:x});this.storageKey=null!==(r=c.auth.storageKey)&&void 0!==r?r:"",this.headers=null!==(o=c.global.headers)&&void 0!==o?o:{},c.accessToken?(this.accessToken=c.accessToken,this.auth=new Proxy({},{get:(t,e)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(e)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(null!==(s=c.auth)&&void 0!==s?s:{},this.headers,c.global.fetch),this.fetch=K(e,this._getAccessToken.bind(this),c.global.fetch),this.realtime=this._initRealtimeClient(Object.assign({headers:this.headers,accessToken:this._getAccessToken.bind(this)},c.realtime)),this.rest=new i.po(`${a}/rest/v1`,{headers:this.headers,schema:c.db.schema,fetch:this.fetch}),c.accessToken||this._listenForAuthEvents()}get functions(){return new r.b(this.functionsUrl,{headers:this.headers,customFetch:this.fetch})}get storage(){return new S(this.storageUrl,this.headers,this.fetch)}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},n={}){return this.rest.rpc(t,e,n)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}_getAccessToken(){var t,e,n,r,i,o;return n=this,r=void 0,i=void 0,o=function*(){if(this.accessToken)return yield this.accessToken();let{data:n}=yield this.auth.getSession();return null!==(e=null===(t=n.session)||void 0===t?void 0:t.access_token)&&void 0!==e?e:null},new(i||(i=Promise))(function(t,e){function s(t){try{u(o.next(t))}catch(t){e(t)}}function a(t){try{u(o.throw(t))}catch(t){e(t)}}function u(e){var n;e.done?t(e.value):((n=e.value)instanceof i?n:new i(function(t){t(n)})).then(s,a)}u((o=o.apply(n,r||[])).next())})}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:r,storageKey:i,flowType:o,lock:s,debug:a},u,c){var l;let h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new M({url:this.authUrl,headers:Object.assign(Object.assign({},h),u),storageKey:i,autoRefreshToken:t,persistSession:e,detectSessionInUrl:n,storage:r,flowType:o,lock:s,debug:a,fetch:c,hasCustomAuthorizationHeader:"Authorization"in this.headers})}_initRealtimeClient(t){return new o.VH(this.realtimeUrl,Object.assign(Object.assign({},t),{params:Object.assign({apikey:this.supabaseKey},null==t?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",null==e?void 0:e.access_token)})}_handleTokenChanged(t,e,n){("TOKEN_REFRESHED"===t||"SIGNED_IN"===t)&&this.changedAccessToken!==n?this.changedAccessToken=n:"SIGNED_OUT"===t&&(this.realtime.setAuth(),"STORAGE"==e&&this.auth.signOut(),this.changedAccessToken=void 0)}}let N=(t,e,n)=>new z(t,e,n)},55223:function(t){t.exports=function(){throw Error("ws does not work in the browser. Browser clients must use the native WebSocket object")}},38754:function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}n.r(e),n.d(e,{_:function(){return r},_interop_require_default:function(){return r}})},61757:function(t,e,n){function r(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,n=new WeakMap;return(r=function(t){return t?n:e})(t)}function i(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var n=r(e);if(n&&n.has(t))return n.get(t);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in t)if("default"!==s&&Object.prototype.hasOwnProperty.call(t,s)){var a=o?Object.getOwnPropertyDescriptor(t,s):null;a&&(a.get||a.set)?Object.defineProperty(i,s,a):i[s]=t[s]}return i.default=t,n&&n.set(t,i),i}n.r(e),n.d(e,{_:function(){return i},_interop_require_wildcard:function(){return i}})},2522:function(t,e,n){function r(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw TypeError("attempted to use private field on non-instance");return t}n.r(e),n.d(e,{_:function(){return r},_class_private_field_loose_base:function(){return r}})},90675:function(t,e,n){n.r(e),n.d(e,{_:function(){return i},_class_private_field_loose_key:function(){return i}});var r=0;function i(t){return"__private_"+r+++"_"+t}},47043:function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}n.r(e),n.d(e,{_:function(){return r},_interop_require_default:function(){return r}})},53099:function(t,e,n){function r(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,n=new WeakMap;return(r=function(t){return t?n:e})(t)}function i(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var n=r(e);if(n&&n.has(t))return n.get(t);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in t)if("default"!==s&&Object.prototype.hasOwnProperty.call(t,s)){var a=o?Object.getOwnPropertyDescriptor(t,s):null;a&&(a.get||a.set)?Object.defineProperty(i,s,a):i[s]=t[s]}return i.default=t,n&&n.set(t,i),i}n.r(e),n.d(e,{_:function(){return i},_interop_require_wildcard:function(){return i}})}}]);