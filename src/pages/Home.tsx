import React from 'react';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { homeData } from '../data/home';
import { Hero } from '../components/sections/Hero';
import { HorizontalBookingBar } from '../components/sections/HorizontalBookingBar';
import { Container } from '../components/ui/Container';
import { PathCards } from '../components/sections/PathCards';
import { OurWork } from '../components/sections/OurWork';
import { WelcomeToAngels } from '../components/sections/WelcomeToAngels';
import { OurServicesTiles } from '../components/sections/OurServicesTiles';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { AcademyTeaser } from '../components/sections/AcademyTeaser';
import { VideoSection } from '../components/sections/VideoSection';
import { GoogleReviews } from '../components/sections/GoogleReviews';
import { VisitAngels } from '../components/sections/VisitAngels';
import { FinalCTA } from '../components/sections/FinalCTA';

export const Home: React.FC = () => {
  const localBusinessSchema = generateLocalBusinessSchema();

  // If video is unverified or has no genuine URL, it renders null
  const isVideoVisible = Boolean(homeData.video.verified && homeData.video.youtubeId);

  return (
    <>
      <SEO
        title="Angels Salon & Academy | Hair Salon in Ghatkopar East"
        description="Premier hair salon & beauty academy in Ghatkopar East, Mumbai. Expert hair styling, balayage, smoothening & facials. Rated 4.7 on Google. Book on WhatsApp."
        canonicalPath="/"
        schemaData={localBusinessSchema}
      />

      {/* Scoped hero image preload only on Home page */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-carousel/slide1_desktop_1920.webp"
        type="image/webp"
      />

      <main id="main-content">
        {/* 1. Hero with crossfade slideshow */}
        <Hero />

        {/* 2. Dedicated Appointment Reservation Console */}
        <section id="reserve" className="py-8 sm:py-10 bg-background border-b border-border" aria-label="Reserve an Appointment">
          <Container size="lg">
            <HorizontalBookingBar />
          </Container>
        </section>

        {/* 3. Path cards (ink) */}
        <PathCards />

        {/* 4. Our Work (surface) */}
        <OurWork />

        {/* 5. Welcome to Angels (ink) */}
        <WelcomeToAngels />

        {/* 6. Our Services (surface) */}
        <OurServicesTiles />

        {/* 7. Why clients choose Angels (ink) */}
        <WhyChooseUs />

        {/* 8. Academy teaser (surface) */}
        <AcademyTeaser />

        {/* 9. Video (ink) - click-to-load facade, hides when unverified */}
        {isVideoVisible && <VideoSection />}

        {/* 10. Reviews (alternating tone: ink when video is hidden so adjacent sections never share a tone) */}
        <GoogleReviews
          mode="carousel"
          limit={4}
          tone={isVideoVisible ? 'surface' : 'ink'}
        />

        {/* 11. Visit Angels (alternating tone: surface when video is hidden) */}
        <VisitAngels tone={isVideoVisible ? 'ink' : 'surface'} />

        {/* 12. Final CTA (dark banner with gold accents) */}
        <FinalCTA />
      </main>
    </>
  );
};

export default Home;
