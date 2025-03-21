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
import { useRouter, useSearchParams } from "next/navigation";
import {
  Globe,
  X,
  Star,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  Github,
  Mail,
} from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import PhotoGrid from "./PhotoGrid";
import ProjectModal from "./ProjectModal";
import KeyboardIcon from "./KeyboardIcon";

const LucideIcon = memo(({ icon: Icon, ...props }) => (
  <Icon strokeWidth="var(--icon-stroke-width)" {...props} />
));

LucideIcon.displayName = "LucideIcon";

const XIcon = memo((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 256 256"
    fill="currentColor"
    stroke="none"
    strokeWidth="var(--icon-stroke-width)"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
));

XIcon.displayName = "XIcon";

const OptionSwitcher = memo(({ selectedOption, handleOptionChange }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <button
          className={`nav-item${selectedOption === "projects" ? " active" : ""}`}
          onClick={() => handleOptionChange("projects")}
        >
          projects
        </button>
        <button
          className={`nav-item${selectedOption === "photos" ? " active" : ""}`}
          onClick={() => handleOptionChange("photos")}
        >
          photos
        </button>
        <button
          className={`nav-item${selectedOption === "about" ? " active" : ""}`}
          onClick={() => handleOptionChange("about")}
        >
          about
        </button>
      </div>
    </nav>
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
  const email = "aansaridan@gmail.com";
  const [copied, setCopied] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&family=Noto+Sans+Arabic&display=swap"
        rel="stylesheet"
      />
      <div className="about-container">
        <div className="about-content">
          <span className="name">Danish Ansari</span>

          <div className="multilingual-greeting">
            Hi,{" "}
            <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              नमस्ते
            </span>
            ,{" "}
            <span style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
              سلام
            </span>
            , Jambo
          </div>

          <div className="about-description">
            I'm a mechatronics engineer and generalist bridging code and
            hardware with interests in machine learning, robotics, and finance.
          </div>

          <div className="contact-info">
            <span className="email-wrapper">
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <LucideIcon
                  icon={Mail}
                  size={20}
                  style={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                {email}
              </a>
              <EmailCopyButton email={email} />
            </span>
            <span className="contact-wrapper">
              <a
                href="https://github.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <LucideIcon
                  icon={Github}
                  size={20}
                  style={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                dan10ish
              </a>
            </span>
            <span className="contact-wrapper">
              <a
                href="https://x.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <XIcon
                  width={20}
                  height={20}
                  style={{ verticalAlign: "middle", marginRight: "8px" }}
                />
                dan10ish
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
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

const ProjectListItem = memo(
  ({
    project,
    selectedTag,
    handleTagClick,
    handleProjectClick,
    isSelected,
  }) => (
    <div
      className={`list-row ${isSelected ? "selected" : ""}`}
      onClick={() => handleProjectClick(project)}
    >
      <span className="title">
        <div>{project.title.toLowerCase()}</div>
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
          onClick={(e) => {
            e.stopPropagation();
            if (!project.sourceLink) {
              e.preventDefault();
            }
          }}
          aria-label={`View source code for ${project.title} on GitHub`}
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
          onClick={(e) => {
            e.stopPropagation();
            if (!project.projectLink) {
              e.preventDefault();
            }
          }}
          aria-label={`Visit live website for ${project.title}`}
        >
          <LucideIcon icon={Globe} size={20} />
        </a>
      </span>
      <span className="tags">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`tag ${selectedTag === tag ? "selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleTagClick(tag, e);
            }}
          >
            {tag}
          </span>
        ))}
      </span>
      <span className="status-header">
        <span className="status-dot-container">
          <span
            className={`table-status-dot ${project.status}`}
            title={project.status}
          ></span>
        </span>
        <span className="status-pill-container">
          <span className={`status-pill ${project.status}`}>
            <span className="status-text">{project.status.toLowerCase()}</span>
          </span>
        </span>
      </span>
    </div>
  ),
);

ProjectListItem.displayName = "ProjectListItem";

const ProjectList = memo(
  ({ projects, selectedTag, handleTagClick, handleSort, sortConfig }) => {
    const tableRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const isAutoScrolling = useRef(false);

    const handleProjectClick = (project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (isModalOpen) {
          if (e.key === "Escape") {
            handleCloseModal();
          }
          return;
        }

        if (projects.length === 0) return;

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            setSelectedRowIndex((prev) =>
              prev === null ? 0 : Math.min(prev + 1, projects.length - 1),
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedRowIndex((prev) =>
              prev === null ? projects.length - 1 : Math.max(prev - 1, 0),
            );
            break;
          case "Enter":
            if (selectedRowIndex !== null) {
              handleProjectClick(projects[selectedRowIndex]);
            }
            break;
          case "Escape":
            setSelectedRowIndex(null);
            break;
        }
      };

      const handleMouseMove = () => {
        if (selectedRowIndex !== null) {
          setSelectedRowIndex(null);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, [selectedRowIndex, projects, isModalOpen]);

    useEffect(() => {
      if (selectedRowIndex === null) return;

      const timer = setTimeout(() => {
        try {
          const selectedElement = document.querySelector(".list-row.selected");
          if (!selectedElement) return;

          const rect = selectedElement.getBoundingClientRect();
          const containerRect = tableRef.current.getBoundingClientRect();
          const margin = 20;

          if (
            rect.top >= containerRect.top + margin &&
            rect.bottom <= containerRect.bottom - margin
          )
            return;

          isAutoScrolling.current = true;

          let targetPosition;
          if (rect.top < containerRect.top + margin) {
            targetPosition =
              tableRef.current.scrollTop +
              (rect.top - containerRect.top) -
              margin;
          } else {
            targetPosition =
              tableRef.current.scrollTop +
              (rect.bottom - containerRect.bottom) +
              margin;
          }

          tableRef.current.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          setTimeout(() => (isAutoScrolling.current = false), 300);
        } catch (error) {
          console.error("Error scrolling to selected project:", error);
        }
      }, 50);

      return () => clearTimeout(timer);
    }, [selectedRowIndex]);

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
              <>
                tags <SortIcon columnKey="tags" sortConfig={sortConfig} />
              </>
            )}
          </span>
          <span className="status-header" onClick={() => handleSort("status")}>
            <span className="status-label">status</span>
            <SortIcon columnKey="status" sortConfig={sortConfig} />
          </span>
        </div>
        <div className="table-max" ref={tableRef}>
          {projects.map((project, index) => (
            <ProjectListItem
              key={project.title}
              project={project}
              selectedTag={selectedTag}
              handleTagClick={handleTagClick}
              handleProjectClick={handleProjectClick}
              isSelected={index === selectedRowIndex}
            />
          ))}
        </div>
        <ScrollIndicator containerRef={tableRef} />
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  },
);

ProjectList.displayName = "ProjectList";

const Content = memo(({ projects }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "projects";
  const [selectedOption, setSelectedOption] = useState(initialTab);
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

  const handleOptionChange = useCallback(
    (option) => {
      setSelectedOption(option);
      router.push(`/?tab=${option}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const options = ["projects", "photos", "about"];
        const currentIndex = options.indexOf(selectedOption);
        const nextIndex = (currentIndex + 1) % options.length;
        handleOptionChange(options[nextIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption, handleOptionChange]);

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

  const filteredProjects = useMemo(() => {
    let filtered = projects;
    if (selectedTag) {
      filtered = projects.filter((project) =>
        project.tags.includes(selectedTag),
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
    } else if (sortConfig?.key === "status") {
      filtered = [...filtered].sort((a, b) => {
        const statusOrder = { live: 1, offline: 2, archive: 3 };
        const statusA = statusOrder[a.status] || 999;
        const statusB = statusOrder[b.status] || 999;
        return sortConfig.direction === "asc"
          ? statusA - statusB
          : statusB - statusA;
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
          {selectedOption === "projects" ? (
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
      <KeyboardIcon />
    </div>
  );
});

Content.displayName = "Content";

export default function ContentWrapper({ projects }) {
  return (
    <Suspense fallback={null}>
      <Content projects={projects} />
    </Suspense>
  );
}
