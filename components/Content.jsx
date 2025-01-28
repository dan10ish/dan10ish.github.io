"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  Suspense,
} from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Globe, Github, ArrowUp, ArrowDown, X } from "lucide-react";
import AboutPopup from "./AboutPopup";
import Footer from "./Footer";

const BlogList = memo(
  ({ posts, viewsData, loading, sortConfig, handleSort }) => {
    const getSortIcon = useCallback(
      (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
          <ArrowUp size={14} />
        ) : (
          <ArrowDown size={14} />
        );
      },
      [sortConfig],
    );

    const listItems = useMemo(() => {
      if (loading) {
        return Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="list-row skeleton-row">
              <span className="date">
                <div className="skeleton-text" style={{ width: "45px" }}></div>
              </span>
              <span className="title">
                <div className="skeleton-text" style={{ width: "80%" }}></div>
              </span>
              <span className="views">
                <div
                  className="skeleton-text"
                  style={{ width: "30px", marginLeft: "auto" }}
                ></div>
              </span>
            </div>
          ));
      }

      return posts.map((post) => (
        <Link
          href={`/post/${post.slug}`}
          key={post.slug}
          className="list-row"
          prefetch
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
      ));
    }, [posts, viewsData, loading]);

    return (
      <div className="mono-list">
        <div className="list-header">
          <span
            onClick={() => handleSort("date")}
            style={{ cursor: "pointer" }}
          >
            date {getSortIcon("date")}
          </span>
          <span style={{ cursor: "default" }}>title</span>
          <span
            onClick={() => handleSort("views")}
            style={{ cursor: "pointer" }}
            className="views"
          >
            {getSortIcon("views")} views
          </span>
        </div>
        {listItems}
      </div>
    );
  },
);

const ProjectList = memo(
  ({
    projects,
    loading,
    selectedTag,
    handleTagClick,
    handleSort,
    sortConfig,
  }) => {
    const listItems = useMemo(() => {
      if (loading) {
        return Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="list-row skeleton-row">
              <span className="title">
                <div className="skeleton-text" style={{ width: "70%" }}></div>
              </span>
              <span className="actions">
                <span className="action-link skeleton-action">
                  <Github size={20} />
                </span>
                <span className="action-link skeleton-action">
                  <Globe size={20} />
                </span>
              </span>
              <span className="tags">
                <span className="tag skeleton-tag"></span>
              </span>
            </div>
          ));
      }

      return projects.map((project) => (
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
      ));
    }, [projects, loading, selectedTag, handleTagClick]);

    return (
      <div className="mono-list project-list">
        <div className="list-header">
          <span style={{ cursor: "default" }}>title</span>
          <span className="actions" style={{ cursor: "default" }}>
            links
          </span>
          <span
            className="sort-header tags"
            onClick={() => !selectedTag && handleSort("tags")}
            style={{ cursor: selectedTag ? "default" : "pointer" }}
          >
            {!selectedTag &&
              sortConfig.key === "tags" &&
              (sortConfig.direction === "asc" ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              ))}
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
        {listItems}
      </div>
    );
  },
);

const Content = ({ posts, projects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("tab") === "projects" ? "projects" : "writings",
  );
  const [viewsData, setViewsData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
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
        if (isMounted) {
          setViewsData(
            views.reduce(
              (acc, { slug, views }) => ({ ...acc, [slug]: views }),
              {},
            ),
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching views:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchViews();
    return () => {
      isMounted = false;
    };
  }, [posts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedOption", selectedOption);
    }
  }, [selectedOption]);

  const handleOptionChange = useCallback(
    (option) => {
      setSelectedOption(option);
      router.push(`/?tab=${option}`, { scroll: false });
    },
    [router],
  );

  const handleSort = useCallback(
    (key) => {
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
    },
    [selectedTag],
  );

  const handleTagClick = useCallback((tag, event) => {
    event.preventDefault();
    setSelectedTag((current) => (current === tag ? null : tag));
  }, []);

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

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <AboutPopup />
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
      <Footer />
    </div>
  );
};

export default function ContentWrapper({ posts, projects }) {
  return (
    <Suspense fallback={null}>
      <Content posts={posts} projects={projects} />
    </Suspense>
  );
}
