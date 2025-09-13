'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isIntersecting]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className={`!relative !w-full !h-full ${className}`}>
      {isLoading && (
        <div className="!absolute !inset-0 !flex !items-center !justify-center !bg-[var(--code-bg)]">
          <Loader2 size={24} className="!animate-spin !text-[var(--secondary)]" />
        </div>
      )}
      <video
        ref={videoRef}
        src={`/project-videos/${src}`}
        className="!w-full !h-full !object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}
