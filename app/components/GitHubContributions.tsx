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

export default function GitHubContributions({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionWeek[]>([])
  const [visibleWeeks, setVisibleWeeks] = useState<ContributionWeek[]>([])
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number; showBelow: boolean } | null>(null)
  const [totalContributions, setTotalContributions] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchActiveRef = useRef(false)

  useEffect(() => {
    generateContributions()
  }, [username])

  useEffect(() => {
    const updateVisibleWeeks = () => {
      if (!containerRef.current || contributions.length === 0) return

      const containerWidth = containerRef.current.offsetWidth
      const squareSize = 10
      const gap = 2
      const maxWeeks = Math.floor((containerWidth + gap) / (squareSize + gap))

      const weeksToShow = contributions.slice(-maxWeeks)
      setVisibleWeeks(weeksToShow)
    }

    updateVisibleWeeks()
    window.addEventListener('resize', updateVisibleWeeks)

    return () => window.removeEventListener('resize', updateVisibleWeeks)
  }, [contributions])

  const generateContributions = () => {
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    const allContribs: ContributionDay[] = []
    let total = 0

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      let count = 0
      if (Math.random() > 0.3) {
        if (isWeekend) {
          count = Math.floor(Math.random() * 5)
        } else {
          count = Math.floor(Math.random() * 15) + 1
        }
      }

      total += count
      const level = getLevelFromCount(count)

      allContribs.push({
        date: new Date(d).toISOString().split('T')[0],
        count,
        level
      })
    }

    setTotalContributions(total)
    processContributions(allContribs)
  }

  const processContributions = (allContribs: ContributionDay[]) => {
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

    allContribs.forEach((contrib: ContributionDay) => {
      currentWeek.push(contrib)

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

  const formatDateCustom = (dateString: string): string => {
    const date = new Date(dateString)
    const day = date.getDate()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const calculateTooltipPosition = (date: string, rect: DOMRect) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return null

    const tooltipWidth = 100
    const tooltipHeight = 28
    let x = rect.left - containerRect.left + rect.width / 2
    const y = rect.top - containerRect.top

    if (x - tooltipWidth / 2 < 0) {
      x = tooltipWidth / 2
    } else if (x + tooltipWidth / 2 > containerRect.width) {
      x = containerRect.width - tooltipWidth / 2
    }

    const showBelow = y < tooltipHeight + 5

    return {
      date,
      x,
      y,
      showBelow
    }
  }

  const handleMouseEnter = (date: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchActiveRef.current) return

    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const position = calculateTooltipPosition(date, rect)
    if (position) setTooltip(position)
  }

  const handleMouseLeave = () => {
    if (isTouchActiveRef.current) return
    setTooltip(null)
  }

  const handleTouch = (date: string, event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault()
    isTouchActiveRef.current = true

    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const position = calculateTooltipPosition(date, rect)
    if (position) {
      setTooltip(position)
      tooltipTimeoutRef.current = setTimeout(() => {
        setTooltip(null)
        isTouchActiveRef.current = false
      }, 700)
    }
  }

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full! mt-4! select-none!">
      <div className="flex! items-baseline! justify-between! mb-3!">
        <h2 className="font-semibold!">GitHub Activity</h2>
        <span className="text-xs! text-secondary!">
          {totalContributions} contributions
        </span>
      </div>
      <div ref={containerRef} className="w-full! overflow-hidden! relative!">
        <div className="flex! gap-[2px]! justify-start!">
          {visibleWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex! flex-col! gap-[2px]!">
              {week.days.map((day, dayIndex) => (
                day.date ? (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-[10px]! h-[10px]! rounded-[2px]! transition-all! duration-200! hover:scale-110! cursor-pointer!"
                    style={{
                      backgroundColor: getColorForLevel(day.level),
                      border: 'none'
                    }}
                    onMouseEnter={(e) => handleMouseEnter(day.date, e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => handleTouch(day.date, e)}
                  />
                ) : (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-[10px]! h-[10px]!"
                  />
                )
              ))}
            </div>
          ))}
        </div>
        {tooltip && (
          <div
            className="absolute! text-xs! px-2! py-1! rounded! pointer-events-none! whitespace-nowrap! z-10! shadow-sm!"
            style={{
              left: `${tooltip.x}px`,
              top: tooltip.showBelow ? `${tooltip.y + 18}px` : `${tooltip.y - 28}px`,
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--code-bg)',
              color: 'var(--foreground)'
            }}
          >
            {formatDateCustom(tooltip.date)}
          </div>
        )}
      </div>
      <div className="flex! items-center! justify-between! mt-3! text-xs! text-secondary!">
        <div className="flex! items-center! gap-2!">
          <span className="text-xs!">Less</span>
          <div className="flex! gap-[2px]!">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-[10px]! h-[10px]! rounded-[2px]!"
                style={{ backgroundColor: getColorForLevel(level) }}
              />
            ))}
          </div>
          <span className="text-xs!">More</span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-(--link-blue)! transition-opacity!"
        >
          @{username}
        </a>
      </div>
    </div>
  )
}
