import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PersonSchema, OrganizationSchema, WebSiteSchema } from "@/components/schema";
import { SkipNavigation, AccessibilityProvider } from "@/components/accessibility";
import { siteConfig } from "@/lib/site";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI Development",
    "AI Contracting",
    "AI Builder",
    "Code Shipping",
    "NPM Packages",
    "Open Source",
    "LLM Applications",
    "AI Middleware",
    "B2B SaaS",
    "Zach Varney",
    "Ranger Ventures",
    "AI Integrations",
    "Production AI Systems",
    "FastAPI",
    "Python",
    "TypeScript",
  ],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "msapplication-TileColor": "#2d5a27",
    "theme-color": "#2d5a27",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": siteConfig.name,
    "application-name": siteConfig.name,
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable}`}>
      <head>
        <PersonSchema />
        <OrganizationSchema />
        <WebSiteSchema />

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`antialiased min-h-screen bg-background font-sans`}
      >
        <AccessibilityProvider>
          <SkipNavigation />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          {/* Forest green glow effect at bottom */}
          <div
            className="fixed bottom-0 left-0 right-0 h-10 pointer-events-none z-40"
            style={{
              background: 'linear-gradient(to top, rgba(45, 90, 39, 0.8) 0%, rgba(45, 90, 39, 0.4) 40%, rgba(45, 90, 39, 0.1) 70%, transparent 100%)',
              boxShadow: '0 0 20px rgba(45, 90, 39, 0.6), 0 0 40px rgba(45, 90, 39, 0.3), 0 0 60px rgba(45, 90, 39, 0.1)'
            }}
          />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
