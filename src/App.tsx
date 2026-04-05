import { useState, useEffect, useCallback } from 'react';
import useScrollPosition from './hooks/useScrollPosition';
import EnvelopeIntro from './components/EnvelopeIntro/EnvelopeIntro';
import Hero from './components/Hero/Hero';
import Countdown from './components/Countdown/Countdown';
import EventDetails from './components/EventDetails/EventDetails';
import Gallery from './components/Gallery/Gallery';
import RSVPForm from './components/RSVPForm/RSVPForm';
import FAQ from './components/FAQ/FAQ';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Footer from './components/Footer/Footer';
import FloatingElements from './components/FloatingElements/FloatingElements';
import SectionReveal from './components/SectionReveal/SectionReveal';

const ANIMATED_SELECTORS =
  '.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in, .stagger-children, .divider-animated';

function toggleVisibleElements() {
  const elements = document.querySelectorAll(ANIMATED_SELECTORS);
  const vh = window.innerHeight;
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < vh * 0.88 && rect.bottom > 0;
    if (inView) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const scrollY = useScrollPosition();

  const handleScroll = useCallback(() => {
    toggleVisibleElements();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(ANIMATED_SELECTORS);
    elements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
    toggleVisibleElements();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <EnvelopeIntro onOpen={() => setEnvelopeOpened(true)} />
      <FloatingElements />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          visibility:
            envelopeOpened || window.innerWidth > 768 ? 'visible' : 'hidden',
        }}
      >
        <Hero scrollY={scrollY} />
        <Countdown />
        <SectionReveal direction="up">
          <EventDetails />
        </SectionReveal>
        <SectionReveal direction="zoom">
          <Gallery />
        </SectionReveal>
        <SectionReveal direction="left">
          <RSVPForm />
        </SectionReveal>
        <SectionReveal direction="right">
          <FAQ />
        </SectionReveal>
        <Footer />
      </div>
      <MusicPlayer />
    </>
  );
}
