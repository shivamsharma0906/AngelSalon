import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/site';
import { googleSummary } from '../data/reviews';
import { serviceCategoriesData } from '../data/services';

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
  image = `${siteConfig.url}/images/real/og_storefront.jpg`,
  type = 'website',
  schemaData,
  noIndex = false,
}) => {
  // Prevent duplicate brand name in title if already included
  const hasBrand = title && (title.includes('Angels') || title.includes(siteConfig.name));
  const fullTitle = title
    ? (hasBrand ? title : `${title} | ${siteConfig.name}`)
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
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

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
 * Generates LocalBusiness (HairSalon & BeautySalon) JSON-LD structured data for branches,
 * including full address, geo coordinates, opening hours, review aggregate ratings,
 * social profile links, and the full services offer catalog.
 */
export function generateLocalBusinessSchema() {
  return siteConfig.branches.map((branch) => ({
    '@context': 'https://schema.org',
    '@type': ['HairSalon', 'BeautySalon'],
    '@id': `${siteConfig.url}/#${branch.id}`,
    name: `${siteConfig.name} - ${branch.name}`,
    description: siteConfig.description,
    image: `${siteConfig.url}/images/real/storefront_facade.webp`,
    url: siteConfig.url,
    telephone: branch.phone,
    priceRange: 'INR 500-5000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: googleSummary.rating.toString(),
      reviewCount: googleSummary.count.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: siteConfig.socialLinks.map((s) => s.url),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Salon & Beauty Services',
      itemListElement: serviceCategoriesData.map((category) => ({
        '@type': 'OfferCatalog',
        name: category.name,
        description: category.shortDescription,
        url: `${siteConfig.url}/services/${category.slug}`,
        itemListElement: category.services.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.description,
          },
          price: item.startingPrice.replace(/[^\d]/g, ''),
          priceCurrency: 'INR',
        })),
      })),
    },
  }));
}

/**
 * Generates EducationalOrganization schema for Angels Academy
 */
export function generateEducationalOrganizationSchema() {
  const branch = siteConfig.branches[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteConfig.url}/academy#organization`,
    name: `${siteConfig.name} Academy`,
    description: 'Government-recognized professional hair and beauty academy offering certified diplomas in hairdressing and bridal makeup in Mumbai.',
    url: `${siteConfig.url}/academy`,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    image: `${siteConfig.url}/images/real/storefront_signage_gold.webp`,
    telephone: branch.phone,
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
    sameAs: siteConfig.socialLinks.map((s) => s.url),
  };
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
      '@type': 'EducationalOrganization',
      name: `${siteConfig.name} Academy`,
      sameAs: `${siteConfig.url}/academy`,
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
