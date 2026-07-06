import { useEffect } from 'react'

function fmt(sec) {
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
}

export default function EndScreen({ result, config, strings, onReplay, onMenu }) {
  const key  = `memoflip_best_${config.theme}_${config.level}`
  const prev = parseInt(localStorage.getItem(key) || '99999', 10)
  const isNewBest = result.moves < prev

  useEffect(() => {
    if (isNewBest) localStorage.setItem(key, String(result.moves))
  }, [])

  return (
    <div className="end-screen">
      <div className="end-card">
        <div className="end-trophy">🏆</div>
        <h1>{strings.title}</h1>
        <p>{strings.subtitle}</p>

        <div className="end-stats">
          <div className="stat">
            <span className="stat-value">{fmt(result.time)}</span>
            <span className="stat-label">{strings.timeLabel}</span>
          </div>
          <div className="stat">
            <span className="stat-value">{result.moves}</span>
            <span className="stat-label">{strings.movesLabel}</span>
          </div>
        </div>

        {isNewBest && (
          <div className="new-best">{strings.newBest}</div>
        )}

        <div className="end-actions">
          <button className="btn-secondary" onClick={onMenu}>{strings.menu}</button>
          <button className="btn-play" onClick={onReplay}>{strings.replay}</button>
        </div>
      </div>
    </div>
  )
}
