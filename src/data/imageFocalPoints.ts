/**
 * Centralized registry of all authentic salon photography assets
 * with calibrated focal points, intrinsic dimensions, and descriptive metadata.
 *
 * Calibrated focal points ensure that subjects' faces, hair crowns,
 * and architectural fixtures are never cropped out regardless of frame aspect ratio.
 */

export interface ImageAssetMeta {
  id: string;
  src: string;
  alt: string;
  focalPoint: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  aspectRatio: number;
  title: string;
  subtitle: string;
  badge: string;
}

export const SALON_IMAGE_ASSETS: Record<string, ImageAssetMeta> = {
  stylingStations: {
    id: 'styling-stations',
    src: '/images/real/interior_styling_stations.webp',
    alt: 'Angels Salon & Academy modern styling stations and vanity mirrors in Ghatkopar East',
    focalPoint: '50% 40%', // Focus on mirrors & styling chairs
    intrinsicWidth: 1200,
    intrinsicHeight: 1600,
    aspectRatio: 1200 / 1600,
    title: 'Styling Sanctuary',
    subtitle: 'Vidal Sassoon Precision Stations',
    badge: 'Flagship Studio',
  },
  balayageCaramel: {
    id: 'balayage',
    src: '/images/real/client2_caramel_balayage_after.webp',
    alt: 'Real client dimensional caramel balayage crafted at Angels Salon Mumbai',
    focalPoint: '50% 25%', // Focus on hair crown and balayage ribbons
    intrinsicWidth: 1200,
    intrinsicHeight: 1600,
    aspectRatio: 1200 / 1600,
    title: 'French Balayage',
    subtitle: 'Dimensional Caramel Tones',
    badge: 'Master Colourists',
  },
  glassHairNanoplastia: {
    id: 'glass-hair',
    src: '/images/real/client1_glass_hair_after.webp',
    alt: 'Real client mirror-glass hair smoothening and Nanoplastia treatment result',
    focalPoint: '50% 30%', // Focus on glossy hair texture and length
    intrinsicWidth: 960,
    intrinsicHeight: 1280,
    aspectRatio: 960 / 1280,
    title: 'Nanoplastia Shine',
    subtitle: 'Mirror-Glass Smoothing',
    badge: 'Signature Treatment',
  },
  academyStudioFloor: {
    id: 'academy-studio',
    src: '/images/real/interior_studio_floor.webp',
    alt: 'Angels Academy spacious salon floor and student training stations in Mumbai',
    focalPoint: '50% 45%', // Workstations and salon practice floor
    intrinsicWidth: 1200,
    intrinsicHeight: 1600,
    aspectRatio: 1200 / 1600,
    title: 'Beauty Academy',
    subtitle: 'Hands-on Live Model Training',
    badge: 'Certified Diplomas',
  },
  washLounge: {
    id: 'wash-lounge',
    src: '/images/real/interior_wash_lounge.webp',
    alt: 'Comfortable reclining wash lounge chairs for hair treatments and scalp baths',
    focalPoint: '50% 45%',
    intrinsicWidth: 1200,
    intrinsicHeight: 1600,
    aspectRatio: 1200 / 1600,
    title: 'Shampoo & Scalp Lounge',
    subtitle: 'Ergonomic Reclining Basins',
    badge: 'Relaxation',
  },
  nailBar: {
    id: 'nail-bar',
    src: '/images/real/interior_nail_bar.webp',
    alt: 'Dedicated backlit nail bar and lacquer collection at Angels Salon',
    focalPoint: '50% 40%',
    intrinsicWidth: 1200,
    intrinsicHeight: 1600,
    aspectRatio: 1200 / 1600,
    title: 'Boutique Nail Bar',
    subtitle: 'Russian Gel Overlays & Art',
    badge: 'Nail Artistry',
  },
  storefrontFacade: {
    id: 'storefront-facade',
    src: '/images/real/storefront_facade.webp',
    alt: 'Angels Salon & Academy storefront exterior and illuminated signage in Ghatkopar East, Mumbai',
    focalPoint: '50% 40%',
    intrinsicWidth: 1600,
    intrinsicHeight: 893,
    aspectRatio: 1600 / 893,
    title: 'Pant Nagar Flagship',
    subtitle: 'Beside Kirti Computer Institute',
    badge: 'Boutique Facade',
  },
  storefrontSignageGold: {
    id: 'storefront-signage',
    src: '/images/real/storefront_signage_gold.webp',
    alt: 'Angels Salon & Academy 3D gold illuminated academy signage and boutique exterior',
    focalPoint: '50% 35%',
    intrinsicWidth: 1600,
    intrinsicHeight: 1200,
    aspectRatio: 1600 / 1200,
    title: 'Gold Monogram Emblem',
    subtitle: 'Official Academy Entrance',
    badge: 'Flagship Entrance',
  },
};

/**
 * Featured Hero Showcases used by the interactive FramedImage system
 */
export const HERO_SHOWCASE_ITEMS = [
  SALON_IMAGE_ASSETS.stylingStations,
  SALON_IMAGE_ASSETS.balayageCaramel,
  SALON_IMAGE_ASSETS.glassHairNanoplastia,
  SALON_IMAGE_ASSETS.academyStudioFloor,
];

