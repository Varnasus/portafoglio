"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site"
import { Check } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [csrfToken, setCsrfToken] = useState<string | null>(null)

  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch('/api/csrf')
      if (response.ok) {
        const data = await response.json()
        setCsrfToken(data.csrfToken)
      }
    } catch (err) {
      console.error('Failed to fetch CSRF token:', err)
    }
  }, [])

  useEffect(() => {
    fetchCsrfToken()
  }, [fetchCsrfToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!csrfToken) {
      setError('Security token missing. Please refresh the page and try again.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      fetchCsrfToken()
    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again or email me directly.')
      fetchCsrfToken()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setError(null)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column — Copy + Contact details */}
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Contact
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Let&apos;s talk.
              </h1>
              <p className="text-lg leading-8 text-muted-foreground mb-10">
                I&apos;m open to consulting engagements, technical partnerships, and
                advisory roles. If you&apos;re building something with AI and need
                someone who can go from architecture to working code, let&apos;s start
                a conversation.
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono tracking-widest text-primary/70">EMAIL</span>
                  <p className="mt-1">
                    <a
                      href={`mailto:${siteConfig.author.email}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {siteConfig.author.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest text-primary/70">LINKEDIN</span>
                  <p className="mt-1">
                    <Link
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      linkedin.com/in/zach-varney
                    </Link>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest text-primary/70">GITHUB</span>
                  <p className="mt-1">
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      github.com/Varnasus
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — Form */}
            <div>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">What do you need?</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell me about the problem you're trying to solve..."
                      rows={6}
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <p className="text-destructive text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent</h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <Button onClick={resetForm} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
