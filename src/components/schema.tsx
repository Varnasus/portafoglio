export function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zach Varney",
    "jobTitle": "AI Consultant & Developer",
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
      "AI Consulting",
      "LLM Applications",
      "Middleware & Integrations",
      "AI Product Architecture",
      "Python",
      "TypeScript",
      "FastAPI",
      "Next.js"
    ],
    "description": "AI consultant and developer building production systems for B2B SaaS companies. Middleware, integrations, and intelligent workflows.",
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
    "description": "AI consulting & development for B2B SaaS. Middleware, integrations, and intelligent workflows.",
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
    "description": "AI consulting & development for B2B SaaS companies.",
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
