import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Nav from "../components/Nav";
import "katex/dist/katex.min.css";
import useScrollDirection from "../hooks/useScrollDirection";
import ScrollToTop from "../components/ScrollToTop";

const TableOfContents = React.memo(({ headings }) => {
  const contentHeadings = headings.slice(1);
  if (contentHeadings.length === 0) return null;

  return (
    <nav className="table-of-contents">
      <div className="table-heading">Table of Contents</div>
      <div className="toc-content">
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
      </div>
    </nav>
  );
});

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-title"></div>
    <div className="skeleton-meta"></div>
    <div className="skeleton-content">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  </div>
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
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="blog-meta">
              {post && <h1>{post.title}</h1>}
              <div className="reading-time">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                >
                  <path d="M7 3.66667V7L8.66667 8M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" />
                </svg>
                {readingTime} minute{readingTime !== 1 ? "s" : ""}
              </div>
            </div>
            <TableOfContents headings={headings} />
            <ReactMarkdown
              children={content}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeSlug, rehypeAutolinkHeadings]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            />
          </>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
