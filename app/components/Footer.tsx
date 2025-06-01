"use client";

import { Copyright } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const mumbaiTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      
      setCurrentTime(mumbaiTime);
      setCurrentYear(now.getFullYear());
    };

    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const [hours, minutes] = currentTime.split(':');

  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 70% { opacity: 1; }
          71%, 100% { opacity: 0.3; }
        }
        .blinking-colon {
          animation: blink 1s infinite;
        }
      `}</style>
      <footer className="!pt-4 !pb-0 text-[0.75rem] opacity-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Copyright size={12} />
            <span>{currentYear}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>
              {hours}<span className="blinking-colon">:</span>{minutes}
            </span>
            <span>Mumbai</span>
          </div>
        </div>
      </footer>
    </>
  );
}