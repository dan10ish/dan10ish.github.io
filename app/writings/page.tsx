import Link from 'next/link'
import { getSortedWritingsData } from '../../lib/writings'
import { formatDate } from '../../lib/utils'
import WritingsNav from '../components/WritingsNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writings | Danish',
  description: 'Technical writings and insights on machine learning, robotics, and engineering',
}

export default function WritingsPage() {
  const writings = getSortedWritingsData()

  return (
    <div className="h-fit max-w-2xl mx-auto">
      <main className="space-y-6">
        <section className="space-y-0">
          <h1 className="text-base font-bold header-text">
            Writings
          </h1>
        </section>

        <WritingsNav />

        {writings.length > 0 ? (
          <section>
            <div className="mt-1">
              {writings.map(({ slug, title, date }) => (
                <Link
                  href={`/writings/${slug}`}
                  key={slug}
                  className="block group writing-link !mb-1"
                >
                  <div className="flex gap-2 w-full items-baseline justify-between">
                    <span className="text-primary font-medium touch-underline group-hover:text-[var(--link-blue)] truncate">
                      {title}
                    </span>
                    <span className="text-secondary !text-[0.82rem] flex-shrink-0">
                      {formatDate(date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <p className="text-base text-secondary">
              No writings yet.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

