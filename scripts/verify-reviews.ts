import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const reviewsTsPath = path.join(rootDir, 'src', 'data', 'reviews.ts');
const rawExportPath = path.join(rootDir, 'data', 'raw', 'google-reviews-2026-09-29.md');
const srcDir = path.join(rootDir, 'src');

if (!fs.existsSync(rawExportPath)) {
  console.error(`[VERIFY-REVIEWS ERROR] Raw export file not found: ${rawExportPath}`);
  process.exit(1);
}

if (!fs.existsSync(reviewsTsPath)) {
  console.error(`[VERIFY-REVIEWS ERROR] Reviews TS file not found: ${reviewsTsPath}`);
  process.exit(1);
}

const rawContent = fs.readFileSync(rawExportPath, 'utf8');
const reviewsTsContent = fs.readFileSync(reviewsTsPath, 'utf8');

// Extract review text entries from src/data/reviews.ts
const textMatches: string[] = [];
const regex = /text:\s*"([^"]+)"/g;
let match: RegExpExecArray | null;

while ((match = regex.exec(reviewsTsContent)) !== null) {
  textMatches.push(match[1]);
}

if (textMatches.length === 0) {
  console.error('[VERIFY-REVIEWS ERROR] No review texts found in src/data/reviews.ts');
  process.exit(1);
}

let hasError = false;

// 1. Verify every review text in src/data/reviews.ts exists verbatim in raw file
console.log(`[VERIFY-REVIEWS] Verifying ${textMatches.length} reviews against raw export...`);
for (let i = 0; i < textMatches.length; i++) {
  const text = textMatches[i];
  if (!rawContent.includes(text)) {
    console.error(`[VERIFY-REVIEWS ERROR] Review #${i + 1} text not found verbatim in ${rawExportPath}:`);
    console.error(`"${text}"`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log('[VERIFY-REVIEWS] All review texts found verbatim in raw export.');

// 2. Confirm no review text exists anywhere in src/ outside src/data/reviews.ts
function scanDir(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allSrcFiles = scanDir(srcDir);
for (const file of allSrcFiles) {
  if (path.resolve(file) === path.resolve(reviewsTsPath)) {
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  for (const text of textMatches) {
    if (content.includes(text)) {
      console.error(`[VERIFY-REVIEWS ERROR] Review text found outside src/data/reviews.ts in ${path.relative(rootDir, file)}:`);
      console.error(`"${text}"`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log('[VERIFY-REVIEWS SUCCESS] Zero review text leaks outside src/data/reviews.ts. All reviews verified.');
