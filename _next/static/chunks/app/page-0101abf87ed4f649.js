(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1931],{29545:function(e,t,n){Promise.resolve().then(n.bind(n,84060)),Promise.resolve().then(n.bind(n,18124)),Promise.resolve().then(n.bind(n,40049)),Promise.resolve().then(n.bind(n,4864)),Promise.resolve().then(n.bind(n,95864)),Promise.resolve().then(n.t.bind(n,72972,23)),Promise.resolve().then(n.bind(n,81523)),Promise.resolve().then(n.bind(n,70049))},84060:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(57437),s=n(2265),o=n(27648),a=n(17580),i=n(10407),l=n(97678);function c(e){let{posts:t,showAll:n=!1}=e,[c,u]=(0,s.useState)([]),d=(0,s.useMemo)(()=>{let e=new Set;return t.forEach(t=>t.tags.forEach(t=>e.add(t))),Array.from(e)},[t]),h=(0,s.useMemo)(()=>0===c.length?t:t.filter(e=>c.some(t=>e.tags.includes(t))),[c,t]),m=(0,s.useMemo)(()=>n||c.length>0?h:h.slice(0,3),[h,n,c]);return(0,r.jsxs)("section",{className:"blog-list",children:[(0,r.jsx)("h2",{children:"Posts"}),(0,r.jsx)(l.Z,{options:d,activeFilters:c,onFilterChange:u,placeholder:"by tag"}),(0,r.jsx)("div",{className:"posts-table",children:m.map(e=>(0,r.jsxs)(o.default,{href:"/post/".concat(e.slug),className:"post-row",children:[(0,r.jsx)("div",{className:"post-year",children:new Date(e.date).getFullYear().toString()}),(0,r.jsx)("div",{className:"post-title",children:e.title}),(0,r.jsxs)("div",{className:"post-meta",children:["development"===e.status&&(0,r.jsx)("span",{className:"development-badge",children:"Development"}),"draft"===e.status&&(0,r.jsx)("span",{className:"draft-badge",children:"Draft"}),(0,r.jsx)(a.Z,{size:18,className:"arrow-icon"})]})]},e.slug))}),!n&&!c.length&&h.length>3&&(0,r.jsxs)(o.default,{href:"/posts",className:"show-more-button",children:[(0,r.jsx)("span",{className:"show-text",children:"All"}),(0,r.jsx)(i.Z,{size:16})]})]})}},40049:function(e,t,n){"use strict";n.r(t);var r=n(57437),s=n(2265);t.default=()=>{let[e,t]=(0,s.useState)([]),[n,o]=(0,s.useState)(null),[a,i]=(0,s.useState)(!1);(0,s.useEffect)(()=>{let e=()=>{i(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,s.useEffect)(()=>{let e=async()=>{try{let e=await fetch("https://github-contributions-api.jogruber.de/v4/dan10ish?y=last"),n=await e.json();if(!(null==n?void 0:n.contributions))throw Error("No contribution data found");let r=n.contributions.map(e=>({date:e.date,contributionCount:e.count})),s=7*(a?20:26),o=r.slice(-s);if(o.length<s){let e=Array(s-o.length).fill({contributionCount:0,date:null});t(e.concat(o))}else t(o)}catch(e){t(Array(7*(a?20:26)).fill({contributionCount:0,date:null}))}};e();let n=setInterval(e,36e5);return()=>clearInterval(n)},[a]);let l=(0,s.useCallback)(e=>0===e?0:1===e?1:e<=3?2:e<=5?3:4,[]),c=(0,s.useCallback)((e,t)=>{if(!(null==t?void 0:t.date))return;let n=e.target.getBoundingClientRect(),r=new Date(t.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"}),s=window.innerWidth,a=n.left+n.width/2,i=n.top,l=a+100>s-22,c=a-100<22;l?a=s-100-22:c&&(a=122),i-40<22&&(i=n.bottom+10),o({text:"".concat(t.contributionCount," ").concat(1===t.contributionCount?"contribution":"contributions"," on ").concat(r.split(" ").reverse().join(" ")),x:a,y:i,position:i===n.bottom+10?"bottom":"top"})},[]),u=(0,s.useCallback)(()=>o(null),[]);return(0,r.jsxs)("div",{className:"contributions-wrapper",children:[(0,r.jsx)("div",{className:"contributions-grid",style:{"--week-count":a?20:26},children:Array.from({length:a?20:26}).map((t,n)=>(0,r.jsx)("div",{className:"contribution-week",children:Array.from({length:7}).map((t,s)=>{let o=e[7*n+s];return(0,r.jsx)("div",{className:"contribution-cell ".concat((null==o?void 0:o.date)?"level-".concat(l(o.contributionCount)):"level-0"),onMouseEnter:e=>(null==o?void 0:o.date)&&c(e,o),onMouseLeave:u,onTouchStart:e=>{e.preventDefault(),(null==o?void 0:o.date)&&c(e,o)},onTouchEnd:e=>{e.preventDefault(),u()}},s)})},n))}),n&&(0,r.jsx)("div",{className:"contribution-tooltip",style:{transform:"bottom"===n.position?"translateX(-50%)":"translateX(-50%) translateY(-100%)",left:"".concat(n.x,"px"),top:"".concat(n.y,"px")},children:n.text})]})}},4864:function(e,t,n){"use strict";n.d(t,{IconCloudDemo:function(){return l}});var r=n(57437),s=n(2265),o=n(31679),a=e=>{let{iconSlugs:t}=e,n=(0,s.useRef)(null),a=(0,s.useRef)(),[i,l]=(0,s.useState)(!1),[c,u]=(0,s.useState)({x:0,y:0}),d=(0,s.useRef)({x:0,y:0}),h=(0,s.useRef)(!1),m=(0,s.useRef)({x:0,y:0}),v=(0,s.useRef)(0);if((0,s.useEffect)(()=>{l(!0)},[]),(0,s.useEffect)(()=>{var e;if(!i)return;let t=(null===(e=n.current)||void 0===e?void 0:e.children)||[],r=window.innerWidth>768?180:130,s=(e,t,n)=>e+(t-e)*n,o=()=>{d.current.x=s(d.current.x,c.x,.15),d.current.y=s(d.current.y,c.y,.15),Array.from(t).forEach((e,n)=>{let s=Math.acos(-1+2*n/t.length),o=Math.sqrt(t.length*Math.PI)*s,a=r*Math.cos(o+v.current)*Math.sin(s),i=r*Math.sin(o+v.current)*Math.sin(s),l=r*Math.cos(s),c=d.current.x*Math.PI/180,u=d.current.y*Math.PI/180,h=a*Math.cos(u)-l*Math.sin(u),m=a*Math.sin(u)+l*Math.cos(u),f=m<0?Math.min(1.5,Math.abs(m/r)):0,p=m<0?Math.max(.3,1+m/r):1;e.style.transform="translate3d(".concat(h,"px, ").concat(i*Math.cos(c)+m*Math.sin(c),"px, ").concat(m,"px)"),e.style.opacity=p,e.style.filter="blur(".concat(f,"px)"),e.style.zIndex=Math.round(m)}),v.current+=.002,a.current=requestAnimationFrame(o)};o();let l=e=>{h.current=!0,e.preventDefault()},f=()=>{h.current=!1},p=e=>{h.current&&u(t=>({x:(t.x+.5*e.movementY)%360,y:(t.y+.5*e.movementX)%360}))},x=e=>{h.current=!0,m.current={x:e.touches[0].clientX,y:e.touches[0].clientY},e.preventDefault()},b=e=>{if(!h.current)return;let t=e.touches[0],n=t.clientX-m.current.x,r=t.clientY-m.current.y;u(e=>({x:(e.x+.5*r)%360,y:(e.y+.5*n)%360})),m.current={x:t.clientX,y:t.clientY}},y=()=>{h.current=!1},g=n.current;return g.addEventListener("mousedown",l,{passive:!1}),g.addEventListener("mousemove",p),g.addEventListener("mouseup",f),g.addEventListener("mouseleave",f),g.addEventListener("touchstart",x,{passive:!1}),g.addEventListener("touchmove",b),g.addEventListener("touchend",y),()=>{a.current&&cancelAnimationFrame(a.current),g.removeEventListener("mousedown",l),g.removeEventListener("mousemove",p),g.removeEventListener("mouseup",f),g.removeEventListener("mouseleave",f),g.removeEventListener("touchstart",x),g.removeEventListener("touchmove",b),g.removeEventListener("touchend",y)}},[c,i]),!i)return null;let f=e=>(.299*parseInt(e.slice(0,2),16)+.587*parseInt(e.slice(2,4),16)+.114*parseInt(e.slice(4,6),16))/255,p=e=>{let t=f(e);return"000000"===e||"000"===e||t<.3||"ffffff"===e||"fff"===e||t>.9||t<.2&&(e.startsWith("00")||e.startsWith("0000"))?"var(--color-text)":"#".concat(e)};return(0,r.jsx)("div",{ref:n,className:"icon-cloud",children:t.map(e=>{let t=o["si".concat(e.charAt(0).toUpperCase()).concat(e.slice(1))];if(!t)return null;let n=p(t.hex);return(0,r.jsx)("div",{className:"icon-item",title:t.title,children:(0,r.jsx)("svg",{role:"img",viewBox:"0 0 24 24",className:"icon-svg",style:{color:n},children:(0,r.jsx)("path",{d:t.path,fill:"currentColor"})})},e)})})};let i=["python","c","cplusplus","javascript","numpy","pandas","html5","latex","mdx","scikitlearn","tensorflow","linux","git","react","css3","sketch","blender","solidworks","arduino","nextdotjs","nodedotjs","adobephotoshop","framer","unity","threedotjs","supabase"];function l(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"icon-cloud-container",children:(0,r.jsx)(a,{iconSlugs:i})})})}}},function(e){e.O(0,[2786,402,4972,8956,6141,8674,7508,6777,6144,1774,6400,9754,9036,5661,8071,2704,222,6626,4188,1707,8335,3569,4180,4717,7822,4479,9180,8042,1948,463,4201,8921,2466,2153,7030,7010,4258,8575,2922,1198,3019,8660,1811,5014,7140,810,1424,5675,8608,8898,6204,8648,5385,6830,1719,7355,1034,7340,2703,4382,4800,8859,7746,6275,2883,6532,7978,1744],function(){return e(e.s=29545)}),_N_E=e.O()}]);