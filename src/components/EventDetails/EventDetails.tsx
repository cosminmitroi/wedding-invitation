import TiltCard from '../TiltCard/TiltCard';
import TextReveal from '../TextReveal/TextReveal';
import './EventDetails.css';

export default function EventDetails() {
  return (
    <section className="event-details" id="details">
      <div className="section">
        <TextReveal text="Wedding Details" tag="h2" className="section-title" mode="word" staggerMs={100} />
        <p className="section-subtitle scroll-fade-up">Join us on our special day</p>
        <div className="divider-animated" />

        <div className="event-cards stagger-children">
          <TiltCard className="event-card" maxTilt={6}>
            <div className="event-card-icon">&#9829;</div>
            <h3 className="event-card-title">Biserica Ortodoxa</h3>
            <p className="event-card-time">4:00 PM</p>
            <p className="event-card-venue">Biserica Pogorârea Sfântului Duh, zona Dacia</p>
            <p className="event-card-address">
              Timisoara, Romania
            </p>
            <a
              className="event-card-directions"
              href="https://maps.app.goo.gl/BSKVGreuo3VbNGtd8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions &rarr;
            </a>
          </TiltCard>

          <TiltCard className="event-card" maxTilt={6}>
            <div className="event-card-icon">&#127864;</div>
            <h3 className="event-card-title">Party</h3>
            <p className="event-card-time">6:00 PM</p>
            <p className="event-card-venue">Venue Events</p>
            <p className="event-card-address">
              Timisoara, Romania
            </p>
            <a
              className="event-card-directions"
              href="https://maps.app.goo.gl/Nf9aX2YYGiFk8kLn6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions &rarr;
            </a>
          </TiltCard>
        </div>

        <div className="event-info-row">
          <div className="event-info-item">
            <span className="event-info-label">Dress Code</span>
            <span className="event-info-value">Formal / Black Tie Optional</span>
          </div>
          <div className="event-info-item">
            <span className="event-info-label">Date</span>
            <span className="event-info-value">Saturday, 24 October 2026</span>
          </div>
        </div>

        <div className="event-map scroll-fade-up">
          <iframe
            title="Wedding venue location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.5!2d21.2401148!3d45.7669876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745677673d71897%3A0xc7e1dfdbcee5c61b!2sVenue%20Events!5e0!3m2!1sen!2sro!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
