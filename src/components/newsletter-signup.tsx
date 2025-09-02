"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Check, AlertCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just simulate success
      // In production, this would be a real API call
      setStatus("success")
      setMessage("Thanks for subscribing! You'll receive updates about AI product management insights.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Stay Updated
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setStatus("idle")}
            >
              Subscribe Another Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {message}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting || !isValidEmail(email)}
              className="w-full"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Get insights on AI product management, case studies, and industry trends.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
