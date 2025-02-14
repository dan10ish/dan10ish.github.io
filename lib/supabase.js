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
  const { data } = await supabase
    .from('stats')
    .select('views, likes')
    .eq('id', pageId)
    .single()
  return data
}

export const incrementViews = async (pageId) => {
  const { data } = await supabase.rpc('increment_views', { row_id: pageId })
  return data
}

export const incrementLikes = async (pageId) => {
  const { data } = await supabase.rpc('increment_likes', { row_id: pageId })
  return data
}

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

export default supabase
