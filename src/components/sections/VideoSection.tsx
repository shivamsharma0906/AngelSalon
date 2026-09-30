import React, { useState } from 'react';
import { homeData } from '../../data/home';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export const VideoSection: React.FC = () => {
  const { video } = homeData;
  const [isPlaying, setIsPlaying] = useState(false);

  // Strictly hide if not verified or no genuine video ID
  if (!video || !video.verified || !video.youtubeId) {
    return null;
  }

  return (
    <Section tone="ink" className="py-16 sm:py-24" aria-label="Salon Video Showcase">
      <Container size="lg">
        <div data-reveal className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[12px] uppercase tracking-wider text-gold font-semibold block mb-2">
            Behind the Scenes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4">
            {video.title}
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto aspect-video rounded-[4px] overflow-hidden border border-gold/40 hover:border-gold/60 transition-colors bg-raised shadow-2xl relative">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="w-full h-full relative cursor-pointer group flex items-center justify-center"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPlaying(true);
                }
              }}
              aria-label={`Play video: ${video.title}`}
            >
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors" />
              <div className="w-16 h-16 rounded-full bg-raised/90 border border-gold-line text-gold flex items-center justify-center shadow-gold-md group-hover:scale-110 group-hover:border-gold transition-transform z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default VideoSection;
