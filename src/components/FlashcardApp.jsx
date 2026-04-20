import { useCallback, useEffect, useMemo, useState } from 'react'
import { characters } from '../data/characters'
import Flashcard from './Flashcard'

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function FlashcardApp() {
  const [deck, setDeck] = useState(characters)
  const [index, setIndex] = useState(0)
  const [frontMode, setFrontMode] = useState('simplified') // 'simplified' | 'traditional'

  const total = deck.length
  const card = deck[index]
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  const handleShuffle = () => {
    setDeck(shuffleArray(deck))
    setIndex(0)
  }

  const handleReset = () => {
    setDeck(characters)
    setIndex(0)
  }

  const toggleFrontMode = () => {
    setFrontMode((m) => (m === 'simplified' ? 'traditional' : 'simplified'))
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <div className="flashcard-app">
      <header className="app-header">
        <h1>中文 플래시카드</h1>
        <p className="subtitle">
          번체를 아는 학습자를 위한 <strong>간체 · 번체가 다른 고빈도 한자 100자</strong>
        </p>
      </header>

      <div className="mode-bar">
        <span className="mode-label">앞면:</span>
        <button
          className={`mode-btn ${frontMode === 'simplified' ? 'active' : ''}`}
          onClick={toggleFrontMode}
          type="button"
        >
          {frontMode === 'simplified' ? '简体 → 繁體' : '繁體 → 简体'}
        </button>
      </div>

      <Flashcard card={card} index={index} total={total} frontMode={frontMode} />

      <div className="progress-bar" aria-label="진행률">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="controls">
        <button onClick={goPrev} type="button" className="nav-btn">
          ← 이전
        </button>
        <button onClick={goNext} type="button" className="nav-btn primary">
          다음 →
        </button>
      </div>

      <div className="secondary-controls">
        <button onClick={handleShuffle} type="button" className="sm-btn">
          🔀 섞기
        </button>
        <button onClick={handleReset} type="button" className="sm-btn">
          ↺ 순서 초기화
        </button>
      </div>

      <p className="tip">💡 카드를 클릭하면 뒤집혀요. ← → 키로도 넘길 수 있어요.</p>
    </div>
  )
}

export default FlashcardApp
