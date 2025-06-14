'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Writing {
  slug: string;
  title: string;
  date: string;
  summary: string;
  ogImage?: string;
  displayImage?: string;
  tags?: string[];
}

interface WritingsCarouselProps {
  writings: Writing[];
}

export default function WritingsCarousel({ writings }: WritingsCarouselProps) {
  const sortedWritings = [...writings].sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (sortedWritings.length === 0) return null;

  const formatDate = (dateString: string) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [day, month, year] = dateString.split('-');
    const monthName = months[parseInt(month) - 1];
    return `${parseInt(day)} ${monthName}, ${year}`;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedWritings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedWritings.length) % sortedWritings.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <section className="relative !mb-6">
      <h1 className="text-base opacity-70 !mb-4">Writings</h1>

      <div
        className="relative overflow-hidden carousel-responsive"
        onTouchStart={handleTouchStart}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(calc(${currentIndex === 0 ? '0%' : 'var(--offset)'} - ${currentIndex} * var(--card-width)))`,
          }}
        >
          {sortedWritings.map((writing, index) => (
            <div
              key={writing.slug}
              className="!w-3/4 md:!w-3/5 lg:!w-1/2 flex-shrink-0 !pr-3"
            >
              <Link
                href={`/writings/${writing.slug}`}
                className="block group"
                prefetch={index <= 2}
              >
                <div className="!relative !aspect-[3/2] sm:!aspect-[5/2] md:!aspect-[7/4] lg:!aspect-[8/5] !overflow-hidden !hover:opacity-90 !transition-all !duration-300 hover:!shadow-lg !rounded-2xl">
                  <Image
                    src={writing.displayImage || writing.ogImage || '/og/default.webp'}
                    alt={writing.title}
                    fill
                    className="!object-cover group-hover:!scale-[1.02] !transition-transform !duration-300"
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 60vw, 500px"
                    priority={index === 0}
                  />

                  <div className="!absolute !bottom-0 !left-0 !right-0 !m-0 !p-3 sm:!p-4 !backdrop-blur-sm">
                    <div className="!flex !items-center !justify-between !mb-2">
                      <span className="!text-xs !text-white/90">
                        {formatDate(writing.date)}
                      </span>
                      {writing.tags && writing.tags.length > 0 && (
                        <span className="!text-xs !text-white !px-1.5 !py-0.5 !rounded-md !whitespace-nowrap !bg-white/20 !backdrop-blur-sm">
                          {writing.tags[0]}
                        </span>
                      )}
                    </div>

                    <h2 className="!font-semibold !text-sm sm:!text-base !text-white group-hover:!text-blue-400 !transition-colors !leading-tight !mb-0">
                      {writing.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {sortedWritings.length > 1 && (
        <div className="flex justify-between items-center !mt-4">
          <div className="flex gap-1.5">
            {sortedWritings.map((_, index) => (
              <div
                key={index}
                className="!h-2 !rounded-full !block"
                style={{
                  backgroundColor: index === currentIndex ? 'var(--foreground)' : 'var(--secondary)',
                  width: index === currentIndex ? '16px' : '8px',
                  height: '8px',
                  opacity: index === currentIndex ? 1 : 0.8,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            ))}
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`!p-2 !rounded-full !bg-[var(--code-bg)] transition-all duration-200 ${currentIndex === 0
                  ? '!opacity-40 !cursor-not-allowed'
                  : 'group hover:!scale-110'
                }`}
              aria-label="Previous writing"
            >
              <ChevronLeft
                className={`!w-4 !h-4 !stroke-2 !text-[var(--secondary)] ${currentIndex === 0 ? '' : 'transition-colors group-hover:!text-[var(--foreground)]'
                  }`}
                style={{
                  color: currentIndex === 0 ? 'var(--secondary)' : undefined
                }}
              />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === sortedWritings.length - 1}
              className={`!p-2 !rounded-full !bg-[var(--code-bg)] transition-all duration-200 ${currentIndex === sortedWritings.length - 1
                  ? '!opacity-40 !cursor-not-allowed'
                  : 'group hover:!scale-110'
                }`}
              aria-label="Next writing"
            >
              <ChevronRight
                className={`!w-4 !h-4 !stroke-2 !text-[var(--secondary)] ${currentIndex === sortedWritings.length - 1 ? '' : 'transition-colors group-hover:!text-[var(--foreground)]'
                  }`}
                style={{
                  color: currentIndex === sortedWritings.length - 1 ? 'var(--secondary)' : undefined
                }}
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 