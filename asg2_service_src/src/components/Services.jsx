const SERVICES = [
  { name: 'Classic Cut', price: '$28', duration: '30 min', desc: 'Scissor and clipper cut with a hot towel finish and styling.' },
  { name: 'Skin Fade', price: '$35', duration: '40 min', desc: 'Zero-to-skin taper with a clean line-up and fade blend.' },
  { name: 'Beard Trim', price: '$22', duration: '20 min', desc: 'Shape, trim, and edge with warm oil and a straight razor finish.' },
  { name: 'Cut + Beard Combo', price: '$50', duration: '55 min', desc: 'Full haircut paired with a beard trim and hot towel treatment.' },
  { name: "Kids Cut", price: '$22', duration: '25 min', desc: 'Haircut for children 12 and under. Patient, careful service.' },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <p className="section-eyebrow">What We Offer</p>
        <h2 className="section-heading">Our Services</h2>
        <p className="section-sub">Every service includes a consultation and a hot towel finish.</p>
        <div className="services__grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.name}>
              <div className="service-card__top">
                <span className="service-card__name">{s.name}</span>
                <span className="service-card__price">{s.price}</span>
              </div>
              <p className="service-card__desc">{s.desc}</p>
              <span className="service-card__duration">{s.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
