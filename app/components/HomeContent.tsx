'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Github, Mail, Instagram } from 'lucide-react'
import { personalInfo, experience } from '../data'
import { formatDate, getTILEntries } from '../../lib/client'
import TILContent from './TILContent'

const XIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
  </svg>
)

const LinkedInIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
  </svg>
)

const SnapchatIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" />
  </svg>
)

const PinterestIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16,1C7.7,1,1,7.7,1,16c0,5.9,3.5,11.1,8.5,13.5c0-1.3,0.1-2.4,0.3-3.3l1.9-8c-0.1-0.4-0.5-1.2-0.5-2.4c0-2.5,1.5-4.4,3.4-4.4c1.5,0,2.5,1.1,2.5,2.8c0,1-0.4,2.1-0.8,3.4c-0.2,0.7-0.4,1.4-0.6,2.1c-0.1,0.6,0,1.1,0.3,1.6c0.4,0.5,0.9,0.7,1.6,0.7c2.4,0,4.3-3.2,4.3-7.5c0-3.2-2.2-5.2-5.7-5.2c-4.5,0-6.9,3.4-6.9,6.7c0,1.1,0.3,1.9,0.9,2.6c0.3,0.4,0.5,0.7,0.3,1.3l-0.3,1.2c-0.1,0.3-0.3,0.6-0.5,0.7c-0.3,0.1-0.6,0.1-0.9,0c-2.1-0.9-3.4-3.2-3.4-6.2c0-4.9,4.2-9.9,11.2-9.9c6.3,0,10,4.6,10,9.1c0,6.2-3.6,10.8-8.6,10.8c-1.3,0-2.6-0.5-3.4-1.3c-0.3,1.1-0.7,2.7-0.8,3.2c-0.3,1.2-1,2.4-1.5,3.2c1.2,0.3,2.4,0.5,3.7,0.5c8.3,0,15-6.7,15-15S24.3,1,16,1z" />
  </svg>
)

interface TILEntry {
  id: string
  date: string
  content_type: 'tweet' | 'text' | 'link' | 'youtube' | 'book' | 'image'
  content: string
  metadata?: {
    title?: string
    author?: string
    description?: string
    image?: string
  }
  created_at: string
}

interface Writing {
  slug: string
  title: string
  date: string
}

export default function HomeContent({ writings }: { writings: Writing[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab') as 'about' | 'writings' | 'finds' | null
  const [activeTab, setActiveTab] = useState<'about' | 'writings' | 'finds'>(tabFromUrl || 'about')
  const [tilEntries, setTilEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tabFromUrl && ['about', 'writings', 'finds'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  const handleTabChange = (tab: 'about' | 'writings' | 'finds') => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'about') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }
    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl, { scroll: false })
  }

  useEffect(() => {
    if (activeTab === 'finds' && tilEntries.length === 0) {
      setLoading(true)
      getTILEntries().then((entries) => {
        setTilEntries(entries)
        setLoading(false)
      })
    }
  }, [activeTab, tilEntries.length])

  return (
    <section>
      <div className="!flex !gap-2 md:!gap-4 !-ml-2 !mb-3 !relative">
        <h1
          onClick={() => handleTabChange('about')}
          className="!relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
          style={{ opacity: activeTab === 'about' ? 1 : 0.7 }}
        >
          {activeTab === 'about' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          About
        </h1>
        <h1
          onClick={() => handleTabChange('writings')}
          className="!relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
          style={{ opacity: activeTab === 'writings' ? 1 : 0.7 }}
        >
          {activeTab === 'writings' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Writings
        </h1>
        <h1
          onClick={() => handleTabChange('finds')}
          className="!relative !text-base !cursor-pointer !transition-opacity !text-[0.9rem] !px-2 !py-1 !rounded-md !z-10"
          style={{ opacity: activeTab === 'finds' ? 1 : 0.7 }}
        >
          {activeTab === 'finds' && (
            <motion.div
              layoutId="homeActiveTab"
              className="!absolute !inset-0 !bg-[var(--code-bg)] !rounded-md !-z-10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Finds
        </h1>
      </div>

      {activeTab === 'about' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-base">{personalInfo.about}</p>
          <div className="!mt-8">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-2 w-full items-baseline justify-between">
                <span className="text-base">{exp.company}</span>
                <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                  {exp.startYear} → {exp.endYear || <span className="animated-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 !mt-8">
            <Link href={`https://github.com/${personalInfo.socials.github}`} target="_blank" className="flex items-center justify-center" aria-label="GitHub">
              <Github size={20} />
            </Link>
            <Link href={`mailto:${personalInfo.socials.email}`} className="flex items-center justify-center" aria-label="Email">
              <Mail size={20} />
            </Link>
            <Link href={`https://www.linkedin.com/in/${personalInfo.socials.linkedin}`} target="_blank" className="flex items-center justify-center" aria-label="LinkedIn">
              <LinkedInIcon />
            </Link>
            <Link href={`https://x.com/${personalInfo.socials.x}`} target="_blank" className="flex items-center justify-center" aria-label="X">
              <XIcon />
            </Link>
            <Link href={`https://instagram.com/${personalInfo.socials.instagram}`} target="_blank" className="flex items-center justify-center" aria-label="Instagram">
              <Instagram size={20} />
            </Link>
            <Link href={`https://www.snapchat.com/add/${personalInfo.socials.snapchat}`} target="_blank" className="flex items-center justify-center" aria-label="Snapchat">
              <SnapchatIcon />
            </Link>
            <Link href={`https://www.pinterest.com/${personalInfo.socials.pinterest}`} target="_blank" className="flex items-center justify-center" aria-label="Pinterest">
              <PinterestIcon />
            </Link>
          </div>
        </motion.div>
      )}

      {activeTab === 'writings' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="!mt-1"
        >
          {writings.length > 0 ? (
            writings.map(({ slug, title, date }) => (
              <Link
                href={`/writings/${slug}`}
                key={slug}
                className="!block group writing-link !mb-1"
              >
                <div className="!flex !gap-2 !w-full !items-baseline !justify-between">
                  <span className="!text-primary !font-medium touch-underline group-hover:!text-[var(--link-blue)] !truncate">
                    {title}
                  </span>
                  <span className="!text-secondary !text-[0.82rem] !flex-shrink-0">
                    {formatDate(date)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="!text-base !text-secondary">No writings yet.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'finds' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="!space-y-6"
        >
          {loading ? (
            <div className="!flex !justify-center !py-8">
              <Loader2 className="!w-6 !h-6 !animate-spin !text-secondary" />
            </div>
          ) : tilEntries.length > 0 ? (
            tilEntries.map((entry) => (
              <article
                key={entry.id}
                className="!border-b !border-[var(--border)] !pb-6 last:!border-b-0"
              >
                <p className="!text-secondary !text-[0.82rem] !mb-3">
                  {formatDate(entry.date)}
                </p>
                <TILContent entry={entry} />
              </article>
            ))
          ) : (
            <p className="!text-base !text-secondary">No entries yet.</p>
          )}
        </motion.div>
      )}
    </section>
  )
}

