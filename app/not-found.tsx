'use client'

import { useTheme } from './context/ThemeContext'
import Link from 'next/link'

export default function NotFound() {
  const { nextTheme } = useTheme()

  return (
    <div className="!h-dvh md:!p-10 !p-8 !flex !flex-col !justify-between !overflow-hidden">
      <div className="!flex-1 !overflow-auto">
        <div className="!mb-8">
          <h1 className="!text-base !mb-1">404</h1>
          <p className="!text-base">PAGE NOT FOUND</p>
        </div>

        <div className="!mb-8">
          <Link
            href="/"
            className="social-link !text-base hover:!opacity-70 !transition-opacity !inline-flex !items-center !bg-[#00000025] ring-1 ring-[#ffffff20] !rounded-lg !px-2 !py-1 !ml-0.5"
          >
            HOME
          </Link>
        </div>
      </div>

      <div className="!flex !justify-start !mt-4">
        <button
          onClick={nextTheme}
          className="social-link !text-base hover:!opacity-70 !transition-opacity !border-none !p-2 !-m-2 !rounded-lg !cursor-pointer !inline-flex !items-center !bg-transparent"
          style={{ color: 'var(--text)' }}
        >
          THEME
        </button>
      </div>
    </div>
  );
}
