import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf8');

console.log('--- HOMEPAGE SEO AUDIT ---');
console.log('Total HTML character length:', html.length);
console.log('Has <h1>:', /<h1[^>]*>/.test(html));
console.log('Has <h2>:', /<h2[^>]*>/.test(html));
console.log('Has <main>:', /<main[^>]*>/.test(html));
console.log('Has <header>:', /<header[^>]*>/.test(html));
console.log('Has <footer>:', /<footer[^>]*>/.test(html));
console.log('Has <nav>:', /<nav[^>]*>/.test(html));
console.log('Has <section>:', /<section[^>]*>/.test(html));
console.log('Has <noscript> fallback:', /<noscript>/.test(html));
console.log('Canonical link:', html.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0]);
console.log('Preload LCP:', html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/i)?.[0]);

const ldMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
console.log('\n--- JSON-LD STRUCTURED DATA ---');
console.log('Total JSON-LD blocks found:', ldMatches.length);

for (const match of ldMatches) {
  try {
    const data = JSON.parse(match[1]);
    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      console.log(`\n• Schema: @type =`, item['@type']);
      console.log(`  Name:`, item.name);
      if (item.telephone) console.log(`  Phone:`, item.telephone);
      if (item.address) console.log(`  Address:`, item.address.streetAddress, item.address.addressLocality);
      if (item.geo) console.log(`  Geo:`, item.geo.latitude, item.geo.longitude);
      if (item.openingHoursSpecification) console.log(`  Hours:`, item.openingHoursSpecification[0]?.opens, 'to', item.openingHoursSpecification[0]?.closes);
      if (item.aggregateRating) console.log(`  Rating:`, item.aggregateRating.ratingValue, `(${item.aggregateRating.reviewCount} reviews)`);
      if (item.sameAs) console.log(`  Social Links:`, item.sameAs.length);
      if (item.hasOfferCatalog) {
        console.log(`  Offer Catalog:`, item.hasOfferCatalog.name);
        console.log(`  Service Categories:`, item.hasOfferCatalog.itemListElement?.length);
      }
    }
  } catch (err) {
    console.error('Failed to parse JSON-LD:', err.message);
  }
}

// Check other routes
const testRoutes = ['about', 'services', 'academy', 'contact', 'services/womens-haircut-and-style', 'academy/hair-courses'];
console.log('\n--- SUBPAGE PRE-RENDER CHECK ---');
for (const r of testRoutes) {
  const p = `dist/${r}/index.html`;
  if (fs.existsSync(p)) {
    const subHtml = fs.readFileSync(p, 'utf8');
    const h1 = subHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
    console.log(`✓ ${r.padEnd(38)}: ${subHtml.length} chars | H1: "${h1 || 'None'}"`);
  } else {
    console.log(`✗ ${r.padEnd(38)}: MISSING`);
  }
}
