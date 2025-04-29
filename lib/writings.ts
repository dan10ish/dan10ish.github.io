import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const writingsDirectory = path.join(process.cwd(), 'writings')

export interface WritingData {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

export function getSortedWritingsData(): Omit<WritingData, 'content'>[] {
  const fileNames = fs.readdirSync(writingsDirectory)
  const allWritingsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx')) // Only include .mdx files
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(writingsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        summary: matterResult.data.summary as string,
      }
    })

  return allWritingsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getWritingData(slug: string): Promise<WritingData> {
  return new Promise((resolve) => {
    const fullPath = path.join(writingsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    resolve({
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      summary: matterResult.data.summary as string,
      content: matterResult.content,
    })
  })
} 