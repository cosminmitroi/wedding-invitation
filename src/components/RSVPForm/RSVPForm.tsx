import { useState, type FormEvent } from 'react';
import TextReveal from '../TextReveal/TextReveal';
import './RSVPForm.css';

// Replace with your Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = '';

interface FormData {
  name: string;
  email: string;
  guests: string;
  dietary: string;
  message: string;
}

export default function RSVPForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    guests: '1',
    dietary: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setStatus('sending');

    if (!GOOGLE_SCRIPT_URL) {
      // Demo mode — simulate success
      setTimeout(() => setStatus('success'), 1200);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="rsvp" id="rsvp">
        <div className="section">
          <div className="rsvp-success">
            <span className="rsvp-success-icon">&#10003;</span>
            <h2>Thank You!</h2>
            <p>We can't wait to celebrate with you.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp" id="rsvp">
      <div className="section">
        <TextReveal text="CONFIRMĂRI" tag="h2" className="section-title" mode="char" staggerMs={100} />
        <p className="section-subtitle scroll-fade-up">We'd love to have you there</p>
        <div className="divider-animated" />

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-row">
            <div className="rsvp-field">
              <label htmlFor="rsvp-name">Full Name *</label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="rsvp-field">
              <label htmlFor="rsvp-email">Email </label>
              <input
                id="rsvp-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rsvp-row">
            <div className="rsvp-field">
              <label htmlFor="rsvp-guests">Number of Guests</label>
              <select
                id="rsvp-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div className="rsvp-field">
              <label htmlFor="rsvp-dietary">Dietary Preferences</label>
              <input
                id="rsvp-dietary"
                name="dietary"
                type="text"
                placeholder="e.g., Vegetarian, Allergies..."
                value={form.dietary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="rsvp-field rsvp-field-full">
            <label htmlFor="rsvp-message">Message for the Couple</label>
            <textarea
              id="rsvp-message"
              name="message"
              rows={4}
              placeholder="Share your wishes..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button
            className="rsvp-submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Confirm Attendance'}
          </button>

          {status === 'error' && (
            <p className="rsvp-error">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
