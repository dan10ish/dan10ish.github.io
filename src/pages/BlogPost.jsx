import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogPosts from "../data/blogPosts";
import "./BlogPost.css";

import { format } from "date-fns";

import Footer from "./Footer";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import back from "../assets/back.svg";

import ScrollToTop from "../components/ScrollToTop";

export default function BlogPost() {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const post = blogPosts.find((post) => post.fileName === fileName);

  useEffect(() => {
    if (post) {
      import(`../blog-posts/${post.fileName}`)
        .then((res) => fetch(res.default))
        .then((res) => res.text())
        .then(setContent)
        .catch((err) => console.error(err));
    }
  }, [post, fileName]);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <div className="blogPost">
        <div className="home-nav">
          <Link to="/">
            <div>
              <img src={back} alt="Back" />
            </div>
            <div>Home</div>
          </Link>
        </div>
        <div className="blogPost-title">
          <h1>{post.title}</h1>
        </div>
        <div className="blogPost-date">
          <p>{format(new Date(post.date), "MMMM dd, yyyy")}</p>
        </div>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                style={{ color: "#007bff" }}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
        <ScrollToTop />
        <div className="blog-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
