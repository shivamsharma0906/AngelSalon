import { siteConfig } from './site';

export interface BaseHeroSlide {
  id: string;
  headline: string;
  bodyText: string;
  cta: {
    label: string;
    href: string;
    isExternal?: boolean;
    isWhatsApp?: boolean;
  };
}

export interface EditorialHeroSlide extends BaseHeroSlide {
  layout: 'editorial';
  label: string;
  desktopImage: {
    src: string;
    srcSet: string;
    width: number;
    height: number;
  };
  mobileImage: {
    src: string;
    srcSet: string;
    width: number;
    height: number;
  };
  alt: string;
  desktopObjectPosition: string;
  mobileObjectPosition: string;
  /** Flagged if underlying source is below 1600px wide */
  needsBetterPhoto?: boolean;
}

export interface CollageImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  mobileVisible: boolean;
}

export interface SplitHeroSlide extends BaseHeroSlide {
  layout: 'split';
  label?: string;
  panelTone: 'ink' | 'surface';
  collageImages: CollageImage[];
}

export type HeroSlideItem = EditorialHeroSlide | SplitHeroSlide;

export const heroSlides: HeroSlideItem[] = [
  // Slide 1: Editorial — Brand Statement
  {
    id: 'brand-statement',
    layout: 'editorial',
    label: 'Angel Salon & Academy',
    headline: 'Hair, skin and nail care in Ghatkopar East.',
    bodyText: 'Professional haircuts, smoothening, clinical skincare and nail art by experienced stylists at Pant Nagar.',
    cta: {
      label: 'Book on WhatsApp',
      href: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        'Hi Angel Salon! I would like to book an appointment.'
      )}`,
      isWhatsApp: true,
      isExternal: true,
    },
    desktopImage: {
      src: '/images/hero-carousel/slide1_desktop_1920.webp',
      srcSet:
        '/images/hero-carousel/slide1_desktop_768.webp 768w, /images/hero-carousel/slide1_desktop_1280.webp 1280w, /images/hero-carousel/slide1_desktop_1920.webp 1920w',
      width: 1920,
      height: 1080,
    },
    mobileImage: {
      src: '/images/hero-carousel/slide1_mobile_768.webp',
      srcSet:
        '/images/hero-carousel/slide1_mobile_480.webp 480w, /images/hero-carousel/slide1_mobile_768.webp 768w',
      width: 768,
      height: 432,
    },
    alt: 'Angel Salon & Academy storefront facade and illuminated signage in Pant Nagar, Ghatkopar East, Mumbai',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: 'center center',
    needsBetterPhoto: false,
  },

  // Slide 2: Editorial — Colour & Balayage
  {
    id: 'colour-balayage',
    layout: 'editorial',
    label: 'Hair Colour & Balayage',
    headline: 'Dimensional colour and custom balayage.',
    bodyText: 'Blended highlights, global shades and ammonia-free toning tailored to your hair texture.',
    cta: {
      label: 'Explore Hair Colour',
      href: '/services/womens-hair-colour',
    },
    desktopImage: {
      src: '/images/hero-carousel/slide2_desktop_1920.webp',
      srcSet:
        '/images/hero-carousel/slide2_desktop_768.webp 768w, /images/hero-carousel/slide2_desktop_1280.webp 1280w, /images/hero-carousel/slide2_desktop_1920.webp 1920w',
      width: 1920,
      height: 1080,
    },
    mobileImage: {
      src: '/images/hero-carousel/slide2_mobile_768.webp',
      srcSet:
        '/images/hero-carousel/slide2_mobile_480.webp 480w, /images/hero-carousel/slide2_mobile_768.webp 768w',
      width: 768,
      height: 432,
    },
    alt: 'Angel Salon modern hair wash lounge, professional colour dispensary, and luxury reclining shampoo stations in Ghatkopar East',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: 'center center',
    needsBetterPhoto: false,
  },

  // Slide 3: Editorial — Bridal & Occasion Artistry
  {
    id: 'bridal-couture',
    layout: 'editorial',
    label: 'Bridal & Occasion Artistry',
    headline: 'Royal bridal couture and HD party makeup.',
    bodyText: 'Bespoke bridal makeovers, HD airbrush finishes, saree draping and bridal trials in private suites.',
    cta: {
      label: 'Explore Bridal Services',
      href: '/services/bridal-makeup',
    },
    desktopImage: {
      src: '/images/hero-carousel/slide3_desktop_1920.webp',
      srcSet:
        '/images/hero-carousel/slide3_desktop_768.webp 768w, /images/hero-carousel/slide3_desktop_1280.webp 1280w, /images/hero-carousel/slide3_desktop_1920.webp 1920w',
      width: 1920,
      height: 1080,
    },
    mobileImage: {
      src: '/images/hero-carousel/slide3_mobile_768.webp',
      srcSet:
        '/images/hero-carousel/slide3_mobile_480.webp 480w, /images/hero-carousel/slide3_mobile_768.webp 768w',
      width: 768,
      height: 432,
    },
    alt: 'Angel Salon private bridal and aesthetic care suite in Ghatkopar East, Mumbai',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: 'center center',
    needsBetterPhoto: false,
  },

  // Slide 4: Editorial — Luxury Nail Bar & Skincare
  {
    id: 'nail-skincare',
    layout: 'editorial',
    label: 'Nail Bar & Aesthetic Care',
    headline: 'Custom nail extensions and clinical facials.',
    bodyText: 'Russian gel nail extensions, chrome art, Korean glass facials and revitalizing hand-foot spas.',
    cta: {
      label: 'Explore Nails & Skincare',
      href: '/services/nails',
    },
    desktopImage: {
      src: '/images/hero-carousel/slide4_desktop_1920.webp',
      srcSet:
        '/images/hero-carousel/slide4_desktop_768.webp 768w, /images/hero-carousel/slide4_desktop_1280.webp 1280w, /images/hero-carousel/slide4_desktop_1920.webp 1920w',
      width: 1920,
      height: 1080,
    },
    mobileImage: {
      src: '/images/hero-carousel/slide4_mobile_768.webp',
      srcSet:
        '/images/hero-carousel/slide4_mobile_480.webp 480w, /images/hero-carousel/slide4_mobile_768.webp 768w',
      width: 768,
      height: 432,
    },
    alt: 'Angel Salon luxury illuminated nail bar, gel extensions, and manicure pedicure station in Ghatkopar East',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: 'center center',
    needsBetterPhoto: false,
  },

  // Slide 5: Editorial — Professional Academy
  {
    id: 'academy-diplomas',
    layout: 'editorial',
    label: 'Professional Academy',
    headline: 'Professional beauty and hair diplomas.',
    bodyText: 'Hands-on training in hairdressing, makeup artistry and cosmetology with direct mentorship on our Mumbai salon floor.',
    cta: {
      label: 'Explore Academy Courses',
      href: '/academy',
    },
    desktopImage: {
      src: '/images/hero-carousel/slide5_desktop_1920.webp',
      srcSet:
        '/images/hero-carousel/slide5_desktop_768.webp 768w, /images/hero-carousel/slide5_desktop_1280.webp 1280w, /images/hero-carousel/slide5_desktop_1920.webp 1920w',
      width: 1920,
      height: 1080,
    },
    mobileImage: {
      src: '/images/hero-carousel/slide5_mobile_768.webp',
      srcSet:
        '/images/hero-carousel/slide5_mobile_480.webp 480w, /images/hero-carousel/slide5_mobile_768.webp 768w',
      width: 768,
      height: 432,
    },
    alt: 'Angel Salon Academy styling floor and practical training stations in Ghatkopar East',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: 'center center',
    needsBetterPhoto: false,
  },
];
