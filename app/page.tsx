'use client'

import { useTheme } from './context/ThemeContext'
import { ArrowUpRight } from 'lucide-react'
import data from '../data.json'

export default function Home() {
  const { nextTheme } = useTheme()

  const maxCompanyLength = Math.max(...data.experience.map(exp => exp.company.length))

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

        <div className="!mb-8">
          {data.experience.map((exp, index) => (
            <div key={index} className="!mb-1 !flex !items-center">
              <span 
                className="!text-base"
                style={{ width: `${maxCompanyLength}ch` }}
              >
                {exp.company}
              </span>
              <span className="!text-base !ml-5 !flex !items-center">
                {exp.startYear} → {exp.endYear === "...." ? <span className="dot-loader !ml-2"></span> : exp.endYear}
              </span>
            </div>
          ))}
        </div>

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
