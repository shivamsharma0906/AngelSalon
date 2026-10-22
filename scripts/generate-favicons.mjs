import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const publicDir = path.join(PROJECT_ROOT, 'public');
const logoPath = path.join(publicDir, 'logo.jpg');

// Simple ICO builder that wraps PNG buffers
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Icon type
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset to image data
    entries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function generate() {
  console.log('Generating favicons from:', logoPath);

  // Read base image and resize to a high-quality square with circular transparent mask
  const masterSize = 512;
  const circleMask = Buffer.from(
    `<svg width="${masterSize}" height="${masterSize}">
      <circle cx="${masterSize / 2}" cy="${masterSize / 2}" r="${masterSize / 2 - 2}" fill="#ffffff" />
    </svg>`
  );

  const circularMaster = await sharp(logoPath)
    .resize(masterSize, masterSize, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Save 512x512 PNG
  await sharp(circularMaster).toFile(path.join(publicDir, 'logo-512.png'));

  // Generate 180x180 for apple-touch-icon.png
  await sharp(circularMaster)
    .resize(180, 180)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png (180x180)');

  // Generate 48x48
  const png48 = await sharp(circularMaster)
    .resize(48, 48)
    .png()
    .toBuffer();
  await sharp(png48).toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('Generated favicon-48x48.png');

  // Generate 32x32
  const png32 = await sharp(circularMaster)
    .resize(32, 32)
    .png()
    .toBuffer();
  await sharp(png32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  // Generate 16x16
  const png16 = await sharp(circularMaster)
    .resize(16, 16)
    .png()
    .toBuffer();
  await sharp(png16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Generated favicon-16x16.png');

  // Generate favicon.ico with 16, 32, 48
  const icoBuffer = createIco([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
    { buffer: png48, size: 48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico (multi-res 16, 32, 48)');

  // Generate crisp SVG with base64 embedded circular emblem
  const base64Data = (await sharp(circularMaster).resize(128, 128).png().toBuffer()).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <clipPath id="circleClip">
      <circle cx="64" cy="64" r="63" />
    </clipPath>
  </defs>
  <circle cx="64" cy="64" r="63.5" fill="#14110E" stroke="#C9A227" stroke-width="1" />
  <image href="data:image/png;base64,${base64Data}" x="0" y="0" width="128" height="128" clip-path="url(#circleClip)" />
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('Generated favicon.svg');

  console.log('All favicons successfully generated!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
