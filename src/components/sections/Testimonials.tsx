import React from 'react';
import { GoogleReviews } from './GoogleReviews';

/**
 * Testimonials section wrapper for the Home page.
 * Displays 3-4 verified reviews in an accessible carousel.
 */
export const Testimonials: React.FC = () => {
  return <GoogleReviews mode="carousel" limit={4} />;
};

export default Testimonials;
