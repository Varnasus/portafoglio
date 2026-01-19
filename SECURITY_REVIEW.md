# Security Review Report

**Date:** 2026-01-19
**Reviewed by:** Claude (Security Analysis)
**Repository:** portafoglio

## Executive Summary

A comprehensive security review was conducted on the codebase to identify hardcoded secrets and security vulnerabilities. **One critical security issue was found and fixed**: a hardcoded Resend API key that was exposed in the source code.

---

## Critical Issues Found

### 🚨 1. Hardcoded API Key (FIXED)

**Location:** `src/app/api/contact/route.ts:5`

**Issue:** The Resend API key was hardcoded as a fallback value:
```typescript
const resend = new Resend(process.env.RESEND_API_KEY || 'REDACTED_RESEND_API_KEY')
```

**Risk Level:** CRITICAL
- The API key was publicly exposed in the source code
- This key is visible in the git repository and could be discovered by anyone with access
- An attacker could use this key to send emails via your Resend account, potentially:
  - Sending spam from your domain
  - Exhausting your email quota
  - Impersonating you or your organization
  - Incurring unexpected costs

**Fix Applied:**
- Removed the hardcoded API key
- Added proper environment variable validation
- Added error handling for missing API key
- Returns a helpful error message to users if the service is misconfigured

**Immediate Action Required:**
1. **REGENERATE YOUR RESEND API KEY IMMEDIATELY** at https://resend.com/api-keys
2. The exposed key should be considered compromised and revoked
3. Set the new key in your environment variables (`.env.local` or deployment platform)
4. Monitor your Resend account for any unauthorized usage

---

## Positive Security Findings ✅

### 1. Environment Variables
- `.gitignore` properly excludes `.env` and `.env*.local` files (lines 26-27)
- No `.env` files found in the repository
- No environment files found in git history
- Created `.env.example` to document required variables

### 2. No Other Hardcoded Secrets
- No hardcoded passwords, tokens, or private keys found
- No hardcoded authentication tokens
- No AWS keys, GitHub tokens, or other API keys found
- Process.env usage is appropriate throughout the codebase

### 3. Security Headers (next.config.js)
Good security headers are implemented:
- ✅ `X-Frame-Options: DENY` (prevents clickjacking)
- ✅ `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- ✅ `Strict-Transport-Security` (enforces HTTPS)
- ✅ `Referrer-Policy: origin-when-cross-origin`
- ✅ `Permissions-Policy` (restricts camera, microphone, geolocation)

### 4. CORS Configuration
- Properly configured CORS for API routes
- Production restricts origin to `https://zvarney.com`
- Development allows all origins for testing (`*`)

### 5. No XSS Vulnerabilities
- All uses of `dangerouslySetInnerHTML` are safe (using `JSON.stringify()` on structured data)
- No `eval()`, `new Function()`, or dangerous dynamic code execution found
- Input validation present in contact form (email regex, required fields)

### 6. Git History Clean
- No credentials found in git history
- Only false positives (text content in FAQ/blog posts)

---

## Recommendations

### High Priority

1. **Regenerate Resend API Key**
   - ⚠️ The exposed key should be immediately revoked
   - Create a new API key at https://resend.com/api-keys
   - Update your deployment environment with the new key

2. **Set Up Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your new Resend API key:
     ```
     RESEND_API_KEY=your_new_api_key_here
     ```
   - Never commit `.env.local` to git

3. **Monitor for Unauthorized Usage**
   - Check your Resend dashboard for any suspicious email activity
   - Review email sending logs for the period the key was exposed
   - Set up alerts for unusual sending patterns if available

### Medium Priority

4. **Implement Rate Limiting**
   - No rate limiting was detected on the `/api/contact` endpoint
   - Consider adding rate limiting to prevent abuse:
     - Per IP address (e.g., 5 submissions per hour)
     - Per email address (to prevent spam)
   - Recommended: Use middleware or services like Vercel Rate Limiting, Upstash, or custom Redis-based solution

5. **Add CSRF Protection**
   - No CSRF protection detected for API routes
   - Consider implementing CSRF tokens for form submissions
   - For Next.js, consider using packages like `csrf` or `next-csrf`

6. **Input Sanitization**
   - Add HTML sanitization for user inputs in the contact form
   - Current validation only checks for presence and email format
   - Consider using libraries like `DOMPurify` or `validator.js`
   - Prevent potential XSS in email content

7. **Email Security**
   - Consider validating email addresses against known disposable email domains
   - Add honeypot fields to prevent bot submissions
   - Implement CAPTCHA (reCAPTCHA, hCaptcha, or Turnstile) for additional protection

### Low Priority

8. **Content Security Policy (CSP)**
   - Consider adding CSP headers to further prevent XSS attacks
   - Example:
     ```javascript
     'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ..."
     ```

9. **API Route Authentication** (if needed in future)
   - Currently, the contact API is public (which is appropriate)
   - If you add authenticated routes in the future, ensure proper JWT or session-based authentication

10. **Secrets Scanning**
    - Consider setting up automated secrets scanning
    - GitHub: Enable GitHub Secret Scanning and Push Protection
    - Pre-commit hooks: Use tools like `git-secrets` or `detect-secrets`
    - CI/CD: Add secret scanning to your deployment pipeline

11. **Dependency Security**
    - Regularly run `npm audit` to check for vulnerable dependencies
    - Consider using Dependabot or Renovate for automated updates
    - Use `npm audit fix` to automatically patch vulnerabilities

---

## Security Best Practices Going Forward

1. **Never commit secrets to version control**
   - Always use environment variables for sensitive data
   - Use `.env.local` for local development
   - Use platform environment variables for production (Vercel, Netlify, etc.)

2. **Review code before committing**
   - Search for common patterns: `password=`, `api_key=`, `secret=`, `token=`
   - Use git hooks to scan for secrets before commits

3. **Use environment variable validation**
   - Validate required environment variables at build/startup time
   - Fail fast if critical configuration is missing

4. **Regular security audits**
   - Perform security reviews periodically
   - Keep dependencies up to date
   - Monitor security advisories for your tech stack

5. **Principle of least privilege**
   - API keys should have minimal required permissions
   - Use separate keys for development and production
   - Rotate keys periodically (e.g., every 90 days)

---

## Files Modified

1. `src/app/api/contact/route.ts` - Removed hardcoded API key, added validation
2. `.env.example` - Created to document required environment variables
3. `SECURITY_REVIEW.md` - This security report

---

## Summary

The codebase had **one critical security vulnerability** (hardcoded API key) which has been fixed. The rest of the security posture is generally good, with proper `.gitignore` configuration, security headers, and no other exposed secrets.

**Immediate action required:** Regenerate the exposed Resend API key and update your environment configuration.

**Next steps:** Consider implementing the medium and low priority recommendations to further harden the application's security.
