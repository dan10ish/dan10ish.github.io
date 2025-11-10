'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface GitHubData {
  contributions: any[]
  totalContributions: number
}

interface GitHubContributionsProps {
  githubData: GitHubData | null
}

const getContribColor = (count: number, maxCount: number, isDark: boolean): string => {
  if (count === 0) return isDark ? '#161b22' : '#ebedf0'
  
  const intensity = count / maxCount
  if (isDark) {
    if (intensity <= 0.25) return '#0e4429'
    if (intensity <= 0.5) return '#006d32'
    if (intensity <= 0.75) return '#26a641'
    return '#39d353'
  } else {
    if (intensity <= 0.25) return '#9be9a8'
    if (intensity <= 0.5) return '#40c463'
    if (intensity <= 0.75) return '#30a14e'
    return '#216e39'
  }
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export default function GitHubContributions({ githubData }: GitHubContributionsProps) {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null)
  const [visibleWeeks, setVisibleWeeks] = useState(52)
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark' || resolvedTheme === 'solarized'

  if (!githubData || !githubData.contributions || githubData.contributions.length === 0) {
    return null
  }

  const contributions = githubData.contributions
  
  let weeks: any[] = []
  let allDays: any[] = []

  if (contributions.length > 0 && contributions[0].days) {
    weeks = contributions.slice(-52)
    allDays = contributions.flatMap((week: any) => week.days || [])
  } else if (contributions.length > 0 && contributions[0].count !== undefined) {
    const sortedContributions = [...contributions].sort((a: any, b: any) => {
      const dateA = new Date(a.date || a.day || 0).getTime()
      const dateB = new Date(b.date || b.day || 0).getTime()
      return dateA - dateB
    })
    
    const lastYearContributions = sortedContributions.slice(-365)
    allDays = lastYearContributions
    
    for (let i = 0; i < lastYearContributions.length; i += 7) {
      weeks.push({
        days: lastYearContributions.slice(i, i + 7)
      })
    }
  }

  if (allDays.length === 0) {
    return null
  }

  const maxContributions = Math.max(...allDays.map((day: any) => day.count || day.contributionCount || 0), 1)

  useEffect(() => {
    const calculateVisibleWeeks = () => {
      if (!containerRef.current || typeof window === 'undefined') return
      
      const containerWidth = containerRef.current.offsetWidth
      const squareSize = 11
      const gap = 3
      const weekWidth = squareSize + gap
      const maxWeeks = Math.floor((containerWidth + gap) / weekWidth)
      
      setVisibleWeeks(Math.min(Math.max(maxWeeks, 1), 52))
    }

    const timeoutId = setTimeout(() => {
      calculateVisibleWeeks()
    }, 100)

    window.addEventListener('resize', calculateVisibleWeeks)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', calculateVisibleWeeks)
    }
  }, [githubData])

  const handleMouseEnter = (day: any, event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    const count = day.count || day.contributionCount || 0
    const date = day.date || day.day || ''
    
    const tooltipWidth = 150
    const tooltipHeight = 60
    let tooltipX = rect.left + rect.width / 2
    let tooltipY = rect.top
    
    const relativeX = tooltipX - containerRect.left
    const relativeY = tooltipY - containerRect.top
    
    let finalX = relativeX
    let finalY = relativeY
    
    if (relativeX - tooltipWidth / 2 < 0) {
      finalX = tooltipWidth / 2
    } else if (relativeX + tooltipWidth / 2 > containerRect.width) {
      finalX = containerRect.width - tooltipWidth / 2
    }
    
    if (relativeY - tooltipHeight < 0) {
      finalY = relativeY + rect.height + 10
    } else {
      finalY = relativeY - tooltipHeight - 5
    }
    
    setHoveredDay({
      date,
      count,
      x: finalX,
      y: finalY
    })
  }

  const handleMouseLeave = () => {
    setHoveredDay(null)
  }

  return (
    <div className="mt-6! relative!">
      <p className="text-base mb-4!">
        <strong>{githubData.totalContributions.toLocaleString()}</strong> contributions in the last year
      </p>
      <div ref={containerRef} className="flex! gap-[3px]! pb-2!">
        {weeks.slice(-visibleWeeks).map((week: any, weekIndex: number) => (
          <div key={weekIndex} className="flex! flex-col! gap-[3px]! shrink-0!">
            {(week.days || []).map((day: any, dayIndex: number) => {
              const count = day.count || day.contributionCount || 0
              const date = day.date || day.day || ''
              const color = getContribColor(count, maxContributions, isDark)
              
              return (
                <div
                  key={dayIndex}
                  className="w-[11px]! h-[11px]! rounded-xs! cursor-pointer! transition-all! duration-150! ease-out! hover:scale-125! hover:z-10! relative!"
                  style={{
                    backgroundColor: color,
                    border: count > 0 ? (isDark ? `1px solid rgba(255, 255, 255, 0.1)` : `1px solid rgba(0, 0, 0, 0.1)`) : `1px solid ${color}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = 'none'
                    handleMouseEnter(day, e)
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = count > 0 ? (isDark ? `1px solid rgba(255, 255, 255, 0.1)` : `1px solid rgba(0, 0, 0, 0.1)`) : `1px solid ${color}`
                    handleMouseLeave()
                  }}
                  onFocus={(e) => handleMouseEnter(day, e)}
                  onBlur={handleMouseLeave}
                />
              )
            })}
          </div>
        ))}
      </div>
      
      {hoveredDay && typeof window !== 'undefined' && containerRef.current && (
        <div
          className="absolute! z-50! rounded-md! px-3! py-2! shadow-lg! pointer-events-none!"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: 'translate(-50%, 0)',
            backgroundColor: 'var(--code-bg)',
            border: '1px solid var(--border)'
          }}
        >
          <div className="text-xs! whitespace-nowrap! font-medium!" style={{ color: 'var(--foreground)' }}>
            <strong>{hoveredDay.count}</strong> {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
          </div>
          <div className="text-xs! mt-1!" style={{ color: 'var(--secondary)' }}>
            {formatDate(hoveredDay.date) || 'No date'}
          </div>
        </div>
      )}
      
      <div className="flex! items-center! gap-2! mt-4! text-xs!" style={{ color: 'var(--secondary)' }}>
        <span>Less</span>
        <div className="flex! gap-[3px]!">
          <div 
            className="w-[11px]! h-[11px]! rounded-sm!" 
            style={{ 
              backgroundColor: isDark ? '#161b22' : '#ebedf0', 
              border: `1px solid ${isDark ? '#161b22' : '#ebedf0'}` 
            }} 
          />
          <div 
            className="w-[11px]! h-[11px]! rounded-sm!" 
            style={{ 
              backgroundColor: isDark ? '#0e4429' : '#9be9a8', 
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <div 
            className="w-[11px]! h-[11px]! rounded-sm!" 
            style={{ 
              backgroundColor: isDark ? '#006d32' : '#40c463', 
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <div 
            className="w-[11px]! h-[11px]! rounded-sm!" 
            style={{ 
              backgroundColor: isDark ? '#26a641' : '#30a14e', 
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' 
            }} 
          />
          <div 
            className="w-[11px]! h-[11px]! rounded-sm!" 
            style={{ 
              backgroundColor: isDark ? '#39d353' : '#216e39', 
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)' 
            }} 
          />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

