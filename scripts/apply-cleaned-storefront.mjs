import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_IMAGE = 'C:/Users/SHIVAM/.gemini/antigravity-ide/brain/6a8dac93-cfd0-4ac8-bdcd-423ece6840fa/storefront_clean_1792689721975.jpg';
const PROJECT_ROOT = process.cwd();

async function main() {
  console.log('Processing cleaned storefront image from:', SOURCE_IMAGE);
  if (!fs.existsSync(SOURCE_IMAGE)) {
    throw new Error(`Source image not found at ${SOURCE_IMAGE}`);
  }

  // Ensure backup directory
  const backupDir = path.join(PROJECT_ROOT, 'public', 'images', 'backup_originals');
  fs.mkdirSync(backupDir, { recursive: true });

  // List of files to update with their respective dimensions
  const heroTargets = [
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'hero-carousel', 'slide1_desktop_1920.webp'), width: 1920, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'hero-carousel', 'slide1_desktop_1280.webp'), width: 1280, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'hero-carousel', 'slide1_desktop_768.webp'), width: 768, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'hero-carousel', 'slide1_mobile_768.webp'), width: 768, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'hero-carousel', 'slide1_mobile_480.webp'), width: 480, format: 'webp' },
  ];

  const realTargets = [
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'real', 'og_storefront.jpg'), width: 1200, format: 'jpeg', height: 630 },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'real', 'storefront_frontal.webp'), width: 1600, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'real', 'storefront_facade.webp'), width: 1600, format: 'webp' },
    { dest: path.join(PROJECT_ROOT, 'public', 'images', 'real', 'storefront_clean.jpg'), width: 1920, format: 'jpeg' },
  ];

  // Backup original files before overwriting
  for (const t of [...heroTargets, ...realTargets]) {
    if (fs.existsSync(t.dest)) {
      const relName = path.basename(t.dest);
      const backupPath = path.join(backupDir, relName);
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(t.dest, backupPath);
        console.log(`Backed up ${relName} to backup_originals/`);
      }
    }
  }

  // Generate responsive versions
  for (const t of heroTargets) {
    await sharp(SOURCE_IMAGE)
      .resize({ width: t.width, withoutEnlargement: false })
      .webp({ quality: 88, effort: 4 })
      .toFile(t.dest);
    console.log(`Generated: ${path.relative(PROJECT_ROOT, t.dest)} (${t.width}px webp)`);
  }

  for (const t of realTargets) {
    if (t.format === 'jpeg') {
      const pipeline = sharp(SOURCE_IMAGE).resize({
        width: t.width,
        height: t.height || undefined,
        fit: t.height ? 'cover' : 'inside',
        withoutEnlargement: false,
      });
      await pipeline.jpeg({ quality: 90, mozjpeg: true }).toFile(t.dest);
    } else {
      await sharp(SOURCE_IMAGE)
        .resize({ width: t.width, withoutEnlargement: false })
        .webp({ quality: 88, effort: 4 })
        .toFile(t.dest);
    }
    console.log(`Generated: ${path.relative(PROJECT_ROOT, t.dest)}`);
  }

  console.log('All storefront images updated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
