import { useState, useEffect, useCallback } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

export function useDataFetch(key, fetchFn, options = {}) {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000,
    initialData = null
  } = options;

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async (force = false) => {
    const cached = cache.get(key);
    if (!force && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setData(cached.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await fetchFn();
      cache.set(key, { data: result, timestamp: Date.now() });
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      console.error(`Error fetching data for key ${key}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn]);

  useEffect(() => {
    fetchData();

    if (revalidateOnFocus) {
      const onFocus = () => {
        if (Date.now() - (cache.get(key)?.timestamp || 0) > dedupingInterval) {
          fetchData(true);
        }
      };
      window.addEventListener('focus', onFocus);
      return () => window.removeEventListener('focus', onFocus);
    }
  }, [fetchData, key, revalidateOnFocus, dedupingInterval]);

  useEffect(() => {
    if (revalidateOnReconnect) {
      const onOnline = () => fetchData(true);
      window.addEventListener('online', onOnline);
      return () => window.removeEventListener('online', onOnline);
    }
  }, [fetchData, revalidateOnReconnect]);

  return {
    data,
    error,
    isLoading,
    mutate: fetchData
  };
} 