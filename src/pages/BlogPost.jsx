import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
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

const TableOfContents = ({ headings }) => (
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
);

export default function BlogPost() {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [headings, setHeadings] = useState([]);
  const scrollDirection = useScrollDirection();

  const post = useMemo(
    () => data.find((post) => post.fileName === fileName),
    [fileName]
  );

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await import(`../blog-posts/${fileName}.md`);
        const response = await fetch(res.default);
        const text = await response.text();
        setContent(text);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
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
      // Use a small delay to ensure the markdown has been rendered
      setTimeout(extractHeadings, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            history.pushState(null, "", `#${id}`);
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
        <h1>Post not found</h1>
        <p>Sorry, the blog post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="return-home">
        <Nav isVisible={scrollDirection === "up"} />
      </div>
      <div className="blog">
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
      </div>
    </div>
  );
}
