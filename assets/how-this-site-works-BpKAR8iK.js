import{j as e}from"./main-CJFvxI4G.js";const t=()=>e.jsxs("nav",{children:[e.jsx("h2",{children:"Table of Contents"}),e.jsxs("ul",{children:[e.jsx("li",{style:{marginLeft:"20px"},children:e.jsx("a",{href:"#why-this-design?",children:"Why This Design?"})}),e.jsx("li",{style:{marginLeft:"20px"},children:e.jsx("a",{href:"#how-i-built-this-site",children:"How I Built This Site"})}),e.jsx("li",{style:{marginLeft:"40px"},children:e.jsx("a",{href:"#the-stack",children:"The Stack"})}),e.jsx("li",{style:{marginLeft:"60px"},children:e.jsx("a",{href:"#tools",children:"Tools"})}),e.jsx("li",{style:{marginLeft:"60px"},children:e.jsx("a",{href:"#hosting",children:"Hosting"})}),e.jsx("li",{style:{marginLeft:"40px"},children:e.jsx("a",{href:"#features",children:"Features"})}),e.jsx("li",{style:{marginLeft:"60px"},children:e.jsx("a",{href:"#blog",children:"Blog"})}),e.jsx("li",{style:{marginLeft:"60px"},children:e.jsx("a",{href:"#projects",children:"Projects"})}),e.jsx("li",{style:{marginLeft:"60px"},children:e.jsx("a",{href:"#source-code",children:"Source Code"})}),e.jsx("li",{style:{marginLeft:"20px"},children:e.jsx("a",{href:"#future",children:"Future"})}),e.jsx("li",{style:{marginLeft:"20px"},children:e.jsx("a",{href:"#conclusion",children:"Conclusion"})})]})]});function n(){return e.jsxs("div",{className:"blog-post",children:[e.jsx("h1",{children:"undefined"}),e.jsx("p",{children:"Date: undefined"}),e.jsx(t,{}),e.jsx("div",{dangerouslySetInnerHTML:{__html:`<p>Once again, as I tend to do very often, I&#39;ve gone and rebuilt my website. It&#39;s something I tinker with every now and then to improve my web presence or sometimes just to freshen up the look and feel. This time around, it&#39;s a pretty big redesign with <strong>minimalism</strong> as the main focus while optimizing performance of the website. The hope here is that this will be the last significant update to my website for a long time.</p>
<h2>Why This Design?</h2>
<p>You can never go wrong with a classic serif font and solarized background. I feel it&#39;s timeless and less distracting for the viewer.</p>
<p>I want my website to provide information straight to the point and avoid clutter. I also aimed for easy navigation.</p>
<p>The challenge I wanted to tackle with this website is maintaining features (like the blog, project links, etc.) while keeping it <em>minimalist</em>. I believe I&#39;ve done a decent job here.</p>
<h2>How I Built This Site</h2>
<h3>The Stack</h3>
<p><code>React</code> using <code>Vite</code> and <code>CSS</code>.. Not complicated, just opinionated.</p>
<h4>Tools</h4>
<p>Posts are all presented in <code>markdown</code> files and rendered with custom styling using the <code>react-markdown</code> library. Each article has its own file, and images are rendered within the articles.</p>
<h4>Hosting</h4>
<p>Hosted on <code>GitHub Pages</code> because of my familiarity with it. It&#39;s mainly for ease of bug fixing and publishing new articles.</p>
<h3>Features</h3>
<h4>Blog</h4>
<p>A metadata file assigns a slug to each article, located in the <code>data</code> folder. Each article&#39;s metadata includes details such as title, date, filename, and tags, facilitating a seamless workflow for writing and updating blogs in markdown.</p>
<p>The metadata file looks something like this:</p>
<pre><code class="language-js">{
    id: 1,
    type: &quot;blog&quot;,
    title: &quot;How this site works&quot;,
    date: &quot;2024-07-15&quot;,
    fileName: &quot;file name&quot;,
    tags: [&quot;Site&quot;],
  }
</code></pre>
<p>This structure minimizes friction in my workflow, allowing me to focus more on content creation.</p>
<h4>Projects</h4>
<p>Perhaps the sites I want to get the most reach on. Projects have their own standalone front-end static webpages, which are linked accordingly.</p>
<h4>Source Code</h4>
<p>Find it <a href="https://github.com/dan10ish/dan10ish.github.io">here</a>.</p>
<h2>Future</h2>
<p>I will be adding standalone pages to display collective photos I have taken from various locations.</p>
<p>The plan is integrate this also in the list in the <a href="https://dan10ish.github.io">homepage</a>.</p>
<p>The photos will maintain their aspect ratio and be displayed in the form of a responsive grid.</p>
<h2>Conclusion</h2>
<p>I explored various ways to facilitate more flexible online writing and ultimately decided to do it in my own way.</p>
<p>That said, there&#39;s still much work to be done to improve both the technical and content aspects of this site. Feel free to DM me on <a href="https://x.com/dan10ish">X</a> for a quick feedback.</p>
`}})]})}export{n as default};
