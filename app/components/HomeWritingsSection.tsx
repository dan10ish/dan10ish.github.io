'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatDate } from '../../lib/utils'
import TILContent from './TILContent'
import { getTILEntries } from '../../lib/supabase'

interface Writing {
  slug: string
  title: string
  date: string
}

interface TILEntry {
  id: string
  date: string
  content_type: 'tweet' | 'text' | 'link' | 'youtube' | 'book' | 'image'
  content: string
  metadata?: {
    title?: string
    author?: string
    description?: string
    image?: string
  }
  created_at: string
}

interface HomeWritingsSectionProps {
  writings: Writing[]
}

export default function HomeWritingsSection({ writings }: HomeWritingsSectionProps) {
  const [activeTab, setActiveTab] = useState<'writings' | 'til'>('writings')
  const [tilEntries, setTilEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeTab === 'til' && tilEntries.length === 0) {
      setLoading(true)
      getTILEntries().then((entries) => {
        setTilEntries(entries)
        setLoading(false)
      })
    }
  }, [activeTab, tilEntries.length])

  return (
    <section>
      <div className="!flex !gap-6 !mb-3 !border-b !border-[var(--border)] !relative">
        <h1
          onClick={() => setActiveTab('writings')}
          className={`!relative !pb-2 !text-base !cursor-pointer !transition-opacity ${
            activeTab === 'writings' ? '!opacity-70' : '!opacity-70'
          }`}
          style={{ opacity: activeTab === 'writings' ? 1 : 0.7 }}
        >
          Writings
          {activeTab === 'writings' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !bottom-0 !left-0 !right-0 !h-[2px] !bg-[var(--link-blue)]"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
            />
          )}
        </h1>
        <h1
          onClick={() => setActiveTab('til')}
          className={`!relative !pb-2 !text-base !cursor-pointer !transition-opacity ${
            activeTab === 'til' ? '!opacity-70' : '!opacity-70'
          }`}
          style={{ opacity: activeTab === 'til' ? 1 : 0.7 }}
        >
          Today I Learned
          {activeTab === 'til' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !bottom-0 !left-0 !right-0 !h-[2px] !bg-[var(--link-blue)]"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
            />
          )}
        </h1>
      </div>

      {activeTab === 'writings' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="!mt-1"
        >
          {writings.length > 0 ? (
            writings.map(({ slug, title, date }) => (
              <Link
                href={`/writings/${slug}`}
                key={slug}
                className="!block group writing-link !mb-1"
              >
                <div className="!flex !gap-2 !w-full !items-baseline !justify-between">
                  <span className="!text-primary !font-medium touch-underline group-hover:!text-[var(--link-blue)] !truncate">
                    {title}
                  </span>
                  <span className="!text-secondary !text-[0.82rem] !flex-shrink-0">
                    {formatDate(date)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="!text-base !text-secondary">No writings yet.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'til' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="!space-y-6"
        >
          {loading ? (
            <p className="!text-base !text-secondary">Loading...</p>
          ) : tilEntries.length > 0 ? (
            tilEntries.map((entry) => (
              <article
                key={entry.id}
                className="!border-b !border-[var(--border)] !pb-6 last:!border-b-0"
              >
                <p className="!text-secondary !text-[0.82rem] !mb-3">
                  {formatDate(entry.date)}
                </p>
                <TILContent entry={entry} />
              </article>
            ))
          ) : (
            <p className="!text-base !text-secondary">No entries yet.</p>
          )}
        </motion.div>
      )}
    </section>
  )
}

