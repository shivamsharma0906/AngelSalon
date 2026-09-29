import React from 'react';
import { SEO } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { LaurelDivider } from '../components/ui/LaurelDivider';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found (404)"
        description="The page you are looking for does not exist. Return to Angels Salon & Academy home."
        canonicalPath="/404"
      />

      <main id="main-content" className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 bg-ink text-center" data-reveal>
        <Container size="md">
          <LaurelDivider size="lg" className="mb-6" />

          <span className="font-serif text-7xl sm:text-9xl font-bold text-gold tracking-tight block mb-2">
            404
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-4">
            Page Not Found
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-md mx-auto mb-8 font-light leading-relaxed">
            The page you are looking for may have been relocated or is temporarily unavailable. Let us guide you back to our sanctuary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as="a"
              href="/"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
              data-btn-sweep
            >
              Return to Home
            </Button>

            <Button
              as="a"
              href="/services"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
            >
              Explore Salon Services
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default NotFound;
