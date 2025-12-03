'use client'

import { useEffect, useState } from 'react'
import { getTILEntries, TILEntry } from '../../lib/client'
import TILContent from '../components/TILContent'
import { motion } from 'framer-motion'

import '../components/tweet.css'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.05,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 5 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
} as const;

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
        <div className="p-6 md:p-0 md:pt-12 max-w-2xl! mx-auto! pb-24! font-mono">
            {loading ? (
                <div className="w-full! flex! justify-center! py-12!">
                    <span className="finds-loader" aria-hidden />
                </div>
            ) : entries.length === 0 ? (
                <p className="text-base! text-secondary!">No entries yet.</p>
            ) : (
                <div className="space-y-10!">
                    <motion.div
                        className="space-y-6! md:hidden"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {sortedEntries.map((entry) => (
                            <motion.article key={entry.id} variants={item} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                                <TILContent entry={entry} />
                            </motion.article>
                        ))}
                    </motion.div>
                    <div className="hidden md:grid! md:grid-cols-2! md:gap-6!">
                        <motion.div
                            className="space-y-6!"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {leftColumn.map((entry) => (
                                <motion.article key={entry.id} variants={item} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                                    <TILContent entry={entry} />
                                </motion.article>
                            ))}
                        </motion.div>
                        <motion.div
                            className="space-y-6!"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {rightColumn.map((entry) => (
                                <motion.article key={entry.id} variants={item} className="border-b! border-(--border)! pb-6! last:border-b-0!">
                                    <TILContent entry={entry} />
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </div>
            )}

        </div>
    )
}
