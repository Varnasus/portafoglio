import { NextRequest, NextResponse } from 'next/server'
import { generateCsrfToken } from '@/lib/csrf'
import { getClientIp } from '@/lib/rate-limiter'

/**
 * GET endpoint to generate a CSRF token
 * The token is tied to the client's IP address
 */
export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)

    // Generate a CSRF token valid for 1 hour
    const token = generateCsrfToken(clientIp, 60 * 60 * 1000)

    return NextResponse.json(
      { token },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
        },
      }
    )
  } catch (error) {
    console.error('Error generating CSRF token:', error)
    return NextResponse.json(
      { error: 'Failed to generate security token' },
      { status: 500 }
    )
  }
}
