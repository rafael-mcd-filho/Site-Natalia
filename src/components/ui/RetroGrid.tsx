interface Props {
  className?: string
  style?: React.CSSProperties
  angle?: number
  opacity?: number
  bgColor?: string
}

export default function RetroGrid({ className, style, angle = 62, opacity = 0.35, bgColor = 'var(--bege)' }: Props) {
  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <div style={{
        position: 'absolute', inset: 0,
        transform: `perspective(360px) rotateX(${angle}deg)`,
        transformOrigin: 'center 45%',
      }}>
        <div style={{
          position: 'absolute', inset: '-120% -200%',
          backgroundImage: 'linear-gradient(var(--cinza-claro) 1px, transparent 1px), linear-gradient(90deg, var(--cinza-claro) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity,
        }} />
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
        background: `linear-gradient(to bottom, transparent, ${bgColor})`,
      }} />
    </div>
  )
}
