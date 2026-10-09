import React, { useState, useEffect, useRef } from "react";
import { SEO } from "../lib/seo";
import { productsData, productCategoryFilters } from "../data/products";
import type { ProductItem } from "../data/products";
import { siteConfig } from "../data/site";
import { buildProductOrderLink, buildWhatsAppLink } from "../lib/whatsapp";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { WhatsAppIcon } from "../components/ui/WhatsAppIcon";

const BRAND_COLOURS: Record<string, string> = {
  "Wella Professionals": "text-gold-soft border-gold-line bg-surface-subtle",
  "Scalp Sense": "text-text border-border bg-surface-subtle",
  "Nashi Argan": "text-gold border-gold-line bg-surface-subtle",
  "Skeyndor": "text-gold border-gold-line bg-surface-subtle",
};
const getBrandCls = (brand: string) =>
  BRAND_COLOURS[brand] ?? "text-text-muted border-border bg-surface";

interface SheetProps { product: ProductItem | null; onClose: () => void; }

const ProductSheet: React.FC<SheetProps> = ({ product, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      window.removeEventListener("keydown", onKey);
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, Math.abs(parseInt(top, 10)));
    };
  }, [product, onClose]);
  if (!product) return null;
  const orderUrl = buildProductOrderLink(product.name, product.price);
  const bc = getBrandCls(product.brand);
  const textCls = bc.split(" ")[0];
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-dark/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog" aria-modal="true" aria-label={`${product.name} details`}
    >
      <div className="relative w-full sm:w-[460px] max-h-[90dvh] sm:max-h-[82vh] bg-surface border-t border-l border-r sm:border border-border sm:border-gold/30 rounded-t-3xl sm:rounded-2xl shadow-card-light flex flex-col overflow-hidden">
        <div className="sm:hidden flex justify-center pt-3 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-border/80" />
        </div>
        <div className="px-5 pt-2 sm:pt-5 pb-4 border-b border-border shrink-0 flex items-start gap-3">
          <div className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center font-serif text-xl font-bold ${bc}`}>
            {product.brand.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-luxury mb-0.5 ${textCls}`}>{product.brand}</p>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-text leading-tight line-clamp-2">{product.name}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"
            className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full border border-border text-text-muted hover:text-gold hover:border-gold/40 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full bg-surface-subtle border border-border text-text-muted">{product.categoryLabel}</span>
            {product.volume && <span className="text-[11px] px-3 py-1 rounded-full bg-surface-subtle border border-border text-text-muted font-mono">{product.volume}</span>}
            {product.isPopular && <span className="text-[11px] px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold-text font-bold">&#9733; Bestseller</span>}
          </div>
          <div className="rounded-xl bg-surface-subtle border border-border p-4">
            <p className="text-sm text-text-muted leading-relaxed">{product.description}</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-gold/25 p-4 bg-gold/5">
            <svg className="text-gold shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p className="text-xs leading-relaxed text-gold-text">
              100% authentic salon-grade product. In-salon pickup at Angels Ghatkopar East or Mumbai home delivery via WhatsApp.
            </p>
          </div>
        </div>
        <div className="px-5 pt-4 pb-6 sm:pb-4 border-t border-border shrink-0 bg-surface">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs uppercase tracking-luxury text-text-muted">Retail Price</span>
            <span className="font-serif text-2xl font-bold text-gold-text">{product.price}</span>
          </div>
          <Button as="a" href={orderUrl} target="_blank" variant="whatsapp" size="md" fullWidth
            className="min-h-[52px] font-bold tracking-luxury"
            leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current" />}>
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

interface CardProps { product: ProductItem; onClick: () => void; }

const ProductCard: React.FC<CardProps> = ({ product, onClick }) => {
  const bc = getBrandCls(product.brand);
  const textCls = bc.split(" ")[0];
  return (
    <button type="button" onClick={onClick}
      className="w-full text-left group bg-surface border border-border hover:border-gold/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-gold active:scale-[0.98]">
      <div className="relative aspect-square bg-surface-subtle flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-subtle to-surface-subtle" />
        <span className={`relative z-0 font-serif text-6xl sm:text-7xl font-black select-none pointer-events-none ${textCls} opacity-15 group-hover:opacity-25 transition-opacity`}>
          {product.brand.charAt(0)}
        </span>
        <span className={`relative z-10 text-[9px] font-bold uppercase tracking-luxury border px-2 py-0.5 rounded-full mt-1 ${bc}`}>
          {product.brand.split(" ")[0]}
        </span>
        {product.isPopular && (
          <div className="absolute top-2 left-2 bg-gold text-dark text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none">Best</div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center bg-dark/40">
          <span className="text-gold-light text-[10px] font-bold uppercase tracking-wider bg-dark/90 px-2.5 py-1 rounded-full border border-gold/30">Tap to view</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[9px] font-bold uppercase tracking-luxury text-text-muted mb-0.5 truncate">{product.brand}</p>
        <h3 className="font-serif text-xs sm:text-sm font-bold text-text group-hover:text-gold-text transition-colors line-clamp-2 leading-tight mb-2 min-h-[2.4em]">{product.name}</h3>
        <div className="flex items-center justify-between gap-1">
          <span className="font-serif text-sm sm:text-base font-bold text-gold-text leading-none">{product.price}</span>
          {product.volume && (
            <span className="text-[9px] text-text-muted font-mono bg-surface-subtle px-1 py-0.5 rounded border border-border shrink-0">{product.volume}</span>
          )}
        </div>
      </div>
    </button>
  );
};

export const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = productsData.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteConfig.url}/products` },
    ],
  };

  return (
    <>
      <SEO
        title="Salon Retail Products & Skeyndor Skincare | Angels Mumbai"
        description="Shop 100% genuine salon-grade retail products: Nashi Argan, Skeyndor Spain, Wella Invigo, and clinical face washes at Angels Salon Ghatkopar East."
        canonicalPath="/products"
        schemaData={breadcrumbSchema}
      />
      <main id="main-content" className="bg-background min-h-screen pt-20 sm:pt-28">

        {/* Hero */}
        <div className="relative border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
          <Container size="lg">
            <div className="py-8 sm:py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-luxury text-gold-text mb-2 block">Professional Home Care Sanctuary</span>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text leading-tight">Salon Boutique</h1>
                <p className="text-sm sm:text-base text-text-muted mt-2.5 max-w-lg leading-relaxed">
                  100% genuine European skincare (Skeyndor), Italian argan oils (Nashi Argan) &amp; Wella Professional haircare — direct from Angels Salon.
                </p>
              </div>
              <div className="shrink-0 flex sm:flex-col gap-6 sm:gap-2 sm:text-right">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-text block leading-none">{productsData.length}+</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wide">Authentic Products</span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-text block leading-none">4</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wide">Top Brands</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-[58px] sm:top-[68px] z-30 bg-surface/95 backdrop-blur-md border-b border-border">
          <Container size="lg">
            <div className="py-2.5 flex flex-col sm:flex-row gap-2.5 sm:gap-4 sm:items-center">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 min-w-0 pb-0.5">
                {productCategoryFilters.map((tab) => (
                  <button key={tab.id} type="button" onClick={() => setActiveCategory(tab.id)}
                    className={`shrink-0 min-h-[34px] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-1 focus:ring-gold ${
                      activeCategory === tab.id
                        ? "bg-gold text-dark font-bold"
                        : "bg-surface border border-border text-text-muted hover:text-text hover:border-gold/40"
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="relative shrink-0 w-full sm:w-52">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-3.5 h-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"/>
                </svg>
                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." inputMode="search"
                  className="w-full min-h-[34px] bg-surface border border-border rounded-full pl-8 pr-7 py-1 text-base sm:text-xs text-text placeholder-text-muted focus:outline-none focus:border-gold transition-colors" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors p-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <p className="text-[10px] text-text-muted pb-2">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              {searchQuery && <> for &ldquo;<span className="text-gold-text font-medium">{searchQuery}</span>&rdquo;</>}
              {" \u00b7 "}Tap any card for details &amp; ordering
            </p>
          </Container>
        </div>

        {/* Grid */}
        <Container size="lg">
          <div className="py-6 sm:py-10">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 flex flex-col items-center gap-3">
                <svg className="text-text-muted w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="1.5"/><line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="1.5"/>
                </svg>
                <p className="text-text font-semibold">No products found</p>
                <p className="text-text-muted text-sm">Try a different category or search term</p>
                <Button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} variant="outline" size="sm" className="mt-2">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4" data-reveal-stagger>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
              </div>
            )}
          </div>
        </Container>

        {/* CTA */}
        <div className="border-t border-border bg-surface-subtle" data-reveal>
          <Container size="md">
            <div className="py-12 sm:py-16 text-center">
              <span className="text-[11px] uppercase tracking-luxury text-gold-text font-bold block mb-2">Expert Advice</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text mb-3">Not Sure Which Product Suits You?</h2>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                Message our certified aesthetician on WhatsApp for a personalized home-care routine — free of charge.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0">
                <Button as="a"
                  href={buildWhatsAppLink({ message: "Hi Angels Salon! I need product recommendations for my hair and skin type." })}
                  target="_blank" variant="whatsapp" size="lg" fullWidth className="sm:w-auto min-h-[52px]"
                  leftIcon={<WhatsAppIcon className="w-5 h-5 fill-current" />}>
                  Consult on WhatsApp
                </Button>
                <Button as="a" href="/services" variant="outline" size="lg" fullWidth className="sm:w-auto min-h-[52px]">
                  Explore Salon Services
                </Button>
              </div>
            </div>
          </Container>
        </div>

      </main>
      <ProductSheet product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default Products;
