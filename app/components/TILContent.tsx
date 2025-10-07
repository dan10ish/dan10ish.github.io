'use client'

import { Tweet } from 'react-tweet'
import YT from 'react-youtube'
import './tweet.css'

interface TILEntry {
  id: string
  date: string
  content_type: 'tweet' | 'text' | 'link' | 'youtube' | 'book' | 'image'
  content: string
  metadata?: {
    title?: string
    author?: string
    description?: string
    image?: string
  }
  created_at: string
}

interface TILContentProps {
  entry: TILEntry
}

function TwitterEmbed({ tweetId }: { tweetId: string }) {
  return (
    <div className="tweet !w-full !max-w-[550px] !mx-auto">
      <div className="!flex !justify-center">
        <Tweet id={tweetId} />
      </div>
    </div>
  )
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 1,
      playsinline: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
  }

  const onReady = (event: any) => {
    event.target.pauseVideo()
  }

  return (
    <div className="!w-full !max-w-[550px] !mx-auto !my-5">
      <div className="yt-video-container">
        <YT 
          videoId={videoId} 
          opts={opts}
          onReady={onReady}
          className="yt-video-iframe"
        />
      </div>
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
      const videoId = content.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]
      return videoId ? (
        <YouTubeEmbed videoId={videoId} />
      ) : (
        <p className="!text-sm">Invalid YouTube URL</p>
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
