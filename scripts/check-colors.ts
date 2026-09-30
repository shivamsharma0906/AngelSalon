import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const scanDirs = [
  path.join(rootDir, 'src', 'components'),
  path.join(rootDir, 'src', 'pages'),
];

// Patterns that violate the unified visual system
const forbiddenPatterns: Array<{ name: string; regex: RegExp }> = [
  {
    name: 'Tailwind grey/slate/zinc/neutral/stone class',
    regex: /\b(?:bg|text|border|from|to|via)-(?:gray|zinc|neutral|slate|stone)-\d{2,3}\b/g,
  },
  {
    name: 'Arbitrary hex class (e.g. bg-[#...], text-[#...])',
    regex: /\b(?:bg|text|border|from|to|via)-\[#[0-9a-fA-F]+\]/g,
  },
  {
    name: 'Hardcoded hex color string in className',
    regex: /className=["'][^"']*#[0-9a-fA-F]{3,8}[^"']*["']/g,
  },
];

function scanDirectory(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(scanDirectory(fullPath));
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

let totalErrors = 0;
const allFiles = scanDirs.flatMap(scanDirectory);

console.log(`[CHECK-COLORS] Scanning ${allFiles.length} files in src/components and src/pages for color token compliance...`);

for (const filePath of allFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(rootDir, filePath);

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    // Skip comment lines
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      continue;
    }

    for (const rule of forbiddenPatterns) {
      const matches = line.match(rule.regex);
      if (matches) {
        for (const match of matches) {
          console.error(`[CHECK-COLORS VIOLATION] ${relPath}:${lineIdx + 1}`);
          console.error(`  Rule: ${rule.name}`);
          console.error(`  Match: "${match}"`);
          totalErrors++;
        }
      }
    }
  }
}

if (totalErrors > 0) {
  console.error(`\n[CHECK-COLORS FAILED] Found ${totalErrors} color token violation(s). All colors must use design system tokens.`);
  process.exit(1);
} else {
  console.log('[CHECK-COLORS SUCCESS] Zero color violations found. All components adhere strictly to unified tokens.');
  process.exit(0);
}
