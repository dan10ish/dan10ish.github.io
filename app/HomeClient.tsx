"use client";

import { useState, useEffect } from "react";
import { data, personalInfo } from "./data";
import { User, Share2, CreditCard, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./components/Card";
import { useTheme } from "next-themes";

type Section = "about" | "socials" | "card" | null;

const icons = [
    { id: "about" as const, Icon: User },
    { id: "socials" as const, Icon: Share2 },
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
            className="p-3 -m-3 cursor-pointer group"
            aria-label="Toggle theme"
        >
            <span
                className="block w-3.5 h-3.5 rounded-full transition-transform duration-150 group-hover:scale-125"
                style={{ backgroundColor: resolvedTheme === "light" ? "#000" : "#fff" }}
            />
        </button>
    );
}

export default function HomeClient() {
    const [activeSection, setActiveSection] = useState<Section>(null);
    const [iconsAtTop, setIconsAtTop] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleIconClick = (section: Section) => {
        if (activeSection === section) {
            // Closing
            setShowContent(false);
            setIconsAtTop(false);
            setTimeout(() => setActiveSection(null), 200);
        } else if (activeSection) {
            // Switching between sections - instant, no delay
            setActiveSection(section);
        } else {
            // First open - wait for icons to move up
            setIconsAtTop(true);
            setActiveSection(section);
            setTimeout(() => setShowContent(true), 250);
        }
    };

    return (
        <div className="h-dvh flex flex-col overflow-hidden">
            {/* Theme Dot */}
            <div className="fixed bottom-6 right-6 md:right-7 z-50">
                <ThemeDot />
            </div>

            {/* Icon Row */}
            <div
                className="flex items-center justify-center gap-8 md:gap-10 pt-8 pb-10 transition-transform duration-300 ease-out"
                style={{
                    transform: iconsAtTop ? "translateY(0)" : "translateY(40vh)",
                    background: "linear-gradient(to bottom, var(--background) 0%, var(--background) 60%, transparent 100%)",
                    position: "relative",
                    zIndex: 10
                }}
            >
                {icons.map(({ id, Icon }) => (
                    <button
                        key={id}
                        onClick={() => handleIconClick(id)}
                        className="cursor-pointer p-3 -m-3 transition-opacity duration-200"
                        style={{
                            opacity: activeSection && activeSection !== id ? 0.4 : 1
                        }}
                    >
                        <Icon
                            size={28}
                            strokeWidth={2}
                            className={`transition-colors duration-150 ${activeSection === id ? "text-foreground" : "text-secondary hover:text-foreground"}`}
                        />
                    </button>
                ))}
            </div>

            {/* Content Area - Only show when icons are at top */}
            <AnimatePresence mode="wait" initial={false}>
                {activeSection && showContent && (
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`flex-1 w-full mx-auto px-8 max-w-md ${activeSection === "card" ? "" : "overflow-hidden"}`}
                    >
                        <div className={`pb-16 ${activeSection === "card" ? "flex items-start justify-center pt-12" : "h-full flex items-center justify-center overflow-y-auto scrollbar-hide"
                            }`}>
                            {activeSection === "about" && <AboutSection />}
                            {activeSection === "socials" && <SocialsSection />}
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
        <div className="space-y-8 md:space-y-10">
            <div className="space-y-1">
                <div className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-tight">
                    {data.personal.name}
                </div>
                <div className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-tight text-secondary">
                    {data.personal.title.join(" | ")}
                </div>
            </div>

            <div className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-tight text-secondary">
                {personalInfo.about}
            </div>

            <div className="space-y-1">
                <div className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-tight">
                    Experience
                </div>
                <div className="space-y-1">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-tight text-secondary">
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
        <div className="text-center">
            <div className="space-y-4">
                {data.social.map((social, idx) => (
                    <div key={idx} className="text-[18px] md:text-[20px] leading-[1.4] font-medium tracking-normal">
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

function CardSection() {
    return (
        <div className="flex">
            <Card />
        </div>
    );
}
