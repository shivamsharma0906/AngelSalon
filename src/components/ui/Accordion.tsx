import React, { useState } from 'react';

export interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]); // All closed by default

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headingId = `faq-heading-${index}`;
        const contentId = `faq-content-${index}`;

        return (
          <div
            key={index}
            className={`border rounded-sm transition-all duration-300 ${
              isOpen
                ? 'border-gold/40 bg-surface-elevated shadow-gold-sm'
                : 'border-border bg-surface hover:border-gold/20'
            }`}
          >
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(index)}
                className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-semibold text-text focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <span>{item.question}</span>
                <span
                  className={`inline-flex shrink-0 items-center justify-center w-7 h-7 rounded-full border border-border text-gold transition-transform duration-300 ${
                    isOpen ? 'rotate-180 border-gold bg-gold/10' : ''
                  }`}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={`px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-text-muted leading-relaxed transition-all duration-300 border-t ${
                isOpen ? 'border-border/50 pt-4 block' : 'hidden'
              }`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
