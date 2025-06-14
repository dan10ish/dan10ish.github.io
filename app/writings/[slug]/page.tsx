import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSortedWritingsData, getWritingData, WritingData } from '../../../lib/writings'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Link from 'next/link'
import Image from 'next/image'
import { MdxTableWrapper } from '../../components/MdxTableWrapper'
import { formatDate } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { highlight } from 'sugar-high'
import React from 'react'

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
    if (!slug) {
      throw new Error("Slug is undefined");
    }
    const writing = await getWritingData(slug)

    const pageTitle = `${writing.title} | Danish`;
    const pageDescription = writing.summary;
    const writingUrl = writing.canonicalUrl || `https://danish.bio/writings/${slug}`;
    const siteUrl = "https://danish.bio";
    
    let ogImageUrl: string;
    const defaultOgImage = "https://i.ibb.co/vmBrhSd/OG.png";

    if (writing.ogImage) {
      if (writing.ogImage.startsWith('/')) {
        ogImageUrl = `${siteUrl}${writing.ogImage}`;
      } else {
        ogImageUrl = writing.ogImage;
      }
    } else {
      ogImageUrl = defaultOgImage;
    }

    const parseDate = (dateString: string): Date => {
      if (dateString.includes('-') && dateString.split('-').length === 3) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
      }
      return new Date(dateString);
    };

    const publishedTime = parseDate(writing.date).toISOString();
    const modifiedTime = publishedTime;

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: writing.keywords || writing.tags || [],
      authors: [{ name: writing.author || 'Danish', url: siteUrl }],
      creator: writing.author || 'Danish',
      publisher: 'Danish',
      category: 'Technology',
      alternates: {
        canonical: writingUrl,
        languages: writing.alternateLocales?.reduce((acc, locale) => {
          acc[locale] = `${writingUrl}?lang=${locale}`;
          return acc;
        }, {} as Record<string, string>) || {},
      },
      openGraph: {
        title: writing.title,
        description: pageDescription,
        url: writingUrl,
        siteName: 'Danish - Developer & Writer',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: writing.title,
            type: 'image/png',
          },
        ],
        locale: writing.locale || 'en_US',
        type: 'article',
        publishedTime: publishedTime,
        modifiedTime: modifiedTime,
        authors: [writing.author || 'Danish'],
        section: 'Technology',
        tags: writing.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title: writing.title,
        description: pageDescription,
        site: "@dan10ish", 
        creator: "@dan10ish", 
        images: [{
          url: ogImageUrl,
          alt: writing.title,
        }],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      other: {
        'article:author': writing.author || 'Danish',
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime,
        'article:section': 'Technology',
        'article:tag': writing.tags?.join(', ') || '',
        'og:updated_time': modifiedTime,
      },
    }
  } catch (error) {
    const errorMessage = slug ? `Failed to generate metadata for slug "${slug}":` : "Failed to generate metadata:";
    console.error(errorMessage, error);
    return {
      title: "Error | Danish",
      description: "Could not load writing metadata.",
      alternates: {
        canonical: slug ? `https://danish.bio/writings/${slug}` : undefined,
      },
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

const CustomPre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const children = props.children
  let code = ''
  let lang = ''

  if (React.isValidElement(children) && children.props) {
    const codeElement = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    const elementProps = codeElement.props;

    if (elementProps.className) {
      const className = elementProps.className as string
      const match = className.match(/language-(\w+)/)
      if (match) {
        lang = match[1]
      }
    }
    if (typeof elementProps.children === 'string') {
      code = elementProps.children.trim()
    }
  }

  if (!code) {
    if (typeof children === 'string') {
      code = children.trim();
    } else {
      return <pre {...props} />
    }
  }

  const highlightedHtml = highlight(code)

  return (
    <figure data-rehype-pretty-code-figure> 
      <pre {...props} className={lang ? `language-${lang}` : ''}>
        <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      </pre>
    </figure>
  )
}

export default async function WritingPage({ params }: WritingPageProps) {
  let writing: WritingData;
  try {
    const { slug } = await params;
    writing = await getWritingData(slug);
  } catch (error) {
    notFound();
  }

  const { title, date, content, displayImage, ogImage } = writing;

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
      ],
    },
  }

  const components = {
    a: CustomLink,
    table: MdxTableWrapper,
    pre: CustomPre,
  }

  const coverImage = displayImage || ogImage || '/og/default.webp';

  return (
    <div className="w-full">
      <div className="relative w-full h-[25vh] sm:h-[35vh] md:h-[45vh] min-h-[200px] overflow-hidden !rounded-2xl">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover !rounded-2xl"
          priority
          sizes="100vw"
        />
        
        <div className="absolute bottom-0 left-0 right-0 !p-4 sm:!p-6 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm !rounded-b-2xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight !mb-2">
              {title}
            </h1>
            <p className="text-sm text-white/90 !mt-2">
              {formatDate(date)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
          {/* @ts-expect-error Async Server Component */}
          <MDXRemote source={content} options={options} components={components} />
        </article>
      </div>
    </div>
  )
}