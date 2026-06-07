const INFO = [
  {
    icon: '📍',
    label: 'Address',
    lines: ['247 Sparks Street', 'Ottawa, ON K1P 5B6'],
  },
  {
    icon: '🕐',
    label: 'Hours',
    lines: ['Mon – Fri: 9 AM – 7 PM', 'Sat: 9 AM – 5 PM', 'Sun: Closed'],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['613-555-0174'],
  },
  {
    icon: '✉',
    label: 'Email',
    lines: ['hello@prestigecuts.ca'],
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <p className="section-eyebrow">Find Us</p>
        <h2 className="section-heading">Visit the Shop</h2>
        <div className="contact__grid">
          <div className="contact__info">
            {INFO.map(item => (
              <div className="contact__item" key={item.label}>
                <div className="contact__icon">{item.icon}</div>
                <div>
                  <h4>{item.label}</h4>
                  {item.lines.map(l => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>
          <div className="contact__map">Map Placeholder</div>
        </div>
      </div>
    </section>
  )
}
