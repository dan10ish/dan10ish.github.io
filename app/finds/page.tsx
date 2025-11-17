'use client'

import { useEffect, useState } from 'react'
import { getTILEntries, formatDate, TILEntry } from '../../lib/client'
import TILContent from '../components/TILContent'
import Menu from '../components/Menu'
import Nav from '../components/Nav'

export default function FindsPage() {
  const [entries, setEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(true)

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
    <div className="max-w-2xl! mx-auto! pb-24!">
      <Nav currentPage="finds" />
      <div className="mt-16!"></div>
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
              <article key={entry.id} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                <p className="text-secondary! text-[0.82rem]! mb-3!">{formatDate(entry.date)}</p>
                <TILContent entry={entry} />
              </article>
            ))}
          </div>
          <div className="hidden md:grid! md:grid-cols-2! md:gap-6!">
            <div className="space-y-6!">
              {leftColumn.map((entry) => (
                <article key={entry.id} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                  <p className="text-secondary! text-[0.82rem]! mb-3!">{formatDate(entry.date)}</p>
                  <TILContent entry={entry} />
                </article>
              ))}
            </div>
            <div className="space-y-6!">
              {rightColumn.map((entry) => (
                <article key={entry.id} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                  <p className="text-secondary! text-[0.82rem]! mb-3!">{formatDate(entry.date)}</p>
                  <TILContent entry={entry} />
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
      <Menu />
    </div>
  )
}

