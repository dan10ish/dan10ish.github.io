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
} from "lucide-react";
import Link from "next/link";
import ScrollIndicator from "./ScrollIndicator";
import ProjectModal from "./ProjectModal";
import KeyboardIcon from "./KeyboardIcon";
import { motion } from "framer-motion";

const LucideIcon = memo(({ icon: Icon, ...props }) => (
  <Icon strokeWidth="var(--icon-stroke-width)" {...props} />
));

LucideIcon.displayName = "LucideIcon";

const XIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 22 25" fill="currentColor">
    <path d="M21.8518 22.4638L14.0268 10.1663L21.7481 1.6725C21.9227 1.47566 22.0127 1.21791 21.9986 0.955153C21.9844 0.692393 21.8673 0.445794 21.6725 0.26882C21.4778 0.0918457 21.2212 -0.0012398 20.9583 0.00974476C20.6953 0.0207293 20.4474 0.134898 20.2681 0.3275L12.9131 8.4175L7.85181 0.46375C7.76156 0.321693 7.63692 0.204713 7.48942 0.123647C7.34193 0.0425814 7.17637 5.21628e-05 7.00806 1.18294e-07H1.00806C0.828765 -8.70794e-05 0.652741 0.0480342 0.498423 0.139325C0.344105 0.230615 0.217171 0.361717 0.13091 0.518902C0.0446503 0.676088 0.00223821 0.853574 0.00811486 1.03278C0.0139915 1.21198 0.0679408 1.3863 0.164314 1.5375L7.98931 13.8337L0.268064 22.3337C0.177897 22.4306 0.107851 22.5444 0.061986 22.6685C0.0161206 22.7927 -0.00465234 22.9247 0.000871701 23.0569C0.00639575 23.1891 0.038107 23.3189 0.0941668 23.4388C0.150227 23.5586 0.22952 23.6662 0.327452 23.7552C0.425384 23.8442 0.540006 23.9129 0.664675 23.9572C0.789344 24.0016 0.921581 24.0208 1.05372 24.0137C1.18586 24.0066 1.31528 23.9733 1.43446 23.9158C1.55365 23.8583 1.66025 23.7777 1.74806 23.6787L9.10306 15.5888L14.1643 23.5425C14.2553 23.6834 14.3803 23.7991 14.5277 23.8791C14.6752 23.959 14.8403 24.0006 15.0081 24H21.0081C21.1872 23.9999 21.363 23.9518 21.5171 23.8606C21.6712 23.7693 21.798 23.6384 21.8843 23.4814C21.9705 23.3244 22.013 23.1472 22.0072 22.9681C22.0015 22.7891 21.9479 22.6149 21.8518 22.4638ZM15.5568 22L2.82931 2H6.45431L19.1868 22H15.5568Z" />
  </svg>
));
XIcon.displayName = "XIcon";

const InstagramIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" />
  </svg>
));
InstagramIcon.displayName = "InstagramIcon";

const LinkedInIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z" />
  </svg>
));
LinkedInIcon.displayName = "LinkedInIcon";

const ThreadsIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 21 26" fill="currentColor">
    <path d="M18.3025 12.4563C17.8686 12.1296 17.4024 11.8482 16.9112 11.6163C16.4112 7.88 13.9113 6.7025 12.7738 6.3575C10.3013 5.6075 7.46 6.50625 6.1675 8.445C6.09462 8.55433 6.04398 8.67694 6.01848 8.80583C5.99298 8.93473 5.99312 9.06738 6.01889 9.19622C6.07093 9.45643 6.22421 9.68531 6.445 9.8325C6.66579 9.9797 6.93602 10.0332 7.19622 9.98111C7.32506 9.95534 7.44757 9.90445 7.55674 9.83134C7.66591 9.75822 7.75962 9.66433 7.8325 9.555C8.62875 8.36 10.5825 7.785 12.1938 8.27125C13.4375 8.64625 14.2962 9.55875 14.7125 10.8962C14.0825 10.7763 13.4426 10.7165 12.8013 10.7175C11.0613 10.7175 9.4325 11.1662 8.2175 11.98C6.7875 12.9462 6 14.375 6 16C6 18.5725 7.9825 20.44 10.7137 20.44C11.5169 20.4345 12.3108 20.2679 13.0484 19.9499C13.7859 19.6319 14.4521 19.169 15.0075 18.5888C15.8125 17.7513 16.7575 16.2938 16.9587 13.9513C17.0062 13.9838 17.0513 14.0175 17.0963 14.0513C18.36 15.0063 19 16.335 19 18C19 20.42 16.4575 24 11 24C7.65875 24 5.315 22.9187 3.8325 20.695C2.61625 18.875 2 16.2825 2 13C2 9.7175 2.61625 7.125 3.8325 5.305C5.315 3.08125 7.65875 2 11 2C15.1163 2 17.75 3.65625 19.0662 7.065C19.1124 7.18896 19.1827 7.30254 19.273 7.39915C19.3634 7.49577 19.472 7.5735 19.5926 7.62785C19.7131 7.68219 19.8433 7.71208 19.9755 7.71577C20.1078 7.71946 20.2394 7.69688 20.3628 7.64934C20.4863 7.6018 20.599 7.53025 20.6946 7.43882C20.7902 7.3474 20.8667 7.23792 20.9197 7.11672C20.9727 6.99552 21.0011 6.86502 21.0033 6.73277C21.0055 6.60051 20.9814 6.46914 20.9325 6.34625C19.335 2.195 15.9 0 11 0C7 0 4.02375 1.41125 2.1675 4.195C0.72875 6.35375 0 9.315 0 13C0 16.685 0.72875 19.6463 2.1675 21.805C4.02375 24.5888 7 26 11 26C14.7587 26 17.1125 24.565 18.425 23.3625C20.0375 21.885 21 19.875 21 18C21 15.7075 20.0675 13.79 18.3025 12.4563ZM13.5662 17.2062C13.1977 17.5928 12.7554 17.9015 12.2654 18.1141C11.7755 18.3267 11.2478 18.4388 10.7137 18.4438C9.3625 18.4438 8 17.6937 8 16.0037C8 14.425 9.5 12.7275 12.8013 12.7275C13.5447 12.7255 14.2847 12.8273 15 13.03C15 14.79 14.5 16.2325 13.5662 17.2025V17.2062Z" />
  </svg>
));
ThreadsIcon.displayName = "ThreadsIcon";

