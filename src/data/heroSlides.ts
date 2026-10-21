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
    alt: 'Angels Salon & Academy storefront facade and illuminated signage in Pant Nagar, Ghatkopar East, Mumbai',
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
    alt: 'Real client dimensional honey-caramel balayage crafted at Angels Salon',
    desktopObjectPosition: 'center 30%',
    mobileObjectPosition: 'center 25%',
    needsBetterPhoto: false,
  },

  // Slide 3: Editorial — Professional Academy
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
      height: 960,
    },
    alt: 'Angels Salon Academy styling floor and practical training stations in Ghatkopar East',
    desktopObjectPosition: 'center 45%',
    mobileObjectPosition: 'center 40%',
    needsBetterPhoto: false,
  },
];
