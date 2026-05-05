'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

export default function SectionProposta() {
  const countRef = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true
        let start = 0
        const end = 97
        const duration = 1200
        const step = (duration / end)
        const timer = setInterval(() => {
          start++
          el.textContent = start + '%'
          if (start >= end) clearInterval(timer)
        }, step)
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Section bg="white">
      <Container>
        <div style={{
          display: 'grid', gridTemplateColumns: '40fr 60fr',
          gap: 80, alignItems: 'center',
        }} className="proposta-grid">

          {/* Imagem */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--bege)',
              borderRadius: '120px 8px 120px 8px',
              transform: 'translate(-16px, 16px)',
            }} />
            <div style={{
              position: 'relative',
              borderRadius: '120px 8px 120px 8px',
              overflow: 'hidden', aspectRatio: '3/4',
              background: 'var(--cinza-muito-claro)',
            }}>
              <Image
                src="/imagens/briefing.png"
                alt="Reunião de briefing de recrutamento"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>

            {/* Stat card */}
            <div
              className="reveal reveal-delay-3"
              style={{
                position: 'absolute', bottom: -16, right: -16,
                background: 'var(--branco)', borderRadius: 8,
                padding: '20px 24px', boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)', fontSize: 56,
                fontWeight: 500, color: 'var(--preto)', lineHeight: 1,
              }}>
                <span ref={countRef}>0%</span>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--cinza-escuro)', marginTop: 4, lineHeight: 1.4 }}>
                Taxa de adaptação<br />dos profissionais indicados
              </div>
            </div>
          </div>

          {/* Texto */}
          <div>
            <SectionLabel className="reveal" style={{ marginBottom: 20 }}>
              A DIFERENÇA
            </SectionLabel>
            <SectionTitle style={{ marginBottom: 32 }}>
              <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
                Recrutamento não é preencher uma vaga.
              </span>
              <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px, 3.8vw, 48px)', fontWeight: 500, color: 'var(--preto)' }}>
                É encontrar a pessoa certa.
              </span>
            </SectionTitle>

            {[
              'Na Porto Talent, cada processo começa com uma conversa — não com um anúncio. Antes de buscar candidatos, a gente entende a sua empresa por dentro: o que você faz, como o time trabalha, que tipo de pessoa se adapta à sua cultura e o que essa contratação precisa gerar.',
              null,
              'O resultado: processos mais curtos, contratações que duram mais e menos ruído no seu dia.',
            ].map((p, i) => (
              p === null ? (
                <p key={i} className={`reveal reveal-delay-${i + 2}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7, color: 'var(--cinza-escuro)', marginBottom: 20 }}>
                  A partir daí, conduzimos uma curadoria criteriosa. Análise de currículos, entrevistas estruturadas, avaliação comportamental. Você não recebe uma lista. Recebe uma{' '}
                  <span style={{
                    position: 'relative', display: 'inline-block',
                    background: 'linear-gradient(to right, rgba(184,147,90,0.2), rgba(184,147,90,0.2))',
                    backgroundRepeat: 'no-repeat', backgroundPosition: '0 100%',
                    backgroundSize: '100% 3px', paddingBottom: 2,
                  }}>seleção</span>.
                </p>
              ) : (
                <p key={i} className={`reveal reveal-delay-${i + 2}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7, color: 'var(--cinza-escuro)', marginBottom: 20 }}>{p}</p>
              )
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        @media (max-width: 768px) {
          .proposta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </Section>
  )
}
