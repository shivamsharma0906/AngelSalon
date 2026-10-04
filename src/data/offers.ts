export interface SpecialOfferItem {
  id: string;
  title: string;
  badge: string;
  discount: string;
  description: string;
  image: string;
  alt: string;
  terms: string;
  whatsappMessage: string;
  active: boolean;
  /** ISO date string or undefined if ongoing until revoked */
  expiresAt?: string;
}

export const specialOffersData: SpecialOfferItem[] = [
  {
    id: 'offer-hair-40',
    title: 'Raksha Bandhan & Festive Hair Celebration',
    badge: 'Limited Time Festival Offer',
    discount: 'Flat 40% OFF',
    description: 'Enjoy 40% off on all signature haircuts, smoothening rituals, hair botox, and styling sessions at our Ghatkopar East salon.',
    image: '/images/real/offer_hair_40.jpg',
    alt: 'Raksha Bandhan Flat 40% Off Hair Services offer banner at Angels Salon',
    terms: 'Valid on hair services. Prior booking recommended.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 40% Off Hair Services* offer. Please share available slots!',
    // Expired festive offer; marked inactive
    active: false,
    expiresAt: '2026-08-31T23:59:59Z',
  },
  {
    id: 'offer-skin-30',
    title: 'Radiant Skin & Aesthetic Glow Rituals',
    badge: 'Skincare Privilege',
    discount: 'Flat 30% OFF',
    description: 'Indulge in transformative facial therapies, hydra-infusion, enzyme de-tan, and aesthetic skincare at an exclusive 30% saving.',
    image: '/images/real/offer_skin_30.jpg',
    alt: 'Flat 30% Off All Skin Services official banner at Angels Salon',
    terms: 'Valid on all skin therapies & facials. Prior appointment recommended.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 30% Off Skin Services* offer. When can I book a session?',
    active: true,
    // TODO(owner): Confirm validity and expiry date for the 30% skin privilege
    expiresAt: undefined,
  },
  {
    id: 'offer-nails-50',
    title: 'Luxury Manicure & Spa Pedicure',
    badge: 'Hands & Feet Deluxe',
    discount: 'Flat 50% OFF',
    description: 'Treat your hands and feet to herbal Himalayan soak, gentle cuticle architecture, diamond exfoliation, and premium long-wear lacquer at half price.',
    image: '/images/real/offer_nails_50.jpg',
    alt: 'Flat 50% Off Manicure and Pedicure offer banner at Angels Salon',
    terms: 'Valid on deluxe manicure & pedicure bookings.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Flat 50% Off Manicure & Pedicure* offer. Please reserve a slot for me.',
    active: true,
    // TODO(owner): Confirm validity and expiry date for the 50% manicure & pedicure offer
    expiresAt: undefined,
  },
  {
    id: 'offer-balayage-2999',
    title: 'French Balayage, Highlights & Global Colour',
    badge: 'Couture Colour Special',
    discount: 'Starting ₹2,999/-',
    description: 'Transform your look with sun-kissed French freehand balayage, dimensional foil highlights, or rich global tints starting at just ₹2,999/-.',
    image: '/images/real/offer_balayage_2999.jpg',
    alt: 'Balayage Highlights and Global starting 2999 offer poster Angels Salon',
    terms: 'T&C Apply. Starting rate for short/medium length. Prior appointment recommended.',
    whatsappMessage: 'Hi Angels Salon! I would like to claim the *Balayage, Highlights & Global Colour Special (from ₹2,999)*. Please share available slots!',
    active: true,
    // TODO(owner): Confirm validity and expiry date for the ₹2,999 balayage package
    expiresAt: undefined,
  },
  {
    id: 'offer-rica-wax-1199',
    title: 'Rica Waxing & Grooming Privilege Package',
    badge: 'Members Grooming Package',
    discount: 'Package ₹1,199/-',
    description: 'Complete smooth skin ritual: full arms, full legs, and underarms Rica waxing with skin-soothing post-depilatory lotion.',
    image: '/images/real/offer_rica_wax_1199.jpg',
    alt: 'Rica Waxing Full Hand, Leg, Underarms at Rs 1199 Members Package poster',
    terms: 'Valid for full arms, full legs, underarms Rica waxing.',
    whatsappMessage: 'Hi Angels Salon! I would like to book the *Rica Waxing Package for ₹1,199*. Please share available time slots.',
    active: true,
    // TODO(owner): Confirm validity and expiry date for the ₹1,199 Rica package
    expiresAt: undefined,
  },
];

/**
 * Returns only currently active and non-expired offers.
 */
export function getActiveOffers(): SpecialOfferItem[] {
  const now = new Date().getTime();
  return specialOffersData.filter((offer) => {
    if (!offer.active) return false;
    if (offer.expiresAt) {
      const expiry = new Date(offer.expiresAt).getTime();
      if (!isNaN(expiry) && expiry < now) {
        return false;
      }
    }
    return true;
  });
}
