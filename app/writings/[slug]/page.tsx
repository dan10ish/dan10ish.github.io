import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getSortedWritingsData, getWritingData, WritingData } from '../../../lib/server'
import { formatDate } from '../../../lib/client'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Link from 'next/link'
import { MdxTableWrapper } from '../../components/MdxTableWrapper'
import { notFound } from 'next/navigation'
import Menu from '../../components/Menu'
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
    const writingUrl = `https://dan10ish.github.io/writings/${slug}`;
    
    let ogImageUrl: string;
    const defaultOgImage = "https://i.ibb.co/vmBrhSd/OG.png";

    if (writing.ogImage) {
      if (writing.ogImage.startsWith('/')) {
        ogImageUrl = `https://dan10ish.github.io${writing.ogImage}`;
      } else {
        ogImageUrl = writing.ogImage;
      }
    } else {
      ogImageUrl = defaultOgImage;
    }

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: writing.tags || [],
      authors: [{ name: 'Danish', url: 'https://dan10ish.github.io' }],
      alternates: {
        canonical: writingUrl,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: writingUrl,
        siteName: 'Danish',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: writing.title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: writing.date,
        authors: ['Danish'],
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        site: "@dan10ish", 
        creator: "@dan10ish", 
        images: [ogImageUrl],
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
    }
  } catch (error) {
    const errorMessage = slug ? `Failed to generate metadata for slug "${slug}":` : "Failed to generate metadata:";
    console.error(errorMessage, error);
    return {
      title: "Error | Danish",
      description: "Could not load writing metadata.",
      alternates: {
        canonical: slug ? `https://dan10ish.github.io/writings/${slug}` : undefined,
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

  const { title, date, content } = writing;

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }] as any,
      ],
    },
  }

  const components = {
    a: CustomLink,
    table: MdxTableWrapper,
    pre: CustomPre,
  }

  return (
    <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
      <h1 className="!mt-0 !mb-0 !pt-0 !pb-0 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-secondary mt-2 mb-8">
        {formatDate(date)}
      </p>
      <MDXRemote source={content} options={options} components={components} />
      <Menu page="writing" />
    </article>
  )
}