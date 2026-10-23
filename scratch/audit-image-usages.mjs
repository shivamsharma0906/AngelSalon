import fs from 'node:fs';
import path from 'node:path';

const srcDir = path.join(process.cwd(), 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(srcDir);
const usages = {};

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/['"`](\/images\/[^'"`]+)['"`]/g);
  if (matches) {
    for (const m of matches) {
      const clean = m.slice(1, -1).split(' ')[0]; // remove quotes and srcset width
      if (!usages[clean]) usages[clean] = [];
      const rel = path.relative(process.cwd(), f);
      if (!usages[clean].includes(rel)) {
        usages[clean].push(rel);
      }
    }
  }
}

for (const [img, places] of Object.entries(usages).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`\n=== ${img} (${places.length} files) ===`);
  for (const p of places) {
    console.log(`  - ${p}`);
  }
}
