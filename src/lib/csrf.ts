import { cookies } from 'next/headers'

const CSRF_TOKEN_NAME = 'csrf_token'
const CSRF_TOKEN_LENGTH = 32

/**
 * Generates a cryptographically secure random token
 */
function generateToken(): string {
  const array = new Uint8Array(CSRF_TOKEN_LENGTH)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Gets the CSRF token from cookies, creating one if it doesn't exist
 * For use in Server Components and API routes
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = await cookies()
  let token = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!token) {
    token = generateToken()
    // Note: Cookie will be set by the API route
  }

  return token
}

/**
 * Validates a CSRF token against the one stored in cookies
 */
export async function validateCSRFToken(token: string | null | undefined): Promise<boolean> {
  if (!token || typeof token !== 'string') {
    return false
  }

  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value

  if (!storedToken) {
    return false
  }

  // Constant-time comparison to prevent timing attacks
  if (token.length !== storedToken.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }

  return result === 0
}

/**
 * Creates a new CSRF token and returns it along with cookie options
 */
export function createCSRFToken(): { token: string; cookieOptions: object } {
  const token = generateToken()

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60, // 1 hour
  }

  return { token, cookieOptions }
}
