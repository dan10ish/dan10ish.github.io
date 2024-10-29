import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getStats(pageId) {
  const { data, error } = await supabase
    .from("page_stats")
    .select("views, likes")
    .eq("id", pageId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching stats:", error);
    return { views: 0, likes: 0 };
  }

  return data || { views: 0, likes: 0 };
}

export async function incrementStat(pageId, type) {
  try {
    // First check if record exists
    const { data: existingRecord } = await supabase
      .from("page_stats")
      .select("*")
      .eq("id", pageId)
      .single();

    if (!existingRecord) {
      // Create new record
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
      return data;
    }

    // Update existing record
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
    return data;
  } catch (error) {
    console.error("Error incrementing stat:", error);
    return null;
  }
}

// Subscribe to real-time changes
export function subscribeToStats(pageId, callback) {
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
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
