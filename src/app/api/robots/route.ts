import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow admin and private areas
Disallow: /api/
Disallow: /_next/

# Allow important pages
Allow: /work
Allow: /blog
Allow: /about
Allow: /contact

# Crawl delay (optional)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
