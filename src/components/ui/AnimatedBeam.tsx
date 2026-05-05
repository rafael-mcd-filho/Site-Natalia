'use client'

import { useEffect, useRef } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
  color?: string
  duration?: number
}

export default function AnimatedBeam({ className, style, color = 'var(--dourado)', duration = 1.6 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transform = 'scaleY(1)'
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: 1.5, background: color,
        transform: 'scaleY(0)', transformOrigin: 'top center',
        transition: `transform ${duration}s cubic-bezier(0.16,1,0.3,1)`,
        ...style,
      }}
      aria-hidden="true"
    />
  )
}
