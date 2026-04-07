import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site';

export async function GET() {
  const baseUrl = siteConfig.url;

  const pages = [
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/work', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
  .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
