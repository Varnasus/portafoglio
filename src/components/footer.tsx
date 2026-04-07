import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="flex items-center justify-between py-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ranger Ventures LLC
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
