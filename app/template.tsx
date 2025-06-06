"use client";

import { PageTransition } from "./components/PageTransition";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showFooter, setShowFooter] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const is404Element = document.querySelector('[data-page="404"]');
      setShowFooter(!is404Element);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [children]);
  
  return (
    <PageTransition>
      <div className="flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        {showFooter && <Footer />}
      </div>
    </PageTransition>
  );
} 