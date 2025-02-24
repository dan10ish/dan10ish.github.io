"use client";

import { useEffect, useRef, useCallback } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const LatexRenderer = ({ content }) => {
  const containerRef = useRef(null);

  const renderLatexInElement = useCallback((element, displayMode = false) => {
    if (element.classList.contains("katex-rendered")) return;
    
    try {
      katex.render(element.textContent, element, {
        displayMode,
        throwOnError: false,
        trust: true,
        strict: false,
        output: "html"
      });
      element.classList.add("katex-rendered");
    } catch (err) {
      console.warn("Math rendering error:", err);
    }
  }, []);

  const processLatex = useCallback(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      ".math-display:not(.katex-rendered), .math:not(.math-display):not(.katex-rendered)"
    );

    requestAnimationFrame(() => {
      elements.forEach(elem => 
        renderLatexInElement(elem, elem.classList.contains("math-display"))
      );
    });
  }, [renderLatexInElement]);

  useEffect(() => {
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            processLatex();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [content, processLatex]);

  return (
    <div
      ref={containerRef}
      className="latex-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default LatexRenderer;
