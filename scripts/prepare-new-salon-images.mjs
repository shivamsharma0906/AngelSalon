import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const ORIGINALS_DIR = path.join(PROJECT_ROOT, 'angel photos website-20261021T075951Z-1-001', 'angel photos website');
const BACKUP_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'backup_originals');
const REAL_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'real');

async function processImages() {
  console.log('--- Restoring & Generating Varied Salon Images ---');

  // 1. Restore authentic interior_studio_floor.webp from backup_originals
  const backupStudioFloor = path.join(BACKUP_DIR, 'interior_studio_floor.webp');
  const targetStudioFloor = path.join(REAL_DIR, 'interior_studio_floor.webp');
  if (fs.existsSync(backupStudioFloor)) {
    fs.copyFileSync(backupStudioFloor, targetStudioFloor);
    console.log('Restored: interior_studio_floor.webp (genuine wide studio floor photo)');
  }

  // 2. Generate client_glass_hair_smooth.webp from IMG_9047 (genuine haircut & silk blowout result)
  const srcGlassHair = path.join(ORIGINALS_DIR, 'IMG_9047.JPG.jpeg');
  const targetGlassHair = path.join(REAL_DIR, 'client_glass_hair_smooth.webp');
  await sharp(srcGlassHair)
    .resize(1200, 1600, { fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 4 })
    .toFile(targetGlassHair);
  console.log('Generated: client_glass_hair_smooth.webp');

  // 3. Generate client_balayage_highlights.webp from IMG_9077 (rotate properly with EXIF orientation)
  const srcBalayage = path.join(ORIGINALS_DIR, 'IMG_9077.JPG.jpeg');
  const targetBalayage = path.join(REAL_DIR, 'client_balayage_highlights.webp');
  await sharp(srcBalayage)
    .rotate() // auto-orient based on EXIF
    .resize(1200, 1600, { fit: 'cover', position: 'center' })
    .webp({ quality: 88, effort: 4 })
    .toFile(targetBalayage);
  console.log('Generated: client_balayage_highlights.webp');

  console.log('=== Image Processing Completed Successfully ===');
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
