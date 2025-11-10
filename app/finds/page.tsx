'use client'

import { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import { Loader2, ArrowLeft } from 'lucide-react'
import { getTILEntries, formatDate, TILEntry } from '../../lib/client'
import TILContent from '../components/TILContent'
import Menu from '../components/Menu'

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
    <div className="max-w-2xl! mx-auto! px-4! pb-24!">
      <header className="flex! items-center! justify-between! gap-3! mt-6! mb-8!">
        <Link href="/" className="inline-flex! items-center! gap-2! text-sm! text-secondary! hover:text-(--link-blue)! transition-colors!">
          <ArrowLeft size={16} />
          Home
        </Link>
        <h1 className="text-base! font-bold! header-text!">Finds</h1>
      </header>
      {loading ? (
        <div className="w-full! flex! justify-center! py-12!">
          <Loader2 className="w-6! h-6! animate-spin! text-secondary!" />
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
      <Menu page="home" />
    </div>
  )
}

