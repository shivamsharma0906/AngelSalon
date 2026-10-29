/**
 * Server-Side Rendering (SSR) entry point for build-time prerendering.
 *
 * This module is used ONLY by scripts/prerender.mjs during `vite build`.
 * It is NOT bundled into the client-side output.
 *
 * It renders the React app to a static HTML string for a given URL path,
 * using StaticRouter instead of BrowserRouter (which requires a DOM).
 */
import React, { Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { BottomActionBar } from './components/layout/BottomActionBar';
import { SkipToContent } from './components/layout/SkipToContent';
import { Routes, Route } from 'react-router-dom';

// Eagerly import all pages for SSR (no lazy() — renderToString doesn't support Suspense streaming)
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Academy from './pages/Academy';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import ServiceCategoryPage from './pages/templates/ServiceCategoryPage';
import CourseCategoryPage from './pages/templates/CourseCategoryPage';

/** Minimal no-op fallback for SSR Suspense boundaries */
const SSRFallback: React.FC = () => null;

/**
 * Renders the full app to an HTML string for a given URL path.
 * Returns both the HTML string and the helmet context (for <head> injection).
 */
export function render(url: string): { html: string; helmetContext: { helmet?: HelmetServerState } } {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <SkipToContent />
        <div className="min-h-screen flex flex-col bg-background text-text overflow-x-hidden">
          <Header />
          <div className="flex-1">
            <Suspense fallback={<SSRFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/services/:slug" element={<ServiceCategoryPage />} />
                <Route path="/academy/:slug" element={<CourseCategoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <FloatingWhatsApp />
          <BottomActionBar />
        </div>
      </StaticRouter>
    </HelmetProvider>
  );

  return { html, helmetContext };
}

