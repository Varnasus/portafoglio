/**
 * Disposable email domain checker
 * Helps prevent spam by blocking temporary/disposable email services
 */

// Common disposable email domains
// This is a small list - for production, consider using a service like
// https://github.com/disposable/disposable-email-domains or an API
const DISPOSABLE_DOMAINS = new Set([
  // Popular disposable email services
  '10minutemail.com',
  '10minutemail.net',
  'guerrillamail.com',
  'guerrillamail.net',
  'mailinator.com',
  'maildrop.cc',
  'tempmail.com',
  'temp-mail.org',
  'throwaway.email',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.net',
  'getnada.com',
  'mohmal.com',
  'sharklasers.com',
  'grr.la',
  'getairmail.com',
  'trashmail.com',
  'mailnesia.com',
  'mintemail.com',
  'mytemp.email',
  'tempinbox.com',
  'dispostable.com',
  'fakeinbox.com',
  'emailondeck.com',
  'spamgourmet.com',
  'mailcatch.com',
  'burnermail.io',
  'zetmail.com',
  'moakt.com',
  'quickmail.nl',
  'throwam.com',
  'ezehe.com',
  'disposableemailaddresses.com',
  'meltmail.com',
  'tempemailaddress.com',
  'spam4.me',
  'mytrashmail.com',
  'mailexpire.com',
  'maildax.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'einrot.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'rhyta.com',
  'superrito.com',
  'teleworm.us',
  'abyssmail.com',
  'binkmail.com',
  'bobmail.info',
  'chammy.info',
  'devnullmail.com',
  'letthemeatspam.com',
  'mailin8r.com',
  'mailinator2.com',
  'mailmoat.com',
  'sogetthis.com',
  'spamavert.com',
  'spambox.us',
  'spamex.com',
  'spamgourmet.com',
  'spammotel.com',
  'trashymail.com',
  'upliftnow.com',
  'viditag.com',
  'viewcastmedia.com',
  'wasteland.rfc822.org',
  'wh4f.org',
  'whatpaas.com',
  'willhackforfood.biz',
  'yamit.com.br',
  'zehnminutenmail.de',
])

/**
 * Check if an email domain is a known disposable email service
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Extract domain from email
  const parts = email.toLowerCase().split('@')
  if (parts.length !== 2) {
    return false
  }

  const domain = parts[1].trim()

  // Check if domain is in the disposable list
  return DISPOSABLE_DOMAINS.has(domain)
}

/**
 * Get the domain from an email address
 */
export function getEmailDomain(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null
  }

  const parts = email.toLowerCase().split('@')
  if (parts.length !== 2) {
    return null
  }

  return parts[1].trim()
}

/**
 * Check if email is from a common free email provider
 * These are generally okay, but you might want to flag them for certain use cases
 */
export function isFreeEmailProvider(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  const domain = getEmailDomain(email)
  if (!domain) {
    return false
  }

  const freeProviders = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'mail.com',
    'zoho.com',
    'gmx.com',
  ])

  return freeProviders.has(domain)
}

/**
 * Add custom disposable domains to the blocklist
 * Useful for adding domains you discover over time
 */
export function addDisposableDomain(domain: string): void {
  if (domain && typeof domain === 'string') {
    DISPOSABLE_DOMAINS.add(domain.toLowerCase().trim())
  }
}

/**
 * Remove a domain from the blocklist
 */
export function removeDisposableDomain(domain: string): void {
  if (domain && typeof domain === 'string') {
    DISPOSABLE_DOMAINS.delete(domain.toLowerCase().trim())
  }
}

/**
 * Get the total number of blocked domains
 */
export function getBlockedDomainsCount(): number {
  return DISPOSABLE_DOMAINS.size
}
