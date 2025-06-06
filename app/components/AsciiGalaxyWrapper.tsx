'use client';

import dynamic from "next/dynamic";

const AsciiGalaxy = dynamic(() => import("./AsciiGalaxy"), {
  ssr: false,
  loading: () => <div className="w-full h-24 relative overflow-hidden my-2" />
});

export default AsciiGalaxy; 