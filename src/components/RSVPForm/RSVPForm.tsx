import { useState, type FormEvent } from 'react';
import './RSVPForm.css';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzT1uGuG8SXFLMT_9VwNeET0ArZml3iLNEISX1Oo_khu-rsmud1F18Ye7OHdpA79Q/exec';

interface FormData {
  guestName: string;
  guestResponse: boolean;
  guestHasPartner: boolean;
  guestPartnerName: string;
  guestHasKids: boolean;
  guestFoodMenu: string;
  guestNeedsBooking: boolean;
  guestPhoneNumber: string;
  guestMessage: string;
}

interface ToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  trueLabel: string;
  falseLabel: string;
  required?: boolean;
}

function Toggle({ label, description, value, onChange, trueLabel, falseLabel, required }: ToggleProps) {
  return (
    <div className="rsvp-field rsvp-field-full">
      <label className="rsvp-label">
        {label}
        {required && <span className="rsvp-required"> *</span>}
      </label>
      {description && <p className="rsvp-description">{description}</p>}
      <div className="rsvp-toggle" role="radiogroup">
        <button
          type="button"
          className={`rsvp-toggle-option ${value ? 'rsvp-toggle-option--active' : ''}`}
          onClick={() => onChange(true)}
          aria-pressed={value}
        >
          {trueLabel}
        </button>
        <button
          type="button"
          className={`rsvp-toggle-option ${!value ? 'rsvp-toggle-option--active' : ''}`}
          onClick={() => onChange(false)}
          aria-pressed={!value}
        >
          {falseLabel}
        </button>
      </div>
    </div>
  );
}

interface RadioProps {
  label: string;
  description?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function Radio({ label, description, value, onChange, options, required }: RadioProps) {
  return (
    <div className="rsvp-field rsvp-field-full">
      <label className="rsvp-label">
        {label}
        {required && <span className="rsvp-required"> *</span>}
      </label>
      {description && <p className="rsvp-description">{description}</p>}
      <div className="rsvp-radio-group">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`rsvp-radio-option ${value === o.value ? 'rsvp-radio-option--active' : ''}`}
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
          >
            <span className="rsvp-radio-dot" />
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RSVPForm() {
  const [form, setForm] = useState<FormData>({
    guestName: '',
    guestResponse: true,
    guestHasPartner: false,
    guestPartnerName: '',
    guestHasKids: false,
    guestFoodMenu: '',
    guestNeedsBooking: false,
    guestPhoneNumber: '',
    guestMessage: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.guestName.trim()) return;
    if (form.guestResponse && form.guestHasPartner && !form.guestPartnerName.trim()) return;

    setStatus('sending');

    if (!GOOGLE_SCRIPT_URL) {
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
          <div className="rsvp-dialog">
            <div className="rsvp-success">
              <span className="rsvp-success-icon">&#10003;</span>
              <h2>Mulțumim!</h2>
              <p>Abia așteptăm să sărbătorim alături de voi.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const menuOptions = form.guestHasPartner
    ? [
        { value: '2-normal', label: '2x Meniu Normal' },
        { value: '2-vegetarian', label: '2x Meniu Vegetarian' },
        { value: '1-normal-1-vegetarian', label: '1x Meniu Normal, 1x Meniu Vegetarian' },
      ]
    : [
        { value: 'normal', label: 'Meniu Normal' },
        { value: 'vegetarian', label: 'Meniu Vegetarian' },
      ];

  return (
    <section className="rsvp" id="rsvp">
      <div className="section">
        <div className="rsvp-dialog scroll-fade-up">
          <h2 className="rsvp-dialog-title">Confirmare</h2>
          <div className="rsvp-dialog-divider">
            <span>◆</span>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="rsvp-field rsvp-field-full">
              <label className="rsvp-label" htmlFor="guestName">
                Nume și Prenume<span className="rsvp-required"> *</span>
              </label>
              <p className="rsvp-description">Numele și prenumele dumneavoastră.</p>
              <input
                id="guestName"
                type="text"
                required
                placeholder="Andrei Popescu"
                value={form.guestName}
                onChange={(e) => update('guestName', e.target.value)}
              />
            </div>

            <Toggle
              label="Răspuns"
              description='În cazul în care refuzați să participați la eveniment, selectați "Nu Particip".'
              value={form.guestResponse}
              onChange={(v) => update('guestResponse', v)}
              trueLabel="Particip"
              falseLabel="Nu Particip"
              required
            />

            {form.guestResponse && (
              <>
                <Toggle
                  label="Veți fi însoțit/ă la acest eveniment?"
                  value={form.guestHasPartner}
                  onChange={(v) => update('guestHasPartner', v)}
                  trueLabel="Da"
                  falseLabel="Nu"
                  required
                />

                {form.guestHasPartner && (
                  <div className="rsvp-field rsvp-field-full">
                    <label className="rsvp-label" htmlFor="guestPartnerName">
                      Nume și Prenume partener<span className="rsvp-required"> *</span>
                    </label>
                    <p className="rsvp-description">
                      Numele și prenumele persoanei care vă va însoți la eveniment.
                    </p>
                    <input
                      id="guestPartnerName"
                      type="text"
                      required
                      placeholder="Andrei Popescu"
                      value={form.guestPartnerName}
                      onChange={(e) => update('guestPartnerName', e.target.value)}
                    />
                  </div>
                )}

                <Toggle
                  label="Veți veni însoțit/ă de copii?"
                  value={form.guestHasKids}
                  onChange={(v) => update('guestHasKids', v)}
                  trueLabel="Da"
                  falseLabel="Nu"
                />

                <Radio
                  label="Preferințe meniu"
                  value={form.guestFoodMenu}
                  onChange={(v) => update('guestFoodMenu', v)}
                  options={menuOptions}
                />

                <Toggle
                  label="Aveți nevoie de cazare?"
                  value={form.guestNeedsBooking}
                  onChange={(v) => update('guestNeedsBooking', v)}
                  trueLabel="Da"
                  falseLabel="Nu"
                />
              </>
            )}

            <div className="rsvp-field rsvp-field-full">
              <label className="rsvp-label" htmlFor="guestPhoneNumber">
                Număr de telefon
              </label>
              <p className="rsvp-description">
                Ne puteți lăsa numărul de telefon pe care să vă contactăm dacă este nevoie.
              </p>
              <input
                id="guestPhoneNumber"
                type="tel"
                placeholder="0755 123 123"
                value={form.guestPhoneNumber}
                onChange={(e) => update('guestPhoneNumber', e.target.value)}
              />
            </div>

            <div className="rsvp-field rsvp-field-full">
              <label className="rsvp-label" htmlFor="guestMessage">
                Mesaj
              </label>
              <textarea
                id="guestMessage"
                rows={4}
                placeholder="Venim cu mare plăcere!"
                value={form.guestMessage}
                onChange={(e) => update('guestMessage', e.target.value)}
              />
            </div>

            <button
              className="rsvp-submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Se trimite...' : 'Trimite'}
            </button>

            {status === 'error' && (
              <p className="rsvp-error">
                A apărut o eroare. Vă rugăm să încercați din nou sau să ne contactați direct.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
