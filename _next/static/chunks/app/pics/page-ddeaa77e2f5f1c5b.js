(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[216],{4318:function(e,t,n){Promise.resolve().then(n.bind(n,7186)),Promise.resolve().then(n.bind(n,1557))},7186:function(e,t,n){"use strict";n.d(t,{default:function(){return d}});var r=n(7437),o=n(2265);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}class a extends o.Component{constructor(e){let t;super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this),t=this.props.breakpointCols&&this.props.breakpointCols.default?this.props.breakpointCols.default:parseInt(this.props.breakpointCols)||2,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){if(!window||!window.requestAnimationFrame){this.reCalculateColumnCount();return}window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame(()=>{this.reCalculateColumnCount()})}reCalculateColumnCount(){let e=window&&window.innerWidth||1/0,t=this.props.breakpointCols;"object"!=typeof t&&(t={default:parseInt(t)||2});let n=1/0,r=t.default||2;for(let o in t){let l=parseInt(o);l>0&&e<=l&&l<n&&(n=l,r=t[o])}r=Math.max(1,parseInt(r)||1),this.state.columnCount!==r&&this.setState({columnCount:r})}itemsInColumns(){let e=this.state.columnCount,t=Array(e),n=o.Children.toArray(this.props.children);for(let r=0;r<n.length;r++){let o=r%e;t[o]||(t[o]=[]),t[o].push(n[r])}return t}renderColumns(){let{column:e,columnAttrs:t={},columnClassName:n}=this.props,r=this.itemsInColumns(),i=`${100/r.length}%`,a=n;a&&"string"!=typeof a&&(this.logDeprecated('The property "columnClassName" requires a string'),void 0===a&&(a="my-masonry-grid_column"));let u=s(s(s({},e),t),{},{style:s(s({},t.style),{},{width:i}),className:a});return r.map((e,t)=>o.createElement("div",l({},u,{key:t}),e))}logDeprecated(e){console.error("[Masonry]",e)}render(){let e=this.props,{children:t,breakpointCols:n,columnClassName:r,columnAttrs:i,column:s,className:a}=e,u=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]),c=a;return"string"!=typeof a&&(this.logDeprecated('The property "className" requires a string'),void 0===a&&(c="my-masonry-grid")),o.createElement("div",l({},u,{className:c}),this.renderColumns())}}a.defaultProps={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0};var u=n(3145);let c=o.forwardRef((e,t)=>{let{images:n}=e;return(0,r.jsxs)("section",{className:"pictures-section",ref:t,children:[(0,r.jsx)("h1",{children:"Pictures"}),(0,r.jsx)(a,{breakpointCols:{default:3,1200:3,768:2,480:2},className:"masonry-container",columnClassName:"masonry-item",children:n.map((e,t)=>(0,r.jsx)("div",{children:(0,r.jsx)(u.default,{src:"/images/".concat(e),alt:"Image ".concat(t+1),width:300,height:300,loading:"lazy",placeholder:"blur",blurDataURL:"/images/".concat(e,"?w=40&q=10"),style:{borderRadius:"var(--border-radius)"}})},t))})]})});c.displayName="PicturesSection";var d=c},1557:function(e,t,n){"use strict";n.d(t,{default:function(){return l}});var r=n(7437),o=n(2265);function l(){let[e,t]=(0,o.useState)(!1),[n,l]=(0,o.useState)(!1),i=0;return((0,o.useEffect)(()=>{let e=()=>{let e=window.scrollY;e>300?(t(!0),l(e>i)):t(!1),i=e};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]),e)?(0,r.jsx)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"scroll-to-top ".concat(n?"hidden":""),"aria-label":"Scroll to top",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"18 15 12 9 6 15"})})}):null}},5523:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return r}});let r=n(7043)._(n(2265)).default.createContext(null)}},function(e){e.O(0,[145,971,117,744],function(){return e(e.s=4318)}),_N_E=e.O()}]);