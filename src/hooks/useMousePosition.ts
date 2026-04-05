import { useState, useEffect, useRef, type RefObject } from 'react';

interface MousePos {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

export default function useMousePosition(ref: RefObject<HTMLElement | null>): MousePos {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setPos({ x, y });
        ticking.current = false;
      });
    };

    const onLeave = () => setPos({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);

  return pos;
}
