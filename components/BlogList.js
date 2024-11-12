"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  return `${month} ${day}`;
}

const BlogCard = ({ post }) => (
  <Link href={`/post/${post.slug}`} className="blog-card">
    <article className="blog-card-inner">
      <div className="post-content">
        <div>
          <h3 className="post-title">
            {post.title}
            {post.status === "development" && (
              <span className="development-badge">In Development</span>
            )}
            {post.status === "draft" && (
              <span className="draft-badge">Draft</span>
            )}
            <ArrowUpRight size={18} className="arrow-icon" />
          </h3>
          <div className="post-meta">
            <span className="post-date">{post.date}</span>
            <span className="dot">•</span>
            <span className="read-time">{post.readingTime}</span>
          </div>
        </div>
      </div>
    </article>
  </Link>
);

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
    setShowAll(false);
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
      <ul className="blog-list-items">
        {displayedPosts.map((post, index) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`blog-item ${
              post.status === "development" ? "development" : ""
            } ${
              (!showAll && index >= Math.min(2, filteredPosts.length - 1)) ||
              (showAll && index === filteredPosts.length - 1)
                ? "last-item"
                : ""
            }`}
          >
            <BlogCard post={post} />
          </motion.li>
        ))}
      </ul>
      {filteredPosts.length > 3 && (
        <div className="show-more-container">
          <button
            onClick={() => setShowAll(!showAll)}
            className="show-more-button"
            aria-label={showAll ? "Show less posts" : "Show more posts"}
          >
            <span className="show-more-text">
              {showAll ? "Show Less" : "Show More"}
            </span>
            <ChevronDown
              size={16}
              className="show-more-icon"
              style={{ transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      )}
    </section>
  );
}
