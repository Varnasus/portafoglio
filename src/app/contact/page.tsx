"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site"
import { Check, Calendar, Users, MessageSquare, Target } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  teamSize: string
  timeline: string
  budget: string
  message: string
}

const projectTypes = [
  { id: "ai-strategy", label: "AI Product Strategy", icon: Target },
  { id: "llm-development", label: "LLM Application Development", icon: MessageSquare },
  { id: "team-leadership", label: "Team Leadership & Coaching", icon: Users },
  { id: "consultation", label: "General Consultation", icon: Calendar }
]

const teamSizes = [
  "1-5 people",
  "6-15 people", 
  "16-50 people",
  "50+ people"
]

const timelines = [
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "12+ months"
]

const budgets = [
  "Under $50k",
  "$50k - $100k",
  "$100k - $500k",
  "$500k+"
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    teamSize: "",
    timeline: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "",
      teamSize: "",
      timeline: "",
      budget: "",
      message: "",
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Let&apos;s Build Something Amazing
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Ready to discuss your AI product? I&apos;m here to help you navigate the complex world of AI product development.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {!isSubmitted ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Get in Touch</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Tell me about your project and I&apos;ll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="your.email@company.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          placeholder="Your company name"
                          required
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Project Details</h3>
                      <div>
                        <Label>Project Type *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {projectTypes.map((type) => {
                            const Icon = type.icon
                            return (
                              <div
                                key={type.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                  formData.projectType === type.id
                                    ? "border-primary bg-primary/5"
                                    : "border-input hover:border-primary/50"
                                }`}
                                onClick={() => handleChange("projectType", type.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <Icon className="w-5 h-5 text-primary" />
                                  <span className="font-medium">{type.label}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="teamSize">Team Size</Label>
                          <select
                            id="teamSize"
                            value={formData.teamSize}
                            onChange={(e) => handleChange("teamSize", e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select team size</option>
                            {teamSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="timeline">Timeline</Label>
                          <select
                            id="timeline"
                            value={formData.timeline}
                            onChange={(e) => handleChange("timeline", e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((timeline) => (
                              <option key={timeline} value={timeline}>
                                {timeline}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => handleChange("budget", e.target.value)}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="">Select budget</option>
                            {budgets.map((budget) => (
                              <option key={budget} value={budget}>
                                {budget}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          placeholder="Describe your project, challenges, goals, and how I can help..."
                          rows={6}
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.projectType || !formData.message}
                        className="min-w-[200px]"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. I&apos;ll review your project details and get back to you within 24 hours with a personalized response.
                </p>
                <Button onClick={resetForm} variant="outline">
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">
              Other Ways to Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Email</h3>
                <p className="text-muted-foreground">
                  <a href={`mailto:${siteConfig.author.email}`} className="hover:text-foreground">
                    {siteConfig.author.email}
                  </a>
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">LinkedIn</h3>
                <p className="text-muted-foreground">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    Connect on LinkedIn
                  </a>
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Twitter</h3>
                <p className="text-muted-foreground">
                  <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    Follow on Twitter
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 