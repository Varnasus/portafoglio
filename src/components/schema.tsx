interface PersonSchemaProps {
  pageType?: "home" | "about" | "contact" | "blog" | "case-study" | "resume" | "timeline" | "faq" | "tools"
  additionalData?: Record<string, unknown>
}

export function PersonSchema({ additionalData = {} }: PersonSchemaProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zach Varney",
    "jobTitle": "AI Technical Product Manager",
    "url": "https://zvarney.com",
    "sameAs": [
      "https://twitter.com/zvarney",
      "https://www.linkedin.com/in/zach-varney/",
      "https://github.com/zvarney"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Independent Consultant"
    },
    "knowsAbout": [
      "AI Product Management",
      "LLM Applications",
      "Agentic Workflows",
      "Product Discovery",
      "Evaluation Frameworks",
      "Technical Strategy",
      "Team Leadership"
    ],
    "description": "AI Technical Product Manager with 5+ years building LLM-powered products. Expert in agentic workflows, evaluation frameworks, and shipping AI products that actually work.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "email": "z.varney.business@gmail.com",
    "image": "https://zvarney.com/og-image.jpg",
    "alumniOf": {
      "@type": "Organization",
      "name": "University of California, Berkeley"
    },
    "hasCredential": [
      "Bachelor of Science in Computer Science",
      "AI Product Management Certification"
    ],
    ...additionalData
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}

interface OrganizationSchemaProps {
  additionalData?: Record<string, unknown>
}

export function OrganizationSchema({ additionalData = {} }: OrganizationSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zach Varney Portfolio",
    "url": "https://zvarney.com",
    "logo": "https://zvarney.com/logo.png",
    "description": "AI Technical Product Manager portfolio showcasing LLM applications, case studies, and tools for AI product development.",
    "sameAs": [
      "https://twitter.com/zvarney",
      "https://www.linkedin.com/in/zach-varney/",
      "https://github.com/zvarney"
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
    },
    ...additionalData
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

interface WebSiteSchemaProps {
  additionalData?: Record<string, unknown>
}

export function WebSiteSchema({ additionalData = {} }: WebSiteSchemaProps) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zach Varney Portfolio",
    "url": "https://zvarney.com",
    "description": "AI Technical Product Manager portfolio with case studies, tools, and insights on LLM applications.",
    "publisher": {
      "@type": "Person",
      "name": "Zach Varney"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zvarney.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    ...additionalData
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

interface BlogPostingSchemaProps {
  title: string
  description: string
  date: string
  url: string
  author?: string
  tags?: string[]
  image?: string
  readingTime?: string
}

export function BlogPostingSchema({ 
  title, 
  description, 
  date, 
  url, 
  author = "Zach Varney",
  tags = [],
  image,
  readingTime
}: BlogPostingSchemaProps) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://zvarney.com"
    },
    "datePublished": date,
    "dateModified": date,
    "publisher": {
      "@type": "Organization",
      "name": "Zach Varney",
      "url": "https://zvarney.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zvarney.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": tags.join(", "),
    "url": url,
    "image": image ? {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    } : undefined,
    "wordCount": description.split(' ').length,
    "timeRequired": readingTime,
    "articleSection": tags[0] || "AI Product Management"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  date: string
  url: string
  author?: string
  tags?: string[]
  image?: string
}

export function ArticleSchema({ 
  title, 
  description, 
  date, 
  url, 
  author = "Zach Varney",
  tags = [],
  image
}: ArticleSchemaProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://zvarney.com"
    },
    "datePublished": date,
    "dateModified": date,
    "publisher": {
      "@type": "Organization",
      "name": "Zach Varney",
      "url": "https://zvarney.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zvarney.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": tags.join(", "),
    "url": url,
    "image": image ? {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    } : undefined,
    "articleSection": tags[0] || "Case Study"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

interface SoftwareApplicationSchemaProps {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem?: string
  downloadUrl?: string
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = "Web Browser",
  downloadUrl
}: SoftwareApplicationSchemaProps) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "author": {
      "@type": "Person",
      "name": "Zach Varney",
      "url": "https://zvarney.com"
    },
    "downloadUrl": downloadUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  )
} 