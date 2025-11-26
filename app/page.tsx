'use client'

import Link from 'next/link'
import { useTheme } from './context/ThemeContext'
import { ArrowUpRight } from 'lucide-react'
import data from '../data.json'

function ExperienceTimeline() {
  return (
    <div className="!mb-8">
      <div className="!flex !flex-col">
        {data.experience.map((exp, index) => {
          const isLast = index === data.experience.length - 1
          
          return (
            <div key={index} className="!flex !gap-x-3 !relative">
              <div className="!relative">
                {!isLast ? (
                  <div 
                    className="!absolute !top-2 !left-[5px] !w-[2px] !-translate-x-1/2 timeline-line"
                    style={{ height: 'calc(100% - 0.5rem)' }}
                  />
                ) : null}
                <div className="!relative !z-10 !w-3 !h-3 !flex !justify-center !items-center !mt-1">
                  <div 
                    className="experience-dot !w-2.5 !h-2.5 !rounded-full !border-2"
                    style={{
                      borderColor: 'var(--bg)'
                    }}
                  />
                </div>
              </div>
              
              <div className={isLast ? "!pb-0" : "!pb-5"}>
                <div className="!flex !items-baseline !gap-x-3">
                  <span className="experience-year !text-sm !font-bold !w-10">
                    {exp.startYear}
                  </span>
                  <h3 
                    className="experience-company !text-sm !font-medium !opacity-70"
                    style={{ color: 'var(--text)' }}
                  >
                    {exp.company}
                  </h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  const { nextTheme } = useTheme()

  return (
    <div className="!h-dvh md:!p-10 !p-8 !flex !flex-col !justify-between !overflow-hidden">
      <div className="!flex-1 !overflow-auto">
        <div className="!mb-8">
          <h2 className="!text-base !mb-1">{data.personal.name}</h2>
          <p className="title-with-dots !text-base">
            {data.personal.title.map((item, index) => (
              <span key={index} className={`title-item ${index < data.personal.title.length - 1 ? 'has-dot' : ''}`}>
                {item}
              </span>
            ))}
          </p>
        </div>

        <ExperienceTimeline />

        <div className="!mb-8">
          {data.social.map((social, index) => (
            <div key={index} className="!mb-1">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link !text-base hover:!opacity-70 !transition-opacity !inline-flex !items-center"
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
            className="social-link !text-base hover:!opacity-70 !transition-opacity !inline-flex !items-center !bg-[#00000025] ring-1 ring-[#ffffff20] !rounded-lg !px-2 !py-1 !ml-0.5"
          >
            FINDS
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
