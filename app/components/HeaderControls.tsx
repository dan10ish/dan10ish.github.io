'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'

export function HeaderControls() {
  const pathname = usePathname()
  const isWritingPage = pathname?.startsWith('/writings/')

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-center space-y-2">
      <ThemeToggle />
      {isWritingPage && (
        <Link href="/" aria-label="Go home" 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-secondary transition-colors hover:bg-secondary/50">
          <Home className="w-5 h-5 text-foreground" />
        </Link>
      )}
    </div>
  )
} 