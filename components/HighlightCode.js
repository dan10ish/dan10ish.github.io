"use client";

import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import dynamic from "next/dynamic";

import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import markdown from "highlight.js/lib/languages/markdown";
import csharp from "highlight.js/lib/languages/csharp";
import lua from "highlight.js/lib/languages/lua";
import java from "highlight.js/lib/languages/java";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";

const CopyButton = dynamic(() => import("./CopyButton"), { ssr: false });

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("lua", lua);
hljs.registerLanguage("java", java);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("typescript", typescript);

export default function HighlightCode() {
  useEffect(() => {
    hljs.configure({ ignoreUnescapedHTML: true });
    hljs.highlightAll();

    const codeBlocks = document.querySelectorAll("pre");
    codeBlocks.forEach((pre) => {
      if (pre.querySelector(".copy-code-button")) return;

      const code = pre.querySelector("code");
      if (!code) return;

      const codeText = code.innerText.trim();
      const lineCount = codeText.split("\n").length;

      if (lineCount > 1) {
        const root = document.createElement("div");
        root.setAttribute(
          "id",
          `copy-button-${Math.random().toString(36).substr(2, 9)}`
        );
        pre.appendChild(root);

        const ReactDOMClient = require("react-dom/client");
        ReactDOMClient.createRoot(root).render(<CopyButton code={codeText} />);
      }
    });
  }, []);

  return null;
}
