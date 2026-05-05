'use client'

import { ArrowRight, BadgeCheck, ClipboardList, Filter, type LucideIcon } from 'lucide-react'
import { trackEvent } from '@/lib/tracking'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

type Servico = {
  num: string
  icon: LucideIcon
  titulo: string
  descricao: string
}

const servicos: Servico[] = [
  {
    num: '01',
    icon: ClipboardList,
    titulo: 'Recrutamento completo',
    descricao: 'Do briefing da vaga à apresentação dos finalistas. Cada processo conduzido com estratégia própria e busca ativa no mercado.',
  },
  {
    num: '02',
    icon: Filter,
    titulo: 'Triagem e avaliação',
    descricao: 'Análise de currículos, entrevistas por competência e mapeamento comportamental para identificar o encaixe técnico e cultural.',
  },
  {
    num: '03',
    icon: BadgeCheck,
    titulo: 'Curadoria de finalistas',
    descricao: 'Você recebe apenas candidatos pré-avaliados, com parecer consultivo sobre cada um. Sem volume. Com critério.',
  },
]

export default function SectionServicos() {
  return (
    <Section id="servicos" bg="bege-creme">
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel align="center" className="reveal" style={{ marginBottom: 16 }}>
            SERVIÇOS
          </SectionLabel>
          <SectionTitle className="reveal reveal-delay-1" align="center" style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 500, color: 'var(--preto)', marginBottom: 16,
          }}>
            O que a Porto Talent entrega
          </SectionTitle>
          <p className="reveal reveal-delay-2" style={{
            fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--cinza-escuro)',
          }}>
            Três frentes. Um objetivo: contratação certa, na primeira vez.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="servicos-grid">
          {servicos.map((s, i) => {
            const ServiceIcon = s.icon

            return (
            <div
              key={i}
              className={`servico-card reveal reveal-delay-${i + 1}`}
              style={{
                background: 'var(--branco)', border: '1px solid var(--cinza-suave)',
                borderRadius: 4, padding: 48, position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 24 }}>
                <span className="servico-num" style={{
                  fontFamily: 'var(--font-serif)', fontSize: 72, fontWeight: 400,
                  color: 'var(--dourado)', lineHeight: 1, transition: 'transform 0.4s',
                }}>{s.num}</span>
                <span className="servico-icon" style={{ color: 'var(--preto)', marginBottom: 8, transition: 'color 0.4s' }}>
                  <ServiceIcon size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
              <h3 className="servico-titulo" style={{
                fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600,
                color: 'var(--preto)', marginBottom: 12, transition: 'color 0.4s',
              }}>{s.titulo}</h3>
              <p className="servico-desc" style={{
                fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6,
                color: 'var(--cinza-escuro)', transition: 'color 0.4s',
              }}>{s.descricao}</p>
              <ArrowRight className="servico-arrow" size={20} aria-hidden="true" style={{
                position: 'absolute', bottom: 24, right: 24,
                color: 'var(--bege)', opacity: 0,
                transform: 'translateX(10px)', transition: 'opacity 0.4s, transform 0.4s',
              }} />
            </div>
            )
          })}
        </div>

        <div className="reveal reveal-delay-4" style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="#contato"
            className="link-arrow"
            onClick={() => trackEvent('cta_click', { location: 'servicos', target: 'empresa' })}
          >
            <span className="cta-label">Quero saber como funciona para minha empresa</span>
            <ArrowRight className="button-icon" size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>

      <style>{`
        .servico-card:hover { background: var(--preto) !important; border-color: var(--dourado) !important; transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.12); }
        .servico-card:hover .servico-titulo, .servico-card:hover .servico-desc { color: var(--bege) !important; }
        .servico-card:hover .servico-icon { color: var(--dourado) !important; }
        .servico-card:hover .servico-num { transform: scale(1.05); }
        .servico-card:hover .servico-arrow { opacity: 1 !important; transform: translateX(0) !important; }
        @media (max-width: 768px) { .servicos-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </Section>
  )
}
