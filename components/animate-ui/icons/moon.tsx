"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";


interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SVG_VARIANTS: Variants = {
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }
  },
};

const MoonIcon = forwardRef<HTMLDivElement, MoonIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        <motion.svg
          animate="animate"
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          variants={SVG_VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.svg>
      </div>
    );
  }
);

MoonIcon.displayName = "MoonIcon";

export { MoonIcon };
