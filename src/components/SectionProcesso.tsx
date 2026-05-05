'use client'

import { BadgeCheck, ClipboardList, FileCheck, Search, Users, type LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

type Etapa = {
  num: string
  titulo: string
  desc: string
  icon: LucideIcon
  destaque?: boolean
}

const etapas: Etapa[] = [
  {
    num: '01', titulo: 'Diagnóstico da vaga',
    desc: 'Reunião de briefing para entender a vaga, a cultura e o perfil ideal — técnico e comportamental.',
    icon: ClipboardList,
  },
  {
    num: '02', titulo: 'Estratégia de busca',
    desc: 'Definição das fontes de captação, ativação da nossa rede e construção do anúncio.',
    icon: Search,
  },
  {
    num: '03', titulo: 'Triagem e entrevistas',
    desc: 'Análise criteriosa de CVs, entrevistas estruturadas e avaliação comportamental.',
    icon: FileCheck,
  },
  {
    num: '04', titulo: 'Apresentação de finalistas',
    desc: 'Envio de 3 a 5 candidatos com parecer consultivo sobre cada perfil.',
    icon: Users,
  },
  {
    num: '05', titulo: 'Acompanhamento pós-contratação',
    desc: 'Suporte nos primeiros dias para garantir a adaptação e o encaixe real.',
    icon: BadgeCheck,
    destaque: true,
  },
]

export default function SectionProcesso() {
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        numRefs.current.forEach((el, i) => {
          setTimeout(() => {
            el?.classList.add('etapa-active')
          }, i * 200)
        })
        observer.disconnect()
      }
    }, { threshold: 0.2 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="processo" bg="white" large sectionRef={sectionRef} style={{
      backgroundImage: 'linear-gradient(rgba(220,208,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(220,208,191,0.35) 1px, transparent 1px)',
      backgroundSize: '56px 56px',
    }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <SectionLabel align="center" className="reveal" style={{ marginBottom: 16 }}>
            COMO TRABALHAMOS
          </SectionLabel>
          <SectionTitle align="center" style={{ marginBottom: 16 }}>
            <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
              Um processo claro.
            </span>
            <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 500, color: 'var(--preto)' }}>
              Do briefing à contratação.
            </span>
          </SectionTitle>
          <p className="reveal reveal-delay-3" style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--cinza-escuro)' }}>
            Cinco etapas estruturadas para entregar a pessoa certa sem atalho e sem enrolação.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, position: 'relative' }} className="processo-grid">
          {etapas.map((e, i) => {
            const StepIcon = e.icon

            return (
            <div
              key={i}
              className="reveal"
              style={{ textAlign: 'center', transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms` }}
            >
              <div
                ref={el => { numRefs.current[i] = el }}
                style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}
              >
                {e.destaque && (
                  <svg
                    width="80" height="80" viewBox="0 0 80 80"
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
                  >
                    <circle cx="40" cy="40" r="38" fill="none" stroke="var(--dourado)" strokeWidth="1.5"
                      strokeDasharray="238" strokeDashoffset="238"
                      className="ring-circle"
                      style={{ transition: 'stroke-dashoffset 0.8s var(--ease-out) 0.8s' }}
                    />
                  </svg>
                )}
                <div className="etapa-num" style={{
                  fontFamily: 'var(--font-serif)', fontSize: 80, fontWeight: 400, lineHeight: 1,
                  color: 'var(--cinza-muito-claro)', transition: 'color 0.4s ease',
                }}>{e.num}</div>
              </div>
              <div style={{ color: 'var(--cinza-medio)', marginBottom: 12 }}>
                <StepIcon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--preto)', marginBottom: 8 }}>
                {e.titulo}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.5, color: 'var(--cinza-escuro)' }}>
                {e.desc}
              </p>
              {e.destaque && (
                <p style={{ marginTop: 8, fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dourado)' }}>
                  Diferencial Porto Talent
                </p>
              )}
            </div>
            )
          })}
        </div>
      </Container>

      <style>{`
        .etapa-active .etapa-num { color: var(--preto) !important; }
        .etapa-active .ring-circle { stroke-dashoffset: 0 !important; }
        @media (max-width: 768px) {
          .processo-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Section>
  )
}
