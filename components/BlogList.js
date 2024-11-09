"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    setShowAll(false); // Reset showAll when changing tags
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
        {displayedPosts.map((post, index) => (
          <li
            key={post.slug}
            className={`blog-item ${
              (!showAll && index >= Math.min(2, filteredPosts.length - 1)) ||
              (showAll && index === filteredPosts.length - 1)
                ? "last-item"
                : ""
            }`}
          >
            <Link href={`/post/${post.slug}`} className="blog-card">
              <article className="blog-card-inner">
                <div className="post-content">
                  <h3 className="post-title">
                    {post.title}
                    <ArrowUpRight size={18} className="arrow-icon" />
                  </h3>
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.date)}</span>
                    <span className="dot">•</span>
                    <span className="read-time">{post.readingTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
      {filteredPosts.length > 3 && (
        <div className="show-more-container">
          <button onClick={toggleShowAll} className="show-more-button">
            {showAll ? "Show Less" : "Show More"}
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
