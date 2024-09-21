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

const TableOfContents = React.memo(({ headings }) => (
  <nav className="table-of-contents">
    <div className="table-heading">Table of Contents</div>
    <ul>
      {headings.map((heading) => (
        <li
          key={heading.id}
          style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
        >
          <a href={`#${heading.id}`}>{heading.text}</a>
        </li>
      ))}
    </ul>
  </nav>
));

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
    <div className="skeleton-line"></div>
  </div>
);

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
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

    if (content) {
      setTimeout(extractHeadings, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

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
            Reading time: {readingTime} minute
            {readingTime !== 1 ? "s" : ""}
          </div>
        </div>
        {!isLoading && <TableOfContents headings={headings} />}
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
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
