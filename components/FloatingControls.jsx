'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, ChevronUp, House } from 'lucide-react'

export default function FloatingControls() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const isBlog = pathname.startsWith('/blog/') && pathname !== '/blog'

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const iconClasses = "w-6 h-6"
  const buttonClasses = "group flex items-center justify-center w-10 h-10 rounded-full text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-2">
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className={buttonClasses}
          aria-label="Scroll to top"
        >
          <ChevronUp className={iconClasses} />
        </button>
      )}

      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className={buttonClasses}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun className={iconClasses} />
        ) : (
          <Moon className={iconClasses} />
        )}
      </button>

      {isBlog && (
        <button
          onClick={() => router.push('/')}
          className={buttonClasses}
          aria-label="Go to home"
        >
          <House className={iconClasses} />
        </button>
      )}
    </div>
  )
}
