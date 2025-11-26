'use client'

import Link from 'next/link'
import { Home, Palette } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navigation() {
  const { nextTheme } = useTheme()

  return (
    <div className="!fixed !bottom-5 md:!bottom-8 !right-4 md:!right-5 !flex !flex-col !items-center !gap-2 !z-50">
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

