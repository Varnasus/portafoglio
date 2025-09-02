export interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
  context?: number[]
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

export interface OllamaRequest {
  model: string
  prompt: string
  stream?: boolean
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    num_predict?: number
    stop?: string[]
  }
}

class OllamaClient {
  private baseUrl: string
  private isConnected: boolean = false
  private connectionChecked: boolean = false

  constructor(baseUrl: string = '/api/ollama') {
    this.baseUrl = baseUrl
  }

  async checkConnection(): Promise<boolean> {
    if (this.connectionChecked) {
      return this.isConnected
    }

    try {
      console.log('🔍 Checking Ollama connection...')
      const response = await fetch(`${this.baseUrl}?endpoint=tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        console.warn('Ollama API returned non-OK status:', response.status)
        this.isConnected = false
        this.connectionChecked = true
        return false
      }
      
      const text = await response.text()
      console.log('Raw response length:', text.length)
      console.log('Raw response:', JSON.stringify(text))
      
      // Simple approach: just try to parse the raw text
      try {
        const data = JSON.parse(text)
        console.log('✅ JSON parse successful:', data)
        this.isConnected = true
        this.connectionChecked = true
        return true
      } catch (parseError) {
        const errorMessage = parseError instanceof Error ? parseError.message : String(parseError)
        console.log('❌ JSON parse failed:', errorMessage)
        
        // Show the problematic area
        const match = errorMessage.match(/position (\d+)/)
        if (match) {
          const errorPos = parseInt(match[1])
          const start = Math.max(0, errorPos - 10)
          const end = Math.min(text.length, errorPos + 10)
          console.log('Problematic area:', JSON.stringify(text.substring(start, end)))
        }
        
        this.isConnected = false
        this.connectionChecked = true
        return false
      }
      
    } catch (error) {
      console.warn('Ollama connection failed:', error)
      this.isConnected = false
      this.connectionChecked = true
      return false
    }
  }

  async generate(request: OllamaRequest): Promise<OllamaResponse> {
    const isConnected = await this.checkConnection()
    
    if (!isConnected) {
      throw new Error('Ollama is not connected. Please ensure Ollama is running and accessible.')
    }

    try {
      console.log('Generating response with request:', request)
      const response = await fetch(`${this.baseUrl}?endpoint=generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Parsed generation response:', data)
      return data
    } catch (error) {
      console.error('Error generating response from Ollama:', error)
      throw error
    }
  }

  async listModels(): Promise<string[]> {
    const isConnected = await this.checkConnection()
    
    if (!isConnected) {
      return []
    }

    try {
      const response = await fetch(`${this.baseUrl}?endpoint=tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Parsed models response:', data)
      return data.models?.map((model: { name: string }) => model.name) || []
    } catch (error) {
      console.error('Error listing models:', error)
      return []
    }
  }

  getConnectionStatus(): { isConnected: boolean; connectionChecked: boolean } {
    return {
      isConnected: this.isConnected,
      connectionChecked: this.connectionChecked,
    }
  }

  resetConnectionStatus(): void {
    this.isConnected = false
    this.connectionChecked = false
  }
}

// Export a singleton instance
export const ollamaClient = new OllamaClient()

// Export the class for testing purposes
export { OllamaClient }
