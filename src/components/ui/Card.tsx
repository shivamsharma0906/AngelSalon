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
      className={`relative bg-raised border border-gold/30 rounded-[4px] transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-gold-line hover:-translate-y-1.5 focus-within:border-gold-line'
          : ''
      } ${glow ? 'border-gold-line' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
