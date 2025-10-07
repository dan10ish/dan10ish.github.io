'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
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
      <div className="!flex !gap-4 !-ml-2 !mb-3 !relative">
        <h1
          onClick={() => setActiveTab('writings')}
          className="!relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
          style={{ opacity: activeTab === 'writings' ? 1 : 0.7 }}
        >
          {activeTab === 'writings' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          Writings
        </h1>
        <h1
          onClick={() => setActiveTab('til')}
          className="!relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
          style={{ opacity: activeTab === 'til' ? 1 : 0.7 }}
        >
          {activeTab === 'til' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30
              }}
            />
          )}
          TIL
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
            <div className="!flex !justify-center !py-8">
              <Loader2 className="!w-6 !h-6 !animate-spin !text-secondary" />
            </div>
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

