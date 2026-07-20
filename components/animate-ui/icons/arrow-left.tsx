"use client";

import type { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";



export interface ArrowLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { d: "m12 19-7-7 7-7", translateX: 0 },
  animate: {
    d: "m12 19-7-7 7-7",
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const SECOND_PATH_VARIANTS: Variants = {
  normal: { d: "M19 12H5" },
  animate: {
    d: ["M19 12H5", "M19 12H10", "M19 12H5"],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const ArrowLeftIcon = forwardRef<ArrowLeftIconHandle, ArrowLeftIconProps>(
  ({ className, size = 28, ...props }, ref) => {

    useImperativeHandle(ref, () => {
      return {
        startAnimation: () => {},
        stopAnimation: () => {},
      };
    });

    return (
      <div
        className={`flex items-center justify-center cursor-pointer ${className || ""}`}
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
          <motion.path
            animate="animate"
            d="m12 19-7-7 7-7"
            variants={PATH_VARIANTS}
          />
          <motion.path
            animate="animate"
            d="M19 12H5"
            variants={SECOND_PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export { ArrowLeftIcon };
