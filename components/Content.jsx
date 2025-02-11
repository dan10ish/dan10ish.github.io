"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  Suspense,
  useRef,
} from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Globe, ArrowUp, ArrowDown, X, CodeXml, Star } from "lucide-react";
import AboutPopup from "./AboutPopup";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";

const OptionSwitcher = memo(({ selectedOption, handleOptionChange }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const resizeObserverRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current || selectedOption === "about") {
      setDimensions(null);
      return;
    }

    const activeButton =
      containerRef.current.querySelector(".option-btn.active");
    if (activeButton) {
      const rect = activeButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setDimensions({
        width: rect.width,
        left: rect.left - containerRect.left,
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    if (!containerRef.current) return;

    resizeObserverRef.current = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensions);
    });

    resizeObserverRef.current.observe(containerRef.current);
    if (containerRef.current.parentElement) {
      resizeObserverRef.current.observe(containerRef.current.parentElement);
    }

    updateDimensions();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateDimensions]);

  useEffect(() => {
    updateDimensions();
    if (isInitialRender) {
      const timer = setTimeout(() => setIsInitialRender(false), 100);
      return () => clearTimeout(timer);
    }
  }, [selectedOption, isInitialRender, updateDimensions]);

  return (
    <div className="option-switcher" ref={containerRef}>
      {dimensions && selectedOption !== "about" && (
        <div
          className="option-background"
          style={{
            width: dimensions.width,
            transform: `translateX(${dimensions.left}px)`,
          }}
        />
      )}
      <button
        onClick={() => handleOptionChange("writings")}
        className={`option-btn${selectedOption === "writings" ? " active" : ""}`}
      >
        Posts
      </button>
      <button
        onClick={() => handleOptionChange("projects")}
        className={`option-btn${selectedOption === "projects" ? " active" : ""}`}
      >
        Projects
      </button>
      <button
        onClick={() => handleOptionChange("about")}
        className={`option-btn${selectedOption === "about" ? " active" : ""}`}
      >
        <span className="info-option-btn">i</span>
      </button>
    </div>
  );
});

OptionSwitcher.displayName = "OptionSwitcher";

const BlogList = memo(({ posts, viewsData, sortConfig, handleSort }) => {
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

  const [showScroll, setShowScroll] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    setShowScroll(true);
  }, []);

  const listItems = useMemo(() => {
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
  }, [posts, viewsData]);

  return (
    <div className="mono-list">
      <div className="list-header">
        <span onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
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
      <div className="table-max" ref={tableRef}>
        {listItems}
      </div>
      {showScroll && <ScrollIndicator containerRef={tableRef} />}
    </div>
  );
});

const ProjectList = memo(
  ({ projects, selectedTag, handleTagClick, handleSort, sortConfig }) => {
    const [showScroll, setShowScroll] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {
      setShowScroll(true);
    }, []);

    const listItems = useMemo(() => {
      return projects.map((project) => (
        <div key={project.title} className="list-row">
          <span className="title">
            <div>{project.title}</div>
            <div>
              {project.highlight && (
                <span className="highlight-star" title="Highlighted Project">
                  <Star size={14} fill="currentColor" />
                </span>
              )}
            </div>
          </span>
          <span className="actions">
            <a
              href={project.sourceLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`action-link github ${!project.sourceLink ? "disabled" : ""}`}
              onClick={(e) => !project.sourceLink && e.preventDefault()}
            >
              <CodeXml size={20} />
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
    }, [projects, selectedTag, handleTagClick]);

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
        <div className="table-max" ref={tableRef}>
          {listItems}
        </div>
        {showScroll && <ScrollIndicator containerRef={tableRef} />}
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [previousOption, setPreviousOption] = useState(selectedOption);
  const [viewsData, setViewsData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);

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
        }
      } catch (error) {
        console.error("Error fetching views:", error);
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
      if (option === "about") {
        setPreviousOption(selectedOption);
        setIsAboutOpen(true);
      } else {
        router.push(`/?tab=${option}`, { scroll: false });
      }
      setSelectedOption(option);
    },
    [router, selectedOption],
  );

  const handleAboutClose = useCallback(() => {
    setIsAboutOpen(false);
    setSelectedOption(previousOption);
  }, [previousOption]);

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
      <div className="content-header-table">
        <div className="content-header">
          <AboutPopup isOpen={isAboutOpen} setIsOpen={handleAboutClose} />
          <OptionSwitcher
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        </div>
        <div className="content-area">
          {selectedOption === "writings" ? (
            <BlogList
              posts={sortedPosts}
              viewsData={viewsData}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          ) : selectedOption === "projects" ? (
            <ProjectList
              projects={filteredProjects}
              selectedTag={selectedTag}
              handleTagClick={handleTagClick}
              handleSort={handleSort}
              sortConfig={sortConfig}
            />
          ) : null}
        </div>
      </div>
      <div>
        <Footer />
      </div>
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
