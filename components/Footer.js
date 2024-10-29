"use client";

import React, { useState, useEffect } from "react";
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

const LOCATION = {
  city: "Mumbai",
  timezone: "Asia/Kolkata",
};
const REPO_URL = "https://github.com/dan10ish/dan10ish.github.io";

const WeatherIcon = ({ type, isNight }) => {
  if (isNight) return <Moon size={18} />;
  switch (type) {
    case "rainy":
      return <CloudRain size={18} />;
    case "cloudy":
      return <Cloud size={18} />;
    default:
      return <Sun size={18} />;
  }
};

const Footer = ({ blogSlug = null }) => {
  const [visits, setVisits] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [weather, setWeather] = useState({ type: "sunny", temp: 25 });
  const [time, setTime] = useState("");
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const initializeCounters = async () => {
      try {
        const pageId = blogSlug ? `post-${blogSlug}` : "home";

        // Get initial stats
        const res = await fetch(`/api/stats?id=${pageId}`);
        const data = await res.json();
        setVisits(data.views || 0);

        if (blogSlug) {
          setLikes(data.likes || 0);
          const hasLiked = localStorage.getItem(`liked-${blogSlug}`);
          setHasLiked(!!hasLiked);
        }

        // Increment view count only if not viewed in this session
        const viewedKey = `viewed-${pageId}`;
        if (!sessionStorage.getItem(viewedKey)) {
          await fetch("/api/stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: pageId, type: "view" }),
          });
          sessionStorage.setItem(viewedKey, "true");
        }
      } catch (error) {
        console.error("Error initializing counters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCounters();
  }, [blogSlug]);

  useEffect(() => {
    const fetchStars = async () => {
      if (blogSlug) return;

      try {
        const response = await fetch(
          "https://api.github.com/repos/dan10ish/dan10ish.github.io"
        );
        const data = await response.json();
        if (data?.stargazers_count) setStars(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching stars:", error);
      }
    };

    fetchStars();
  }, [blogSlug]);

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

  const handleLike = async () => {
    if (hasLiked || !blogSlug) return;

    try {
      const pageId = `post-${blogSlug}`;
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pageId, type: "like" }),
      });
      const data = await res.json();
      setLikes(data.likes);
      setHasLiked(true);
      localStorage.setItem(`liked-${blogSlug}`, "true");
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

  if (isLoading) return null;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="stats-cards">
          <div
            className="stat-card views-card"
            title={`${visits} total visits`}
          >
            <Eye size={18} />
            <span>{formatNumber(visits)}</span>
          </div>

          {blogSlug && (
            <div className="stat-card likes-card" title={`${likes} likes`}>
              <button
                onClick={handleLike}
                className={`like-button ${hasLiked ? "liked" : ""}`}
                disabled={hasLiked}
                aria-label={hasLiked ? "Already liked" : "Like this post"}
              >
                <Heart size={18} className={hasLiked ? "fill-current" : ""} />
                <span>{formatNumber(likes)}</span>
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

export default Footer;
