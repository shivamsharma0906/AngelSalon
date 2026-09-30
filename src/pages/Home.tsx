import React from 'react';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { homeData } from '../data/home';
import { Hero } from '../components/sections/Hero';
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

      <main id="main-content">
        {/* 1. Hero + booking bar (photo overlay) */}
        <Hero />

        {/* 2. Path cards (ink) */}
        <PathCards />

        {/* 3. Our Work (surface) */}
        <OurWork />

        {/* 4. Welcome to Angels (ink) */}
        <WelcomeToAngels />

        {/* 5. Our Services (surface) */}
        <OurServicesTiles />

        {/* 6. Why clients choose Angels (ink) */}
        <WhyChooseUs />

        {/* 7. Academy teaser (surface) */}
        <AcademyTeaser />

        {/* 8. Video (ink) - click-to-load facade, hides when unverified */}
        {isVideoVisible && <VideoSection />}

        {/* 9. Reviews (alternating tone: ink when video is hidden so adjacent sections never share a tone) */}
        <GoogleReviews
          mode="carousel"
          limit={4}
          tone={isVideoVisible ? 'surface' : 'ink'}
        />

        {/* 10. Visit Angels (alternating tone: surface when video is hidden) */}
        <VisitAngels tone={isVideoVisible ? 'ink' : 'surface'} />

        {/* 11. Final CTA (1px gold-line top border, alternating tone) */}
        <FinalCTA tone={isVideoVisible ? 'surface' : 'ink'} />
      </main>
    </>
  );
};

export default Home;
