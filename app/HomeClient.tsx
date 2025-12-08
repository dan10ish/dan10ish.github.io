"use client";

import { useState, useMemo, useEffect } from "react";
import { data } from "./data";
import { User, Share2, Bookmark, CreditCard, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./components/Card";
import TILContent from "./components/TILContent";
import { useTheme } from "next-themes";
import "./components/tweet.css";

type Section = "about" | "socials" | "finds" | "card" | null;

interface TILEntry {
    id: string;
    date: string;
    content_type: "tweet" | "text" | "link" | "youtube" | "book" | "image";
    content: string;
    metadata?: {
        title?: string;
        author?: string;
        description?: string;
        image?: string;
    };
    created_at: string;
}

const icons = [
    { id: "about" as const, Icon: User },
    { id: "socials" as const, Icon: Share2 },
    { id: "finds" as const, Icon: Bookmark },
    { id: "card" as const, Icon: CreditCard },
];

function ThemeDot() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="w-2.5 h-2.5 rounded-full cursor-pointer"
            style={{ backgroundColor: resolvedTheme === "light" ? "#000" : "#fff" }}
            aria-label="Toggle theme"
        />
    );
}

export default function HomeClient({ entries }: { entries: TILEntry[] }) {
    const [activeSection, setActiveSection] = useState<Section>(null);

    const handleIconClick = (section: Section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    const sortedEntries = useMemo(
        () => [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [entries]
    );

    const leftColumn = useMemo(
        () => sortedEntries.filter((_: TILEntry, idx: number) => idx % 2 === 0),
        [sortedEntries]
    );
    const rightColumn = useMemo(
        () => sortedEntries.filter((_: TILEntry, idx: number) => idx % 2 === 1),
        [sortedEntries]
    );

    return (
        <div className="h-dvh flex flex-col">
            {/* Theme Dot - Fixed Bottom Right */}
            <div className="fixed bottom-4 right-4 z-50">
                <ThemeDot />
            </div>

            {/* Icon Row */}
            <motion.div
                className="flex items-center justify-center gap-10 md:gap-14 pt-8"
                animate={{ y: activeSection ? 0 : "calc(50vh - 60px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ willChange: "transform" }}
            >
                {icons.map(({ id, Icon }) => (
                    <motion.button
                        key={id}
                        onClick={() => handleIconClick(id)}
                        className="cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ opacity: activeSection && activeSection !== id ? 0.2 : 1 }}
                        transition={{ duration: 0.1 }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <Icon
                            size={28}
                            strokeWidth={1.5}
                            className={activeSection === id ? "text-foreground" : "text-secondary hover:text-foreground transition-colors"}
                        />
                    </motion.button>
                ))}
            </motion.div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {activeSection && (
                    <motion.div
                        key={activeSection}
                        className="flex-1 w-full max-w-md mx-auto px-8 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className="h-full overflow-y-auto pt-10 pb-16">
                            {activeSection === "about" && <AboutSection />}
                            {activeSection === "socials" && <SocialsSection />}
                            {activeSection === "finds" && (
                                <FindsContent entries={sortedEntries} leftColumn={leftColumn} rightColumn={rightColumn} />
                            )}
                            {activeSection === "card" && <CardSection />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Match main branch styling exactly
function AboutSection() {
    return (
        <div className="space-y-8">
            <div className="text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
                {data.personal.name}
            </div>

            <div className="text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
                {data.personal.title.join(" | ")}
            </div>

            <div className="space-y-2">
                <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                    Experience
                </div>
                <div className="space-y-2">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
                            {exp.company} ({exp.year})
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SocialsSection() {
    return (
        <div className="space-y-2">
            <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">
                Socials
            </div>
            <div className="space-y-2">
                {data.social.map((social, idx) => (
                    <div key={idx} className="text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 group"
                        >
                            <span className="group-hover:opacity-70 transition-opacity">{social.name}</span>
                            <ArrowUpRight className="w-5 h-5 text-secondary group-hover:text-[var(--link-blue)] transition-colors" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FindsContent({
    entries,
    leftColumn,
    rightColumn,
}: {
    entries: TILEntry[];
    leftColumn: TILEntry[];
    rightColumn: TILEntry[];
}) {
    if (!entries.length) {
        return <p className="text-secondary text-center py-8 font-mono">No finds yet.</p>;
    }

    return (
        <div className="pb-8 font-mono" style={{ fontFamily: "var(--font-geist-mono)" }}>
            {/* Mobile: single column */}
            <div className="space-y-6 md:hidden">
                {entries.map((entry) => (
                    <article key={entry.id} className="border-b border-[var(--border)] pb-6 last:border-b-0">
                        <TILContent entry={entry} />
                    </article>
                ))}
            </div>
            {/* Desktop: two columns */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                <div className="space-y-6">
                    {leftColumn.map((entry) => (
                        <article key={entry.id} className="border-b border-[var(--border)] pb-6 last:border-b-0">
                            <TILContent entry={entry} />
                        </article>
                    ))}
                </div>
                <div className="space-y-6">
                    {rightColumn.map((entry) => (
                        <article key={entry.id} className="border-b border-[var(--border)] pb-6 last:border-b-0">
                            <TILContent entry={entry} />
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CardSection() {
    return (
        <div className="flex justify-center">
            <Card />
        </div>
    );
}
