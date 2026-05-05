'use client'

import { ReactNode, useRef } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  gradientColor?: string
}

export default function MagicCard({ children, className, style, gradientColor = 'rgba(184,147,90,0.10)' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
  }

  return (
    <div
      ref={ref}
      className={`magic-card ${className || ''}`}
      style={{ '--gradient-color': gradientColor, ...style } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
