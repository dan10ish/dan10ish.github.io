import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

import { format } from "date-fns";

export default function Blog() {
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <>
      <div className="blog">
        {sortedBlogPosts.map((post) => (
          <div className="blog-list" key={post.id}>
            <div className="blog-title">
              <h2>
                <Link to={`/blog/${post.fileName}`}>{post.title}</Link>
              </h2>
            </div>
            <div className="blog-date">
              <p>{format(new Date(post.date), "MMMM dd, yyyy")}</p>
            </div>
          </div>
        ))}
        <div className="wait">
          <div className="loader"></div>
          <div className="wait-text">Let me cook 🧑🏼‍🍳</div>
        </div>
      </div>
    </>
  );
}
