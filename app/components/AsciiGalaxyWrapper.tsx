'use client';

import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

const AsciiGalaxy = dynamic(() => import("./AsciiGalaxy"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-24 relative overflow-hidden my-2 flex items-center justify-center">
      <Loader size={20} className="animate-spin text-[var(--secondary)] opacity-60" />
    </div>
  )
});

export default function AsciiGalaxyWrapper() {
  return <AsciiGalaxy />;
} 