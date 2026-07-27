"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ContrastIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ContrastIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isDark?: boolean;
}

const PATH_VARIANT: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 180,
    transformOrigin: "left center",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

const ContrastIcon = forwardRef<ContrastIconHandle, ContrastIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, isDark, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (isDark !== undefined) {
        isControlledRef.current = true;
        if (isDark) {
          controls.start("animate");
        } else {
          controls.start("normal");
        }
      }
    }, [isDark, controls]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
