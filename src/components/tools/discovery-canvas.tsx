"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Save, Download, RotateCcw, Share2, Wifi, WifiOff, Bot, User, Send, FileText, Grid3X3 } from "lucide-react"
import { ollamaClient } from "@/lib/ollama"
import { DiscoveryPrompts, DiscoveryContext } from "@/lib/discovery-prompts"

interface CanvasData {
  problemStatement: string
  targetUsers: string
  userJourney: string
  keyAssumptions: string
  validationExperiments: string
  successMetrics: string
  technicalConstraints: string
  ethicalConsiderations: string
  modelSelection: string
  dataRequirements: string
  evaluationFramework: string
  timeline: string
}

const defaultData: CanvasData = {
  problemStatement: "",
  targetUsers: "",
  userJourney: "",
  keyAssumptions: "",
  validationExperiments: "",
  successMetrics: "",
  technicalConstraints: "",
  ethicalConsiderations: "",
  modelSelection: "",
  dataRequirements: "",
  evaluationFramework: "",
  timeline: ""
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export function DiscoveryCanvas() {
  const [data, setData] = useState<CanvasData>(defaultData)
  const [saved, setSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState<string>("")
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>("llama2:7b")
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Ensure we're hydrated on the client side
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Load data from sessionStorage on mount with better error handling
  useEffect(() => {
    if (!isHydrated) return

    try {
      const savedData = sessionStorage.getItem('discoveryCanvas')
      const savedConversation = sessionStorage.getItem('discoveryConversation')
      const savedModel = sessionStorage.getItem('selectedModel')
      const savedWelcome = sessionStorage.getItem('hasShownWelcome')
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setData(parsedData)
        } catch (error) {
          console.error('Failed to load saved data:', error)
          // Clear corrupted data
          sessionStorage.removeItem('discoveryCanvas')
        }
      }
      
      if (savedConversation) {
        try {
          const parsedConversation = JSON.parse(savedConversation)
          setConversation(parsedConversation)
        } catch (error) {
          console.error('Failed to load conversation:', error)
          // Clear corrupted data
          sessionStorage.removeItem('discoveryConversation')
        }
      }
      
      if (savedModel) {
        setSelectedModel(savedModel)
      }
      
      if (savedWelcome) {
        setHasShownWelcome(JSON.parse(savedWelcome))
      }
    } catch (error) {
      console.error('Error loading session data:', error)
    }
  }, [isHydrated])

  // Save data to sessionStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return

    try {
      sessionStorage.setItem('discoveryCanvas', JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save canvas data:', error)
    }
  }, [data, isHydrated])

  // Save conversation to sessionStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return

    try {
      sessionStorage.setItem('discoveryConversation', JSON.stringify(conversation))
    } catch (error) {
      console.error('Failed to save conversation:', error)
    }
  }, [conversation, isHydrated])

  // Save selected model to sessionStorage
  useEffect(() => {
    if (!isHydrated) return

    try {
      sessionStorage.setItem('selectedModel', selectedModel)
    } catch (error) {
      console.error('Failed to save model selection:', error)
    }
  }, [selectedModel, isHydrated])

  // Save welcome state
  useEffect(() => {
    if (!isHydrated) return

    try {
      sessionStorage.setItem('hasShownWelcome', JSON.stringify(hasShownWelcome))
    } catch (error) {
      console.error('Failed to save welcome state:', error)
    }
  }, [hasShownWelcome, isHydrated])

  const checkConnection = useCallback(async () => {
    try {
      console.log('🔄 Manual connection check triggered...')
      // Reset the client's connection status to force a fresh check
      ollamaClient.resetConnectionStatus()
      
      const connected = await ollamaClient.checkConnection()
      console.log('Connection result:', connected)
      setIsConnected(connected)
      
      if (connected) {
        const models = await ollamaClient.listModels()
        console.log('Available models:', models)
        setAvailableModels(models)
        if (models.length > 0 && !models.includes(selectedModel)) {
          setSelectedModel(models[0])
        }
      }
    } catch (error) {
      console.error('Connection check failed:', error)
      setIsConnected(false)
    }
  }, [selectedModel])

  // Check Ollama connection on mount
  useEffect(() => {
    if (!isHydrated) return
    checkConnection()
  }, [isHydrated, checkConnection])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (!isHydrated) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, isHydrated])

  // Show welcome message if this is the first visit
  useEffect(() => {
    if (!isHydrated || !isConnected || hasShownWelcome || conversation.length > 0) return

    const welcomeMessage: ConversationMessage = {
      role: 'assistant',
      content: `👋 Welcome to your AI Product Discovery Assistant!

I'm here to help you explore and validate your AI product ideas using proven discovery frameworks. 

**What would you like to work on today?**

You can tell me about:
• A new AI product idea you're exploring
• A problem you want to solve with AI
• A specific aspect of your product you want to validate
• Or ask me to help you get started with discovery

Just describe your idea or ask me a question, and I'll guide you through the discovery process! 🚀`,
      timestamp: new Date().toISOString()
    }
    setConversation([welcomeMessage])
    setHasShownWelcome(true)
  }, [isHydrated, isConnected, hasShownWelcome, conversation.length])

  const handleInputChange = (field: keyof CanvasData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const saveToSession = () => {
    try {
      sessionStorage.setItem('discoveryCanvas', JSON.stringify(data))
      setSaved(true)
      setLastSaved(new Date().toLocaleTimeString())
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }

  const resetCanvas = () => {
    if (confirm('Are you sure you want to reset everything? This will clear all data and conversation history.')) {
      setData(defaultData)
      setConversation([])
      setHasShownWelcome(false)
      try {
        sessionStorage.removeItem('discoveryCanvas')
        sessionStorage.removeItem('discoveryConversation')
        sessionStorage.removeItem('hasShownWelcome')
      } catch (error) {
        console.error('Failed to clear session storage:', error)
      }
    }
  }

  const exportToText = () => {
    const text = `Product Discovery Canvas

PROBLEM STATEMENT
${data.problemStatement}

TARGET USERS
${data.targetUsers}

USER JOURNEY
${data.userJourney}

KEY ASSUMPTIONS
${data.keyAssumptions}

VALIDATION EXPERIMENTS
${data.validationExperiments}

SUCCESS METRICS
${data.successMetrics}

TECHNICAL CONSTRAINTS
${data.technicalConstraints}

ETHICAL CONSIDERATIONS
${data.ethicalConsiderations}

MODEL SELECTION CRITERIA
${data.modelSelection}

DATA REQUIREMENTS
${data.dataRequirements}

EVALUATION FRAMEWORK
${data.evaluationFramework}

TIMELINE
${data.timeline}

Generated on: ${new Date().toLocaleDateString()}
Generated by: Zach Varney's Product Discovery Canvas Tool`

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `product-discovery-canvas-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateReport = async () => {
    if (!isConnected) {
      alert('Ollama is not connected. Please ensure Ollama is running.')
      return
    }

    setIsGenerating(true)
    try {
      const context: DiscoveryContext = {
        ...data,
        conversationHistory: conversation
      }
      
      const prompt = DiscoveryPrompts.getReportGenerationPrompt(context)
      
      const response = await ollamaClient.generate({
        model: selectedModel,
        prompt,
        options: {
          temperature: 0.7,
          num_predict: 2048
        }
      })

      const report = response.response
      
      // Create and download the report
      const blob = new Blob([report], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-product-discovery-report-${new Date().toISOString().split('T')[0]}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please check your Ollama connection.')
    } finally {
      setIsGenerating(false)
    }
  }

  const shareCanvas = () => {
    const url = new URL(window.location.href)
    const encodedData = btoa(JSON.stringify(data))
    url.searchParams.set('data', encodedData)
    
    if (navigator.share) {
      navigator.share({
        title: 'Product Discovery Canvas',
        text: 'Check out this AI product discovery canvas I created!',
        url: url.toString()
      })
    } else {
      navigator.clipboard.writeText(url.toString())
      alert('Canvas URL copied to clipboard!')
    }
  }

  const sendMessage = async () => {
    if (!currentMessage.trim() || isGenerating) return

    const userMessage: ConversationMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    }

    setConversation(prev => [...prev, userMessage])
    setCurrentMessage("")
    setIsGenerating(true)

    try {
      let prompt: string
      
      if (conversation.length === 0) {
        // First message - use initial prompt
        prompt = DiscoveryPrompts.getInitialPrompt()
      } else {
        // Ongoing conversation - use context prompt
        const context: DiscoveryContext = {
          ...data,
          conversationHistory: [...conversation, userMessage]
        }
        prompt = DiscoveryPrompts.getConversationContextPrompt(context)
      }

      const response = await ollamaClient.generate({
        model: selectedModel,
        prompt: `${prompt}\n\nUser: ${currentMessage}\n\nAssistant:`,
        options: {
          temperature: 0.7,
          num_predict: 1024
        }
      })

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      }

      setConversation(prev => [...prev, assistantMessage])

      // Try to auto-populate canvas fields based on the response
      autoPopulateCanvas(response.response)

    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your Ollama connection and try again.',
        timestamp: new Date().toISOString()
      }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const autoPopulateCanvas = (response: string) => {
    // Simple keyword-based auto-population
    const updates: Partial<CanvasData> = {}
    
    if (response.toLowerCase().includes('problem') && !data.problemStatement) {
      const problemMatch = response.match(/(?:problem|issue|pain point)[:\s]+([^.\n]+)/i)
      if (problemMatch) {
        updates.problemStatement = problemMatch[1].trim()
      }
    }
    
    if (response.toLowerCase().includes('user') && !data.targetUsers) {
      const userMatch = response.match(/(?:user|target|audience)[:\s]+([^.\n]+)/i)
      if (userMatch) {
        updates.targetUsers = userMatch[1].trim()
      }
    }
    
    if (response.toLowerCase().includes('journey') && !data.userJourney) {
      const journeyMatch = response.match(/(?:journey|experience|flow)[:\s]+([^.\n]+)/i)
      if (journeyMatch) {
        updates.userJourney = journeyMatch[1].trim()
      }
    }
    
    if (Object.keys(updates).length > 0) {
      setData(prev => ({ ...prev, ...updates }))
    }
  }

  const canvasSections = [
    {
      title: "Problem Statement",
      field: "problemStatement" as keyof CanvasData,
      placeholder: "What problem are you trying to solve? Be specific about the pain points and impact.",
      rows: 3
    },
    {
      title: "Target Users",
      field: "targetUsers" as keyof CanvasData,
      placeholder: "Who are your primary users? Include demographics, roles, and key characteristics.",
      rows: 3
    },
    {
      title: "User Journey",
      field: "userJourney" as keyof CanvasData,
      placeholder: "Map the user's journey from problem awareness to solution adoption.",
      rows: 4
    },
    {
      title: "Key Assumptions",
      field: "keyAssumptions" as keyof CanvasData,
      placeholder: "What assumptions are you making about users, technology, and market?",
      rows: 4
    },
    {
      title: "Validation Experiments",
      field: "validationExperiments" as keyof CanvasData,
      placeholder: "How will you test and validate your assumptions? Include specific experiments.",
      rows: 4
    },
    {
      title: "Success Metrics",
      field: "successMetrics" as keyof CanvasData,
      placeholder: "How will you measure success? Include both leading and lagging indicators.",
      rows: 3
    },
    {
      title: "Technical Constraints",
      field: "technicalConstraints" as keyof CanvasData,
      placeholder: "What technical limitations or requirements must you consider?",
      rows: 3
    },
    {
      title: "Ethical Considerations",
      field: "ethicalConsiderations" as keyof CanvasData,
      placeholder: "What ethical implications should be considered? Bias, privacy, fairness, etc.",
      rows: 3
    },
    {
      title: "Model Selection Criteria",
      field: "modelSelection" as keyof CanvasData,
      placeholder: "What criteria will you use to select AI models? Performance, cost, latency, etc.",
      rows: 3
    },
    {
      title: "Data Requirements",
      field: "dataRequirements" as keyof CanvasData,
      placeholder: "What data do you need? Quality, quantity, sources, and privacy considerations.",
      rows: 3
    },
    {
      title: "Evaluation Framework",
      field: "evaluationFramework" as keyof CanvasData,
      placeholder: "How will you evaluate model performance? Metrics, benchmarks, and testing protocols.",
      rows: 3
    },
    {
      title: "Timeline",
      field: "timeline" as keyof CanvasData,
      placeholder: "What's your development timeline? Include key milestones and dependencies.",
      rows: 3
    }
  ]

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isHydrated && isConnected ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm font-medium">
              Ollama: {isHydrated && isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {isHydrated && isConnected && availableModels.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                {availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={checkConnection}
            variant="outline" 
            size="sm"
          >
            Refresh Connection
          </Button>
          <Button 
            onClick={() => setShowCanvas(!showCanvas)} 
            variant={isHydrated && showCanvas ? "default" : "outline"} 
            size="sm"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            {isHydrated && showCanvas ? 'Hide Canvas' : 'Show Canvas'}
          </Button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bot className="w-6 h-6" />
            AI Product Discovery Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
            {conversation.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Welcome to AI Product Discovery!</p>
                <p className="text-sm">I&apos;m here to help you explore and validate your AI product ideas.</p>
                <p className="text-sm">Start by telling me about your idea or asking me a question!</p>
              </div>
            ) : (
              conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isGenerating && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tell me about your AI product idea or ask me a question..."
              disabled={!isHydrated || !isConnected || isGenerating}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!currentMessage.trim() || !isHydrated || !isConnected || isGenerating}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-4 justify-between items-center p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-4">
          <Button onClick={saveToSession} variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            {isHydrated && saved ? 'Saved!' : 'Save'}
          </Button>
          {isHydrated && lastSaved && (
            <span className="text-sm text-muted-foreground">
              Last saved: {lastSaved}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button onClick={exportToText} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Canvas
          </Button>
          <Button 
            onClick={generateReport} 
            variant="outline" 
            size="sm"
            disabled={!isHydrated || !isConnected || isGenerating}
          >
            <FileText className="w-4 h-4 mr-2" />
            {isHydrated && isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
          <Button onClick={shareCanvas} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={resetCanvas} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Canvas Grid - Hidden by default */}
      {isHydrated && showCanvas && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canvasSections.map((section) => (
              <Card key={section.field} className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={section.placeholder}
                    value={data[section.field]}
                    onChange={(e) => handleInputChange(section.field, e.target.value)}
                    rows={section.rows}
                    className="resize-none"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Canvas Completion</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((Object.values(data).filter(v => v.trim().length > 0).length / Object.keys(data).length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(data).filter(v => v.trim().length > 0).length / Object.keys(data).length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
