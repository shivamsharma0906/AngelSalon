import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumbs" className={`mb-6 text-xs sm:text-sm text-text-muted overflow-x-auto no-scrollbar ${className}`}>
      <ol className="flex items-center flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 whitespace-nowrap py-0.5">
        <li className="shrink-0">
          <Link to="/" className="hover:text-gold transition-colors inline-flex items-center gap-1 min-h-[32px] sm:min-h-[auto] items-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold/80 shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="text-gold/60 text-xs shrink-0" aria-hidden="true">›</span>
              {isLast || !item.path ? (
                <span className="text-gold font-medium truncate max-w-[200px] xs:max-w-[280px] sm:max-w-none inline-block align-bottom" aria-current="page" title={item.label}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-gold transition-colors truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none inline-block align-bottom min-h-[32px] sm:min-h-[auto] flex items-center" title={item.label}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
