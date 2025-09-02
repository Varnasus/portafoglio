import { Container } from "@/components/ui/container"
import { PersonSchema } from "@/components/schema"
import { TimelineSlideshow, TimelineEvent } from "@/components/ui/timeline"

export const metadata = {
  title: "Career Timeline - Zach Varney",
  description: "Chronological career progression of Zach Varney, AI Technical Product Manager, from early career to present day achievements in AI product development.",
}

const timelineData: TimelineEvent[] = [
  {
    id: "current",
    date: "2023 - Present",
    title: "AI Technical Product Manager",
    company: "Independent Consultant",
    location: "San Francisco, CA",
    description: "Leading AI product development for multiple clients, specializing in LLM applications, agentic workflows, and production-ready AI systems.",
    achievements: [
      "Led AI summarization platform (Insights Corp) achieving 38% faster review cycles, <$0.02 per document, and 99.2% SOC-2 compliance",
      "Implemented brand compliance AI system (Compliance Solutions Inc) with 85% accuracy, 10x faster review process, and 95% reduction in manual review time",
      "Built multi-agent Slack integration system (Workflow Automation Co) achieving 40% ticket auto-resolution, 2.3x faster first response times, and 24/7 automated support",
      "Established comprehensive evaluation frameworks measuring real-world performance with 85%+ user satisfaction scores across all products"
    ],
    metrics: {
      "Efficiency Improvement": "38-85%",
      "Cost per Document": "<$0.02",
      "Auto-Resolution Rate": "40%",
      "User Satisfaction": "85%+"
    },
    category: "career",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=face",
    altText: "AI Product Manager working on product strategy",
    isCurrent: true
  },
  {
    id: "senior-pm",
    date: "2021 - 2023",
    title: "Senior Product Manager, AI Platform",
    company: "Tech Company",
    location: "San Francisco, CA",
    description: "Led cross-functional team of 7 engineers and designers in developing AI-powered platform features with focus on scalable architecture and cost optimization.",
    achievements: [
      "Managed team of 7 engineers and designers across multiple AI product initiatives",
      "Shipped 3 major AI features with measurable business impact and 60%+ efficiency improvements",
      "Reduced customer support tickets by 60% through intelligent automation and multi-agent workflows",
      "Implemented comprehensive testing and monitoring systems with 99.5% uptime and sub-2-second latency"
    ],
    metrics: {
      "Team Size": "7 people",
      "Features Shipped": "3 major",
      "Support Reduction": "60%",
      "System Uptime": "99.5%"
    },
    category: "career",
    icon: "👥",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=face",
    altText: "Team collaboration in product development",
    isCurrent: true
  },
  {
    id: "pm-startup",
    date: "2020 - 2021",
    title: "Product Manager",
    company: "AI Startup",
    location: "San Francisco, CA",
    description: "Early-stage product management role focusing on AI product strategy, go-to-market, and scaling from prototype to production.",
    achievements: [
      "Developed product strategy for AI-powered workflow automation resulting in 500% user growth",
      "Led go-to-market efforts and established product-market fit with 40% month-over-month growth",
      "Established product metrics and evaluation frameworks that scaled with business growth",
      "Collaborated with engineering team on technical architecture decisions for scalable AI infrastructure"
    ],
    metrics: {
      "User Growth": "500%",
      "Monthly Growth": "40%",
      "User Base": "10,000+",
      "Satisfaction Score": "85%"
    },
    category: "career",
    icon: "🚀",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=face",
    altText: "Startup product strategy and growth"
  },
  {
    id: "associate-pm",
    date: "2019 - 2020",
    title: "Associate Product Manager",
    company: "Technology Company",
    location: "San Francisco, CA",
    description: "Entry-level product management role learning fundamentals of product development and user research.",
    achievements: [
      "Conducted user research and market analysis",
      "Assisted in product roadmap planning and prioritization",
      "Collaborated with design and engineering teams",
      "Analyzed product metrics and user feedback"
    ],
    metrics: {
      "User Research Sessions": "50+",
      "Features Launched": "5",
      "User Satisfaction": "4.2/5",
      "Market Research": "10+ reports"
    },
    category: "career",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=face",
    altText: "Product research and analysis"
  },
  {
    id: "education",
    date: "2016 - 2020",
    title: "Bachelor's Degree",
    company: "University Name",
    location: "California",
    description: "Studied Computer Science with focus on AI/ML fundamentals and product management principles.",
    achievements: [
      "Completed coursework in AI/ML fundamentals",
      "Studied product management and business strategy",
      "Participated in hackathons and coding competitions",
      "Completed internships in technology companies"
    ],
    metrics: {
      "GPA": "3.8/4.0",
      "Relevant Courses": "15+",
      "Projects Completed": "20+",
      "Internships": "3"
    },
    category: "education",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=400&fit=crop&crop=face",
    altText: "University education and learning"
  },
  {
    id: "first-project",
    date: "2018",
    title: "First AI Project",
    company: "University Project",
    location: "California",
    description: "Built a machine learning model for sentiment analysis as part of a university capstone project.",
    achievements: [
      "Developed NLP model achieving 87% accuracy on sentiment classification",
      "Implemented real-time API for text analysis",
      "Presented findings at university research symposium",
      "Received Dean's List recognition for project excellence"
    ],
    metrics: {
      "Model Accuracy": "87%",
      "API Response Time": "<200ms",
      "Dataset Size": "50K+ samples",
      "Project Grade": "A+"
    },
    category: "project",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop&crop=face",
    altText: "AI and machine learning project development"
  },
  {
    id: "hackathon-win",
    date: "2019",
    title: "Hackathon Winner",
    company: "Tech Competition",
    location: "San Francisco, CA",
    description: "Won first place in a 48-hour hackathon by building an AI-powered productivity tool.",
    achievements: [
      "Built AI task prioritization system in 48 hours",
      "Achieved 92% user satisfaction in live demo",
      "Received $10,000 prize and mentorship opportunities",
      "Featured in local tech publication"
    ],
    metrics: {
      "Build Time": "48 hours",
      "User Satisfaction": "92%",
      "Prize Money": "$10,000",
      "Team Size": "3 people"
    },
    category: "achievement",
    icon: "🏆",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&crop=face",
    altText: "Hackathon competition and innovation"
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
                <div className="text-2xl font-bold text-blue-500">5+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">3</div>
                <div className="text-gray-300 text-sm">Major AI Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">85%</div>
                <div className="text-gray-300 text-sm">User Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">40%</div>
                <div className="text-gray-300 text-sm">Auto-Resolution</div>
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
              Zach Varney&apos;s experience shows a proven track record of building AI products that deliver real business value.
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