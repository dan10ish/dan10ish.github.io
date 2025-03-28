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
              viewBox="0 0 111 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                overflow: "visible",
                transform: "rotate(0deg)",
                transformOrigin: "center",
                margin: "0 -5px",
              }}
            >
              <motion.path
                d="M23.6658 19.5568C24.184 18.3907 23.7076 16.8809 23.6658 18.6784C23.6143 20.8899 23.9127 23.2085 23.6383 25.4035C23.4632 26.8046 21.1091 20.9763 20.8934 20.545C19.4973 17.7527 11.743 11.8525 15.7604 9.07119C23.2034 3.91831 35.9047 3.41693 44.3624 5.5577C47.3218 6.30674 51.4936 7.83684 53.0364 10.773C55.0268 14.5612 50.8297 18.4111 48.0955 20.243C36.8401 27.7842 22.558 31.2353 10.0784 36.1635C7.07567 37.3493 4.1614 38.5262 1.02019 39.2653C0.82501 39.3112 2.1014 39.3202 2.4201 39.3202"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M64.4263 16.6339C63.5779 13.1557 60.7209 13.3335 58.7303 16.281C56.2311 19.9818 60.731 23.8048 63.4433 20.4144C64.3358 19.2988 64.2834 14.046 64.4515 16.7347C64.6565 20.0151 67.8321 24.0413 70.6767 20.1623C71.5016 19.0374 71.7571 14.7004 71.332 16.029C71.1337 16.6487 71.8339 20.2254 71.9369 20.1371C73.0086 19.2185 74.565 13.0333 77.0783 14.29C78.3705 14.936 79.0368 19.2757 79.3971 20.7168"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d="M82.5726 14.8192C82.5726 13.3223 82.7558 15.8654 82.8247 16.1801C83.1276 17.5649 83.4193 18.9774 83.9336 20.2631"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.path
                d="M84.3873 7.56058C83.5393 6.71263 83.0281 6.05144 83.9336 7.56058"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.4 }}
              />
              <motion.path
                d="M91.9923 13.1211C91.9923 11.922 91.0266 11.6815 90.0769 12.4154C87.059 14.7474 88.1454 16.693 91.2614 18.061C93.68 19.1228 94.9167 19.8991 91.7655 21.2618C88.1505 22.825 87.0855 22.3312 88.8001 20.6166"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.path
                d="M98.1349 1C97.0711 4.44473 96.6171 9.76923 97.38 13.2566C97.5036 13.8217 98.3063 21.7286 99.6349 21C100.481 20.5359 106.046 10.6826 106.68 14.0631C107.137 16.5018 106.893 20.357 109.427 21.6241"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.2 }}
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
