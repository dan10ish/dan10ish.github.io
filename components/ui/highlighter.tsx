"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  /** Delay before the annotation starts drawing, in ms. */
  delay?: number
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  delay = 0,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!shouldShow || !element) return

    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let cancelled = false
    let delayTimer: ReturnType<typeof setTimeout> | null = null
    let rafId: number | null = null

    const rectKey = (r: DOMRect) =>
      `${r.width.toFixed(2)}:${r.height.toFixed(2)}:${r.left.toFixed(2)}:${r.top.toFixed(2)}`

    const waitForStableLayout = (): Promise<void> =>
      new Promise((resolve) => {
        let previous = rectKey(element.getBoundingClientRect())
        const tick = () => {
          if (cancelled) return resolve()
          const current = rectKey(element.getBoundingClientRect())
          if (current === previous) return resolve()
          previous = current
          rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      })

    const draw = () => {
      if (cancelled) return
      const current = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })
      annotation = current
      current.show()

      let first = true
      resizeObserver = new ResizeObserver(() => {
        if (first) {
          first = false
          return
        }
        current.hide()
        current.show()
      })
      resizeObserver.observe(element)
    }

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve()

    fontsReady
      .then(() => (cancelled ? null : waitForStableLayout()))
      .then(() => {
        if (cancelled) return
        if (delay > 0) {
          delayTimer = setTimeout(draw, delay)
        } else {
          draw()
        }
      })

    return () => {
      cancelled = true
      if (delayTimer) clearTimeout(delayTimer)
      if (rafId) cancelAnimationFrame(rafId)
      annotation?.remove()
      resizeObserver?.disconnect()
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delay,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
