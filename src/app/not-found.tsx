"use client"

import Link from 'next/link';
import { Home, ArrowLeft, Briefcase, Mail } from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Home',
      description: 'Back to the main page',
      href: '/',
      icon: Home
    },
    {
      title: 'Work',
      description: 'See what I\'ve built',
      href: '/work',
      icon: Briefcase
    },
    {
      title: 'Contact',
      description: 'Start a conversation',
      href: '/contact',
      icon: Mail
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 select-none">404</h1>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            This page doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
