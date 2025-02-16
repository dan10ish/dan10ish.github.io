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
  Plane,
  ChartCandlestick,
  Briefcase,
  GraduationCap,
  Hammer,
  BookText,
  Images,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { SiX, SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

const LucideIcon = ({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
};

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
          className={`option-btn${
            selectedOption === "writings" ? " active" : ""
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => handleOptionChange("projects")}
          className={`option-btn${
            selectedOption === "projects" ? " active" : ""
          }`}
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
    { label: <LucideIcon icon={GraduationCap} />, content: "Mechatronics Engineering" },
    { label: <LucideIcon icon={Hammer} />, content: "ML | Robotics | Finance" },
    { label: <LucideIcon icon={Briefcase} />, content: "Modelling and programming of robotic arms" },
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
            <LucideIcon icon={BookText} size={16} />
            Notes
          </Link>
          <Link href="/photos" className="header-link">
            <LucideIcon icon={Images} size={16} />
            Photos
          </Link>
          <Link href="/finance" className="header-link">
            <LucideIcon icon={ChartCandlestick} size={16} />
            Finance
          </Link>
          <Link href="/planes" className="header-link">
            <LucideIcon icon={Plane} size={16} />
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
    (key) => (
      <span className="sort-icons">
        <LucideIcon
          icon={ChevronUp}
          className={
            sortConfig.key === key && sortConfig.direction === "asc"
              ? "active"
              : ""
          }
        />
        <LucideIcon
          icon={ChevronDown}
          className={
            sortConfig.key === key && sortConfig.direction === "desc"
              ? "active"
              : ""
          }
        />
      </span>
    ),
    [sortConfig]
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

const ProjectList = memo(
  ({ projects, selectedTag, handleTagClick, handleSort, sortConfig }) => {
    const tableRef = useRef(null);

    const getSortIcon = useCallback(
      (key) => (
        <span className="sort-icons">
          <LucideIcon
            icon={ChevronUp}
            className={
              sortConfig?.key === key && sortConfig.direction === "asc"
                ? "active"
                : ""
            }
          />
          <LucideIcon
            icon={ChevronDown}
            className={
              sortConfig?.key === key && sortConfig.direction === "desc"
                ? "active"
                : ""
            }
          />
        </span>
      ),
      [sortConfig]
    );

    const listItems = useMemo(() => {
      return projects.map((project) => (
        <div
          key={project.title}
          className="list-row"
        >
          <span className="title">
            <div>{project.title}</div>
            <div>
              {project.highlight && (
                <span className="highlight-star" title="Highlighted Project">
                  <LucideIcon icon={Star} size={14} fill="currentColor" />
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
              <LucideIcon icon={CodeXml} size={20} />
            </a>
            <a
              href={project.projectLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`action-link globe ${
                !project.projectLink ? "disabled" : ""
              }`}
            >
              <LucideIcon icon={Globe} size={20} />
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
    }, [projects, selectedTag, handleTagClick]);

    return (
      <div className="mono-list project-list">
        <div className="list-header">
          <span onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
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
            {selectedTag ? (
              <LucideIcon
                icon={X}
                size={16}
                className="tag-reset"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTagClick(null, e);
                }}
              />
            ) : (
              getSortIcon("tags")
            )}
            tags
          </span>
        </div>
        <div className="table-max" ref={tableRef}>
          {listItems}
        </div>
        <ScrollIndicator containerRef={tableRef} />
      </div>
    );
  }
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
            {}
          )
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
    [router]
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
        project.tags.includes(selectedTag)
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
