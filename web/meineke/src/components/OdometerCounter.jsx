import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ end, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 900, suffix: '+', label: 'Locations' },
  { value: 50, suffix: '+', label: 'Years of Trust' },
  { value: 1, suffix: 'M+', label: 'Cars Serviced' },
];

export default function OdometerCounter() {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--color-primary)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'var(--text-small)',
            color: 'var(--color-white-warm)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginTop: '0.5rem',
            opacity: 0.7,
          }}>
            {stat.label}
          </div>
          {i < stats.length - 1 && (
            <div style={{
              position: 'absolute',
              right: '-1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1px',
              height: '40px',
              background: 'rgba(254,222,15,0.2)',
            }} className="stat-divider" />
          )}
        </motion.div>
      ))}
      <style>{`
        @media (max-width: 640px) {
          .stat-divider { display: none; }
        }
      `}</style>
    </div>
  );
}
