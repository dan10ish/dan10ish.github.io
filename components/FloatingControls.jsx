'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, ChevronUp, House } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const iconClasses = "w-5 h-5 transition-transform group-hover:scale-110"
  const buttonClasses = "group flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-[#252525] border border-black/10 dark:border-white/10 text-black dark:text-white shadow-lg backdrop-blur-md transition-all hover:border-black/20 dark:hover:border-white/20 active:scale-95"

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={buttonClasses}
            aria-label="Scroll to top"
          >
            <ChevronUp className={iconClasses} />
          </motion.button>
        )}
      </AnimatePresence>

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
