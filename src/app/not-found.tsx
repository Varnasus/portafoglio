"use client"

import Link from 'next/link';
import { Search, Home, ArrowLeft, FileText, Briefcase, ToolCase } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/schema';

export default function NotFound() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://zvarney.com' },
    { name: 'Page Not Found', url: 'https://zvarney.com/404' }
  ];

  const quickLinks = [
    {
      title: 'Home',
      description: 'Back to the main page',
      href: '/',
      icon: Home
    },
    {
      title: 'Case Studies',
      description: 'View my work and projects',
      href: '/case-studies',
      icon: Briefcase
    },
    // {
    //   title: 'Tools',
    //   description: 'AI product management tools',
    //   href: '/tools',
    //   icon: ToolCase
    // },
    {
      title: 'Blog',
      description: 'Read my latest insights',
      href: '/blog',
      icon: FileText
    }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 select-none">404</h1>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
                          <p className="text-lg text-muted-foreground mb-6">
                Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            
            {/* Search Suggestion */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Looking for something specific?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Try searching my site or check out the popular pages below.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search Site
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary mt-0.5" />
                      <div className="text-left">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Me
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-sm text-muted-foreground">
            <p>
              If you believe this is an error, please{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact me
              </Link>
              {' '}with the URL you were trying to access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
