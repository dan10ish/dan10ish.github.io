import { useState, useEffect, useCallback } from 'react';

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [elements, setElements] = useState(new Map());
  const [entries, setEntries] = useState([]);

  const callback = useCallback((entries) => {
    entries.forEach(entry => {
      setElements(prev => new Map(prev.set(entry.target, entry.isIntersecting)));
    });
    setEntries(entries);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin
    });

    const targets = document.querySelectorAll('[data-animate]');
    targets.forEach(target => {
      observer.observe(target);
      setElements(prev => new Map(prev.set(target, false)));
    });

    return () => observer.disconnect();
  }, [callback, threshold, root, rootMargin]);

  const isVisible = useCallback((element) => {
    return elements.get(element);
  }, [elements]);

  const hasBeenVisible = useCallback((element) => {
    return triggerOnce && elements.get(element);
  }, [triggerOnce, elements]);

  return {
    isVisible,
    hasBeenVisible,
    entries
  };
} 