import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-base font-bold">404</h1>
        <p className="text-base opacity-70">page not found</p>
        
        <Link href="/" className="inline-flex items-center mt-6 hover-underline" aria-label="Go back to home page">
          <ArrowLeft size={16} className="mr-2" />
          <span>back to home</span>
        </Link>
      </div>
    </div>
  );
}