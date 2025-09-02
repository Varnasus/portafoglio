import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';

export async function GET(request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml

# Disallow admin and private areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow important pages
Allow: /about
Allow: /resume
Allow: /case-studies
Allow: /blog
Allow: /tools
Allow: /timeline
Allow: /faq
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
