export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Ottawa&apos;s Premier Barbershop</p>
        <h1 className="hero__title">
          Sharp Cuts.<br /><span>Clean Style.</span>
        </h1>
        <p className="hero__sub">
          Prestige Cuts delivers precision haircuts and grooming in the heart of Ottawa.
          Walk in or book your chair online.
        </p>
        <div className="hero__actions">
          <a href="#booking" className="btn btn--gold">Book Your Cut</a>
          <a href="#services" className="btn btn--outline">View Services</a>
        </div>
      </div>
      <div className="hero__bar" />
    </section>
  )
}
