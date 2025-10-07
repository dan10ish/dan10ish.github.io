'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useTheme } from 'next-themes'
import { useEffect, useState, ReactNode } from 'react'
import { Sun, Moon } from 'lucide-react'

const LIGHT_THEME_COLOR = '#f8f8f8'
const DARK_THEME_COLOR = '#111111'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: 'class' | 'data-theme'
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeColorUpdater() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateThemeColor = () => {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')

      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.setAttribute('name', 'theme-color')
        document.head.appendChild(metaThemeColor)
      }

      const isDark = document.documentElement.classList.contains('dark')
      const themeColor = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR
      metaThemeColor.setAttribute('content', themeColor)
    }

    const timeoutId = setTimeout(updateThemeColor, 100)

    const observer = new MutationObserver(() => {
      updateThemeColor()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [theme, resolvedTheme, mounted])

  return null
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center p-2 rounded-full bg-background duration-200"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}

