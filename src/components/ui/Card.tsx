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
      data-card-hover={hoverEffect ? '' : undefined}
      className={`relative bg-surface border border-gold/30 rounded-[4px] shadow-card-light transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-gold hover:-translate-y-1 hover:shadow-card-hover focus-within:border-gold'
          : ''
      } ${glow ? 'border-gold shadow-gold-sm' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
