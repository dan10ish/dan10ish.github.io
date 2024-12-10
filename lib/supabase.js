import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  realtime: {
    timeout: 3000,
    params: {
      eventsPerSecond: 1,
    },
  },
  db: {
    schema: "public",
  },
});

const CACHE_TIME = 30000;
const statsCache = new Map();

export async function getStats(pageId) {
  const now = Date.now();
  const cached = statsCache.get(pageId);

  if (cached && now - cached.timestamp < CACHE_TIME) {
    return cached.data;
  }

  try {
    const { data, error } = await supabase
      .from("page_stats")
      .select("views, likes")
      .eq("id", pageId)
      .single();

    if (error && error.code !== "PGRST116") {
      return { views: 0, likes: 0 };
    }

    const result = data || { views: 0, likes: 0 };
    statsCache.set(pageId, { data: result, timestamp: now });
    return result;
  } catch {
    return { views: 0, likes: 0 };
  }
}

export async function incrementStat(pageId, type) {
  try {
    const { data: existingRecord } = await supabase
      .from("page_stats")
      .select("*")
      .eq("id", pageId)
      .single();

    if (!existingRecord) {
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
      return data;
    }

    const { data, error } = await supabase
      .from("page_stats")
      .update({
        [type]: existingRecord[type] + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId)
      .select()
      .single();

    if (error) throw error;
    statsCache.delete(pageId);
    return data;
  } catch {
    return null;
  }
}

export function subscribeToStats(pageId, callback) {
  if (typeof window === "undefined") return () => {};

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
        statsCache.delete(pageId);
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
    statsCache.delete(pageId);
  };
}
