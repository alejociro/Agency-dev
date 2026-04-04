import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const features = [
  {
    title: 'Real-Time Updates',
    desc: 'Get live service updates directly to your phone as our technicians work on your vehicle.',
    icon: '01',
  },
  {
    title: 'Inspection Photos',
    desc: 'View detailed photos of your vehicle inspection so you can see exactly what needs attention.',
    icon: '02',
  },
  {
    title: 'Approve From Your Phone',
    desc: 'No need to call or visit. Approve additional services right from your mobile device.',
    icon: '03',
  },
  {
    title: 'Repair Videos',
    desc: 'Watch informative videos explaining the repairs your vehicle needs, helping you make informed decisions.',
    icon: '04',
  },
];

export default function EInspection() {
  return (
    <section
      id="einspection"
      aria-label="Meineke e-Inspection Digital Service"
      style={{
        background: 'var(--color-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="section-pad"
    >
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(254,222,15,0.03) 60px, rgba(254,222,15,0.03) 61px),
          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(254,222,15,0.03) 60px, rgba(254,222,15,0.03) 61px)
        `,
      }} />

      {/* Diagonal break */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '60%',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, var(--color-primary), transparent)',
          transform: 'rotate(-5deg)',
          transformOrigin: 'left center',
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-8)',
          alignItems: 'center',
        }} className="einspection-grid">
          {/* Left: content */}
          <AnimatedSection direction="left">
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-small)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Innovation
            </span>
            <h2 style={{
              color: 'var(--color-white-warm)',
              marginTop: 'var(--space-1)',
              marginBottom: 'var(--space-3)',
            }}>
              Meineke{' '}
              <span className="text-gradient-gold">e-Inspection</span>
            </h2>
            <p style={{
              color: 'rgba(250,248,244,0.7)',
              lineHeight: 'var(--leading-body)',
              marginBottom: 'var(--space-4)',
              maxWidth: '480px',
            }}>
              Know the problem and the fix — all from your phone. Our digital inspection gives you full transparency into your vehicle service with real-time photos, videos, and approval capabilities.
            </p>
            <a href="#contact" className="btn-primary">
              Try e-Inspection
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </AnimatedSection>

          {/* Right: feature cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-2)',
          }}>
            {features.map((feat, i) => (
              <AnimatedSection key={feat.title} delay={i * 0.12} direction="right">
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(254,222,15,0.4)' }}
                  style={{
                    background: 'var(--color-dark-surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3)',
                    border: '1px solid rgba(254,222,15,0.1)',
                    transition: 'border-color var(--duration-fast) ease',
                    height: '100%',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-h2)',
                    color: 'var(--color-primary)',
                    opacity: 0.3,
                    lineHeight: 1,
                    marginBottom: 'var(--space-1)',
                  }}>
                    {feat.icon}
                  </div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                    color: 'var(--color-white-warm)',
                    marginBottom: '0.5rem',
                  }}>
                    {feat.title}
                  </h4>
                  <p style={{
                    color: 'rgba(250,248,244,0.55)',
                    fontSize: 'var(--text-small)',
                    lineHeight: 'var(--leading-body)',
                  }}>
                    {feat.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .einspection-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
