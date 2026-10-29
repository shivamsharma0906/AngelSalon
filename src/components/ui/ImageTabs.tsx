import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FramedImage, FrameRadiusVariant, FramedImageCaption } from './FramedImage';

export interface ImageTabItem {
  id: string;
  label: string;
  src: string;
  alt: string;
  focalPoint?: string;
  caption?: FramedImageCaption;
  width?: number;
  height?: number;
}

export interface ImageTabsProps {
  items: ImageTabItem[];
  label?: string;
  aspectRatio?: string;
  radius?: FrameRadiusVariant;
  border?: 'gold' | 'subtle' | 'none';
  priority?: boolean;
  className?: string;
  defaultIndex?: number;
  onTabChange?: (index: number) => void;
}

/**
 * Preloads an image into the browser cache
 */
function preloadImage(url: string) {
  if (typeof window === 'undefined' || !url) return;
  const img = new Image();
  img.src = url;
}

/**
 * Reusable, accessible tabbed frame component that crossfades between authentic salon photos.
 * Implements WAI-ARIA tablist semantics, keyboard navigation (Arrow keys, Home, End),
 * hover preloading, and horizontal scroll containment on mobile viewports.
 */
export const ImageTabs: React.FC<ImageTabsProps> = ({
  items,
  label = 'Salon Showcase Tabs',
  aspectRatio = 'aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/3.2]',
  radius = 'arch',
  border = 'gold',
  priority = false,
  className = '',
  defaultIndex = 0,
  onTabChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = items[activeIndex] || items[0];

  const handleSelectTab = useCallback(
    (index: number) => {
      if (index === activeIndex || index < 0 || index >= items.length) return;
      setIsCrossfading(true);
      setActiveIndex(index);
      if (onTabChange) onTabChange(index);

      // Reset crossfade transition flag after 350ms
      const timer = setTimeout(() => {
        setIsCrossfading(false);
      }, 350);
      return () => clearTimeout(timer);
    },
    [activeIndex, items.length, onTabChange]
  );

  // Preload adjacent images on initial render and tab switch
  useEffect(() => {
    const nextIdx = (activeIndex + 1) % items.length;
    const prevIdx = (activeIndex - 1 + items.length) % items.length;
    preloadImage(items[nextIdx]?.src);
    preloadImage(items[prevIdx]?.src);
  }, [activeIndex, items]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = (index + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = items.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelectTab(index);
        return;
      default:
        return;
    }

    if (targetIndex !== -1) {
      tabRefs.current[targetIndex]?.focus();
      handleSelectTab(targetIndex);
    }
  };

  const handleHoverPreload = (idx: number) => {
    preloadImage(items[idx]?.src);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {/* Framed Image Display with Smooth Crossfade */}
      <div
        id={`tabpanel-${activeItem.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeItem.id}`}
        tabIndex={0}
        className={`focus:outline-none transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
          isCrossfading ? 'opacity-85' : 'opacity-100'
        }`}
      >
        <FramedImage
          src={activeItem.src}
          alt={activeItem.alt}
          focalPoint={activeItem.focalPoint}
          aspectRatio={aspectRatio}
          radius={radius}
          border={border}
          caption={activeItem.caption}
          priority={priority && activeIndex === 0}
          width={activeItem.width || 1600}
          height={activeItem.height || 1200}
        />
      </div>

      {/* Accessible Pill Tabs centered below the frame */}
      <div
        role="tablist"
        aria-label={label}
        className="flex items-center justify-start sm:justify-center gap-2 mt-4 sm:mt-6 overflow-x-auto py-1 px-4 sm:px-2 no-scrollbar max-w-full"
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelectTab(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onMouseEnter={() => handleHoverPreload(idx)}
              onFocus={() => handleHoverPreload(idx)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                isActive
                  ? 'bg-dark text-text-inverse border border-dark shadow-sm'
                  : 'bg-surface/80 border border-border text-text-muted hover:border-gold/60 hover:text-text'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageTabs;
