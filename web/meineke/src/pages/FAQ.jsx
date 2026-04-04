import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const faqs = [
  {
    q: 'How often should I change my oil?',
    a: 'For conventional oil, every 3,000-5,000 miles is recommended. For synthetic oil, you can typically go 7,500-10,000 miles between changes. Check your owner manual for specific recommendations for your vehicle.',
  },
  {
    q: 'How do I know if my brakes need replacing?',
    a: 'Common signs include squealing or grinding noises when braking, vibration in the steering wheel or brake pedal, longer stopping distances, and the brake warning light on your dashboard. We offer free brake inspections at all locations.',
  },
  {
    q: 'What is the Meineke e-Inspection?',
    a: 'Our digital inspection system sends you real-time photos and videos of your vehicle inspection directly to your phone. You can see exactly what needs attention and approve additional services right from your device — complete transparency.',
  },
  {
    q: 'How does the rewards program work?',
    a: 'Sign up for free and automatically earn points every time you get service at any Meineke location. Redeem points for free maintenance services, get free towing, and keep track of your complete service history.',
  },
  {
    q: 'Do you offer financing for repairs?',
    a: 'Yes. We offer special financing options that let you pre-qualify with no impact on your credit score. Get the repairs you need now and pay over time with flexible payment plans.',
  },
  {
    q: 'How long does a typical service take?',
    a: 'It depends on the service. Oil changes typically take 30-45 minutes, brake services 1-2 hours, and more complex repairs may take longer. We provide estimated times for all services and keep you updated via e-Inspection.',
  },
  {
    q: 'Can I schedule an appointment online?',
    a: 'Absolutely. Use our online booking tool to schedule your service at any Meineke location. Choose your preferred date and time, and we will have everything ready when you arrive.',
  },
];

function FAQItem({ faq, isOpen, toggle }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(26,26,26,0.1)',
    }}>
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-3) 0',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-body)',
          color: isOpen ? 'var(--color-accent)' : 'var(--color-secondary)',
          textAlign: 'left',
          transition: 'color var(--duration-fast) ease',
          gap: 'var(--space-2)',
        }}
      >
        {faq.q}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '1.5rem',
            lineHeight: 1,
            flexShrink: 0,
            color: 'var(--color-primary)',
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--leading-body)',
              paddingBottom: 'var(--space-3)',
              maxWidth: '700px',
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="section-pad"
      style={{
        background: 'var(--color-surface)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'var(--space-8)',
          alignItems: 'start',
        }} className="faq-grid">
          {/* Left: heading */}
          <AnimatedSection direction="left">
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Got Questions?
            </span>
            <h2 style={{ marginTop: 'var(--space-1)', color: 'var(--color-secondary)' }}>
              Frequently Asked{' '}
              <span className="text-gradient-gold">Questions</span>
            </h2>
            <p style={{
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-2)',
              lineHeight: 'var(--leading-body)',
            }}>
              Everything you need to know about our services. Can not find your answer? Contact us directly.
            </p>
            <a href="#contact" className="btn-dark" style={{ marginTop: 'var(--space-4)', display: 'inline-flex' }}>
              Ask a Question
            </a>
          </AnimatedSection>

          {/* Right: accordion */}
          <AnimatedSection direction="right">
            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openIdx === i}
                  toggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
