import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const logoPath = path.join(PROJECT_ROOT, 'public', 'logo.jpg');

async function test() {
  const { data, info } = await sharp(logoPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Channels:', info.channels);
  // check top left (0,0)
  console.log('Top left pixel:', data[0], data[1], data[2]);
  // check center (320, 320)
  const centerIdx = (320 * info.width + 320) * info.channels;
  console.log('Center pixel:', data[centerIdx], data[centerIdx + 1], data[centerIdx + 2]);
}

test().catch(console.error);
