import React from 'react';
import { motion } from 'framer-motion';
import SparkParticles from '../components/SparkParticles';
import OdometerCounter from '../components/OdometerCounter';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Trusted Auto Repair Experts"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-dark)',
        overflow: 'hidden',
        padding: 'var(--space-16) var(--container-padding) var(--space-8)',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(254,222,15,0.06) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(254,222,15,0.04) 0%, transparent 40%),
          repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(254,222,15,0.02) 100px, rgba(254,222,15,0.02) 101px),
          repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(254,222,15,0.02) 100px, rgba(254,222,15,0.02) 101px)
        `,
        zIndex: 0,
      }} />

      <SparkParticles count={25} />

      {/* Diagonal break element */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '-5%',
          width: '40%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          transform: 'rotate(-12deg)',
          transformOrigin: 'right center',
          opacity: 0.4,
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            border: '1px solid rgba(254,222,15,0.3)',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'var(--text-small)',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 'var(--space-4)',
          }}
        >
          Since 1972 — Expert Auto Care
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'var(--text-hero)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color: 'var(--color-white-warm)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-3)',
          }}
        >
          Trusted Auto
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Repair Experts
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
            color: 'rgba(250,248,244,0.7)',
            lineHeight: 'var(--leading-body)',
            maxWidth: '600px',
            margin: '0 auto var(--space-6)',
          }}
        >
          Complete auto repair and maintenance services at 900+ locations.
          Expert technicians, innovative e-Inspection, and rewards that save you money.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}
        >
          <a href="#contact" className="btn-primary" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
            Book Your Service
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#services" className="btn-outline" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
            View Services
          </a>
        </motion.div>

        <OdometerCounter />
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
        zIndex: 3,
      }} />
    </section>
  );
}
