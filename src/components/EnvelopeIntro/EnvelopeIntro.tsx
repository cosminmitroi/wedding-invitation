import { useState, useEffect } from 'react';
import './EnvelopeIntro.css';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [opened, setOpened] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  if (!isMobile || hidden) return null;

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      setHidden(true);
      onOpen();
    }, 1600);
  };

  return (
    <div className={`envelope-overlay ${opened ? 'envelope-overlay--opened' : ''}`}>
      <div className={`envelope ${opened ? 'envelope--opened' : ''}`} onClick={handleOpen}>
        <div className="envelope-back" />
        <div className="envelope-flap" />
        <div className="envelope-card">
          <div className="envelope-card-inner">
            <p className="envelope-card-script">You are invited to</p>
            <h2 className="envelope-card-names">Gabriela & Cosmin</h2>
            <p className="envelope-card-date">24.10.2026</p>
          </div>
        </div>
        <div className="envelope-front" />

        {/* Wax seal stamp */}
        <div className="envelope-seal">
          <div className="envelope-seal-inner">
            <span className="envelope-seal-initials">G&C</span>
          </div>
        </div>

        {!opened && (
          <p className="envelope-tap">Tap to open</p>
        )}
      </div>
    </div>
  );
}
