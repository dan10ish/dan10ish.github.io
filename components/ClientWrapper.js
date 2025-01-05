"use client";

import HighlightCode from "@/components/HighlightCode";
import LatexRenderer from "@/components/LatexRenderer";

export function MDXContent({ content }) {
  return (
    <>
      <div className="latex-content">
        <LatexRenderer content={content} />
      </div>
      <HighlightCode />
    </>
  );
}
