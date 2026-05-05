'use client'

import Image from 'next/image'
import { ArrowRight, BriefcaseBusiness, Clock, Handshake, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/tracking'
import NumberTicker from './ui/NumberTicker'

export default function Hero() {
  const underlineRef = useRef<SVGPathElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      underlineRef.current?.closest('.organic-underline')?.classList.add('animate')
    }, 1000)
    const pulse = setTimeout(() => {
      btnRef.current?.classList.add('btn-pulse')
    }, 2000)
    return () => { clearTimeout(timer); clearTimeout(pulse) }
  }, [])

  return (
    <section
      id="inicio"
      className="hero-section"
      style={{
        minHeight: '68svh',
        background: 'linear-gradient(135deg, var(--bege-creme) 0%, var(--bege) 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: 58,
      }}
    >
      <div className="container hero-container" style={{ width: '100%' }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 48, alignItems: 'center',
        }}>

          {/* Coluna de texto */}
          <div>
            <div className="eyebrow reveal hero-eyebrow" style={{ marginBottom: 28 }}>
              <span className="status-dot" />
              <span className="gold-line" style={{ flexShrink: 0 }} />
              <span className="eyebrow-text">CONSULTORIA DE RECRUTAMENTO E SELEÇÃO</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.12, marginBottom: 16 }}>
              <span
                className="reveal reveal-delay-1"
                style={{ display: 'block', fontSize: 'clamp(32px, 4.6vw, 62px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}
              >
                Empresas não precisam<br className="hero-br" /> de mais currículos.
              </span>
              <span
                className="reveal reveal-delay-2"
                style={{ display: 'block', fontSize: 'clamp(36px, 5vw, 66px)', fontWeight: 500, color: 'var(--preto)', marginTop: 4 }}
              >
                Precisam do candidato{' '}
                <span className="organic-underline">
                  certo.
                  <svg aria-hidden="true" viewBox="0 0 120 10" preserveAspectRatio="none">
                    <path ref={underlineRef} d="M2,7 C30,2 60,10 118,5" />
                  </svg>
                </span>
              </span>
            </h1>

            <p
              className="reveal reveal-delay-3"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.65, color: 'var(--cinza-escuro)', maxWidth: 520, marginBottom: 28 }}
            >
              Selecionamos profissionais alinhados à sua vaga, à sua cultura e à sua operação.
              Você recebe finalistas — não currículos. Assertividade em vez de volume.
            </p>

            <div className="reveal reveal-delay-4" style={{ marginBottom: 20 }}>
              <a
                href="#contato"
                className="btn-primary btn-primary--large"
                ref={btnRef}
                onClick={() => trackEvent('cta_click', { location: 'hero', target: 'empresa' })}
              >
                <BriefcaseBusiness size={18} aria-hidden="true" />
                <span className="cta-label">Quero contratar com assertividade</span>
                <ArrowRight className="button-icon" size={18} aria-hidden="true" />
              </a>
            </div>

            <div className="reveal reveal-delay-5 hero-badges" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--cinza-medio)' }}>
              {[
                { icon: <Clock size={13} aria-hidden="true" />, label: 'Resposta em até 24h' },
                { icon: <Handshake size={13} aria-hidden="true" />, label: 'Atendimento personalizado' },
                { icon: <MapPin size={13} aria-hidden="true" />, label: 'João Pessoa e região' },
              ].map(({ icon, label }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>{icon}{label}</span>
              ))}
            </div>
          </div>

          {/* Coluna de imagem */}
          <div className="reveal reveal-delay-2 hero-image-col" style={{ position: 'relative', width: '100%', maxWidth: 390, justifySelf: 'end' }}>
            <div className="hero-image-shadow" style={{
              position: 'absolute', inset: 0,
              background: 'var(--preto)',
              borderRadius: '120px 8px 120px 8px',
              transform: 'translate(16px, 16px)',
            }} />
            <div className="hero-image-frame" style={{
              position: 'relative',
              borderRadius: '120px 8px 120px 8px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              background: 'var(--cinza-muito-claro)',
            }}>
              <Image
                src="/imagens/hero.jpeg"
                alt="Consultora da Porto Talent"
                fill
                priority
                sizes="(max-width: 768px) 320px, 45vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>

            {/* Stat card */}
            <div className="hero-stat-card" style={{
              position: 'absolute', bottom: -16, right: -16,
              background: 'var(--branco)',
              borderRadius: 8, padding: '16px 20px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 500, color: 'var(--preto)', lineHeight: 1 }}>
                <NumberTicker value={97} suffix="%" duration={1200} />
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--cinza-escuro)', marginTop: 4, lineHeight: 1.4 }}>
                Taxa de adaptação<br />dos profissionais
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-container { padding: 24px 80px 28px; }

        @media (max-width: 1024px) {
          .hero-container { padding: 24px 48px 30px; }
        }

        @media (max-width: 768px) {
          .hero-section { min-height: auto !important; align-items: flex-start !important; padding-top: 62px !important; }
          .hero-container { padding: 18px 20px 24px; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .hero-eyebrow { flex-wrap: nowrap; }
          .eyebrow-text { font-size: 10px; letter-spacing: 0.15em; }
          .hero-br { display: none; }
          .hero-image-col {
            width: min(100%, 320px) !important;
            max-width: 320px !important;
            justify-self: center !important;
            margin: 0 auto;
            opacity: 1 !important;
            transform: none !important;
          }
          .hero-image-shadow {
            border-radius: 76px 8px 76px 8px !important;
            transform: translate(10px, 10px) !important;
          }
          .hero-image-frame {
            min-height: 270px;
            aspect-ratio: 4 / 4.65 !important;
            border-radius: 76px 8px 76px 8px !important;
          }
          .hero-stat-card {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            width: min(100%, 158px);
            margin: -30px auto 0;
            padding: 12px 14px !important;
            z-index: 2;
          }
          .hero-stat-card > div:first-child { font-size: 36px !important; }
          .hero-stat-card > div:last-child { font-size: 10px !important; }
          .hero-badges { flex-direction: column; gap: 8px !important; }
        }
      `}</style>
    </section>
  )
}
