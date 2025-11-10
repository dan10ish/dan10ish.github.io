'use client'

import { motion } from 'framer-motion'

interface ContentMenuProps {
  activeTab: 'about' | 'writings' | 'projects' | 'finds'
  onTabChange: (tab: 'about' | 'writings' | 'projects' | 'finds') => void
}

export default function ContentMenu({ activeTab, onTabChange }: ContentMenuProps) {
  return (
    <div className="flex! gap-1! md:gap-4! -ml-2! mb-4! relative!">
      {(['about', 'writings', 'projects', 'finds'] as const).map((tab) => (
        <h1
          key={tab}
          onClick={() => onTabChange(tab)}
          className="relative! text-base! cursor-pointer! transition-opacity! text-[0.9rem]! px-2! py-1! rounded-md! z-10!"
          style={{ opacity: activeTab === tab ? 1 : 0.7 }}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute! inset-0! bg-[var(--code-bg)]! rounded-md! -z-10!"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </h1>
      ))}
    </div>
  )
}


