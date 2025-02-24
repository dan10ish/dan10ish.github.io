import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  realtime: {
    params: { eventsPerSecond: 2 },
    headers: { apikey: supabaseKey },
    timeout: 20000,
    heartbeatIntervalMs: 8000,
    disconnect_timeout: 5000,
    reconnect: true,
    backoff: {
      maxDelay: 5000,
      minDelay: 1000,
      retries: 2,
    },
  },
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
});

const CACHE_TIME = 30000; // 30 seconds
const statsCache = new Map();

export const getStats = async (pageId) => {
  const cached = statsCache.get(pageId);
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return cached.data;
  }

  const { data } = await supabase
    .from('page_stats')
    .select('views, likes')
    .eq('id', pageId)
    .single();

  if (data) {
    statsCache.set(pageId, {
      data,
      timestamp: Date.now()
    });
  }

  return data;
};

export const incrementViews = async (pageId) => {
  const { data } = await supabase.rpc('increment_views', { row_id: pageId });
  if (data) {
    statsCache.set(pageId, {
      data,
      timestamp: Date.now()
    });
  }
  return data;
};

export const incrementLikes = async (pageId) => {
  const { data } = await supabase.rpc('increment_likes', { row_id: pageId });
  if (data) {
    statsCache.set(pageId, {
      data,
      timestamp: Date.now()
    });
  }
  return data;
};

export function subscribeToStats(pageId, callback) {
  return supabase
    .channel('stats_channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'stats',
        filter: `id=eq.${pageId}`
      },
      (payload) => callback(payload.new)
    )
    .subscribe()
}

export async function getPageViews(slug) {
  try {
    const { data, error } = await supabase
      .from('pageviews')
      .select('views')
      .eq('slug', slug)
      .single();

    if (error) {
      return 0;
    }

    return data?.views || 0;
  } catch (error) {
    return 0;
  }
}

export async function incrementPageView(slug) {
  try {
    // Check if the page exists
    const { data: existingPage } = await supabase
      .from('pageviews')
      .select('views')
      .eq('slug', slug)
      .single();

    if (existingPage) {
      // Update existing page view count
      await supabase
        .from('pageviews')
        .update({ views: existingPage.views + 1 })
        .eq('slug', slug);
    } else {
      // Insert new page with view count of 1
      await supabase
        .from('pageviews')
        .insert({ slug, views: 1 });
    }
  } catch (error) {
    // Silently fail on error
  }
}

export async function getFooterStats() {
  try {
    const { data, error } = await supabase
      .from('footer_stats')
      .select('*')
      .single();

    if (error) {
      return {
        coffees: 0,
        countries: 0,
        photos: 0,
        miles: 0
      };
    }

    return data;
  } catch (error) {
    return {
      coffees: 0,
      countries: 0,
      photos: 0,
      miles: 0
    };
  }
}

export async function updateFooterStats(stats) {
  try {
    const { error } = await supabase
      .from('footer_stats')
      .update(stats)
      .eq('id', 1);
    
    return { success: !error };
  } catch (error) {
    return { success: false };
  }
}

export default supabase
