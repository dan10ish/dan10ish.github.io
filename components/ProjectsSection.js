"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { getProjects } from "../lib/projects";

const ProjectCard = ({ project, isDarkMode }) => {
  const adjustGradient = (gradient) => {
    if (!isDarkMode) return gradient;

    const colors = gradient.match(/#[0-9A-Fa-f]{6}/g);
    if (!colors || colors.length !== 2) return gradient;

    const darkerColors = colors.map((color) => adjustColor(color, -30));
    return `linear-gradient(135deg, ${darkerColors[0]} 0%, ${darkerColors[1]} 100%)`;
  };

  const adjustColor = (hex, percent) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  };

  return (
    <div
      className="project-card"
      style={{ background: adjustGradient(project.gradient) }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        {project.sourceLink && (
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        )}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live
          </a>
        )}
      </div>
      <div className="project-tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = getProjects();
  const scrollContainerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  const dragState = useRef({
    isMouseDown: false,
    startX: 0,
    scrollLeft: 0,
  }).current;

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const largeDeviceMediaQuery = window.matchMedia("(min-width: 700px)");

    setIsDarkMode(darkModeMediaQuery.matches);
    setIsLargeDevice(largeDeviceMediaQuery.matches);

    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    const handleDeviceSizeChange = (e) => setIsLargeDevice(e.matches);

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
    largeDeviceMediaQuery.addEventListener("change", handleDeviceSizeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      largeDeviceMediaQuery.removeEventListener(
        "change",
        handleDeviceSizeChange
      );
    };
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const updateCardWidth = () => {
      const firstCard = scrollContainer.querySelector(".project-card");
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth + 20);
      }
    };

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsAtStart(scrollLeft <= 1);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    updateCardWidth();
    handleScroll();

    window.addEventListener("resize", updateCardWidth);
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollProjects = useCallback(
    (direction) => {
      if (scrollContainerRef.current && cardWidth) {
        const container = scrollContainerRef.current;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
        const newScrollLeft = container.scrollLeft + scrollAmount;

        container.scrollTo({
          left: Math.max(
            0,
            Math.min(
              newScrollLeft,
              container.scrollWidth - container.clientWidth
            )
          ),
          behavior: isLargeDevice ? "auto" : "smooth",
        });
      }
    },
    [cardWidth, isLargeDevice]
  );

  const handleMouseDown = (e) => {
    if (!isLargeDevice) return;
    dragState.isMouseDown = true;
    dragState.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    dragState.scrollLeft = scrollContainerRef.current.scrollLeft;
    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isLargeDevice || !dragState.isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragState.startX) * 2;
    const newScrollLeft = dragState.scrollLeft - walk;
    scrollContainerRef.current.scrollLeft = Math.max(
      0,
      Math.min(
        newScrollLeft,
        scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth
      )
    );
  };

  const handleMouseUp = () => {
    if (!isLargeDevice) return;
    dragState.isMouseDown = false;
    document.body.style.cursor = "default";
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div
        className={`projects-container ${isLargeDevice ? "draggable" : ""}`}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>
      <div className="projects-navigation">
        <button
          className={`nav-arrow left ${isAtStart ? "disabled" : ""}`}
          onClick={() => scrollProjects("left")}
          aria-label="Previous project"
          disabled={isAtStart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className={`nav-arrow right ${isAtEnd ? "disabled" : ""}`}
          onClick={() => scrollProjects("right")}
          aria-label="Next project"
          disabled={isAtEnd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
