'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import GitHubContributions from './GitHubContributions'

interface GitHubData {
  contributions: any[]
  totalContributions: number
}

export default function GitHubActivity() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [shouldFetch, setShouldFetch] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldFetch) return
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setShouldFetch(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldFetch(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldFetch])

  useEffect(() => {
    if (!shouldFetch) return
    let cancelled = false

    const fetchGitHubData = async () => {
      try {
        const response = await fetch(
          'https://github-contributions-api.jogruber.de/v4/dan10ish?y=last'
        )
        const data = await response.json()
        if (cancelled) return

        if (data?.contributions) {
          let totalContributions = 0

          if (data.contributions.length > 0 && data.contributions[0].days) {
            totalContributions = data.contributions.reduce((sum: number, week: any) => {
              return sum + (week.days || []).reduce((weekSum: number, day: any) => weekSum + (day.count || 0), 0)
            }, 0)
          } else {
            totalContributions = data.contributions.reduce((sum: number, c: any) => sum + (c.count || c.contributionCount || 0), 0)
          }

          setGithubData({
            contributions: data.contributions,
            totalContributions,
          })
        }
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGitHubData()
    return () => {
      cancelled = true
    }
  }, [shouldFetch])

  return (
    <div ref={containerRef}>
      {loading ? (
        <div className="w-full flex justify-center py-8">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <GitHubContributions githubData={githubData} />
      )}
    </div>
  )
}
