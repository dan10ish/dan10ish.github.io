'use client'

import { useMemo } from "react"
import { TILEntry } from "../../lib/client"
import TILContent from "../components/TILContent"
import { motion } from "framer-motion"

import "../components/tweet.css"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.05,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 5 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
} as const

export default function FindsClient({ entries }: { entries: TILEntry[] }) {
    const sortedEntries = useMemo(
        () => [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [entries]
    )

    const leftColumn = useMemo(() => sortedEntries.filter((_, idx) => idx % 2 === 0), [sortedEntries])
    const rightColumn = useMemo(() => sortedEntries.filter((_, idx) => idx % 2 === 1), [sortedEntries])

    if (!entries.length) {
        return <p className="text-base! text-secondary!">No entries yet.</p>
    }

    return (
        <div className="p-6 md:p-0 md:pt-12 max-w-2xl! mx-auto! pb-24! font-mono">
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
        </div>
    )
}

