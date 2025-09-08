import { Container } from "@/components/ui/container"
import { PersonSchema } from "@/components/schema"
import { TimelineSlideshow, TimelineEvent } from "@/components/ui/timeline"

export const metadata = {
  title: "Career Timeline - Zach Varney",
  description: "Chronological career progression of Zach Varney, AI Technical Product Manager, from early career to present day achievements in AI product development.",
}

const timelineData: TimelineEvent[] = [
  {
    id: "lytho-current",
    date: "2024 - Present",
    title: "AI Technical Product Manager",
    company: "Lytho",
    location: "Remote",
    description: "Leading AI-first product strategy and execution, driving innovation in brand compliance and workflow automation.",
    achievements: [
      "Took over a 'trouble team', restructuring them to deliver scalable API framework and Slack/Teams integrations",
      "Drove Lytho's AI-first pivot, shipping Insights (summarization, analysis, diagrams) and Compliance (brand-guideline enforcement)",
      "Designed guideline intake flows enabling client-specific customization of AI agents",
      "Originated Project Horizon, unifying DivvyHQ workflows into Lytho's ecosystem post-acquisition",
      "Co-launched Project Beacon, an innovation track for rapid AI prototyping and feedback loops"
    ],
    metrics: {
      "Team Restructure": "100% success",
      "AI Products Shipped": "2 major",
      "Integration Success": "Slack + Teams",
      "Innovation Projects": "2 active"
    },
    category: "career",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=face",
    altText: "AI Technical Product Manager at Lytho",
    isCurrent: true
  },
  {
    id: "divvy-director",
    date: "2021 - 2024",
    title: "Director of Product",
    company: "DivvyHQ",
    location: "Kansas City, MO",
    description: "Advanced from developer to Director of Product, owning end-to-end product strategy and leading global development teams.",
    achievements: [
      "Advanced from developer to Director of Product, owning end-to-end product strategy",
      "Introduced data-driven culture through analytics (Pendo) and structured planning",
      "Led global dev teams (Philippines, Argentina), fostering high-trust, high-output collaboration",
      "Shipped bulk reassignment tools adopted by 88% of all accounts, 100% of enterprise clients",
      "Balanced feature velocity with minimal bugs and strong technical debt management"
    ],
    metrics: {
      "Tool Adoption": "88% accounts",
      "Enterprise Adoption": "100%",
      "Global Teams": "2 countries",
      "Career Growth": "Developer → Director"
    },
    category: "career",
    icon: "👥",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=face",
    altText: "Director of Product at DivvyHQ"
  },
  {
    id: "divvy-tpm",
    date: "2019 - 2021",
    title: "Technical Project Manager",
    company: "DivvyHQ",
    location: "Kansas City, MO",
    description: "Oversaw delivery of cross-functional projects, introducing structured API and integration planning while bridging engineering and stakeholders.",
    achievements: [
      "Oversaw delivery of cross-functional projects, introducing structured API and integration planning",
      "Acted as bridge between engineering, stakeholders, and clients, establishing trusted operator status",
      "Managed complex technical integrations and API development",
      "Established project management frameworks that scaled with company growth"
    ],
    metrics: {
      "Cross-functional Projects": "10+",
      "API Integrations": "5+",
      "Stakeholder Satisfaction": "95%",
      "Project Success Rate": "100%"
    },
    category: "career",
    icon: "⚙️",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=face",
    altText: "Technical Project Manager at DivvyHQ"
  },
  {
    id: "divvy-developer",
    date: "2018 - 2019",
    title: "Developer",
    company: "DivvyHQ",
    location: "Kansas City, MO",
    description: "Delivered key frontend/backend features and stabilized platform performance, gaining deep experience in SaaS development.",
    achievements: [
      "Delivered key frontend/backend features and stabilized platform performance",
      "Gained deep experience in SaaS development, preparing for transition into product leadership",
      "Built scalable features supporting company growth",
      "Established technical foundation for future product management role"
    ],
    metrics: {
      "Features Delivered": "15+",
      "Performance Improvement": "40%",
      "Platform Stability": "99.9%",
      "SaaS Experience": "2 years"
    },
    category: "career",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=face",
    altText: "Developer at DivvyHQ"
  },
  {
    id: "eyeverify",
    date: "2016 - 2017",
    title: "Software Developer",
    company: "EyeVerify (later Zoloz, acquired by Ant Financial)",
    location: "Kansas City, MO",
    description: "Began as an intern while enrolled full-time in college, hired full-time after 3 months. Built mobile demo applications and worked on biometric applications.",
    achievements: [
      "Began as an intern while enrolled full-time in college and CS50 at UMKC, hired full-time after 3 months",
      "Built mobile demo applications showcased at FinTech, Copenhagen Tech Festival, and other industry events",
      "Worked with the R&D team on biometric applications across mobile device sensors",
      "Participated in multiple trips to China during Ant Financial's acquisition, bridging product/technical knowledge across global teams"
    ],
    metrics: {
      "Internship to Full-time": "3 months",
      "Demo Applications": "5+",
      "Industry Events": "3+",
      "Global Collaboration": "China trips"
    },
    category: "career",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&crop=face",
    altText: "Software Developer at EyeVerify"
  },
  {
    id: "truhome",
    date: "2012 - 2015",
    title: "Mortgage Loan Originator",
    company: "TruHome Solutions",
    location: "Kansas City, MO",
    description: "Consistently ranked among the Top 5 company-wide producers while building strong client relationships and learning foundational business skills.",
    achievements: [
      "Consistently ranked among the Top 5 company-wide producers (2012–2014)",
      "Maintained high loan volume while building strong client relationships",
      "Learned sales discipline, pipeline management, and client-first mentality",
      "Developed foundational skills that shaped later product and leadership roles"
    ],
    metrics: {
      "Company Ranking": "Top 5",
      "Years Top Producer": "3 years",
      "Client Relationships": "Strong",
      "Skill Foundation": "Sales + Management"
    },
    category: "career",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop&crop=face",
    altText: "Mortgage Loan Originator at TruHome Solutions"
  }
]

export default function TimelinePage() {
  return (
    <>
      <PersonSchema 
        pageType="timeline"
        additionalData={{
          "hasOccupation": {
            "@type": "Occupation",
            "name": "AI Technical Product Manager",
            "description": "Product manager specializing in AI and LLM applications"
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Career Timeline
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Zach Varney&apos;s professional journey from early career to becoming an AI Technical Product Manager.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Navigate through each milestone using the controls below or keyboard arrows.
            </p>
          </div>
        </Container>
      </section>

            {/* Timeline Slideshow */}
      <TimelineSlideshow events={timelineData} />

      {/* Summary Stats */}
      <section className="py-12 bg-black">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">Career Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">12+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">88%</div>
                <div className="text-gray-300 text-sm">Tool Adoption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">100%</div>
                <div className="text-gray-300 text-sm">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">Top 5</div>
                <div className="text-gray-300 text-sm">Company Producer</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 bg-black">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Ready to build the future?
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-300">
              From mortgage sales to AI product leadership, Zach Varney&apos;s career demonstrates a unique journey of building products that solve real business problems.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4">
              <a
                href="/contact"
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                Start a Project
              </a>
              <a
                href="/case-studies"
                className="rounded-md border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
} 