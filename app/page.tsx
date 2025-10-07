import { Suspense } from 'react'
import { personalInfo } from './data'
import { getSortedWritingsData } from '../lib/server'
import { ThemeToggle } from './components/Theme'
import HomeContent from './components/HomeContent'

export default function Home() {
  const writings = getSortedWritingsData()

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <section className="!mb-4">
        <div className="!flex !items-center !justify-between">
          <h1 className="!text-base !font-bold !header-text">{personalInfo.name}</h1>
          <ThemeToggle />
        </div>
      </section>
      <Suspense fallback={<div className="!h-20" />}>
        <HomeContent writings={writings} />
      </Suspense>
    </div>
  )
}
