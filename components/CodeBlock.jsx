"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js";

const CodeBlock = ({ code, language, filename }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    if (code && language) {
      const highlighted = hljs.highlight(code, { language }).value;
      setHighlightedCode(highlighted);
    }
  }, [code, language]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy code:", err);
    }
  }, [code]);

  return (
    <div className="code-block-container">
      {(language || filename) && (
        <div className="code-block-header">
          {filename && <span className="code-filename">{filename}</span>}
          {language && <span className="code-language">{language}</span>}
          <button
            onClick={copyToClipboard}
            className="copy-code-button"
            aria-label="Copy code"
          >
            {isCopied ? (
              <Check className="copy-icon" size={16} />
            ) : (
              <Copy className="copy-icon" size={16} />
            )}
          </button>
        </div>
      )}
      <pre>
        <code
          className={`hljs ${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock; 