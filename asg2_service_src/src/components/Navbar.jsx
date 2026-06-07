import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__brand">
          ✂ <span>Prestige</span> Cuts
        </a>
        <button className="navbar__toggle" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`navbar__links${open ? ' navbar__links--open' : ''}`}>
          <li><a href="#services" onClick={() => setOpen(false)}>Services</a></li>
          <li><a href="#team" onClick={() => setOpen(false)}>Our Team</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          <li><a href="#booking" className="navbar__cta" onClick={() => setOpen(false)}>Book Now</a></li>
        </ul>
      </div>
    </nav>
  )
}
