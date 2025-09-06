'use client';

import { useState, useEffect, useRef } from 'react';
import FloatingButtons from '../components/FloatingButtons';

interface MediaItem {
  id: number;
  src: string;
  name: string;
  type: 'image' | 'video';
}

export default function VideosPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/videos/media-manifest.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const mediaItems = await response.json();
        
        // Shuffle the array for random order
        const shuffledMedia = [...mediaItems].sort(() => Math.random() - 0.5);
        setMedia(Array.isArray(shuffledMedia) ? shuffledMedia : []);
      } catch (error) {
        console.error('Failed to fetch media:', error);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (video.paused) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      },
      { 
        threshold: [0.5],
        rootMargin: '10px'
      }
    );

    videoRefs.current.forEach((video) => {
      if (video && observerRef.current) {
        observerRef.current.observe(video);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [media, loadedItems]);

  const handleVideoRef = (id: number, video: HTMLVideoElement | null) => {
    if (video) {
      videoRefs.current.set(id, video);
      
      video.addEventListener('loadeddata', () => {
        setLoadedItems(prev => new Set(prev).add(id));
      });
      
      video.addEventListener('error', () => {
        setLoadedItems(prev => new Set(prev).add(id));
      });
    } else {
      videoRefs.current.delete(id);
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedItems(prev => new Set(prev).add(id));
  };

  const handleImageError = (id: number) => {
    setLoadedItems(prev => new Set(prev).add(id));
  };

  if (loading) {
    return (
      <div className="videos-container">
        <main className="videos-main">
          <section>
          <h1 className="text-base opacity-70">Videos</h1>
            <div className="videos-masonry">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="videos-masonry-item">
                  <div className="videos-skeleton"></div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <FloatingButtons />
      </div>
    );
  }

  return (
    <div className="videos-container">
      <main className="videos-main">
        <section>
          <h1 className="text-base opacity-70">Videos</h1>
          <div className="videos-masonry">
            {media.map((item) => (
              <div key={item.id} className="videos-masonry-item">
                {!loadedItems.has(item.id) && (
                  <div className="videos-skeleton"></div>
                )}
                
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.name}
                    className={`videos-media ${loadedItems.has(item.id) ? 'videos-loaded' : 'videos-loading'}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)}
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <video
                    ref={(el) => handleVideoRef(item.id, el)}
                    className={`videos-media ${loadedItems.has(item.id) ? 'videos-loaded' : 'videos-loading'}`}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    autoPlay={false}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <FloatingButtons />
    </div>
  );
}