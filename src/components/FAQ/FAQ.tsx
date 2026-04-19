import { useState } from 'react';
import TextReveal from '../TextReveal/TextReveal';
import './FAQ.css';

const faqs = [
  {
    q: 'Care este codul vestimentar?',
    a: 'Vă recomandăm o ținută formală. Domnii în costum, iar doamnele în rochii de cocktail sau seară. Vă rugăm să evitați culoarea albă, deoarece este rezervată miresei.',
  },
  {
    q: 'Pot veni însoțit(ă)?',
    a: 'Avem un număr limitat de locuri, vă rugăm să verificați invitația pentru numărul de persoane incluse. Pentru orice întrebare, nu ezitați să ne contactați.',
  },
  {
    q: 'Unde pot parca?',
    a: 'Locația dispune de o parcare spațioasă disponibilă pentru toți invitații. Indicații detaliate vor fi oferite mai aproape de data evenimentului.',
  },
  {
    q: 'Ce ne puteți spune despre cadouri?',
    a: 'Prezența voastră este cel mai prețios cadou. Totuși, dacă doriți să contribuiți, vom avea un loc special amenajat la recepție.',
  },
  {
    q: 'Există cazare în apropiere?',
    a: 'Da! Vom împărtăși o listă de hoteluri recomandate în apropierea locației, cu tarife speciale pentru invitații noștri.',
  },
  {
    q: 'La ce oră să ajungem?',
    a: 'Vă rugăm să ajungeți cu cel puțin 15 minute înainte de începerea ceremoniei, pentru a putea începe la timp.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="section">
        <TextReveal text="Întrebări & Răspunsuri" tag="h2" className="section-title" mode="word" staggerMs={100} />
        <p className="section-subtitle scroll-fade-up">Tot ce trebuie să știți</p>
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
