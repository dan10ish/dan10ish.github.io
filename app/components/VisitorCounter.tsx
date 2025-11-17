'use client'

import { useEffect, useState } from 'react'
import { Eye, Infinity } from 'lucide-react'
import { supabase } from '@/lib/client'

function formatVisitorCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (count >= 100_000) {
    return `${Math.floor(count / 1_000)}K`
  }
  if (count >= 10_000) {
    return `${Math.floor(count / 1_000)}K`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  }
  if (count > 100) {
    return `${Math.floor(count / 100) * 100}+`
  }
  return count.toString()
}

function generateVisitorId(): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const txt = 'visitor-fingerprint'
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText(txt, 2, 15)
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    canvas.toDataURL()
  ].join('|')
  
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export function VisitorCounter() {
  const [count, setCount] = useState<string | null>(null)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const visitorId = generateVisitorId()
        
        const { data: existingVisitor } = await supabase
          .from('visitors')
          .select('*')
          .eq('visitor_id', visitorId)
          .single()

        if (existingVisitor) {
          await supabase
            .from('visitors')
            .update({
              last_visit: new Date().toISOString(),
              visit_count: existingVisitor.visit_count + 1
            })
            .eq('visitor_id', visitorId)
        } else {
          await supabase
            .from('visitors')
            .insert([{ visitor_id: visitorId }])
        }
      } catch (error) {
        console.error('Error tracking visitor:', error)
      }
    }

    const fetchCount = async () => {
      try {
        const { count: visitorCount } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true })
        
        setCount(formatVisitorCount(visitorCount || 0))
      } catch (error) {
        console.error('Error fetching visitor count:', error)
      }
    }

    trackVisitor()
    fetchCount()
  }, [])

  return (
    <div
      className="fixed! bottom-7! left-5! flex! items-center! justify-center! gap-2! rounded-full! bg-background! duration-200! z-50!"
      aria-label={`Unique visitors: ${count || 'loading'}`}
    >
      <Eye size={20} />
      {count ? (
        <span className="text-sm! font-medium! text-(--secondary)!">{count}</span>
      ) : (
        <Infinity size={16} className="text-(--secondary)!" />
      )}
    </div>
  )
}

