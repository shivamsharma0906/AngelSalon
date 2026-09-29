import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
