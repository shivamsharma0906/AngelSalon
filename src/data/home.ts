import { googleSummary } from './reviews';
import { siteConfig } from './site';

export interface HomeStat {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
  verified: boolean;
}

export interface HeroSlide {
  id: string;
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  objectPosition: string;
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 'salon-interior',
    src: '/images/hero/salon_interior_desktop.webp',
    srcSet: '/images/hero/salon_interior_mobile.webp 800w, /images/hero/salon_interior_desktop.webp 1672w',
    sizes: '(max-width: 640px) 100vw, 100vw',
    alt: 'Angels Salon & Academy luxury interior and styling stations in Ghatkopar East',
    objectPosition: 'center center',
  },
  {
    id: 'client-glass-hair',
    src: '/images/hero/client_glass_hair_desktop.webp',
    srcSet: '/images/hero/client_glass_hair_mobile.webp 800w, /images/hero/client_glass_hair_desktop.webp 1080w',
    sizes: '(max-width: 640px) 100vw, 100vw',
    alt: 'Client mirror-glass hair smoothening and Nanoplastia treatment result',
    objectPosition: 'center 20%',
  },
  {
    id: 'client-styling',
    src: '/images/hero/client_styling_desktop.webp',
    srcSet: '/images/hero/client_styling_mobile.webp 800w, /images/hero/client_styling_desktop.webp 911w',
    sizes: '(max-width: 640px) 100vw, 100vw',
    alt: 'Client precision haircut, dimensional blow-dry, and face-framing style',
    objectPosition: 'center 25%',
  },
  {
    id: 'client-nails',
    src: '/images/hero/client_nails_desktop.webp',
    srcSet: '/images/hero/client_nails_mobile.webp 800w, /images/hero/client_nails_desktop.webp 1080w',
    sizes: '(max-width: 640px) 100vw, 100vw',
    alt: 'Russian gel nail extensions and bespoke nail art at Angels Salon',
    objectPosition: 'center center',
  },
];

export interface PathCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
  icon: 'scissors' | 'academy' | 'whatsapp';
}

export interface ReasonItem {
  id: string;
  title: string;
  description: string;
  highlightReviewKeyword: string;
}

export interface AcademyTeaserContent {
  headline: string;
  subtext: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  verified: boolean;
}

export interface WelcomeContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  verified: boolean;
}

export interface VideoContent {
  title: string;
  youtubeId?: string;
  thumbnail?: string;
  verified: boolean;
}

export interface HomeData {
  hero: {
    eyebrow: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    subtext: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    stats: HomeStat[];
    bookingDefaults: {
      services: string[];
      dates: string[];
      times: string[];
    };
  };
  pathCards: PathCardItem[];
  welcome: WelcomeContent;
  reasons: {
    heading: string;
    subheading: string;
    description: string;
    items: ReasonItem[];
  };
  academyTeaser: AcademyTeaserContent;
  video: VideoContent;
  finalCta: {
    heading: string;
    subtext: string;
    primaryText: string;
    secondaryText: string;
    secondaryLink: string;
  };
}

