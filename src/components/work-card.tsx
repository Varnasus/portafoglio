import Link from "next/link"
import type { ProjectMeta } from "@/lib/projects"

export function WorkCard({ project }: { project: ProjectMeta }) {
  return (
    <div className="hover-card p-6 bg-background rounded-xl border">
      <div className="flex flex-col gap-4">
        {/* Tag */}
        <span className="text-xs font-bold tracking-widest uppercase text-primary font-mono">
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold">{project.title}</h3>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>

        {/* Problem / Tradeoffs / Impact */}
        {(project.problem || project.tradeoffs || project.impact) && (
          <div className="space-y-3 pt-2 border-t border-border/50">
            {project.problem && (
              <div>
                <span className="text-xs font-mono text-steel tracking-widest uppercase">Problem</span>
                <p className="text-sm text-muted-foreground mt-1">{project.problem}</p>
              </div>
            )}
            {project.tradeoffs && (
              <div>
                <span className="text-xs font-mono text-steel tracking-widest uppercase">Trade-offs</span>
                <p className="text-sm text-muted-foreground mt-1">{project.tradeoffs}</p>
              </div>
            )}
            {project.impact && (
              <div>
                <span className="text-xs font-mono text-steel tracking-widest uppercase">Impact</span>
                <p className="text-sm text-muted-foreground mt-1">{project.impact}</p>
              </div>
            )}
          </div>
        )}

        {/* Outcomes */}
        <ul className="space-y-2">
          {project.outcomes.map((outcome, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="text-primary mt-1 flex-shrink-0">&bull;</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>

        {/* Links */}
        {(project.github || project.npm) && (
          <div className="flex gap-4 pt-2">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                GitHub &rarr;
              </Link>
            )}
            {project.npm && (
              <Link
                href={project.npm}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                npm &rarr;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
