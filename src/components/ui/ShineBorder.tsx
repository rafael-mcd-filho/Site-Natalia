import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  color?: string
}

export default function ShineBorder({ children, className, style, color = 'var(--dourado)' }: Props) {
  return (
    <div
      className={`shine-border ${className || ''}`}
      style={{ '--shine-color': color, ...style } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
