import { googleSummary } from './reviews';

export interface BranchAddress {
  street: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formatted: string;
}

export interface BranchHoursDetail {
  days: string;
  time: string;
}

export interface Branch {
  id: string;
  name: string;
  branchType: 'flagship' | 'studio';
  isHeadquarters: boolean;
  address: BranchAddress;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  hours: string;
  hoursDetail: BranchHoursDetail[];
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TrustStat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'youtube' | 'whatsapp';
  label: string;
  url: string;
  ariaLabel: string;
}

export interface FounderStory {
  title: string;
  subtitle: string;
  quote: string;
  paragraphs: string[];
  signatureName: string;
  signatureRole: string;
  image: string;
  imageAlt: string;
  yearsExperience: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  contact: {
    email: string;
    phoneDisplay: string;
    phoneRaw: string;
    whatsappNumber: string;
  };
  branches: Branch[];
  trustStats: TrustStat[];
  socialLinks: SocialLink[];
  founder: FounderStory;
  facilities: Array<{
    name: string;
    icon: string;
  }>;
  navigation: Array<{
    label: string;
    path: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Angels Salon & Academy",
  shortName: "Angels",
  tagline: "Elevating Personal Artistry & Professional Mastery",
  description: "Premier luxury hair salon, bridal makeup destination, and government-recognized beauty academy in Ghatkopar East, Mumbai.",
  url: "https://angelssalon.com",
  logo: {
    src: "/logo.jpg",
    alt: "Angels Salon & Academy Gold Monogram Emblem",
    width: 180,
    height: 180,
  },
  contact: {
    email: "info@angelssalon.com",
    phoneDisplay: "073033 12054",
    phoneRaw: "07303312054",
    whatsappNumber: "917303312054",
  },
  branches: [
    {
      id: "ghatkopar",
      name: "Ghatkopar East (Salon & Academy)",
      branchType: "flagship",
      isHeadquarters: true,
      address: {
        street: "29/843, Shival Nagar, Pant Nagar",
        area: "Ghatkopar East (Beside Kirti Computer Institute)",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400075",
        country: "India",
        formatted: "29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075",
      },
      phone: "073033 12054",
      phoneRaw: "07303312054",
      whatsappNumber: "917303312054",
      hours: "Open Daily: 9:30 AM – 9:00 PM",
      hoursDetail: [
        { days: "Monday – Sunday", time: "9:30 AM – 9:00 PM" },
        { days: "Public Holidays", time: "Open regular hours" },
      ],
      googleMapsUrl: "https://www.google.com/maps/place/Angel+salon+%26+Academy/@19.0850718,72.9121454,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c7a56b0b4e27:0x2f5182fec860269a!8m2!3d19.0850718!4d72.9121454!16s%2Fg%2F11rl9hc09h!18m1!1e1?entry=ttu",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.514507074366!2d72.9121454!3d19.085071799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7a56b0b4e27%3A0x2f5182fec860269a!2sAngel%20salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1790707768712!5m2!1sen!2sin",
      coordinates: {
        lat: 19.0850718,
        lng: 72.9121454,
      },
    },
  ],
  trustStats: [
    {
      id: "experience",
      value: "10+",
      label: "Years of Excellence",
      description: "Setting high-fashion beauty benchmarks in Mumbai",
    },
    {
      id: "clients",
      value: "15,000+",
      label: "Delighted Clients",
      description: "Dedicated to transformative hair & beauty rituals",
    },
    {
      id: "academy",
      value: "500+",
      label: "Academy Graduates",
      description: "Professionally trained & certified beauty artists",
    },
    {
      id: "rating",
      value: `${googleSummary.rating}★`,
      label: "Google Rating",
      description: `Based on ${googleSummary.count} verified reviews on Google Maps`,
    },
  ],
  socialLinks: [
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/angelsalon_ghatkopar?igsh=MTY4M2pxcWNheHRsOA%3D%3D",
      ariaLabel: "Follow Angels Salon & Academy on Instagram",
    },
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/people/Angel-Salon-Academy/100069843930101/?ref=NONE_xav_ig_profile_page_web#",
      ariaLabel: "Visit Angels Salon & Academy on Facebook",
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/917303312054",
      ariaLabel: "Chat with Angels Salon Concierge on WhatsApp",
    },
  ],
  founder: {
    title: "About Angel's Salon",
    subtitle: "A Premium Unisex Sanctuary in Ghatkopar East",
    quote: "Customer satisfaction, hygiene, and attention to detail are at the heart of everything we do.",
    paragraphs: [
      "Angel's Salon is a premium unisex salon in Ghatkopar East, Mumbai, dedicated to helping you look and feel your best. Conveniently located in Shival Nagar beside Kirti Computer Institute, we offer a complete range of professional hair, skin, beauty, and grooming services for both men and women. Our experienced team combines expert techniques with high-quality products to deliver personalized services in a clean, comfortable, and welcoming environment.",
      "Whether you're looking for a stylish haircut, hair coloring, smoothening, facials, bridal or party makeup, skincare treatments, or regular grooming, we ensure every visit is relaxing and satisfying. We believe every client deserves exceptional service and a rejuvenating salon experience tailored to their individual style and preferences.",
      "Visit us any day of the week from 9:30 AM to 9:00 PM and experience professional beauty and grooming services that leave you looking confident and refreshed."
    ],
    signatureName: "The Angels Leadership & Educators",
    signatureRole: "Artistic Directors & Master Stylists",
    image: "/images/real/client_bob_cut.jpg",
    imageAlt: "Master hair stylist creating bespoke look at Angels Salon",
    yearsExperience: "10+",
  },
  facilities: [
    { name: "Male Services", icon: "male" },
    { name: "Female Services", icon: "female" },
    { name: "Kids Services", icon: "kids" },
    { name: "Wifi", icon: "wifi" },
    { name: "Parking", icon: "parking" },
    { name: "Air Conditioning", icon: "ac" },
    { name: "Wheelchair Access", icon: "wheelchair" },
    { name: "Beverages", icon: "beverages" },
    { name: "Food", icon: "food" },
    { name: "Toilets", icon: "toilets" },
    { name: "Lockers", icon: "lockers" },
  ],
  navigation: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Style Gallery", path: "/style-gallery" },
    { label: "Academy", path: "/academy" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Products", path: "/products" },
    { label: "Contact Us", path: "/contact" },
  ],
};
