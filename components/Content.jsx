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
  X,
  Star,
  GraduationCap,
  Hammer,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  Github,
  Mail,
  UserIcon,
} from "lucide-react";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";
import { motion } from "framer-motion";
import PhotoGrid from "./PhotoGrid";
import { SiX } from "@icons-pack/react-simple-icons";

const LucideIcon = memo(({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
});

LucideIcon.displayName = "LucideIcon";

const OptionSwitcher = memo(({ selectedOption, handleOptionChange }) => {
  const containerRef = useRef(null);
  const optionsContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const resizeObserverRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current || !optionsContainerRef.current) {
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
      top: rect.top - containerRect.top + rect.height / 2,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;
    const optionsRef = optionsContainerRef.current;
    if (!currentRef || !optionsRef) return;

    const handleResize = () => {
      window.requestAnimationFrame(updateDimensions);
    };
    window.addEventListener("resize", handleResize);

    resizeObserverRef.current = new ResizeObserver(() => {
      window.requestAnimationFrame(updateDimensions);
    });

    resizeObserverRef.current.observe(currentRef);
    resizeObserverRef.current.observe(optionsRef);
    if (currentRef.parentElement) {
      resizeObserverRef.current.observe(currentRef.parentElement);
    }

    setTimeout(updateDimensions, 50);
    setTimeout(updateDimensions, 200);

    return () => {
      resizeObserverRef.current?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDimensions]);

  useEffect(() => {
    updateDimensions();
    if (isInitialRender) {
      const timer = setTimeout(() => {
        setIsInitialRender(false);
        updateDimensions();
      }, 100);
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
              ? {
                  width: dimensions.width,
                  height: dimensions.height,
                  x: dimensions.left,
                  y: dimensions.top - dimensions.height / 2,
                }
              : false
          }
          animate={{
            width: dimensions.width,
            height: dimensions.height,
            x: dimensions.left,
            y: dimensions.top - dimensions.height / 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          layout
        />
      )}
      <div className="option-left" ref={optionsContainerRef}>
        <button
          onClick={() => handleOptionChange("posts")}
          className={`option-btn${selectedOption === "posts" ? " active" : ""}`}
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
        <button
          onClick={() => handleOptionChange("photos")}
          className={`option-btn${
            selectedOption === "photos" ? " active" : ""
          }`}
        >
          Photos
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

const EmailCopyButton = memo(({ email }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [email]);

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className="copy-code-button"
      aria-label={copied ? "Copied!" : "Copy email"}
      title={copied ? "Copied!" : "Copy email"}
    >
      {copied ? (
        <Check className="copy-icon" strokeWidth={2.5} />
      ) : (
        <Copy className="copy-icon" strokeWidth={2} />
      )}
    </button>
  );
});

EmailCopyButton.displayName = "EmailCopyButton";

const AboutContent = memo(() => {
  const details = [
    {
      label: <LucideIcon icon={GraduationCap} />,
      content: "Mechatronics Engineer",
    },
    {
      label: <LucideIcon icon={Hammer} />,
      content: ["Machine Learning", "Robotics", "Finance"],
      isPills: true,
      className: "no-center-align",
    },
    {
      label: <LucideIcon icon={UserIcon} />,
      content: "Generalist bridging code and hardware",
      className: "no-center-align",
    },
  ];

  const email = "aansaridan@gmail.com";

  return (
    <div className="about-container">
      <div className="about-content">
        <span className="name">Danish Ansari</span>
        <div className="about-details">
          {details.map((detail, index) => (
            <div
              key={index}
              className={`detail-item ${detail.className || ""}`}
            >
              <span className="detail-label">{detail.label}</span>
              {detail.isPills ? (
                <span className="detail-content pills-container">
                  {detail.content.map((pill, i) => (
                    <span key={i} className="skill-pill">
                      {pill}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="detail-content">{detail.content}</span>
              )}
            </div>
          ))}
        </div>
        <div className="about-details">
          <div className="detail-item">
            <span className="detail-label">
              <LucideIcon icon={Github} />
            </span>
            <span className="detail-content">
              <div className="about-social-link-wrapper">
                <a
                  href="https://github.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-link"
                  aria-label="Visit my GitHub profile"
                >
                  dan10ish
                </a>
              </div>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <LucideIcon icon={Mail} />
            </span>
            <span className="detail-content">
              <div className="about-email-container">
                <a
                  href={`mailto:${email}`}
                  className="about-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect via email"
                >
                  {email}
                </a>
                <EmailCopyButton email={email} />
              </div>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <SiX
                size={22}
                style={{
                  strokeWidth: `var(--icon-stroke-width)`,
                  opacity: 0.8,
                  height: "1.2rem",
                }}
              />
            </span>
            <span className="detail-content">
              <div className="about-social-link-wrapper">
                <a
                  href="https://x.com/dan10ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-social-link"
                  aria-label="Visit my X profile"
                >
                  dan10ish
                </a>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutContent.displayName = "AboutContent";

const SortIcon = memo(({ columnKey, sortConfig }) => (
  <span className="sort-icons">
    <LucideIcon
      icon={ChevronUp}
      className={
        sortConfig.key === columnKey && sortConfig.direction === "asc"
          ? "active"
          : ""
      }
    />
    <LucideIcon
      icon={ChevronDown}
      className={
        sortConfig.key === columnKey && sortConfig.direction === "desc"
          ? "active"
          : ""
      }
    />
  </span>
));

SortIcon.displayName = "SortIcon";

const formatNumber = (num) => {
  if (num === null || num === undefined)
    return <span className="infinity-symbol">∞</span>;
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(2) + "K";
  return num;
};

const BlogListItem = memo(({ post, viewCount }) => (
  <Link href={`/post/${post.slug}`} className="list-row" prefetch>
    <span className="date">{post.year}</span>
    <span className="title">{post.title}</span>
    <span className="views">{formatNumber(viewCount)}</span>
  </Link>
));

BlogListItem.displayName = "BlogListItem";

const BlogList = memo(({ posts, viewsData, sortConfig, handleSort }) => {
  const tableRef = useRef(null);

  return (
    <div className="mono-list">
      <div className="list-header">
        <span onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
          date <SortIcon columnKey="date" sortConfig={sortConfig} />
        </span>
        <span onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
          title <SortIcon columnKey="title" sortConfig={sortConfig} />
        </span>
        <span
          onClick={() => handleSort("views")}
          style={{ cursor: "pointer" }}
          className="views"
        >
          <SortIcon columnKey="views" sortConfig={sortConfig} /> views
        </span>
      </div>
      <div className="table-max" ref={tableRef}>
        {posts.map((post) => (
          <BlogListItem
            key={post.slug}
            post={post}
            viewCount={viewsData[post.slug]}
          />
        ))}
      </div>
      <ScrollIndicator containerRef={tableRef} />
    </div>
  );
});

BlogList.displayName = "BlogList";

const ProjectListItem = memo(({ project, selectedTag, handleTagClick }) => (
  <div className="list-row">
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
        <LucideIcon icon={Github} size={20} />
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

ProjectListItem.displayName = "ProjectListItem";

const ProjectList = memo(
  ({ projects, selectedTag, handleTagClick, handleSort, sortConfig }) => {
    const tableRef = useRef(null);

    return (
      <div className="mono-list project-list">
        <div className="list-header">
          <span
            onClick={() => handleSort("title")}
            style={{ cursor: "pointer" }}
          >
            title <SortIcon columnKey="title" sortConfig={sortConfig} />
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
              <SortIcon columnKey="tags" sortConfig={sortConfig} />
            )}
            tags
          </span>
        </div>
        <div className="table-max" ref={tableRef}>
          {projects.map((project) => (
            <ProjectListItem
              key={project.title}
              project={project}
              selectedTag={selectedTag}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
        <ScrollIndicator containerRef={tableRef} />
      </div>
    );
  }
);

ProjectList.displayName = "ProjectList";

const Content = memo(({ posts, projects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "posts";
  const [selectedOption, setSelectedOption] = useState(initialTab);
  const [viewsData, setViewsData] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedOption === "photos") {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, [selectedOption]);

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
      } catch {}
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
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
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
          {selectedOption === "posts" ? (
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
          ) : selectedOption === "photos" ? (
            <PhotoGrid />
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
});

Content.displayName = "Content";

export default function ContentWrapper({ posts, projects }) {
  return (
    <Suspense fallback={null}>
      <Content posts={posts} projects={projects} />
    </Suspense>
  );
}
