const TEAM = [
  {
    initial: 'M',
    name: 'Marcus Reid',
    role: 'Master Barber',
    bio: 'Over 12 years cutting in Ottawa. Specializes in skin fades and classic tapers.',
    exp: '12 years experience',
    bg: '#1a1208',
  },
  {
    initial: 'T',
    name: 'Tyler Okonkwo',
    role: 'Senior Barber',
    bio: 'Known for clean line-ups and razor work. Trained in Toronto and Ottawa.',
    exp: '7 years experience',
    bg: '#0f1a12',
  },
  {
    initial: 'J',
    name: 'Jordan Leblanc',
    role: 'Barber',
    bio: 'Beard specialist with a sharp eye for detail. Trained at Ottawa Barber Academy.',
    exp: '4 years experience',
    bg: '#111820',
  },
]

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <p className="section-eyebrow">The Crew</p>
        <h2 className="section-heading" style={{ color: 'var(--white)' }}>Meet Your Barbers</h2>
        <p className="section-sub">Every barber at Prestige Cuts trains to the same standard. You get a great cut no matter who you book.</p>
        <div className="team__grid">
          {TEAM.map(m => (
            <div className="team-card" key={m.name}>
              <div className="team-card__avatar" style={{ background: m.bg }}>{m.initial}</div>
              <div className="team-card__body">
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
                <p className="team-card__bio">{m.bio}</p>
                <div className="team-card__exp">{m.exp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
