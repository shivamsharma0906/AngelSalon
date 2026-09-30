import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1200,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Parse the value string: e.g. "15,000+", "4.7★", "10+"
    const rawNumberMatch = value.match(/([\d,.]+)/);
    if (!rawNumberMatch) return;

    const matchedStr = rawNumberMatch[0];
    const prefix = value.slice(0, rawNumberMatch.index);
    const suffix = value.slice((rawNumberMatch.index || 0) + matchedStr.length);
    const cleanNum = parseFloat(matchedStr.replace(/,/g, ''));
    const isDecimal = matchedStr.includes('.');
    const decimalPlaces = isDecimal ? (matchedStr.split('.')[1]?.length || 1) : 0;
    const hasComma = matchedStr.includes(',');

    if (isNaN(cleanNum)) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    let rAFId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentNum = easeProgress * cleanNum;

            let formattedNum: string;
            if (isDecimal) {
              formattedNum = currentNum.toFixed(decimalPlaces);
            } else {
              const rounded = Math.round(currentNum);
              formattedNum = hasComma ? rounded.toLocaleString('en-US') : rounded.toString();
            }

            setDisplayValue(`${prefix}${formattedNum}${suffix}`);

            if (progress < 1) {
              rAFId = requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          rAFId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      cancelAnimationFrame(rAFId);
      if (currentEl) observer.unobserve(currentEl);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className} aria-label={value}>
      {displayValue}
    </span>
  );
};

export default CountUp;
