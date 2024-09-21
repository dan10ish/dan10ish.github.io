import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Nav from "../components/Nav";
import "katex/dist/katex.min.css";
import useScrollDirection from "../hooks/useScrollDirection";
import ScrollToTop from "../components/ScrollToTop";

// Import languages
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust";

// Register languages
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("rust", rust);

const TableOfContents = React.memo(({ headings }) => {
  const contentHeadings = headings.slice(1);
  if (contentHeadings.length === 0) return null;

  return (
    <nav className="table-of-contents">
      <div className="table-heading">Table of Contents</div>
      <ul>
        {contentHeadings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
  </div>
);

const CodeBlock = React.memo(
  ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneLight}
        language={match[1]}
        PreTag="div"
        className="syntax-highlighter"
        useInlineStyles={false}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
);

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function BlogPost() {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const scrollDirection = useScrollDirection();

  const post = useMemo(
    () => data.find((post) => post.fileName === fileName),
    [fileName]
  );

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setIsLoading(true);
        const res = await import(`../blog-posts/${fileName}.md`);
        const response = await fetch(res.default);
        if (!response.ok) throw new Error("Failed to fetch markdown");
        const text = await response.text();
        setContent(text);
        setReadingTime(calculateReadingTime(text));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [fileName]);

  useEffect(() => {
    if (!content) return;

    const extractHeadings = () => {
      const headingElements = document.querySelectorAll(
        ".blog h1, .blog h2, .blog h3, .blog h4, .blog h5, .blog h6"
      );
      const extractedHeadings = Array.from(headingElements).map((heading) => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName[1]),
      }));
      setHeadings(extractedHeadings);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    extractHeadings();

    document
      .querySelectorAll(
        ".blog h1, .blog h2, .blog h3, .blog h4, .blog h5, .blog h6"
      )
      .forEach((heading) => {
        observer.observe(heading);
      });

    return () => observer.disconnect();
  }, [content]);

  if (error) {
    return (
      <div className="blog-post">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="return-home">
        <Nav isVisible={scrollDirection === "up"} />
      </div>
      <div className="blog">
        <div className="blog-meta">
          {post && <h1>{post.title}</h1>}
          <div className="reading-time">
            Reading time: {readingTime} minute{readingTime !== 1 ? "s" : ""}
          </div>
        </div>
        {!isLoading && <TableOfContents headings={headings} />}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeSlug, rehypeAutolinkHeadings]}
            components={{
              code: CodeBlock,
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          />
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
