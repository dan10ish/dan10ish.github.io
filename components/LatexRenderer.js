"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const LatexRenderer = ({ content }) => {
  const containerRef = useRef(null);

  const renderLatexInElement = (element, displayMode = false) => {
    try {
      katex.render(element.textContent, element, {
        displayMode,
        throwOnError: false,
        trust: true,
        strict: false,
      });
      element.classList.add("katex-rendered");
    } catch (err) {
      console.warn("Math rendering error:", err);
    }
  };

  const processTableCells = () => {
    const tableCells = containerRef.current.querySelectorAll("td, th");
    tableCells.forEach((cell) => {
      if (cell.classList.contains("processed-latex")) return;

      const mathElements = cell.querySelectorAll(".math, .math-display");
      mathElements.forEach((elem) => {
        if (!elem.classList.contains("katex-rendered")) {
          renderLatexInElement(elem, elem.classList.contains("math-display"));
        }
      });

      const textNodes = Array.from(cell.childNodes).filter(
        (node) =>
          node.nodeType === Node.TEXT_NODE && node.textContent.includes("$"),
      );

      textNodes.forEach((node) => {
        const content = node.textContent;
        if (content.match(/\$.*\$/)) {
          const span = document.createElement("span");
          span.className = "math";
          span.textContent = content.replace(/\$(.*?)\$/, "$1");
          node.parentNode.replaceChild(span, node);
          renderLatexInElement(span, false);
        }
      });

      cell.classList.add("processed-latex");
    });
  };

  useEffect(() => {
    if (!containerRef.current || !content) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasCodeBlock = addedNodes.some(
            (node) =>
              node.querySelector?.("pre code") ||
              node.nodeName === "PRE" ||
              node.nodeName === "CODE",
          );
          if (hasCodeBlock) return;
        }
      });
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    try {
      const blockMathElements = containerRef.current.querySelectorAll(
        ".math-display:not(.katex-rendered)",
      );
      blockMathElements.forEach((elem) => renderLatexInElement(elem, true));

      const inlineMathElements = containerRef.current.querySelectorAll(
        ".math:not(.math-display):not(.katex-rendered)",
      );
      inlineMathElements.forEach((elem) => renderLatexInElement(elem, false));

      processTableCells();

      const links = containerRef.current.querySelectorAll(
        "a:not([data-processed])",
      );
      links.forEach((link) => {
        if (!link.getAttribute("href")?.startsWith("#")) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
        link.setAttribute("data-processed", "true");
      });
    } catch (err) {
      console.warn("LatexRenderer error:", err);
    }

    return () => observer.disconnect();
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
