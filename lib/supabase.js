import { createClient } from "@supabase/supabase-js";

// Create a single Supabase client instance
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getStats(pageId) {
  // Try to get from localStorage first for immediate response
  const cachedStats = localStorage.getItem(`stats-${pageId}`);
  if (cachedStats) {
    return JSON.parse(cachedStats);
  }

  const { data, error } = await supabase
    .from("page_stats")
    .select("views, likes")
    .eq("id", pageId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching stats:", error);
    return { views: 0, likes: 0 };
  }

  const stats = data || { views: 0, likes: 0 };
  localStorage.setItem(`stats-${pageId}`, JSON.stringify(stats));
  return stats;
}

export async function incrementStat(pageId, type) {
  // Optimistically update local cache
  const currentStats = JSON.parse(
    localStorage.getItem(`stats-${pageId}`) || '{"views":0,"likes":0}'
  );
  currentStats[type] = (currentStats[type] || 0) + 1;
  localStorage.setItem(`stats-${pageId}`, JSON.stringify(currentStats));

  const { data, error } = await supabase
    .from("page_stats")
    .upsert({
      id: pageId,
      [type]: supabase.rpc("increment", { row_id: pageId, column_name: type }),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error updating stats:", error);
    return currentStats;
  }

  return data;
}
