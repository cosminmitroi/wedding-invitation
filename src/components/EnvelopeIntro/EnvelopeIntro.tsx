import { useState } from 'react';
import './EnvelopeIntro.css';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setHidden(true);
      onOpen();
    }, 2400);
  };

  return (
    <div
      className={`env-overlay${opened ? ' env-overlay--opened' : ''}`}
      onClick={handleOpen}
    >
      {/* Subtle bokeh dots in background */}
      <div className="env-bokeh">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="env-bokeh-dot" />
        ))}
      </div>

      <div className="env-scene">

        {/* ── Envelope ── */}
        <div className={`env${opened ? ' env--opened' : ''}`}>

          {/* Body — cream rectangle, always behind everything */}
          <div className="env-body">
            {/* left diagonal fold */}
            <div className="env-tri env-tri--left" />
            {/* right diagonal fold */}
            <div className="env-tri env-tri--right" />
            {/* bottom V fold */}
            <div className="env-tri env-tri--bottom" />
          </div>

          {/* Paper invitation card — slides out when envelope opens */}
          <div className="env-paper">
            <div className="env-paper-content">
              <p className="env-paper-eyebrow">ești invitat la nunta</p>

              <h2 className="env-paper-names">
                <span className="env-paper-name">Gabriela</span>
                <span className="env-paper-amp">&amp;</span>
                <span className="env-paper-name">Cosmin</span>
              </h2>

              <div className="env-paper-divider">
                <span className="env-paper-divider-gem">◆</span>
              </div>

              <p className="env-paper-date">24 Octombrie 2026</p>
              <p className="env-paper-city">Timișoara, România</p>
            </div>
          </div>

          {/* Top flap — rotates open in 3D */}
          <div className="env-flap">
            {/* outside face (linen texture, visible before opening) */}
            <div className="env-flap-face" />
            {/* inside face (visible after flap flips back) */}
            <div className="env-flap-back" />
          </div>

          {/* Monogram — sits at the flap crease, disappears on open */}
          <div className="env-seal">
            <span className="env-seal-text">
              G<span className="env-seal-amp">&amp;</span>C
            </span>
          </div>
        </div>

        {/* CTA text */}
        <p className={`env-cta${opened ? ' env-cta--hide' : ''}`}>
          <span className="env-cta-arrow">↓</span>
          &nbsp; apasă pentru a deschide &nbsp;
          <span className="env-cta-arrow">↓</span>
        </p>
      </div>
    </div>
  );
}
