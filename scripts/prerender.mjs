/**
 * prerender.mjs — Build-time Static Site Generation (SSG) for Angels Salon
 *
 * Run AFTER `vite build` to inject real HTML content into every route's dist file.
 * Usage: node scripts/prerender.mjs
 *
 * What it does:
 *   1. Builds the SSR bundle (entry-server.tsx) via `vite build --ssr`
 *   2. Reads the client dist/index.html shell produced by `vite build`
 *   3. For each route, calls render(url) from the SSR bundle
 *   4. Injects the rendered HTML + <head> tags into the shell
 *   5. Writes the result to dist/<route>/index.html (or dist/index.html for /)
 *   6. Cleans up the temporary SSR bundle
 *
 * The client-side React app still hydrates normally on load,
 * so all interactivity is preserved.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const ssrOutDir = path.join(projectRoot, '.ssr-temp');

// ─── Route Manifest ─────────────────────────────────────────────────────────
// Every route that should have a pre-rendered HTML file.
// These must match the routes defined in App.tsx / entry-server.tsx.
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/womens-haircut-and-style',
  '/services/womens-hair-colour',
  '/services/mens-services',
  '/services/hair-extensions',
  '/services/hair-treatments',
  '/services/bridal-makeup',
  '/services/skin-care',
  '/services/nails',
  '/academy',
  '/academy/hair-courses',
  '/academy/makeup-courses',
  '/testimonials',
  '/products',
  '/contact',
  '/privacy',
  '/terms',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[prerender] ${msg}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Injects helmet-managed <head> tags into the HTML shell.
 * react-helmet-async populates helmetContext.helmet after renderToString.
 */
function injectHelmetIntoHead(html, helmet) {
  if (!helmet) return html;

  const helmetTags = [
    helmet.title?.toString() ?? '',
    helmet.meta?.toString() ?? '',
    helmet.link?.toString() ?? '',
    helmet.script?.toString() ?? '',
    helmet.style?.toString() ?? '',
    helmet.noscript?.toString() ?? '',
  ]
    .filter(Boolean)
    .join('\n    ');

  // Replace the static <title> in the shell with helmet's dynamic one
  // (The shell's title tag is the generic fallback from index.html)
  if (helmetTags) {
    // Insert all helmet tags right before </head>
    return html.replace(
      /(<\/head>)/i,
      `    <!-- SSG: Helmet-injected head tags -->\n    ${helmetTags}\n  $1`
    );
  }
  return html;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Step 1: Build the SSR entry bundle
  log('Building SSR bundle (entry-server.tsx)…');
  try {
    execSync(
      `npx vite build --ssr src/entry-server.tsx --outDir .ssr-temp --mode ssr`,
      {
        cwd: projectRoot,
        stdio: 'inherit',
      }
    );
  } catch (err) {
    console.error('[prerender] SSR build failed. Aborting prerender.');
    process.exit(1);
  }

  // Step 2: Read the client-built index.html shell
  const shellPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.error('[prerender] dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, 'utf-8');

  // Step 3: Dynamically import the SSR render function
  log('Loading SSR bundle…');
  const ssrEntryPath = path.join(ssrOutDir, 'entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    console.error('[prerender] SSR bundle entry-server.js not found at', ssrEntryPath);
    process.exit(1);
  }
  // On Windows, dynamic import() requires a file:// URL for absolute paths
  const ssrEntryUrl = new URL(`file:///${ssrEntryPath.replace(/\\/g, '/')}`).href;
  const { render } = await import(ssrEntryUrl);

  // Step 4: Pre-render each route
  const total = ROUTES.length;
  let succeeded = 0;

  for (const route of ROUTES) {
    try {
      log(`Rendering ${route} …`);

      const { html: appHtml, helmetContext } = render(route);

      // Inject rendered app into the shell's <div id="root">
      let pageHtml = shell.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${appHtml}</div>`
      );

      // Inject helmet head tags (dynamic title, canonical, JSON-LD, OG tags)
      pageHtml = injectHelmetIntoHead(pageHtml, helmetContext.helmet);

      // Write to the correct output path
      let outPath;
      if (route === '/') {
        outPath = path.join(distDir, 'index.html');
      } else {
        // e.g. /about → dist/about/index.html
        const routeDir = path.join(distDir, route.slice(1)); // strip leading /
        ensureDir(routeDir);
        outPath = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(outPath, pageHtml, 'utf-8');
      succeeded++;
      log(`✓ Written: ${outPath}`);
    } catch (err) {
      console.error(`[prerender] ✗ Failed to render ${route}:`, err?.message ?? err);
    }
  }

  // Step 5: Clean up SSR temp bundle
  log('Cleaning up SSR temp bundle…');
  try {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  } catch {
    // Non-fatal
  }

  log(`\nDone. Pre-rendered ${succeeded}/${total} routes.`);
  if (succeeded < total) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[prerender] Unexpected error:', err);
  process.exit(1);
});
