# WEB — PASO 6: COMPONENTES REUTILIZABLES

Solo aplica si el stack es `react` o `astro`. Para HTML vanilla, estos se crean directamente en cada página.

---

## Button
```jsx
const variants = {
  primary:   'btn-primary bg-[--color-primary] text-white',
  secondary: 'border border-[--color-primary] text-[--color-primary]',
  ghost:     'text-[--color-text] underline-offset-4 hover:underline',
  icon:      'p-3 rounded-full bg-[--color-surface]',
};

export function Button({ variant = 'primary', children, href, ...props }) {
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} className={`btn ${variants[variant]}`} {...props}>{children}</Tag>;
}
```

---

## Card
```jsx
export function Card({ variant = 'service', data }) {
  if (variant === 'service') return <ServiceCard {...data} />;
  if (variant === 'testimonial') return <TestimonialCard {...data} />;
  if (variant === 'portfolio') return <PortfolioCard {...data} />;
  if (variant === 'team') return <TeamCard {...data} />;
}
```

---

## SectionHeader
```jsx
export function SectionHeader({ tag, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-header text-${align}`} data-animate="fade-up">
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
```

---

## AnimatedCounter
```jsx
import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const update = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(update);
        else setCount(target);
      };
      requestAnimationFrame(update);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
```

---

## ScrollProgress
```jsx
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight) * 100);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-[--color-primary] z-50 transition-none"
      style={{ width: `${progress}%` }}
    />
  );
}
```

---

## Para Astro — mismos componentes como .astro

Los componentes aplican como archivos `.astro` con `<script>` inline para lógica JS.
Usar `client:visible` para componentes interactivos que necesitan JS (hidratación parcial).
