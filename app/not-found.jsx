"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-12 px-6">
      <motion.div 
        className="relative w-[200px] h-[100px] flex items-center justify-center"
        animate={{
          x: [1, 0, -1],
          y: ["1em", "1em", "1em"],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Ghost Body (Meta) */}
        <div className="absolute inset-0 flex justify-center">
          <div className="relative w-[75px] h-[80px] bg-foreground rounded-[50%_50%_50%_50%/45px_45px_45%_45%] rotate-[45deg] left-0 after:content-[''] after:absolute after:border-b-2 after:border-foreground after:w-[70px] after:h-[50px] after:left-0 after:-bottom-[10px] after:rounded-[50%]"></div>
          <div className="ml-auto relative w-[75px] h-[80px] bg-foreground rounded-[50%_50%_50%_50%/45px_45px_45%_45%] -rotate-[45deg] right-0 after:content-[''] after:absolute after:border-b-2 after:border-foreground after:w-[70px] after:h-[50px] after:left-1 after:-bottom-[10px] after:rounded-[50%]"></div>
        </div>

        {/* Eyes (::after in original) */}
        <motion.div
          className="absolute top-[30px] left-[25px] w-5 h-5 bg-foreground rounded-full shadow-[125px_0_0_black] dark:shadow-[125px_0_0_white] z-10"
          animate={{
            x: [0, 0, 0, 0, 0, -20, 20, 0, 0],
            y: [0, 20, 20, 0, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.1, 0.25, 0.3, 0.55, 0.65, 0.8, 0.9, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pupils (::before in original) */}
        <motion.div
          className="absolute top-[35px] left-[30px] w-2 h-2 bg-background rounded-full shadow-[125px_0_0_white] dark:shadow-[125px_0_0_#0a0a0b] z-20"
          animate={{
            x: [0, 0, 0, 0, 0, -20, 20, 0, 0],
            y: [0, 20, 20, 0, 0, 0, 0, 0, 0],
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.1, 0.25, 0.3, 0.55, 0.65, 0.8, 0.9, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl font-bold tracking-tighter">Oops!</h1>
        <p className="text-[#6B7280] dark:text-[#71717A] font-medium leading-relaxed">
          Page not found
        </p>
      </div>

      <Link 
        href="/" 
        className="px-8 py-3 bg-foreground/[0.05] border border-foreground/10 rounded-full font-bold hover:bg-foreground/[0.08] active:scale-95 transition-transform"
      >
        ← Go Back
      </Link>
    </div>
  );
}
