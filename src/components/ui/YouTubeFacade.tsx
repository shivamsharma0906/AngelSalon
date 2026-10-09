import React, { useState } from 'react';
import { VideoItem } from '../../data/gallery';

export interface YouTubeFacadeProps {
  video: VideoItem;
  className?: string;
}

export const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({ video, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative rounded-sm overflow-hidden border border-border bg-surface shadow-card-dark ${className}`}>
      {/* Video Viewport (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-dark overflow-hidden group">
        {!isPlaying ? (
          <>
            {/* Poster Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors" />

            {/* Duration Badge */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-dark/90 border border-gold/40 text-[11px] font-mono text-gold font-bold">
              {video.duration}
            </div>

            {/* Play Button Trigger */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${video.title}`}
              className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-dark/80 hover:bg-gold text-gold hover:text-text border-2 border-gold flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-gold-glow focus:outline-none focus:ring-4 focus:ring-gold/50"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        )}
      </div>

      {/* Video Caption & Category */}
      <div className="p-5">
        <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-gold font-semibold mb-1 block">
          {video.category}
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-text mb-2 line-clamp-1">
          {video.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};
