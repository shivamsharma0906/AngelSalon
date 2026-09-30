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

    let observer: IntersectionObserver | null = null;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '180px 0px 80px 0px',
        }
      );
    }

    const observeElements = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        '[data-reveal]:not(.is-revealed):not([data-no-reveal])'
      );

      if (elements.length === 0) return;

      if (prefersReducedMotion || !observer) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
      }

      const viewportHeight = window.innerHeight || 800;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal elements already near or inside the initial viewport
        if (rect.top <= viewportHeight + 150) {
          el.classList.add('is-revealed');
        } else {
          observer!.observe(el);
        }
      });
    };

    // Initial pass
    observeElements();

    // Watch for new DOM nodes added by Suspense/lazy routes
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);
}

export default useReveal;
