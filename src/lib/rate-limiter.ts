/**
 * Simple in-memory rate limiter for API endpoints
 * Tracks requests by identifier (IP address, email, etc.)
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier (IP address, email, etc.)
   * @param limit - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with isLimited boolean and remaining requests
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { isLimited: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    // No previous requests or window expired
    if (!entry || now > entry.resetAt) {
      const resetAt = now + windowMs
      this.requests.set(identifier, { count: 1, resetAt })
      return { isLimited: false, remaining: limit - 1, resetAt }
    }

    // Increment count
    entry.count++

    // Check if limit exceeded
    if (entry.count > limit) {
      return { isLimited: true, remaining: 0, resetAt: entry.resetAt }
    }

    return {
      isLimited: false,
      remaining: limit - entry.count,
      resetAt: entry.resetAt,
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup() {
    const now = Date.now()
    for (const [identifier, entry] of this.requests.entries()) {
      if (now > entry.resetAt) {
        this.requests.delete(identifier)
      }
    }
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier: string) {
    this.requests.delete(identifier)
  }

  /**
   * Clear all rate limit data
   */
  clear() {
    this.requests.clear()
  }

  /**
   * Destroy the rate limiter and cleanup interval
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.clear()
  }
}

// Export a singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Get client IP address from request
 */
export function getClientIp(request: Request): string {
  // Try various headers that might contain the real IP
  const headers = request.headers

  // Check forwarded headers (common in production behind proxies)
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  // Cloudflare
  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp.trim()
  }

  // Fallback
  return 'unknown'
}
