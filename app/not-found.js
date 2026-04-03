"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center gap-12 px-6">
      <div className="relative w-[200px] h-[100px] flex items-center justify-center animate-bounce">
        <div className="absolute w-[75px] h-[80px] bg-foreground rounded-[50%_50%_50%_50%/45px_45px_45%_45%] rotate-[45deg] left-0 after:content-[''] after:absolute after:border-b-2 after:border-foreground after:w-[70px] after:h-[50px] after:left-0 after:-bottom-[10px] after:rounded-[50%]"></div>
        <div className="absolute w-[75px] h-[80px] bg-foreground rounded-[50%_50%_50%_50%/45px_45px_45%_45%] -rotate-[45deg] right-0 after:content-[''] after:absolute after:border-b-2 after:border-foreground after:w-[70px] after:h-[50px] after:left-1 after:-bottom-[10px] after:rounded-[50%]"></div>
        
        <div className="absolute top-[30px] left-[25px] w-5 h-5 bg-foreground rounded-full shadow-[125px_0_0_currentColor] z-10 animate-pulse after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-2 after:h-2 after:bg-background after:rounded-full after:shadow-[125px_0_0_currentColor]"></div>
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl font-bold tracking-tighter">Oops!</h1>
        <p className="text-foreground/60 font-medium">Page not found</p>
      </div>

      <Link 
        href="/" 
        className="px-8 py-3 bg-foreground/[0.05] border border-foreground/10 rounded-full font-bold transition-all hover:bg-foreground/[0.08] hover:scale-105 active:scale-95"
      >
        ← Go Back
      </Link>
    </div>
  );
}
