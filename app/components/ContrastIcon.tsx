"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ContrastIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
  setThemeState: (theme: string) => void;
}

interface ContrastIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  currentTheme?: string;
}

const PATH_VARIANT: Variants = {
  normal: { rotate: 0, transformOrigin: "left center" },
  gray: {
    rotate: 0,
    transformOrigin: "left center",
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
  green: {
    rotate: 90,
    transformOrigin: "left center",
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
  onyx: {
    rotate: 180,
    transformOrigin: "left center",
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
  solarized: {
    rotate: 270,
    transformOrigin: "left center",
    transition: { type: "spring", stiffness: 80, damping: 12 },
  },
};

const ContrastIcon = forwardRef<ContrastIconHandle, ContrastIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, currentTheme = "gray", ...props }, ref) => {
    const controls = useAnimation();
    const isHoveredRef = useRef(false);

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        isHoveredRef.current = true;
        
      },
      stopAnimation: () => {
        isHoveredRef.current = false;
      },
      setThemeState: (theme: string) => {
        controls.start(theme);
      }
    }));

    useEffect(() => {
      controls.start(currentTheme);
    }, [currentTheme, controls]);

    return (
      <div
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
          <circle cx="12" cy="12" r="10" />
          <motion.path
            animate={controls}
            d="M12 18a6 6 0 0 0 0-12v12z"
            initial="normal"
            variants={PATH_VARIANT}
          />
        </svg>
      </div>
    );
  }
);

ContrastIcon.displayName = "ContrastIcon";

export { ContrastIcon };
