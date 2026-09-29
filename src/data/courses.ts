export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface FacultyMember {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  credentials: string;
}

export interface StudentPlacement {
  studentName: string;
  courseCompleted: string;
  batchYear: string;
  placedRole: string;
  salonPlacement: string;
  quote: string;
}

export interface CourseItem {
  id: string;
  name: string;
  duration: string;
  level: 'Beginner to Advanced' | 'Intermediate' | 'Masterclass';
  fee: string;
  feeNote?: string;
  badge?: string;
  overview: string;
  syllabusHighlights: string[];
  certificateInfo: string;
  practicalTrainingHours: string;
  includesKit: boolean;
}

export interface ComparisonTableRow {
  feature: string;
  courseA: string;
  courseB: string;
}

export interface CourseCategoryDetail {
  slug: string;
  name: string;
  shortDescription: string;
  heroHeadline: string;
  heroIntro: string;
  seoTitle: string;
  seoDescription: string;
  courses: CourseItem[];
  comparisonTable: {
    courseAName: string;
    courseBName: string;
    rows: ComparisonTableRow[];
  };
  studentWorkGallery: Array<{ image: string; alt: string; title: string }>;
  faqs: CourseFAQ[];
}

export const courseCategoriesData: CourseCategoryDetail[] = [
  {
    slug: 'hair-courses',
    name: "Professional Hair Courses",
    shortDescription: "Government-recognized diplomas in classic cutting, advanced French balayage, and chemical smoothening with 80% practical training on live models.",
    heroHeadline: "Master the Architecture of Hairdressing",
    heroIntro: "From foundational trichology and Vidal Sassoon haircut geometry to cutting-edge balayage and nano-keratin infusions, our hair diplomas are designed to take you from a passionate beginner to an employable master stylist.",
    seoTitle: "Hairdressing Courses Mumbai | Angels Academy",
    seoDescription: "Certified hairdressing diplomas, balayage masterclasses, and chemical texture courses in Ghatkopar East, Mumbai. Live model practice. Enroll on WhatsApp.",
    courses: [
      {
        id: "comprehensive-hair-diploma",
        name: "Comprehensive Diploma in Professional Hairdressing",
        duration: "3 Months (Fast-Track) / 6 Months (Comprehensive)",
        level: "Beginner to Advanced",
        fee: "₹45,000",
        feeNote: "Flexible 0% EMI options available",
        badge: "Most Popular",
        overview: "Our flagship program designed to take you from foundational hair science to master cutter and colourist status.",
        syllabusHighlights: [
          "Trichology, scalp disorders, and hair anatomy",
          "Vidal Sassoon classic geometry: blunt, graduation, layers",
          "Men's classic barbering, skin fades & beard sculpting",
          "Colour theory, developer volumes, grey blending, and global tinting",
          "French Balayage, Ombré, Highlights, and Toners",
          "Chemical texture: Keratin, Cysteine, Botox & Smoothening",
          "Client consultation, salon hygiene, and retail upselling",
        ],
        certificateInfo: "Angels Master Hairdressing Diploma + Government Recognized Skill Certification",
        practicalTrainingHours: "240+ Hours Practical Studio Work",
        includesKit: true,
      },
      {
        id: "advance-chemical-treatments-bootcamp",
        name: "Masterclass in Hair Botox, Keratin & Nanoplastia",
        duration: "2 Weeks (Bootcamp)",
        level: "Masterclass",
        fee: "₹18,000",
        feeNote: "Ideal for working stylists upgrading chemical skills",
        badge: "Fast-Track",
        overview: "Master modern protein and keratin infusions without chemical breakage, learning how to safely restore compromised hair.",
        syllabusHighlights: [
          "Chemical formulation differences (Formaldehyde-free vs. Glyoxylic)",
          "Hair porosity diagnostics & strand test protocols",
          "Nanoplastia, Keratin, and Botox thermal sealing technique",
          "Aftercare regimen guidance and troubleshooting post-treatment reversion",
        ],
        certificateInfo: "Advanced Chemical Texture & Smoothening Certification",
        practicalTrainingHours: "40 Hours Direct Application",
        includesKit: false,
      },
    ],
    comparisonTable: {
      courseAName: "Comprehensive Diploma (3-6 Months)",
      courseBName: "Chemical Bootcamp (2 Weeks)",
      rows: [
        { feature: "Target Audience", courseA: "Beginners entering salon careers", courseB: "Working stylists seeking upgrades" },
        { feature: "Core Focus", courseA: "Cuts, Colour, Balayage, Styling & Textures", courseB: "Keratin, Botox, Smoothening Only" },
        { feature: "Live Client Models", courseA: "100+ Supervised Client Sessions", courseB: "15 Supervised Live Treatments" },
        { feature: "Styling Tool Kit", courseA: "Included Free (Japanese shears + tools)", courseB: "Product samples provided" },
        { feature: "Placement Support", courseA: "100% Direct Salon Interview Guarantee", courseB: "Certification & alumni network" },
      ],
    },
    studentWorkGallery: [
      { image: "/images/academy_training.jpg", alt: "Students cutting hair in academy studio", title: "Live Model Scissor Training" },
      { image: "/images/gallery_hair.jpg", alt: "Student layered haircut result", title: "Graduate Precision Layering" },
      { image: "/images/hero_bg.jpg", alt: "Student balayage result", title: "Graduate Freehand Balayage" },
      { image: "/images/about_salon.jpg", alt: "Director guiding student technique", title: "One-on-One Director Mentorship" },
    ],
    faqs: [
      {
        question: "Do I need any prior salon experience to join the Comprehensive Diploma?",
        answer: "No prior experience is necessary. We start with foundational hair anatomy, shear handling, and ergonomics before progressing into advanced colour and chemical artistry.",
      },
      {
        question: "Are live models provided by the academy?",
        answer: "Yes, Angels Academy arranges live client models for our students so you gain real salon confidence before graduating.",
      },
      {
        question: "Is this certificate valid outside India?",
        answer: "Yes, our course diplomas are ISO 9001 certified and recognized across leading salons in India, the UAE, and international cruise liners.",
      },
    ],
  },
  {
    slug: 'makeup-courses',
    name: "Professional Makeup Courses",
    shortDescription: "Advance bridal couture, HD airbrush mechanics, international eye artistry, and traditional saree draping masterclasses.",
    heroHeadline: "Command High-Ticket Bridal & Editorial Bookings",
    heroIntro: "Learn the secrets behind long-lasting, camera-ready bridal transformations. Master colour theory, skin priming, HD airbrush application, Nauvari and modern saree draping, and professional portfolio photography.",
    seoTitle: "Bridal Makeup Courses Mumbai | Angels Academy",
    seoDescription: "Advance bridal couture makeup, HD airbrush techniques, and traditional saree draping courses in Ghatkopar East, Mumbai. Enroll on WhatsApp.",
    courses: [
      {
        id: "bridal-makeup-hair-mastery",
        name: "Advance Bridal Couture & HD Makeup Artistry",
        duration: "6 Weeks (Intensive)",
        level: "Intermediate",
        fee: "₹35,000",
        feeNote: "All luxury cosmetics provided during studio sessions",
        badge: "High Demand",
        overview: "Specialized training for artists who wish to command premium bridal bookings and high-fashion editorial shoots.",
        syllabusHighlights: [
          "Skin undertones, priming, colour correction & camouflage",
          "HD brush techniques vs. Airbrush mechanics",
          "Traditional & contemporary bridal eye artistry (smokey, halo, cut crease)",
          "Saree draping (Nauvari, Gujarati, South Indian, Modern Lehengas)",
          "Bridal floral hair ornamentation and heavy veil anchoring",
          "Social media portfolio lighting and client booking etiquette",
        ],
        certificateInfo: "Certified Bridal Couture Makeup & Hair Specialist Diploma",
        practicalTrainingHours: "90+ Hours Intensive Lab",
        includesKit: true,
      },
      {
        id: "nail-technology-artistry",
        name: "Professional Nail Extension & Russian Artistry",
        duration: "4 Weeks",
        level: "Beginner to Advanced",
        fee: "₹22,000",
        feeNote: "Includes complete UV lamp and acrylic drill kit",
        badge: "Popular Add-on",
        overview: "Step into the fast-growing luxury nail sector. Learn acrylic sculpting, gel extensions, and complex hand-painted 3D nail art.",
        syllabusHighlights: [
          "Nail anatomy, sanitization, and fungal disorder recognition",
          "Dry Russian E-file manicure technique",
          "Acrylic tip overlays and sculptural form extensions",
          "Polygel sculpting and hard gel builder mastery",
          "Chrome, ombre sponge, encapsulation, and rhinestone embellishments",
        ],
        certificateInfo: "Professional Nail Technologist Certificate",
        practicalTrainingHours: "60 Hours Hands-on Practice",
        includesKit: true,
      },
    ],
    comparisonTable: {
      courseAName: "Advance Bridal Couture (6 Weeks)",
      courseBName: "Nail Technology (4 Weeks)",
      rows: [
        { feature: "Career Focus", courseA: "High-ticket bridal & event makeup artist", courseB: "Salon & freelance nail technician" },
        { feature: "Kit Included", courseA: "Professional brush set & vanity kit", courseB: "UV/LED Lamp, E-file drill & gels" },
        { feature: "Practical Labs", courseA: "Airbrush, HD base, Saree draping, Hairstyles", courseB: "Russian manicure, Acrylic & Gel art" },
        { feature: "Batch Size", courseA: "Max 8 students for personalized coaching", courseB: "Max 6 students per batch" },
        { feature: "Income Potential", courseA: "₹15,000 to ₹35,000 per bride booked", courseB: "₹2,500 to ₹4,500 per nail client" },
      ],
    },
    studentWorkGallery: [
      { image: "/images/gallery_bridal.jpg", alt: "Student bridal look with traditional veil", title: "Graduate Bridal Look" },
      { image: "/images/gallery_makeup.jpg", alt: "Smokey eye makeup look by student", title: "Graduate Smokey Eye Artistry" },
      { image: "/images/gallery_nails.jpg", alt: "Russian gel nail extensions by student", title: "Russian Gel Extension Work" },
      { image: "/images/academy_training.jpg", alt: "Students in practical makeup studio", title: "Hands-on Practical Lab" },
    ],
    faqs: [
      {
        question: "Are luxury makeup products provided during the course?",
        answer: "Yes, students have full access to our academy's professional makeup vanity featuring MAC, Huda Beauty, Kryolan, and Anastasia Beverly Hills during classes.",
      },
      {
        question: "Do you teach saree draping and bridal hair styling as well?",
        answer: "Yes, our Bridal Couture course includes full modules on traditional Nauvari, Gujarati, South Indian draping, heavy dupatta double-pinning, and real flower hair settings.",
      },
      {
        question: "How do I build a portfolio to attract bridal clients?",
        answer: "Every student participates in an end-of-course professional studio photoshoot with professional models, lighting, and high-res photography to launch their Instagram portfolio.",
      },
    ],
  },
];

