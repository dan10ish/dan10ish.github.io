"use client";

import { useState } from "react";
import { data } from "./data";
import Link from "next/link";
import { ArrowUpRight, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./components/Card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
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

export default function Home() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="min-h-dvh flex justify-center px-8 py-8 md:py-12 md:px-10"
      >
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <motion.div variants={item} className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
              {data.personal.name}
            </motion.div>

            <motion.div variants={item} className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight">
              {data.personal.title.join(" | ")}
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">Experience</div>
              <div className="space-y-2">
                {data.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight"
                  >
                    {exp.company} ({exp.year})
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              <div className="text-[16px] md:text-[20px] leading-[1.1] font-medium text-secondary tracking-tight">Socials</div>
              <div className="space-y-2">
                {data.social.map((social, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="block w-full text-left text-[22px] md:text-[24px] leading-[1.1] font-semibold tracking-tight"
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity inline-flex items-center gap-1 group"
                    >
                      <span className="group-hover:opacity-70 transition-opacity">{social.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-secondary group-hover:text-[var(--link-blue)] transition-colors" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="text-[20px] md:text-[22px] leading-[1.1] font-semibold tracking-tight text-primary pt-4">
              <Link prefetch href="/finds" className="bg-[var(--border)] hover:ring-[var(--link-blue)] hover:ring-1 hover:text-[var(--link-blue)] transition-opacity px-3.5 py-2 rounded-xl transition-all duration-200">
                Finds
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Card Button - Bottom Left */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsCardOpen(true)}
        className="fixed bottom-4 left-3 md:left-5 md:bottom-6 z-50 p-2 text-secondary hover:text-foreground transition-colors cursor-pointer"
        aria-label="Open card"
      >
        <CreditCard size={24} />
      </motion.button>

      {/* Card Overlay */}
      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsCardOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <Card onClose={() => setIsCardOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
