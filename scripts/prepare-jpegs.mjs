import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const tempDir = path.join(process.cwd(), 'scripts', 'temp_jpegs');
fs.mkdirSync(tempDir, { recursive: true });

const files = [
  { src: 'public/images/real/storefront_signage_gold.webp', name: 'signage_gold.jpg' },
  { src: 'public/images/hero-carousel/slide2_desktop_1920.webp', name: 'slide2_wash.jpg' },
  { src: 'public/images/hero-carousel/slide4_desktop_1920.webp', name: 'slide4_salon.jpg' },
  { src: 'public/images/real/interior_nail_bar.webp', name: 'nail_bar.jpg' },
  { src: 'public/images/real/interior_styling_stations.webp', name: 'styling_stations.jpg' },
];

async function convert() {
  for (const f of files) {
    const dest = path.join(tempDir, f.name);
    await sharp(f.src).jpeg({ quality: 95 }).toFile(dest);
    console.log(`Prepared: ${dest}`);
  }
}

convert().catch(console.error);
