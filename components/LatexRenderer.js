"use client";

import React, { useEffect, useRef } from "react";

const LatexRenderer = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderLatex = () => {
      if (!containerRef.current || !window.katex) return;

      const mathElements = containerRef.current.querySelectorAll(
        ".math:not(.katex-rendered)",
      );

      mathElements.forEach((elem) => {
        try {
          const isDisplay = elem.classList.contains("math-display");
          const latex = elem.textContent.trim();

          if (latex) {
            window.katex.render(latex, elem, {
              displayMode: isDisplay,
              throwOnError: false,
              output: "html",
              strict: (errorCode) =>
                errorCode === "unknownSymbol" ? "ignore" : "warn",
            });
            elem.classList.add("katex-rendered");
          }
        } catch (err) {
          console.warn("KaTeX rendering error:", err);
        }
      });
    };

    if (content) {
      renderLatex();
    }
  }, [content]);

  if (!content) return null;

  return (
    <div
      ref={containerRef}
      className="latex-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default React.memo(LatexRenderer);
