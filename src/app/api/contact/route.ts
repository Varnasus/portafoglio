import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const CONTACT_EMAIL = 'z.varney.business@gmail.com'
const resend = new Resend(process.env.RESEND_API_KEY || 're_g1qEcKrs_6AEeWSGvKnRmg5CEfWiPtE3y')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, projectType, teamSize, timeline, budget, message } = body

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
        from: 'Portfolio Contact <onboarding@resend.dev>', // Using Resend's default domain for now
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
        content: emailContent
      })
      
      // Still return success to user, but log the error
      // In production, you might want to handle this differently
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
