import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const services = [
  {
    id: 'oil',
    title: 'Oil Change',
    desc: 'Regularly changing your oil and filter keeps your engine running at peak performance. Our certified technicians use quality oils and filters to extend the life of your engine.',
    details: 'Conventional, synthetic blend, or full synthetic options available. Includes multi-point inspection.',
    duration: '30-45 min',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="10"/><path d="M16 10v6l4 2"/></svg>
    ),
  },
  {
    id: 'brakes',
    title: 'Brakes',
    desc: 'Brake maintenance is crucial to keeping your vehicle operating safely. We inspect, repair, and replace brake pads, rotors, calipers, and brake fluid.',
    details: 'Free brake inspection. Includes pad replacement, rotor resurfacing, and brake fluid check.',
    duration: '1-2 hours',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="5"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4"/></svg>
    ),
  },
  {
    id: 'tires',
    title: 'Tires & Wheels',
    desc: 'Regular tire inspection and service prevents blowouts, flats, and costly accidents. We offer rotation, balancing, alignment, and new tire installation.',
    details: 'Includes tire pressure check, tread depth measurement, rotation, and wheel alignment services.',
    duration: '45-90 min',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="7"/><circle cx="16" cy="16" r="2"/></svg>
    ),
  },
  {
    id: 'exhaust',
    title: 'Exhaust & Mufflers',
    desc: 'Since 1972, we have been the muffler experts. Mufflers do more than keep your car quiet — they protect you from harmful exhaust fumes and improve performance.',
    details: 'Muffler repair/replacement, catalytic converter service, exhaust pipe repair, and emissions testing.',
    duration: '1-3 hours',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 20h8l4-4h8l4 4"/><path d="M8 20v6M24 20v6M12 16v-4c0-2 2-4 4-4s4 2 4 4v4"/></svg>
    ),
  },
  {
    id: 'ac',
    title: 'A/C Service',
    desc: 'Keep your car cool and increase gas mileage with regular AC checks. We diagnose and repair all air conditioning system components.',
    details: 'AC recharge, compressor repair, condenser service, and full system diagnostic.',
    duration: '1-2 hours',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 4v24M10 8l6 4 6-4M10 24l6-4 6 4M4 16h24"/></svg>
    ),
  },
  {
    id: 'steering',
    title: 'Steering & Suspension',
    desc: 'Your steering and suspension work together to keep your ride smooth and handling precise. We service shocks, struts, tie rods, and power steering.',
    details: 'Shock/strut replacement, power steering fluid flush, tie rod replacement, and alignment.',
    duration: '2-4 hours',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="16" cy="16" r="10"/><path d="M16 6v4M16 22v4M8 12l3 2M21 18l3 2M8 20l3-2M21 12l3-2"/></svg>
    ),
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="services"
      aria-label="Auto Repair Services"
      className="section-pad"
      style={{ background: 'var(--color-bg)', position: 'relative' }}
    >
      {/* Decorative diagonal line */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-2%',
        width: '30%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
        transform: 'rotate(8deg)',
        opacity: 0.15,
      }} />

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
              What We Do
            </span>
            <h2 style={{ marginTop: 'var(--space-1)', color: 'var(--color-secondary)' }}>
              Auto Repair <span className="text-gradient-gold">Services</span>
            </h2>
            <p style={{
              color: 'var(--color-text-muted)',
              maxWidth: '550px',
              margin: 'var(--space-2) auto 0',
            }}>
              From oil changes to complete engine overhauls, our certified technicians handle it all with precision and care.
            </p>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-3)',
        }}>
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.1}>
              <motion.div
                onClick={() => setActive(active === service.id ? null : service.id)}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                  cursor: 'pointer',
                  border: active === service.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                  transition: 'border-color var(--duration-fast) ease',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: active === service.id ? 'var(--color-primary)' : 'var(--color-secondary)',
                    color: active === service.id ? 'var(--color-secondary)' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all var(--duration-fast) ease',
                  }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'var(--text-h3)',
                      color: 'var(--color-secondary)',
                      marginBottom: '0.5rem',
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      color: 'var(--color-text-muted)',
                      fontSize: 'var(--text-small)',
                      lineHeight: 'var(--leading-body)',
                    }}>
                      {service.desc}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {active === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        marginTop: 'var(--space-3)',
                        paddingTop: 'var(--space-3)',
                        borderTop: '1px solid rgba(26,26,26,0.1)',
                      }}>
                        <p style={{
                          color: 'var(--color-text)',
                          fontSize: 'var(--text-small)',
                          lineHeight: 'var(--leading-body)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {service.details}
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 600,
                            fontSize: 'var(--text-small)',
                            color: 'var(--color-accent)',
                          }}>
                            Est. time: {service.duration}
                          </span>
                          <a href="#contact" className="btn-primary" style={{
                            padding: '0.5rem 1rem',
                            fontSize: 'var(--text-small)',
                          }}>
                            Book Now
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
