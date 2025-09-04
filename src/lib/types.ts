export interface BlogPost {
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  image: string
  source: 'local' | 'medium'
}

export interface MediumPost extends BlogPost {
  source: 'medium'
  url: string
}

export interface LocalPost extends BlogPost {
  source: 'local'
}

export interface MediumAPIResponse {
  success: boolean
  posts: MediumPost[]
  cached: boolean
  error?: string
}
