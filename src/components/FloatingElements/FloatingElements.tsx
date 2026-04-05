import { useMemo } from 'react';
import './FloatingElements.css';

const LEAF_CHARS = ['🍂', '🍁', '🍃', '🌿'];
const LEAF_COLORS = ['#C9A96E', '#a85d32', '#c2742e', '#8B4513', '#D2691E'];

interface Leaf {
  id: number;
  left: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  char: string;
  color: string;
  swayClass: string;
}

export default function FloatingElements() {
  const leaves = useMemo<Leaf[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${2 + Math.random() * 96}%`,
      size: 14 + Math.random() * 18,
      opacity: 0.25 + Math.random() * 0.45,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * 20,
      char: LEAF_CHARS[Math.floor(Math.random() * LEAF_CHARS.length)],
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      swayClass: `leaf-sway-${(i % 3) + 1}`,
    }));
  }, []);

  return (
    <div className="floating-elements" aria-hidden="true">
      {leaves.map((l) => (
        <span
          key={l.id}
          className={`falling-leaf ${l.swayClass}`}
          style={{
            left: l.left,
            fontSize: `${l.size}px`,
            opacity: l.opacity,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
            color: l.color,
          }}
        >
          {l.char}
        </span>
      ))}
    </div>
  );
}
