import { NextRequest, NextResponse } from 'next/server'

interface MediumPost {
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  image: string
  url: string
  source: 'medium'
}

interface RSSItem {
  title: string
  description: string
  pubDate: string
  link: string
  guid: string
  'content:encoded'?: string
  'dc:creator'?: string
  category?: string[]
  'media:content'?: {
    $: {
      url: string
      medium: string
    }
  }
}

interface RSSFeed {
  rss: {
    channel: {
      item: RSSItem[]
    }
  }
}

// Cache for Medium posts (5 minutes)
let mediumPostsCache: MediumPost[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function extractReadTime(content: string): string {
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200) // Average reading speed: 200 words per minute
  return `${readTime} min read`
}

function extractImageFromContent(content: string): string {
  // Try to extract the first image from the content with more flexible patterns
  const patterns = [
    // Standard img tags
    /<img[^>]+src="([^"]+)"/i,
    // Medium's figure format
    /<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i,
    // Medium's picture format
    /<picture[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i,
    // Direct image URLs in content
    /https:\/\/[^"\s]+\.(jpg|jpeg|png|gif|webp)/i
  ]
  
  for (const pattern of patterns) {
    const match = content.match(pattern)
    if (match) {
      let imageUrl = match[1]
      // Clean up Medium image URLs to get higher quality versions
      if (imageUrl.includes('cdn-images-1.medium.com')) {
        imageUrl = imageUrl.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=630')
      }
      return imageUrl
    }
  }
  
  // Fallback to a default image
  return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
}

function extractFirstParagraph(content: string): string {
  // Remove HTML tags and extract first paragraph
  const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  
  // Find the first sentence or first 200 characters
  const firstSentence = cleanContent.split('.')[0]
  if (firstSentence.length > 200) {
    return cleanContent.substring(0, 200) + '...'
  }
  
  return firstSentence + (cleanContent.includes('.') ? '.' : '')
}

function extractTagsFromContent(content: string, categories?: string[]): string[] {
  const tags: string[] = []
  
  // Add categories if available
  if (categories && categories.length > 0) {
    tags.push(...categories.slice(0, 3)) // Limit to 3 tags
  }
  
  // Extract common AI/tech tags from content
  const contentLower = content.toLowerCase()
  const commonTags = [
    'AI', 'Machine Learning', 'LLM', 'Product Management', 
    'Technology', 'Innovation', 'Data Science', 'Automation'
  ]
  
  for (const tag of commonTags) {
    if (contentLower.includes(tag.toLowerCase()) && !tags.includes(tag)) {
      tags.push(tag)
      if (tags.length >= 5) break // Limit total tags
    }
  }
  
  return tags.slice(0, 5) // Maximum 5 tags
}

function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function estimateMetrics(content: string, publishDate: string): { estimatedClaps: number; estimatedViews: number; wordCount: number } {
  const wordCount = content.split(/\s+/).length
  const daysSincePublish = Math.max(1, Math.floor((Date.now() - new Date(publishDate).getTime()) / (1000 * 60 * 60 * 24)))
  
  // Simple estimation based on content length and time since publish
  // These are rough estimates for display purposes
  const baseViews = Math.min(wordCount * 2, 1000) // Base views based on word count
  const timeMultiplier = Math.min(daysSincePublish * 0.1, 2) // Time decay factor
  const estimatedViews = Math.floor(baseViews * timeMultiplier)
  
  // Estimate claps as 5-15% of views
  const clapRate = 0.05 + (Math.random() * 0.1) // 5-15% clap rate
  const estimatedClaps = Math.floor(estimatedViews * clapRate)
  
  return {
    estimatedClaps,
    estimatedViews,
    wordCount
  }
}

async function fetchMediumPosts(): Promise<MediumPost[]> {
  try {
    const rssUrl = 'https://medium.com/feed/@zachvarney'
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    
    const response = await fetch(proxyUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS feed format')
    }
    
    const posts: MediumPost[] = data.items
      .slice(0, 10) // Limit to 10 most recent posts
      .map((item: any) => {
        const content = item.content || item.description || ''
        // Try multiple sources for the image
        const image = item.thumbnail || 
                     item.enclosure?.url || 
                     extractImageFromContent(content) ||
                     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
        const tags = extractTagsFromContent(content, item.categories)
        
        const metrics = estimateMetrics(content, item.pubDate || new Date().toISOString())
        
        return {
          title: item.title || 'Untitled',
          description: extractFirstParagraph(content),
          date: item.pubDate || new Date().toISOString(),
          readTime: extractReadTime(content),
          tags,
          slug: createSlugFromTitle(item.title || 'untitled'),
          image,
          url: item.link || '#',
          source: 'medium' as const,
          metrics
        }
      })
    
    return posts
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const now = Date.now()
    
    // Check if we have valid cached data
    if (mediumPostsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        posts: mediumPostsCache,
        cached: true
      })
    }
    
    // Fetch fresh data
    const posts = await fetchMediumPosts()
    
    // Update cache
    mediumPostsCache = posts
    cacheTimestamp = now
    
    return NextResponse.json({
      success: true,
      posts,
      cached: false
    })
  } catch (error) {
    console.error('Error in Medium API route:', error)
    
    // Return cached data if available, even if expired
    if (mediumPostsCache) {
      return NextResponse.json({
        success: true,
        posts: mediumPostsCache,
        cached: true,
        error: 'Using cached data due to fetch error'
      })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Medium posts',
      posts: []
    }, { status: 500 })
  }
}
