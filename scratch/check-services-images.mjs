import fs from 'node:fs';

const content = fs.readFileSync('src/data/services.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('/images/')) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});
