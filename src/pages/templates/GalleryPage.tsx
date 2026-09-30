import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Gallery sub-pages are consolidated into a single unified /style-gallery page.
 * Any residual navigation directly redirects to /style-gallery.
 */
export const GalleryPage: React.FC = () => {
  return <Navigate to="/style-gallery" replace />;
};

export default GalleryPage;
