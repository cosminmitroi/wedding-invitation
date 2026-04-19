import { useMemo } from 'react';
import TextReveal from '../TextReveal/TextReveal';
import './Hero.css';

const HEART_COUNT = 12;

function HeroHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => ({
        id: i,
        left: `${4 + Math.random() * 92}%`,
        size: 10 + Math.random() * 16,
        opacity: 0.12 + Math.random() * 0.25,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 12,
      })),
    []
  );

  return (
    <div className="hero-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="hero-heart"
          style={{
            left: h.left,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const y = Number.isFinite(scrollY) ? scrollY : 0;
  const bgOffset = isMobile ? 0 : y * 0.4;
  const contentOffset = isMobile ? 0 : y * 0.6;
  const contentOpacity = Math.max(1 - y / 700, 0);

  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ transform: `translateY(${bgOffset}px)` }}
      />
      <div className="hero-overlay" />
      <HeroHearts />
      <div
        className="hero-content"
        style={{
          transform: `translateY(${-contentOffset}px)`,
          opacity: contentOpacity,
        }}
      >
        <p className="hero-invite-text">
          <TextReveal text="Împreună cu familiile noastre" mode="word" staggerMs={60} />
        </p>
        <h1 className="hero-names">
          <TextReveal text="Gabriela" tag="span" className="hero-name" mode="char" delay={400} staggerMs={50} />
          <span className="hero-ampersand">&amp;</span>
          <TextReveal text="Cosmin" tag="span" className="hero-name" mode="char" delay={800} staggerMs={50} />
        </h1>
        <p className="hero-tagline">
          <TextReveal text="vă invităm să sărbătoriți alături de noi" mode="word" delay={1200} staggerMs={60} />
        </p>
        <div className="hero-date">
          <span className="hero-date-line" />
          <span className="hero-date-text">24 Octombrie 2026</span>
          <span className="hero-date-line" />
        </div>
        <p className="hero-location">Timișoara, România</p>
      </div>
      <div className="hero-scroll-indicator">
        <span>&#8595;</span>
      </div>
    </section>
  );
}
