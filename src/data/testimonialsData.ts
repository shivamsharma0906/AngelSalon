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
    service: 'Haircut by Jayesh Kadam',
    image: '/images/real/client_vcut_straight.png',
    imageAlt: 'Layered haircut result at Angels Salon Ghatkopar East',
    whatsappMessage: 'Hi Angels Salon! I read Reshma\'s review regarding a haircut by Jayesh Kadam and would like to book a slot.',
  },
  {
    id: 'featured-2',
    reviewId: 'r1',
    clientName: 'Mamta Bhogle',
    service: 'Hair Botox & Ammonia-Free Colour',
    image: '/images/real/client_straight_glass.png',
    imageAlt: 'Smooth hair finish after Botox treatment at Angels Salon',
    whatsappMessage: 'Hi Angels Salon! I read Mamta\'s review regarding Hair Botox and would like to schedule a consultation.',
  },
  {
    id: 'featured-3',
    reviewId: 'r2',
    clientName: 'Pankaj Kumar',
    service: 'Nail Extensions',
    image: '/images/real/client_almond_nails.png',
    imageAlt: 'Almond gel nail extensions done at Angels Salon',
    whatsappMessage: 'Hi Angels Salon! I read Pankaj\'s review about nail extensions and would like to book an appointment.',
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
