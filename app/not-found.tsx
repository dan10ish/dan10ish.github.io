'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
    document.body.style.padding = '0';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.padding = '';
    };
  }, []);

  return (
    <div className="!max-h-[100dvh] h-[100dvh] overflow-hidden flex items-center justify-center" data-page="404">
      <div className="text-center space-y-4">
        <h1 className="text-base font-bold">404</h1>
        <p className="text-base opacity-70">Page not found</p>
        
        <Link href="/" className="inline-flex items-center mt-6 hover-underline" aria-label="Go back to home page">
          <ArrowLeft size={16} className="!mr-2" />
          <span>Back to homepage</span>
        </Link>
      </div>
    </div>
  );
}