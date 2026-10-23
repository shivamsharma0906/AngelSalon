import path from 'node:path';
import sharp from 'sharp';

async function check() {
  const dir = path.join(process.cwd(), 'angel photos website-20261021T075951Z-1-001/angel photos website');
  for (const f of ['IMG_9047.JPG.jpeg', 'IMG_9077.JPG.jpeg', 'IMG_9006.JPG.jpeg']) {
    const meta = await sharp(path.join(dir, f)).metadata();
    console.log(f, 'orientation:', meta.orientation, `${meta.width}x${meta.height}`);
  }
}

check();
