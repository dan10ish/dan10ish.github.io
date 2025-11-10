'use client'

import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <section className="!mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedWritings.map((writing, index) => (
          <Link
            key={writing.slug}
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
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index <= 1}
              />

              <div className="!absolute !bottom-0 !left-0 !right-0 !m-0 !p-3 sm:!p-4 !bg-gradient-to-t from-black/40 to-transparent !rounded-b-2xl">
                <div className="!flex !items-center !justify-between !mb-2">
                  <span className="!text-xs !text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    {formatDate(writing.date)}
                  </span>
                  {writing.tags && writing.tags.length > 0 && (
                    <span className="!text-xs !text-white !px-1.5 !py-0.5 !rounded-md !whitespace-nowrap !bg-white/20 !backdrop-blur-sm">
                      {writing.tags[0]}
                    </span>
                  )}
                </div>

                <h2 className="!font-semibold !text-sm sm:!text-base !text-white group-hover:!text-blue-400 !transition-colors !leading-tight !mb-0 [text-shadow:0_2px_5px_rgba(0,0,0,0.6)]">
                  {writing.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 