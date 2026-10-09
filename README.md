# Angels Salon & Academy — Official Website

> A production-quality, multi-page web application for **Angels Salon & Academy**, Ghatkopar East, Mumbai. Built with Vite, React 18, TypeScript (strict mode), Tailwind CSS, React Router, and `react-helmet-async`.

---

## 1. Tech Stack & 7-Page Architecture

- **Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom luxury theme tokens
- **Routing**: [React Router DOM v6](https://reactrouter.com/) (Code-split with `React.lazy` and `Suspense`)
- **Pages (7 Dedicated Routes)**:
  1. **Home** (`/`): Luxury hero with above-the-fold mobile CTAs, trust scoreboard, service preview, about founder teaser, academy teaser, style gallery preview, verified reviews, branch cards with Google Maps, and final CTA banner.
  2. **About** (`/about`): In-depth brand heritage, founder philosophy, four pillars of excellence (hospital-grade sterilization, certified master stylists, luxury global partners, inclusive haven), milestones timeline, and salon interior walkthrough.
  3. **Services** (`/services`): Filterable category tabs (Women's Hair, Men's Hair, Colour & Balayage, Treatments & Spa, Extensions, Bridal & Makeup, Skincare & Nails), starting prices, durations, and contextual "Book this on WhatsApp" buttons.
  4. **Style Gallery** (`/gallery`): High-resolution portfolio with category filters (Hair & Styling, Colour & Balayage, Bridal Couture, Academy Students, Salon Ambiance), fixed 1:1 aspect ratios, and accessible modal Lightbox with keyboard navigation.
  5. **Academy** (`/academy`): Professional diploma programs, syllabus highlights, certification details, tuition fees, student placement stories, faculty directory, and accessible FAQ accordion.
  6. **Testimonials** (`/testimonials`): Comprehensive review scoreboard (4.9/5 based on 250+ reviews), star distribution bars, category filter tabs, verified review cards, and direct Google Review links.
  7. **Contact Us** (`/contact`): Branch locator, click-to-call, opening hours, interactive Google Map embeds, and an appointment booking enquiry form that prefills WhatsApp.
- **SEO & Structured Data**: `react-helmet-async` with automated JSON-LD schemas (`HairSalon`, `LocalBusiness`, `Course`, `FAQPage`)
- **Icons & Animation**: Lightweight inline SVGs and performant hardware-accelerated CSS/Tailwind animations (WCAG AA compliant, respects `prefers-reduced-motion`)

---

## 2. Brand & Theme Tokens

- **Ink (Background)**: `#0A0A0A`
- **Surface (Cards/Panels)**: `#141414` (Elevated: `#1C1C1C`)
- **Border**: `#262626` (Gold Hairline: `rgba(201, 162, 39, 0.25)`)
- **Gold (Sampled from Logo)**: `#C9A227` (Hover: `#DEB843`)
- **Typography**: 
  - Headings: *Cormorant Garamond* (Google Fonts serif)
  - Body: *Inter* (Google Fonts sans-serif)

---

## 3. How to Edit Business Content (Zero-Code Maintenance)

All business details, pricing, courses, and customer reviews live in typed files under `src/data/`. The salon owner or staff can update information directly without touching UI components:

| File | What can be edited |
| :--- | :--- |
| `src/data/site.ts` | Salon name, phone numbers, branch addresses, opening hours, Google Maps links, social media handles, and founder story. |
| `src/data/services.ts` | Service categories, treatment names, descriptions, starting prices, durations, and bullet highlights. |
| `src/data/courses.ts` | Academy courses, fees, syllabus modules, faculty members, alumni placement stories, and FAQs. |
| `src/data/gallery.ts` | Portfolio images, categories (Hair, Colour, Bridal, Academy), alt text, and captions. |
| `src/data/testimonials.ts`| Customer reviews, 5-star ratings, services taken, and reviewer locations. |

---

## 4. WhatsApp Booking Integration

All appointment booking actions and inquiry buttons route directly through `src/lib/whatsapp.ts`.
- Format: `https://wa.me/917303312054?text=<encoded-message>`
- Opened with `rel="noopener noreferrer"`
- Pre-fills contextually based on:
  - Specific service name selected
  - Academy course selected
  - Branch location selected
  - Appointment inquiry form fields

---

## 5. Local Setup & Development

### Prerequisites
- Node.js (v20 or higher recommended, see `.nvmrc`)
- npm or yarn

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build & Typecheck
```bash
# Runs TypeScript strict type-checking and builds optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select the repository.
4. Set **Framework Preset** to `Vite`.
5. Under **Root Directory**, set `./` (or `AngelSalon-main` if nested).
6. Click **Deploy**. Vercel will build and serve your site globally on high-speed edge CDN.

> **Note on Client-Side Routing**: A `vercel.json` rewrite is included to route all traffic to `index.html`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Deploying to Netlify
1. Log into [Netlify](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Netlify will use the `public/_redirects` file (`/* /index.html 200`) for seamless client-side routing.

---

## 7. Branches & Contact Info

- **Flagship Salon & Academy**: 29/843, Shival Nagar, Pant Nagar, Ghatkopar East, Mumbai, Maharashtra 400075
- **Chembur Studio**: Shop 14, Heritage Avenue, Near Diamond Garden, Chembur, Mumbai 400071
- **Phone**: 073033 12054
- **WhatsApp**: +91 73033 12054
- **Email**: info@angelssalon.com
