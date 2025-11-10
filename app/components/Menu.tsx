'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, ChevronUp } from 'lucide-react'
import { ThemeToggle } from './Theme'

interface MenuProps {
  page?: 'home' | 'writing' | 'error'
  activeTab?: 'home' | 'projects' | 'writings' | 'finds'
}

export default function Menu({ page = 'home', activeTab }: MenuProps) {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showScrollButton = page !== 'error' && showScroll
  const showHomeButton = page === 'writing'

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed bottom-7 right-5 flex flex-col items-center space-y-4 z-50">
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 rounded-full bg-background duration-200 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
      <ThemeToggle />
      {showHomeButton && (
        <Link 
          href="/?tab=writings"
          className="flex items-center justify-center p-2 rounded-full bg-background duration-200"
          aria-label="Go to homepage"
        >
          <Home size={20} />
        </Link>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

