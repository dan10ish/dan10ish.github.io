import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="fixed inset-0 overflow-hidden flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-base font-bold !mb-4">404</h1>
        <p className="text-base opacity-70 !mb-4">Page not found</p>
        
        <Link 
          href="/" 
          className="inline-flex items-center hover:bg-[var(--code-bg)] rounded-lg !px-2 !-mx-2 !py-1" 
          aria-label="Go back to home page"
        >
          <ArrowLeft size={16} className="!mr-2" />
          <span>Back to home</span>
        </Link>
      </div>
    </main>
  );
}