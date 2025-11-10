'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SocialLinks from "./SocialLinks";
import { personalInfo, projects } from "../data";
import Projects from "./Projects";
import WritingsCarousel from "./WritingsCarousel";
import ContentMenu from "./ContentMenu";
import Finds from "./Finds";

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

export default function HomeClient({ writings }: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<'writings' | 'projects' | 'finds'>('writings');

  const formatSkillsList = (skills: string[]) => {
    if (skills.length === 0) return null;
    if (skills.length === 1) return <strong>{skills[0].toLowerCase()}</strong>;
    if (skills.length === 2) return (
      <>
        <strong>{skills[0].toLowerCase()}</strong> and <strong>{skills[1].toLowerCase()}</strong>
      </>
    );
    
    return (
      <>
        {skills.slice(0, -1).map((skill, index) => (
          <span key={index}>
            <strong>{skill.toLowerCase()}</strong>
            {index < skills.length - 2 ? ', ' : ' and '}
          </span>
        ))}
        <strong>{skills[skills.length - 1].toLowerCase()}</strong>
      </>
    );
  };

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
          <p className="text-base">{personalInfo.about}, interested in {formatSkillsList(personalInfo.skills)}.</p>
        </section>

        <section>
          <ContentMenu activeTab={activeTab} onTabChange={setActiveTab} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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


