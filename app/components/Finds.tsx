'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getTILEntries } from '../../lib/client'
import { formatDate } from '../../lib/utils'
import TILContent from './TILContent'

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

export default function Finds() {
  const [entries, setEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTILEntries().then((data) => {
      setEntries(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section>
        <div className="w-full! flex! justify-center! py-8!">
          <Loader2 className="w-6! h-6! animate-spin! text-secondary!" />
        </div>
      </section>
    )
  }

  if (entries.length === 0) {
    return (
      <section>
        <p className="text-base text-secondary">
          No entries yet. Start adding your finds!
        </p>
      </section>
    )
  }

  return (
    <>
      <div className="md:hidden!">
        {[...entries]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((entry) => (
          <article
            key={entry.id}
            className="border-b! pb-6! mb-6! last:border-b-0! last:mb-0!"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="text-secondary! !text-[0.82rem]! mb-3!">
              {formatDate(entry.date)}
            </p>
            <TILContent entry={entry} />
          </article>
        ))}
      </div>
      <div className="hidden! md:grid! md:grid-cols-2! md:gap-6!">
        <div>
          {[...entries]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .filter((_, idx) => idx % 2 === 0)
            .map((entry) => (
            <article
              key={entry.id}
              className="border-b! pb-6! mb-6! last:border-b-0! last:mb-0!"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="text-secondary! !text-[0.82rem]! mb-3!">
                {formatDate(entry.date)}
              </p>
              <TILContent entry={entry} />
            </article>
          ))}
        </div>
        <div>
          {[...entries]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .filter((_, idx) => idx % 2 === 1)
            .map((entry) => (
            <article
              key={entry.id}
              className="border-b! pb-6! mb-6! last:border-b-0! last:mb-0!"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="text-secondary! !text-[0.82rem]! mb-3!">
                {formatDate(entry.date)}
              </p>
              <TILContent entry={entry} />
            </article>
          ))}
        </div>
      </div>
    </>
  )
}


