import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateCSRFToken } from '@/lib/csrf'

const CONTACT_EMAIL = 'z.varney.business@gmail.com'
const MAX_FIELD_LENGTH = 1000
const MAX_MESSAGE_LENGTH = 5000

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char])
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

function sanitizeField(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length === 0 || trimmed.length > maxLength) return null
  return trimmed
}

export async function POST(request: NextRequest) {
  const csrfToken = request.headers.get('x-csrf-token')
  const isValidCSRF = await validateCSRFToken(csrfToken)

  if (!isValidCSRF) {
    return NextResponse.json(
      { error: 'Invalid request. Please refresh the page and try again.' },
      { status: 403 }
    )
  }

  if (!resend) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Contact form is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()

    const name = sanitizeField(body.name, MAX_FIELD_LENGTH)
    const email = sanitizeField(body.email, 254)
    const message = sanitizeField(body.message, MAX_MESSAGE_LENGTH)

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const textContent = `
New message from zvarney.com

Name: ${name}
Email: ${email}

Message:
${message}

---
Reply directly to respond to ${name} at ${email}
    `.trim()

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d5a27;">New Message from zvarney.com</h2>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 14px;">
          Reply directly to respond to ${safeName} at ${safeEmail}
        </p>
      </div>
    `

    const emailResult = await resend.emails.send({
      from: 'Ranger Ventures <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      subject: `New message from ${safeName}`,
      text: textContent,
      html: htmlContent,
      replyTo: email,
    })

    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
