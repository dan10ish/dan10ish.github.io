'use client'

import { useTheme } from './context/ThemeContext'
import Link from 'next/link'

export default function NotFound() {
  const { nextTheme } = useTheme()

  return (
    <div className="!h-dvh !overflow-hidden">
      <div className="!flex-1 !overflow-auto">
        <div className="!mb-8">
          <h1 className="!mb-1">404</h1>
          <p>PAGE NOT FOUND</p>
        </div>

        <div className="!mb-8">
          <Link
            href="/"
            className="!text-sm! hover:!opacity-70 !transition-opacity !inline-flex !items-center !bg-[#00000025] ring-1 ring-[#ffffff20] !rounded-lg !px-2 !py-1 !ml-0.5"
          >
            HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
