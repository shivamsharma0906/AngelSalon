import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontsDir = path.resolve(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fontCssUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap';

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location, headers));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching Google Fonts stylesheet...');
  const cssBuffer = await fetchUrl(fontCssUrl, {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const cssText = cssBuffer.toString('utf8');

  // Parse font-face rules
  const fontFaceRegex = /@font-face\s*\{([^}]+)\}/g;
  let match;
  let counter = 0;
  let localCss = '';

  while ((match = fontFaceRegex.exec(cssText)) !== null) {
    const block = match[1];
    // Check if it's latin subset
    if (!block.includes('unicode-range') || block.includes('U+0000-00FF')) {
      const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)['"]?/);
      const weightMatch = block.match(/font-weight:\s*([^;]+);/);
      const styleMatch = block.match(/font-style:\s*([^;]+);/);
      const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);

      if (familyMatch && weightMatch && urlMatch) {
        const family = familyMatch[1].trim();
        const weight = weightMatch[1].trim();
        const style = styleMatch ? styleMatch[1].trim() : 'normal';
        const remoteUrl = urlMatch[1].trim();

        const safeFamily = family.replace(/\s+/g, '-').toLowerCase();
        const filename = `${safeFamily}-${weight}-${style}.woff2`;
        const localFilePath = path.join(fontsDir, filename);

        console.log(`Downloading ${filename} from ${remoteUrl}...`);
        const fontBuffer = await fetchUrl(remoteUrl);
        fs.writeFileSync(localFilePath, fontBuffer);
        counter++;

        localCss += `@font-face {\n  font-family: '${family}';\n  font-style: ${style};\n  font-weight: ${weight};\n  font-display: swap;\n  src: url('/fonts/${filename}') format('woff2');\n}\n\n`;
      }
    }
  }

  fs.writeFileSync(path.join(fontsDir, 'fonts.css'), localCss);
  console.log(`Successfully downloaded ${counter} fonts and generated public/fonts/fonts.css!`);
}

run().catch(console.error);
