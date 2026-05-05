import type { CSSProperties, ElementType, ReactNode, Ref } from 'react'

type Align = 'left' | 'center'
type SectionBg = 'white' | 'bege' | 'bege-creme' | 'bege-quente' | 'preto'

const bgMap: Record<SectionBg, string> = {
  white: 'var(--branco)',
  bege: 'var(--bege)',
  'bege-creme': 'var(--bege-creme)',
  'bege-quente': 'var(--bege-quente)',
  preto: 'var(--preto)',
}

export function Section({
  id,
  bg = 'white',
  large = false,
  className = '',
  children,
  sectionRef,
  style,
}: {
  id?: string
  bg?: SectionBg
  large?: boolean
  className?: string
  children: ReactNode
  sectionRef?: Ref<HTMLElement>
  style?: CSSProperties
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${large ? 'section--large' : 'section'} ${className}`.trim()}
      style={{ background: bgMap[bg], ...style }}
    >
      {children}
    </section>
  )
}

export function Container({
  children,
  narrow = false,
  className = '',
  style,
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={`container ${className}`.trim()} style={{ maxWidth: narrow ? 860 : undefined, ...style }}>
      {children}
    </div>
  )
}

export function SectionLabel({
  children,
  align = 'left',
  className = '',
  style,
}: {
  children: ReactNode
  align?: Align
  className?: string
  style?: CSSProperties
}) {
  return (
    <p
      className={`eyebrow ${className}`}
      style={{
        justifyContent: align === 'center' ? 'center' : undefined,
        ...style,
      }}
    >
      <span className="gold-line" />
      {children}
      {align === 'center' && <span className="gold-line" />}
    </p>
  )
}

export function SectionTitle<T extends ElementType = 'h2'>({
  as,
  children,
  align = 'left',
  className = '',
  style,
}: {
  as?: T
  children: ReactNode
  align?: Align
  className?: string
  style?: CSSProperties
}) {
  const Tag = as || 'h2'

  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--font-serif)',
        lineHeight: 1.2,
        textAlign: align,
        textWrap: 'balance',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

export function Divider({ align = 'left' }: { align?: Align }) {
  return (
    <div
      className="gold-line gold-line--large"
      style={{
        marginLeft: align === 'center' ? 'auto' : undefined,
        marginRight: align === 'center' ? 'auto' : undefined,
      }}
    />
  )
}
