import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const logoPath = path.join(PROJECT_ROOT, 'public', 'logo.jpg');

async function inspect() {
  const meta = await sharp(logoPath).metadata();
  console.log('Logo dimensions:', meta.width, 'x', meta.height, 'format:', meta.format);
}

inspect().catch(console.error);
