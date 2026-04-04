import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const coupons = [
  {
    title: 'Oil Change Offers',
    desc: 'Save on conventional or synthetic blend oil changes with filter replacement and multi-point inspection.',
    tag: 'Popular',
  },
  {
    title: 'Brake Service Offers',
    desc: 'Check current savings on brake pad replacement, rotor inspection, and brake fluid service.',
    tag: 'Savings',
  },
  {
    title: 'A/C Service Offers',
    desc: 'View seasonal deals on A/C system diagnostics and refrigerant recharge services.',
    tag: 'Seasonal',
  },
  {
    title: 'Bundle & Save',
    desc: 'Combine services for exclusive multi-service discounts at your local Meineke center.',
    tag: 'Bundle',
  },
];

export default function Coupons() {
  return (
    <section
      id="coupons"
      aria-label="Special Offers and Coupons"
      className="section-pad"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
      }}
    >
      <div className="container">
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
              Special Offers
            </span>
            <h2 style={{ marginTop: 'var(--space-1)', color: 'var(--color-secondary)' }}>
              Save With <span className="text-gradient-gold">Coupons</span>
            </h2>
            <p style={{
              color: 'var(--color-text-muted)',
              maxWidth: '500px',
              margin: 'var(--space-2) auto 0',
            }}>
              Quality auto repair does not have to break the bank. Take advantage of our current offers.
            </p>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-3)',
        }}>
          {coupons.map((coupon, i) => (
            <AnimatedSection key={coupon.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                style={{
                  background: 'var(--color-white-warm)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '2px solid var(--color-surface)',
                  transition: 'all var(--duration-fast) ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top bar */}
                <div style={{
                  background: 'var(--color-secondary)',
                  padding: 'var(--space-3) var(--space-4)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'var(--text-h3)',
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em',
                  }}>
                    {coupon.title}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-secondary)',
                    background: 'var(--color-primary)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {coupon.tag}
                  </span>
                </div>

                {/* Content */}
                <div style={{
                  padding: 'var(--space-4)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)',
                    flex: 1,
                    marginBottom: 'var(--space-3)',
                  }}>
                    {coupon.desc}
                  </p>

                  {/* Dashed divider */}
                  <div style={{
                    borderTop: '2px dashed var(--color-gray-mech)',
                    marginBottom: 'var(--space-2)',
                  }} />

                  <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                    lineHeight: 'var(--leading-body)',
                    marginBottom: 'var(--space-2)',
                  }}>
                    Offers vary by location. Visit your nearest center for details.
                  </p>
                  <a href="#contact" className="btn-dark" style={{
                    padding: '0.65rem 1.2rem',
                    fontSize: 'var(--text-small)',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}>
                    View Current Offers
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
