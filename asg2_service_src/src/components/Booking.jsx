import { useState } from 'react'

const SERVICES = [
  { name: 'Classic Cut', price: '$28' },
  { name: 'Skin Fade', price: '$35' },
  { name: 'Beard Trim', price: '$22' },
  { name: 'Cut + Beard Combo', price: '$50' },
  { name: "Kids Cut", price: '$22' },
]

const BARBERS = ['Marcus', 'Tyler', 'Jordan']

const TIMES = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
               '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']

const STEP_LABELS = ['Service', 'Date & Time', 'Your Info', 'Confirm']

const initial = { service: '', barber: '', date: '', time: '', name: '', email: '', phone: '' }

export default function Booking() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initial)
  const [done, setDone] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const canNext = [
    () => form.service && form.barber,
    () => form.date && form.time,
    () => form.name && form.email && form.phone,
    () => true,
  ]

  const next = () => { if (step < 3) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)
  const submit = () => setDone(true)

  if (done) {
    return (
      <section className="booking" id="booking">
        <div className="container">
          <div className="booking__panel">
            <div className="success-screen">
              <div className="success-icon">&#10003;</div>
              <h3>You&apos;re Booked!</h3>
              <p>
                {form.service} with {form.barber} on {form.date} at {form.time}.<br />
                A confirmation goes to {form.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="booking" id="booking">
      <div className="container">
        <div className="booking__header">
          <p className="section-eyebrow">Reserve Your Chair</p>
          <h2 className="section-heading" style={{ color: 'var(--white)' }}>Book an Appointment</h2>
        </div>

        <div className="booking__steps">
          {STEP_LABELS.map((label, i) => (
            <div
              key={label}
              className={`booking__step${i === step ? ' booking__step--active' : i < step ? ' booking__step--done' : ''}`}
            >
              {i < step ? '✓ ' : ''}{label}
            </div>
          ))}
        </div>

        <div className="booking__panel">
          {step === 0 && (
            <>
              <h3>Choose a Service</h3>
              <div className="pick-grid">
                {SERVICES.map(s => (
                  <button
                    key={s.name}
                    className={`pick-card${form.service === s.name ? ' pick-card--selected' : ''}`}
                    onClick={() => set('service', s.name)}
                  >
                    <div className="pick-card__name">{s.name}</div>
                    <div className="pick-card__price">{s.price}</div>
                  </button>
                ))}
              </div>
              <h3>Choose a Barber</h3>
              <div className="barber-grid">
                {BARBERS.map(b => (
                  <button
                    key={b}
                    className={`barber-btn${form.barber === b ? ' barber-btn--selected' : ''}`}
                    onClick={() => set('barber', b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3>Pick a Date &amp; Time</h3>
              <div className="date-row">
                <div className="field-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => set('date', e.target.value)}
                  />
                </div>
              </div>
              <div className="time-grid">
                {TIMES.map(t => (
                  <button
                    key={t}
                    className={`time-btn${form.time === t ? ' time-btn--selected' : ''}`}
                    onClick={() => set('time', t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Your Information</h3>
              <div className="info-form">
                <div className="field-group">
                  <label>Full Name</label>
                  <input placeholder="John Smith" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Email</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="613-555-0100" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Confirm Your Booking</h3>
              <div className="confirm-box">
                <h4>Appointment Details</h4>
                <div className="confirm-row"><span>Service</span><span>{form.service}</span></div>
                <div className="confirm-row"><span>Barber</span><span>{form.barber}</span></div>
                <div className="confirm-row"><span>Date</span><span>{form.date}</span></div>
                <div className="confirm-row"><span>Time</span><span>{form.time}</span></div>
                <div className="confirm-row"><span>Name</span><span>{form.name}</span></div>
                <div className="confirm-row"><span>Email</span><span>{form.email}</span></div>
                <div className="confirm-row"><span>Phone</span><span>{form.phone}</span></div>
              </div>
            </>
          )}

          <div className="booking__nav">
            {step > 0 && (
              <button className="btn--back" onClick={back}>Back</button>
            )}
            {step < 3 ? (
              <button className="btn--next" onClick={next} disabled={!canNext[step]()}>
                Continue
              </button>
            ) : (
              <button className="btn--next" onClick={submit}>
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
