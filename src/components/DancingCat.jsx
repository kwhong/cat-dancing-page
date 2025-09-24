import { useState } from 'react'
import catImage from '../assets/images/cat.svg'
import '../styles/dancing-cat.css'

function DancingCat() {
  const [isAnimating, setIsAnimating] = useState(true)

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  return (
    <div className="dancing-cat-container">
      <div className={`dancing-cat ${isAnimating ? 'dancing' : ''}`}>
        <img src={catImage} alt="Dancing Cat" />
      </div>
      <button
        className="control-button"
        onClick={toggleAnimation}
      >
        {isAnimating ? '댄스 멈추기' : '댄스 시작!'}
      </button>
    </div>
  )
}

export default DancingCat