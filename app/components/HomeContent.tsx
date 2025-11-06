'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Github, Mail, Instagram, Globe } from 'lucide-react'
import { personalInfo, experience, projects } from '../data'
import { formatDate, getTILEntries } from '../../lib/client'
import TILContent from './TILContent'
import Menu from './Menu'
import GitHubContributions from './GitHubContributions'

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

interface GitHubData {
  contributions: any[]
  totalContributions: number
}

export default function HomeContent({ writings }: { writings: Writing[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get('tab') as 'home' | 'projects' | 'writings' | 'finds' | null
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'writings' | 'finds'>(tabFromUrl || 'home')
  const [tilEntries, setTilEntries] = useState<TILEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [githubData, setGithubData] = useState<GitHubData | null>(null)

  useEffect(() => {
    if (tabFromUrl && ['home', 'projects', 'writings', 'finds'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl)
    } else if (!tabFromUrl) {
      setActiveTab('home')
    }
  }, [tabFromUrl])

  const handleTabChange = (tab: 'home' | 'projects' | 'writings' | 'finds') => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'home') {
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

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/dan10ish?y=last')
        const data = await response.json()
        
        if (data?.contributions) {
          setGithubData({
            contributions: data.contributions,
            totalContributions: data.contributions.reduce((sum: number, c: any) => sum + c.count, 0)
          })
        }
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error)
      }
    }
    
    fetchGitHubData()
  }, [])

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <section className="mb-6! flex! items-start! justify-between!">
        <h1 className="text-base! font-bold! header-text!">{personalInfo.name}</h1>
        <div className="flex items-center gap-2">
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
        </div>
      </section>
      <section>
      <div className="flex! gap-2! md:gap-4! -ml-2! mb-4! relative!">
        <h1
          onClick={() => handleTabChange('home')}
          className="relative! text-base! cursor-pointer! transition-opacity! text-[0.9rem]! px-2! py-1! rounded-md! z-10!"
          style={{ opacity: activeTab === 'home' ? 1 : 0.7 }}
        >
          {activeTab === 'home' && (
            <motion.div
              layoutId="homeActiveTab"
              className="absolute! inset-0! bg-(--code-bg)! rounded-md! -z-10!"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Home
        </h1>
        <h1
          onClick={() => handleTabChange('projects')}
          className="relative! text-base! cursor-pointer! transition-opacity! text-[0.9rem]! px-2! py-1! rounded-md! z-10!"
          style={{ opacity: activeTab === 'projects' ? 1 : 0.7 }}
        >
          {activeTab === 'projects' && (
            <motion.div
              layoutId="homeActiveTab"
              className="absolute! inset-0! bg-(--code-bg)! rounded-md! -z-10!"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Projects
        </h1>
        <h1
          onClick={() => handleTabChange('writings')}
          className="relative! text-base! cursor-pointer! transition-opacity! text-[0.9rem]! px-2! py-1! rounded-md! z-10!"
          style={{ opacity: activeTab === 'writings' ? 1 : 0.7 }}
        >
          {activeTab === 'writings' && (
            <motion.div
              layoutId="homeActiveTab"
              className="absolute! inset-0! bg-(--code-bg)! rounded-md! -z-10!"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Writings
        </h1>
        <h1
          onClick={() => handleTabChange('finds')}
          className="relative! text-base! cursor-pointer! transition-opacity! text-[0.9rem]! px-2! py-1! rounded-md! z-10!"
          style={{ opacity: activeTab === 'finds' ? 1 : 0.7 }}
        >
          {activeTab === 'finds' && (
            <motion.div
              layoutId="homeActiveTab"
              className="absolute! inset-0! bg-(--code-bg)! rounded-md! -z-10!"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          Finds
        </h1>
      </div>

      {activeTab === 'home' && (
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-base">{personalInfo.about}</p>
            {(() => {
              const current = experience.find((e: any) => e.current)
              const previous = experience.filter((e: any) => !e.current)
              const sentences: string[] = []
              if (current) sentences.push(`Currently, ${current.title} @ ${current.company}.`)
              if (previous.length > 0) {
                const prevText = previous.map((e: any) => `${e.title} @ ${e.company}`).join('; ')
                sentences.push(`Previously, ${prevText}.`)
              }
              return <p className="text-base mt-6!"> {sentences.join(' ')}</p>
            })()}
          <GitHubContributions githubData={githubData} />
        </motion.div>
      )}

      {activeTab === 'projects' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {projects.length > 0 ? (
            <div className="overflow-x-auto!">
              <table className="w-full! text-left! border-collapse! border! border-(--border)!">
                <thead>
                  <tr className="bg-(--code-bg)! border-b! border-(--border)!">
                    <th className="px-2! md:px-4! py-1! md:py-1.5! text-base font-bold! border-(--border)!">Project</th>
                    <th className="px-2! md:px-4! py-1! md:py-1.5! text-base font-bold! text-center! border-(--border)!">Links</th>
                    <th className="px-3! md:px-5! py-1! md:py-1.5! text-base font-bold! text-right!">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index} className="border! border-(--border)!">
                      <td className="px-2! md:px-4! py-1.5! md:py-1.5! text-base border-(--border)!">{project.title}</td>
                      <td className="px-2! md:px-4! py-1.5! md:py-1.5! text-center! border-(--border)!">
                        <div className="flex! items-center! justify-center! gap-3!" style={{ willChange: 'transform' }}>
                          {project.github ? (
                            <Link 
                              href={project.github} 
                              target="_blank" 
                              className="text-secondary! hover:text-(--link-blue)! transition-colors!"
                              aria-label="GitHub"
                            >
                              <Github size={18} />
                            </Link>
                          ) : (
                            <span className="text-secondary! opacity-30! cursor-default!" aria-label="GitHub (unavailable)">
                              <Github size={18} />
                            </span>
                          )}
                          {project.live ? (
                            <Link 
                              href={project.live} 
                              target="_blank" 
                              className="text-secondary! hover:text-(--link-blue)! transition-colors!"
                              aria-label="Live Demo"
                            >
                              <Globe size={18} />
                            </Link>
                          ) : (
                            <span className="text-secondary! opacity-30! cursor-default!" aria-label="Live Demo (unavailable)">
                              <Globe size={18} />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-2! md:px-4! py-1.5! md:py-1.5! text-right!">
                        <span className="text-secondary! text-[0.75rem]! bg-(--code-bg)! px-2! py-0.5! rounded-md!">
                          {project.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-base text-secondary!">No projects yet.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'writings' && (
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1!"
        >
          {writings.length > 0 ? (
            writings.map(({ slug, title, date }) => (
              <Link
                href={`/writings/${slug}`}
                key={slug}
                className="block! group writing-link mb-1!"
              >
                <div className="flex! gap-2! w-full! items-baseline! justify-between!">
                  <span className="text-primary! font-medium! touch-underline group-hover:text-(--link-blue)! truncate!">
                    {title}
                  </span>
                  <span className="text-secondary! text-[0.82rem]! shrink-0!">
                    {formatDate(date)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-base text-secondary!">No writings yet.</p>
          )}
        </motion.div>
      )}

      {activeTab === 'finds' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {loading ? (
            <div className="w-full! flex! justify-center! py-8!">
              <Loader2 className="w-6! h-6! animate-spin! text-secondary!" />
            </div>
          ) : tilEntries.length > 0 ? (
            <>
              <div className="space-y-6! md:hidden">
                {[...tilEntries]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                  <article
                    key={entry.id}
                    className="border-b! border-(--border)! pb-6! last:border-b-0!"
                  >
                    <p className="text-secondary! text-[0.82rem]! mb-3!">
                      {formatDate(entry.date)}
                    </p>
                    <TILContent entry={entry} />
                  </article>
                ))}
              </div>
              <div className="hidden md:grid! md:grid-cols-2! md:gap-6!">
                <div className="space-y-6!">
                  {[...tilEntries]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .filter((_, idx) => idx % 2 === 0)
                    .map((entry) => (
                    <article
                      key={entry.id}
                      className="border-b! border-(--border)! pb-6! last:border-b-0!"
                    >
                      <p className="text-secondary! text-[0.82rem]! mb-3!">
                        {formatDate(entry.date)}
                      </p>
                      <TILContent entry={entry} />
                    </article>
                  ))}
                </div>
                <div className="space-y-6!">
                  {[...tilEntries]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .filter((_, idx) => idx % 2 === 1)
                    .map((entry) => (
                    <article
                      key={entry.id}
                      className="border-b! border-(--border)! pb-6! last:border-b-0!"
                    >
                      <p className="text-secondary! text-[0.82rem]! mb-3!">
                        {formatDate(entry.date)}
                      </p>
                      <TILContent entry={entry} />
                    </article>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-base text-secondary!">No entries yet.</p>
          )}
        </motion.div>
      )}
      </section>
      <Menu page="home" activeTab={activeTab} />
    </div>
  )
}

