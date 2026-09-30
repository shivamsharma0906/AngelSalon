import React from 'react';

export type SectionTone = 'ink' | 'surface';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  tone = 'ink',
  hasTopBorder = false,
  hasBottomBorder = false,
  className = '',
  children,
  ...props
}) => {
  const toneClasses = tone === 'surface' ? 'bg-surface' : 'bg-ink';
  const topBorderClass = hasTopBorder ? 'border-t border-gold/25' : '';
  const bottomBorderClass = hasBottomBorder ? 'border-b border-gold/25' : '';

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
