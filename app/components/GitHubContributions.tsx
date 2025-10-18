'use client'

import { useState, useEffect, useRef } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionWeek {
  days: ContributionDay[]
}

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionWeek[]>([])
  const [visibleWeeks, setVisibleWeeks] = useState<ContributionWeek[]>([])
  const [loading, setLoading] = useState(true)
  const [totalContributions, setTotalContributions] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchContributions()
  }, [])

  useEffect(() => {
    const updateVisibleWeeks = () => {
      if (!containerRef.current || contributions.length === 0) return
      
      const containerWidth = containerRef.current.offsetWidth
      const weekWidth = 12
      const maxWeeks = Math.floor(containerWidth / weekWidth)
      
      const weeksToShow = contributions.slice(-maxWeeks)
      setVisibleWeeks(weeksToShow)
    }

    updateVisibleWeeks()
    window.addEventListener('resize', updateVisibleWeeks)
    
    return () => window.removeEventListener('resize', updateVisibleWeeks)
  }, [contributions])

  const fetchContributions = async () => {
    try {
      const response = await fetch('https://github-contributions-api.jogruber.de/v4/dan10ish?y=last')
      const data = await response.json()
      
      if (data?.contributions) {
        const allContribs = data.contributions
        let total = 0
        
        const firstDate = new Date(allContribs[0].date)
        const startDay = firstDate.getDay()
        
        const weeks: ContributionWeek[] = []
        let currentWeek: ContributionDay[] = []
        
        for (let i = 0; i < startDay; i++) {
          currentWeek.push({
            date: '',
            count: 0,
            level: 0
          })
        }
        
        allContribs.forEach((contrib: any) => {
          const level = getLevelFromCount(contrib.count)
          currentWeek.push({
            date: contrib.date,
            count: contrib.count,
            level
          })
          
          total += contrib.count
          
          if (currentWeek.length === 7) {
            weeks.push({ days: [...currentWeek] })
            currentWeek = []
          }
        })
        
        if (currentWeek.length > 0) {
          while (currentWeek.length < 7) {
            currentWeek.push({
              date: '',
              count: 0,
              level: 0
            })
          }
          weeks.push({ days: currentWeek })
        }
        
        setContributions(weeks)
        setTotalContributions(total)
      }
    } catch (error) {
      console.error('Error fetching contributions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelFromCount = (count: number): number => {
    if (count === 0) return 0
    if (count <= 3) return 1
    if (count <= 6) return 2
    if (count <= 9) return 3
    return 4
  }

  const getColorForLevel = (level: number): string => {
    const colors = {
      0: 'var(--github-level-0)',
      1: 'var(--github-level-1)',
      2: 'var(--github-level-2)',
      3: 'var(--github-level-3)',
      4: 'var(--github-level-4)',
    }
    return colors[level as keyof typeof colors] || colors[0]
  }

  if (loading) {
    return (
      <div className="!w-full !h-32 !flex !items-center !justify-center">
        <div className="!w-4 !h-4 !border-2 !border-[var(--secondary)] !border-t-transparent !rounded-full !animate-spin" />
      </div>
    )
  }

  return (
    <div className="!w-full !mt-8">
      <div className="!flex !items-baseline !justify-between !mb-3">
        <span className="text-base">GitHub Activity</span>
        <span className="!text-secondary !text-[0.82rem]">
          {totalContributions} contributions
        </span>
      </div>
      <div ref={containerRef} className="!w-full !overflow-hidden">
        <div className="!flex !gap-[2px] !justify-start">
          {visibleWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="!flex !flex-col !gap-[2px]">
              {week.days.map((day, dayIndex) => (
                day.date ? (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="!w-[10px] !h-[10px] !rounded-[2px] !transition-all !duration-200 hover:!ring-1 hover:!ring-[var(--github-level-4)] hover:!scale-110 !cursor-pointer"
                    style={{ backgroundColor: getColorForLevel(day.level) }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ) : (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="!w-[10px] !h-[10px]"
                  />
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="!flex !items-center !justify-between !mt-3 !text-[0.75rem] !text-secondary">
        <div className="!flex !items-center !gap-2">
          <span>Less</span>
          <div className="!flex !gap-[2px]">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="!w-[10px] !h-[10px] !rounded-[2px]"
                style={{ backgroundColor: getColorForLevel(level) }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
        <a
          href="https://github.com/dan10ish"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:!text-[var(--link-blue)]"
        >
          @dan10ish
        </a>
      </div>
    </div>
  )
}

