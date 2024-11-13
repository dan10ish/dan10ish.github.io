"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export default function BlogList({ posts }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts]);

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <section className={`blog-list ${selectedTag ? "tag-selected" : ""}`}>
      <h2>Posts</h2>
      <div className="tag-filter-container">
        <div className="tag-filter">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag ${selectedTag === tag ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="posts-table">
        {sortedPosts.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.slug}
            className={`post-row ${
              selectedTag && !post.tags.includes(selectedTag) ? "filtered" : ""
            }`}
          >
            <div className="post-year">{formatDate(post.date)}</div>
            <div className="post-title">{post.title}</div>
            <div className="post-meta">
              {post.status === "development" && (
                <span className="development-badge">Development</span>
              )}
              {post.status === "draft" && (
                <span className="draft-badge">Draft</span>
              )}
              <ArrowUpRight size={18} className="arrow-icon" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
