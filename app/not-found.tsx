import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="font-mono p-8 md:p-12 max-w-3xl mx-auto text-sm flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Page Not Found</p>
        <Link
          href="/"
          className="mt-6 inline-block py-2 px-4 border border-gray-500 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
} 