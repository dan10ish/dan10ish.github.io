'use client'

import { motion } from 'framer-motion'

interface ContentMenuProps {
  activeTab: 'writings' | 'projects' | 'finds'
  onTabChange: (tab: 'writings' | 'projects' | 'finds') => void
}

export default function ContentMenu({ activeTab, onTabChange }: ContentMenuProps) {
  return (
    <div className="!flex !gap-1 !md:gap-4 !-ml-2 !mb-4 !relative">
      <h1
        onClick={() => onTabChange('writings')}
        className="relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
        style={{ opacity: activeTab === 'writings' ? 1 : 0.7 }}
      >
        {activeTab === 'writings' && (
          <motion.div
            layoutId="activeTab"
            className="absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        Writings
      </h1>
      <h1
        onClick={() => onTabChange('projects')}
        className="relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
        style={{ opacity: activeTab === 'projects' ? 1 : 0.7 }}
      >
        {activeTab === 'projects' && (
          <motion.div
            layoutId="activeTab"
            className="absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        Projects
      </h1>
      <h1
        onClick={() => onTabChange('finds')}
        className="relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
        style={{ opacity: activeTab === 'finds' ? 1 : 0.7 }}
      >
        {activeTab === 'finds' && (
          <motion.div
            layoutId="activeTab"
            className="absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        Finds
      </h1>
    </div>
  )
}


