"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import FilterComponent from "./FilterComponent";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export default function BlogList({ posts, showAll = false }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    );
  }, [selectedTags, posts]);

  const displayedPosts = useMemo(() => {
    if (showAll || selectedTags.length > 0) return filteredPosts;
    return filteredPosts.slice(0, 3);
  }, [filteredPosts, showAll, selectedTags]);

  return (
    <section className="blog-list">
      <h2>Posts</h2>

      <FilterComponent
        options={allTags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
        placeholder="by tag"
      />

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

      {!showAll && !selectedTags.length && filteredPosts.length > 3 && (
        <Link href="/posts" className="show-more-button">
          <span className="show-text">View All Posts</span>
          <ChevronRight size={16} />
        </Link>
      )}
    </section>
  );
}
