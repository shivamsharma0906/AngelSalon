import React, { useState } from 'react';

export interface FramedImageCaption {
  title: string;
  subtitle?: string;
  badge?: string;
}

export type FrameRadiusVariant =
  | 'arch'
  | 'arch-tall'
  | 'arch-sm'
  | 'rounded'
  | 'pill'
  | 'circle';

export interface FramedImageProps {
  src: string;
  alt: string;
  /**
   * Calibrated focal point (e.g. "50% 30%", "50% 40%", "center").
   * Ensures faces, crowns, and key details stay centered during responsive cropping.
   */
  focalPoint?: string;
  /**
   * Tailwind aspect ratio class, e.g. "aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/3.2]".
   * Defaults to "aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/3.2]".
   */
  aspectRatio?: string;
  radius?: FrameRadiusVariant;
  caption?: FramedImageCaption;
  priority?: boolean;
  border?: 'gold' | 'subtle' | 'none';
  showScrim?: boolean;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
}

const RADIUS_CLASSES: Record<FrameRadiusVariant, string> = {
  arch: 'rounded-t-[160px] sm:rounded-t-[240px] md:rounded-t-[280px] rounded-b-[24px] sm:rounded-b-[28px]',
  'arch-tall': 'rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[20px] sm:rounded-b-[24px]',
  'arch-sm': 'rounded-t-[90px] rounded-b-[18px]',
  rounded: 'rounded-[24px] sm:rounded-[28px]',
  pill: 'rounded-full',
  circle: 'rounded-full aspect-square',
};

const BORDER_CLASSES = {
  gold: 'border-[1.5px] sm:border-2 border-gold/70',
  subtle: 'border border-border',
  none: 'border-0',
};

/**
 * Reusable, responsive FramedImage system designed to fit authentic salon photography
 * with precision Roman arches, gold borders, calibrated focal points, and frosted caption overlays.
 */
export const FramedImage: React.FC<FramedImageProps> = ({
  src,
  alt,
  focalPoint = '50% 50%',
  aspectRatio = 'aspect-[4/5] sm:aspect-[16/11] md:aspect-[4/3.2]',
  radius = 'arch',
  caption,
  priority = false,
  border = 'gold',
  showScrim = true,
  className = '',
  imgClassName = '',
  width = 1600,
  height = 1200,
  sizes,
  srcSet,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);

  const radiusCls = RADIUS_CLASSES[radius] || RADIUS_CLASSES.arch;
  const borderCls = BORDER_CLASSES[border] || BORDER_CLASSES.gold;
  const hasCaption = Boolean(caption && caption.title);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} ${radiusCls} ${borderCls} overflow-hidden bg-surface-subtle shadow-lustre-md group select-none ${className}`}
    >
      {/* Background warm neutral placeholder while image loads to prevent CLS or white flashes */}
      <div
        className={`absolute inset-0 bg-surface-subtle transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Main Image with absolute cover and calibrated focal point */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-expect-error fetchPriority standard attribute supported in modern browsers
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
        srcSet={srcSet}
        onLoad={handleImageLoad}
        style={{ objectPosition: focalPoint }}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {/* Bottom gradient scrim to guarantee caption readability across dark/light photos */}
      {(showScrim && hasCaption) && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Floating Caption Card inside the frame */}
      {hasCaption && (
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-2.5 sm:p-4 rounded-full bg-surface/90 sm:bg-surface/95 backdrop-blur-md border border-border/80 shadow-lustre-md flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto transition-transform duration-300">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold shrink-0 shadow-sm"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-xs sm:text-base font-bold text-text leading-tight truncate">
                {caption!.title}
              </p>
              {caption!.subtitle && (
                <p className="text-[10px] sm:text-xs text-text-muted leading-tight truncate mt-0.5">
                  {caption!.subtitle}
                </p>
              )}
            </div>
          </div>

          {caption!.badge && (
            <span className="text-[9px] sm:text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gold/15 text-gold-text shrink-0 shadow-sm">
              {caption!.badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FramedImage;