export function getCourseCategoryBySlug(slug: string): CourseCategoryDetail | undefined {
  return courseCategoriesData.find((cat) => cat.slug === slug);
}

// Backward compatible data exports for Overview & Teaser
export const academyData = {
  heroTagline: "Launch Your Career as an Elite Hair & Beauty Stylist",
  heroDescription: "Government-recognized diplomas and international syllabus training at Angels Academy, Ghatkopar East. Learn from industry masters with 80% hands-on live client practice.",
  whyLearnPoints: [
    {
      title: "80% Practical On Live Models",
      description: "We believe real confidence comes from touch. Our students complete over 100+ live client supervised services before graduation.",
    },
    {
      title: "Government & International Recognition",
      description: "Receive ISO-certified and government-authorized course completion diplomas valid for domestic salon careers and overseas employment.",
    },
    {
      title: "100% Placement Assistance",
      description: "Direct campus interviews and recommendations to leading luxury salon chains across Mumbai, Pune, and international cruise lines.",
    },
    {
      title: "Complimentary Professional Styling Kit",
      description: "Full professional grade toolkit provided upon enrolment, including Japanese steel shears, professional manikins, and styling tools.",
    },
  ],
  courses: courseCategoriesData.flatMap((c) => c.courses),
  faculty: [
    {
      name: "Master Stylist & Director",
      role: "Head of Hair Education",
      experience: "14+ Years Experience",
      specialization: "Structural Hair Architecture & Advanced Balayage",
      credentials: "Trained by L'Oréal Professionnel Paris & Toni&Guy Academy",
    },
    {
      name: "Senior Bridal Designer",
      role: "Lead Makeup & Draping Mentor",
      experience: "10+ Years Experience",
      specialization: "HD Airbrush & Traditional Couture Bridal",
      credentials: "Certified International Makeup Artist",
    },
    {
      name: "Chemical Texture Specialist",
      role: "Technical Hair Smoothening Instructor",
      experience: "8+ Years Experience",
      specialization: "Nanoplastia & Molecular Hair Reconstruction",
      credentials: "Olaplex & Kérastase Certified Specialist",
    },
  ],
  placements: [
    {
      studentName: "Pooja Sharma",
      courseCompleted: "Comprehensive Diploma in Professional Hairdressing",
      batchYear: "2025 Graduate",
      placedRole: "Senior Hair Stylist",
      salonPlacement: "Leading Luxury Salon, Bandra",
      quote: "The hands-on client practice at Angels Academy gave me the exact confidence I needed to ace my senior stylist practical interview on the first attempt.",
    },
    {
      studentName: "Sneha Patel",
      courseCompleted: "Advance Bridal Couture & HD Makeup Artistry",
      batchYear: "2025 Graduate",
      placedRole: "Freelance Bridal Artist",
      salonPlacement: "Self-Employed (Over 40+ Destination Brides Booked)",
      quote: "Angels didn't just teach me makeup; they taught me how to present myself, drape heavy bridal sarees swiftly, and price my services with authority.",
    },
    {
      studentName: "Amit Verma",
      courseCompleted: "Comprehensive Diploma in Professional Hairdressing",
      batchYear: "2024 Graduate",
      placedRole: "Creative Colourist",
      salonPlacement: "Angels Salon Flagship, Ghatkopar",
      quote: "Learning colour theory here unlocked an entirely new career for me. The directors care deeply about each student's personal growth.",
    },
  ],
  faqs: [
    {
      question: "Are there any prior qualifications required to enroll?",
      answer: "No prior beauty experience is needed for our beginner-to-advanced diploma programs. We start from foundational hair biology and build upwards. All you need is passion and dedication.",
    },
    {
      question: "Do you provide live models for practical practice?",
      answer: "Yes. While students begin foundational scissor holds on professional manikins, over 80% of training time is conducted on live models in our supervised studio under the master instructor's direct guidance.",
    },
    {
      question: "Is the course diploma recognized outside Mumbai?",
      answer: "Yes, our diplomas are ISO 9001 certified and recognized across top salon chains across India, the Middle East, and overseas cruise lines.",
    },
    {
      question: "Are flexible installment or EMI options available for course fees?",
      answer: "Yes, we offer zero-interest flexible installment plans across 2 to 4 months so students can comfortably manage their investment in education.",
    },
    {
      question: "What happens after graduation? Do you guarantee salon interviews?",
      answer: "We provide 100% placement support. Top salon brands regularly visit Angels Academy for campus recruitment, and top-performing students are offered direct employment at Angels Salon branches.",
    },
  ],
};
