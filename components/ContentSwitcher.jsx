"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Globe, Github, ArrowUp, ArrowDown, X } from "lucide-react";

const ContentSwitcher = ({ posts, projects }) => {
  const [selectedOption, setSelectedOption] = useState("writings");
  const [mounted, setMounted] = useState(false);
  const [viewsData, setViewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const savedOption = localStorage.getItem("selectedOption");
    if (savedOption) {
      setSelectedOption(savedOption);
    }
    setMounted(true);

    const fetchViews = async () => {
      try {
        const viewsPromises = posts.map(async (post) => {
          const { data } = await supabase
            .from("page_stats")
            .select("views")
            .eq("id", `post-${post.slug}`)
            .single();
          return { slug: post.slug, views: data?.views };
        });

        const views = await Promise.all(viewsPromises);
        const viewsMap = views.reduce(
          (acc, { slug, views }) => ({
            ...acc,
            [slug]: views,
          }),
          {},
        );

        setViewsData(viewsMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching views:", error);
        setLoading(false);
      }
    };

    fetchViews();
  }, [posts]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("selectedOption", selectedOption);
    }
  }, [selectedOption, mounted]);

  useEffect(() => {
    if (selectedTag) {
      setSortConfig((current) => ({
        ...current,
        key: current.key === "tags" ? null : current.key,
      }));
    }
  }, [selectedTag]);

  const sortedPosts = useMemo(() => {
    if (!sortConfig.key) return posts;

    return [...posts].sort((a, b) => {
      if (sortConfig.key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (sortConfig.key === "views") {
        const viewsA = viewsData[a.slug] || 0;
        const viewsB = viewsData[b.slug] || 0;
        return sortConfig.direction === "asc"
          ? viewsA - viewsB
          : viewsB - viewsA;
      }
      return 0;
    });
  }, [posts, sortConfig, viewsData]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (selectedTag) {
      filtered = projects.filter((project) =>
        project.tags.includes(selectedTag),
      );
      return filtered;
    }
    if (sortConfig.key === "tags") {
      filtered = [...filtered].sort((a, b) => {
        const tagsA = a.tags.join(",");
        const tagsB = b.tags.join(",");
        return sortConfig.direction === "asc"
          ? tagsA.localeCompare(tagsB)
          : tagsB.localeCompare(tagsA);
      });
    }
    return filtered;
  }, [projects, selectedTag, sortConfig]);

  const handleSort = (key) => {
    if (key === "tags" && selectedTag) return;

    setSortConfig((current) => ({
      key: current.key === key && current.direction === "desc" ? null : key,
      direction:
        current.key === key
          ? current.direction === "asc"
            ? "desc"
            : null
          : "asc",
    }));
  };

  const handleTagClick = (tag, event) => {
    event.preventDefault();
    setSelectedTag((current) => (current === tag ? null : tag));
  };

  const handleClearTag = (e) => {
    e.stopPropagation();
    setSelectedTag(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  if (!mounted) return null;

  return (
    <div className="content-wrapper">
      <div className="option-switcher">
        <button
          onClick={() => setSelectedOption("writings")}
          className={`option-btn ${selectedOption === "writings" ? "active" : ""}`}
        >
          Writings
        </button>
        <button
          onClick={() => setSelectedOption("projects")}
          className={`option-btn ${selectedOption === "projects" ? "active" : ""}`}
        >
          Projects
        </button>
      </div>

      <div className="content-area">
        {selectedOption === "writings" && (
          <div className="mono-list">
            <div className="list-header">
              <span
                onClick={() => handleSort("date")}
                style={{ cursor: "pointer" }}
              >
                date {getSortIcon("date")}
              </span>
              <span>title</span>
              <span
                onClick={() => handleSort("views")}
                className="views"
                style={{ cursor: "pointer", textAlign: "right" }}
              >
                {getSortIcon("views")} views
              </span>
            </div>
            {sortedPosts.map((post) => (
              <Link
                href={`/post/${post.slug}`}
                key={post.slug}
                className="list-row"
                prefetch={false}
              >
                <span className="date">{post.year}</span>
                <span className="title title-blog">{post.title}</span>
                <span className="views">
                  {loading || viewsData[post.slug] === undefined ? (
                    <span className="infinity-symbol">∞</span>
                  ) : (
                    viewsData[post.slug]
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}

        {selectedOption === "projects" && (
          <div className="mono-list project-list">
            <div className="list-header">
              <span>title</span>
              <span className="actions">links</span>
              <span
                className="tags"
                style={{
                  cursor: selectedTag ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  opacity: 1,
                }}
                onClick={() => handleSort("tags")}
              >
                {!selectedTag && getSortIcon("tags")}
                {selectedTag && (
                  <X size={14} className="tag-reset" onClick={handleClearTag} />
                )}{" "}
                tags
              </span>
            </div>
            {filteredProjects.map((project) => (
              <div key={project.title} className="list-row">
                <span className="title">{project.title}</span>
                <span className="actions">
                  <a
                    href={project.sourceLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-link github ${!project.sourceLink ? "disabled" : ""}`}
                    onClick={(e) => !project.sourceLink && e.preventDefault()}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.projectLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`action-link globe ${!project.projectLink ? "disabled" : ""}`}
                    onClick={(e) => !project.projectLink && e.preventDefault()}
                  >
                    <Globe size={20} />
                  </a>
                </span>
                <span className="tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${selectedTag === tag ? "selected" : ""}`}
                      onClick={(e) => handleTagClick(tag, e)}
                      style={{ cursor: "pointer" }}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSwitcher;
