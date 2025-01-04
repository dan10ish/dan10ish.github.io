"use client";

import dynamic from "next/dynamic";

const HighlightCode = dynamic(() => import("@/components/HighlightCode"), {
  ssr: false,
});

const LatexRenderer = dynamic(() => import("@/components/LatexRenderer"), {
  ssr: false,
});

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
