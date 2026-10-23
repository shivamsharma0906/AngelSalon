import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const BRAIN_DIR = 'C:/Users/SHIVAM/.gemini/antigravity-ide/brain/6a8dac93-cfd0-4ac8-bdcd-423ece6840fa';

const CLEANED_IMAGES = {
  storefront: path.join(BRAIN_DIR, 'storefront_clean_1792689721975.jpg'),
  signage: path.join(BRAIN_DIR, 'signage_gold_clean_1792690547526.jpg'),
  washLounge: path.join(BRAIN_DIR, 'slide2_wash_clean_1792690579741.jpg'),
  stylingFloor: path.join(BRAIN_DIR, 'slide4_styling_clean_1792690613459.jpg'),
  nailBar: path.join(BRAIN_DIR, 'interior_nail_bar_clean_1792690637407.jpg'),
};

const backupDir = path.join(PROJECT_ROOT, 'public', 'images', 'backup_originals');
fs.mkdirSync(backupDir, { recursive: true });

function backupIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    const filename = path.basename(filePath);
    const backupTarget = path.join(backupDir, filename);
    if (!fs.existsSync(backupTarget)) {
      fs.copyFileSync(filePath, backupTarget);
      console.log(`Backed up ${filename}`);
    }
  }
}

async function main() {
  console.log('--- Applying Cleaned Images Across Website ---');

  // 1. HERO SLIDE 2 (Hair Wash & Spa Lounge)
  console.log('Processing Hero Slide 2...');
  const slide2Targets = [
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide2_desktop_1920.webp'), width: 1920 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide2_desktop_1280.webp'), width: 1280 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide2_desktop_768.webp'), width: 768 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide2_mobile_768.webp'), width: 768 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide2_mobile_480.webp'), width: 480 },
  ];
  for (const t of slide2Targets) {
    backupIfExists(t.dest);
    await sharp(CLEANED_IMAGES.washLounge)
      .resize({ width: t.width })
      .webp({ quality: 88, effort: 4 })
      .toFile(t.dest);
    console.log(`Updated: ${path.relative(PROJECT_ROOT, t.dest)}`);
  }

  // Also update interior_wash_lounge.webp (3:4 or fit)
  const washLoungeDest = path.join(PROJECT_ROOT, 'public/images/real/interior_wash_lounge.webp');
  backupIfExists(washLoungeDest);
  await sharp(CLEANED_IMAGES.washLounge)
    .resize(1200, 1600, { fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 4 })
    .toFile(washLoungeDest);
  console.log('Updated: interior_wash_lounge.webp');

  // 2. HERO SLIDE 4 (Styling Floor)
  console.log('Processing Hero Slide 4...');
  const slide4Targets = [
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide4_desktop_1920.webp'), width: 1920 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide4_desktop_1280.webp'), width: 1280 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide4_desktop_768.webp'), width: 768 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide4_mobile_768.webp'), width: 768 },
    { dest: path.join(PROJECT_ROOT, 'public/images/hero-carousel/slide4_mobile_480.webp'), width: 480 },
  ];
  for (const t of slide4Targets) {
    backupIfExists(t.dest);
    await sharp(CLEANED_IMAGES.stylingFloor)
      .resize({ width: t.width })
      .webp({ quality: 88, effort: 4 })
      .toFile(t.dest);
    console.log(`Updated: ${path.relative(PROJECT_ROOT, t.dest)}`);
  }

  // Update interior_styling_stations.webp & interior_studio_floor.webp
  const stylingDest = path.join(PROJECT_ROOT, 'public/images/real/interior_styling_stations.webp');
  backupIfExists(stylingDest);
  await sharp(CLEANED_IMAGES.stylingFloor)
    .resize(1200, 1600, { fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 4 })
    .toFile(stylingDest);
  console.log('Updated: interior_styling_stations.webp');


  // 3. STOREFRONT SIGNAGE GOLD
  console.log('Processing Storefront Angled Gold Signage...');
  const signageDest = path.join(PROJECT_ROOT, 'public/images/real/storefront_signage_gold.webp');
  backupIfExists(signageDest);
  await sharp(CLEANED_IMAGES.signage)
    .resize(1600, 1200, { fit: 'cover' })
    .webp({ quality: 88, effort: 4 })
    .toFile(signageDest);
  console.log('Updated: storefront_signage_gold.webp');

  // 4. NAIL BAR
  console.log('Processing Interior Nail Bar...');
  const nailBarDest = path.join(PROJECT_ROOT, 'public/images/real/interior_nail_bar.webp');
  backupIfExists(nailBarDest);
  await sharp(CLEANED_IMAGES.nailBar)
    .resize(1200, 1600, { fit: 'cover' })
    .webp({ quality: 88, effort: 4 })
    .toFile(nailBarDest);
  console.log('Updated: interior_nail_bar.webp');

  console.log('=== All images updated successfully! ===');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
