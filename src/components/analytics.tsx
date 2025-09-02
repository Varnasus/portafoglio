'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Plausible Analytics integration
export function PlausibleAnalytics() {
  useEffect(() => {
    // Load Plausible Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.setAttribute('data-domain', 'zvarney.com');
    script.src = 'https://plausible.io/js/script.js';
    
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

// Custom event tracking hook
export function useAnalytics() {
  const pathname = usePathname();

  const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).plausible) {
      ((window as unknown as Record<string, unknown>).plausible as (eventName: string, options: { props?: Record<string, unknown> }) => void)(eventName, { props });
    }
    
    // Fallback console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, props);
    }
  };

  const trackPageView = () => {
    trackEvent('pageview', { path: pathname });
  };

  const trackToolUsage = (toolName: string, action: string) => {
    trackEvent('tool_usage', {
      tool: toolName,
      action,
      path: pathname
    });
  };

  const trackCaseStudyEngagement = (caseStudyTitle: string, action: string) => {
    trackEvent('case_study_engagement', {
      title: caseStudyTitle,
      action,
      path: pathname
    });
  };

  const trackContactSubmission = (formType: string) => {
    trackEvent('contact_submission', {
      form_type: formType,
      path: pathname
    });
  };

  const trackFileDownload = (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      path: pathname
    });
  };

  const trackSocialShare = (platform: string, content: string) => {
    trackEvent('social_share', {
      platform,
      content,
      path: pathname
    });
  };

  const trackSearch = (query: string, results: number) => {
    trackEvent('search', {
      query,
      results_count: results,
      path: pathname
    });
  };

  const trackNewsletterSignup = (source: string) => {
    trackEvent('newsletter_signup', {
      source,
      path: pathname
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackToolUsage,
    trackCaseStudyEngagement,
    trackContactSubmission,
    trackFileDownload,
    trackSocialShare,
    trackSearch,
    trackNewsletterSignup
  };
}

// Analytics provider component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return <>{children}</>;
}

// Error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).plausible) {
    ((window as unknown as Record<string, unknown>).plausible as (eventName: string, options: { props?: Record<string, unknown> }) => void)('error', {
      props: {
        message: error.message,
        stack: error.stack,
        ...context
      }
    });
  }
  
  // Fallback console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error tracked:', error, context);
  }
}

// Performance tracking
export function trackPerformance(metric: string, value: number) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).plausible) {
    ((window as unknown as Record<string, unknown>).plausible as (eventName: string, options: { props?: Record<string, unknown> }) => void)('performance', {
      props: {
        metric,
        value,
        path: window.location.pathname
      }
    });
  }
}
