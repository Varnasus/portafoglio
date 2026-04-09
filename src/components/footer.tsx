import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <Container>
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold font-serif mb-1">Ranger Ventures LLC</p>
            <p className="text-xs text-muted-foreground">
              AI development &amp; consulting
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Kansas City, MO &middot; Remote
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-6">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* External links + copyright */}
          <div className="md:text-right">
            <div className="flex md:justify-end gap-4 mb-3">
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} Ranger Ventures LLC
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
