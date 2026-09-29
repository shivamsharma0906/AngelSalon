import React from 'react';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { Hero } from '../components/sections/Hero';
import { BrandTicker } from '../components/sections/BrandTicker';
import { TrustBar } from '../components/sections/TrustBar';
import { BeautyQuiz } from '../components/sections/BeautyQuiz';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { TransformationShowcase } from '../components/sections/TransformationShowcase';
import { SpecialOffers } from '../components/sections/SpecialOffers';
import { GalleryPreview } from '../components/sections/GalleryPreview';
import { AboutFounder } from '../components/sections/AboutFounder';
import { AcademyTeaser } from '../components/sections/AcademyTeaser';
import { Testimonials } from '../components/sections/Testimonials';
import { BranchCards } from '../components/sections/BranchCards';
import { CTABanner } from '../components/sections/CTABanner';

export const Home: React.FC = () => {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <SEO
        title="Luxury Hair Salon & Academy Mumbai | Haute Coiffure Ghatkopar"
        description="Experience luxury hair styling, French balayage, Skeyndor clinical skincare, couture bridal makeup, and certified academy courses at Angels Salon & Academy, Ghatkopar East, Mumbai."
        canonicalPath="/"
        schemaData={localBusinessSchema}
      />

      <main id="main-content">
        {/* 1. Grand Editorial Hero with Integrated VIP Booking Console */}
        <Hero />

        {/* 2. Luxury Product Partner Marquee */}
        <BrandTicker />

        {/* 3. Verified Metrics & Global Brand Credentials */}
        <TrustBar />

        {/* 4. Bespoke Beauty Treatment Explorer */}
        <BeautyQuiz />

        {/* 6. Curated Signature Disciplines Explorer */}
        <ServicesPreview />

        {/* 7. Real Client Transformations & Formulations Showcase */}
        <TransformationShowcase />

        {/* 8. Limited Festive Privileges & Real Posters */}
        <SpecialOffers />

        {/* 9. Real Salon Works & Style Lookbook */}
        <GalleryPreview />

        {/* 10. Vidal Sassoon Trained Philosophy & Legacy */}
        <AboutFounder />

        {/* 11. Academy of Hair & Beauty Masterclass Teaser */}
        <AcademyTeaser />

        {/* 13. Verified 5-Star Google Reviews & Social Proof */}
        <Testimonials />

        {/* 14. Salon Sanctuaries & Live Maps */}
        <BranchCards />

        {/* 15. Final VIP Appointment Concierge Banner */}
        <CTABanner />
      </main>
    </>
  );
};

export default Home;
