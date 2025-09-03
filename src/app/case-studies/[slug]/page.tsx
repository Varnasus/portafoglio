import { notFound } from 'next/navigation'
import { allCaseStudies } from 'contentlayer/generated'
import { siteConfig } from '@/lib/site'

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allCaseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const study = allCaseStudies.find((study) => study.slug === params.slug)
  
  if (!study) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${study.title} | ${siteConfig.name}`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      type: 'article',
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = allCaseStudies.find((study) => study.slug === params.slug)

  if (!study) {
    notFound()
  }

  return (
    <article className="py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16">
          <div className="flex items-center gap-x-4 text-xs mb-4">
            <span className="text-muted-foreground">{study.role}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{study.company}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {study.title}
          </h1>
          <p className="text-xl leading-8 text-muted-foreground mb-8">
            {study.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Timeline:</span>
              <span className="ml-2 font-medium">{study.timeline}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Team Size:</span>
              <span className="ml-2 font-medium">{study.teamSize}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Role:</span>
              <span className="ml-2 font-medium">{study.role}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: study.body.html }} />
        </div>
      </div>
    </article>
  )
}
