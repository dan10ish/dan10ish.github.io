"use client";

import { useState, useMemo, useEffect } from "react";
import { data, personalInfo } from "./data";
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

// Optimized spring for instant feel
const instantSpring = {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 0.8,
};

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
            className="w-3 h-3 rounded-full transition-colors duration-150 cursor-pointer"
            style={{
                backgroundColor: resolvedTheme === "light" ? "#000" : "#fff",
            }}
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
        () =>
            [...entries].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
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
        <div className="h-dvh flex flex-col" style={{ fontFamily: "var(--font-geist-sans)" }}>
            {/* Theme Dot - Fixed Bottom Right */}
            <div className="fixed bottom-4 right-4 z-50">
                <ThemeDot />
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex flex-col">
                {/* Icon Row */}
                <motion.div
                    className="flex items-center justify-center gap-12 md:gap-16"
                    style={{ willChange: "transform" }}
                    animate={{
                        y: activeSection ? 0 : "calc(50vh - 40px)",
                    }}
                    initial={false}
                    transition={instantSpring}
                >
                    <div className="flex items-center justify-center gap-12 md:gap-16 pt-8">
                        {icons.map(({ id, Icon }) => (
                            <motion.button
                                key={id}
                                onClick={() => handleIconClick(id)}
                                className="cursor-pointer"
                                style={{ willChange: "transform, opacity" }}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    opacity: activeSection && activeSection !== id ? 0.25 : 1,
                                }}
                                transition={{ duration: 0.15 }}
                            >
                                <Icon
                                    size={36}
                                    strokeWidth={1.5}
                                    className={`transition-colors duration-150 ${activeSection === id
                                            ? "text-foreground"
                                            : "text-secondary hover:text-foreground"
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content Area - Fills remaining space */}
                <AnimatePresence mode="sync">
                    {activeSection && (
                        <motion.div
                            key={activeSection}
                            className="flex-1 w-full max-w-2xl mx-auto px-6 overflow-hidden"
                            style={{ willChange: "transform, opacity" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="h-full overflow-y-auto pt-8 pb-16">
                                {activeSection === "about" && <AboutSection />}
                                {activeSection === "socials" && <SocialsSection />}
                                {activeSection === "finds" && (
                                    <FindsContent
                                        entries={sortedEntries}
                                        leftColumn={leftColumn}
                                        rightColumn={rightColumn}
                                    />
                                )}
                                {activeSection === "card" && <CardSection />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function AboutSection() {
    return (
        <div className="space-y-6 text-center">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
                    {data.personal.name}
                </h1>
                <p className="text-base text-secondary">
                    {data.personal.title.join(" · ")}
                </p>
            </div>

            <p className="text-sm text-secondary max-w-md mx-auto leading-relaxed">
                {personalInfo.about}
            </p>

            <div className="pt-4">
                <div className="text-xs text-secondary uppercase tracking-wider mb-4">
                    Experience
                </div>
                <div className="space-y-1.5">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="text-base">
                            {exp.company}{" "}
                            <span className="text-secondary">({exp.year})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SocialsSection() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.social.map((social, idx) => (
                <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg hover:border-foreground transition-colors duration-150 group"
                >
                    <span className="text-sm">{social.name}</span>
                    <ArrowUpRight
                        size={16}
                        className="text-secondary group-hover:text-foreground transition-colors"
                    />
                </a>
            ))}
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
        return <p className="text-secondary text-center py-8">No finds yet.</p>;
    }

    return (
        <div className="pb-8">
            {/* Mobile: single column */}
            <div className="space-y-6 md:hidden">
                {entries.map((entry) => (
                    <article
                        key={entry.id}
                        className="border-b border-[var(--border)] pb-6 last:border-b-0"
                    >
                        <TILContent entry={entry} />
                    </article>
                ))}
            </div>
            {/* Desktop: two columns */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                <div className="space-y-6">
                    {leftColumn.map((entry) => (
                        <article
                            key={entry.id}
                            className="border-b border-[var(--border)] pb-6 last:border-b-0"
                        >
                            <TILContent entry={entry} />
                        </article>
                    ))}
                </div>
                <div className="space-y-6">
                    {rightColumn.map((entry) => (
                        <article
                            key={entry.id}
                            className="border-b border-[var(--border)] pb-6 last:border-b-0"
                        >
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
        <div className="flex justify-center items-start">
            <Card />
        </div>
    );
}
