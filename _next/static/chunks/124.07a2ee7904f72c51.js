"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[124],{9124:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(5155),o=r(3816),a=r(7558),i=r(2115),l=r(3264);let s=`
  attribute float charIndex;
  attribute float opacity;
  attribute vec3 offset;
  
  varying float vCharIndex;
  varying float vOpacity;
  varying float vDistance;
  
  void main() {
    vCharIndex = charIndex;
    vOpacity = opacity;
    
    vec3 pos = position + offset;
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    vDistance = length(viewPosition.xyz);
    gl_Position = projectedPosition;
    gl_PointSize = (18.0 / vDistance) * (1.0 + opacity * 0.7);
  }
`,c=`
  varying float vCharIndex;
  varying float vOpacity;
  varying float vDistance;
  
  uniform vec3 themeColor;
  uniform float time;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
    
    float twinkle = 0.7 + 0.3 * sin(time * 2.0 + vCharIndex * 15.0);
    alpha *= vOpacity * twinkle;
    
    vec3 color = themeColor;
    if (vCharIndex > 4.5) color *= 1.4;
    else if (vCharIndex > 3.5) color *= 1.2;
    else if (vCharIndex > 2.5) color *= 1.0;
    else if (vCharIndex > 1.5) color *= 0.8;
    else color *= 0.6;
    
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;function u(){let e=(0,i.useRef)(null),t=(0,i.useRef)(null),r=(0,i.useRef)(null),[a,u]=(0,i.useState)(!1),[v,d]=(0,i.useState)(0),[f,p]=(0,i.useState)(0),[m,h]=(0,i.useState)(new l.Q1f("#666666")),{gl:y,size:g}=(0,o.A)();(0,i.useEffect)(()=>{let e=()=>{let e=getComputedStyle(document.documentElement).getPropertyValue("--secondary").trim();h(new l.Q1f(e||"#666666"))};e();let t=new MutationObserver(e);return t.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>t.disconnect()},[]);let{geometry:w}=(0,i.useMemo)(()=>{let e=new l.LoY,t=new Float32Array(1500),r=new Float32Array(500),n=new Float32Array(500),o=new Float32Array(1500);for(let e=0;e<500;e++){let a=Math.pow(Math.random(),.7),i=3.85*a,l=e%4/4*Math.PI*2+a*Math.PI*3.5+(Math.random()-.5)*.3,s=Math.cos(l)*i,c=Math.sin(l)*i,u=(Math.random()-.5)*.3*(1-.8*a);t[3*e]=0,t[3*e+1]=0,t[3*e+2]=0,o[3*e]=s,o[3*e+1]=u,o[3*e+2]=c,r[e]=Math.floor(5*Math.random()),n[e]=.4+.6*a}return e.setAttribute("position",new l.THS(t,3)),e.setAttribute("offset",new l.THS(o,3)),e.setAttribute("charIndex",new l.THS(r,1)),e.setAttribute("opacity",new l.THS(n,1)),{geometry:e}},[]),x=(0,i.useMemo)(()=>new l.BKk({vertexShader:s,fragmentShader:c,uniforms:{themeColor:{value:m},time:{value:0}},transparent:!0,blending:l.EZo,depthWrite:!1}),[m]);return(0,i.useEffect)(()=>{t.current&&(t.current.uniforms.themeColor.value=m)},[m]),(0,i.useEffect)(()=>{let e=y.domElement,t=t=>{u(!0),p(t.clientX),e.setPointerCapture(t.pointerId),t.preventDefault()},r=e=>{if(!a)return;let t=e.clientX-f;d(e=>e+.005*t),p(e.clientX),e.preventDefault()},n=t=>{u(!1),e.releasePointerCapture(t.pointerId),t.preventDefault()},o=()=>{u(!1)};return e.addEventListener("pointerdown",t),e.addEventListener("pointermove",r),e.addEventListener("pointerup",n),e.addEventListener("pointerleave",o),e.style.touchAction="none",()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("pointermove",r),e.removeEventListener("pointerup",n),e.removeEventListener("pointerleave",o),e.style.touchAction="auto"}},[y.domElement,a,f]),(0,o.C)(e=>{if(t.current&&(t.current.uniforms.time.value=e.clock.elapsedTime),r.current){a?r.current.rotation.y=v:r.current.rotation.y+=.003;let t=.02*Math.sin(.4*e.clock.elapsedTime)+1;r.current.scale.setScalar(t)}}),(0,n.jsx)("group",{ref:r,rotation:[-Math.PI/6,0,0],children:(0,n.jsx)("points",{ref:e,geometry:w,material:x})})}function v(){return(0,n.jsx)("div",{className:"w-full h-24 relative overflow-hidden my-2 select-none",children:(0,n.jsx)(a.Hl,{camera:{position:[0,2.2,6],fov:35},style:{background:"transparent",width:"100%",height:"100%",cursor:"grab"},dpr:[1,1.5],performance:{min:.9},gl:{antialias:!1,powerPreference:"high-performance",alpha:!0},onPointerDown:e=>{e.target.style.cursor="grabbing"},onPointerUp:e=>{e.target.style.cursor="grab"},children:(0,n.jsx)(u,{})})})}}}]);