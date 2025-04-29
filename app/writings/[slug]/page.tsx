import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSortedWritingsData, getWritingData } from '../../../lib/writings'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import Link from 'next/link'
import { MdxTableWrapper } from '../../components/MdxTableWrapper'

interface WritingPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const writings = getSortedWritingsData()
  return writings.map((writing) => ({
    slug: writing.slug,
  }))
}

export async function generateMetadata({ params: { slug } }: WritingPageProps): Promise<Metadata> {
  const writing = await getWritingData(slug)
  return {
    title: writing.title,
    description: writing.summary,
  }
}

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href

  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export default async function WritingPage({ params: { slug } }: WritingPageProps) {
  const { title, date, content } = await getWritingData(slug)

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: true,
          },
        ],
      ],
    },
  }

  const components = {
    a: CustomLink,
    table: MdxTableWrapper,
  }

  return (
    <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-secondary mt-0 mb-8">{date}</p>
      {/* @ts-expect-error Server Component */}
      <MDXRemote source={content} options={options} components={components} />
    </article>
  )
}

// Add prose-quoteless styles (optional, removes default quote styling if desired)
// Add necessary global styles for prose customization if needed, e.g., in globals.css 