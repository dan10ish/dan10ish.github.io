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
      <motion.ul layout>
        <AnimatePresence>
          {displayedPosts.map((post, index) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
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
        </AnimatePresence>
      </motion.ul>
      {filteredPosts.length > 3 && (
        <motion.div className="show-more-container" initial={false}>
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="show-more-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={showAll ? "Show less" : "Show more"}
          >
            <motion.span
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="show-more-icon"
            >
              <ChevronDown strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}
