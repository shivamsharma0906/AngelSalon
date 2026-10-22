import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const logoPath = path.join(PROJECT_ROOT, 'public', 'logo.jpg');

async function findCircle() {
  const { data, info } = await sharp(logoPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cx = Math.floor(info.width / 2);
  const cy = Math.floor(info.height / 2);

  // Scan horizontally from center to right to find outer ring
  let outerX = cx;
  for (let x = cx; x < info.width; x++) {
    const idx = (cy * info.width + x) * info.channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    if (r > 150 && g > 150 && b > 150) {
      outerX = x;
    }
  }

  // Scan vertically from center to bottom
  let outerY = cy;
  for (let y = cy; y < info.height; y++) {
    const idx = (y * info.width + cx) * info.channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    if (r > 150 && g > 150 && b > 150) {
      outerY = y;
    }
  }

  console.log('Center:', cx, cy);
  console.log('Outer radius approx horizontal:', outerX - cx, 'vertical:', outerY - cy);
}

findCircle().catch(console.error);
