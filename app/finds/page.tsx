'use client'

import { useEffect, useState, useRef } from 'react'
import { getTILEntries, formatDate, TILEntry } from '../../lib/client'
import TILContent from '../components/TILContent'
import Navigation from '../components/Navigation'

export default function FindsPage() {
  const [entries, setEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    getTILEntries().then((data) => {
      if (mounted) {
        setEntries(data)
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [])

  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const leftColumn = sortedEntries.filter((_, idx) => idx % 2 === 0)
  const rightColumn = sortedEntries.filter((_, idx) => idx % 2 === 1)

  return (
    <div className="md:!p-10 !p-8 !flex !flex-col !justify-between !overflow-hidden">
      <div ref={scrollContainerRef} className="!flex-1 !overflow-auto">
        <div className="max-w-2xl! mx-auto! pb-24!">
          {loading ? (
            <div className="w-full! flex! justify-center! py-12!">
              <span className="finds-loader" aria-hidden />
            </div>
          ) : entries.length === 0 ? (
            <p className="text-base! text-secondary!">No entries yet.</p>
          ) : (
            <div className="space-y-10!">
              <div className="space-y-6! md:hidden">
                {sortedEntries.map((entry) => (
                  <article key={entry.id} className="border-b! pb-6! last:border-b-0!" style={{ borderColor: 'rgba(148, 163, 184, 0.35)' }}>
                    <TILContent entry={entry} />
                  </article>
                ))}
              </div>
              <div className="hidden md:grid! md:grid-cols-2! md:gap-6!">
                <div className="space-y-6!">
                  {leftColumn.map((entry) => (
                    <article key={entry.id} className="border-b! pb-6! last:border-b-0!" style={{ borderColor: 'rgba(148, 163, 184, 0.35)' }}>
                      <TILContent entry={entry} />
                    </article>
                  ))}
                </div>
                <div className="space-y-6!">
                  {rightColumn.map((entry) => (
                    <article key={entry.id} className="border-b! pb-6! last:border-b-0!" style={{ borderColor: 'rgba(148, 163, 184, 0.35)' }}>
                      <TILContent entry={entry} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}


