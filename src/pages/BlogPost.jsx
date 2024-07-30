import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Footer from "../components/Footer.jsx";
import { data } from "../data/data";
import ScrollToTopButton from "../components/ScrollToTop.jsx";

const BlogPost = () => {
  const { fileName } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const post = data.find((post) => post.fileName === fileName);

  useEffect(() => {
    import(`../blog-posts/${fileName}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => response.text())
          .then((text) => {
            setContent(text);
            setError(false);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setError(true);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [fileName]);

  if (loading) {
    return (
      <div className="blog-post">
        <h3>Loading Blog...</h3>
      </div>
    );
  }

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
      <div className="nav-home">
        <Link to="/">Home</Link>
      </div>
      <div className="post-title">
        <h1>{post.title}</h1>
      </div>
      <div className="post-date">
        <p>{format(new Date(post.date), "MMMM dd, yyyy")}</p>
      </div>
      <ReactMarkdown
        children={content}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
      <div className="blog-footer">
        <Footer />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default BlogPost;
