'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Home, ChevronUp, Palette } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface NavigationProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export default function Navigation({ scrollContainerRef }: NavigationProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { nextTheme } = useTheme()

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      setShowScrollTop(scrollContainer.scrollTop > 300)
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [scrollContainerRef])

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="!fixed !bottom-5 md:!bottom-8 !right-4 md:!right-5 !flex !flex-col !items-center !gap-2 !z-50">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="!opacity-60 hover:!opacity-100 !transition-opacity !cursor-pointer !p-2"
          aria-label="Scroll to top"
          style={{ color: 'var(--text)' }}
        >
          <ChevronUp size={20} />
        </button>
      )}
      <button
        onClick={nextTheme}
        className="!opacity-60 hover:!opacity-100 !transition-opacity !cursor-pointer !p-2"
        aria-label="Change theme"
        style={{ color: 'var(--text)' }}
      >
        <Palette size={20} />
      </button>
      <Link
        href="/"
        className="!opacity-60 hover:!opacity-100 !transition-opacity !cursor-pointer !p-2"
        aria-label="Home"
        style={{ color: 'var(--text)' }}
      >
        <Home size={20} />
      </Link>
    </div>
  )
}

