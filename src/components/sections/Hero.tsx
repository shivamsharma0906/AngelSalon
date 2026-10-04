import React from 'react';
import { heroSlides } from '../../data/heroSlides';
import { HeroSlideshow } from '../HeroSlideshow';

export const Hero: React.FC = () => {
  return (
    <div className="pt-[64px] sm:pt-[76px] lg:pt-[80px] bg-ink w-full relative z-10">
      <HeroSlideshow slides={heroSlides} />
    </div>
  );
};

export default Hero;
