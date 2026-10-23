import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'angel photos website-20261021T075951Z-1-001/angel photos website');
const files = fs.readdirSync(dir);

async function inspect() {
  for (const f of files) {
    if (f.match(/\.(jpeg|jpg|png)$/i)) {
      try {
        const filePath = path.join(dir, f);
        const meta = await sharp(filePath).metadata();
        const stat = fs.statSync(filePath);
        console.log(`${f.padEnd(20)} | ${meta.width}x${meta.height} | ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
      } catch (e) {
        console.error(f, e.message);
      }
    }
  }
}

inspect();
