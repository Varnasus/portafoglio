"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, BarChart3, Search, Mail, Users } from "lucide-react"

const tools = [
  {
    title: "AI ROI Calculator",
    description: "Calculate the return on investment for AI implementation projects with interactive charts and detailed analysis.",
    icon: Calculator,
    href: "/tools/roi-calculator",
    features: ["Cost-benefit analysis", "Interactive charts", "Shareable results", "Multiple scenarios"]
  },
  {
    title: "Product Discovery Canvas",
    description: "Interactive canvas for structuring AI product discovery process with session storage and export capabilities.",
    icon: FileText,
    href: "/tools/discovery-canvas",
    features: ["12-section canvas", "Auto-save", "Export to text", "Progress tracking"]
  },
  {
    title: "Case Study Metrics Visualizer",
    description: "Enhanced case study pages with interactive charts showing before/after metrics and performance data.",
    icon: BarChart3,
    href: "/case-studies",
    features: ["Animated transitions", "Hover tooltips", "Performance metrics", "Before/after comparison"]
  },
  {
    title: "Enhanced Contact Form",
    description: "Multi-step contact form with project type selection and calendar booking integration.",
    icon: Users,
    href: "/contact",
    features: ["Multi-step process", "Project categorization", "Calendar integration", "Better validation"]
  },
  {
    title: "Site Search",
    description: "Search functionality across blog posts and case studies with highlighted results.",
    icon: Search,
    href: "/blog",
    features: ["Client-side search", "Result highlighting", "Fast performance", "Cross-content search"]
  },
  {
    title: "Newsletter Signup",
    description: "Newsletter signup component with API integration and success/error states.",
    icon: Mail,
    href: "/",
    features: ["Email capture", "API integration", "Success states", "Error handling"]
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              AI Product Management Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Interactive tools and frameworks I&apos;ve developed to help teams build better AI products. 
              From ROI calculations to product discovery, these tools demonstrate practical AI PM methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Card key={tool.title} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{tool.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {tool.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={tool.href}>
                        Try Tool
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Why These Tools Matter</h2>
              <p className="text-muted-foreground mb-6">
                As an AI Technical Product Manager, I&apos;ve found that having the right tools and frameworks 
                is crucial for building successful AI products. These interactive tools demonstrate:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Data-Driven Decisions</h3>
                  <p className="text-sm text-muted-foreground">
                    Quantify the impact of AI investments with concrete metrics and ROI calculations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Structured Discovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Systematic approach to AI product discovery with clear frameworks and validation.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Visual Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear visualization of complex AI metrics and performance data for stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 