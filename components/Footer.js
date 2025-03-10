"use client";

import { useState, useEffect, memo, useCallback, useRef } from "react";
import { ChartNoAxesColumn, Heart, Star, Mail, CodeXml, GitFork } from "lucide-react";

import { supabase } from "@/lib/supabase";
import ShareButton from "./ShareButtons";

const LucideIcon = memo(({ icon: Icon, ...props }) => {
  return <Icon strokeWidth={`var(--icon-stroke-width)`} {...props} />;
});

LucideIcon.displayName = "LucideIcon";

const Footer = ({ blogSlug = null }) => {
  const [stats, setStats] = useState({ views: null, likes: null });
  const [hasLiked, setHasLiked] = useState(false);
  const [stars, setStars] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);
  const subscriptionRef = useRef(null);

  const formatNumber = useCallback((num) => {
    if (num === null) return <span className="infinity-symbol">∞</span>;
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(2) + "K";
    return num;
  }, []);

  useEffect(() => {
    const pageId = blogSlug ? `post-${blogSlug}` : "home";
    const cachedStats = window?.localStorage?.getItem(`stats-${pageId}`);
    
    if (cachedStats) {
      setStats(JSON.parse(cachedStats));
    }

    if (blogSlug) {
      const likedKey = `liked-${pageId}`;
      setHasLiked(!!window?.sessionStorage?.getItem(likedKey));
    }

    const initializeStats = async () => {
      try {
        const { data } = await supabase
          .from("page_stats")
          .select("views, likes")
          .eq("id", pageId)
          .single();

        const result = data || { views: 0, likes: 0 };
        setStats(result);
        window?.localStorage?.setItem(`stats-${pageId}`, JSON.stringify(result));

        const viewedKey = `viewed-${pageId}-${new Date().toDateString()}`;
        if (!window?.sessionStorage?.getItem(viewedKey)) {
          setIsUpdating(true);
          const { data: updated } = await supabase.rpc("increment_views", {
            row_id: pageId,
          });
          
          if (updated) {
            setStats(updated);
            window?.localStorage?.setItem(`stats-${pageId}`, JSON.stringify(updated));
            window?.sessionStorage?.setItem(viewedKey, "true");
          }
          
          setIsUpdating(false);
        }
      } catch {
        setIsUpdating(false);
      }
    };

    subscriptionRef.current = supabase
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
            window?.localStorage?.setItem(`stats-${pageId}`, JSON.stringify(payload.new));
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
          const res = await fetch("https://api.github.com/repos/dan10ish/dan10ish.github.io");
          const data = await res.json();
          
          if (data?.stargazers_count) {
            setStars(data.stargazers_count);
            window?.localStorage?.setItem("github-stars", data.stargazers_count.toString());
            window?.localStorage?.setItem("github-stars-time", now.toString());
          }
        } catch {}
      };
      
      fetchStars();
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, [blogSlug, isUpdating]);

  const handleLike = useCallback(async (e) => {
    e.preventDefault();
    if (hasLiked || !blogSlug) return;

    setHasLiked(true);

    const pageId = `post-${blogSlug}`;
    window?.sessionStorage?.setItem(`liked-${pageId}`, "true");

    try {
      const { data } = await supabase.rpc("increment_likes", {
        row_id: pageId,
      });

      if (data) {
        setStats(data);
        window?.localStorage?.setItem(`stats-${pageId}`, JSON.stringify(data));
      }
    } catch {}
  }, [blogSlug, hasLiked]);

  return (
    <footer className="site-footer">
      <div className="footer-metrics">
        <div className="metrics-group">
          <div className="metric metric-view">
            <ChartNoAxesColumn size={16} />
            <span>{formatNumber(stats.views)}</span>
          </div>
          {blogSlug && (
            <div className="metric">
              <button
                onClick={handleLike}
                className={`like-button ${hasLiked ? "liked" : ""} ${isUpdating ? "animating" : ""}`}
                disabled={hasLiked || isUpdating}
                aria-label={hasLiked ? "Already liked" : "Like this post"}
              >
                <LucideIcon icon={Heart} size={16} />
                <span>{formatNumber(stats.likes)}</span>
              </button>
            </div>
          )}
        </div>
        <div className="footer-share">
          {!blogSlug && (
            <a
              href="https://github.com/dan10ish/dan10ish.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              onMouseEnter={() => setIsGithubHovered(true)}
              onMouseLeave={() => setIsGithubHovered(false)}
            >
              <LucideIcon icon={GitFork} size={20} />
              <div className="github-stars">
                <span className="highlight-star">
                  <LucideIcon 
                    icon={Star}
                    size={16}
                    className={isGithubHovered ? "star-hover" : ""}
                    fill="currentColor"
                  />
                </span>
                <span className="star-number">{formatNumber(stars)}</span>
              </div>
            </a>
          )}
          {blogSlug ? (
            <div className="blog-util-links">
              <a
                href={`https://github.com/dan10ish/dan10ish.github.io/blob/main/content/blog/${blogSlug}.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-source"
              >
                <LucideIcon icon={CodeXml} size={20} />
              </a>
              <ShareButton slug={blogSlug} size={20} />
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);