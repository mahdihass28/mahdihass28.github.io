import { useState } from 'react'

const THEME_IDS  = ['espace', 'animaux', 'fruits']
const LEVEL_IDS  = ['facile', 'moyen', 'difficile']

function getBest(theme, level) {
  const v = localStorage.getItem(`memoflip_best_${theme}_${level}`)
  return v ? parseInt(v, 10) : null
}

export default function SetupScreen({ strings, onStart }) {
  const [theme, setTheme] = useState('espace')
  const [level, setLevel] = useState('facile')

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-hero">
          <span className="setup-icon">🧠</span>
          <h1>MémoFlip</h1>
          <p>{strings.subtitle}</p>
        </div>

        <div className="setup-section">
          <h2>{strings.themeLabel}</h2>
          <div className="option-group">
            {THEME_IDS.map(id => (
              <button
                key={id}
                className={`option-btn${theme === id ? ' active' : ''}`}
                onClick={() => setTheme(id)}
              >
                {strings.themes[id]}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h2>{strings.levelLabel}</h2>
          <div className="option-group">
            {LEVEL_IDS.map(id => {
              const best = getBest(theme, id)
              const lvl  = strings.levels[id]
              return (
                <button
                  key={id}
                  className={`option-btn level-btn${level === id ? ' active' : ''}`}
                  onClick={() => setLevel(id)}
                >
                  <span className="level-name">{lvl.label}</span>
                  <span className="level-desc">{lvl.desc}</span>
                  {best !== null && (
                    <span className="best-score">{strings.bestMoves(best)}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <button className="btn-play" onClick={() => onStart({ theme, level })}>
          {strings.play}
        </button>
      </div>
    </div>
  )
}
