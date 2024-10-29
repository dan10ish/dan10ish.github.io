"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
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
import { getStats, incrementStat, subscribeToStats } from "@/lib/supabase";

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
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize stats and set up real-time subscription
  useEffect(() => {
    const pageId = blogSlug ? `post-${blogSlug}` : "home";

    // Check if liked from session storage
    if (blogSlug) {
      const likedKey = `liked-${pageId}`;
      const hasLiked = sessionStorage.getItem(likedKey);
      setHasLiked(!!hasLiked);
    }

    const initializeStats = async () => {
      try {
        // Get initial stats
        const initialStats = await getStats(pageId);
        setStats(initialStats);

        // Check if viewed today
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

    // Set up real-time subscription
    const unsubscribe = subscribeToStats(pageId, (newStats) => {
      if (!isUpdating) {
        setStats(newStats);
      }
    });

    initializeStats();

    return () => {
      unsubscribe();
    };
  }, [blogSlug]);

  // Update time and night status
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsNight(hour >= 18 || hour < 6);

      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: LOCATION.timezone,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Fetch GitHub stars
  useEffect(() => {
    if (!blogSlug) {
      // Try to get cached stars first
      const cachedStars = sessionStorage.getItem("github-stars");
      const cacheTime = sessionStorage.getItem("github-stars-time");
      const now = Date.now();

      // Use cached stars if they're less than 1 hour old
      if (cachedStars && cacheTime && now - parseInt(cacheTime) < 3600000) {
        setStars(parseInt(cachedStars));
        return;
      }

      // Fetch fresh stars count
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
        // Revert if update failed
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
