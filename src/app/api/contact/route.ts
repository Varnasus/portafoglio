import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimiter, getClientIp } from '@/lib/rate-limiter'
import { sanitizeContactForm, escapeHtml } from '@/lib/input-sanitizer'
import { isDisposableEmail } from '@/lib/disposable-email-checker'
import { validateCsrfToken } from '@/lib/csrf'

const CONTACT_EMAIL = 'z.varney.business@gmail.com'

// Rate limit configuration
const RATE_LIMIT_REQUESTS = 5 // 5 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // per hour
const RATE_LIMIT_PER_EMAIL = 3 // 3 requests per email
const RATE_LIMIT_EMAIL_WINDOW = 24 * 60 * 60 * 1000 // per day

// Initialize Resend with API key from environment
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set in environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact me directly at z.varney.business@gmail.com' },
        { status: 503 }
      )
    }

    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit by IP
    const ipRateLimit = rateLimiter.check(
      `contact-ip-${clientIp}`,
      RATE_LIMIT_REQUESTS,
      RATE_LIMIT_WINDOW
    )

    if (ipRateLimit.isLimited) {
      const resetInMinutes = Math.ceil(
        (ipRateLimit.resetAt - Date.now()) / 60000
      )
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${resetInMinutes} minute${resetInMinutes !== 1 ? 's' : ''}.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (ipRateLimit.resetAt - Date.now()) / 1000
            ).toString(),
          },
        }
      )
    }

    const body = await request.json()
    const { csrfToken, ...formData } = body

    // Validate CSRF token (optional - can be disabled in development)
    if (process.env.NODE_ENV === 'production') {
      if (!csrfToken || !validateCsrfToken(csrfToken, clientIp)) {
        console.warn('Invalid CSRF token from IP:', clientIp)
        return NextResponse.json(
          { error: 'Invalid security token. Please refresh the page and try again.' },
          { status: 403 }
        )
      }
    }

    // Sanitize and validate all inputs
    const { isValid, errors, sanitized } = sanitizeContactForm(formData)

    if (!isValid) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      )
    }

    const { name, email, company, projectType, teamSize, timeline, budget, message } = sanitized

    // Check rate limit by email
    const emailRateLimit = rateLimiter.check(
      `contact-email-${email}`,
      RATE_LIMIT_PER_EMAIL,
      RATE_LIMIT_EMAIL_WINDOW
    )

    if (emailRateLimit.isLimited) {
      return NextResponse.json(
        { error: 'You have reached the maximum number of submissions. Please try again tomorrow.' },
        { status: 429 }
      )
    }

    // Check for disposable email
    if (isDisposableEmail(email)) {
      console.warn('Disposable email blocked:', email, 'from IP:', clientIp)
      return NextResponse.json(
        { error: 'Please use a permanent email address.' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from zvarney.com

Contact Information:
Name: ${name}
Email: ${email}
Company: ${company}

Project Details:
Project Type: ${projectType}
Team Size: ${teamSize || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Budget: ${budget || 'Not specified'}

Message:
${message}

---
This message was sent from the contact form on zvarney.com
Reply directly to this email to respond to ${name} at ${email}
    `.trim()

    // Create HTML version for better formatting (with HTML escaping for security)
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
        <p>You have received a new message from your portfolio contact form:</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Project Details</h3>
          <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Team Size:</strong> ${escapeHtml(teamSize) || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(timeline) || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget) || 'Not specified'}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 14px;">
          This message was sent from the contact form on zvarney.com<br>
          Reply directly to this email to respond to ${escapeHtml(name)} at ${escapeHtml(email)}
        </p>
      </div>
    `

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: CONTACT_EMAIL,
        subject: `New Contact Form Submission from ${name} (${company})`,
        text: emailContent,
        html: htmlContent,
        replyTo: email,
      })

      console.log('Email sent successfully:', emailResult)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      
      // Log the submission for debugging if email fails
      console.log('Contact form submission (email failed):', {
        timestamp: new Date().toISOString(),
        to: CONTACT_EMAIL,
        subject: `New Contact Form Submission from ${name} (${company})`,
        from: email,
        content: emailContent,
        error: emailError
      })
      
      // Return error to user if email fails
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or email me directly at z.varney.business@gmail.com' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