export const homeData: HomeData = {
  hero: {
    eyebrow: "Hair Salon & Academy · Ghatkopar East, Mumbai",
    h1Line1: "A Sanctuary for",
    h1Line2: "Beautiful Hair",
    h1Line3: "& Bespoke Beauty.",
    subtext: `Expert haircuts, smoothening and colour, facials, nails and more, all under one roof in Ghatkopar East. Hygienic, friendly, and rated ${googleSummary.rating} by ${googleSummary.count} Google reviewers.`,
    primaryCtaText: "Book Appointment",
    secondaryCtaText: "Chat on WhatsApp",
    stats: [
      {
        id: "rating",
        value: `${googleSummary.rating}★`,
        label: "Google rating",
        sublabel: `${googleSummary.count} Google reviews`,
        verified: true,
      },
      {
        id: "reviews-count",
        value: `${googleSummary.count}`,
        label: "Google reviews",
        sublabel: "Verified client feedback",
        verified: true,
      },
      {
        id: "years",
        value: "10+",
        label: "Years of excellence",
        sublabel: "Pant Nagar, Ghatkopar East",
        verified: false, // Unconfirmed claim — hidden in production
      },
      {
        id: "hygiene",
        value: "Strict",
        label: "Salon hygiene",
        sublabel: "Sanitized instruments",
        verified: false, // Unconfirmed claim — hidden in production
      },
    ],
    bookingDefaults: {
      services: [
        "Women's Haircut & Styling",
        "Men's Haircut & Grooming",
        "Hair Smoothening / Nanoplastia",
        "French Balayage & Highlights",
        "Clinical Facials & Clean-up",
        "Luxury Nails & Extensions",
        "Bridal & Party Makeup",
      ],
      dates: ["Today", "Tomorrow", "This Weekend", "Next Week"],
      times: [
        "Morning (10:00 AM – 1:00 PM)",
        "Afternoon (1:00 PM – 5:00 PM)",
        "Evening (5:00 PM – 8:30 PM)",
      ],
    },
  },

  pathCards: [
    {
      id: "salon-services",
      title: "Salon Services",
      description: "Precision haircuts, balayage, keratin smoothing, and skin therapies.",
      href: "/services",
      icon: "scissors",
    },
    {
      id: "academy",
      title: "Beauty Academy",
      description: "Professional diplomas, practical live models, and career guidance.",
      href: "/academy",
      icon: "academy",
    },
    {
      id: "whatsapp-booking",
      title: "Book on WhatsApp",
      description: "Fast appointment assistance and slot confirmation with our team.",
      href: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hi Angels Salon & Academy! I would like to schedule an appointment. Could you please share available slots?")}`,
      isExternal: true,
      icon: "whatsapp",
    },
  ],

  welcome: {
    title: "Welcome to Angels Salon & Academy",
    subtitle: "A Dedicated Beauty Sanctuary in Ghatkopar East",
    paragraphs: [
      "Conveniently situated in Shival Nagar, Pant Nagar, Angels Salon & Academy is a trusted unisex destination for modern hair artistry, clinical skincare, and certified beauty education.",
      "Our team focuses on gentle techniques, thorough hygiene, and attentive consultations to deliver personalized results for every member of the family.",
    ],
    image: "/images/real/salon_interior_real.jpg",
    imageAlt: "Angels Family Salon & Academy modern styling stations and interior in Ghatkopar East, Mumbai",
    ctaText: "Read our story",
    ctaLink: "/about",
    verified: true,
  },

  reasons: {
    heading: "Why Clients Choose Angels",
    subheading: "What Clients Mention Most",
    description: "Themes reflected consistently across 630+ genuine Google reviews from our Pant Nagar community.",
    items: [
      {
        id: "hygiene",
        title: "Cleanliness & Hygiene",
        description: "Freshly sanitized metal instruments, tidy workstations, and comfortable private styling chairs.",
        highlightReviewKeyword: "Hygiene",
      },
      {
        id: "staff",
        title: "Friendly, Trained Staff",
        description: "Patient professionals who listen carefully to what you want before beginning any treatment.",
        highlightReviewKeyword: "Friendly Staff",
      },
      {
        id: "treatments",
        title: "Smoothening & Nanoplastia Care",
        description: "Botox, protein, and nanoplastia treatments that leave dry hair smooth, frizz-free, and shiny.",
        highlightReviewKeyword: "Treatments",
      },
      {
        id: "family",
        title: "Haircuts for the Whole Family",
        description: "Catering comfortably to women, men, and children for routine trims and complete restyling.",
        highlightReviewKeyword: "Haircuts",
      },
    ],
  },

  academyTeaser: {
    headline: "Angels Academy of Hair & Beauty",
    subtext: "Hands-on hairdressing, bridal makeup, and cosmetology diplomas with direct mentorship in our Mumbai studio.",
    image: "/images/academy_training.jpg",
    imageAlt: "Students practicing hairdressing techniques inside Angels Academy studio",
    ctaText: "Explore the Academy",
    ctaLink: "/academy",
    verified: true,
  },

  video: {
    title: "Salon Transformations",
    verified: false, // Unverified - Section 8 hides until genuine video URL is provided
  },

  finalCta: {
    heading: "Begin your journey with Angels",
    subtext: "Experience attentive hair, beauty, and wellness services at our Ghatkopar East sanctuary.",
    primaryText: "Book on WhatsApp",
    secondaryText: "Browse Our Services",
    secondaryLink: "/services",
  },
};

export default homeData;
