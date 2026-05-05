interface Avatar {
  initials: string
  bg?: string
}

interface Props {
  avatars: Avatar[]
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function AvatarCircles({ avatars, size = 40, className, style }: Props) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', ...style }}>
      {avatars.map((a, i) => (
        <div
          key={i}
          title={a.initials}
          style={{
            width: size, height: size, borderRadius: '50%',
            background: a.bg || 'var(--preto)',
            color: 'var(--bege)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontSize: Math.round(size * 0.36), fontWeight: 500,
            border: '2px solid var(--branco)',
            marginLeft: i > 0 ? -Math.round(size * 0.28) : 0,
            flexShrink: 0, zIndex: avatars.length - i, position: 'relative',
          }}
        >
          {a.initials}
        </div>
      ))}
    </div>
  )
}
