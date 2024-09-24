"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.slug} className="list-item">
            <div>
              <p>{post.date}</p>
            </div>
            <div>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
