import React from 'react';

export interface BadgeProps {
  variant?: 'gold' | 'outline' | 'surface';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  children,
  className = '',
}) => {
  const variantClasses = {
    gold: 'bg-gold/15 text-gold border border-gold/30',
    outline: 'bg-transparent text-gold-soft border border-gold/40',
    surface: 'bg-surface text-text-muted border border-border',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
