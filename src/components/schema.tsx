export function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zach Varney",
    "jobTitle": "AI Developer & Founder",
    "url": "https://zvarney.com",
    "sameAs": [
      "https://www.linkedin.com/in/zach-varney/",
      "https://github.com/Varnasus"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Ranger Ventures LLC"
    },
    "knowsAbout": [
      "AI Development",
      "AI Contracting",
      "LLM Applications",
      "Middleware & Integrations",
      "Open Source",
      "NPM Packages",
      "Python",
      "TypeScript",
      "FastAPI",
      "Next.js"
    ],
    "description": "AI developer and founder building production systems and shipping code. Contracting, consulting, and hands-on development for B2B SaaS companies.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kansas City",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "email": "z.varney.business@gmail.com",
    "image": "https://zvarney.com/og-image.jpg"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ranger Ventures LLC",
    "url": "https://zvarney.com",
    "logo": "https://zvarney.com/logo.png",
    "description": "AI development and contracting practice. Building production systems, middleware, integrations, and open-source tools for B2B SaaS companies.",
    "sameAs": [
      "https://www.linkedin.com/in/zach-varney/",
      "https://github.com/Varnasus"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "z.varney.business@gmail.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kansas City",
      "addressRegion": "MO",
      "addressCountry": "US"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

export function WebSiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ranger Ventures LLC",
    "url": "https://zvarney.com",
    "description": "Portfolio and consulting storefront for Zach Varney — AI builder, developer, and founder of Ranger Ventures LLC.",
    "publisher": {
      "@type": "Person",
      "name": "Zach Varney"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}
