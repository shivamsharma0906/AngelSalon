import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO, generateLocalBusinessSchema, generateEducationalOrganizationSchema } from '../lib/seo';
import { Hero } from '../components/sections/Hero';
import { WelcomeToAngels } from '../components/sections/WelcomeToAngels';
import { OurServicesTiles } from '../components/sections/OurServicesTiles';
import { StudioGallery } from '../components/sections/StudioGallery';
import { AcademyTeaser } from '../components/sections/AcademyTeaser';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { GoogleReviews } from '../components/sections/GoogleReviews';
import { LustreFAQ } from '../components/sections/LustreFAQ';
import { VisitAngels } from '../components/sections/VisitAngels';

export const Home: React.FC = () => {
  const localBusinessSchema = generateLocalBusinessSchema();
  const educationalOrgSchema = generateEducationalOrganizationSchema();
  const homeSchemas = [...localBusinessSchema, educationalOrgSchema];

  return (
    <>
      <SEO
        title="Angel Salon & Academy | Hair Salon in Ghatkopar East"
        description="Premier hair salon & beauty academy in Ghatkopar East, Mumbai. Expert hair styling, balayage, smoothening & facials. Rated 4.7 on Google. Book on WhatsApp."
        canonicalPath="/"
        schemaData={homeSchemas}
      />

      {/* Responsive hero image preloads matching picture source queries mounted in head */}
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/real/storefront_frontal.webp"
          type="image/webp"
        />
      </Helmet>

      <main id="main-content">
        {/* 1. Lustre Editorial Hero with Arched Photo Showcase */}
        <Hero />

        {/* 2. Welcome to Angel (Lustre Studio Philosophy & Arched Photo) */}
        <WelcomeToAngels />

        {/* 3. Curated Services Directory */}
        <OurServicesTiles />

        {/* 4. Inside the Studio Gallery (Lustre 6-Photo Editorial Grid) */}
        <StudioGallery />

        {/* 5. Dedicated Angel Academy Showcase */}
        <AcademyTeaser />

        {/* 6. Why Guests Choose Angel (4 Pillars) */}
        <WhyChooseUs />

        {/* 7. Client Love / Google Reviews Carousel */}
        <GoogleReviews mode="carousel" limit={6} />

        {/* 8. Frequently Asked Questions Accordion */}
        <LustreFAQ />

        {/* 9. Visit & Reservation Console */}
        <VisitAngels />
      </main>
    </>
  );
};

export default Home;
