import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NavItem } from '../../data/nav';

export interface NavDropdownProps {
  item: NavItem;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const location = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasChildren = item.hasDropdown && item.children && item.children.length > 0;

  // Check if current route matches parent or any child
  const isParentActive = location.pathname === item.path;
  const isChildActive = hasChildren && item.children?.some((child) => location.pathname === child.path);
  const isActive = isParentActive || isChildActive;

  // Clear timers helper
  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Open with subtle delay to prevent accidental mouseover triggers
  const handleMouseEnter = () => {
    if (!hasChildren) return;
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 120);
  };

  // Close with delay so user can bridge the gap from trigger to panel
  const handleMouseLeave = () => {
    if (!hasChildren) return;
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    clearTimers();
  }, [location.pathname, clearTimers]);

  // Viewport boundary check: flip alignment if panel would overflow window width
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth - 16) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
  }, [isOpen]);

  // Keyboard navigation: Escape key closes and returns focus to trigger button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        linkRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close when focus completely leaves the container
  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  // Base styling for consistent vertical height, font, and baseline across ALL items
  const navLinkClasses = (active: boolean) =>
    `relative inline-flex items-center h-10 px-2.5 2xl:px-3 text-xs 2xl:text-[13px] uppercase tracking-wider font-medium transition-colors duration-200 rounded-sm whitespace-nowrap select-none focus:outline-none focus:ring-1 focus:ring-gold ${
      active
        ? 'text-gold font-bold'
        : 'text-text-muted hover:text-text hover:bg-surface/50'
    }`;

  // If item doesn't have a dropdown, render standard link
  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) => navLinkClasses(isActive)}
      >
        <span>{item.label}</span>
        {isParentActive && (
          <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold rounded-full transition-all duration-300 shadow-gold-sm"></span>
        )}
      </NavLink>
    );
  }

  const dropdownId = `dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      className="relative inline-flex items-center"
    >
      {/* Clickable Parent Link with integrated SVG chevron for seamless baseline alignment */}
      <Link
        ref={linkRef}
        to={item.path}
        aria-current={isParentActive ? 'page' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        className={`${navLinkClasses(Boolean(isActive))} gap-1.5 group`}
      >
        <span>{item.label}</span>

        {/* Integrated Chevron Indicator */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 text-text-muted/70 group-hover:text-gold shrink-0 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>

        {isActive && (
          <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold rounded-full transition-all duration-300 shadow-gold-sm"></span>
        )}
      </Link>

      {/* Dropdown Panel */}
      <div
        id={dropdownId}
        ref={panelRef}
        hidden={!isOpen}
        className={`absolute top-full ${
          alignRight ? 'right-0' : 'left-0'
        } pt-2 z-50 min-w-[280px] sm:min-w-[300px] transition-all duration-200 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Panel Container with 2px gold hairline top */}
        <div className="relative rounded-[4px] bg-surface border border-border border-t-2 border-t-gold shadow-2xl py-2 overflow-hidden backdrop-blur-md">
          <ul className="divide-y divide-border/60">
            {item.children?.map((child) => {
              const isChildItemActive = location.pathname === child.path;

              return (
                <li key={child.path}>
                  <Link
                    to={child.path}
                    aria-current={isChildItemActive ? 'page' : undefined}
                    className={`block px-4 py-3 transition-colors duration-150 group focus:outline-none focus:bg-surface-elevated ${
                      isChildItemActive
                        ? 'bg-surface-elevated text-gold'
                        : 'text-text-muted hover:text-text hover:bg-surface-elevated'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-serif text-sm sm:text-base font-bold text-text group-hover:text-gold transition-colors">
                        {child.label}
                      </span>
                      {child.badge && (
                        <span className="text-[10px] uppercase tracking-luxury font-semibold px-1.5 py-0.5 rounded-sm bg-gold/15 text-gold border border-gold/30">
                          {child.badge}
                        </span>
                      )}
                    </div>
                    {child.description && (
                      <p className="text-xs text-text-subtle leading-tight line-clamp-1">
                        {child.description}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Category Summary Footer Link */}
          <div className="px-4 py-2 mt-1 bg-ink/60 border-t border-border flex items-center justify-between text-xs">
            <Link
              to={item.path}
              className="text-gold hover:text-gold-soft transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Explore all {item.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
