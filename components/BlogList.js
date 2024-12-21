"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FilterComponent from "./FilterComponent";

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
      selectedTags.some((tag) => post.tags.includes(tag)),
    );
  }, [selectedTags, posts]);

  const displayedPosts = useMemo(() => {
    if (showAll || selectedTags.length > 0) return filteredPosts;
    return filteredPosts.slice(0, 3);
  }, [filteredPosts, showAll, selectedTags]);

  return (
    <section>
      <h2>Posts</h2>

      <FilterComponent
        options={allTags}
        activeFilters={selectedTags}
        onFilterChange={setSelectedTags}
        placeholder=""
      />

      <div className="blog-grid">
        {displayedPosts.map((post) => (
          <Link 
            href={`/post/${post.slug}`} 
            key={post.slug} 
            className="blog-card"
            data-status={post.status}
          >
            <div className="blog-year">{post.year}</div>
            <h3 className="blog-title">{post.title}</h3>
            <div className="blog-meta">
              {post.status !== "completed" && (
                <div className="blog-status">{post.status.toUpperCase()}</div>
              )}
              <ArrowUpRight className="blog-arrow" size={16} />
            </div>
          </Link>
        ))}
      </div>

      {!showAll && !selectedTags.length && filteredPosts.length > 3 && (
        <Link href="/posts" className="show-more">
          <span>All</span>
          <ArrowUpRight size={14} />
        </Link>
      )}
    </section>
  );
}