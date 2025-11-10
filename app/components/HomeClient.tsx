'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import SocialLinks from "./SocialLinks";
import { personalInfo, projects } from "../data";
import Projects from "./Projects";
import WritingsCarousel from "./WritingsCarousel";
import ContentMenu from "./ContentMenu";
import Finds from "./Finds";
import About from "./About";

interface Writing {
  slug: string;
  title: string;
  date: string;
  summary: string;
  ogImage?: string;
  displayImage?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  type?: string;
  locale?: string;
  alternateLocales?: string[];
  keywords?: string[];
  canonicalUrl?: string;
}

interface HomeClientProps {
  writings: Writing[];
}

const validTabs: Array<'about' | 'writings' | 'projects' | 'finds'> = ['about', 'writings', 'projects', 'finds']

function getTabFromUrl(): 'about' | 'writings' | 'projects' | 'finds' {
  if (typeof window === 'undefined') return 'about'
  const params = new URLSearchParams(window.location.search)
  const tab = params.get('tab')
  if (tab && validTabs.includes(tab as any)) {
    return tab as 'about' | 'writings' | 'projects' | 'finds'
  }
  return 'about'
}

export default function HomeClient({ writings }: HomeClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<'about' | 'writings' | 'projects' | 'finds'>('about')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const tab = getTabFromUrl()
    setActiveTab(tab)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const handlePopState = () => {
      const tab = getTabFromUrl()
      setActiveTab(tab)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isMounted])

  const handleTabChange = (tab: 'about' | 'writings' | 'projects' | 'finds') => {
    setActiveTab(tab)
    const params = new URLSearchParams(window.location.search)
    if (tab === 'about') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newUrl, { scroll: false })
  }

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6 pb-16! sm:pb-0!">
        <section className="space-y-0">
          <div className="flex! items-center! justify-between!">
            <h1 className="text-base font-bold header-text">
              {personalInfo.name}
            </h1>
            <SocialLinks
              github={personalInfo.socials.github}
              email={personalInfo.socials.email}
              x={personalInfo.socials.x}
              instagram={personalInfo.socials.instagram}
              linkedin={personalInfo.socials.linkedin}
            />
          </div>
        </section>

        <section>
          <ContentMenu activeTab={activeTab} onTabChange={handleTabChange} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'about' && <About />}
              {activeTab === 'writings' && <WritingsCarousel writings={writings} />}
              {activeTab === 'projects' && <Projects projects={projects} />}
              {activeTab === 'finds' && <Finds />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}


