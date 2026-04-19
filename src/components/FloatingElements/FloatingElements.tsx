import { useMemo } from 'react';
import './FloatingElements.css';

const HEART_CHARS = ['♡', '♥', '💖', '💕', '💗', '💘'];

const HEART_STYLES = [
  { color: 'rgba(255,255,255,0.9)', filter: 'grayscale(1) brightness(2)' },
  { color: 'rgba(255,255,255,0.6)', filter: 'grayscale(1) brightness(1.6)' },
  { color: 'rgba(110,14,27,0.25)', filter: 'grayscale(1) sepia(1) hue-rotate(-20deg) saturate(2)' },
  { color: 'rgba(110,14,27,0.15)', filter: 'grayscale(1) sepia(1) hue-rotate(-20deg) saturate(1.5)' },
];

interface Heart {
  id: number;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  char: string;
  color: string;
  filter: string;
  swayClass: string;
}

export default function FloatingElements() {
  const hearts = useMemo<Heart[]>(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const style = HEART_STYLES[Math.floor(Math.random() * HEART_STYLES.length)];

      return {
        id: i,
        left: `${2 + Math.random() * 96}%`,
        size: 14 + Math.random() * 16,
        opacity: 0.15 + Math.random() * 0.25,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 20,
        char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
        color: style.color,
        filter: style.filter,
        swayClass: `leaf-sway-${(i % 3) + 1}`,
      };
    });
  }, []);

  return (
    <div className="floating-elements" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className={`falling-leaf ${h.swayClass}`}
          style={{
            left: h.left,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            color: h.color,
            filter: h.filter,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
}