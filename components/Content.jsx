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
import {
  Globe,
  X,
  Star,
  ChevronUp,
  ChevronDown,
  Github,
  Mail,
  Instagram,
} from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import ProjectModal from "./ProjectModal";
import KeyboardIcon from "./KeyboardIcon";
import { motion } from "framer-motion";

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

const AboutContent = memo(() => {
  const email = "aansaridan@gmail.com";

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <span className="name">
            <motion.svg
              width="110"
              height="45"
              viewBox="0 0 164 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                overflow: "visible",
                transform: "rotate(23deg)",
                transformOrigin: "center",
                margin: "0 -5px",
              }}
            >
              <motion.path
                d="M34.3064 64.9999C33.0838 60.5 29.1074 47.6967 33.7226 63C34.9064 66.9251 36.4137 72.4657 35.7494 76.7838C35.4545 78.7008 29.6736 70.5187 29.1989 69.866"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M20.3832 65.4582C15.6226 63.2709 -0.90962 60.7617 2.44582 52.5408C6.20772 43.3242 20.1944 35.5523 28.3418 31.1751C38.2802 25.8357 52.4563 20.49 63.7881 24.6246C87.4576 33.2608 47.0013 74.3708 40.8306 81.3753C27.5945 96.4002 33.5035 89.964 20.3832 105.089"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d="M76.8987 44.8412C76.6592 47.5235 76.427 51.2235 76.349 53.8412C75.8028 58.7537 76.6613 48.4288 76.7983 46.2027C76.8854 44.7865 77.7068 32.6321 80.465 36.7693C83.1975 40.8681 85.7163 45.0834 88.7984 48.9361"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.path
                d="M75.5979 50.7362C72.1331 51.0512 75.0925 49.9843 77.0646 48.6696C81.2262 45.8952 83.6516 43.1027 88.3486 41.3413"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.path
                d="M91.2136 35.8413C91.2136 33.3161 94.3008 42.3762 94.8486 44.8413C95.1332 46.1219 92.9083 40.7916 92.4314 39.5695C92.2343 39.0645 90.1388 33.6028 91.3314 33.6028C94.5102 33.6028 98.6534 35.5554 101.731 36.3361C102.289 36.4775 109.003 39.6498 108.349 38.3413C106.821 35.2855 103.349 29.8413 102.849 25.8413"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1.4 }}
              />
              <motion.path
                d="M109.807 23.5952C107.807 20.0952 112.967 29.8625 113.556 30.8566C115.307 34.0952 115.307 36.5952 115.307 35.5952"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.path
                d="M130.798 12.9358C127.349 13.8412 121.8 18.5911 119.849 21.3412C116.849 28.3412 128.946 20.756 130.798 20.5502C133.349 19.8412 133.892 23.0543 133.732 23.5359C133.102 25.4248 130.009 27.5528 128.632 28.8692C126.436 30.9678 123.849 32.8412 120.998 35.3412"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.0 }}
              />
              <motion.path
                d="M138.349 8.34143C138.91 9.48014 144.768 23.9706 143.349 21.8414"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 2.4 }}
              />
              <motion.path
                d="M137.349 18.3414C137.849 16.3414 151.949 12.0393 152.349 8.84125C148.849 0.841247 148.849 0.341237 150.849 4.84127C152.849 9.34131 156 16 157 20"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.6 }}
              />
            </motion.svg>
          </span>
          <div className="contact-info">
            <a
              href="https://github.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Visit GitHub profile"
              title="GitHub: @dan10ish"
            >
              <LucideIcon icon={Github} size={22} />
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Send email"
              title="aansaridan@gmail.com"
            >
              <LucideIcon icon={Mail} size={22} />
            </a>
            <a
              href="https://x.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Visit X/Twitter profile"
            >
              <XIcon width={22} height={22} />
            </a>
            <a
              href="https://instagram.com/dan10ish"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label="Visit Instagram profile"
              title="Instagram: @dan10ish"
            >
              <LucideIcon icon={Instagram} size={22} />
            </a>
          </div>
        </div>
        <div className="about-description">
          Mechatronics engineer and generalist bridging code and hardware.
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
          onClick={(e) => {
            e.stopPropagation();
            if (!project.sourceLink) e.preventDefault();
          }}
          aria-label={`View source code for ${project.title} on GitHub`}
          title="View source code on GitHub"
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
            if (!project.projectLink) e.preventDefault();
          }}
          aria-label={`Visit live website for ${project.title}`}
          title="View live project"
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
            <span className="status-text">{project.status}</span>
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

    const handleProjectClick = useCallback((project) => {
      setSelectedProject(project);
      setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (isModalOpen) {
          if (e.key === "Escape") handleCloseModal();
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

      document.addEventListener("keydown", handleKeyDown);
      const handleMouseMove = () =>
        selectedRowIndex !== null && setSelectedRowIndex(null);
      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, [
      selectedRowIndex,
      projects,
      isModalOpen,
      handleCloseModal,
      handleProjectClick,
    ]);

    useEffect(() => {
      if (selectedRowIndex === null) return;

      const timer = setTimeout(() => {
        const selectedElement = document.querySelector(".list-row.selected");
        if (!selectedElement || !tableRef.current) return;

        const rect = selectedElement.getBoundingClientRect();
        const containerRect = tableRef.current.getBoundingClientRect();
        const margin = 20;

        if (
          rect.top >= containerRect.top + margin &&
          rect.bottom <= containerRect.bottom - margin
        )
          return;

        isAutoScrolling.current = true;

        const targetPosition =
          rect.top < containerRect.top + margin
            ? tableRef.current.scrollTop +
              (rect.top - containerRect.top) -
              margin
            : tableRef.current.scrollTop +
              (rect.bottom - containerRect.bottom) +
              margin;

        tableRef.current.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        setTimeout(() => (isAutoScrolling.current = false), 300);
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);

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
    let filtered = selectedTag
      ? projects.filter((project) => project.tags.includes(selectedTag))
      : projects;

    if (!sortConfig?.key) return filtered;

    return [...filtered].sort((a, b) => {
      if (sortConfig.key === "title") {
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortConfig.key === "tags") {
        const tagsA = a.tags.join(",");
        const tagsB = b.tags.join(",");
        return sortConfig.direction === "asc"
          ? tagsA.localeCompare(tagsB)
          : tagsB.localeCompare(tagsA);
      }

      if (sortConfig.key === "status") {
        const statusOrder = { live: 1, offline: 2, archive: 3 };
        const statusA = statusOrder[a.status] || 999;
        const statusB = statusOrder[b.status] || 999;
        return sortConfig.direction === "asc"
          ? statusA - statusB
          : statusB - statusA;
      }

      return 0;
    });
  }, [projects, selectedTag, sortConfig]);

  return (
    <div className="content-wrapper">
      <div className="content-area">
        <AboutContent />
        <ProjectList
          projects={filteredProjects}
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
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
