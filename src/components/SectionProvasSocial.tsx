'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const parceiros = [
  {
    nome: 'ADCOS',
    logo: '/imagens/clientes/site/adcos.png',
    width: 290,
    height: 212,
    logoClassName: 'parceiro-logo--adcos',
  },
  {
    nome: 'ARTE OURO',
    logo: '/imagens/clientes/site/arte-ouro.png',
    width: 472,
    height: 139,
  },
  {
    nome: 'PANDA POOL',
    logo: '/imagens/clientes/site/panda-pool.png',
    width: 257,
    height: 204,
    logoClassName: 'parceiro-logo--compact',
  },
  { nome: 'GBELLA' },
  { nome: 'GBELLE BIJOUX' },
  {
    nome: 'LIFE LASER',
    logo: '/imagens/clientes/site/life-laser.png',
    width: 289,
    height: 202,
    logoClassName: 'parceiro-logo--life-laser',
  },
]

const depoimentos = [
  {
    texto: 'O briefing trouxe clareza para a vaga e reduziu muito o tempo até chegarem finalistas com perfil compatível.',
    nome: 'GBella',
    foto: '/imagens/depoimentos/rafaela-mendonca.svg',
  },
  {
    texto: 'A Porto Talent entendeu a rotina da operação e apresentou candidatos mais alinhados ao atendimento da clínica.',
    nome: 'Life Laser',
    foto: '/imagens/depoimentos/thiago-albuquerque.svg',
  },
  {
    texto: 'Recebemos uma seleção objetiva, com parecer claro sobre cada perfil. O processo ficou mais simples para decidir.',
    nome: 'ADCOS',
    foto: '/imagens/depoimentos/carlos-henrique-souza.svg',
  },
]

