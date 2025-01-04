"use client";

import { useState, useMemo } from "react";
import { getBlogPosts } from "@/lib/posts";
import FilterComponent from "@/components/FilterComponent";
import Footer from "@/components/Footer";
import ButtonsContainer from "@/components/ButtonsContainer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PostsPage() {
  const posts = getBlogPosts();
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
  }, [posts, selectedTags]);

  return (
    <main>
      <div className="section-page">
        <div className="section-header">
          <h2>Posts</h2>
        </div>
        <FilterComponent
          options={allTags}
          activeFilters={selectedTags}
          onFilterChange={setSelectedTags}
          placeholder=""
        />
      </div>

      <div className="content-scroll">
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post.slug}
              className="blog-card"
              data-status={post.status}
              aria-label={`${post.title} - ${post.status} post from ${post.year}`}
            >
              <div className="blog-year">{post.year}</div>
              <h3 className="blog-title">{post.title}</h3>
              <div className="blog-meta">
                {post.status !== "completed" && (
                  <div className="blog-status" role="status">
                    {post.status.toUpperCase()}
                  </div>
                )}
                <ArrowUpRight
                  className="blog-arrow"
                  size={16}
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="noFooter">
        <Footer />
      </div>
      <ButtonsContainer />
    </main>
  );
}
