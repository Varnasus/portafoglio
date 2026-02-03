# Security TODO List

## CRITICAL - Immediate Action Required

### 1. [ ] Revoke Exposed Resend API Key
**Priority:** CRITICAL
**Status:** PENDING YOUR ACTION

The API key `re_g1qEcKrs_6AEeWSGvKnRmg5CEfWiPtE3y` was found hardcoded in `src/app/api/contact/route.ts` and is exposed in git history.

**Steps:**
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Revoke the compromised key immediately
3. Generate a new API key
4. Store the new key in environment variables only (add `RESEND_API_KEY` to `.env.local`)

---

### 2. [ ] Clean Git History of Exposed Secrets
**Priority:** CRITICAL
**Status:** PENDING YOUR ACTION

The exposed API key remains in git history even though the file was deleted.

**Option A - Using BFG Repo Cleaner (Recommended):**
```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files route.ts
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

**Option B - Using git filter-branch:**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch src/app/api/contact/route.ts" \
  --prune-empty --tag-name-filter cat -- --all

git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force --all
```

**Warning:** Force pushing rewrites history. Coordinate with any collaborators.

---

## HIGH Priority

### 3. [x] Recreate Contact API Route Securely
**Priority:** HIGH
**Status:** COMPLETED
**File:** `src/app/api/contact/route.ts`

Implemented with:
- HTML escaping for all user input (XSS prevention)
- No hardcoded API keys (env var only, no fallback)
- Input validation with length limits
- Sanitized error messages (no internal details exposed)
- CSRF token validation

---

### 4. [ ] Add Rate Limiting to API Routes
**Priority:** HIGH
**Status:** SKIPPED (per user preference)

Rate limiting was not implemented. If needed later, use `@upstash/ratelimit` with Redis.

---

### 5. [ ] Secure Ollama Proxy (If Recreating)
**Priority:** HIGH
**File:** `src/app/api/ollama/route.ts` (deleted, not recreated)

If recreating the Ollama proxy:
- Restrict to localhost connections only in production
- Add authentication or session validation
- Whitelist allowed endpoints (don't allow arbitrary endpoint parameter)
- Add rate limiting
- Remove verbose logging in production

---

## MEDIUM Priority

### 6. [x] Add Content Security Policy
**Priority:** MEDIUM
**Status:** COMPLETED

Added to `next.config.js`:
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://plausible.io http://localhost:11434; frame-ancestors 'none';",
}
```

---

### 7. [x] Validate SessionStorage Data
**Priority:** MEDIUM
**Status:** COMPLETED

Added to `src/components/tools/discovery-canvas.tsx`:
- `isValidCanvasData()` - validates canvas data structure
- `isValidConversation()` - validates conversation messages
- `sanitizeCanvasData()` - limits field lengths to 5000 chars
- URL sharing validates data size (max 8000 chars)
- Conversation history limited to 50 messages

---

### 8. [x] Add CSRF Protection to Forms
**Priority:** MEDIUM
**Status:** COMPLETED

Implemented:
- `src/lib/csrf.ts` - CSRF token generation and validation utilities
- `src/app/api/csrf/route.ts` - Endpoint to get CSRF token (sets httpOnly cookie)
- `src/app/contact/page.tsx` - Updated to fetch and include CSRF token in requests
- `src/app/api/contact/route.ts` - Validates CSRF token on POST requests

---

## LOW Priority

### 9. [x] Environment Variable Validation
**Priority:** LOW
**Status:** COMPLETED

Created `src/lib/env.ts`:
- `validateServerEnv()` - Validates required env vars at runtime
- `getEnvConfig()` - Type-safe access to environment configuration
- `hasEnvVar()` - Check if specific env var is set

---

### 10. [x] Add Security Audit Script
**Priority:** LOW
**Status:** COMPLETED

Added to `package.json`:
```json
{
  "scripts": {
    "security-audit": "npm audit --audit-level=moderate",
    "security-audit:fix": "npm audit fix"
  }
}
```

Run with: `npm run security-audit`

---

## Completed Items

- [x] Content Security Policy header added
- [x] SessionStorage validation and sanitization
- [x] URL sharing data validation and size limits
- [x] Conversation history limits
- [x] Message content display length limits
- [x] Secure contact API route with XSS protection
- [x] CSRF protection for contact form
- [x] Environment variable validation utility
- [x] Security audit npm script

---

## Security Headers Already Configured

The following security headers are properly configured in `next.config.js`:

| Header | Value | Status |
|--------|-------|--------|
| X-Frame-Options | DENY | OK |
| X-Content-Type-Options | nosniff | OK |
| Referrer-Policy | origin-when-cross-origin | OK |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | OK |
| Strict-Transport-Security | max-age=31536000; includeSubDomains | OK |
| Content-Security-Policy | (see above) | OK |

---

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `src/app/api/contact/route.ts` | Created | Secure contact form API |
| `src/lib/csrf.ts` | Created | CSRF token utilities |
| `src/app/api/csrf/route.ts` | Created | CSRF token endpoint |
| `src/app/contact/page.tsx` | Modified | Added CSRF token handling |
| `src/lib/env.ts` | Created | Environment validation |
| `src/components/tools/discovery-canvas.tsx` | Modified | Input validation |
| `next.config.js` | Modified | Added CSP header |
| `package.json` | Modified | Added security-audit script |

---

## Notes

- Git history still contains the exposed secrets until cleaned (items 1 & 2)
- Always use environment variables for sensitive data
- Never commit `.env` files (ensure `.gitignore` includes them)
- Run `npm run security-audit` regularly to check for vulnerable dependencies
