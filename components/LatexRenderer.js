"use client";

import React, { useEffect, useRef } from "react";
import katex from "katex";

const LatexRenderer = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const mathElements = containerRef.current.querySelectorAll(
        ".math:not(.katex-rendered)"
      );
      mathElements.forEach((elem) => {
        const isDisplay = elem.classList.contains("math-display");
        const latex = elem.textContent;
        katex.render(latex, elem, {
          displayMode: isDisplay,
          throwOnError: false,
          output: "html",
        });
        elem.classList.add("katex-rendered");
      });
    }
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="latex-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default LatexRenderer;
