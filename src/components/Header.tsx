'use client'

import { ArrowRight, BriefcaseBusiness, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/tracking'

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          height: scrolled ? 68 : 88,
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.04)' : 'none',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'height 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#inicio" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600,
              color: 'var(--preto)', letterSpacing: '-0.01em',
            }}>Porto Talent</span>
          </a>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', gap: 36 }} className="hidden-mobile">
            {navItems.map(item => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Ações desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="hidden-mobile">
            <a
              href="#candidatos"
              className="link-arrow"
              onClick={() => trackEvent('cta_click', { location: 'header', target: 'candidatos' })}
              style={{ fontSize: 14, color: 'var(--cinza-escuro)' }}
            >
              <UserRound size={16} aria-hidden="true" />
              <span className="cta-label">Sou candidato</span>
              <ArrowRight className="button-icon" size={15} aria-hidden="true" />
            </a>
            <a
              href="#contato"
              className={`btn-primary ${scrolled ? 'btn-primary--scrolled' : ''}`}
              onClick={() => trackEvent('cta_click', { location: 'header', target: 'empresa' })}
              style={{ padding: '12px 24px' }}
            >
              <BriefcaseBusiness size={16} aria-hidden="true" />
              <span className="cta-label">Quero contratar</span>
              <ArrowRight className="button-icon" size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Hambúrguer mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="show-mobile"
            style={{
              background: 'none', border: 'none', padding: 8,
              flexDirection: 'column', gap: 5, cursor: 'pointer',
            }}
          >
            <span style={{
              display: 'block', width: 24, height: 1.5, background: 'var(--preto)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5, background: 'var(--preto)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.3s',
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5, background: 'var(--preto)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 850,
        background: 'var(--bege)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.4s ease',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: 8,
        padding: '0 40px',
      }}>
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 500,
              color: 'var(--preto)', textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`,
              padding: '12px 0',
            }}
          >{item.label}</a>
        ))}
        <div style={{
          marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.4s ease 400ms, transform 0.4s ease 400ms`,
        }}>
          <a
            href="#contato"
            onClick={() => {
              setMenuOpen(false)
              trackEvent('cta_click', { location: 'mobile_menu', target: 'empresa' })
            }}
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
          >
            <BriefcaseBusiness size={16} aria-hidden="true" />
            <span className="cta-label">Quero contratar</span>
            <ArrowRight className="button-icon" size={15} aria-hidden="true" />
          </a>
          <a
            href="#candidatos"
            onClick={() => {
              setMenuOpen(false)
              trackEvent('cta_click', { location: 'mobile_menu', target: 'candidatos' })
            }}
            className="link-arrow"
          >
            <UserRound size={16} aria-hidden="true" />
            <span className="cta-label">Sou candidato</span>
            <ArrowRight className="button-icon" size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style>{`
        .nav-link {
          font-family: var(--font-sans); font-size: 14px; font-weight: 400;
          color: var(--cinza-escuro); text-decoration: none; position: relative; cursor: pointer;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: var(--preto);
          transition: width 0.3s var(--ease-out);
        }
        .nav-link:hover::after { width: 100%; }
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
