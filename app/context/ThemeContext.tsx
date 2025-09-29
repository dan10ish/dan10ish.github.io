'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = {
  name: string
  bg: string
  text: string
  accent: string
}

const themes: Theme[] = [
  { name: 'dark', bg: '#1a1a1a', text: '#e5e7eb', accent: '#6b7280' },
  { name: 'light', bg: '#f8f9fa', text: '#1f2937', accent: '#6b7280' },
  { name: 'green', bg: '#0f1419', text: '#00ff00', accent: '#008000' },
  { name: 'blue', bg: '#0c1222', text: '#64b5f6', accent: '#1976d2' },
  { name: 'amber', bg: '#1a0f0a', text: '#fbbf24', accent: '#d97706' },
  { name: 'purple', bg: '#1a0d1f', text: '#c084fc', accent: '#7c3aed' },
  { name: 'red', bg: '#1f0a0a', text: '#f87171', accent: '#dc2626' }
]

type ThemeContextType = {
  currentTheme: Theme
  nextTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('theme-index')
    if (saved) {
      setThemeIndex(parseInt(saved, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme-index', themeIndex.toString())
    const theme = themes[themeIndex]
    document.documentElement.style.setProperty('--bg', theme.bg)
    document.documentElement.style.setProperty('--text', theme.text)
    document.documentElement.style.setProperty('--accent', theme.accent)
    
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
      metaTheme.setAttribute('content', theme.bg)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = theme.bg
      document.head.appendChild(meta)
    }
  }, [themeIndex])

  const nextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme: themes[themeIndex], nextTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
