"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Copy, Check } from "lucide-react";

export default function BlogPostClient({ frontmatter, compiledSource }) {
    const contentRef = useRef(null);
    const [Content, setContent] = useState(null);

    useEffect(() => {
        async function loadContent() {
            try {
                const { run } = await import("@mdx-js/mdx");
                const { jsx, jsxs, Fragment } = await import("react/jsx-runtime");

                const mod = await run(compiledSource, {
                    jsx,
                    jsxs,
                    Fragment,
                    baseUrl: import.meta.url,
                });

                setContent(() => mod.default);
            } catch (err) {
                console.error("MDX render error:", err);
            }
        }
        loadContent();
    }, [compiledSource]);

    useEffect(() => {
        if (!contentRef.current) return;

        const timer = setTimeout(() => {
            const pres = contentRef.current.querySelectorAll("pre");
            pres.forEach((pre) => {
                if (pre.querySelector(".blog-copy-btn")) return;
                const code = pre.querySelector("code");
                if (!code) return;

                pre.className = (pre.className || "") + " relative group rounded-lg overflow-hidden my-6 border border-foreground/10 bg-foreground/[0.03] p-4";
                
                const btn = document.createElement("button");
                btn.className = "absolute top-3 right-3 p-2 rounded-md bg-foreground/10 text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground/20 active:scale-95";
                btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
                
                btn.onclick = () => {
                    navigator.clipboard.writeText(code.textContent);
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                    setTimeout(() => {
                        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
                    }, 2000);
                };
                pre.appendChild(btn);
            });
        }, 200);

        return () => clearTimeout(timer);
    }, [Content]);

    const formattedDate = frontmatter.date
        ? new Date(frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    return (
        <div className="max-w-750 mx-auto px-1 sm:px-2 py-4">
            <header className="mb-8 px-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                    {frontmatter.title}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                    {formattedDate && (
                        <time dateTime={frontmatter.date} className="text-foreground/40 text-[0.9rem]">
                            {formattedDate}
                        </time>
                    )}
                    {frontmatter.tags?.length > 0 && (
                        <div className="flex gap-2">
                            {frontmatter.tags.map((tag) => (
                                <span key={tag} className="text-[0.8rem] px-2 py-0.5 rounded border border-foreground/10 text-foreground/60 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="relative">
                <article className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 selection:bg-foreground/10" ref={contentRef}>
                    <div className="blog-content-container [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>li]:mb-1 [&>blockquote]:border-l-2 [&>blockquote]:border-foreground/10 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>pre]:no-scrollbar [&>code]:bg-foreground/5 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[0.9em] [&>pre>code]:bg-transparent [&>pre>code]:p-0">
                        {Content ? <Content /> : <div className="text-foreground/40 py-4 animate-pulse">Loading…</div>}
                    </div>
                </article>
            </div>
        </div>
    );
}
