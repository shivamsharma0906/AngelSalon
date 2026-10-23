import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function run() {
  const dir = path.join(process.cwd(), 'angel photos website-20261021T075951Z-1-001/angel photos website');
  const outDir = path.join(process.cwd(), 'scratch/thumbnails');
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.match(/\.(jpeg|jpg|png)$/i)) {
      const base = f.split('.')[0];
      const dest = path.join(outDir, `${base}.jpg`);
      await sharp(path.join(dir, f))
        .resize({ width: 400 })
        .jpeg({ quality: 80 })
        .toFile(dest);
      console.log('Thumbnail created for', f, '->', `${base}.jpg`);
    }
  }
}
run();
