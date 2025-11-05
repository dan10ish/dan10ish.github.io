import { Suspense } from 'react'
import { getSortedWritingsData } from '../lib/server'
import HomeContent from './components/HomeContent'

export default function Home() {
  const writings = getSortedWritingsData()

  return (
    <Suspense fallback={<div className="h-20!" />}>
      <HomeContent writings={writings} />
    </Suspense>
  )
}
