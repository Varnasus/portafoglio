import { NextRequest, NextResponse } from 'next/server'

const OLLAMA_BASE_URL = 'http://localhost:11434'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint') || 'tags'
    
    const response = await fetch(`${OLLAMA_BASE_URL}/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ollama API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    // Handle potential streaming responses for all endpoints
    const text = await response.text()
    console.log(`Raw Ollama ${endpoint} response:`, text)
    
    // Split by newlines and find the last complete JSON object
    const lines = text.trim().split('\n')
    let finalResponse = null
    
    for (const line of lines) {
      if (line.trim()) {
        try {
          const data = JSON.parse(line)
          finalResponse = data
        } catch (parseError) {
          console.warn('Failed to parse line:', line)
          continue
        }
      }
    }
    
    if (!finalResponse) {
      return NextResponse.json(
        { error: 'Failed to parse Ollama response' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(finalResponse)
  } catch (error) {
    console.error('Ollama proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to Ollama' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint') || 'generate'
    const body = await request.json()
    
    const response = await fetch(`${OLLAMA_BASE_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ollama API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    // Handle streaming responses for all endpoints
    const text = await response.text()
    console.log(`Raw Ollama ${endpoint} response:`, text)
    
    // Split by newlines and find the last complete JSON object
    const lines = text.trim().split('\n')
    let finalResponse = null
    
    for (const line of lines) {
      if (line.trim()) {
        try {
          const data = JSON.parse(line)
          finalResponse = data
        } catch (parseError) {
          console.warn('Failed to parse line:', line)
          continue
        }
      }
    }
    
    if (!finalResponse) {
      return NextResponse.json(
        { error: 'Failed to parse Ollama response' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(finalResponse)
  } catch (error) {
    console.error('Ollama proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to Ollama' },
      { status: 500 }
    )
  }
}
