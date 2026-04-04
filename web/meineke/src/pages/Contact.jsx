import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly to confirm your appointment.');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--color-white-warm)',
    border: '2px solid var(--color-gray-mech)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-body)',
    color: 'var(--color-text)',
    transition: 'border-color var(--duration-fast) ease',
    outline: 'none',
  };

  return (
    <section
      id="contact"
      aria-label="Schedule an Appointment"
      className="section-pad"
      style={{
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute',
        bottom: '-5%',
        left: '-5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
        filter: 'blur(50px)',
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-8)',
          alignItems: 'start',
        }} className="contact-grid">
          {/* Left: info */}
          <AnimatedSection direction="left">
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'var(--text-small)',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Book Your Service
            </span>
            <h2 style={{ marginTop: 'var(--space-1)', color: 'var(--color-secondary)', marginBottom: 'var(--space-3)' }}>
              Schedule an{' '}
              <span className="text-gradient-gold">Appointment</span>
            </h2>
            <p style={{
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-body)',
              marginBottom: 'var(--space-6)',
              maxWidth: '440px',
            }}>
              Ready to get your vehicle serviced? Fill out the form and we will confirm your appointment at your nearest Meineke location.
            </p>

            {/* Find Your Location CTA */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              border: '2px solid var(--color-gray-mech)',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-secondary)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)',
              }}>
                PIN
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'var(--text-h3)',
                color: 'var(--color-secondary)',
                marginBottom: 'var(--space-1)',
              }}>
                900+ Locations Nationwide
              </h3>
              <p style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-body)',
                marginBottom: 'var(--space-3)',
              }}>
                Find your nearest Meineke center for hours, phone number, directions, and available services.
              </p>
              <a
                href="https://www.meineke.com/store-locator/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex' }}
              >
                Find Your Location
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection direction="right">
            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
              style={{
                background: 'var(--color-white-warm)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                border: '1px solid var(--color-gray-mech)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }} className="form-row">
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-secondary)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-mech)'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-secondary)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@email.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-mech)'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }} className="form-row">
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-secondary)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-mech)'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'var(--text-small)',
                    color: 'var(--color-secondary)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-mech)'}
                  >
                    <option value="">Select a service</option>
                    <option value="oil">Oil Change</option>
                    <option value="brakes">Brakes</option>
                    <option value="tires">Tires & Wheels</option>
                    <option value="exhaust">Exhaust & Mufflers</option>
                    <option value="ac">A/C Service</option>
                    <option value="steering">Steering & Suspension</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-2)' }}>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'var(--text-small)',
                  color: 'var(--color-secondary)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your vehicle issue or preferred appointment time..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-mech)'}
                />
              </div>

              <button type="submit" className="btn-primary" style={{
                width: '100%',
                marginTop: 'var(--space-4)',
                justifyContent: 'center',
                padding: '1.1rem 2rem',
              }}>
                Schedule Appointment
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <p style={{
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                marginTop: 'var(--space-2)',
              }}>
                We will respond within 2 business hours to confirm your appointment.
              </p>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
