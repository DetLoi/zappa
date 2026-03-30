import { useEffect, useState } from 'react'
import arrowDown from '../../assets/arrowdown.png'
import './BackToTop.css'

const SCROLL_THRESHOLD = 400

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Tilbage til toppen"
    >
      <img
        className="back-to-top__icon"
        src={arrowDown}
        alt=""
        width={22}
        height={22}
        draggable={false}
        aria-hidden
      />
    </button>
  )
}
