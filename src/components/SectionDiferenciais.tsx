import { BadgeCheck, Building2, Clock, Filter, PanelsTopLeft, UserRound, type LucideIcon } from 'lucide-react'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

type Diferencial = {
  icon: LucideIcon
  titulo: string
  texto: string
  destaque: boolean
}

const items: Diferencial[] = [
  { icon: PanelsTopLeft, titulo: 'Processo sob medida', texto: 'Cada vaga conduzida com estratégia própria. Nada de template.', destaque: true },
  { icon: Filter, titulo: 'Curadoria, não volume', texto: 'Você recebe finalistas, não uma planilha para filtrar.', destaque: false },
  { icon: BadgeCheck, titulo: 'Encaixe cultural avaliado', texto: 'Análise comportamental estruturada em todo candidato indicado.', destaque: false },
  { icon: UserRound, titulo: 'Atendimento direto', texto: 'Você fala com quem conduz o processo, do início ao fim.', destaque: true },
  { icon: Building2, titulo: 'Foco em pequenas e médias empresas', texto: 'Entendemos a realidade de empresas que não têm RH robusto.', destaque: true },
  { icon: Clock, titulo: 'Tempo otimizado', texto: 'Processos mais curtos, com menos ruído e mais assertividade.', destaque: false },
]

export default function SectionDiferenciais() {
  return (
    <Section bg="bege" large>
      <Container>
        <div style={{ marginBottom: 64 }}>
          <SectionLabel className="reveal" style={{ marginBottom: 16 }}>
            DIFERENCIAIS
          </SectionLabel>
          <SectionTitle>
            <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
              Por que empresas escolhem
            </span>
            <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 500, color: 'var(--preto)' }}>
              a Porto Talent.
            </span>
          </SectionTitle>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          borderTop: '1px solid var(--cinza-claro)',
          borderLeft: '1px solid var(--cinza-claro)',
        }} className="diferenciais-grid">
          {items.map((item, i) => {
            const ItemIcon = item.icon

            return (
            <div
              key={i}
              className={`diferencial-item reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                padding: '48px 48px',
                borderBottom: '1px solid var(--cinza-claro)',
                borderRight: '1px solid var(--cinza-claro)',
                transition: 'transform 0.25s, background 0.25s, box-shadow 0.25s',
              }}
            >
              <div className="diferencial-icon" style={{ color: 'var(--preto)', marginBottom: 20, transition: 'color 0.25s' }}>
                <ItemIcon size={48} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600,
                color: 'var(--preto)', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'transform 0.25s',
              }} className="diferencial-titulo">
                {item.titulo}
                {item.destaque && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--dourado)', flexShrink: 0, display: 'inline-block' }} />}
              </h3>
              <div className="diferencial-line" style={{ width: 0, height: 1, background: 'var(--dourado)', marginBottom: 8, transition: 'width 0.3s' }} />
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--cinza-escuro)' }}>
                {item.texto}
              </p>
            </div>
            )
          })}
        </div>
      </Container>

      <style>{`
        .diferencial-item:hover { background: rgba(255,255,255,0.22); transform: translateY(-3px); box-shadow: 0 18px 44px rgba(14,14,14,0.06); }
        .diferencial-item:hover .diferencial-icon { color: var(--dourado); }
        .diferencial-item:hover .diferencial-titulo { transform: translateX(4px); }
        .diferencial-item:hover .diferencial-line { width: 32px; }
        @media (max-width: 1024px) { .diferenciais-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { .diferenciais-grid { grid-template-columns: 1fr !important; } .diferencial-item { padding: 32px 24px !important; } }
      `}</style>
    </Section>
  )
}
