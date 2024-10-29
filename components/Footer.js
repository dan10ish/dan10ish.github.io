"use client";

import React, { useState, useEffect, memo } from "react";
import {
  Eye,
  Heart,
  Github,
  CloudRain,
  Cloud,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import { getStats, incrementStat } from "@/lib/supabase";

const LOCATION = {
  city: "Mumbai",
  timezone: "Asia/Kolkata",
};

const REPO_URL = "https://github.com/dan10ish/dan10ish.github.io";

const WeatherIcon = memo(({ type, isNight }) => {
  if (isNight) return <Moon size={18} />;
  switch (type) {
    case "rainy":
      return <CloudRain size={18} />;
    case "cloudy":
      return <Cloud size={18} />;
    default:
      return <Sun size={18} />;
  }
});

WeatherIcon.displayName = "WeatherIcon";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [hasLiked, setHasLiked] = useState(false);
  const [weather] = useState({ type: "sunny", temp: 25 });
  const [time, setTime] = useState("");
  const [stars, setStars] = useState(0);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isNight, setIsNight] = useState(false);

  // Initialize stats immediately from localStorage
  useEffect(() => {
    const pageId = blogSlug ? `post-${blogSlug}` : "home";
    const cachedStats = localStorage.getItem(`stats-${pageId}`);
    if (cachedStats) {
      setStats(JSON.parse(cachedStats));
    }

    if (blogSlug) {
      const hasLiked = localStorage.getItem(`liked-${blogSlug}`);
      setHasLiked(!!hasLiked);
    }
  }, [blogSlug]);

  // Then fetch and update from server
  useEffect(() => {
    const initializeStats = async () => {
      const pageId = blogSlug ? `post-${blogSlug}` : "home";
      const viewedKey = `viewed-${pageId}-${new Date().toDateString()}`;

      try {
        // Get current stats
        const currentStats = await getStats(pageId);
        setStats(currentStats);

        // Increment view if not viewed today
        if (!sessionStorage.getItem(viewedKey)) {
          const updatedStats = await incrementStat(pageId, "views");
          if (updatedStats) {
            setStats(updatedStats);
            sessionStorage.setItem(viewedKey, "true");
          }
        }
      } catch (error) {
        console.error("Error initializing stats:", error);
      }
    };

    initializeStats();
  }, [blogSlug]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setIsNight(now.getHours() >= 18 || now.getHours() < 6);
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: LOCATION.timezone,
        }).format(now)
      );
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (!blogSlug) {
      const cachedStars = localStorage.getItem("github-stars");
      if (cachedStars) {
        setStars(JSON.parse(cachedStars));
      }

      fetch("https://api.github.com/repos/dan10ish/dan10ish.github.io")
        .then((res) => res.json())
        .then((data) => {
          if (data?.stargazers_count) {
            setStars(data.stargazers_count);
            localStorage.setItem(
              "github-stars",
              JSON.stringify(data.stargazers_count)
            );
          }
        })
        .catch(console.error);
    }
  }, [blogSlug]);

  const handleLike = async () => {
    if (hasLiked || !blogSlug) return;

    try {
      const pageId = `post-${blogSlug}`;
      setHasLiked(true);
      setStats((prev) => ({ ...prev, likes: prev.likes + 1 }));
      localStorage.setItem(`liked-${blogSlug}`, "true");

      const updatedStats = await incrementStat(pageId, "likes");
      if (updatedStats) {
        setStats(updatedStats);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="stats-cards">
          <div
            className="stat-card views-card"
            title={`${stats.views} total visits`}
          >
            <Eye size={18} />
            <span>{formatNumber(stats.views)}</span>
          </div>

          {blogSlug && (
            <div
              className="stat-card likes-card"
              title={`${stats.likes} likes`}
            >
              <button
                onClick={handleLike}
                className={`like-button ${hasLiked ? "liked" : ""}`}
                disabled={hasLiked}
                aria-label={hasLiked ? "Already liked" : "Like this post"}
              >
                <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                <span>{formatNumber(stats.likes)}</span>
              </button>
            </div>
          )}

          {!blogSlug && (
            <div
              className="stat-card weather-time-card"
              title={`Local time in ${LOCATION.city}`}
            >
              <WeatherIcon type={weather.type} isNight={isNight} />
              <span>
                {Math.round(weather.temp)}° • {LOCATION.city} • {time}
              </span>
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
