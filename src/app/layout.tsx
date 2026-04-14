import type { Metadata } from "next";
import { JetBrains_Mono, Libre_Baskerville, Outfit } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PersonSchema, OrganizationSchema, WebSiteSchema } from "@/components/schema";
import { SkipNavigation, AccessibilityProvider } from "@/components/accessibility";
import { TopoBackground } from "@/components/topo-background";
import { siteConfig } from "@/lib/site";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "700"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600"],
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
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
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
    "msapplication-TileColor": "#0F1215",
    "theme-color": "#0F1215",
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
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${libreBaskerville.variable} ${outfit.variable}`}>
      <head>
        <PersonSchema />
        <OrganizationSchema />
        <WebSiteSchema />

        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%cRANGER VENTURES LLC", "color: #C0963A; font-size: 14px; font-weight: bold;");console.log("%c39.0997°N 94.5786°W — You found the trailhead.", "color: #6B7D8D; font-size: 11px;");`,
          }}
        />
      </head>
      <body
        className={`antialiased min-h-screen bg-background font-sans`}
      >
        <TopoBackground />
        <AccessibilityProvider>
          <SkipNavigation />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

        </AccessibilityProvider>
      </body>
    </html>
  );
}
