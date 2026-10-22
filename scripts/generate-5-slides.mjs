import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const BRAIN_DIR = 'C:/Users/SHIVAM/.gemini/antigravity-ide/brain/6a8dac93-cfd0-4ac8-bdcd-423ece6840fa';

const SOURCES = {
  slide3: path.join(PROJECT_ROOT, 'public/images/real/interior_spa_room.webp'),
  slide4: path.join(BRAIN_DIR, 'interior_nail_bar_clean_1792690637407.jpg'),
  slide5: path.join(BRAIN_DIR, 'slide4_styling_clean_1792690613459.jpg'),
};

const SIZES = [
  { name: 'desktop_1920', width: 1920 },
  { name: 'desktop_1280', width: 1280 },
  { name: 'desktop_768', width: 768 },
  { name: 'mobile_768', width: 768 },
  { name: 'mobile_480', width: 480 },
];

async function generateAllSlides() {
  console.log('Generating 16:9 responsive assets for all 5 hero slides...');

  // Slide 1: Storefront
  const slide1Src = path.join(BRAIN_DIR, 'storefront_clean_1792689721975.jpg');
  for (const s of SIZES) {
    const dest = path.join(PROJECT_ROOT, 'public/images/hero-carousel', `slide1_${s.name}.webp`);
    await sharp(slide1Src)
      .resize({ width: s.width, withoutEnlargement: false })
      .webp({ quality: 88, effort: 4 })
      .toFile(dest);
    console.log(`  -> Created ${path.relative(PROJECT_ROOT, dest)}`);
  }

  // Slide 2: Wash Lounge
  const slide2Src = path.join(BRAIN_DIR, 'slide2_wash_clean_1792690579741.jpg');
  for (const s of SIZES) {
    const dest = path.join(PROJECT_ROOT, 'public/images/hero-carousel', `slide2_${s.name}.webp`);
    await sharp(slide2Src)
      .resize({ width: s.width, withoutEnlargement: false })
      .webp({ quality: 88, effort: 4 })
      .toFile(dest);
    console.log(`  -> Created ${path.relative(PROJECT_ROOT, dest)}`);
  }

  // Slide 3: Bridal & Spa Suite (cropped to 16:9 focusing on vanity mirror, sink, lit candle, teal products)
  const slide3Src = path.join(PROJECT_ROOT, 'public/images/real/interior_spa_room.webp');
  for (const s of SIZES) {
    const dest = path.join(PROJECT_ROOT, 'public/images/hero-carousel', `slide3_${s.name}.webp`);
    await sharp(slide3Src)
      .resize(s.width, Math.round(s.width * 9 / 16), { fit: 'cover', position: 'center' })
      .webp({ quality: 88, effort: 4 })
      .toFile(dest);
    console.log(`  -> Created ${path.relative(PROJECT_ROOT, dest)}`);
  }

  // Slide 4: Nail Bar (custom 16:9 crop eliminating ceiling conduits and lower table clutter)
  const slide4Src = path.join(BRAIN_DIR, 'interior_nail_bar_clean_1792690637407.jpg');
  const nailBuffer = await sharp(slide4Src)
    .extract({ left: 0, top: 200, width: 896, height: 504 })
    .toBuffer();
  for (const s of SIZES) {
    const dest = path.join(PROJECT_ROOT, 'public/images/hero-carousel', `slide4_${s.name}.webp`);
    await sharp(nailBuffer)
      .resize({ width: s.width, withoutEnlargement: false })
      .webp({ quality: 88, effort: 4 })
      .toFile(dest);
    console.log(`  -> Created ${path.relative(PROJECT_ROOT, dest)}`);
  }

  // Slide 5: Professional Academy Styling Floor
  const slide5Src = path.join(BRAIN_DIR, 'slide4_styling_clean_1792690613459.jpg');
  for (const s of SIZES) {
    const dest = path.join(PROJECT_ROOT, 'public/images/hero-carousel', `slide5_${s.name}.webp`);
    await sharp(slide5Src)
      .resize({ width: s.width, withoutEnlargement: false })
      .webp({ quality: 88, effort: 4 })
      .toFile(dest);
    console.log(`  -> Created ${path.relative(PROJECT_ROOT, dest)}`);
  }

  console.log('=== All 5 hero slides successfully generated in pristine 16:9 format! ===');
}

async function main() {
  await generateAllSlides();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
