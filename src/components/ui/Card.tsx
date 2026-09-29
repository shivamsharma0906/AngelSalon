import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  hoverEffect = true,
  glow = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`relative bg-surface rounded-sm border border-border transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-gold/50 hover:bg-surface-elevated hover:shadow-gold-sm hover:-translate-y-1'
          : ''
      } ${glow ? 'shadow-gold-sm border-gold/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
