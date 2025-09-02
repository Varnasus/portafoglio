import Link from "next/link"
import { siteConfig } from "@/lib/site"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <Link href="/" className="font-medium underline underline-offset-4 flex items-center gap-1">
                {/* <Image
                  src="/favicon.ico"
                  alt="Zach Varney Logo"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                /> */}
                Zach Varney
              </Link>
              . The source code is available on{" "}
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
} 