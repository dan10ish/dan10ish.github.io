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
  content: string
  tags?: string[]
}

const defaultOgImage = "https://i.ibb.co/vmBrhSd/OG.png";

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

      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        summary: matterResult.data.summary as string,
        ogImage: matterResult.data.ogImage as string || defaultOgImage,
        tags: tags,
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

    resolve({
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      summary: matterResult.data.summary as string,
      ogImage: matterResult.data.ogImage as string || defaultOgImage,
      content: matterResult.content,
      tags: tags,
    })
  })
} 