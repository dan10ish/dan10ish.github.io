'use client'

import { useEffect, useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export default function GitHubContributions({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateContributions = () => {
      const today = new Date()
      const days: ContributionDay[] = []
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        
        let count = 0
        let level: 0 | 1 | 2 | 3 | 4 = 0
        
        if (Math.random() > 0.3) {
          if (isWeekend) {
            count = Math.floor(Math.random() * 5)
          } else {
            count = Math.floor(Math.random() * 15) + 1
          }
          
          if (count === 0) level = 0
          else if (count <= 3) level = 1
          else if (count <= 6) level = 2
          else if (count <= 10) level = 3
          else level = 4
        }
        
        days.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        })
      }
      
      return days
    }

    setContributions(generateContributions())
    setLoading(false)
  }, [username])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-53 gap-1">
          {Array.from({ length: 364 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-sm bg-border animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-border',
      'bg-secondary/30',
      'bg-secondary/50',
      'bg-link-blue/60',
      'bg-link-blue'
    ]
    return colors[level]
  }

  const weeks = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} transition-colors`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-secondary">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-border" />
          <div className="w-3 h-3 rounded-sm bg-secondary/30" />
          <div className="w-3 h-3 rounded-sm bg-secondary/50" />
          <div className="w-3 h-3 rounded-sm bg-link-blue/60" />
          <div className="w-3 h-3 rounded-sm bg-link-blue" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

