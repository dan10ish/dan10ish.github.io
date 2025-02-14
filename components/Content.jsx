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
import {
  Globe,
  ArrowUp,
  ArrowDown,
  X,
  CodeXml,
  Star,
  Mail,
  ArrowUpRight,
  Plane,
  ChartCandlestick,
  Briefcase,
  GraduationCap,
  Hammer,
  BookText,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { SiX, SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

const OptionSwitcher = memo(({ selectedOption, handleOptionChange }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const resizeObserverRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) {
      setDimensions(null);
      return;
    }

    const activeButton =
      containerRef.current.querySelector(".option-btn.active");
    if (!activeButton) return;

    const rect = activeButton.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setDimensions({
      width: rect.width,
      left: rect.left - containerRect.left,
    });
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    resizeObserverRef.current = new ResizeObserver(updateDimensions);
    resizeObserverRef.current.observe(currentRef);
    if (currentRef.parentElement) {
      resizeObserverRef.current.observe(currentRef.parentElement);
    }
    updateDimensions();

    return () => {
      resizeObserverRef.current?.disconnect();
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
      {dimensions && (
        <motion.div
          className="option-background"
          initial={
            isInitialRender
              ? { width: dimensions.width, x: dimensions.left }
              : false
          }
          animate={{ width: dimensions.width, x: dimensions.left }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          layout
        />
      )}
      <div className="option-left">
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
      </div>
      <div className="option-right">
        <button
          onClick={() => handleOptionChange("about")}
          className={`option-btn${selectedOption === "about" ? " active" : ""}`}
        >
          About
        </button>
      </div>
    </div>
  );
});

OptionSwitcher.displayName = "OptionSwitcher";

const AboutContent = () => {
  const details = [
    { label: <GraduationCap />, content: "Mechatronics Engineering" },
    { label: <Hammer />, content: "ML, Robotics, CS" },
    {
      label: <Briefcase />,
      content: "Modelling and programming of 3 & 4-DOF robotic arms",
    },
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        <span className="name">Danish Ansari</span>
        <div className="about-details">
          {details.map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-label">{detail.label}</span>
              <span className="detail-content">{detail.content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="about-header">
        <div className="about-header-links">
          <Link href="/notes" className="header-link">
            <BookText size={16} />
            Notes
          </Link>
          <Link href="/photos" className="header-link">
            <Images size={16} />
            Photos
          </Link>
          <Link href="/finance" className="header-link">
            <ChartCandlestick size={16} />
            Finance
          </Link>
          <Link href="/planes" className="header-link">
            <Plane size={16} />
            Planes
          </Link>
        </div>
        <div className="footer-socials">
          <a
            href="https://x.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon"
            aria-label="Visit my X profile"
          >
            <SiX size={20} />
          </a>
          <a
            href="https://github.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon header-icon-github"
            aria-label="Visit my GitHub profile"
          >
            <SiGithub size={22} />
          </a>
          <a
            href="https://instagram.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon header-icon-github"
            aria-label="Visit my Instagram profile"
          >
            <SiInstagram size={20} />
          </a>
          <a
            href="mailto:aansaridan@gmail.com"
            className="header-icon email-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect via email"
          >
            <Mail size={24} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </div>
  );
};

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

  const tableRef = useRef(null);

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
        <span onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
          title {getSortIcon("title")}
        </span>
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
      <ScrollIndicator containerRef={tableRef} />
    </div>
  );
});

const ProjectPopup = ({
  project,
  onClose,
  onPrev,
  onNext,
  isFirst,
  isLast,
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="project-pop-overlay">
      <div className="project-pop-container" ref={popupRef}>
        <div className="project-pop-header">
          <h3 className="project-pop-title">{project.title}</h3>
          <button className="project-pop-close" onClick={onClose}>
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="project-pop-body">
          <p className="project-pop-about">{project.description}</p>
          <div className="project-pop-links">
            {project.sourceLink && (
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-pop-link"
              >
                <CodeXml size={18} className="project-pop-icon" />
                View Source
              </a>
            )}
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-pop-link"
              >
                <Globe size={18} className="project-pop-icon" />
                Live Project
              </a>
            )}
          </div>
        </div>

        <div className="project-pop-nav">
          <button
            className="project-pop-nav-button"
            onClick={onPrev}
            disabled={isFirst}
            style={{ opacity: isFirst ? 0.3 : 1 }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="project-pop-nav-button"
            onClick={onNext}
            disabled={isLast}
            style={{ opacity: isLast ? 0.3 : 1 }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectList = memo(
  ({ projects, selectedTag, handleTagClick, handleSort, sortConfig }) => {
    const tableRef = useRef(null);
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

    const handleRowClick = useCallback((index, event) => {
      const target = event.target;
      if (
        target.classList.contains("tag") ||
        target.classList.contains("action-link") ||
        target.closest(".tag") ||
        target.closest(".action-link")
      )
        return;
      setSelectedProjectIndex(index);
    }, []);

    const handlePopupClose = useCallback(() => {
      setSelectedProjectIndex(null);
    }, []);

    const handlePrevProject = useCallback(() => {
      setSelectedProjectIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }, []);

    const handleNextProject = useCallback(() => {
      setSelectedProjectIndex((prevIndex) =>
        Math.min(projects.length - 1, prevIndex + 1),
      );
    }, [projects.length]);

    const getSortIcon = useCallback(
      (key) => {
        if (sortConfig?.key !== key) return null;
        return sortConfig.direction === "asc" ? (
          <ArrowUp size={14} />
        ) : (
          <ArrowDown size={14} />
        );
      },
      [sortConfig],
    );

    const listItems = useMemo(() => {
      return projects.map((project, index) => (
        <div
          key={project.title}
          className={`list-row ${
            index === selectedProjectIndex ? "active-project" : ""
          }`}
          onClick={(e) => handleRowClick(index, e)}
        >
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
              className={`action-link github ${
                !project.sourceLink ? "disabled" : ""
              }`}
            >
              <CodeXml size={20} />
            </a>
            <a
              href={project.projectLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`action-link globe ${
                !project.projectLink ? "disabled" : ""
              }`}
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
              >
                {tag}
              </span>
            ))}
          </span>
        </div>
      ));
    }, [
      projects,
      selectedTag,
      handleTagClick,
      selectedProjectIndex,
      handleRowClick,
    ]);

    return (
      <>
        <div className="mono-list project-list">
          <div className="list-header">
            <span
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              title {getSortIcon("title")}
            </span>
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
          <ScrollIndicator containerRef={tableRef} />
        </div>
        <AnimatePresence>
          {selectedProjectIndex !== null && (
            <ProjectPopup
              project={projects[selectedProjectIndex]}
              onClose={handlePopupClose}
              onPrev={handlePrevProject}
              onNext={handleNextProject}
              isFirst={selectedProjectIndex === 0}
              isLast={selectedProjectIndex === projects.length - 1}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
);

const Content = ({ posts, projects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "writings";
  const [selectedOption, setSelectedOption] = useState(initialTab);
  const [viewsData, setViewsData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);

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
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };

    fetchViews();
  }, [posts]);

  const handleOptionChange = useCallback(
    (option) => {
      setSelectedOption(option);
      router.push(`/?tab=${option}`, { scroll: false });
    },
    [router],
  );

  const handleSort = useCallback((key) => {
    setSortConfig((current) => ({
      key: current.key === key && current.direction === "desc" ? null : key,
      direction:
        current.key === key
          ? current.direction === "asc"
            ? "desc"
            : null
          : "asc",
    }));
  }, []);

  const handleTagClick = useCallback((tag, event) => {
    event.preventDefault();
    setSelectedTag((current) => (current === tag ? null : tag));
  }, []);

  const sortedPosts = useMemo(() => {
    if (!sortConfig.key) return posts;
    const key = sortConfig.key;
    const direction = sortConfig.direction;

    return [...posts].sort((a, b) => {
      if (key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else if (key === "title") {
        return direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (key === "views") {
        const viewsA = viewsData[a.slug] || 0;
        const viewsB = viewsData[b.slug] || 0;
        return direction === "asc" ? viewsA - viewsB : viewsB - viewsA;
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
    }
    if (sortConfig?.key === "title") {
      filtered = [...filtered].sort((a, b) => {
        const titleA = a.title;
        const titleB = b.title;
        return sortConfig.direction === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    } else if (sortConfig?.key === "tags") {
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
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          ) : (
            <AboutContent />
          )}
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
