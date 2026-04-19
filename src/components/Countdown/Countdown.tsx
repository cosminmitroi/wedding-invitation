import { useState, useEffect } from 'react';
import './Countdown.css';

const WEDDING_DATE = new Date('2026-10-24T16:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: 'Zile', value: timeLeft.days },
    { label: 'Ore', value: timeLeft.hours },
    { label: 'Minute', value: timeLeft.minutes },
    { label: 'Secunde', value: timeLeft.seconds },
  ];

  return (
    <section className="countdown">
      <h2 className="countdown-heading scroll-fade-up">Numărătoarea inversă până la ziua noastră</h2>
      <div className="countdown-grid stagger-children">
        {units.map((u) => (
          <div className="countdown-unit" key={u.label}>
            <span className="countdown-number">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="countdown-label">{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
