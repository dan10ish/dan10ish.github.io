"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import { Eye, Heart, Github, Star } from "lucide-react";
import { getStats, incrementStat, subscribeToStats } from "@/lib/supabase";

const ThemeInitializer = () => {
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = savedTheme || (prefersDark ? "dark" : "light");

      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);

      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.content =
          theme === "dark"
            ? "#212121"
            : theme === "light"
            ? "#ffffff"
            : "#00212b";
      }
    };

    initializeTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        initializeTheme();
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return null;
};

const REPO_URL = "https://github.com/dan10ish/dan10ish.github.io";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [stars, setStars] = useState(0);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setCurrentTheme(theme);
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

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content =
        theme === "dark"
          ? "#212121"
          : theme === "light"
          ? "#ffffff"
          : "#00212b";
    }
  };

  return (
    <>
      <ThemeInitializer />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-row">
            <div className="stats-cards">
              <div
                className={`stat-card views-card ${
                  isUpdating ? "updating" : ""
                }`}
                title={`${stats.views} total visits`}
              >
                <Eye size={18} />
                <span>{formatNumber(stats.views)}</span>
              </div>

              {blogSlug && (
                <div
                  className={`stat-card likes-card ${
                    isUpdating ? "updating" : ""
                  }`}
                  title={`${stats.likes} likes`}
                >
                  <button
                    onClick={handleLike}
                    className={`like-button ${hasLiked ? "liked" : ""}`}
                    disabled={hasLiked || isUpdating}
                    aria-label={hasLiked ? "Already liked" : "Like this post"}
                  >
                    <Heart
                      size={18}
                      className={hasLiked ? "fill-current" : ""}
                    />
                    <span>{formatNumber(stats.likes)}</span>
                  </button>
                </div>
              )}
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
                  <span>{blogSlug ? "View Source" : "View Source"}</span>
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
          </div>

          <div className="footer-row">
            <div className="copyright">
              Danish (
              <a
                href="https://x.com/dan10ish"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="copyright-symbol">@</span>dan10ish
              </a>
              )
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
                style={{ background: "#212121" }}
                aria-label="Dark theme"
              />
              <button
                onClick={() => changeTheme("solarized-dark")}
                className={`theme-circle ${
                  currentTheme === "solarized-dark" ? "active" : ""
                }`}
                style={{ background: "#00212b" }}
                aria-label="Solarized dark theme"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default memo(Footer);