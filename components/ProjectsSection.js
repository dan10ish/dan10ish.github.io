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
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  const dragRef = useRef({
    isMouseDown: false,
    startX: 0,
    scrollLeft: 0,
    lastPageX: 0,
    velocity: 0,
    lastTimestamp: 0,
  });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const smallDeviceMediaQuery = window.matchMedia("(max-width: 768px)");

    setIsDarkMode(darkModeMediaQuery.matches);
    setIsSmallDevice(smallDeviceMediaQuery.matches);

    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    const handleDeviceSizeChange = (e) => setIsSmallDevice(e.matches);

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
    smallDeviceMediaQuery.addEventListener("change", handleDeviceSizeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      smallDeviceMediaQuery.removeEventListener(
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
        setCardWidth(firstCard.offsetWidth + 12);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const handleScroll = () => {
      if (!isScrolling) {
        const scrollLeft = scrollContainer.scrollLeft;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateCardWidth);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [cardWidth, isScrolling]);

  const scrollToCard = useCallback(
    (index) => {
      if (scrollContainerRef.current && cardWidth) {
        setIsScrolling(true);
        const maxScroll =
          scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth;
        const targetScroll = Math.min(index * cardWidth, maxScroll);

        scrollContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });

        setActiveIndex(index);

        setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    },
    [cardWidth]
  );

  const handleMouseDown = (e) => {
    const drag = dragRef.current;
    drag.isMouseDown = true;
    drag.startX = e.pageX - scrollContainerRef.current.offsetLeft;
    drag.scrollLeft = scrollContainerRef.current.scrollLeft;
    drag.lastPageX = e.pageX;
    drag.lastTimestamp = performance.now();
    drag.velocity = 0;

    setIsDragging(true);
    document.body.classList.add("is-dragging");
  };

  const handleMouseLeave = () => {
    endDrag();
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const endDrag = () => {
    const drag = dragRef.current;
    drag.isMouseDown = false;
    setIsDragging(false);
    document.body.classList.remove("is-dragging");

    if (isSmallDevice) {
      snapToNearestCard();
    } else {
      // Apply momentum scrolling for larger devices
      const decay = 0.95;
      const animate = () => {
        drag.velocity *= decay;
        if (Math.abs(drag.velocity) > 0.5) {
          scrollContainerRef.current.scrollLeft += drag.velocity;
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  };

  const handleMouseMove = (e) => {
    const drag = dragRef.current;
    if (!drag.isMouseDown) return;
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - drag.startX) * 2;
    const newScrollLeft = drag.scrollLeft - walk;
    scrollContainerRef.current.scrollLeft = newScrollLeft;

    const now = performance.now();
    const dt = now - drag.lastTimestamp;
    const dx = e.pageX - drag.lastPageX;
    drag.velocity = (dx / dt) * 16.67; // Scaled for 60fps

    drag.lastPageX = e.pageX;
    drag.lastTimestamp = now;
  };

  const snapToNearestCard = () => {
    if (scrollContainerRef.current && isSmallDevice) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const nearestCardIndex = Math.round(scrollLeft / cardWidth);
      scrollToCard(nearestCardIndex);
    }
  };

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div
        className="projects-container"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>
      <div className="card-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`card-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => scrollToCard(index)}
            aria-label={`Go to project ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
