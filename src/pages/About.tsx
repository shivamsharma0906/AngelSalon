import React from 'react';
import { SEO, generateLocalBusinessSchema } from '../lib/seo';
import { siteConfig } from '../data/site';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LaurelDivider } from '../components/ui/LaurelDivider';
import { CountUp } from '../components/ui/CountUp';
import { AboutAndFacilities } from '../components/sections/AboutAndFacilities';
import { SpecialOffers } from '../components/sections/SpecialOffers';
import { ShieldCheckIcon, ScissorsIcon, DiamondIcon, HeartIcon } from '../components/ui/icons';

export const About: React.FC = () => {
  const localBusinessSchema = generateLocalBusinessSchema();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${siteConfig.url}/about` },
    ],
  };

  const aboutSchema = [...localBusinessSchema, breadcrumbSchema];

  const corePillars = [
    {
      icon: <ShieldCheckIcon size={22} className="text-gold" />,
      title: "Surgical-Grade Hygiene",
      description: "We enforce strict medical-grade autoclaving of styling instruments, single-use disposable gowns, and thorough sanitization of styling stations between every client appointment.",
      shortDescription: "Medical-grade autoclaving, single-use gowns & sanitized stations between clients.",
    },
    {
      icon: <ScissorsIcon size={22} className="text-gold" />,
      title: "Elite Certified Artistry",
      description: "Our styling team has been educated at premier academies including Toni&Guy, L'Oréal Professionnel Paris, and Vidal Sassoon, undergoing regular masterclasses to lead seasonal trends.",
      shortDescription: "Trained at Toni&Guy, L'Oréal Paris & Vidal Sassoon with seasonal masterclasses.",
    },
    {
      icon: <DiamondIcon size={22} className="text-gold" />,
      title: "World-Class Product Partners",
      description: "We never compromise on chemical formulations. We exclusively partner with authentic global brands including L'Oréal Professionnel, Skeyndor, Olaplex, Nashi Argan, and Kérastase.",
      shortDescription: "Exclusively using authentic L'Oréal, Skeyndor, Olaplex & Kérastase formulations.",
    },
    {
      icon: <HeartIcon size={22} className="text-gold" />,
      title: "Empowering & Inclusive Space",
      description: "Proudly unisex and dedicated to creating an intimate, comfortable sanctuary where every client is received with utmost warmth, confidentiality, and respect.",
      shortDescription: "Warm, respectful unisex sanctuary tailored to individual comfort and style.",
    },
  ];

  const milestones = [
    { year: "2014", title: "The Sanctuary Founded", description: "Established our flagship salon in Ghatkopar East with a focus on bespoke consultations and precision hair design." },
    { year: "2018", title: "Academy Inception", description: "Launched government-recognized beauty & hair courses to train aspiring stylists with hands-on live client practice." },
    { year: "2021", title: "High-Fashion Bridal Expansion", description: "Introduced high-definition bridal couture styling, destination wedding packages, and advanced aesthetic skincare." },
    { year: "2025+", title: "500+ Alumni & 15,000+ Clients", description: "Recognized as Eastern Mumbai's trusted beauty institution with verified 4.7★ client satisfaction and 630+ Google reviews." },
  ];

  return (
    <>
      <SEO
        title="About Angels Salon & Academy | Our Story & Standards"
        description="Discover the story, team, facilities, and hygiene standards of Angels Salon & Academy in Ghatkopar East, Mumbai. Over a decade of beauty excellence."
        canonicalPath="/about"
        schemaData={aboutSchema}
      />

      <main id="main-content" className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background">
        {/* Page Hero Header */}
        <section className="text-center mb-16 sm:mb-20">
          <Container size="md">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-text mb-3 inline-block">
              Our Heritage & Craft
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-text leading-tight mb-4">
              The Angels Story
            </h1>
            <LaurelDivider size="md" />
            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-light mt-3">
              Founded on the belief that beauty is an intimate form of artistic expression, we blend European hairdressing precision with warm Indian hospitality.
            </p>
          </Container>
        </section>

        {/* Founder & Philosophy Story Grid */}
        <section className="mb-16 sm:mb-20">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Photo Side - REAL SALON CLIENT RESULT with Roman Arch Framing */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div data-reveal="image" className="relative rounded-t-[180px] rounded-b-[28px] overflow-hidden border border-border shadow-lustre-md bg-dark aspect-[4/5]">
                    <img
                      src="/images/real/interior_styling_stations.webp"
                      alt="Angels Salon & Academy modern styling stations and vanity mirrors in Ghatkopar East, Mumbai"
                      width={1600}
                      height={1200}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-dark/90 backdrop-blur-md border border-gold/40 p-4 rounded-full shadow-lustre-sm flex items-center justify-between text-text-inverse">
                      <div>
                        <span className="block font-serif text-xl sm:text-2xl font-bold text-gold-light">
                          <CountUp value="10+" /> Years
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-text-muted">Mastery in Mumbai</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center text-gold-light font-bold">
                        ★
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Narrative Side */}
              <div data-reveal className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-wider text-gold font-semibold mb-2 block">
                  Our Salon Philosophy & Craft
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-text mb-4">
                  Where Confidence is Sculpted, One Detail at a Time
                </h2>

                <blockquote className="border-l-2 border-gold pl-5 py-2 mb-6 italic font-serif text-lg sm:text-xl text-gold-text leading-relaxed">
                  "At Angel's Salon, customer satisfaction, hygiene, and attention to detail are at the heart of everything we do."
                </blockquote>

                <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed mb-8">
                  {/* Desktop Full Narrative */}
                  <div className="hidden sm:block space-y-4">
                    <p>
                      Angel's Salon is a premium unisex salon in Ghatkopar East, Mumbai, dedicated to helping you look and feel your best. Conveniently located in Shival Nagar beside Kirti Computer Institute, we offer a complete range of professional hair, skin, beauty, and grooming services for both men and women.
                    </p>
                    <p>
                      Our experienced team combines expert techniques with high-quality products to deliver personalized services in a clean, comfortable, and welcoming environment. Whether you're looking for a stylish haircut, hair coloring, smoothening, facials, bridal or party makeup, skincare treatments, or regular grooming, we ensure every visit is relaxing and satisfying.
                    </p>
                    <p>
                      We believe every client deserves exceptional service and a rejuvenating salon experience tailored to their individual style and preferences. Visit us any day of the week from 9:30 AM to 9:00 PM and experience professional beauty and grooming services that leave you looking confident and refreshed.
                    </p>
                  </div>

                  {/* Mobile Concise Narrative */}
                  <div className="sm:hidden space-y-2 text-xs">
                    <p>
                      Angel's Salon is Ghatkopar East's premier unisex destination for precision haircutting, bespoke hair colour, rejuvenating facials, bridal couture makeup, and certified academy education.
                    </p>
                    <p className="text-text font-medium pt-0.5">
                      Open daily from <span className="text-gold font-semibold">9:30 AM to 9:00 PM</span> at Shival Nagar, Pant Nagar.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-0.5 bg-gold/60"></div>
                  <div>
                    <span className="font-serif text-lg font-bold text-text block">
                      The Angels Leadership & Master Stylists
                    </span>
                    <span className="text-xs uppercase tracking-wider text-gold-text">
                      Master Stylists & Educators
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* OFFICIAL ABOUT US & 11 FACILITIES COMPONENT */}
        <AboutAndFacilities className="bg-surface border-y border-border" />

        {/* 4 Pillars of Excellence */}
        <section className="mb-20 sm:mb-28 bg-surface border-b border-border py-16 sm:py-24">
          <Container size="lg">
            <div data-reveal>
              <SectionHeading
                subtitle="The Angels Standard"
                title="Our Four Pillars of Quality"
                description="How we consistently deliver five-star experiences to over 15,000 satisfied clients."
                align="center"
              />
            </div>

            <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  data-card-hover
                  className="rounded-[24px] p-4 sm:p-7 flex flex-col justify-between bg-background/50 border border-border hover:border-gold/50 shadow-lustre-sm hover:shadow-lustre-md transition-all duration-300"
                >
                  <div>
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-surface border border-gold-line text-gold flex items-center justify-center mb-3 sm:mb-5 shadow-sm select-none" aria-hidden="true">
                      {pillar.icon}
                    </div>
                    <h3 className="font-serif text-sm sm:text-xl font-bold text-text mb-1.5 sm:mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed hidden sm:block">
                      {pillar.description}
                    </p>
                    <p className="text-[11px] leading-relaxed text-text-muted sm:hidden">
                      {pillar.shortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Brand Milestones Timeline */}
        <section className="mb-20 sm:mb-28">
          <Container size="lg">
            <div data-reveal>
              <SectionHeading
                subtitle="A Decade of Artistry"
                title="Milestones of Growth"
                align="center"
              />
            </div>

            <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {milestones.map((m, index) => (
                <div key={index} data-card-hover className="bg-surface border border-border p-4 sm:p-6 rounded-[24px] relative shadow-lustre-sm hover:shadow-lustre-md hover:border-gold/50 transition-all duration-300">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-text block mb-1 sm:mb-2">
                    {m.year}
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-text mb-1 sm:mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Real Client Transformations Showcase */}
        <section className="mb-20 sm:mb-28 bg-surface border-y border-border py-16">
          <Container size="lg">
            <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs uppercase tracking-wider text-gold font-semibold mb-2 block">
                  Real Client Artistry
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-text mb-4">
                  Step Into Pure Ambiance & Precision Care
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6 font-light">
                  Our flagship Ghatkopar East sanctuary features custom aesthetic stations, ergonomic hydraulic reclining wash basins, private bridal suites, and peaceful ambient acoustic soundscapes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="gold">Unisex Salon</Badge>
                  <Badge variant="surface">Private Bridal Suite</Badge>
                  <Badge variant="surface">Aesthetic Skincare Room</Badge>
                  <Badge variant="surface">Academy Studio</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div data-reveal="image" className="aspect-[4/5] rounded-[24px] overflow-hidden border border-border group bg-dark shadow-lustre-sm">
                  <img
                    src="/images/real/client1_glass_hair_after.webp"
                    alt="Real client waist-length liquid glass hair smoothening result at Angels Salon"
                    width={960}
                    height={1280}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div data-reveal="image" className="aspect-[4/5] rounded-[24px] overflow-hidden border border-border mt-6 group bg-dark shadow-lustre-sm">
                  <img
                    src="/images/real/client2_caramel_balayage_after.webp"
                    alt="Real client dimensional honey-caramel balayage executed at Angels Salon"
                    width={1200}
                    height={1600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 5 Real Special Offers Posters */}
        <SpecialOffers className="mb-16" />

        {/* Direct Booking Callout */}
        <section data-reveal className="text-center">
          <Container size="md">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-text mb-4">
              Begin Your Journey with Angels
            </h2>
            <p className="text-base text-text-muted mb-8 leading-relaxed max-w-xl mx-auto">
              Our concierge team is at your service to curate your appointment or discuss enrollment in our academy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as="a"
                href="/contact"
                variant="gold"
                size="lg"
                data-btn-sweep
                className="w-full sm:w-auto min-h-[48px] rounded-full shadow-lustre-md"
              >
                Book an Appointment
              </Button>
              <Button
                as="a"
                href="/services"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] rounded-full"
              >
                Browse Our Services
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default About;
