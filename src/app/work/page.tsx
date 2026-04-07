import { Container } from "@/components/ui/container"
import { WorkCard } from "@/components/work-card"
import { projects } from "@/lib/projects"

export const metadata = {
  title: "Work",
  description: "Client systems, personal infrastructure, and open source. Each project is real \u2014 running in production or published for others to use.",
}

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order)

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Selected Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            What I&apos;ve built.
          </h1>
          <p className="text-xl leading-8 text-muted-foreground mb-12 max-w-2xl">
            Client systems, personal infrastructure, and open source. Each project
            is real &mdash; running in production or published for others to use.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {sorted.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
