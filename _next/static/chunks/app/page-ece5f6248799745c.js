(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3529:function(e,t,s){Promise.resolve().then(s.bind(s,4060)),Promise.resolve().then(s.bind(s,8124)),Promise.resolve().then(s.bind(s,8358))},4060:function(e,t,s){"use strict";s.d(t,{default:function(){return d}});var i=s(7437),a=s(2265),r=s(7648),n=s(7580),c=s(875),o=s(1269);let l=e=>{let{post:t}=e;return(0,i.jsx)(r.default,{href:"/post/".concat(t.slug),className:"blog-card",children:(0,i.jsx)("article",{className:"blog-card-inner",children:(0,i.jsx)("div",{className:"post-content",children:(0,i.jsxs)("div",{children:[(0,i.jsxs)("h3",{className:"post-title",children:[t.title,"development"===t.status&&(0,i.jsx)("span",{className:"development-badge",children:"In Development"}),"draft"===t.status&&(0,i.jsx)("span",{className:"draft-badge",children:"Draft"}),(0,i.jsx)(n.Z,{size:18,className:"arrow-icon"})]}),(0,i.jsxs)("div",{className:"post-meta",children:[(0,i.jsx)("span",{className:"post-date",children:t.date}),(0,i.jsx)("span",{className:"dot",children:"•"}),(0,i.jsx)("span",{className:"read-time",children:t.readingTime})]})]})})})})};function d(e){let{posts:t}=e,[s,r]=(0,a.useState)(null),[n,d]=(0,a.useState)(!1),h=(0,a.useMemo)(()=>{let e=new Set;return t.forEach(t=>t.tags.forEach(t=>e.add(t))),Array.from(e)},[t]),m=(0,a.useMemo)(()=>[...t].sort((e,t)=>new Date(t.date)-new Date(e.date)),[t]),u=(0,a.useMemo)(()=>s?m.filter(e=>e.tags.includes(s)):m,[m,s]),g=n?u:u.slice(0,3),f=e=>{r(e===s?null:e),d(!1)};return(0,i.jsxs)("section",{className:"blog-list",children:[(0,i.jsx)("h2",{children:"Posts"}),(0,i.jsx)("div",{className:"tag-filter-container",children:(0,i.jsx)("div",{className:"tag-filter",children:h.map(e=>(0,i.jsx)("button",{onClick:()=>f(e),className:"tag ".concat(s===e?"selected":""),children:e},e))})}),(0,i.jsx)("ul",{className:"blog-list-items",children:g.map((e,t)=>(0,i.jsx)(o.E.li,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.15},className:"blog-item ".concat("development"===e.status?"development":""," ").concat(!n&&t>=Math.min(2,u.length-1)||n&&t===u.length-1?"last-item":""),children:(0,i.jsx)(l,{post:e})},e.slug))}),u.length>3&&(0,i.jsx)("div",{className:"show-more-container",children:(0,i.jsxs)("button",{onClick:()=>d(!n),className:"show-more-button","aria-label":n?"Show less posts":"Show more posts",children:[(0,i.jsx)("span",{className:"show-more-text",children:n?"Show Less":"Show More"}),(0,i.jsx)(c.Z,{size:16,className:"show-more-icon",style:{transform:n?"rotate(180deg)":"rotate(0deg)"}})]})})]})}},8124:function(e,t,s){"use strict";s.d(t,{default:function(){return g}});var i=s(7437),a=s(2265),r=s(2208),n=s(8997),c=s(5135),o=s(6595);let l=(0,s(3777).eI)("https://iksodfcuqkwlvhyymcjk.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrc29kZmN1cWt3bHZoeXltY2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTI1NjgsImV4cCI6MjA0NTc2ODU2OH0.0i2UYNHJfSR_eP88Cn0TDuxueDprBHkMTxNwLB73BYE");async function d(e){let{data:t,error:s}=await l.from("page_stats").select("views, likes").eq("id",e).single();return s&&"PGRST116"!==s.code?(console.error("Error fetching stats:",s),{views:0,likes:0}):t||{views:0,likes:0}}async function h(e,t){try{let{data:s}=await l.from("page_stats").select("*").eq("id",e).single();if(!s){let{data:s,error:i}=await l.from("page_stats").insert([{id:e,[t]:1,views:"views"===t?1:0,likes:"likes"===t?1:0}]).select().single();if(i)throw i;return s}let{data:i,error:a}=await l.from("page_stats").update({[t]:s[t]+1,updated_at:new Date().toISOString()}).eq("id",e).select().single();if(a)throw a;return i}catch(e){return console.error("Error incrementing stat:",e),null}}let m=()=>((0,a.useEffect)(()=>{let e=()=>{let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches,s=e||(t?"dark":"light");document.documentElement.setAttribute("data-theme",s),localStorage.setItem("theme",s);let i=document.querySelector('meta[name="theme-color"]');i&&(i.content="dark"===s?"#000000":"#ffffff")};e();let t=window.matchMedia("(prefers-color-scheme: dark)"),s=()=>{localStorage.getItem("theme")||e()};return t.addListener(s),()=>t.removeListener(s)},[]),null),u="https://github.com/dan10ish/dan10ish.github.io";var g=(0,a.memo)(e=>{let{blogSlug:t=null}=e,[s,g]=(0,a.useState)({views:0,likes:0}),[f,p]=(0,a.useState)(!1),[j,b]=(0,a.useState)(0),[x,k]=(0,a.useState)(!1),[w,v]=(0,a.useState)(!1),[N,S]=(0,a.useState)("light");(0,a.useEffect)(()=>{S(localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))},[]),(0,a.useEffect)(()=>{let e=t?"post-".concat(t):"home";if(t){let t="liked-".concat(e);p(!!sessionStorage.getItem(t))}let s=async()=>{try{let t=await d(e);g(t);let s="viewed-".concat(e,"-").concat(new Date().toDateString());if(!sessionStorage.getItem(s)){v(!0);let t=await h(e,"views");t&&(g(t),sessionStorage.setItem(s,"true")),v(!1)}}catch(e){console.error("Error initializing stats:",e),v(!1)}},i=function(e,t){let s=l.channel("stats-".concat(e)).on("postgres_changes",{event:"*",schema:"public",table:"page_stats",filter:"id=eq.".concat(e)},e=>{t(e.new)}).subscribe();return()=>{s.unsubscribe()}}(e,e=>{w||g(e)});return s(),()=>i()},[t,w]),(0,a.useEffect)(()=>{if(!t){let e=sessionStorage.getItem("github-stars"),t=sessionStorage.getItem("github-stars-time"),s=Date.now();if(e&&t&&s-parseInt(t)<36e5){b(parseInt(e));return}fetch("https://api.github.com/repos/dan10ish/dan10ish.github.io").then(e=>e.json()).then(e=>{(null==e?void 0:e.stargazers_count)&&(b(e.stargazers_count),sessionStorage.setItem("github-stars",e.stargazers_count.toString()),sessionStorage.setItem("github-stars-time",s.toString()))}).catch(console.error)}},[t]);let I=(0,a.useCallback)(async()=>{if(!f&&t&&!w)try{let e="post-".concat(t);v(!0),p(!0);let s=await h(e,"likes");s?(g(s),sessionStorage.setItem("liked-".concat(e),"true")):p(!1)}catch(e){console.error("Error liking post:",e),p(!1)}finally{v(!1)}},[t,f,w]),y=(0,a.useCallback)(e=>e?e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"k":e:0,[]),L=e=>{S(e),document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e);let t=document.querySelector('meta[name="theme-color"]');t&&(t.content="dark"===e?"#000000":"#ffffff")};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(m,{}),(0,i.jsx)("footer",{className:"footer",children:(0,i.jsxs)("div",{className:"footer-content",children:[(0,i.jsxs)("div",{className:"footer-row",children:[(0,i.jsxs)("div",{className:"stats-cards",children:[(0,i.jsxs)("div",{className:"stat-card views-card ".concat(w?"updating":""),title:"".concat(s.views," total visits"),children:[(0,i.jsx)(r.Z,{size:18}),(0,i.jsx)("span",{children:y(s.views)})]}),t&&(0,i.jsx)("div",{className:"stat-card likes-card ".concat(w?"updating":""),title:"".concat(s.likes," likes"),children:(0,i.jsxs)("button",{onClick:I,className:"like-button ".concat(f?"liked":""),disabled:f||w,"aria-label":f?"Already liked":"Like this post",children:[(0,i.jsx)(n.Z,{size:18,className:f?"fill-current":""}),(0,i.jsx)("span",{children:y(s.likes)})]})})]}),(0,i.jsx)("div",{className:"github-card-container",children:(0,i.jsxs)("a",{href:t?"".concat(u,"/blob/main/content/blog/").concat(t,".md"):u,target:"_blank",rel:"noopener noreferrer",className:"github-button",onMouseEnter:()=>k(!0),onMouseLeave:()=>k(!1),children:[(0,i.jsxs)("div",{className:"github-button-content",children:[(0,i.jsx)(c.Z,{size:16}),(0,i.jsx)("span",{children:t?"View Source":"View on GitHub"})]}),!t&&(0,i.jsxs)("div",{className:"github-stars",children:[(0,i.jsx)(o.Z,{size:16,className:x?"star-hover":""}),(0,i.jsx)("span",{children:j})]})]})})]}),(0,i.jsxs)("div",{className:"footer-row",children:[(0,i.jsxs)("div",{className:"copyright",children:["Copyright ",(0,i.jsx)("span",{className:"copyright-symbol",children:"\xa9"})," ",new Date().getFullYear()," Danish"]}),(0,i.jsxs)("div",{className:"theme-circles",children:[(0,i.jsx)("button",{onClick:()=>L("light"),className:"theme-circle ".concat("light"===N?"active":""),style:{background:"#ffffff"},"aria-label":"Light theme"}),(0,i.jsx)("button",{onClick:()=>L("dark"),className:"theme-circle ".concat("dark"===N?"active":""),style:{background:"#000000"},"aria-label":"Dark theme"})]})]})]})})]})})},8358:function(e,t,s){"use strict";s.d(t,{default:function(){return l}});var i=s(7437),a=s(2265);let r=[{title:"Pathfinder",description:"Visualize Dijkstra, A*, BFS & DFS on random generated mazes",sourceLink:"https://github.com/dan10ish/pathfinding-visualizer",projectLink:"https://dan10ish.github.io/pathfinding-visualizer/",tags:["web"]},{title:"3DOF Robotic Arm",description:"Math modelling of a yaw-pitch-pitch 3DOF robotic arm in C",sourceLink:"https://github.com/dan10ish/3DOF-RoboticArm-C",projectLink:null,tags:["robotics"]},{title:"Comment Toxicity",description:"Toxicity detection algorithm developed using deep learning",sourceLink:"https://github.com/dan10ish/CommentToxicity",projectLink:null,tags:["ml"]},{title:"Office",description:"3D website using r3f, framer-motion & Blender",sourceLink:"https://github.com/dan10ish/Office",projectLink:"https://dan10ish.github.io/Office/",tags:["web"]},{title:"Arm Visualizer",description:"3DOF robotic arm visualization using r3f, drei & framer-motion",sourceLink:"https://github.com/dan10ish/RoboticArm",projectLink:"https://dan10ish.github.io/RoboticArm/",tags:["robotics"]},{title:"Personal Website",description:"This website with project showcase and blog functionality",sourceLink:"https://github.com/dan10ish/dan10ish.github.io",projectLink:"https://dan10ish.github.io",tags:["web"]}];var n=s(9202),c=s(5135);let o=e=>{let{project:t,isFiltered:s}=e;return(0,i.jsxs)("div",{className:"project-row ".concat(s?"filtered":""),children:[(0,i.jsx)("div",{className:"project-title",children:t.title}),(0,i.jsxs)("div",{className:"project-meta",children:[(0,i.jsx)("div",{className:"project-tag",children:t.tags[0]}),(0,i.jsxs)("div",{className:"project-links",children:[t.projectLink&&(0,i.jsx)("a",{href:t.projectLink,target:"_blank",rel:"noopener noreferrer",className:"project-link","aria-label":"View live project",style:{willChange:"transform"},children:(0,i.jsx)(n.Z,{size:20})}),t.sourceLink&&(0,i.jsx)("a",{href:t.sourceLink,target:"_blank",rel:"noopener noreferrer",className:"project-link","aria-label":"View source code",style:{willChange:"transform"},children:(0,i.jsx)(c.Z,{size:20})})]})]})]})};var l=()=>{let[e,t]=(0,a.useState)(null),s=(0,a.useMemo)(()=>{let e=new Set;return r.forEach(t=>t.tags.forEach(t=>e.add(t))),Array.from(e)},[r]),n=s=>{t(s===e?null:s)};return(0,i.jsxs)("section",{className:"projects-section",children:[(0,i.jsx)("h2",{children:"Projects"}),(0,i.jsx)("div",{className:"tag-filter-container",children:(0,i.jsx)("div",{className:"tag-filter",children:s.map(t=>(0,i.jsx)("button",{onClick:()=>n(t),className:"tag ".concat(e===t?"selected":""),children:t},t))})}),(0,i.jsx)("div",{className:"projects-table",children:r.map((t,s)=>(0,i.jsx)(o,{project:t,isFiltered:e&&!t.tags.includes(e)},"".concat(t.title,"-").concat(s)))})]})}}},function(e){e.O(0,[323,648,170,971,117,744],function(){return e(e.s=3529)}),_N_E=e.O()}]);