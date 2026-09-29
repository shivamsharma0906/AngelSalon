import React from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const WelcomePrivilege: React.FC = () => {

  return (
    <section className="py-12 sm:py-16 bg-ink relative overflow-hidden" aria-label="First-Time Guest Privilege">
      <Container size="lg">
        <div className="relative rounded-3xl bg-gradient-to-r from-surface via-surface-elevated to-surface border border-gold/50 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Gold Radiance */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs uppercase tracking-luxury font-bold mb-4">
                <span>✦ Exclusive Guest Invitation</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-text mb-3 leading-tight">
                Claim 20% Off Your First Luxury Experience
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light max-w-2xl mb-6">
                New to Angels Salon & Academy? Experience our hospital-grade hygiene, Vidal Sassoon-trained master stylists, and authentic European formulations with a 20% privilege on your initial hair or skin session.
              </p>

              {/* Privilege Terms Pills */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-subtle">
                <span className="flex items-center gap-1.5">
                  <span className="text-gold">✓</span> Applicable on Hair & Skin
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-gold">✓</span> Free Hair/Skin Diagnostic
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-gold">✓</span> Ghatkopar East Flagship
                </span>
              </div>
            </div>

            {/* Right Action & Code Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-ink/80 border border-gold/40 text-center shadow-lg">
              <span className="text-[11px] uppercase tracking-wider text-text-muted mb-1 font-semibold">
                Use Privilege Code
              </span>
              <div className="font-mono text-xl sm:text-2xl font-black text-gold tracking-widest px-4 py-2 rounded-lg bg-gold/10 border border-gold/30 mb-4 select-all">
                ANGELVIP20
              </div>

              <Button
                as="a"
                href="/contact"
                variant="gold"
                size="md"
                fullWidth
                className="shadow-gold-sm font-bold"
              >
                Claim Your 20% Discount
              </Button>

              <span className="text-[10px] text-text-subtle mt-2">
                Instant confirmation • Valid 7 days
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WelcomePrivilege;
