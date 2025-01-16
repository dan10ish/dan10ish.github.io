import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: {
    params: { eventsPerSecond: 1 },
    headers: { apikey: supabaseKey },
    timeout: 30000,
    heartbeatIntervalMs: 5000,
    disconnect_timeout: 8000,
    reconnect: true,
    backoff: {
      maxDelay: 10000,
      minDelay: 1000,
      retries: 3,
    },
  },
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
});

const CACHE_TIME = 60000;
const statsCache = new Map();

const getStatsFromCache = (pageId) => {
  const cached = statsCache.get(pageId);
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) return cached.data;
  return null;
};

export async function getStats(pageId) {
  try {
    const cached = getStatsFromCache(pageId);
    if (cached) return cached;

    const localData = localStorage?.getItem(`stats-${pageId}`);
    const localTimestamp = localStorage?.getItem(`stats-time-${pageId}`);

    if (
      localData &&
      localTimestamp &&
      Date.now() - parseInt(localTimestamp) < CACHE_TIME
    ) {
      const data = JSON.parse(localData);
      statsCache.set(pageId, { data, timestamp: Date.now() });
      return data;
    }

    const { data, error } = await supabase
      .from("page_stats")
      .select("views, likes")
      .eq("id", pageId)
      .single();

    if (error && error.code !== "PGRST116") return { views: 0, likes: 0 };

    const result = data || { views: 0, likes: 0 };
    statsCache.set(pageId, { data: result, timestamp: Date.now() });
    localStorage?.setItem(`stats-${pageId}`, JSON.stringify(result));
    localStorage?.setItem(`stats-time-${pageId}`, Date.now().toString());
    return result;
  } catch {
    return { views: 0, likes: 0 };
  }
}

export async function incrementStat(pageId, type) {
  try {
    const current = await supabase
      .from("page_stats")
      .select("*")
      .eq("id", pageId)
      .single();

    if (!current.data) {
      const { data, error } = await supabase
        .from("page_stats")
        .insert([
          {
            id: pageId,
            [type]: 1,
            views: type === "views" ? 1 : 0,
            likes: type === "likes" ? 1 : 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      invalidateCache(pageId);
      return data;
    }

    const { data, error } = await supabase
      .from("page_stats")
      .update({
        [type]: current.data[type] + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId)
      .select()
      .single();

    if (error) throw error;
    invalidateCache(pageId);
    return data;
  } catch {
    return null;
  }
}

function invalidateCache(pageId) {
  statsCache.delete(pageId);
  localStorage?.removeItem(`stats-${pageId}`);
  localStorage?.removeItem(`stats-time-${pageId}`);
}

export function subscribeToStats(pageId, callback) {
  if (typeof window === "undefined") return () => {};

  let retryTimeout;
  let retryCount = 0;

  const setupChannel = () => {
    const channel = supabase
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
          invalidateCache(pageId);
          callback(payload.new);
        },
      )
      .subscribe((status) => {
        if (status === "CLOSED" && retryCount < 3) {
          retryCount++;
          retryTimeout = setTimeout(setupChannel, 2000 * retryCount);
        }
      });

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
      channel.unsubscribe();
      invalidateCache(pageId);
    };
  };

  return setupChannel();
}
