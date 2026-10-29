import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { exec, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// Simple static file server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(500);
    res.end('Error loading file');
  }
});

const PORT = 4173;

server.listen(PORT, async () => {
  console.log(`Preview server listening on http://localhost:${PORT}`);

  // Find Chrome/Edge
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft\\Edge\\Application\\msedge.exe'),
  ];

  let chromePath = candidates.find((p) => fs.existsSync(p));
  console.log('Using browser at:', chromePath || 'Default system search');

  const chromeFlag = chromePath ? `CHROME_PATH="${chromePath}"` : '';

  try {
    console.log('Running Lighthouse mobile audit against http://localhost:' + PORT + ' ...');
    const cmd = `${chromeFlag ? `set "${chromeFlag}" && ` : ''}npx lighthouse http://localhost:${PORT} --output=json --output-path=.lighthouse-report.json --chrome-flags="--headless --no-sandbox --disable-gpu" --form-factor=mobile --screenEmulation.disabled`;
    
    execSync(cmd, { stdio: 'inherit' });

    if (fs.existsSync('.lighthouse-report.json')) {
      const report = JSON.parse(fs.readFileSync('.lighthouse-report.json', 'utf8'));
      const categories = report.categories;
      console.log('\n======================================');
      console.log('LIGHTHOUSE MOBILE AUDIT RESULTS');
      console.log('======================================');
      console.log(`Performance:    ${Math.round((categories.performance?.score || 0) * 100)} / 100`);
      console.log(`Accessibility:  ${Math.round((categories.accessibility?.score || 0) * 100)} / 100`);
      console.log(`Best Practices: ${Math.round((categories['best-practices']?.score || 0) * 100)} / 100`);
      console.log(`SEO:            ${Math.round((categories.seo?.score || 0) * 100)} / 100`);
      console.log('======================================\n');
    }
  } catch (err) {
    console.error('Lighthouse execution finished with note:', err.message);
    if (fs.existsSync('.lighthouse-report.json')) {
      try {
        const report = JSON.parse(fs.readFileSync('.lighthouse-report.json', 'utf8'));
        const categories = report.categories;
        console.log('\n======================================');
        console.log('LIGHTHOUSE MOBILE AUDIT RESULTS');
        console.log('======================================');
        console.log(`Performance:    ${Math.round((categories.performance?.score || 0) * 100)} / 100`);
        console.log(`Accessibility:  ${Math.round((categories.accessibility?.score || 0) * 100)} / 100`);
        console.log(`Best Practices: ${Math.round((categories['best-practices']?.score || 0) * 100)} / 100`);
        console.log(`SEO:            ${Math.round((categories.seo?.score || 0) * 100)} / 100`);
        console.log('======================================\n');
      } catch (e) {}
    }
  } finally {
    server.close();
    process.exit(0);
  }
});

