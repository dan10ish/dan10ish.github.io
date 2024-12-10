"use client";

import React, { useEffect, useRef } from "react";
import katex from "katex";

const LatexRenderer = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window || !containerRef.current) return;

    try {
      const mathElements = containerRef.current.querySelectorAll(
        ".math:not(.katex-rendered)"
      );

      mathElements.forEach((elem) => {
        try {
          const isDisplay = elem.classList.contains("math-display");
          const latex = elem.textContent;

          if (latex) {
            katex.render(latex, elem, {
              displayMode: isDisplay,
              throwOnError: false,
              output: "html",
              trust: true,
            });
            elem.classList.add("katex-rendered");
          }
        } catch (err) {
          console.warn("KaTeX rendering error:", err);
        }
      });

      const links = containerRef.current.querySelectorAll("a");
      links.forEach((link) => {
        if (link.getAttribute("href")?.startsWith("#")) return;
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    } catch (err) {
      console.warn("LatexRenderer error:", err);
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

export default LatexRenderer;
