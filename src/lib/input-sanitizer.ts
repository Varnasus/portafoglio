/**
 * Input sanitization utilities for user-provided data
 * Helps prevent XSS and other injection attacks
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 * This is a basic sanitizer - for HTML content, consider using a library like DOMPurify
 */
export function sanitizeString(input: string, maxLength = 5000): string {
  if (typeof input !== 'string') {
    return ''
  }

  // Trim whitespace
  let sanitized = input.trim()

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '')

  // Remove control characters except newlines, carriage returns, and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  return sanitized
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return ''
  }

  // Trim and lowercase
  let sanitized = email.trim().toLowerCase()

  // Remove any characters that are not valid in email addresses
  sanitized = sanitized.replace(/[^a-z0-9@._+-]/g, '')

  // Limit length (emails should not be this long)
  if (sanitized.length > 254) {
    sanitized = sanitized.substring(0, 254)
  }

  return sanitized
}

/**
 * Validate email format with a more robust regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // More robust email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  if (!emailRegex.test(email)) {
    return false
  }

  // Check length constraints
  if (email.length > 254) {
    return false
  }

  // Check local part (before @) is not too long
  const [localPart] = email.split('@')
  if (localPart && localPart.length > 64) {
    return false
  }

  return true
}

/**
 * Escape HTML special characters to prevent XSS
 * Use this when displaying user input in HTML
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return ''
  }

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => map[char] || char)
}

/**
 * Validate that a string contains only allowed characters
 */
export function containsOnlyAllowedChars(
  input: string,
  allowedPattern: RegExp
): boolean {
  return allowedPattern.test(input)
}

/**
 * Check if input contains suspicious patterns that might indicate injection attempts
 */
export function containsSuspiciousPatterns(input: string): boolean {
  if (typeof input !== 'string') {
    return false
  }

  // Patterns that might indicate injection attempts
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi, // Script tags
    /javascript:/gi, // JavaScript protocol
    /on\w+\s*=/gi, // Event handlers (onclick, onload, etc.)
    /<iframe/gi, // Iframes
    /<object/gi, // Objects
    /<embed/gi, // Embeds
    /eval\s*\(/gi, // eval() calls
    /expression\s*\(/gi, // CSS expressions
    /vbscript:/gi, // VBScript protocol
    /data:text\/html/gi, // Data URIs with HTML
  ]

  return suspiciousPatterns.some((pattern) => pattern.test(input))
}

/**
 * Sanitize and validate all contact form inputs
 */
export function sanitizeContactForm(data: {
  name?: string
  email?: string
  company?: string
  projectType?: string
  teamSize?: string
  timeline?: string
  budget?: string
  message?: string
  honeypot?: string
}): {
  isValid: boolean
  errors: string[]
  sanitized: {
    name: string
    email: string
    company: string
    projectType: string
    teamSize: string
    timeline: string
    budget: string
    message: string
  }
} {
  const errors: string[] = []

  // Check honeypot (should be empty)
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.push('Invalid form submission')
  }

  // Sanitize all inputs
  const sanitized = {
    name: sanitizeString(data.name || '', 100),
    email: sanitizeEmail(data.email || ''),
    company: sanitizeString(data.company || '', 200),
    projectType: sanitizeString(data.projectType || '', 100),
    teamSize: sanitizeString(data.teamSize || '', 50),
    timeline: sanitizeString(data.timeline || '', 100),
    budget: sanitizeString(data.budget || '', 100),
    message: sanitizeString(data.message || '', 5000),
  }

  // Validate required fields
  if (!sanitized.name || sanitized.name.length < 2) {
    errors.push('Name must be at least 2 characters')
  }

  if (!sanitized.email) {
    errors.push('Email is required')
  } else if (!isValidEmail(sanitized.email)) {
    errors.push('Invalid email format')
  }

  if (!sanitized.company || sanitized.company.length < 2) {
    errors.push('Company name must be at least 2 characters')
  }

  if (!sanitized.projectType) {
    errors.push('Project type is required')
  }

  if (!sanitized.message || sanitized.message.length < 10) {
    errors.push('Message must be at least 10 characters')
  }

  // Check for suspicious patterns in message
  if (containsSuspiciousPatterns(sanitized.message)) {
    errors.push('Message contains invalid content')
  }

  if (containsSuspiciousPatterns(sanitized.name)) {
    errors.push('Name contains invalid characters')
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized,
  }
}
