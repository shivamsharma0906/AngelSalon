import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/site';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  schemaData?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = siteConfig.description,
  canonicalPath = '',
  image = `${siteConfig.url}/images/hero_bg.jpg`,
  type = 'website',
  schemaData,
  noIndex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Luxury Hair Salon & Academy Mumbai`;

  const canonicalUrl = `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Generates LocalBusiness / HairSalon JSON-LD structured data for branches
 */
export function generateLocalBusinessSchema() {
  return siteConfig.branches.map((branch) => ({
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${siteConfig.url}/#${branch.id}`,
    name: `${siteConfig.name} - ${branch.name}`,
    image: `${siteConfig.url}/images/about_salon.jpg`,
    url: siteConfig.url,
    telephone: branch.phone,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address.street,
      addressLocality: branch.address.city,
      addressRegion: branch.address.state,
      postalCode: branch.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: branch.coordinates.lat,
      longitude: branch.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:30',
        closes: '21:00',
      },
    ],
    sameAs: siteConfig.socialLinks.map((s) => s.url),
  }));
}

/**
 * Generates Course JSON-LD schema for Academy page
 */
export function generateCourseSchema(courses: Array<{ name: string; overview: string; duration: string }>) {
  return courses.map((course) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.overview,
    provider: {
      '@type': 'Organization',
      name: `${siteConfig.name} Academy`,
      sameAs: siteConfig.url,
    },
    timeRequired: course.duration,
  }));
}

/**
 * Generates FAQPage JSON-LD schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates VideoObject JSON-LD schema for Videos gallery page
 */
export function generateVideoSchema(videos: Array<{ title: string; description: string; thumbnail: string; uploadDate: string }>) {
  return videos.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: `${siteConfig.url}${v.thumbnail.startsWith('/') ? v.thumbnail : `/${v.thumbnail}`}`,
    uploadDate: v.uploadDate,
  }));
}

