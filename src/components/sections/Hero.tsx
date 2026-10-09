import React from 'react';
import { heroSlides } from '../../data/heroSlides';
import { HeroSlideshow } from '../HeroSlideshow';

export const Hero: React.FC = () => {
  return (
    <div className="pt-16 sm:pt-[72px] bg-background w-full relative z-10">
      <HeroSlideshow slides={heroSlides} />
    </div>
  );
};

export default Hero;
