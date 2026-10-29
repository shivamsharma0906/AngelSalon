import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Handles legacy URL redirects, query parameter migrations,
 * and accessibility focus management (moving focus to the H1 heading on route changes).
 */
export const RedirectHandler: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Redirect legacy /gallery or /style-gallery to /services
    if (
      pathname === '/gallery' ||
      pathname.startsWith('/gallery/') ||
      pathname === '/style-gallery' ||
      pathname.startsWith('/style-gallery/')
    ) {
      navigate('/services', { replace: true });
      return;
    }

    // 3. Hash migrations: /services#womens-hair-colour -> /services/womens-hair-colour
    if (pathname === '/services' && hash) {
      const cleanHash = hash.replace('#', '');
      const validSlugs = [
        'womens-haircut-and-style',
        'womens-hair-colour',
        'mens-services',
        'hair-extensions',
        'hair-treatments',
        'bridal-makeup',
        'skin-care',
        'nails',
      ];
      if (validSlugs.includes(cleanHash)) {
        navigate(`/services/${cleanHash}`, { replace: true });
        return;
      }
    }

    // 4. Scroll to top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    // 5. Accessibility focus management: move focus to the page H1
    const timer = setTimeout(() => {
      const h1 = document.querySelector('h1') as HTMLElement | null;
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.style.outline = 'none';
        h1.focus({ preventScroll: true });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, search, hash, navigate]);

  return null;
};

export default RedirectHandler;
