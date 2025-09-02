'use client';

import { useEffect, useRef } from 'react';
import { SkipForward } from 'lucide-react';
import { useState } from 'react';

// Skip Navigation Component
export function SkipNavigation() {
  const mainRef = useRef<HTMLElement>(null);

  const handleSkip = () => {
    if (mainRef.current) {
      mainRef.current.focus();
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        onClick={handleSkip}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg"
        aria-label="Skip to main content"
      >
        <SkipForward className="w-4 h-4 mr-2" />
        Skip to main content
      </button>
      <main ref={mainRef} tabIndex={-1} />
    </>
  );
}

// Focus Management Hook
export function useFocusManagement() {
  const focusableElements = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  const trapFocus = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    return () => element.removeEventListener('keydown', handleTabKey);
  };

  const focusFirstElement = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  };

  return { trapFocus, focusFirstElement };
}

// Live Region for Screen Readers
export function LiveRegion({ 
  message, 
  role = 'status', 
  'aria-live': ariaLive = 'polite' 
}: {
  message: string;
  role?: 'status' | 'alert' | 'log';
  'aria-live'?: 'polite' | 'assertive' | 'off';
}) {
  return (
    <div
      role={role}
      aria-live={ariaLive}
      className="sr-only"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

// Keyboard Navigation Hook
export function useKeyboardNavigation() {
  const handleKeyDown = (event: KeyboardEvent, handlers: Record<string, () => void>) => {
    const handler = handlers[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return { handleKeyDown };
}

// ARIA Utilities
export const ariaUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Set up ARIA describedby relationship
  setupDescribedBy: (element: HTMLElement, descriptionId: string) => {
    element.setAttribute('aria-describedby', descriptionId);
  },

  // Set up ARIA labelledby relationship
  setupLabelledBy: (element: HTMLElement, labelId: string) => {
    element.setAttribute('aria-labelledby', labelId);
  },

  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// High Contrast Mode Detection
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
}

// Reduced Motion Detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Accessibility Provider Component
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const isHighContrast = useHighContrastMode();

  useEffect(() => {
    // Apply accessibility preferences to document
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--reduced-motion', 'reduce');
    } else {
      document.documentElement.style.setProperty('--reduced-motion', 'no-preference');
    }

    if (isHighContrast) {
      document.documentElement.style.setProperty('--high-contrast', 'high');
    } else {
      document.documentElement.style.setProperty('--high-contrast', 'normal');
    }
  }, [prefersReducedMotion, isHighContrast]);

  return <>{children}</>;
}
