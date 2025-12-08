"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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

const sectionOrder = ["about", "socials", "finds", "card"] as const;

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
    const [iconsAtTop, setIconsAtTop] = useState(false);
    const prevSectionRef = useRef<Section>(null);

    const handleIconClick = (section: Section) => {
        prevSectionRef.current = activeSection;
        if (activeSection === section) {
            setIconsAtTop(false);
            setTimeout(() => setActiveSection(null), 200);
        } else {
            setIconsAtTop(true);
            setActiveSection(section);
        }
    };

    // Determine slide direction based on icon order
    const getSlideDirection = () => {
        if (!activeSection || !prevSectionRef.current) return 0;
        const currentIdx = sectionOrder.indexOf(activeSection);
        const prevIdx = sectionOrder.indexOf(prevSectionRef.current);
        return currentIdx > prevIdx ? 1 : -1; // 1 = slide from right, -1 = slide from left
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

    const direction = getSlideDirection();

    return (
        <div className="h-dvh flex flex-col overflow-hidden">
            {/* Theme Dot */}
            <div className="fixed bottom-4 right-4 z-50">
                <ThemeDot />
            </div>

            {/* Icon Row */}
            <motion.div
                className="flex items-center justify-center gap-10 md:gap-14 pt-8 pb-6"
                animate={{ y: iconsAtTop ? 0 : "calc(50vh - 80px)" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
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

            {/* Content Area - Only show when icons are at top */}
            <AnimatePresence mode="wait" initial={false}>
                {activeSection && iconsAtTop && (
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: direction * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -30 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 w-full max-w-3xl mx-auto px-8 overflow-hidden"
                    >
                        <div className="h-full overflow-y-auto pb-16">
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
            <div className="hidden md:grid md:grid-cols-2 md:gap-8">
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
