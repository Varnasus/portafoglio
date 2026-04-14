"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import type { ProjectMeta } from "@/lib/projects"

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <span className="text-xs font-mono text-primary tracking-widest uppercase">
        {label}
      </span>
      <p className="text-sm leading-7 text-muted-foreground mt-1.5">{body}</p>
    </div>
  )
}

export function WorkCard({ project }: { project: ProjectMeta }) {
  const hasBody = Boolean(
    project.cleverness ||
      project.speedStory ||
      project.tradeoff ||
      project.soWhat
  )
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="hover-card mb-6 p-6 md:p-7 bg-background rounded-xl border break-inside-avoid">
      <div className="flex flex-col gap-4">
        {/* Card label */}
        <span className="text-xs font-bold tracking-widest uppercase text-primary font-mono">
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold font-serif tracking-tight">
          {project.title}
        </h3>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs rounded-full bg-muted text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* The Hook */}
        <p className="text-sm md:text-base leading-7 text-foreground/90">
          {project.hook}
        </p>

        {/* Expandable body */}
        {hasBody && expanded && (
          <div className="space-y-5 pt-4 border-t border-border/50">
            {project.cleverness && (
              <Section label="The Cleverness" body={project.cleverness} />
            )}
            {project.speedStory && (
              <Section label="The Speed Story" body={project.speedStory} />
            )}
            {project.tradeoff && (
              <Section label="The Trade-off" body={project.tradeoff} />
            )}
            {project.soWhat && (
              <Section label="The So-What" body={project.soWhat} />
            )}
          </div>
        )}

        {/* Expand/collapse toggle */}
        {hasBody && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-1 inline-flex items-center gap-1.5 self-start text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <span>{expanded ? "Collapse" : "Read more"}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>
        )}

        {/* Links */}
        {(project.github || project.npm || project.url) && (
          <div className="flex flex-wrap gap-5 pt-2">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:text-foreground transition-colors"
              >
                Live &rarr;
              </Link>
            )}
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
