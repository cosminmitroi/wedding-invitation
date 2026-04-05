import { useState } from 'react';
import TiltCard from '../TiltCard/TiltCard';
import TextReveal from '../TextReveal/TextReveal';
import './Gallery.css';

const placeholderPhotos = [
  { id: 1, alt: 'Couple photo 1' },
  { id: 2, alt: 'Couple photo 2' },
  { id: 3, alt: 'Couple photo 3' },
  { id: 4, alt: 'Couple photo 4' },
  { id: 5, alt: 'Couple photo 5' },
  { id: 6, alt: 'Couple photo 6' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="gallery" id="gallery">
      <div className="section">
        <TextReveal text="Our Moments" tag="h2" className="section-title" mode="word" staggerMs={120} />
        <p className="section-subtitle scroll-fade-up">A glimpse of our journey</p>
        <div className="divider-animated" />

        <div className="gallery-grid stagger-children">
          {placeholderPhotos.map((photo, i) => (
            <TiltCard
              className="gallery-item"
              key={photo.id}
              maxTilt={10}
              glare
            >
              <div
                className="gallery-placeholder"
                onClick={() => setLightbox(i)}
              >
                <span>{photo.alt}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-lightbox-content">
            <button
              className="gallery-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="gallery-lightbox-placeholder">
              <span>{placeholderPhotos[lightbox].alt}</span>
            </div>
            <div className="gallery-lightbox-nav">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(
                    (lightbox - 1 + placeholderPhotos.length) %
                      placeholderPhotos.length
                  );
                }}
              >
                &#8592;
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox + 1) % placeholderPhotos.length);
                }}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
