'use client'

import { useEffect, useRef } from 'react'
import styles from './Card.module.css'

const classes = styles as Record<string, string>
const cx = (...classNames: string[]) => classNames.map((name) => classes[name] ?? name).join(' ')

const config = {
    maxRotateX: 18,
    maxRotateY: 14,
    maxRotateZ: 4,
    elasticity: 0.15,
    returnSpeed: 0.12,
}

const FONT_FAMILY =
    '"Garamond Classico SC", "EB Garamond", "Garamond", "Apple Garamond", Baskerville, "Times New Roman", serif'

interface CardProps {
    onClose?: () => void
}

export default function Card({ onClose }: CardProps) {
    const sceneRef = useRef<HTMLDivElement>(null)
    const cardRef = useRef<HTMLElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const targetRef = useRef({ rotateX: 0, rotateY: 0, rotateZ: 0, shadowX: 0, shadowY: 0 })
    const currentRef = useRef({ rotateX: 0, rotateY: 0, rotateZ: 0, shadowX: 0, shadowY: 0 })
    const isInteractingRef = useRef(false)

    useEffect(() => {
        const scene = sceneRef.current
        const card = cardRef.current
        if (!scene || !card) return

        const clamp = (value: number, min: number, max: number) =>
            Math.min(Math.max(value, min), max)

        const updateTransform = (clientX: number, clientY: number) => {
            const rect = scene.getBoundingClientRect()
            const relativeX = (clientX - rect.left) / rect.width - 0.5
            const relativeY = (clientY - rect.top) / rect.height - 0.5

            targetRef.current.rotateY = clamp(
                relativeX * 2 * config.maxRotateY,
                -config.maxRotateY,
                config.maxRotateY
            )
            targetRef.current.rotateX = clamp(
                -relativeY * 2 * config.maxRotateX,
                -config.maxRotateX,
                config.maxRotateX
            )
            targetRef.current.rotateZ = clamp(
                relativeX * 2 * config.maxRotateZ,
                -config.maxRotateZ,
                config.maxRotateZ
            )

            targetRef.current.shadowX = (targetRef.current.rotateY / config.maxRotateY) * 18
            targetRef.current.shadowY = (targetRef.current.rotateX / config.maxRotateX) * 18
        }

        const resetTransform = () => {
            targetRef.current = { rotateX: 0, rotateY: 0, rotateZ: 0, shadowX: 0, shadowY: 0 }
        }

        const lerp = (start: number, end: number, factor: number) =>
            start + (end - start) * factor

        const animate = () => {
            const speed = isInteractingRef.current ? config.elasticity : config.returnSpeed

            currentRef.current.rotateX = lerp(currentRef.current.rotateX, targetRef.current.rotateX, speed)
            currentRef.current.rotateY = lerp(currentRef.current.rotateY, targetRef.current.rotateY, speed)
            currentRef.current.rotateZ = lerp(currentRef.current.rotateZ, targetRef.current.rotateZ, speed)
            currentRef.current.shadowX = lerp(currentRef.current.shadowX, targetRef.current.shadowX, speed)
            currentRef.current.shadowY = lerp(currentRef.current.shadowY, targetRef.current.shadowY, speed)

            const { rotateX, rotateY, rotateZ, shadowX, shadowY } = currentRef.current

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
            card.style.boxShadow = `${-shadowX}px ${shadowY}px 45px rgba(47, 43, 37, 0.18)`

            animationRef.current = requestAnimationFrame(animate)
        }

        // Mouse events
        const handleMouseMove = (e: MouseEvent) => {
            isInteractingRef.current = true
            updateTransform(e.clientX, e.clientY)
        }

        const handleMouseLeave = () => {
            isInteractingRef.current = false
            resetTransform()
        }

        // Touch events
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                isInteractingRef.current = true
                const touch = e.touches[0]
                updateTransform(touch.clientX, touch.clientY)
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault()
                const touch = e.touches[0]
                updateTransform(touch.clientX, touch.clientY)
            }
        }

        const handleTouchEnd = () => {
            isInteractingRef.current = false
            resetTransform()
        }

        // Add event listeners
        scene.addEventListener('mousemove', handleMouseMove, { passive: true })
        scene.addEventListener('mouseleave', handleMouseLeave, { passive: true })
        scene.addEventListener('touchstart', handleTouchStart, { passive: true })
        scene.addEventListener('touchmove', handleTouchMove, { passive: false })

        // Listen to touchend on document to catch when finger leaves anywhere
        document.addEventListener('touchend', handleTouchEnd, { passive: true })
        document.addEventListener('touchcancel', handleTouchEnd, { passive: true })

        // Start animation loop
        animationRef.current = requestAnimationFrame(animate)

        return () => {
            scene.removeEventListener('mousemove', handleMouseMove)
            scene.removeEventListener('mouseleave', handleMouseLeave)
            scene.removeEventListener('touchstart', handleTouchStart)
            scene.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
            document.removeEventListener('touchcancel', handleTouchEnd)

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <div className={cx('card-shell')} style={{ fontFamily: FONT_FAMILY }}>
            <div className={cx('card-scene')} ref={sceneRef}>
                <article className={cx('card')} data-card="" ref={cardRef}>
                    <div className={cx('card__overlay')} aria-hidden="true"></div>
                    <div className={cx('card__inner')}>
                        <div className={cx('card__top')}>
                            <div className={cx('card__contact')}>
                                <a href="tel:+255786654790" className={cx('card__phone', 'card__inline', 'engraved-tight', 'link-reset')}>+255786654790</a>
                            </div>
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
