'use client'

import { useCallback, useEffect, useRef } from 'react'
import styles from './Card.module.css'

const classes = styles as Record<string, string>

const cx = (...classNames: string[]) => classNames.map((name) => classes[name] ?? name).join(' ')

const config = {
  maxRotateX: 18,
  maxRotateY: 14,
  maxRotateZ: 4,
}

const FONT_FAMILY =
  '"Garamond Classico SC", "EB Garamond", "Garamond", "Apple Garamond", Baskerville, "Times New Roman", serif'
const FONT_URL = 'https://card.jgoon.com/Garamond%20Classico%20SC.ttf'

export default function Card() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)

  const applyTransform = useCallback((clientX: number, clientY: number) => {
    const scene = sceneRef.current
    const card = cardRef.current

    if (!scene || !card) return

    const rect = scene.getBoundingClientRect()
    const relativeX = (clientX - rect.left) / rect.width - 0.5
    const relativeY = (clientY - rect.top) / rect.height - 0.5

    const rotateY = clamp(relativeX * 2 * config.maxRotateY, -config.maxRotateY, config.maxRotateY)
    const rotateX = clamp(-relativeY * 2 * config.maxRotateX, -config.maxRotateX, config.maxRotateX)
    const rotateZ = clamp(relativeX * 2 * config.maxRotateZ, -config.maxRotateZ, config.maxRotateZ)

    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
      2
    )}deg) rotateZ(${rotateZ.toFixed(2)}deg)`

    const shadowX = (rotateY / config.maxRotateY) * 18
    const shadowY = (rotateX / config.maxRotateX) * 18

    card.style.boxShadow = `${(-shadowX).toFixed(1)}px ${shadowY.toFixed(1)}px 45px rgba(47, 43, 37, 0.18)`
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent | Touch) => {
      applyTransform(event.clientX, event.clientY)
    },
    [applyTransform]
  )

  const handlePointerLeave = useCallback(() => {
    const scene = sceneRef.current
    if (!scene) return
    const rect = scene.getBoundingClientRect()
    applyTransform(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }, [applyTransform])

  // rely on static @font-face and head preload

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const pointerMove = (event: PointerEvent) => handlePointerMove(event)
    const pointerDown = (event: PointerEvent) => handlePointerMove(event)
    const pointerLeave = () => handlePointerLeave()

    scene.addEventListener('pointerdown', pointerDown)
    scene.addEventListener('pointermove', pointerMove)
    scene.addEventListener('pointerleave', pointerLeave)

    handlePointerLeave()

    return () => {
      scene.removeEventListener('pointerdown', pointerDown)
      scene.removeEventListener('pointermove', pointerMove)
      scene.removeEventListener('pointerleave', pointerLeave)
    }
  }, [handlePointerMove, handlePointerLeave])

  return (
    <div className={cx('card-shell')} style={{ fontFamily: FONT_FAMILY }}>
      <div className={cx('card-scene')} ref={sceneRef}>
        <article className={cx('card')} data-card="" ref={cardRef}>
          <div className={cx('card__overlay')} aria-hidden="true"></div>
          <div className={cx('card__inner')}>
            <div className={cx('card__top')}>
              <a href="tel:+255786654790" className={cx('card__phone', 'card__inline', 'engraved-tight', 'link-reset')}>+255786654790</a>
              <a href="https://innovatiolabs.com" target="_blank" rel="noopener noreferrer" className={cx('card__company', 'link-reset')}>
                <div className={cx('card__company-line')}>
                  <span className={cx('card__company-word', 'engraved-text')}>Innovatio</span>
                  <span className={cx('card__company-ampersand', 'engraved-text')}></span>
                  <span className={cx('card__company-word', 'engraved-text')}>Labs</span>
                </div>
                <span className={cx('card__company-tagline', 'engraved-text')}></span>
              </a>
            </div>
            <div className={cx('card__center')}>
              <div className={cx('card__person')}>
                <span className={cx('card__person-first', 'engraved-text')}>Danish</span>
                <span className={cx('card__person-last', 'engraved-text')}>ansari</span>
              </div>
              <span className={cx('card__title', 'engraved-text')}>Project Manager</span>
            </div>
            <div className={cx('card__bottom')}>
              <span className={cx('card__inline', 'engraved-text', 'card__bottom-line')}>
                <a
                  href="https://maps.app.goo.gl/3Wt2qNQBghkxgn4h8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx('card__bottom-address', 'engraved-text', 'link-reset')}
                >
                  303 Holland House, Samora Avenue, Dar es Salaam, 11102, Tanzania
                </a>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

