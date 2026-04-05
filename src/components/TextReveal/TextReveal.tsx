import { useEffect, useRef } from 'react';
import './TextReveal.css';

interface TextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  mode?: 'word' | 'char';
  delay?: number;
  staggerMs?: number;
}

export default function TextReveal({
  text,
  tag: Tag = 'span',
  className = '',
  mode = 'word',
  delay = 0,
  staggerMs = 80,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('text-reveal--visible');
        } else {
          el.classList.remove('text-reveal--visible');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const units = mode === 'word' ? text.split(' ') : text.split('');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`text-reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="text-reveal-unit"
          style={{ transitionDelay: `${delay + i * staggerMs}ms` }}
        >
          {unit}
          {mode === 'word' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
