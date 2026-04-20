import { useEffect, useState } from 'react'

function Flashcard({ card, index, total, frontMode }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [index, frontMode])

  const front =
    frontMode === 'simplified'
      ? { label: '简体', char: card.simplified, tagColor: '#ef4444' }
      : { label: '繁體', char: card.traditional, tagColor: '#2563eb' }

  const back =
    frontMode === 'simplified'
      ? { label: '繁體', char: card.traditional, tagColor: '#2563eb' }
      : { label: '简体', char: card.simplified, tagColor: '#ef4444' }

  return (
    <div
      className={`flashcard ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((v) => !v)
        }
      }}
      aria-label="클릭하여 카드 뒤집기"
    >
      <div className="flashcard-inner">
        <div className="flashcard-face flashcard-front">
          <span className="card-tag" style={{ background: front.tagColor }}>
            {front.label}
          </span>
          <div className="card-character">{front.char}</div>
          <div className="card-hint">클릭하여 뒤집기</div>
          <div className="card-counter">
            {index + 1} / {total}
          </div>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="card-tag" style={{ background: back.tagColor }}>
            {back.label}
          </span>
          <div className="card-character">{back.char}</div>
          <div className="card-pinyin">{card.pinyin}</div>
          <div className="card-meaning">{card.meaning}</div>
          <div className="card-pair">
            <span className="pair-label">简</span>
            <span className="pair-char">{card.simplified}</span>
            <span className="pair-sep">↔</span>
            <span className="pair-label">繁</span>
            <span className="pair-char">{card.traditional}</span>
          </div>
          <div className="card-counter">
            {index + 1} / {total}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
