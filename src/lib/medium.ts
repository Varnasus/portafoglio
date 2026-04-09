const MEDIUM_FEED_URL = "https://medium.com/feed/@zachvarney"

export interface MediumPost {
  title: string
  link: string
  date: string
  description: string
  tags: string[]
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const xml = await res.text()
    return parseRSS(xml)
  } catch {
    return []
  }
}

function parseRSS(xml: string): MediumPost[] {
  const posts: MediumPost[] = []
  const items = xml.split("<item>").slice(1)

  for (const item of items) {
    const title = extractCDATA(item, "title")
    const link = extractTag(item, "link")?.split("?")[0] ?? ""
    const pubDate = extractTag(item, "pubDate") ?? ""
    const content = extractCDATA(item, "content:encoded")

    // Extract categories
    const tags: string[] = []
    const catRegex = /<category><!\[CDATA\[(.+?)\]\]><\/category>/g
    let catMatch
    while ((catMatch = catRegex.exec(item)) !== null) {
      tags.push(catMatch[1])
    }

    // Extract first paragraph from content as description
    const description = extractDescription(content)

    // Format date
    const date = pubDate
      ? new Date(pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : ""

    if (title && link) {
      posts.push({ title, link, date, description, tags })
    }
  }

  return posts
}

function extractCDATA(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  const match = xml.match(regex)
  return match?.[1]?.trim() ?? ""
}

function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>([^<]+)</${tag}>`)
  const match = xml.match(regex)
  return match?.[1]?.trim() ?? null
}

function extractDescription(html: string): string {
  // Skip images and headers, find first <p> tag content
  const pMatch = html.match(/<p>([^<]{40,})<\/p>/)
  if (!pMatch) return ""

  // Strip any remaining HTML tags
  const text = pMatch[1].replace(/<[^>]*>/g, "").trim()

  // Truncate to ~200 chars at a word boundary
  if (text.length <= 200) return text
  return text.slice(0, 200).replace(/\s+\S*$/, "") + "..."
}
