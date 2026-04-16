'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { personalInfo } from '../data'
import GitHubContributions from './GitHubContributions'

interface GitHubData {
  contributions: any[]
  totalContributions: number
}

export default function About() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/dan10ish?y=last')
        const data = await response.json()

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
            totalContributions: totalContributions
          })
        }
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed">
        {personalInfo.about} Currently taking companies from zero to one.
      </p>
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
