"use client";

import { useState, useEffect } from "react";
import { Star, Github } from "lucide-react";

export default function StarButton() {
  const [stars, setStars] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const repoUrl = "https://github.com/dan10ish/dan10ish.github.io";

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/dan10ish/dan10ish.github.io"
        );
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching stars:", error);
        setStars(0);
      }
    };

    fetchStars();
  }, []);

  return (
    <div className="github-button-container">
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="github-main-button"
        aria-label="View on GitHub"
      >
        <Github size={16} className="github-icon" />
        <span className="github-text">View on GitHub</span>
      </a>
      <a
        href={`${repoUrl}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="github-star-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Star on GitHub"
      >
        <Star
          size={16}
          className={`star-icon ${isHovered ? "star-hover" : ""}`}
        />
        {stars !== null && (
          <span className="star-count">{stars.toLocaleString()}</span>
        )}
      </a>
    </div>
  );
}