export default function SectionProvasSocial() {
  const [current, setCurrent] = useState(0)
  const depoimento = depoimentos[current]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent(index => (index + 1) % depoimentos.length)
    }, 8000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="depoimentos" className="section depoimentos-section">
      <div className="container">
        <div className="depoimentos-header">
          <p className="eyebrow reveal depoimentos-label">
            <span className="gold-line" />CONFIANÇA<span className="gold-line" />
          </p>
          <h2 className="reveal reveal-delay-1 depoimentos-title">
            Empresas que confiam<br /><strong>na Porto Talent.</strong>
          </h2>

          <div className="reveal reveal-delay-2 parceiros-marquee" aria-label="Empresas atendidas">
            <div className="parceiros-fade parceiros-fade--left" />
            <div className="parceiros-fade parceiros-fade--right" />
            <div className="marquee-track">
              {[...parceiros, ...parceiros].map((parceiro, index) => (
                <div className="parceiro-item" key={`${parceiro.nome}-${index}`}>
                  <span aria-hidden="true">◆</span>
                  {parceiro.logo ? (
                    <Image
                      className={`parceiro-logo ${parceiro.logoClassName ?? ''}`}
                      src={parceiro.logo}
                      alt={`Logo ${parceiro.nome}`}
                      width={parceiro.width}
                      height={parceiro.height}
                    />
                  ) : (
                    <strong>{parceiro.nome}</strong>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="depoimentos-carousel" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
          <p className="reveal depoimentos-subtitle">O que dizem sobre o nosso trabalho</p>

          <article className="testimonial-card reveal reveal-delay-1" aria-live="polite" key={depoimento.nome}>
            <div className="testimonial-person">
              <Image
                className="testimonial-photo"
                src={depoimento.foto}
                alt={`Representação de ${depoimento.nome}`}
                width={72}
                height={72}
              />
              <div>
                <h3>{depoimento.nome}</h3>
              </div>
            </div>

            <blockquote className="testimonial-quote">
              <span className="quote-mark quote-mark--start" aria-hidden="true">“</span>
              <p>{depoimento.texto}</p>
              <span className="quote-mark quote-mark--end" aria-hidden="true">”</span>
            </blockquote>
          </article>

          <div className="testimonial-dots" aria-label="Navegação dos depoimentos">
            {depoimentos.map((item, index) => (
              <button
                key={item.nome}
                type="button"
                className={index === current ? 'testimonial-dot testimonial-dot--active' : 'testimonial-dot'}
                onClick={() => setCurrent(index)}
                aria-label={`Mostrar avaliação de ${item.nome}`}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .depoimentos-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 16% 18%, rgba(184,147,90,0.12), transparent 28%),
            linear-gradient(rgba(220,208,191,0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,208,191,0.2) 1px, transparent 1px),
            var(--branco);
          background-size: auto, 46px 46px, 46px 46px, auto;
          color: var(--preto);
        }

        .depoimentos-section .container {
          position: relative;
          z-index: 1;
        }

        .depoimentos-header {
          margin-bottom: 54px;
          text-align: center;
        }

        .depoimentos-label {
          justify-content: center;
          margin-bottom: 20px;
          color: var(--cinza-medio);
        }

        .depoimentos-title {
          font-family: var(--font-serif);
          font-size: clamp(30px, 3.8vw, 48px);
          font-weight: 400;
          line-height: 1.14;
          color: var(--cinza-escuro);
          margin-bottom: 38px;
        }

        .depoimentos-title strong {
          color: var(--preto);
          font-weight: 500;
        }

        .parceiros-marquee {
          position: relative;
          overflow: hidden;
          min-height: 68px;
          border-top: 1px solid var(--cinza-suave);
          border-bottom: 1px solid var(--cinza-suave);
          background: rgba(250,245,238,0.72);
        }

        .parceiros-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .parceiros-fade--left {
          left: 0;
          background: linear-gradient(to right, var(--branco), transparent);
        }

        .parceiros-fade--right {
          right: 0;
          background: linear-gradient(to left, var(--branco), transparent);
        }

        .parceiro-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex: 0 0 auto;
          min-width: 220px;
          min-height: 68px;
          padding: 10px 38px;
          color: var(--cinza-escuro);
        }

        .parceiro-item span {
          color: var(--dourado);
          font-size: 9px;
        }

        .parceiro-item strong {
          font-family: var(--font-serif);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .parceiro-logo {
          display: block;
          width: auto;
          height: auto;
          max-width: 162px;
          max-height: 46px;
          object-fit: contain;
        }

        .parceiro-logo--adcos,
        .parceiro-logo--compact,
        .parceiro-logo--life-laser {
          max-height: 52px;
        }

        .parceiro-logo--adcos {
          max-width: 96px;
        }

        .parceiro-logo--compact {
          max-width: 90px;
        }

        .parceiro-logo--life-laser {
          max-width: 132px;
        }

        .depoimentos-carousel {
          max-width: 760px;
          margin: 0 auto;
        }

        .depoimentos-subtitle {
          font-family: var(--font-serif);
          font-size: clamp(22px, 2.4vw, 30px);
          color: var(--preto);
          text-align: center;
          margin-bottom: 24px;
        }

        .testimonial-card {
          position: relative;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 28px;
          align-items: center;
          min-height: 178px;
          padding: 26px 30px;
          border: 1px solid var(--cinza-suave);
          border-radius: 8px;
          background: var(--bege-creme);
          box-shadow: 0 18px 46px rgba(14,14,14,0.07);
          animation: testimonialFade 0.35s var(--ease-out);
        }

        .testimonial-person {
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .testimonial-photo {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(184,147,90,0.7);
          box-shadow: 0 10px 24px rgba(14,14,14,0.12);
          background: var(--bege);
          flex-shrink: 0;
        }

        .testimonial-person h3 {
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 700;
          color: var(--preto);
          margin-bottom: 3px;
        }

        .testimonial-person p {
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.35;
          color: var(--cinza-medio);
        }

        .testimonial-quote {
          position: relative;
          padding: 18px 24px;
        }

        .testimonial-quote p {
          position: relative;
          z-index: 1;
          font-family: var(--font-sans);
          font-size: 17px;
          font-style: italic;
          line-height: 1.58;
          color: var(--cinza-escuro);
          text-wrap: pretty;
        }

        .quote-mark {
          position: absolute;
          font-family: var(--font-serif);
          font-size: 62px;
          line-height: 1;
          color: var(--dourado);
          opacity: 0.36;
          pointer-events: none;
        }

        .quote-mark--start {
          top: -6px;
          left: -2px;
        }

        .quote-mark--end {
          right: 0;
          bottom: -30px;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }

        .testimonial-dot {
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .testimonial-dot::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--cinza-claro);
          transition: width 0.25s var(--ease-out), background 0.25s var(--ease-out);
        }

        .testimonial-dot--active::before {
          width: 24px;
          background: var(--dourado);
        }

        @keyframes testimonialFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .depoimentos-header { margin-bottom: 42px; }
          .parceiros-fade { width: 56px; }
          .parceiro-item {
            min-width: 180px;
            padding: 10px 26px;
          }
          .parceiro-logo {
            max-width: 138px;
            max-height: 42px;
          }
          .parceiro-logo--adcos {
            max-width: 84px;
            max-height: 48px;
          }
          .parceiro-logo--compact {
            max-width: 80px;
            max-height: 48px;
          }
          .parceiro-logo--life-laser {
            max-width: 118px;
            max-height: 46px;
          }
          .testimonial-card {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 22px;
          }
          .testimonial-quote {
            padding: 16px 8px 6px;
          }
          .testimonial-quote p {
            font-size: 16px;
            line-height: 1.55;
          }
          .quote-mark { font-size: 54px; }
          .quote-mark--start { top: -8px; left: -10px; }
          .quote-mark--end { bottom: -28px; }
        }
      `}</style>
    </section>
  )
}
