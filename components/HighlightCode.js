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
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import bash from "highlight.js/lib/languages/bash";
import plaintext from "highlight.js/lib/languages/plaintext";

const CopyButton = dynamic(() => import("./CopyButton"), { ssr: false });
const TabsCodeBlock = dynamic(() => import("./TabsCodeBlock"), { ssr: false });

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("txt", plaintext);

export default function HighlightCode() {
  useEffect(() => {
    hljs.configure({ ignoreUnescapedHTML: true });

    document
      .querySelectorAll(
        "pre:not(.code-tab-0):not(.code-tab-1):not(.code-tab-2)",
      )
      .forEach((pre) => {
        if (pre.parentElement?.classList.contains("code-block-container"))
          return;

        const code = pre.querySelector("code");
        if (!code) return;

        if (!code.className) {
          code.className = "language-plaintext";
        }

        if (
          code.className.includes("language-bash") ||
          code.className.includes("language-sh")
        ) {
          code.className = "language-bash";
        }

        const codeText = code.innerText.trim();
        if (codeText.includes("\n")) {
          const container = document.createElement("div");
          container.className = "code-block-container";

          const header = document.createElement("div");
          header.className = "code-block-header";

          const language =
            code.className.match(/language-(\w+)/)?.[1] || "text";
          header.innerHTML = `<span class="code-language">${language}</span>`;

          const buttonContainer = document.createElement("div");
          buttonContainer.id = `copy-${Math.random().toString(36).slice(2)}`;
          header.appendChild(buttonContainer);

          pre.parentNode.insertBefore(container, pre);
          container.appendChild(header);
          container.appendChild(pre);

          hljs.highlightElement(code);

          require("react-dom/client")
            .createRoot(buttonContainer)
            .render(<CopyButton code={codeText} />);
        }
      });

    document.querySelectorAll(".tabs-code-block").forEach((element) => {
      if (element.dataset.processed) return;
      try {
        const blocks = JSON.parse(element.dataset.blocks);
        require("react-dom/client")
          .createRoot(element)
          .render(<TabsCodeBlock blocks={blocks} />);
        element.dataset.processed = "true";
      } catch (error) {
        console.error("Failed to process code block:", error);
      }
    });
  }, []);

  return null;
}
