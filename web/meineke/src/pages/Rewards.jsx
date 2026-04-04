import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const steps = [
  {
    num: '01',
    title: 'Get Service',
    desc: 'Bring your vehicle to any Meineke location for maintenance or repair.',
  },
  {
    num: '02',
    title: 'Earn Points',
    desc: 'Automatically earn rewards points with every service visit.',
  },
  {
    num: '03',
    title: 'Save Money',
    desc: 'Redeem points for free maintenance services and exclusive perks.',
  },
];

const perks = [
  'Keep track of valuable rewards points',
  'Redeem points for free maintenance',
  'Receive free towing services',
  'View complete vehicle service history',
  'Save your favorite Meineke shop',
];

export default function Rewards() {
  return (
    <section
      id="rewards"
      aria-label="Meineke Rewards Program"
      className="section-pad"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blob */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
        opacity: 0.4,
        filter: 'blur(60px)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Rewards Program
            </span>
            <h2 style={{ marginTop: 'var(--space-1)', color: 'var(--color-secondary)' }}>
              Earn Points. <span className="text-gradient-gold">Save Big.</span>
            </h2>
            <p style={{
              color: 'var(--color-text-muted)',
              maxWidth: '500px',
              margin: 'var(--space-2) auto 0',
            }}>
              Sign up for our FREE rewards program and start saving on every visit.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
        }} className="rewards-steps">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.15}>
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-h2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  }}
                >
                  {step.num}
                </motion.div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-h3)',
                  color: 'var(--color-secondary)',
                  marginBottom: '0.5rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-small)',
                  maxWidth: '280px',
                  margin: '0 auto',
                }}>
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="step-connector" style={{
                    position: 'absolute',
                    top: '40px',
                    right: '-2rem',
                    width: '4rem',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                    opacity: 0.4,
                  }} />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Perks card */}
        <AnimatedSection>
          <motion.div
            whileHover={{ y: -4 }}
            style={{
              background: 'var(--color-secondary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-6)',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="perks-card"
          >
            {/* Decorative corner glow */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'var(--color-primary-glow)',
              filter: 'blur(40px)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-h2)',
                color: 'var(--color-primary)',
                marginBottom: 'var(--space-2)',
              }}>
                Member Perks
              </h3>
              <p style={{
                color: 'rgba(250,248,244,0.6)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-body)',
              }}>
                Join thousands of drivers who save on every service with our free rewards program.
              </p>
              <a href="#contact" className="btn-primary" style={{ marginTop: 'var(--space-4)', display: 'inline-flex' }}>
                Sign Up Free
              </a>
            </div>

            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              position: 'relative',
              zIndex: 1,
            }}>
              {perks.map((perk, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--color-white-warm)',
                    fontSize: 'var(--text-body)',
                  }}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-primary)',
                    color: 'var(--color-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    &#10003;
                  </span>
                  {perk}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .rewards-steps { grid-template-columns: 1fr !important; }
          .step-connector { display: none !important; }
          .perks-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
