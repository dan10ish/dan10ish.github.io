"use client";

import { useState, useEffect } from "react";
import { data, personalInfo } from "./data";
import { User, Share2, CreditCard, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./components/Card";
import { useTheme } from "next-themes";
import { BloomMenu } from "@/components/motion/bloom-menu";

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

const MENU_ITEMS = [
    { label: "About", icon: User },
    { label: "Socials", icon: Share2 },
    { label: "Card", icon: CreditCard },
];

export default function HomeClient() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    return (
        <div className="h-dvh flex flex-col items-center justify-center overflow-hidden relative bg-background">
            <div className="fixed bottom-6 right-6 md:right-7 z-50">
                <ThemeDot />
            </div>

            <div className="z-50 shrink-0">
                <BloomMenu 
                    items={MENU_ITEMS}
                    activeSection={activeSection}
                    onSelect={(label) => setActiveSection(label)}
                    onClose={() => setActiveSection(null)}
                >
                    {activeSection === "About" && <AboutSection />}
                    {activeSection === "Socials" && <SocialsSection />}
                    {activeSection === "Card" && <CardSection />}
                </BloomMenu>
            </div>
        </div>
    );
}

function AboutSection() {
    return (
        <div className="space-y-6 w-full">
            <div className="space-y-1">
                <div className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight">
                    {data.personal.name}
                </div>
                <div className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight text-secondary">
                    {data.personal.title.join(" | ")}
                </div>
            </div>

            <div className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight text-secondary">
                {personalInfo.about}
            </div>

            <div className="space-y-1">
                <div className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight">
                    Experience
                </div>
                <div className="space-y-1">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight text-secondary">
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
        <div className="text-center w-full py-4">
            <div className="space-y-5">
                {data.social.map((social, idx) => (
                    <div key={idx} className="text-[17px] md:text-[19px] leading-[1.4] font-medium tracking-tight">
                        <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 group"
                        >
                            <span className="group-hover:opacity-70 transition-opacity">{social.name}</span>
                            <ArrowUpRight className="w-4 h-4 text-secondary group-hover:text-[var(--link-blue)] transition-colors" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CardSection() {
    return (
        <div className="flex justify-center w-full py-2">
            <Card />
        </div>
    );
}
