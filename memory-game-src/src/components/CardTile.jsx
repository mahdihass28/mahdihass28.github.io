export default function CardTile({ card, strings, onClick }) {
  return (
    <div
      className={`card-tile${card.isFlipped ? ' flipped' : ''}${card.isMatched ? ' matched' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={
        card.isFlipped || card.isMatched
          ? strings.cardRevealed(card.symbol)
          : strings.cardHidden
      }
    >
      <div className="card-inner">
        <div className="card-back">
          <span className="card-back-icon">✦</span>
        </div>
        <div className="card-front">
          <span className="card-symbol">{card.symbol}</span>
        </div>
      </div>
    </div>
  )
}
