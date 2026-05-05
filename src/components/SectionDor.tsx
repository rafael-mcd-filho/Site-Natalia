import { FileText, Fingerprint, RotateCcw, type LucideIcon } from 'lucide-react'
import DotPattern from './ui/DotPattern'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

type DorCard = {
  icon: LucideIcon
  titulo: string
  texto: string
}

const cards: DorCard[] = [
  {
    icon: FileText,
    titulo: 'Currículos demais. Tempo de menos.',
    texto: 'Dezenas de CVs chegam toda semana. Você não tem horas para avaliar cada um com o cuidado que a vaga exige.',
  },
  {
    icon: RotateCcw,
    titulo: 'Contrata rápido, perde rápido.',
    texto: 'A rotatividade alta drena o time, os custos e a paciência. E o ciclo recomeça em poucos meses.',
  },
  {
    icon: Fingerprint,
    titulo: 'Perfil técnico ≠ perfil de cultura.',
    texto: 'O currículo parecia ideal. O dia a dia mostrou que não era. De novo.',
  },
]

export default function SectionDor() {
  return (
    <Section bg="white" style={{ position: 'relative', overflow: 'hidden' }}>
      <DotPattern />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel align="center" className="reveal" style={{ marginBottom: 16 }}>
            O PROBLEMA
          </SectionLabel>
          <SectionTitle
            className="reveal reveal-delay-1"
            align="center"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 500, color: 'var(--preto)', marginBottom: 24,
            }}
          >
            Contratar no escuro custa{' '}
            <span style={{ fontWeight: 600 }}>caro.</span>
          </SectionTitle>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7,
              color: 'var(--cinza-escuro)', maxWidth: 720, margin: '0 auto',
            }}
          >
            Toda empresa que já contratou errado conhece o preço: não é só o salário perdido. É o tempo
            do time treinando alguém que vai embora. O cliente mal atendido. A vaga que volta a ficar
            em aberto. E a pilha de currículos — de novo — na sua mesa.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="cards-grid">
          {cards.map((card, i) => {
            const CardIcon = card.icon

            return (
            <div
              key={i}
              className={`card-base reveal reveal-delay-${i + 1}`}
              style={{ cursor: 'default' }}
            >
              <div style={{ color: 'var(--preto)', marginBottom: 20, transition: 'color 0.25s, transform 0.25s' }}
                className="card-icon">
                <CardIcon size={32} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600,
                color: 'var(--preto)', marginBottom: 12,
              }}>{card.titulo}</h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6,
                color: 'var(--cinza-escuro)',
              }}>{card.texto}</p>
            </div>
            )
          })}
        </div>
      </Container>

      <style>{`
        .card-base:hover .card-icon { color: var(--dourado); transform: rotate(8deg); }
        @media (max-width: 768px) { .cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  )
}
