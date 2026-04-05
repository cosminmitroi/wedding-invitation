import { useState } from 'react';
import TextReveal from '../TextReveal/TextReveal';
import './FAQ.css';

const faqs = [
  {
    q: 'What is the dress code?',
    a: 'We suggest formal attire. Gentlemen in suits and ladies in cocktail or evening dresses. Please avoid white, as it is reserved for the bride.',
  },
  {
    q: 'Can I bring a plus one?',
    a: 'We have a limited number of seats, so please refer to your invitation for the number of guests included. If you have any questions, feel free to reach out to us.',
  },
  {
    q: 'Where should I park?',
    a: 'The venue has a spacious parking area available for all guests. Detailed directions will be provided closer to the date.',
  },
  {
    q: 'What about gifts?',
    a: 'Your presence is the greatest gift of all. However, if you wish to contribute, a wishing well will be available at the reception.',
  },
  {
    q: 'Will there be accommodation nearby?',
    a: 'Yes! We will share a list of recommended hotels near the venue with special rates for our wedding guests.',
  },
  {
    q: 'What time should I arrive?',
    a: 'Please arrive at least 15 minutes before the ceremony begins so we can start on time.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="section">
        <TextReveal text="Questions & Answers" tag="h2" className="section-title" mode="word" staggerMs={100} />
        <p className="section-subtitle scroll-fade-up">Everything you need to know</p>
        <div className="divider-animated" />

        <div className="faq-list stagger-children">
          {faqs.map((item, i) => (
            <div
              className={`faq-item ${open === i ? 'faq-item--open' : ''}`}
              key={i}
            >
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
