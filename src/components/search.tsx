"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search as SearchIcon, X, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "blog" | "case-study"
  url: string
  tags: string[]
  date?: string
}

// Mock data - in a real app, this would come from your content management system
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Shifting from Hype to Shipping: AI Agents that Actually Work",
    description: "How to move beyond demos and build AI agents that deliver real value in production environments.",
    type: "blog",
    url: "/blog/shifting-from-hype-to-shipping",
    tags: ["AI Agents", "Production", "Shipping"],
    date: "2024-01-15"
  },
  {
    id: "2", 
    title: "AI Summarization Platform - Insights Co",
    description: "Built a platform that reduces report review time by 38% using advanced LLM techniques.",
    type: "case-study",
          url: "/case-studies/insights-ai-summarization-platform",
    tags: ["LLM", "Summarization", "Productivity"],
    date: "2024-02-20"
  },
  {
    id: "3",
    title: "Agent Evaluation: Task Success Over Demos",
    description: "Why traditional demo-based evaluation fails for AI agents and how to measure real task success.",
    type: "blog",
    url: "/blog/agent-evaluation-task-success",
    tags: ["Evaluation", "AI Agents", "Metrics"],
    date: "2024-01-20"
  },
  {
    id: "4",
    title: "Brand Compliance AI - Compliance Inc",
    description: "Automated brand compliance checking across 1000+ assets with 85% accuracy.",
    type: "case-study",
    url: "/case-studies/brand-compliance-ai",
    tags: ["Computer Vision", "Compliance", "Automation"],
    date: "2024-03-10"
  },
  {
    id: "5",
    title: "Cost Control for AI Products: Caching, Truncation, and Model Routing",
    description: "Practical strategies for managing AI product costs without sacrificing performance.",
    type: "blog",
    url: "/blog/cost-control-ai-products",
    tags: ["Cost Optimization", "Performance", "Strategy"],
    date: "2024-02-05"
  },
  {
    id: "6",
    title: "Agentic Workflow Automation - Slack Integration",
    description: "Implemented multi-agent system that auto-resolves 40% of support tickets.",
    type: "case-study",
    url: "/case-studies/agentic-workflow-automation",
    tags: ["Multi-Agent", "Automation", "Support"],
    date: "2024-03-25"
  }
]

export function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const searchContent = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      const searchTerms = searchQuery.toLowerCase().split(" ")
      
      const filteredResults = searchData.filter(item => {
        const searchableText = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase()
        return searchTerms.some(term => searchableText.includes(term))
      })

      // Sort by relevance (exact matches first, then partial matches)
      const sortedResults = filteredResults.sort((a, b) => {
        const aText = `${a.title} ${a.description}`.toLowerCase()
        const bText = `${b.title} ${b.description}`.toLowerCase()
        
        const aExactMatch = searchTerms.some(term => aText.includes(term))
        const bExactMatch = searchTerms.some(term => bText.includes(term))
        
        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1
        return 0
      })

      setResults(sortedResults)
      setIsSearching(false)
    }, 300)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchContent(query)
    setShowResults(true)
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      searchContent(value)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const highlightText = (text: string, searchTerms: string[]) => {
    if (!searchTerms.length) return text
    
    const regex = new RegExp(`(${searchTerms.join("|")})`, "gi")
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  const searchTerms = query.toLowerCase().split(" ").filter(term => term.length > 0)

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search blog posts and case studies..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => {
                setQuery("")
                setResults([])
                setShowResults(false)
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">
              {isSearching ? (
                "Searching..."
              ) : results.length > 0 ? (
                `${results.length} result${results.length === 1 ? "" : "s"}`
              ) : query.trim() ? (
                "No results found"
              ) : (
                "Recent content"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isSearching ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {result.type === "blog" ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : (
                          <BarChart3 className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1">
                          {highlightText(result.title, searchTerms)}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {highlightText(result.description, searchTerms)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            {result.type === "blog" ? "Blog Post" : "Case Study"}
                          </span>
                          {result.date && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(result.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.trim() ? (
                             <div className="text-center py-4 text-muted-foreground">
                 <p>No results found for &quot;{query}&quot;</p>
                 <p className="text-sm mt-1">Try different keywords or browse recent content</p>
               </div>
            ) : (
              <div className="space-y-3">
                {searchData.slice(0, 3).map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {result.type === "blog" ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : (
                          <BarChart3 className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1">{result.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {result.description}
                        </p>
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {result.type === "blog" ? "Blog Post" : "Case Study"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
