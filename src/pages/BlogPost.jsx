import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { data } from "../data/data";

const ReactMarkdown = lazy(() => import("react-markdown"));
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }))
);
const Footer = lazy(() => import("../components/Footer.jsx"));
const ScrollToTopButton = lazy(() => import("../components/ScrollToTop.jsx"));

const BlogPost = () => {
  const { fileName } = useParams();
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const post = React.useMemo(
    () => data.find((post) => post.fileName === fileName),
    [fileName]
  );

  React.useEffect(() => {
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
      <Suspense fallback={<div>Loading content...</div>}>
        <ReactMarkdown
          children={content}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <Suspense fallback={<div>Loading code...</div>}>
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </Suspense>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Suspense>
      <div className="blog-footer">
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading scroll button...</div>}>
        <ScrollToTopButton />
      </Suspense>
    </div>
  );
};

export default BlogPost;
