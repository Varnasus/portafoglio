import { NextResponse } from 'next/server'
import { createCSRFToken } from '@/lib/csrf'

/**
 * GET /api/csrf
 * Returns a CSRF token and sets it in an httpOnly cookie
 */
export async function GET() {
  const { token, cookieOptions } = createCSRFToken()

  const response = NextResponse.json({ csrfToken: token })

  // Set the token in an httpOnly cookie for server-side validation
  response.cookies.set('csrf_token', token, cookieOptions)

  return response
}
