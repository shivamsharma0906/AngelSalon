import path from 'node:path';
import sharp from 'sharp';

const files = [
  'public/images/real/storefront_signage_gold.webp',
  'public/images/hero-carousel/slide2_desktop_1920.webp',
  'public/images/hero-carousel/slide4_desktop_1920.webp',
  'public/images/real/interior_styling_stations.webp',
  'public/images/real/interior_nail_bar.webp',
  'public/images/real/interior_wash_lounge.webp'
];

async function check() {
  for (const f of files) {
    const m = await sharp(f).metadata();
    console.log(`${f}: ${m.width}x${m.height} (${(m.width/m.height).toFixed(2)})`);
  }
}

check().catch(console.error);
