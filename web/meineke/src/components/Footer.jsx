import React from 'react';

const footerLinks = {
  services: [
    { label: 'Oil Change', href: '#services' },
    { label: 'Brakes', href: '#services' },
    { label: 'Tires & Wheels', href: '#services' },
    { label: 'A/C Service', href: '#services' },
    { label: 'Exhaust & Mufflers', href: '#services' },
    { label: 'Steering & Suspension', href: '#services' },
  ],
  company: [
    { label: 'About Meineke', href: '#why-meineke' },
    { label: 'Rewards Program', href: '#rewards' },
    { label: 'e-Inspection', href: '#einspection' },
    { label: 'Coupons', href: '#coupons' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Careers', href: '#' },
  ],
  legal: [
    { label: 'Privacy Center', href: '#' },
    { label: 'Mobile Terms', href: '#' },
    { label: 'Web Accessibility', href: '#' },
    { label: 'Site Map', href: '#' },
  ],
};

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/meinekecarcareusa', icon: 'fb' },
  { label: 'Instagram', href: 'https://www.instagram.com/meinekecarcare/', icon: 'ig' },
  { label: 'YouTube', href: 'https://www.youtube.com/user/MeinekeCorp', icon: 'yt' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-dark)',
      color: 'var(--color-white-warm)',
      paddingTop: 'var(--space-12)',
      paddingBottom: 'var(--space-4)',
    }}>
      <div className="container">
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid rgba(254,222,15,0.1)',
        }}>
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-secondary)',
              }}>M</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
              }}>MEINEKE</span>
            </div>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-small)',
              lineHeight: 'var(--leading-body)',
              maxWidth: '280px',
              opacity: 0.6,
            }}>
              Trusted auto repair since 1972. Expert technicians at 900+ locations nationwide, backed by our rewards program and e-Inspection technology.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(254,222,15,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    transition: 'all var(--duration-fast) ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary)';
                    e.currentTarget.style.color = 'var(--color-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }}
                >
                  {s.icon.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-small)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-3)',
            }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{
                    color: 'rgba(250,248,244,0.6)',
                    fontSize: 'var(--text-small)',
                    transition: 'color var(--duration-fast) ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(250,248,244,0.6)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-small)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-3)',
            }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{
                    color: 'rgba(250,248,244,0.6)',
                    fontSize: 'var(--text-small)',
                    transition: 'color var(--duration-fast) ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(250,248,244,0.6)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-small)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-3)',
            }}>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'rgba(250,248,244,0.6)', fontSize: 'var(--text-small)' }}>
              <p style={{ lineHeight: 'var(--leading-body)', maxWidth: '240px' }}>
                Find your nearest Meineke location for hours, contact info, and directions.
              </p>
              <a href="#contact" className="btn-primary" style={{
                padding: '0.6rem 1.2rem',
                fontSize: 'var(--text-small)',
                marginTop: '0.5rem',
                textAlign: 'center',
              }}>
                Find Your Location
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--space-2)',
          paddingTop: 'var(--space-4)',
        }}>
          <p style={{ color: 'rgba(250,248,244,0.4)', fontSize: 'var(--text-small)' }}>
            &copy; 2026 Meineke Car Care Centers, LLC. All Rights Reserved. A Family of Driven Brands.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {footerLinks.legal.map((l) => (
              <a key={l.label} href={l.href} style={{
                color: 'rgba(250,248,244,0.4)',
                fontSize: 'var(--text-small)',
                transition: 'color var(--duration-fast) ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(250,248,244,0.4)'}
              >{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
