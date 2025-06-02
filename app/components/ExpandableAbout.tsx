'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { personalInfo } from "../data";

export default function ExpandableAbout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section>
      <div className="flex items-start gap-2">
        <p className="text-base flex-1">{personalInfo.about}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 p-1 -mt-1 hover:opacity-60 transition-opacity"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="!pt-4 space-y-4">
              <div className="mt-1 flex flex-wrap gap-2">
                {personalInfo.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-[0.88em] bg-[var(--code-bg)] text-[var(--secondary)] !px-1.5 !py-0.5 rounded-md whitespace-nowrap"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 