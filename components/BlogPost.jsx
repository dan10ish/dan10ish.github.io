"use client";

import { useState, useEffect, useRef, memo } from "react";
import { ArrowUp, Home } from "lucide-react";
import Link from "next/link";

const ScrollToTop = memo(() => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setShow(window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!show) return null;

    return (
        <button
            className="blog-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
        >
            <ArrowUp size={18} />
        </button>
    );
});

ScrollToTop.displayName = "ScrollToTop";

const HomeLink = memo(() => (
    <Link href="/" className="blog-home-link" aria-label="Home">
        <Home size={16} />
        <span>Home</span>
    </Link>
));

HomeLink.displayName = "HomeLink";



function CopyButton({ code }) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            className="blog-copy-btn"
            onClick={() => {
                navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
        >
            {copied ? "copied" : "copy"}
        </button>
    );
}

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
                const btn = document.createElement("button");
                btn.className = "blog-copy-btn";
                btn.textContent = "copy";
                btn.onclick = () => {
                    navigator.clipboard.writeText(code.textContent);
                    btn.textContent = "copied";
                    setTimeout(() => (btn.textContent = "copy"), 2000);
                };
                pre.style.position = "relative";
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
        <div className="blog-post-layout">
            <header className="blog-post-header">
                <HomeLink />
                <h1>{frontmatter.title}</h1>
                <div className="blog-post-meta">
                    {formattedDate && <time dateTime={frontmatter.date}>{formattedDate}</time>}
                    {frontmatter.tags?.length > 0 && (
                        <div className="blog-post-tags">
                            {frontmatter.tags.map((tag) => (
                                <span key={tag} className="blog-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="blog-post-body">
                <article className="blog-content" ref={contentRef}>
                    {Content ? <Content /> : <div className="blog-loading">Loading…</div>}
                </article>
            </div>

            <ScrollToTop />
        </div>
    );
}
