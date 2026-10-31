export interface FeaturedResult {
  id: string;
  reviewId: string;
  clientName: string;
  service: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export const featuredResults: FeaturedResult[] = [
  {
    id: 'featured-1',
    reviewId: 'r4',
    clientName: 'Reshma Shelke',
    service: 'Layered Haircut & Balayage',
    image: '/images/real/client2_caramel_balayage_after.webp',
    imageAlt: 'Real client dimensional honey-caramel balayage at Angel Salon Ghatkopar East',
    whatsappMessage: 'Hi Angel Salon! I saw the dimensional balayage result and would like to book a slot.',
  },
  {
    id: 'featured-2',
    reviewId: 'r1',
    clientName: 'Mamta Bhogle',
    service: 'Liquid Glass Smoothening & Nanoplastia',
    image: '/images/real/client_glass_hair_smooth.webp',
    imageAlt: 'Real client waist-length liquid glass hair Nanoplastia smoothening at Angel Salon',
    whatsappMessage: 'Hi Angel Salon! I saw the liquid glass smoothening result and would like to schedule a consultation.',
  },
  {
    id: 'featured-3',
    reviewId: 'r2',
    clientName: 'Pankaj Kumar',
    service: 'Luxury Hair Wash & Scalp Spa',
    image: '/images/real/interior_wash_lounge.webp',
    imageAlt: 'Reclining shampoo lounge and hair spa basins at Angel Salon',
    whatsappMessage: 'Hi Angel Salon! I would like to book a luxury hair wash and scalp spa appointment.',
  },
];

export interface TestimonialFAQ {
  question: string;
  answer: string;
}

export const testimonialFAQs: TestimonialFAQ[] = [
  {
    question: 'Do I need a patch test before hair colour or smoothing treatments?',
    answer:
      'Yes. For all first-time hair colouring and chemical treatments (such as Nanoplastia or Hair Botox), we advise a skin allergy patch test at least 24 hours prior to your service.',
  },
  {
    question: 'Can I book a bridal makeup trial before confirming my date?',
    answer:
      'Yes. We offer bridal consultations and trial appointments so you can test makeup, hair styling, and saree or dupatta draping before your wedding day.',
  },
  {
    question: 'Do you offer haircuts for children?',
    answer:
      'Yes. Our team provides haircuts for children of all ages in a calm and patient setting.',
  },
  {
    question: 'What payment methods do you accept at the salon?',
    answer:
      'We accept all major UPI apps (Google Pay, PhonePe, Paytm), debit and credit cards, and cash.',
  },
  {
    question: 'What is your cancellation and rescheduling policy?',
    answer:
      'We appreciate notice if your plans change. Please message or call us at least 3 hours prior to your scheduled time so we can offer the slot to another guest. // TODO(owner: confirm deposit and cancellation policy)',
  },
  {
    question: 'Do you accept walk-ins, or should I book in advance?',
    answer:
      'Walk-in clients are welcome subject to stylist availability. For weekends and longer services such as balayage or Nanoplastia, we advise booking in advance.',
  },
];
