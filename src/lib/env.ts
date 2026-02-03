/**
 * Environment variable validation and typed configuration
 *
 * This module validates required environment variables at runtime
 * and provides type-safe access to configuration values.
 */

// Define required environment variables for different contexts
const serverEnvVars = ['RESEND_API_KEY'] as const
const optionalEnvVars = ['NODE_ENV', 'VERCEL_URL'] as const

type ServerEnvVar = (typeof serverEnvVars)[number]
type OptionalEnvVar = (typeof optionalEnvVars)[number]

interface EnvConfig {
  // Required for server-side features
  RESEND_API_KEY: string | undefined

  // Optional / automatically set
  NODE_ENV: 'development' | 'production' | 'test'
  VERCEL_URL: string | undefined

  // Computed values
  isProduction: boolean
  isDevelopment: boolean
  baseUrl: string
}

/**
 * Validates that all required server-side environment variables are set
 * Call this during server startup to fail fast if configuration is missing
 */
export function validateServerEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const envVar of serverEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(', ')}. ` +
        'Some features may not work correctly.'
    )
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Get typed environment configuration
 * Use this for type-safe access to environment variables
 */
export function getEnvConfig(): EnvConfig {
  const nodeEnv = (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development'

  return {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NODE_ENV: nodeEnv,
    VERCEL_URL: process.env.VERCEL_URL,

    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv === 'development',
    baseUrl: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  }
}

/**
 * Check if a specific environment variable is set
 */
export function hasEnvVar(name: ServerEnvVar | OptionalEnvVar): boolean {
  return !!process.env[name]
}

// Export for convenience
export const env = getEnvConfig()
