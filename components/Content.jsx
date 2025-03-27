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
                overflow: 'visible', 
                transform: 'rotate(20deg)',
                transformOrigin: 'center'
              }}
            >
              <motion.path
                d="M38.9597 60.2674C38.9597 55.958 37.0563 50.901 38.9597 59.4103C39.8864 63.5529 41.7668 68.3769 41.1024 72.695C40.8075 74.6121 35.0267 66.43 34.5519 65.7772"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M20.7363 61.3694C15.9756 59.1821 -0.556578 56.6728 2.79887 48.452C6.56076 39.2354 20.5475 31.4635 28.6948 27.0863C38.6332 21.7468 52.8093 16.4012 64.1411 20.5358C87.8107 29.172 47.3544 70.282 41.1837 77.2865C27.9475 92.3114 33.8566 85.8752 20.7363 101"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d="M83.0024 41.2059C83.0024 40.0944 83.152 38.87 82.9691 37.7725C82.9182 37.4676 82.3189 41.3805 82.269 41.9392C82.0296 44.6216 81.5329 47.265 81.2357 49.9393C80.9894 52.1559 81.6654 45.4986 81.8024 43.2726C81.8895 41.8563 82.7109 29.7019 85.4691 33.8392C88.2016 37.938 90.7203 42.1532 93.8025 46.0059"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.path
                d="M80.6024 47.8059C77.1375 48.1209 80.0969 47.054 82.069 45.7393C86.2306 42.9649 90.3054 39.9673 95.0025 38.2059"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.path
                d="M97.4025 32.8058C97.4025 30.2806 98.6214 37.7075 99.1692 40.1726C99.4537 41.4532 97.9127 37.8613 97.4358 36.6392C97.2388 36.1343 95.1432 30.6725 96.3358 30.6725C99.5146 30.6725 103.658 32.6252 106.736 33.4058C107.294 33.5473 113.824 35.781 113.169 34.4725C111.641 31.4168 109.951 28.7449 108.869 25.4391C108.441 24.1305 106.512 20.8879 108.803 22.6058"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1.4 }}
              />
              <motion.path
                d="M116.603 21.4057C113.937 18.7401 119.514 27.1783 120.103 28.1725C121.895 31.1969 119.227 26.3493 119.003 25.0058"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.path
                d="M135.803 10.0056C132.143 10.2089 127.954 15.5222 126.003 18.2723C122.835 22.7362 133.284 21.0115 135.136 20.8057C135.402 20.7761 138.897 20.1241 138.736 20.6057C138.107 22.4946 135.014 24.6226 133.636 25.9391C131.44 28.0376 129.15 29.831 126.603 31.4725C124.775 32.65 127.409 31.7753 128.003 31.6058"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.0 }}
              />
              <motion.path
                d="M146.603 8.20561C144.167 8.20561 144.003 7.43112 145.403 10.2723C145.964 11.411 149.822 19.3349 148.403 17.2057"
                stroke="rgba(var(--color-text-rgb), 0.6)"
                strokeWidth="2.75"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 2.4 }}
              />
              <motion.path
                d="M146.603 14.2057C144.261 13.9455 145.583 12.7893 146.703 12.0057C149.096 10.3302 156.903 7.23698 157.303 4.03894C157.48 2.62293 154.134 0.693039 155.87 2.93893C158.387 6.19624 160.525 9.23037 162.203 13.0057"
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
  )
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
              prev === null ? 0 : Math.min(prev + 1, projects.length - 1)
            );
            break;
          case "ArrowUp":
            e.preventDefault();
            setSelectedRowIndex((prev) =>
              prev === null ? projects.length - 1 : Math.max(prev - 1, 0)
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
  }
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
