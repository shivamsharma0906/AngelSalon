import React from 'react';

export type SectionTone = 'background' | 'surface' | 'subtle' | 'dark' | 'ink';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  tone = 'background',
  hasTopBorder = false,
  hasBottomBorder = false,
  className = '',
  children,
  ...props
}) => {
  const toneClasses = {
    background: 'bg-background text-text',
    surface: 'bg-surface text-text',
    subtle: 'bg-surface-subtle text-text',
    dark: 'bg-dark text-text-inverse',
    ink: 'bg-background text-text',
  }[tone] || 'bg-background text-text';

  const topBorderClass = hasTopBorder ? 'border-t border-border' : '';
  const bottomBorderClass = hasBottomBorder ? 'border-b border-border' : '';

  return (
    <section
      className={`relative w-full overflow-x-clip ${toneClasses} ${topBorderClass} ${bottomBorderClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
