'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const tabs = [
  { name: 'Writings', href: '/writings' },
  { name: 'Today I Learned', href: '/til' }
]

export default function WritingsNav() {
  const pathname = usePathname()
  
  const activeTab = tabs.find(tab => {
    if (tab.href === '/writings') {
      return pathname === '/writings' || pathname?.startsWith('/writings/')
    }
    return pathname === tab.href || pathname?.startsWith(tab.href + '/')
  })

  return (
    <nav className="!flex !gap-6 !mb-6 !border-b !border-[var(--border)] !relative">
      {tabs.map((tab) => {
        const isActive = activeTab?.href === tab.href
        
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="!relative !pb-3 !text-base !transition-colors"
            style={{
              color: isActive ? 'var(--foreground)' : 'var(--secondary)'
            }}
          >
            {tab.name}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="!absolute !bottom-0 !left-0 !right-0 !h-[2px] !bg-[var(--link-blue)]"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

