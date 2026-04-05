import { useEffect, useRef, type ReactNode } from 'react';
import './SectionReveal.css';

interface SectionRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'zoom';
  className?: string;
}

export default function SectionReveal({
  children,
  direction = 'up',
  className = '',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-reveal--visible');
        } else {
          el.classList.remove('section-reveal--visible');
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        el.classList.add('section-reveal--visible');
      } else {
        el.classList.remove('section-reveal--visible');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`section-reveal section-reveal--${direction} ${className}`}
    >
      {children}
    </div>
  );
}
