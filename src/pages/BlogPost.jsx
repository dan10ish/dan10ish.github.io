import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { data } from "../data/data";
import ReactMarkdown from "react-markdown";
import Nav from "../components/Nav";

export default function BlogPost() {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

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
        <Nav />
      </div>
      <div className="blog">
        <ReactMarkdown
          children={content}
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
