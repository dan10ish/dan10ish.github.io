'use client'

import ReactPlayer from 'react-player'
import { TILEntry } from '../../lib/til'
import { useState, useEffect } from 'react'

interface TILContentProps {
  entry: TILEntry
}

function TwitterEmbed({ tweetId }: { tweetId: string }) {
  const [loaded, setLoaded] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)

    return () => {
      observer.disconnect()
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="!w-full !max-w-full">
      <blockquote className="twitter-tweet" data-theme={theme}>
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
    </div>
  )
}

function LinkPreview({ url, metadata }: { url: string; metadata?: TILEntry['metadata'] }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="!block !w-full !border !border-[var(--border)] !rounded-lg !overflow-hidden hover:!opacity-80 !transition-opacity"
    >
      {metadata?.image && (
        <img
          src={metadata.image}
          alt={metadata.title || 'Link preview'}
          className="!w-full !h-48 !object-cover"
        />
      )}
      <div className="!p-4">
        {metadata?.title && (
          <h3 className="!text-base !font-semibold !mb-2 !line-clamp-2">
            {metadata.title}
          </h3>
        )}
        {metadata?.description && (
          <p className="!text-sm !text-secondary !line-clamp-2">
            {metadata.description}
          </p>
        )}
        <p className="!text-xs !text-secondary !mt-2 !truncate">{url}</p>
      </div>
    </a>
  )
}

function BookCard({ metadata }: { metadata?: TILEntry['metadata'] }) {
  return (
    <div className="!w-full !border !border-[var(--border)] !rounded-lg !p-4 !flex !gap-4">
      {metadata?.image && (
        <img
          src={metadata.image}
          alt={metadata.title || 'Book cover'}
          className="!w-24 !h-32 !object-cover !rounded"
        />
      )}
      <div className="!flex-1">
        {metadata?.title && (
          <h3 className="!text-base !font-semibold !mb-1">
            {metadata.title}
          </h3>
        )}
        {metadata?.author && (
          <p className="!text-sm !text-secondary !mb-2">
            by {metadata.author}
          </p>
        )}
        {metadata?.description && (
          <p className="!text-sm !line-clamp-3">
            {metadata.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default function TILContent({ entry }: TILContentProps) {
  const { content_type, content, metadata } = entry

  switch (content_type) {
    case 'tweet':
      const tweetId = content.match(/status\/(\d+)/)?.[1]
      return tweetId ? (
        <TwitterEmbed tweetId={tweetId} />
      ) : (
        <p className="!text-sm">Invalid tweet URL</p>
      )

    case 'youtube':
      return (
        <div className="!w-full !aspect-video !rounded-lg !overflow-hidden">
          <ReactPlayer
            url={content}
            width="100%"
            height="100%"
            controls
          />
        </div>
      )

    case 'link':
      return <LinkPreview url={content} metadata={metadata} />

    case 'book':
      return <BookCard metadata={metadata} />

    case 'image':
      return (
        <img
          src={content}
          alt="TIL image"
          className="!w-full !rounded-lg"
        />
      )

    case 'text':
    default:
      return (
        <p className="!text-base !whitespace-pre-wrap">
          {content}
        </p>
      )
  }
}

