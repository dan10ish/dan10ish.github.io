'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronUp } from 'lucide-react'
import { ThemeToggle } from './Theme'

export default function Menu() {
  const [showScroll, setShowScroll] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isErrorPage = pathname && !['/', '/about', '/finds'].some(path => pathname.startsWith(path))
  const showScrollButton = !isErrorPage && showScroll

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed bottom-7 right-5 flex flex-col items-center space-y-4! z-50">
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center p-2 rounded-full bg-background duration-200 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} />
        </button>
      )}
      <ThemeToggle />
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

