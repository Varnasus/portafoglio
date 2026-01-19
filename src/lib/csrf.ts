/**
 * Simple CSRF protection utilities
 * Generates and validates tokens to prevent Cross-Site Request Forgery attacks
 */

import { randomBytes, createHash } from 'crypto'

// Store tokens in memory (in production, consider using Redis or a database)
const tokenStore = new Map<string, { token: string; expiresAt: number }>()

// Clean up expired tokens every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of tokenStore.entries()) {
    if (now > value.expiresAt) {
      tokenStore.delete(key)
    }
  }
}, 10 * 60 * 1000)

/**
 * Generate a CSRF token for a given identifier (e.g., IP address or session ID)
 * @param identifier - Unique identifier for the request origin
 * @param validityMs - How long the token is valid (default: 1 hour)
 * @returns CSRF token
 */
export function generateCsrfToken(
  identifier: string,
  validityMs = 60 * 60 * 1000
): string {
  // Generate a random token
  const randomToken = randomBytes(32).toString('hex')

  // Create a hash of the identifier + token
  const hash = createHash('sha256')
    .update(identifier + randomToken)
    .digest('hex')

  // Store the token with expiration
  const expiresAt = Date.now() + validityMs
  tokenStore.set(hash, {
    token: randomToken,
    expiresAt,
  })

  // Return the hash as the token
  return hash
}

/**
 * Validate a CSRF token
 * @param token - The token to validate
 * @param identifier - The identifier used when generating the token
 * @returns true if valid, false otherwise
 */
export function validateCsrfToken(
  token: string,
  identifier: string
): boolean {
  if (!token || typeof token !== 'string') {
    return false
  }

  // Get the stored token data
  const stored = tokenStore.get(token)

  if (!stored) {
    return false
  }

  // Check if token has expired
  if (Date.now() > stored.expiresAt) {
    tokenStore.delete(token)
    return false
  }

  // Validate the token by recreating the hash
  const hash = createHash('sha256')
    .update(identifier + stored.token)
    .digest('hex')

  // Token is valid if the hash matches
  if (hash === token) {
    // Remove the token after use (one-time use)
    tokenStore.delete(token)
    return true
  }

  return false
}

/**
 * Clean up all expired tokens
 */
export function cleanupExpiredTokens(): number {
  const now = Date.now()
  let cleaned = 0

  for (const [key, value] of tokenStore.entries()) {
    if (now > value.expiresAt) {
      tokenStore.delete(key)
      cleaned++
    }
  }

  return cleaned
}

/**
 * Get the number of active tokens
 */
export function getActiveTokensCount(): number {
  return tokenStore.size
}

/**
 * Clear all tokens (useful for testing)
 */
export function clearAllTokens(): void {
  tokenStore.clear()
}
