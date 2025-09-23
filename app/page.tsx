'use client'

import { useTheme } from './context/ThemeContext'
import data from '../data.json'

export default function Home() {
  const { nextTheme } = useTheme()

  return (
    <div className="!min-h-screen !p-8 !flex !flex-col !justify-between">
      <div>
        <div className="!mb-8">
          <h1 className="!text-base !mb-4">P.CV</h1>
        </div>

        <div className="!mb-8">
          <h2 className="!text-base !mb-1">{data.personal.name}</h2>
          <p className="!text-base">{data.personal.title}</p>
        </div>

        <div className="!mb-8">
          {data.experience.map((exp, index) => (
            <div key={index} className="!mb-1">
              <span className="!text-base">
                {exp.company.padEnd(8)} {exp.startYear} → {exp.endYear}
              </span>
            </div>
          ))}
        </div>

        <div className="!mb-8">
          {data.sections.map((section, index) => (
            <div key={index} className="!mb-1">
              <span className="!text-base">{section}</span>
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
                className="!text-base hover:!opacity-70 !transition-opacity"
              >
                {social.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="!flex !justify-start">
        <button
          onClick={nextTheme}
          className="!text-base hover:!opacity-70 !transition-opacity !bg-transparent !border-none !p-0 !cursor-pointer"
          style={{ color: 'var(--text)' }}
        >
          THEME
        </button>
      </div>
    </div>
  );
}
