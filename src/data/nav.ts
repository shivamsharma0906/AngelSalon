export interface NavSubItem {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  isAllLink?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  children?: NavSubItem[];
  ariaLabel?: string;
}

export const navigationData: NavItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
    hasDropdown: true,
    ariaLabel: "Services submenu",
    children: [
      {
        label: "All Services",
        path: "/services",
        description: "Explore our complete menu of salon services",
        isAllLink: true,
      },
      {
        label: "Women's Haircut & Style",
        path: "/services/womens-haircut-and-style",
        description: "Designer haircuts, blowouts & bespoke styling",
      },
      {
        label: "Women's Hair Colour",
        path: "/services/womens-hair-colour",
        description: "French balayage, global tints & dimensional highlights",
      },
      {
        label: "Men's Services",
        path: "/services/mens-services",
        description: "Executive haircuts, beard contouring & styling",
      },
      {
        label: "Hair Extensions",
        path: "/services/hair-extensions",
        description: "Seamless tape-in & micro keratin bond extensions",
      },
      {
        label: "Hair Treatments",
        path: "/services/hair-treatments",
        description: "Brazilian keratin, Olaplex molecular repair & spas",
      },
      {
        label: "Bridal Makeup",
        path: "/services/bridal-makeup",
        description: "Royal couture bridal packages & HD party makeup",
      },
      {
        label: "Skin Care & Facials",
        path: "/services/skin-care",
        description: "Korean glass facials, Hydra treatments & body spas",
      },
      {
        label: "Nails & Hand-Foot Care",
        path: "/services/nails",
        description: "Deluxe manicures, pedicures & Hand-Feet facials",
      },
    ],
  },
  {
    label: "Style Gallery",
    path: "/style-gallery",
    hasDropdown: true,
    ariaLabel: "Style Gallery submenu",
    children: [
      {
        label: "Recent Work",
        path: "/style-gallery/recent-work",
        description: "Fresh transformations and signature before & afters",
      },
      {
        label: "Pictures",
        path: "/style-gallery/pictures",
        description: "High-resolution curated portfolio across all styles",
      },
      {
        label: "Videos",
        path: "/style-gallery/videos",
        description: "Styling reels, tutorials, and salon walkthroughs",
      },
    ],
  },
  {
    label: "Academy",
    path: "/academy",
    hasDropdown: true,
    ariaLabel: "Academy submenu",
    children: [
      {
        label: "Hair Courses",
        path: "/academy/hair-courses",
        description: "Comprehensive hairdressing & chemical texture diplomas",
      },
      {
        label: "Makeup Courses",
        path: "/academy/makeup-courses",
        description: "Advance bridal couture, HD makeup & draping mastery",
      },
    ],
  },
  {
    label: "Testimonials",
    path: "/testimonials",
  },

  {
    label: "Contact Us",
    path: "/contact",
  },
];
