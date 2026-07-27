"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";


interface SunIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  animate: (i: number) => ({
    opacity: [0.3, 1, 0.3],
    transition: { delay: i * 0.1, duration: 1.5, repeat: Infinity, ease: "linear" },
  }),
};

const SunIcon = forwardRef<HTMLDivElement, SunIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4" />
          {[
            "M12 2v2",
            "m19.07 4.93-1.41 1.41",
            "M20 12h2",
            "m17.66 17.66 1.41 1.41",
            "M12 20v2",
            "m6.34 17.66-1.41 1.41",
            "M2 12h2",
            "m4.93 4.93 1.41 1.41",
          ].map((d, index) => (
            <motion.path
              animate="animate"
              custom={index + 1}
              d={d}
              key={d}
              variants={PATH_VARIANTS}
            />
          ))}
        </svg>
      </div>
    );
  }
);

SunIcon.displayName = "SunIcon";

export { SunIcon };
