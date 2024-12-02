"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export default function BlogList({ posts, showAll = false }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return sortedPosts;
    return sortedPosts.filter((post) => post.tags.includes(selectedTag));
  }, [selectedTag, sortedPosts]);

  const displayedPosts = useMemo(() => {
    if (showAll || selectedTag) return filteredPosts;
    return filteredPosts.slice(0, 3);
  }, [filteredPosts, showAll, selectedTag]);

  return (
    <section className={`blog-list ${selectedTag ? "tag-selected" : ""}`}>
      <h2>Posts</h2>
      <div className="tag-filter-container">
        <div className="tag-filter">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`tag ${selectedTag === tag ? "selected" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="posts-table">
        {displayedPosts.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.slug}
            className="post-row"
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
      {!showAll && !selectedTag && filteredPosts.length > 3 && (
        <Link href="/posts" className="show-more-button">
          <span className="show-text">View All Posts</span>
          <ChevronRight size={16} />
        </Link>
      )}
    </section>
  );
}
