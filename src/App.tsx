import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { BottomActionBar } from './components/layout/BottomActionBar';
import { SkipToContent } from './components/layout/SkipToContent';
import { RedirectHandler } from './components/routing/RedirectHandler';
import { useReveal } from './hooks/useReveal';

// Code-split top-level pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Academy = lazy(() => import('./pages/Academy'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Contact = lazy(() => import('./pages/Contact'));

const NotFound = lazy(() => import('./pages/NotFound'));

// Code-split shared templates for child routes
const ServiceCategoryPage = lazy(() => import('./pages/templates/ServiceCategoryPage'));
const CourseCategoryPage = lazy(() => import('./pages/templates/CourseCategoryPage'));

/**
 * Luxury page loading fallback
 */
const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-16" aria-live="polite" aria-busy="true">
    <div className="w-9 h-9 rounded-full border-2 border-border border-t-gold animate-spin mb-3"></div>
    <span className="font-serif text-xs tracking-luxury uppercase text-gold">
      Angels Salon & Academy
    </span>
  </div>
);

/**
 * Scroll reveal observer initializer on route changes
 */
const ScrollRevealInit: React.FC = () => {
  useReveal();
  return null;
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* Handles legacy redirects, query migrations, scroll-to-top, and H1 focus */}
        <RedirectHandler />
        <ScrollRevealInit />
        <SkipToContent />

        {/* Global Layout Shell */}
        <div className="min-h-screen min-h-screen-dvh flex flex-col bg-ink text-text overflow-x-hidden">
          <Header />

          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* 1. Top-Level Parent Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/style-gallery" element={<Gallery />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />

                {/* 2. Services Child Pages (6 Dedicated Routes via Template) */}
                <Route path="/services/:slug" element={<ServiceCategoryPage />} />

                {/* 3. Academy Child Pages (2 Dedicated Routes via Template) */}
                <Route path="/academy/:slug" element={<CourseCategoryPage />} />

                {/* 5. Custom 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>

          <Footer />
          <FloatingWhatsApp />
          <BottomActionBar />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
