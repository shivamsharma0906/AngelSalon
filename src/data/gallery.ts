export type GalleryCategory = 'all' | 'hair' | 'colour' | 'nails' | 'offers' | 'bridal' | 'academy' | 'salon';

export interface GalleryFilter {
  id: GalleryCategory;
  label: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  objectPosition?: string;
  clientStory?: string;
  serviceRendered?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  thumbnail: string;
  youtubeId?: string;
  src?: string;
  uploadDate: string;
}

export const galleryFilters: GalleryFilter[] = [
  { id: 'all', label: 'All Works' },
  { id: 'hair', label: 'Hair & Styling' },
  { id: 'colour', label: 'Colour & Balayage' },
  { id: 'nails', label: 'Nails & Hands' },
  { id: 'offers', label: 'Special Offers' },
  { id: 'salon', label: 'Salon Ambiance' },
];

export const galleryItems: GalleryItem[] = [
  // REAL CLIENT TRANSFORMATIONS & SALON SERVICES
  {
    id: 'client1-glass-hair',
    title: 'Waist-Length Ultra Glass Mirror Smoothening (Client 1 After)',
    category: 'hair',
    categoryLabel: 'Hair & Styling',
    description: 'Pin-straight liquid glass hair nanoplastia restoring silky lightness and zero frizz to coarse, unruly lengths.',
    image: '/images/real/client1_glass_hair_after.webp',
    alt: 'Real client waist-length pin-straight liquid glass hair transformation at Angels Salon',
    width: 960,
    height: 1280,
    aspectRatio: '1/1',
    objectPosition: 'center 35%',
    clientStory: 'Tired of intense monsoon frizz, client opted for complete smoothing. Result: 100% straight mirror finish lasting 6+ months.',
    serviceRendered: 'Nanoplastia & Liquid Glass Smoothening Treatment',
  },
  {
    id: 'client1-texture-before',
    title: 'Pre-Treatment Coarse Wavy Texture (Client 1 Before)',
    category: 'hair',
    categoryLabel: 'Hair & Styling',
    description: 'Natural coarse, unruly, and unmanageable curl pattern prior to professional salon Nanoplastia treatment.',
    image: '/images/real/client1_texture_before.webp',
    alt: 'Real client wavy textured coarse hair before smoothing treatment at Angels Salon',
    width: 1200,
    height: 1600,
    aspectRatio: '1/1',
    objectPosition: 'center 30%',
    clientStory: 'Pre-service diagnostic photo against white studio wall showing uneven wave texture before smoothing infusion.',
    serviceRendered: 'Hair Health Consultation & Texture Diagnostic',
  },
  {
    id: 'client2-caramel-balayage',
    title: 'Honey & Caramel Dimensional French Balayage (Client 2 After)',
    category: 'colour',
    categoryLabel: 'Colour & Balayage',
    description: 'Warm caramel and golden honey ribbons hand-painted seamlessly over dark Indian hair with soft blowout wave styling.',
    image: '/images/real/client2_caramel_balayage_after.webp',
    alt: 'Real client honey-caramel balayage highlights and styling at Angels Salon Ghatkopar',
    width: 1200,
    height: 1600,
    aspectRatio: '1/1',
    objectPosition: 'center 30%',
    clientStory: 'Client requested warm, low-maintenance dimensional tone. We used bond-protecting plex and tone-on-tone acidic gloss.',
    serviceRendered: 'Hand-Painted Caramel Balayage & Ammonia-Free Gloss',
  },
  {
    id: 'client2-texture-before',
    title: 'Natural Virgin Dark Texture (Client 2 Before)',
    category: 'colour',
    categoryLabel: 'Colour & Balayage',
    description: 'Initial state of dark natural Indian hair before bespoke lightening, sectioning, and balayage application.',
    image: '/images/real/client2_texture_before.webp',
    alt: 'Real client natural dark hair in salon chair before balayage color service',
    width: 1200,
    height: 1600,
    aspectRatio: '1/1',
    objectPosition: 'center 35%',
    clientStory: 'Diagnostic session determining underlying warmth and porosity before color formulation.',
    serviceRendered: 'Pre-Color Diagnostic & Swatch Consultation',
  },
  {
    id: 'interior-wash-lounge',
    title: 'Luxury Ergonomic Backwash & Hair Spa Lounge',
    category: 'hair',
    categoryLabel: 'Hair & Styling',
    description: 'Reclining shampoo lounge designed for deep scalp therapies, clarifying hair washes, and restorative keratin hair baths.',
    image: '/images/real/interior_wash_lounge.webp',
    alt: 'Reclining backwash shampoo chairs and hair spa basins at Angels Salon',
    width: 1200,
    height: 1600,
    aspectRatio: '1/1',
    objectPosition: 'center 50%',
    clientStory: 'Equipped with temperature-calibrated spray nozzles and ergonomic neck cushions for complete relaxation.',
    serviceRendered: 'Luxury Hair Wash & Scalp Therapy Ambiance',
  },
  {
    id: 'interior-nail-bar',
    title: 'Dedicated Backlit Nail Art & Polish Lounge',
    category: 'nails',
    categoryLabel: 'Nails & Hands',
    description: 'Custom illuminated display bar featuring authentic O.P.I, Gelish, and premium long-wear lacquer collections.',
    image: '/images/real/interior_nail_bar.webp',
    alt: 'Custom illuminated nail bar with lacquer collections at Angels Salon Ghatkopar',
    width: 1600,
    height: 1200,
    aspectRatio: '1/1',
    objectPosition: 'center center',
    clientStory: 'Dedicated station for sanitary dry manicures, nail shaping, and long-wear gel lacquer applications.',
    serviceRendered: 'Deluxe Manicure & Nail Bar Ambiance',
  },
  {
    id: 'salon-storefront',
    title: 'Angels Salon & Academy Storefront Architecture',
    category: 'salon',
    categoryLabel: 'Salon Ambiance',
    description: 'Exterior storefront and entrance of Angels Salon & Academy with clean glass facade in Pant Nagar, Ghatkopar East.',
    image: '/images/real/storefront_facade.webp',
    alt: 'Angels Salon and Academy storefront facade with illuminated signage in Ghatkopar East',
    width: 1920,
    height: 1440,
    aspectRatio: '1/1',
    objectPosition: 'center 45%',
    clientStory: 'Convenient ground-floor entrance located in Shival Nagar, Pant Nagar, Ghatkopar East.',
    serviceRendered: 'Storefront & Location',
  },
  {
    id: 'salon-styling-stations',
    title: 'Arched Illuminated Vanity Stations & Mirrors',
    category: 'salon',
    categoryLabel: 'Salon Ambiance',
    description: 'Modern styling floor featuring warm arched mirror backlights, brass sconces, and comfortable hydraulic chairs.',
    image: '/images/real/interior_styling_stations.webp',
    alt: 'Arched illuminated styling mirrors and chairs at Angels Salon Ghatkopar',
    width: 1600,
    height: 1200,
    aspectRatio: '1/1',
    objectPosition: 'center 45%',
    clientStory: 'Designed with shadow-free vanity lighting ensuring precise color reflection and clean cuts.',
    serviceRendered: 'Styling Floor & Vanity Architecture',
  },
  {
    id: 'salon-studio-floor',
    title: 'Full Studio Floor & Wash Dispensary Perspective',
    category: 'salon',
    categoryLabel: 'Salon Ambiance',
    description: 'Clean, sanitized studio floor layout showcasing multiple styling stations and organized dispensary.',
    image: '/images/real/interior_studio_floor.webp',
    alt: 'Full salon studio floor with multiple styling chairs and dispensary at Angels Salon',
    width: 1600,
    height: 1200,
    aspectRatio: '1/1',
    objectPosition: 'center 45%',
    clientStory: 'Autoclaved instruments, spotless tiled floors, and comfortable waiting area for salon clients and students.',
    serviceRendered: 'Salon Cleanliness & Studio Architecture',
  },
  {
    id: 'salon-storefront-signage',
    title: '3D Gold Illuminated Brand Lettering',
    category: 'salon',
    categoryLabel: 'Salon Ambiance',
    description: 'Architectural angle of the gold 3D acrylic signage highlighting Angels Salon & Academy street frontage.',
    image: '/images/real/storefront_signage_gold.webp',
    alt: 'Angels Salon & Academy 3D gold illuminated signage at entrance',
    width: 1600,
    height: 1200,
    aspectRatio: '1/1',
    objectPosition: 'center center',
    clientStory: 'Welcoming clients with clear brand visibility in Pant Nagar, Ghatkopar East.',
    serviceRendered: 'Brand Identity & Facade',
  },

  // OFFICIAL PROMOTIONAL POSTERS & SPECIAL OFFERS
  {
    id: 'gallery-offer-global-highlights-2999',
    title: 'Any One Service: Global, Highlights or Balayage at ₹2,999/-',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Official salon special for full Global colour, dimensional Highlights, or Balayage at ₹2,999/-.',
    image: '/images/real/offer_global_highlights_2999.jpg',
    alt: 'Official Special Offer Any One Service Only 2999 poster at Angels Salon Pantnagar Ghatkopar East',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Claimable via WhatsApp with our senior color specialists.',
    serviceRendered: 'Signature Hair Color Privilege',
  },
  {
    id: 'gallery-offer-hair-40',
    title: 'Raksha Bandhan Flat 40% Off Hair Services',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Official celebration offer granting 40% off on haircuts, smoothening, botox, and styling in Ghatkopar East.',
    image: '/images/real/offer_hair_40.jpg',
    alt: 'Flat 40% Off Hair Services offer banner with Angels Salon logo and contact details',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Claimable directly through WhatsApp concierge for haircut, smoothening, and color appointments.',
    serviceRendered: 'Festive Celebration Package',
  },
  {
    id: 'gallery-offer-skin-30',
    title: 'Flat 30% Off on All Skin Services',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Official skin privilege giving 30% discount on luxury facials, hydra-infusion, de-tan rituals, and clinical aesthetics.',
    image: '/images/real/offer_skin_30.jpg',
    alt: 'Flat 30% Off All Skin Services official poster at Angels Salon',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Save 30% on Korean glass skin rituals and Skeyndor intensive skincare.',
    serviceRendered: 'Skin Care & Aesthetics Privilege',
  },
  {
    id: 'gallery-offer-nails-50',
    title: 'Flat 50% Off on Deluxe Manicure & Pedicure',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Half-price luxury pampering for your hands and feet with Himalayan bath soak and diamond callus buffing.',
    image: '/images/real/offer_nails_50.jpg',
    alt: 'Flat 50% Off Manicure and Pedicure offer poster at Angels Salon',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Indulge in head-to-toe relaxation with 50% off professional nail and foot treatments.',
    serviceRendered: 'Spa Manicure & Pedicure Package',
  },
  {
    id: 'gallery-offer-balayage-2999',
    title: 'Balayage, Highlights & Global Starting from ₹2,999/-',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Official salon special for French balayage, multidimensional foil highlights, and full global color.',
    image: '/images/real/offer_balayage_2999.jpg',
    alt: 'Balayage, Highlights and Global starting from Rs 2999 poster at Angels Salon',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Entry luxury rate for couture hair colour transformations with certified colour specialists.',
    serviceRendered: 'French Balayage & Highlights Special',
  },
  {
    id: 'gallery-offer-rica-wax-1199',
    title: 'Rica Waxing Members Package — ₹1,199/-',
    category: 'offers',
    categoryLabel: 'Special Offers',
    description: 'Exclusive members package: Italian Rica Waxing for Full Hand + Full Leg + Underarms at just ₹1,199/-.',
    image: '/images/real/offer_rica_wax_1199.jpg',
    alt: 'Rica Waxing Full Hand, Leg, Underarms at Rs 1199 Members Package',
    width: 800,
    height: 800,
    aspectRatio: '1/1',
    clientStory: 'Premium Italian liposoluble wax providing pain-minimized, smooth results for Angels salon members.',
    serviceRendered: 'Rica Waxing VIP Members Package',
  },
];

export const videosData: VideoItem[] = [];

