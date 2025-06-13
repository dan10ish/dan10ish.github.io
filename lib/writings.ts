import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const writingsDirectory = path.join(process.cwd(), 'writings')

export interface WritingData {
  slug: string
  title: string
  date: string
  summary: string
  ogImage?: string
  displayImage?: string
  content: string
  tags?: string[]
  author?: string
  readTime?: string
  type?: string
  locale?: string
  alternateLocales?: string[]
  keywords?: string[]
  canonicalUrl?: string
}

const defaultOgImage = "/og/default.webp";

export function getSortedWritingsData(): Omit<WritingData, 'content'>[] {
  const fileNames = fs.readdirSync(writingsDirectory)
  const allWritingsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(writingsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const tags = (matterResult.data.tags as string[] | undefined) || [];
      const keywords = (matterResult.data.keywords as string[] | undefined) || [];
      const alternateLocales = (matterResult.data.alternateLocales as string[] | undefined) || [];

      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        summary: matterResult.data.summary as string,
        ogImage: matterResult.data.ogImage as string || defaultOgImage,
        displayImage: matterResult.data.displayImage as string,
        tags: tags,
        author: matterResult.data.author as string,
        readTime: matterResult.data.readTime as string,
        type: matterResult.data.type as string,
        locale: matterResult.data.locale as string,
        alternateLocales: alternateLocales,
        keywords: keywords,
        canonicalUrl: matterResult.data.canonicalUrl as string,
      }
    })

  return allWritingsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  })
}

export async function getWritingData(slug: string): Promise<WritingData> {
  return new Promise((resolve) => {
    const fullPath = path.join(writingsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const tags = (matterResult.data.tags as string[] | undefined) || [];
    const keywords = (matterResult.data.keywords as string[] | undefined) || [];
    const alternateLocales = (matterResult.data.alternateLocales as string[] | undefined) || [];

    resolve({
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      summary: matterResult.data.summary as string,
      ogImage: matterResult.data.ogImage as string || defaultOgImage,
      displayImage: matterResult.data.displayImage as string,
      content: matterResult.content,
      tags: tags,
      author: matterResult.data.author as string,
      readTime: matterResult.data.readTime as string,
      type: matterResult.data.type as string,
      locale: matterResult.data.locale as string,
      alternateLocales: alternateLocales,
      keywords: keywords,
      canonicalUrl: matterResult.data.canonicalUrl as string,
    })
  })
} 