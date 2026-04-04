import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const reasons = [
  {
    title: '50+ Years of Trust',
    desc: 'Since 1972, we have built our reputation on honest, reliable auto repair. Generations of families trust Meineke to keep them on the road.',
    highlight: 'Est. 1972',
  },
  {
    title: '900+ Locations',
    desc: 'From coast to coast, there is always a Meineke nearby. Convenient locations with certified technicians ready to serve you.',
    highlight: 'Nationwide',
  },
  {
    title: 'Transparent Pricing',
    desc: 'No hidden fees, no surprises. Our e-Inspection technology lets you see exactly what your vehicle needs before any work begins.',
    highlight: 'No Surprises',
  },
  {
    title: 'Financing Available',
    desc: 'Need repairs but tight on budget? Pre-qualify for financing in minutes with no impact on your credit score.',
    highlight: 'Pre-Qualify Now',
  },
];

const socialProof = [
  {
    metric: '4.6',
    label: 'Average Rating',
    desc: 'Across all Meineke locations nationwide, customers consistently rate their experience highly.',
    icon: '★',
  },
  {
    metric: '12,500+',
    label: 'Customer Reviews',
    desc: 'Thousands of verified reviews from real customers who trust Meineke with their vehicles.',
    icon: '✦',
  },
  {
    metric: '50+',
    label: 'Years of Service',
    desc: 'More than five decades of auto repair expertise, building trust one vehicle at a time since 1972.',
    icon: '◆',
  },
];

export default function WhyMeineke() {
  return (
    <section
      id="why-meineke"
      aria-label="Why Choose Meineke"
      style={{
        background: 'var(--color-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="section-pad"
    >
      {/* Grid bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(254,222,15,0.05) 0%, transparent 50%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-small)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Why Choose Us
            </span>
            <h2 style={{
              color: 'var(--color-white-warm)',
              marginTop: 'var(--space-1)',
            }}>
              Built on <span className="text-gradient-gold">Trust & Expertise</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Reasons grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-12)',
        }} className="reasons-grid">
          {reasons.map((reason, i) => (
            <AnimatedSection key={reason.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(254,222,15,0.3)' }}
                style={{
                  background: 'var(--color-dark-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  border: '1px solid rgba(254,222,15,0.08)',
                  transition: 'all var(--duration-fast) ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(254,222,15,0.1)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: 'var(--space-3)',
                  width: 'fit-content',
                }}>
                  {reason.highlight}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-white-warm)',
                  marginBottom: '0.75rem',
                  fontSize: 'var(--text-h3)',
                }}>
                  {reason.title}
                </h3>
                <p style={{
                  color: 'rgba(250,248,244,0.55)',
                  fontSize: 'var(--text-small)',
                  lineHeight: 'var(--leading-body)',
                  flex: 1,
                }}>
                  {reason.desc}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Social Proof Metrics */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-h2)',
              color: 'var(--color-white-warm)',
            }}>
              Trusted by <span className="text-gradient-gold">Thousands</span>
            </h3>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-3)',
        }} className="testimonials-grid">
          {socialProof.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, borderColor: 'rgba(254,222,15,0.3)' }}
                style={{
                  background: 'var(--color-dark-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  border: '1px solid rgba(254,222,15,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all var(--duration-fast) ease',
                }}
              >
                <span style={{
                  fontSize: '2rem',
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--space-2)',
                  lineHeight: 1,
                }}>
                  {item.icon}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-h1)',
                  color: 'var(--color-primary)',
                  lineHeight: 1,
                  marginBottom: 'var(--space-1)',
                  letterSpacing: '-0.02em',
                }}>
                  {item.metric}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-white-warm)',
                  marginBottom: 'var(--space-2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {item.label}
                </span>
                <p style={{
                  color: 'rgba(250,248,244,0.55)',
                  fontSize: 'var(--text-small)',
                  lineHeight: 'var(--leading-body)',
                }}>
                  {item.desc}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .reasons-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .reasons-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
