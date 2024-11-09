"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import { Eye, Heart, Github, Star } from "lucide-react";
import { getStats, incrementStat, subscribeToStats } from "@/lib/supabase";

const REPO_URL = "https://github.com/dan10ish/dan10ish.github.io";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [stars, setStars] = useState(0);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Always ensure meta theme-color exists and is correct
    const meta = document.querySelector('meta[name="theme-color"]');
    const color = savedTheme === "dark" ? "#000000" : "#ffffff";

    if (meta) {
      meta.content = color;
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "theme-color";
      newMeta.content = color;
      document.head.appendChild(newMeta);
    }
  }, []);

  useEffect(() => {
    const pageId = blogSlug ? `post-${blogSlug}` : "home";
    if (blogSlug) {
      const likedKey = `liked-${pageId}`;
      setHasLiked(!!sessionStorage.getItem(likedKey));
    }

    const initializeStats = async () => {
      try {
        const initialStats = await getStats(pageId);
        setStats(initialStats);
        const viewedKey = `viewed-${pageId}-${new Date().toDateString()}`;
        if (!sessionStorage.getItem(viewedKey)) {
          setIsUpdating(true);
          const updatedStats = await incrementStat(pageId, "views");
          if (updatedStats) {
            setStats(updatedStats);
            sessionStorage.setItem(viewedKey, "true");
          }
          setIsUpdating(false);
        }
      } catch (error) {
        console.error("Error initializing stats:", error);
        setIsUpdating(false);
      }
    };

    const unsubscribe = subscribeToStats(pageId, (newStats) => {
      if (!isUpdating) setStats(newStats);
    });

    initializeStats();
    return () => unsubscribe();
  }, [blogSlug, isUpdating]);

  useEffect(() => {
    if (!blogSlug) {
      const cachedStars = sessionStorage.getItem("github-stars");
      const cacheTime = sessionStorage.getItem("github-stars-time");
      const now = Date.now();

      if (cachedStars && cacheTime && now - parseInt(cacheTime) < 3600000) {
        setStars(parseInt(cachedStars));
        return;
      }

      fetch("https://api.github.com/repos/dan10ish/dan10ish.github.io")
        .then((res) => res.json())
        .then((data) => {
          if (data?.stargazers_count) {
            setStars(data.stargazers_count);
            sessionStorage.setItem(
              "github-stars",
              data.stargazers_count.toString()
            );
            sessionStorage.setItem("github-stars-time", now.toString());
          }
        })
        .catch(console.error);
    }
  }, [blogSlug]);

  const handleLike = useCallback(async () => {
    if (hasLiked || !blogSlug || isUpdating) return;
    try {
      const pageId = `post-${blogSlug}`;
      setIsUpdating(true);
      setHasLiked(true);
      const updatedStats = await incrementStat(pageId, "likes");
      if (updatedStats) {
        setStats(updatedStats);
        sessionStorage.setItem(`liked-${pageId}`, "true");
      } else {
        setHasLiked(false);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      setHasLiked(false);
    } finally {
      setIsUpdating(false);
    }
  }, [blogSlug, hasLiked, isUpdating]);

  const formatNumber = useCallback((num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  }, []);

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update meta theme-color
    const color = theme === "dark" ? "#000000" : "#ffffff";
    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.content = color;
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "theme-color";
      newMeta.content = color;
      document.head.appendChild(newMeta);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="stats-cards">
          <div
            className={`stat-card views-card ${isUpdating ? "updating" : ""}`}
            title={`${stats.views} total visits`}
          >
            <Eye size={18} />
            <span>{formatNumber(stats.views)}</span>
          </div>

          {blogSlug && (
            <div
              className={`stat-card likes-card ${isUpdating ? "updating" : ""}`}
              title={`${stats.likes} likes`}
            >
              <button
                onClick={handleLike}
                className={`like-button ${hasLiked ? "liked" : ""}`}
                disabled={hasLiked || isUpdating}
                aria-label={hasLiked ? "Already liked" : "Like this post"}
              >
                <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                <span>{formatNumber(stats.likes)}</span>
              </button>
            </div>
          )}
        </div>

        <div className="theme-circles">
          <button
            onClick={() => changeTheme("light")}
            className={`theme-circle ${
              currentTheme === "light" ? "active" : ""
            }`}
            style={{ background: "#ffffff" }}
            aria-label="Light theme"
          />
          <button
            onClick={() => changeTheme("dark")}
            className={`theme-circle ${
              currentTheme === "dark" ? "active" : ""
            }`}
            style={{ background: "#000000" }}
            aria-label="Dark theme"
          />
        </div>

        <div className="github-card-container">
          <a
            href={
              blogSlug
                ? `${REPO_URL}/blob/main/content/blog/${blogSlug}.md`
                : REPO_URL
            }
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
          >
            <div className="github-button-content">
              <Github size={16} />
              <span>{blogSlug ? "View Source" : "View on GitHub"}</span>
            </div>
            {!blogSlug && (
              <div className="github-stars">
                <Star
                  size={16}
                  className={isGithubHovered ? "star-hover" : ""}
                />
                <span>{stars}</span>
              </div>
            )}
          </a>
        </div>

        <div className="copyright">
          <span className="copyright-symbol">©</span> {new Date().getFullYear()}{" "}
          Danish
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
