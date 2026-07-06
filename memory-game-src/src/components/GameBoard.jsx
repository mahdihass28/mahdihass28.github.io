import { useState, useEffect, useRef } from 'react'
import CardTile from './CardTile'

const SYMBOLS = {
  espace:  ['🚀', '🌍', '🌙', '⭐', '🪐', '☄️', '🌌', '🛸', '🔭', '🌠'],
  animaux: ['🐶', '🐱', '🐸', '🦊', '🐼', '🦁', '🐨', '🐧', '🦋', '🦄'],
  fruits:  ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🍍', '🥭', '🍈'],
}

const LEVEL_CONFIG = {
  facile:    { pairs: 6,  cols: 4 },
  moyen:     { pairs: 8,  cols: 4 },
  difficile: { pairs: 10, cols: 5 },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(theme, level) {
  const { pairs } = LEVEL_CONFIG[level]
  const syms = SYMBOLS[theme].slice(0, pairs)
  return shuffle([...syms, ...syms]).map((symbol, i) => ({
    id: i, symbol, isFlipped: false, isMatched: false,
  }))
}

function fmt(sec) {
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
}

export default function GameBoard({ config, strings, onWin }) {
  const { theme, level } = config
  const { cols } = LEVEL_CONFIG[level]

  const [cards,   setCards]   = useState(() => buildCards(theme, level))
  const [flipped, setFlipped] = useState([])
  const [locked,  setLocked]  = useState(false)
  const [moves,   setMoves]   = useState(0)
  const [time,    setTime]    = useState(0)
  const [running, setRunning] = useState(true)

  const timeRef  = useRef(0)
  const movesRef = useRef(0)
  timeRef.current  = time
  movesRef.current = moves

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  function handleClick(id) {
    if (locked) return
    const card = cards.find(c => c.id === id)
    if (!card || card.isFlipped || card.isMatched) return
    if (flipped.includes(id)) return

    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c))
    setFlipped(prev => [...prev, id])
  }

  useEffect(() => {
    if (flipped.length !== 2) return
    setLocked(true)
    setMoves(m => m + 1)

    const [idA, idB] = flipped
    const symA = cards.find(c => c.id === idA)?.symbol
    const symB = cards.find(c => c.id === idB)?.symbol

    if (symA && symB && symA === symB) {
      setCards(prev => prev.map(c =>
        c.id === idA || c.id === idB ? { ...c, isFlipped: true, isMatched: true } : c
      ))
      setFlipped([])
      setLocked(false)
    } else {
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          (c.id === idA || c.id === idB) && !c.isMatched
            ? { ...c, isFlipped: false }
            : c
        ))
        setFlipped([])
        setLocked(false)
      }, 900)
    }
  }, [flipped])

  useEffect(() => {
    if (!cards.length || !cards.every(c => c.isMatched)) return
    setRunning(false)
    const id = setTimeout(
      () => onWin({ time: timeRef.current, moves: movesRef.current }),
      700
    )
    return () => clearTimeout(id)
  }, [cards])

  const matched = cards.filter(c => c.isMatched).length / 2
  const total   = cards.length / 2

  return (
    <div className="game-screen">
      <div className="game-hud">
        <div className="hud-item">
          <span className="hud-label">{strings.timeLabel}</span>
          <span className="hud-value">{fmt(time)}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">{strings.pairsLabel}</span>
          <span className="hud-value">{matched}/{total}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">{strings.movesLabel}</span>
          <span className="hud-value">{moves}</span>
        </div>
      </div>

      <div
        className="card-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map(card => (
          <CardTile key={card.id} card={card} strings={strings} onClick={() => handleClick(card.id)} />
        ))}
      </div>
    </div>
  )
}
