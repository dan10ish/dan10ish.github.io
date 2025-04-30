import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSortedWritingsData, getWritingData, WritingData } from '../../../lib/writings'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import Link from 'next/link'
import { MdxTableWrapper } from '../../components/MdxTableWrapper'
import { formatDate } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import FloatingButtons from '../../components/FloatingButtons'

interface WritingPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const writings = getSortedWritingsData()
  return writings.map((writing) => {
    if (typeof writing.slug !== 'string') {
      console.warn(`Invalid slug type found: ${typeof writing.slug}. Skipping.`);
      return null;
    }
    return { slug: writing.slug };
  }).filter(Boolean) as { slug: string }[];
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  let slug: string | undefined;
  try {
    const paramsObj = await params;
    slug = paramsObj.slug;
    const writing = await getWritingData(slug)
    return {
      title: writing.title,
      description: writing.summary,
    }
  } catch (error) {
    const errorMessage = slug ? `Failed to generate metadata for slug "${slug}":` : "Failed to generate metadata:";
    console.error(errorMessage, error);
    return {
      title: "Error",
      description: "Could not load writing metadata."
    }
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

export default async function WritingPage({ params }: WritingPageProps) {
  let writing: WritingData;
  try {
    // Await params first to get the slug
    const { slug } = await params;
    // Fetch data within the component using the awaited slug
    writing = await getWritingData(slug);
  } catch (error) {
    // If data fetching fails (e.g., file not found), trigger a 404
    notFound();
  }

  const { title, date, content } = writing;

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
      <h1 className="!mt-0 mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-secondary mt-0 mb-8">
        {formatDate(date)}
      </p>
      {/* @ts-expect-error Async Server Component */}
      <MDXRemote source={content} options={options} components={components} />
      <FloatingButtons />
    </article>
  )
}

// Add prose-quoteless styles (optional, removes default quote styling if desired)
// Add necessary global styles for prose customization if needed, e.g., in globals.css