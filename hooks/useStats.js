import { useState, useEffect, useCallback } from "react";
import { supabase, getStats, incrementViews, incrementLikes } from "@/lib/supabase";

export function useStats(pageId) {
  const [stats, setStats] = useState({ views: null, likes: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getStats(pageId);
      if (data) {
        setStats(data);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [pageId]);

  const handleView = useCallback(async () => {
    try {
      const data = await incrementViews(pageId);
      if (data) setStats(data);
    } catch (err) {
      console.error("Error incrementing views:", err);
    }
  }, [pageId]);

  const handleLike = useCallback(async () => {
    try {
      const data = await incrementLikes(pageId);
      if (data) setStats(data);
      return true;
    } catch (err) {
      console.error("Error incrementing likes:", err);
      return false;
    }
  }, [pageId]);

  useEffect(() => {
    fetchStats();

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
          setStats(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [pageId, fetchStats]);

  return {
    stats,
    isLoading,
    error,
    handleView,
    handleLike,
  };
} 