'use client'

import { useState, useEffect } from 'react'
import { getTILEntries } from '../../lib/supabase'
import { formatDate } from '../../lib/utils'
import TILContent from '../components/TILContent'
import WritingsNav from '../components/WritingsNav'

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

export default function TILPage() {
  const [entries, setEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTILEntries().then((data) => {
      setEntries(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">
            Today I Learned
          </h1>
        </section>

        <WritingsNav />

        {loading ? (
          <section>
            <p className="text-base text-secondary">
              Loading...
            </p>
          </section>
        ) : entries.length === 0 ? (
          <section>
            <p className="text-base text-secondary">
              No entries yet. Start adding your learnings!
            </p>
          </section>
        ) : (
          <section className="space-y-6">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="border-b border-[var(--border)] pb-6 last:border-b-0"
              >
                <p className="text-secondary !text-[0.82rem] mb-3">
                  {formatDate(entry.date)}
                </p>
                <TILContent entry={entry} />
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

