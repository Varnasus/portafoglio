'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SocialShareButtons } from "@/components/social-sharing"
import { BlogPost, MediumPost } from "@/lib/types"
import { Heart, MessageCircle, FileText } from 'lucide-react'

interface BlogPostsProps {
  localPosts: BlogPost[]
}

export function BlogPosts({ localPosts }: BlogPostsProps) {
  const [mediumPosts, setMediumPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMediumPosts() {
      try {
        const response = await fetch('/api/medium')
        const data = await response.json()
        
        if (data.success) {
          setMediumPosts(data.posts)
        } else {
          setError(data.error || 'Failed to fetch Medium posts')
        }
      } catch (err) {
        setError('Failed to fetch Medium posts')
        console.error('Error fetching Medium posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMediumPosts()
  }, [])

  // Combine and sort all posts by date
  const allPosts = [...localPosts, ...mediumPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (loading) {
    return (
      <div className="space-y-12">
        {localPosts.map((post, index) => (
          <BlogPostCard key={`local-${index}`} post={post} />
        ))}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Loading Medium posts...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-12">
        {localPosts.map((post, index) => (
          <BlogPostCard key={`local-${index}`} post={post} />
        ))}
        <div className="text-center py-8">
          <div className="text-muted-foreground">
            <p>Unable to load Medium posts: {error}</p>
            <p className="text-sm mt-2">Showing local posts only.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {allPosts.map((post, index) => (
        <BlogPostCard key={`${post.source}-${index}`} post={post} />
      ))}
    </div>
  )
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const isMediumPost = post.source === 'medium'
  const postUrl = isMediumPost ? ((post as MediumPost).url || '#') : `/blog/${post.slug}`
  const shareUrl = isMediumPost ? ((post as MediumPost).url || '#') : `https://zvarney.com/blog/${post.slug}`

  return (
    <article className="border-b border-border pb-12 last:border-b-0">
      <div className="flex items-center gap-x-4 text-xs mb-4">
        <time className="text-muted-foreground" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{post.readTime}</span>
        {isMediumPost && (
          <>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              Medium
            </span>
          </>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {post.image && (
          <div className="md:col-span-1">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}
        
        <div className={`${post.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <h2 className="text-2xl font-semibold mb-4">
            {isMediumPost ? (
              <a 
                href={postUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {post.title}
              </a>
            ) : (
              <Link href={postUrl} className="hover:underline">
                {post.title}
              </Link>
            )}
          </h2>
          
          <p className="text-muted-foreground mb-4">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <Button 
              asChild 
              variant="outline" 
              size="sm"
            >
              {isMediumPost ? (
                <a 
                  href={postUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read on Medium
                </a>
              ) : (
                <Link href={postUrl}>
                  Read More
                </Link>
              )}
            </Button>
          </div>
          
          {/* Real metrics for Medium posts - only show word count for now */}
          {isMediumPost && post.metrics?.wordCount && (
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{post.metrics.wordCount.toLocaleString()} words</span>
              </div>
            </div>
          )}
          
          {/* Social Share for Individual Posts */}
          <div className="mt-4">
            <SocialShareButtons
              url={shareUrl}
              title={post.title}
              description={post.description}
              image={post.image}
              hashtags={[...post.tags, 'AI', 'ProductManagement']}
              className="justify-start"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
