"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js";

const TabsCodeBlock = ({ blocks }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Highlight all code blocks initially and after tab change
    document.querySelectorAll(".tabs-code-content code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [activeTab]);

  const copyToClipboard = async () => {
    const code = blocks[activeTab].code;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="code-block-container tabs-code-container">
      <div className="tabs-code-header">
        <div className="code-tabs">
          {blocks.map((block, index) => (
            <button
              key={block.language}
              className={`code-tab ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {block.language}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="copy-code-button"
          aria-label={copied ? "Copied!" : "Copy code"}
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <Check className="copy-icon" strokeWidth={2.5} />
          ) : (
            <Copy className="copy-icon" strokeWidth={2.5} />
          )}
        </button>
      </div>
      <div className="tabs-code-content">
        {blocks.map((block, index) => (
          <pre
            key={block.language}
            style={{ display: activeTab === index ? "block" : "none" }}
            className="code-tab-content"
          >
            <code className={`language-${block.language}`}>{block.code}</code>
          </pre>
        ))}
      </div>
    </div>
  );
};

export default TabsCodeBlock;
