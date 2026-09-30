import React, { useEffect, useRef, useCallback } from 'react';
import { GalleryItem } from '../../data/gallery';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else if (items.length > 0) {
      onNavigate(items[items.length - 1]); // Wrap around
    }
  }, [currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else if (items.length > 0) {
      onNavigate(items[0]); // Wrap around
    }
  }, [currentIndex, items, onNavigate]);

  // Touch swipe support (left/right navigation)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Back button (history state) integration and Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Push history state so physical back button closes lightbox instead of leaving page
    window.history.pushState({ lightbox: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    // Save scroll position and lock body scrolling
    const savedTop = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedTop}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedTop);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  const handleClose = () => {
    if (window.history.state?.lightbox) {
      window.history.back();
    } else {
      onClose();
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} image viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/95 backdrop-blur-md animate-fade-in pt-safe pb-safe pl-safe pr-safe"
      onClick={handleClose}
    >
      {/* Lightbox Container */}
      <div
        ref={modalRef}
        className="relative max-w-4xl w-full max-h-[92vh] max-h-[92dvh] flex flex-col items-center bg-surface border border-border-gold rounded-sm p-4 sm:p-6 shadow-gold-glow animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Controls Bar */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-border">
          <div className="flex flex-col pr-4 truncate">
            <span className="text-xs uppercase tracking-luxury text-gold font-medium">
              {item.categoryLabel}
            </span>
            <h3 className="font-serif text-base sm:text-xl text-text font-bold truncate">
              {item.title}
            </h3>
          </div>

          {/* 44x44px Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close Lightbox"
            className="w-11 h-11 rounded-full border border-border text-text-muted hover:text-gold hover:border-gold transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Media Viewport with Touch Drag */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-sm bg-black/40 max-h-[62vh] max-h-[62dvh] touch-pan-y">
          <img
            src={item.image}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="w-auto h-auto max-h-[62vh] max-h-[62dvh] max-w-full object-contain select-none pointer-events-none"
          />

          {/* Left Arrow Button (44x44px) */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Image"
              className="w-11 h-11 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/80 hover:bg-gold hover:text-ink text-gold border border-gold/40 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          {/* Right Arrow Button (44x44px) */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Image"
              className="w-11 h-11 absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/80 hover:bg-gold hover:text-ink text-gold border border-gold/40 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>

        {/* Caption, Story, & Action Controls */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-3 border-t border-border text-xs sm:text-sm text-text-muted">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {item.serviceRendered && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold bg-gold/10 border border-gold/25 px-2 py-0.5 rounded-sm">
                  {item.serviceRendered}
                </span>
              )}
            </div>
            <p className="text-text-muted leading-relaxed line-clamp-2">{item.description}</p>
            {item.clientStory && (
              <p className="text-[11px] text-text-muted/80 italic mt-1 line-clamp-2">
                &ldquo;{item.clientStory}&rdquo;
              </p>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="font-mono text-xs text-gold/80 px-2 py-1 bg-ink/60 rounded border border-border/60">
              {currentIndex + 1} / {items.length}
            </span>

            <a
              href={`https://wa.me/919167187140?text=${encodeURIComponent(
                `Hi Angels Salon! I am inquiring about this look from your Style Gallery: "${item.title}" (${item.serviceRendered || item.categoryLabel}). Can you share pricing and available slots?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-gold text-ink font-semibold text-xs hover:bg-gold-light transition-colors min-h-[36px] shadow-gold-sm"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

