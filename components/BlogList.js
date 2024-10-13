"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
}

export default function BlogList({ posts }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
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
        {filteredPosts.map((post) => (
          <li key={post.slug} className="blog-list-item">
            <Link href={`/post/${post.slug}`} className="blog-card-link">
              <div className="blog-list-content">
                <h3>{post.title}</h3>
                <div className="blog-list-meta">
                  <span>{formatDate(post.date)}</span>
                  <span className="dot">•</span>
                  <span>{post.readingTime} read</span>
                </div>
              </div>
              <div className="blog-list-image">
                <Image
                  src={post.headerImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
