'use client'

import { useEffect, useState, useCallback } from 'react'

function getInitialTheme(): string {
  if (typeof window === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)

  const setTheme = useCallback((t: string) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
    localStorage.setItem('theme', t)
    setThemeState(t)
  }, [])

  useEffect(() => {
    setThemeState(getInitialTheme())
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, toggle }
}

export const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`
