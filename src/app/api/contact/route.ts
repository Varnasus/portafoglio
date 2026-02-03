import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateCSRFToken } from '@/lib/csrf'

const CONTACT_EMAIL = 'z.varney.business@gmail.com'
const MAX_FIELD_LENGTH = 1000
const MAX_MESSAGE_LENGTH = 5000

// Initialize Resend - will be null if API key is not configured
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

/**
 * Escapes HTML special characters to prevent XSS attacks
 */
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

/**
 * Validates email format using a strict regex pattern
 */
function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Sanitizes and validates a string field
 */
function sanitizeField(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (trimmed.length === 0 || trimmed.length > maxLength) return null
  return trimmed
}

interface ContactFormData {
  name: string
  email: string
  company: string
  projectType: string
  teamSize?: string
  timeline?: string
  budget?: string
  message: string
}

export async function POST(request: NextRequest) {
  // Validate CSRF token
  const csrfToken = request.headers.get('x-csrf-token')
  const isValidCSRF = await validateCSRFToken(csrfToken)

  if (!isValidCSRF) {
    return NextResponse.json(
      { error: 'Invalid request. Please refresh the page and try again.' },
      { status: 403 }
    )
  }

  // Check if Resend is configured
  if (!resend) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Contact form is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()

    // Validate and sanitize required fields
    const name = sanitizeField(body.name, MAX_FIELD_LENGTH)
    const email = sanitizeField(body.email, 254)
    const company = sanitizeField(body.company, MAX_FIELD_LENGTH)
    const projectType = sanitizeField(body.projectType, MAX_FIELD_LENGTH)
    const message = sanitizeField(body.message, MAX_MESSAGE_LENGTH)

    // Validate required fields exist
    if (!name || !email || !company || !projectType || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Sanitize optional fields
    const teamSize = sanitizeField(body.teamSize, MAX_FIELD_LENGTH) || 'Not specified'
    const timeline = sanitizeField(body.timeline, MAX_FIELD_LENGTH) || 'Not specified'
    const budget = sanitizeField(body.budget, MAX_FIELD_LENGTH) || 'Not specified'

    // Escape all user input for HTML to prevent XSS
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = escapeHtml(company)
    const safeProjectType = escapeHtml(projectType)
    const safeTeamSize = escapeHtml(teamSize)
    const safeTimeline = escapeHtml(timeline)
    const safeBudget = escapeHtml(budget)
    const safeMessage = escapeHtml(message)

    // Create plain text content (no escaping needed for plain text)
    const textContent = `
New Contact Form Submission from zvarney.com

Contact Information:
Name: ${name}
Email: ${email}
Company: ${company}

Project Details:
Project Type: ${projectType}
Team Size: ${teamSize}
Timeline: ${timeline}
Budget: ${budget}

Message:
${message}

---
This message was sent from the contact form on zvarney.com
Reply directly to this email to respond to ${name} at ${email}
    `.trim()

    // Create HTML content with escaped values
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
        <p>You have received a new message from your portfolio contact form:</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Company:</strong> ${safeCompany}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Project Details</h3>
          <p><strong>Project Type:</strong> ${safeProjectType}</p>
          <p><strong>Team Size:</strong> ${safeTeamSize}</p>
          <p><strong>Timeline:</strong> ${safeTimeline}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 14px;">
          This message was sent from the contact form on zvarney.com<br>
          Reply directly to this email to respond to ${safeName} at ${safeEmail}
        </p>
      </div>
    `

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${safeName} (${safeCompany})`,
      text: textContent,
      html: htmlContent,
      replyTo: email, // Use original email for reply-to functionality
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
    // Log error for debugging but don't expose details to client
    console.error('Contact form error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
