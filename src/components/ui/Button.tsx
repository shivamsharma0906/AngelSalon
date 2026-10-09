import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'surface' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  as = 'button',
  href,
  target,
  rel,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none whitespace-nowrap";

  const sizeClasses = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 uppercase tracking-wider",
    md: "text-sm px-5 py-2.5 gap-2 uppercase tracking-luxury font-semibold",
    lg: "text-base px-7 py-3.5 gap-2.5 uppercase tracking-luxury font-semibold shadow-gold-sm hover:shadow-gold-md",
  };

  const variantClasses = {
    gold: "bg-gold hover:bg-gold-hover text-text font-bold border border-gold shadow-sm hover:scale-[1.01] active:scale-[0.99]",
    outline: "bg-transparent hover:bg-gold/10 text-gold hover:text-gold-soft border border-gold/60 hover:border-gold active:scale-[0.99]",
    surface: "bg-surface hover:bg-surface-elevated text-text border border-border hover:border-gold/40 active:scale-[0.99]",
    whatsapp: "bg-whatsapp hover:bg-whatsapp-hover text-white font-bold border border-whatsapp shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
    ghost: "bg-transparent hover:bg-surface text-text-muted hover:text-text border border-transparent",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      ) : variant === 'whatsapp' ? (
        <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </>
  );

  if (as === 'a' && href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//') && target !== '_blank';
    if (isInternal) {
      return (
        <Link
          to={href}
          className={combinedClasses}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        data-btn-sweep={variant === 'gold' ? '' : undefined}
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      data-btn-sweep={variant === 'gold' ? '' : undefined}
      type={props.type || 'button'}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};
