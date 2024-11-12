"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js";

const CodeTab = memo(({ language, isActive, onClick }) => (
  <button className={`code-tab ${isActive ? "active" : ""}`} onClick={onClick}>
    {language}
  </button>
));
CodeTab.displayName = "CodeTab";

const CodeContent = memo(({ code, language, isActive }) => {
  useEffect(() => {
    if (isActive) {
      const codeElement = document.getElementById(`code-${language}`);
      if (codeElement) {
        hljs.highlightElement(codeElement);
      }
    }
  }, [isActive, language]);

  if (!isActive) return null;

  return (
    <pre className="code-tab-content">
      <code id={`code-${language}`} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
});
CodeContent.displayName = "CodeContent";

const CopyButton = memo(({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [code]);

  return (
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
  );
});
CopyButton.displayName = "CopyButton";

const TabsCodeBlock = memo(({ blocks }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="code-block-container tabs-code-container">
      <div className="tabs-code-header">
        <div className="code-tabs">
          {blocks.map((block, index) => (
            <CodeTab
              key={block.language}
              language={block.language}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        <CopyButton code={blocks[activeTab].code} />
      </div>
      <div className="tabs-code-content">
        {blocks.map((block, index) => (
          <CodeContent
            key={block.language}
            code={block.code}
            language={block.language}
            isActive={activeTab === index}
          />
        ))}
      </div>
    </div>
  );
});

TabsCodeBlock.displayName = "TabsCodeBlock";

export default TabsCodeBlock;
