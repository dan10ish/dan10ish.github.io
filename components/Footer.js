"use client";

import { useState, useEffect, memo, useCallback } from "react";
import {
  Eye,
  Heart,
  Github,
  Star,
  BookText,
  Library,
  Image,
  FolderSearch,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ThemeButton } from "./ThemeHandler";
import ShareButton from "./ShareButtons";
import Copyright from "./Copyright";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: null, likes: null });
  const [hasLiked, setHasLiked] = useState(false);
  const [stars, setStars] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(null);
  const [touchTimeout, setTouchTimeout] = useState(null);

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

  const handleLike = useCallback(
    async (e) => {
      e.preventDefault();
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
          window?.localStorage?.setItem(
            `stats-${pageId}`,
            JSON.stringify(data),
          );
          window?.sessionStorage?.setItem(`liked-${pageId}`, "true");
        }
      } catch (error) {
        console.error("Error liking post:", error);
        setHasLiked(false);
      } finally {
        setIsUpdating(false);
      }
    },
    [blogSlug, hasLiked, isUpdating],
  );

  const formatNumber = useCallback((num) => {
    if (num === null) return <span className="infinity-symbol">∞</span>;
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(2) + "K";
    return num;
  }, []);

  const handleTouchStart = (id) => {
    if (touchTimeout) clearTimeout(touchTimeout);
    const timeout = setTimeout(() => setIsTouching(id), 0);
    setTouchTimeout(timeout);
  };

  const handleTouchEnd = () => {
    if (touchTimeout) clearTimeout(touchTimeout);
    setIsTouching(null);
  };

  const isHomePage = !blogSlug;

  return (
    <footer className="site-footer">
      {isHomePage && (
        <>
          <div className="footer-nav-mobile">
            <div className="footer-nav-col">
              <div className="footer-nav-row">
                <Link href="/notes" className="footer-link">
                  <BookText size={16} />
                  Notes
                </Link>
                <Link href="/photos" className="footer-link">
                  <Image size={16} />
                  Photos
                </Link>
              </div>
              <div className="footer-nav-row">
                <Link href="/books" className="footer-link">
                  <Library size={16} />
                  Books
                </Link>
                <Link href="/resources" className="footer-link">
                  <FolderSearch size={16} />
                  Resources
                </Link>
              </div>
            </div>
            <div className="footer-nav-theme">
              <ThemeButton />
            </div>
          </div>
          <div className="footer-nav-desktop">
            <div className="footer-nav-links">
              <Link href="/notes" className="footer-link">
                <BookText size={16} />
                Notes
              </Link>
              <Link href="/photos" className="footer-link">
                <Image size={16} />
                Photos
              </Link>
              <Link href="/books" className="footer-link">
                <Library size={16} />
                Books
              </Link>
              <Link href="/resources" className="footer-link">
                <FolderSearch size={16} />
                Resources
              </Link>
            </div>
            <ThemeButton />
          </div>
        </>
      )}
      <div className="footer-metrics">
        <div className="metrics-group">
          <div
            className="metric metric-view"
            data-tooltip={`${stats.views?.toLocaleString() || "0"} views`}
            data-show-tooltip={isTouching === "views"}
            onTouchStart={() => handleTouchStart("views")}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <Eye size={16} />
            <span>{formatNumber(stats.views)}</span>
          </div>
          {blogSlug && (
            <div
              className="metric"
              data-tooltip={`${stats.likes?.toLocaleString() || "0"} likes`}
              data-show-tooltip={isTouching === "likes"}
              onTouchStart={() => handleTouchStart("likes")}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <button
                onClick={handleLike}
                className={`like-button ${hasLiked ? "liked" : ""}`}
                disabled={hasLiked || isUpdating}
                aria-label={hasLiked ? "Already liked" : "Like this post"}
              >
                <Heart size={16} />
                <span>{formatNumber(stats.likes)}</span>
              </button>
            </div>
          )}
        </div>
        <div className="footer-share">
          <a
            href={
              blogSlug
                ? `https://github.com/dan10ish/dan10ish.github.io/blob/main/content/blog/${blogSlug}.md`
                : "https://github.com/dan10ish/dan10ish.github.io"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            onMouseEnter={() => setIsGithubHovered(true)}
            onMouseLeave={() => setIsGithubHovered(false)}
          >
            <Github size={16} />
            <span>Source</span>
            {!blogSlug && stars !== null && (
              <div className="github-stars">
                <Star
                  size={16}
                  className={isGithubHovered ? "star-hover" : ""}
                />
                <span>{formatNumber(stars)}</span>
              </div>
            )}
          </a>
          {blogSlug && <ShareButton slug={blogSlug} />}
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default memo(Footer);
