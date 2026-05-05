import { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  cols?: number
  gap?: number
}

export function BentoGrid({ children, className, style, cols = 3, gap = 16 }: GridProps) {
  return (
    <div
      className={`bento-grid ${className || ''}`}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}
    >
      {children}
    </div>
  )
}

interface ItemProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  colSpan?: number
  rowSpan?: number
}

export function BentoItem({ children, className, style, colSpan = 1, rowSpan = 1 }: ItemProps) {
  return (
    <div
      className={`bento-item ${className || ''}`}
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`, ...style }}
    >
      {children}
    </div>
  )
}
