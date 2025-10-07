'use client'

import { TILEntry } from '../../lib/til'
import { Suspense } from 'react'
import { Tweet } from 'react-tweet'
import YouTube from 'react-youtube'
import './tweet.css'

interface TILContentProps {
  entry: TILEntry
}

function TwitterEmbed({ tweetId }: { tweetId: string }) {
  return (
    <div className="tweet !w-full !max-w-[550px] !mx-auto">
      <div className="!flex !justify-center">
        <Suspense fallback={<div className="!h-[200px] !flex !items-center !justify-center !text-secondary">Loading tweet...</div>}>
          <Tweet id={tweetId} />
        </Suspense>
      </div>
    </div>
  )
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="!w-full !max-w-[550px] !mx-auto !my-5">
      <YouTube 
        videoId={videoId}
        opts={{
          width: '100%',
          height: '315',
          playerVars: {
            modestbranding: 1,
            rel: 0,
            color: 'white'
          }
        }}
        className="!w-full !rounded-lg !overflow-hidden"
      />
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
