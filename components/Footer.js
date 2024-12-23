"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { Eye, Heart, Github, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: null, likes: null });
  const [hasLiked, setHasLiked] = useState(false);
  const [stars, setStars] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  useEffect(() => {
    const pageId = blogSlug ? `post-${blogSlug}` : "home";

    const cachedStats = window?.localStorage?.getItem(`stats-${pageId}`);
    if (cachedStats) {
      setStats(JSON.parse(cachedStats));
    } else {
      setStats({ views: null, likes: null });
    }

    if (blogSlug) {
      const likedKey = `liked-${pageId}`;
      setHasLiked(!!window?.sessionStorage?.getItem(likedKey));
    }

    const initializeStats = async () => {
      try {
        const { data, error } = await supabase
          .from("page_stats")
          .select("views, likes")
          .eq("id", pageId)
          .single();

        if (error && error.code !== "PGRST116") throw error;

        const result = data || { views: 0, likes: 0 };
        setStats(result);
        window?.localStorage?.setItem(
          `stats-${pageId}`,
          JSON.stringify(result),
        );

        const viewedKey = `viewed-${pageId}-${new Date().toDateString()}`;
        if (!window?.sessionStorage?.getItem(viewedKey)) {
          setIsUpdating(true);
          const { data: updated } = await supabase.rpc("increment_views", {
            row_id: pageId,
          });
          if (updated) {
            setStats(updated);
            window?.localStorage?.setItem(
              `stats-${pageId}`,
              JSON.stringify(updated),
            );
            window?.sessionStorage?.setItem(viewedKey, "true");
          }
          setIsUpdating(false);
        }
      } catch (error) {
        console.error("Error initializing stats:", error);
        setIsUpdating(false);
      }
    };

    const subscription = supabase
      .channel(`stats-${pageId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "page_stats",
          filter: `id=eq.${pageId}`,
        },
        (payload) => {
          if (!isUpdating) {
            setStats(payload.new);
            window?.localStorage?.setItem(
              `stats-${pageId}`,
              JSON.stringify(payload.new),
            );
          }
        },
      )
      .subscribe();

    initializeStats();

    if (!blogSlug) {
      const fetchStars = async () => {
        const cachedStars = window?.localStorage?.getItem("github-stars");
        const cacheTime = window?.localStorage?.getItem("github-stars-time");
        const now = Date.now();

        if (cachedStars && cacheTime && now - parseInt(cacheTime) < 3600000) {
          setStars(parseInt(cachedStars));
          return;
        }

        try {
          const res = await fetch(
            "https://api.github.com/repos/dan10ish/dan10ish.github.io",
          );
          const data = await res.json();
          if (data?.stargazers_count) {
            setStars(data.stargazers_count);
            window?.localStorage?.setItem(
              "github-stars",
              data.stargazers_count.toString(),
            );
            window?.localStorage?.setItem("github-stars-time", now.toString());
          }
        } catch (error) {
          console.error("Error fetching stars:", error);
        }
      };
      fetchStars();
    }

    return () => subscription.unsubscribe();
  }, [blogSlug, isUpdating]);

  const handleLike = useCallback(async () => {
    if (hasLiked || !blogSlug || isUpdating) return;

    try {
      const pageId = `post-${blogSlug}`;
      setIsUpdating(true);
      setHasLiked(true);

      const { data } = await supabase.rpc("increment_likes", {
        row_id: pageId,
      });

      if (data) {
        setStats(data);
        window?.localStorage?.setItem(`stats-${pageId}`, JSON.stringify(data));
        window?.sessionStorage?.setItem(`liked-${pageId}`, "true");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      setHasLiked(false);
    } finally {
      setIsUpdating(false);
    }
  }, [blogSlug, hasLiked, isUpdating]);

  const formatNumber = useCallback((num) => {
    if (num === null) return <span className="infinity-symbol">∞</span>;
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(2) + "K";
    return num;
  }, []);

  return (
    <footer className="footer">
      {!blogSlug && (
        <div className="footer-links">
          <div className="footer-links-group">
            <Link href="/notes">Notes</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/books">Books</Link>
            <Link href="/resources">Resources</Link>
          </div>
        </div>
      )}
      <div className="footer-content">
        <div className="footer-row">
          <div className="stats-cards">
            <div className="stat-card">
              <Eye size={18} />
              <span>{formatNumber(stats.views)}</span>
            </div>
            {blogSlug && (
              <div className="stat-card">
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
          <div className="github-card-container">
            <a
              href={
                blogSlug
                  ? `https://github.com/dan10ish/dan10ish.github.io/blob/main/content/blog/${blogSlug}.md`
                  : "https://github.com/dan10ish/dan10ish.github.io"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
            >
              <div className="github-button-content">
                <Github size={16} />
                <span>View Source</span>
              </div>
              {!blogSlug && (
                <div className="github-stars">
                  <Star
                    size={16}
                    className={isGithubHovered ? "star-hover" : ""}
                  />
                  <span>{formatNumber(stars)}</span>
                </div>
              )}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
