'use client'

import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/tracking'
import RetroGrid from './ui/RetroGrid'

export default function SectionCTAFinal() {
  const underlineRef = useRef<SVGPathElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = underlineRef.current?.closest('.organic-underline')
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('animate'), 1000)
        setTimeout(() => btnRef.current?.classList.add('btn-pulse'), 2000)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section--cta" style={{ background: 'var(--bege)', position: 'relative', overflow: 'hidden' }}>
      <RetroGrid bgColor="var(--bege)" />
      <div className="container" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Linha dourada superior */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div className="gold-line gold-line--large" />
        </div>

        <h2 style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, marginBottom: 24 }}>
          <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
            Contratar bem não é sorte.
          </span>
          <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(40px,5.5vw,64px)', fontWeight: 500, color: 'var(--preto)' }}>
            É{' '}
            <span className="organic-underline">
              estratégia.
              <svg aria-hidden="true" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path ref={underlineRef} d="M2,7 C50,2 100,10 198,5" />
              </svg>
            </span>
          </span>
        </h2>

        <p className="reveal reveal-delay-3" style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px,2vw,22px)',
          color: 'var(--cinza-escuro)', lineHeight: 1.6, marginBottom: 48,
        }}>
          A Porto Talent conduz o processo. Você recebe os finalistas. A escolha é sua — com muito mais clareza.
        </p>

        <div className="reveal reveal-delay-4">
          <a
            href="#contato"
            className="btn-primary btn-primary--large"
            ref={btnRef}
            onClick={() => trackEvent('cta_click', { location: 'final_cta', target: 'empresa' })}
          >
            <BriefcaseBusiness size={18} aria-hidden="true" />
            <span className="cta-label">Quero contratar com assertividade</span>
            <ArrowRight className="button-icon" size={18} aria-hidden="true" />
          </a>
        </div>

        {/* Linha dourada inferior */}
        <div className="reveal reveal-delay-5" style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <div className="gold-line gold-line--large" />
        </div>
      </div>
    </section>
  )
}
