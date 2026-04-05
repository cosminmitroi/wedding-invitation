import { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Try to autoplay after first user interaction
    const tryAutoplay = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => {
          setPlaying(true);
        }).catch(() => {
          // Autoplay blocked — user will click manually
        });
      }
      document.removeEventListener('click', tryAutoplay);
      document.removeEventListener('touchstart', tryAutoplay);
    };

    document.addEventListener('click', tryAutoplay, { once: true });
    document.addEventListener('touchstart', tryAutoplay, { once: true });

    return () => {
      document.removeEventListener('click', tryAutoplay);
      document.removeEventListener('touchstart', tryAutoplay);
    };
  }, [playing]);

  const toggle = () => {
    if (!audioRef.current) {
      console.log('no audio ref');
      return;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/Wedding-Invitation.webm" type="audio/webm" />
      </audio>
      <button
        className={`music-btn ${playing ? 'music-btn--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        <span className="music-btn-icon">{playing ? '♪' : '♪'}</span>
        <span className="music-btn-bars">
          <span /><span /><span /><span />
        </span>
      </button>
    </>
  );
}
