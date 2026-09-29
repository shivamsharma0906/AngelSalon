import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-performance, single-observer scroll reveal hook (< 1 KB)
 * Uses one shared IntersectionObserver across all data-reveal elements.
 * Automatically unobserves elements upon reveal to release memory.
 * Completely respects prefers-reduced-motion and excludes LCP/Hero.
 */
export function useReveal(): void {
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elements to reveal (excluding hero/LCP)
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-reveal]:not(.is-revealed):not([data-no-reveal])'
    );

    if (elements.length === 0) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
}

export default useReveal;
