'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { personalInfo, experience } from '../data'
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

  const current = experience.find((e: any) => e.current)
  const previous = experience.filter((e: any) => !e.current)
  const sentences: string[] = []
  if (current) sentences.push(`Currently, ${current.title} @ ${current.company}.`)
  if (previous.length > 0) {
    const prevText = previous.map((e: any) => `${e.title} @ ${e.company}`).join('; ')
    sentences.push(`Previously, ${prevText}.`)
  }

  return (
    <div>
      <p className="text-base">{personalInfo.about}.</p>
      {sentences.length > 0 && (
        <p className="text-base mt-6!">{sentences.join(' ')}</p>
      )}
      {loading ? (
        <div className="mt-6! w-full! flex! justify-center! py-8!">
          <Loader2 className="w-6! h-6! animate-spin!" style={{ color: 'var(--secondary)' }} />
        </div>
      ) : (
        <GitHubContributions githubData={githubData} />
      )}
    </div>
  )
}

