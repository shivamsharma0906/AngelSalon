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
    label: 'Angels Salon & Academy',
    headline: 'Hair, skin and nail care in Ghatkopar East.',
    bodyText: 'Professional haircuts, smoothening, clinical skincare and nail art by experienced stylists at Pant Nagar.',
    cta: {
      label: 'Book on WhatsApp',
      href: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        'Hi Angels Salon! I would like to book an appointment.'
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
      height: 960,
    },
    alt: 'Angels Salon & Academy studio interior and styling stations in Ghatkopar East',
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
      height: 960,
    },
    alt: 'Master bridal and creative hair styling artistry at Angels Salon & Academy',
    desktopObjectPosition: '70% 35%',
    mobileObjectPosition: '60% 30%',
    needsBetterPhoto: false,
  },

  // Slide 3: Editorial — Bridal
  {
    id: 'bridal-styling',
    layout: 'editorial',
    label: 'Bridal & Occasion Styling',
    headline: 'Bridal makeup and wedding day styling.',
    bodyText: 'Traditional and contemporary bridal looks with professional draping, hair styling and HD makeup.',
    cta: {
      label: 'View Bridal Packages',
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
      height: 960,
    },
    alt: 'Traditional bridal look with jewellery and hair styling at Angels Salon',
    desktopObjectPosition: '65% 40%',
    mobileObjectPosition: 'center 35%',
    // TODO(owner: needs better photo) - source is 978x911px; recommend dedicated high-res bridal portrait >1600px for desktop.
    needsBetterPhoto: true,
  },

  // Slide 4: Split — Academy
  {
    id: 'academy-diplomas',
    layout: 'split',
    label: 'Professional Academy',
    panelTone: 'ink',
    headline: 'Professional beauty and hair diplomas.',
    bodyText: 'Hands-on training in hairdressing, makeup artistry and salon management with practical studio work.',
    cta: {
      label: 'Explore Academy Courses',
      href: '/academy',
    },
    // No batch dates mentioned since src/data/batches.ts does not exist
    collageImages: [
      {
        id: 'c1',
        src: '/images/hero-carousel/collage_c1_academy.webp',
        alt: 'Students cutting hair in academy studio',
        width: 600,
        height: 600,
        aspectRatio: 'aspect-square',
        mobileVisible: true,
      },
      {
        id: 'c2',
        src: '/images/hero-carousel/collage_c2_haircut.webp',
        alt: 'Student precision bob haircut result',
        width: 450,
        height: 600,
        aspectRatio: 'aspect-[3/4]',
        mobileVisible: true,
      },
      {
        id: 'c3',
        src: '/images/hero-carousel/collage_c3_styling.webp',
        alt: 'Master haircut styling finish',
        width: 450,
        height: 600,
        aspectRatio: 'aspect-[3/4]',
        mobileVisible: true,
      },
      {
        id: 'c4',
        src: '/images/hero-carousel/collage_c4_nails.webp',
        alt: 'Russian gel nail extensions by student',
        width: 450,
        height: 600,
        aspectRatio: 'aspect-square',
        mobileVisible: true,
      },
      {
        id: 'c5',
        src: '/images/hero-carousel/collage_c5_blowout.webp',
        alt: 'Layered blowout styling',
        width: 444,
        height: 600,
        aspectRatio: 'aspect-[3/4]',
        mobileVisible: false,
      },
      {
        id: 'c6',
        src: '/images/hero-carousel/collage_c6_salon.webp',
        alt: 'Salon and academy training station',
        width: 600,
        height: 450,
        aspectRatio: 'aspect-[4/3]',
        mobileVisible: false,
      },
    ],
  },
];
