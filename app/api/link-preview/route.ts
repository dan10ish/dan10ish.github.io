import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const getMetaContent = (selectors: string[]) => {
      for (const selector of selectors) {
        const content = $(selector).attr('content')
        if (content) return content
      }
      return null
    }

    const metadata = {
      title: getMetaContent([
        'meta[property="og:title"]',
        'meta[name="twitter:title"]',
        'meta[name="title"]',
      ]) || $('title').first().text() || null,
      
      description: getMetaContent([
        'meta[property="og:description"]',
        'meta[name="twitter:description"]',
        'meta[name="description"]',
      ]) || null,
      
      image: getMetaContent([
        'meta[property="og:image"]',
        'meta[name="twitter:image"]',
      ]) || null,
    }

    return NextResponse.json(metadata, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch (error) {
    console.error('Error fetching link preview:', error)
    return NextResponse.json({ error: 'Failed to parse URL' }, { status: 500 })
  }
}
