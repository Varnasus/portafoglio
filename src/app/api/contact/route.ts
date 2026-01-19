import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const CONTACT_EMAIL = 'z.varney.business@gmail.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const MAX_MESSAGE_LENGTH = 2000
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

function checkRateLimit(ip: string) {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { limited: false, resetAt: now + RATE_LIMIT_WINDOW_MS }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { limited: true, resetAt: entry.resetAt }
  }

  entry.count += 1
  rateLimitStore.set(ip, entry)
  return { limited: false, resetAt: entry.resetAt }
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(clientIp)
    if (rateLimit.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const body = await request.json()
    const name = normalizeString(body.name)
    const email = normalizeString(body.email)
    const company = normalizeString(body.company)
    const projectType = normalizeString(body.projectType)
    const teamSize = normalizeString(body.teamSize)
    const timeline = normalizeString(body.timeline)
    const budget = normalizeString(body.budget)
    const message = normalizeString(body.message)

    // Validate required fields
    if (!name || !email || !company || !projectType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message exceeds ${MAX_MESSAGE_LENGTH} characters` },
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

    // Create HTML version for better formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
        <p>You have received a new message from your portfolio contact form:</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Project Details</h3>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Team Size:</strong> ${teamSize || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 14px;">
          This message was sent from the contact form on zvarney.com<br>
          Reply directly to this email to respond to ${name} at ${email}
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
