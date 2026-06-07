const REVIEWS = [
  {
    name: 'James T.',
    text: 'Marcus gave me the best fade I have had in Ottawa. Clean line-up, fast service.',
    stars: 5,
  },
  {
    name: 'Daniel R.',
    text: 'Booked online in two minutes and walked in right on time. The combo cut and beard trim is worth every dollar.',
    stars: 5,
  },
  {
    name: 'Kevin O.',
    text: 'Brought my son in for his first real haircut. Jordan was patient and he left looking sharp.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <p className="section-eyebrow">Client Reviews</p>
        <h2 className="section-heading" style={{ color: 'var(--white)' }}>What People Say</h2>
        <div className="testimonials__grid">
          {REVIEWS.map(r => (
            <div className="testimonial-card" key={r.name}>
              <div className="testimonial-card__stars">{'★'.repeat(r.stars)}</div>
              <p className="testimonial-card__text">&ldquo;{r.text}&rdquo;</p>
              <div className="testimonial-card__name">{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
