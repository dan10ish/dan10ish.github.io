import React from "react";

const BlogSkeleton = () => {
  return (
    <article className="blog-post markdown-body">
      <div className="skeleton-wrapper">
        <div className="blogpost-title">
          <div className="skeleton-title"></div>
        </div>

        <div className="blogpost-meta skeleton-meta">
          <div className="skeleton-date"></div>
          <div>|</div>
          <div className="skeleton-author"></div>
        </div>

        <div className="skeleton-content">
          <div className="skeleton-paragraph"></div>
          <div className="skeleton-paragraph"></div>
          <div className="skeleton-paragraph short"></div>

          <div className="skeleton-code">
            <div className="skeleton-code-header">
              <div className="skeleton-lang"></div>
            </div>
            <div className="skeleton-code-content">
              <div className="skeleton-code-line"></div>
              <div className="skeleton-code-line"></div>
              <div className="skeleton-code-line"></div>
              <div className="skeleton-code-line short"></div>
            </div>
          </div>

          <div className="skeleton-paragraph"></div>
          <div className="skeleton-paragraph"></div>
          <div className="skeleton-paragraph short"></div>
        </div>
      </div>
    </article>
  );
};

export default BlogSkeleton;
