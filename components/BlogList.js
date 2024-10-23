"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  return `${month} ${day}`;
}

export default function BlogList({ posts }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
  }, [sortedPosts, selectedTag]);

  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="blog-list">
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
      <ul>
        {displayedPosts.map((post) => (
          <li key={post.slug} className="blog-list-item">
            <Link href={`/post/${post.slug}`} className="blog-card-link">
              <div className="blog-list-content">
                <div className="blog-list-title">{post.title}</div>
                <div className="blog-list-meta">
                  <span>{formatDate(post.date)}</span>
                  <span className="dot">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {filteredPosts.length > 3 && (
        <div className="show-more-container">
          <button onClick={toggleShowAll} className="show-more-button">
            {showAll ? "Less" : "More"}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={showAll ? "rotated" : ""}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
