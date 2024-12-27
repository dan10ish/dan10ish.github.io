import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: {
    params: { eventsPerSecond: 1 },
  },
  db: {
    schema: "public",
  },
  global: {
    headers: { "x-custom-header": "custom-value" },
  },
  persistSession: false,
  detectSessionInUrl: false,
});

const CACHE_TIME = 60000;
const statsCache = new Map();

const getStatsFromCache = (pageId) => {
  const cached = statsCache.get(pageId);
  return cached && Date.now() - cached.timestamp < CACHE_TIME
    ? cached.data
    : null;
};

export async function getStats(pageId) {
  const cached = getStatsFromCache(pageId);
  if (cached) return cached;

  try {
    const localData = localStorage.getItem(`stats-${pageId}`);
    const localTimestamp = localStorage.getItem(`stats-time-${pageId}`);

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
    localStorage.setItem(`stats-${pageId}`, JSON.stringify(result));
    localStorage.setItem(`stats-time-${pageId}`, Date.now().toString());
    return result;
  } catch {
    return { views: 0, likes: 0 };
  }
}

export async function incrementStat(pageId, type) {
  try {
    const { data: current } = await supabase
      .from("page_stats")
      .select("*")
      .eq("id", pageId)
      .single();

    if (!current) {
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
      statsCache.delete(pageId);
      localStorage.removeItem(`stats-${pageId}`);
      return data;
    }

    const { data, error } = await supabase
      .from("page_stats")
      .update({
        [type]: current[type] + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId)
      .select()
      .single();

    if (error) throw error;
    statsCache.delete(pageId);
    localStorage.removeItem(`stats-${pageId}`);
    return data;
  } catch {
    return null;
  }
}

export function subscribeToStats(pageId, callback) {
  if (typeof window === "undefined") return () => {};

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
        statsCache.delete(pageId);
        localStorage.removeItem(`stats-${pageId}`);
        callback(payload.new);
      },
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
    statsCache.delete(pageId);
    localStorage.removeItem(`stats-${pageId}`);
  };
}
