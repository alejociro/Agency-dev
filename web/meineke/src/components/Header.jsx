import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'e-Inspection', href: '#einspection' },
  { label: 'Rewards', href: '#rewards' },
  { label: 'Coupons', href: '#coupons' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all var(--duration-base) var(--ease-out-expo)',
        borderBottom: scrolled ? '1px solid rgba(254,222,15,0.15)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--color-secondary)',
            letterSpacing: '-0.05em',
          }}>
            M
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--color-primary)',
            letterSpacing: '-0.02em',
          }}>
            MEINEKE
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'var(--text-small)',
                color: 'var(--color-white-warm)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'color var(--duration-fast) ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--color-white-warm)'}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: 'var(--text-small)' }}>
            Book Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
          }}
        >
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: 'var(--color-primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }} />
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: 'var(--color-primary)',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: 'var(--color-primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13,13,13,0.98)',
              padding: 'var(--space-8) var(--space-4)',
              display: 'none',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'var(--text-h3)',
                  color: 'var(--color-white-warm)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid rgba(254,222,15,0.1)',
                  paddingBottom: 'var(--space-2)',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