const SnapchatIcon = memo(({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 23" fill="currentColor">
    <path d="M5.82877 3.833C5.22877 5.177 5.46577 7.585 5.56177 9.269C4.91377 9.628 4.08177 8.998 3.61077 8.998C3.12077 8.998 2.53577 9.32 2.44377 9.8C2.37777 10.146 2.53277 10.65 3.64477 11.089C4.07477 11.259 5.09777 11.459 5.33477 12.017C5.66777 12.801 3.62477 16.42 0.416768 16.948C0.165768 16.989 -0.0132325 17.213 0.000767532 17.467C0.0567675 18.442 2.24277 18.824 3.21177 18.974C3.31077 19.108 3.39077 19.674 3.51777 20.105C3.57477 20.298 3.72177 20.529 4.09977 20.529C4.59277 20.529 5.41177 20.149 6.83777 20.385C8.23577 20.618 9.54977 22.6 12.0728 22.6C14.4178 22.6 15.8168 20.609 17.1628 20.385C17.9418 20.256 18.6108 20.297 19.3588 20.443C19.8738 20.544 20.3358 20.6 20.4828 20.094C20.6118 19.657 20.6908 19.102 20.7878 18.971C21.7478 18.822 23.9438 18.441 23.9988 17.466C24.0128 17.212 23.8338 16.989 23.5828 16.947C20.4288 16.427 18.3238 12.819 18.6648 12.016C18.9008 11.459 19.9168 11.261 20.3548 11.088C21.1688 10.767 21.5768 10.372 21.5678 9.915C21.5568 9.33 20.8528 8.981 20.3348 8.981C19.8078 8.981 19.0508 9.605 18.4378 9.267C18.5338 7.569 18.7698 5.172 18.1708 3.829C17.0358 1.286 14.5108 0 11.9868 0C9.47877 0 6.97277 1.268 5.82877 3.833Z" />
  </svg>
));
SnapchatIcon.displayName = "SnapchatIcon";

const AboutContent = memo(() => {
  const email = "aansaridan@gmail.com";

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <span className="name">
            <motion.svg
              width="95"
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
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M64.4263 16.6339C63.5779 13.1557 60.7209 13.3335 58.7303 16.281C56.2311 19.9818 60.731 23.8048 63.4433 20.4144C64.3358 19.2988 64.2834 14.046 64.4515 16.7347C64.6565 20.0151 67.8321 24.0413 70.6767 20.1623C71.5016 19.0374 71.7571 14.7004 71.332 16.029C71.1337 16.6487 71.8339 20.2254 71.9369 20.1371C73.0086 19.2185 74.565 13.0333 77.0783 14.29C78.3705 14.936 79.0368 19.2757 79.3971 20.7168"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.path
                d="M82.5726 14.8192C82.5726 13.3223 82.7558 15.8654 82.8247 16.1801C83.1276 17.5649 83.4193 18.9774 83.9336 20.2631"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.path
                d="M84.3873 7.56058C83.5393 6.71263 83.0281 6.05144 83.9336 7.56058"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.4 }}
              />
              <motion.path
                d="M91.9923 13.1211C91.9923 11.922 91.0266 11.6815 90.0769 12.4154C87.059 14.7474 88.1454 16.693 91.2614 18.061C93.68 19.1228 94.9167 19.8991 91.7655 21.2618C88.1505 22.825 87.0855 22.3312 88.8001 20.6166"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.path
                d="M98.1349 1C97.0711 4.44473 96.6171 9.76923 97.38 13.2566C97.5036 13.8217 98.3063 21.7286 99.6349 21C100.481 20.5359 106.046 10.6826 106.68 14.0631C107.137 16.5018 106.893 20.357 109.427 21.6241"
                stroke="rgba(var(--color-text-rgb), 0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 2.2 }}
              />
            </motion.svg>
          </span>
          <div className="contact-info">
            <a href="https://github.com/dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub">
              <LucideIcon icon={Github} size={20} />
            </a>
            <a href="https://x.com/dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="X">
              <XIcon size={20} />
            </a>
            <a href="https://instagram.com/dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://linkedin.com/in/dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="LinkedIn">
              <LinkedInIcon size={20} />
            </a>
            <a href="https://threads.net/@dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Threads">
              <ThreadsIcon size={20} />
            </a>
            <a href="https://snapchat.com/add/dan10ish" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Snapchat">
              <SnapchatIcon size={20} />
            </a>
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Email">
              <LucideIcon icon={Mail} size={20} />
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

/* ─────────────── Blog List ─────────────── */

const BlogListItem = memo(({ blog, isSelected }) => (
  <Link
    href={`/blog/${blog.slug}`}
    className={`list-row blog-row ${isSelected ? "selected" : ""}`}
    prefetch={true}
  >
    <span className="title">
      <div>{blog.title}</div>
    </span>
    <span className="tags">
      {blog.tags.slice(0, 1).map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </span>
    <span className="blog-year">
      {blog.date ? new Date(blog.date + "T00:00:00").getFullYear() : ""}
    </span>
  </Link>
));

BlogListItem.displayName = "BlogListItem";

const BlogList = memo(({ blogs, handleSort, sortConfig }) => {
  const tableRef = useRef(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (blogs.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedRowIndex((prev) =>
            prev === null ? 0 : Math.min(prev + 1, blogs.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedRowIndex((prev) =>
            prev === null ? blogs.length - 1 : Math.max(prev - 1, 0),
          );
          break;
        case "Enter":
          if (selectedRowIndex !== null) {
            window.location.href = `/blog/${blogs[selectedRowIndex].slug}`;
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
  }, [selectedRowIndex, blogs]);

  return (
    <div className="mono-list blog-list">
      <div className="list-header blog-list-header">
        <span
          onClick={() => handleSort("title")}
          style={{ cursor: "pointer" }}
        >
          title <SortIcon columnKey="title" sortConfig={sortConfig} />
        </span>
        <span
          className="tags"
          onClick={() => handleSort("tags")}
          style={{ cursor: "pointer" }}
        >
          tags <SortIcon columnKey="tags" sortConfig={sortConfig} />
        </span>
        <span
          className="blog-year"
          onClick={() => handleSort("date")}
          style={{ cursor: "pointer" }}
        >
          year <SortIcon columnKey="date" sortConfig={sortConfig} />
        </span>
      </div>
      <div className="table-max" ref={tableRef}>
        {blogs.map((blog, index) => (
          <BlogListItem
            key={blog.slug}
            blog={blog}
            isSelected={index === selectedRowIndex}
          />
        ))}
      </div>
      <ScrollIndicator containerRef={tableRef} />
    </div>
  );
});

BlogList.displayName = "BlogList";

/* ─────────────── Project List ─────────────── */

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
          className={`action-link github ${!project.sourceLink ? "disabled" : ""
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
          className={`action-link globe ${!project.projectLink ? "disabled" : ""
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

/* ─────────────── Tabs ─────────────── */

const TABS = [
  { id: "microblogs", label: "Microblogs" },
  { id: "projects", label: "Projects" },
];

const TabBar = memo(({ activeTab, onTabChange }) => (
  <div className="tab-bar">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
        onClick={() => onTabChange(tab.id)}
      >
        {activeTab === tab.id && (
          <motion.div
            className="tab-indicator"
            layoutId="tab-indicator"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 6,
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
      </button>
    ))}
  </div>
));

TabBar.displayName = "TabBar";

/* ─────────────── Main Content ─────────────── */

const Content = memo(({ projects, blogs }) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash === "projects") return "projects";
    }
    return "microblogs";
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSortConfig({ key: null, direction: null });
    setSelectedTag(null);
    window.history.replaceState(null, "", `#${tab}`);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "projects" || hash === "microblogs") {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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

  const sortedBlogs = useMemo(() => {
    if (!sortConfig?.key) return blogs;

    return [...blogs].sort((a, b) => {
      if (sortConfig.key === "title") {
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }
      if (sortConfig.key === "tags") {
        const tagsA = a.tags.join(",");
        const tagsB = b.tags.join(",");
        return sortConfig.direction === "asc"
          ? tagsA.localeCompare(tagsB)
          : tagsB.localeCompare(tagsA);
      }
      return 0;
    });
  }, [blogs, sortConfig]);

  return (
    <div className="content-wrapper">
      <div className="content-area">
        <AboutContent />
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === "microblogs" ? (
          <BlogList
            blogs={sortedBlogs}
            handleSort={handleSort}
            sortConfig={sortConfig}
          />
        ) : (
          <ProjectList
            projects={filteredProjects}
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
        )}
      </div>
      <KeyboardIcon />
    </div>
  );
});

Content.displayName = "Content";

export default function ContentWrapper({ projects, blogs }) {
  return (
    <Suspense fallback={null}>
      <Content projects={projects} blogs={blogs} />
    </Suspense>
  );
}

