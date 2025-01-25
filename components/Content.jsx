"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Github, ArrowUp, ArrowDown, X, Mail } from "lucide-react";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";

const InfoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="title-wrapper"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        <span className="site-title">Danish</span>
      </div>
      {isOpen && (
        <div className="info-overlay" onClick={() => setIsOpen(false)}>
          <div className="info-popup">
            <button
              onClick={() => setIsOpen(false)}
              className="info-close"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>
            <div className="info-content">
              <div className="info-content-profile">
                <Image
                  src="icons/icon.png"
                  alt="Danish"
                  className="info-avatar"
                  width={80}
                  height={80}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="footer-socials">
                  <a
                    href="https://x.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon"
                    aria-label="Visit my X profile"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/dan10ish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-icon header-icon-github"
                    aria-label="Visit my GitHub profile"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="mailto:aansaridan@gmail.com"
                    className="header-icon email-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect via email"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
              <div className="info-text">
                <p onClick={(e) => e.stopPropagation()}>
                  Hi, I’m Danish, a <strong>mechatronics</strong> engineer based
                  in Mumbai, India.
                </p>
                <p onClick={(e) => e.stopPropagation()}>
                  I’m passionate about Machine Learning, Robotics, and Finance.
                </p>
                <p onClick={(e) => e.stopPropagation()}>
                  Previously, I had the chance to mathematically model and
                  program 3 and 4-DOF robotic arms for agricultural
                  applications.
                </p>
                <p onClick={(e) => e.stopPropagation()}>
                  In my free time, I explore the world of aviation, play
                  football, enjoy simulation or battle royale games, or find
                  inspiration in great design—whether it's architecture or UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const BlogList = ({ posts, viewsData, loading, sortConfig, handleSort }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <div className="mono-list">
      <div className="list-header">
        <span
          className="sort-header"
          onClick={() => handleSort("date")}
          style={{ cursor: "pointer" }}
        >
          date {getSortIcon("date")}
        </span>
        <span style={{ cursor: "default" }}>title</span>
        <span
          className="sort-header views"
          onClick={() => handleSort("views")}
          style={{ cursor: "pointer" }}
        >
          {getSortIcon("views")} views
        </span>
      </div>
      {loading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="list-row">
                <span className="date">2049</span>
                <span className="title loading-state">Loading post</span>
                <span className="views">
                  <span className="infinity-symbol">∞</span>
                </span>
              </div>
            ))
        : posts.map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post.slug}
              className="list-row"
              prefetch={false}
            >
              <span className="date">{post.year}</span>
              <span className="title">{post.title}</span>
              <span className="views">
                {viewsData[post.slug] === undefined ? (
                  <span className="infinity-symbol">∞</span>
                ) : (
                  viewsData[post.slug]
                )}
              </span>
            </Link>
          ))}
    </div>
  );
};

const ProjectList = ({
  projects,
  loading,
  selectedTag,
  handleTagClick,
  handleSort,
  sortConfig,
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  return (
    <div className="mono-list project-list">
      <div className="list-header">
        <span style={{ cursor: "default" }}>title</span>
        <span className="actions" style={{ cursor: "default" }}>
          links
        </span>
        <span
          className="sort-header tags"
          onClick={() => handleSort("tags")}
          style={{ cursor: selectedTag ? "default" : "pointer" }}
        >
          {!selectedTag && getSortIcon("tags")}
          {selectedTag && (
            <X
              size={16}
              className="tag-reset"
              onClick={(e) => {
                e.stopPropagation();
                handleTagClick(null, e);
              }}
            />
          )}
          tags
        </span>
      </div>
      {loading
        ? Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="list-row">
                <span className="title loading-state">Loading project</span>
                <span className="actions">
                  <span className="action-link disabled">
                    <Github size={20} />
                  </span>
                  <span className="action-link disabled">
                    <Globe size={20} />
                  </span>
                </span>
                <span className="tags">
                  <span className="tag loading-state">-</span>
                </span>
              </div>
            ))
        : projects.map((project) => (
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
                    className="tag"
                    data-selected={selectedTag === tag}
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
  );
};

const Content = ({ posts, projects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [selectedOption, setSelectedOption] = useState(
    tab === "projects" ? "projects" : "writings",
  );
  const [viewsData, setViewsData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    router.push(`/?tab=${option}`, { scroll: false });
  };

  useEffect(() => {
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
        setViewsData(
          views.reduce(
            (acc, { slug, views }) => ({ ...acc, [slug]: views }),
            {},
          ),
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching views:", error);
        setLoading(false);
      }
    };

    fetchViews();
  }, [posts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", selectedOption);
    }
  }, [selectedOption]);

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

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <InfoPopup />
        <div className="option-switcher">
          <button
            onClick={() => handleOptionChange("writings")}
            className={`option-btn${selectedOption === "writings" ? " active" : ""}`}
          >
            Writings
          </button>
          <button
            onClick={() => handleOptionChange("projects")}
            className={`option-btn${selectedOption === "projects" ? " active" : ""}`}
          >
            Projects
          </button>
        </div>
      </div>
      <div className="content-area">
        {selectedOption === "writings" ? (
          <BlogList
            posts={sortedPosts}
            viewsData={viewsData}
            loading={loading}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        ) : (
          <ProjectList
            projects={filteredProjects}
            loading={loading}
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
            handleSort={handleSort}
            sortConfig={sortConfig}
          />
        )}
      </div>
    </div>
  );
};

export default function ContentWrapper({ posts, projects }) {
  return (
    <Suspense fallback={null}>
      <Content posts={posts} projects={projects} />
      <Footer />
    </Suspense>
  );
}
