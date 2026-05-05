import { useId } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
  cx?: number
  cy?: number
  cr?: number
  color?: string
}

export default function DotPattern({ className, style, cx = 22, cy = 22, cr = 1, color = 'rgba(184,147,90,0.22)' }: Props) {
  const id = useId()
  return (
    <svg
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width={cx} height={cy} patternUnits="userSpaceOnUse">
          <circle cx={cx / 2} cy={cy / 2} r={cr} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
