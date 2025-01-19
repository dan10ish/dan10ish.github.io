import React, { useState, useCallback } from "react";
import { Check, ClipboardCopy } from "lucide-react";

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
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
  }, [code]);

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className="copy-code-button"
      aria-label={copied ? "Copied!" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="copy-icon" strokeWidth={2.5} />
      ) : (
        <ClipboardCopy className="copy-icon" strokeWidth={2} />
      )}
    </button>
  );
};

export default CopyButton;
