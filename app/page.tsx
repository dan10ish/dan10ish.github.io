'use client'

import Link from 'next/link'
import { useTheme } from './context/ThemeContext'
import { ArrowUpRight } from 'lucide-react'
import data from '../data.json'

export default function Home() {
  const { nextTheme } = useTheme()

  return (
    <div className="!h-dvh p-12! !flex !flex-col !justify-between !overflow-hidden">
      <div className="!flex-1 !overflow-auto font-semibold!">
        <div className="!mb-8">
          <h2 className="!mb-1">{data.personal.name}</h2>
          <p className="!text-xl ">
            {data.personal.title.map((item, index) => (
              <span key={index} className={`title-item ${index < data.personal.title.length - 1 ? 'has-dot' : ''}`}>
                {item}
              </span>
            ))}
          </p>
        </div>

        <div className="!mb-8">
          {data.social.map((social, index) => (
            <div key={index} className="!mb-1">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link !text-xl  hover:!opacity-70 !transition-opacity !inline-flex !items-center"
              >
                {social.name}
                <ArrowUpRight 
                  size={16} 
                  className="social-link-icon"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="!mb-8">
          <Link
            href="/finds"
            className="social-link !text-xl  hover:!opacity-70 !transition-opacity !inline-flex !items-center !bg-[#00000025] ring-1 ring-[#ffffff20] !rounded-lg !px-2 !py-1 !ml-0.5"
          >
            FINDS
          </Link>
        </div>
      </div>

      <div className="!flex !justify-start !mt-4">
        <button
          onClick={nextTheme}
          className="social-link !text-xl  hover:!opacity-70 !transition-opacity !border-none !p-2 !-m-2 !rounded-lg !cursor-pointer !inline-flex !items-center !bg-transparent"
          style={{ color: 'var(--text)' }}
        >
          THEME
        </button>
      </div>
    </div>
  );
}
