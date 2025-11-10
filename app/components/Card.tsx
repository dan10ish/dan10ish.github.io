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
const FONT_URL = '/fonts/Garamond%20Classico%20SC.woff'

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

  useEffect(() => {
    if (typeof window === 'undefined') return

    const preloadId = 'card-garamond-preload'

    if (!document.getElementById(preloadId)) {
      const preload = document.createElement('link')
      preload.id = preloadId
      preload.rel = 'preload'
      preload.href = FONT_URL
      preload.as = 'font'
      preload.type = 'font/woff'
      preload.crossOrigin = 'anonymous'
      document.head.appendChild(preload)
    }

    if ('fonts' in document) {
      try {
        const fontFace = new FontFace('Garamond Classico SC', `url("${FONT_URL}")`, {
          style: 'normal',
          weight: '400',
          display: 'swap',
        })
        fontFace.load().then((loaded) => {
          const fontSet = (document as any).fonts
          if (fontSet && typeof fontSet.add === 'function') {
            fontSet.add(loaded)
          }
          return loaded
        })
      } catch {
        /* FontFace may not be supported */
      }
    }
  }, [])

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
              <span className={cx('card__phone', 'card__inline', 'engraved-tight')}>+255786654790</span>
              <div className={cx('card__company')}>
                <div className={cx('card__company-line')}>
                  <span className={cx('card__company-word', 'engraved-text')}>Innovatio</span>
                  <span className={cx('card__company-ampersand', 'engraved-text')}></span>
                  <span className={cx('card__company-word', 'engraved-text')}>Labs</span>
                </div>
                <span className={cx('card__company-tagline', 'engraved-text')}></span>
              </div>
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
                <span className={cx('card__bottom-address', 'engraved-text')}>
                  303 Holland House, Samora Avenue, Dar es Salaam, 11102, Tanzania
                </span>
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

