'use client'

import { BadgeCheck, ClipboardList, FileCheck, Search, Users, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

type Etapa = {
  num: string
  titulo: string
  desc: string
  detalhe: string
  icon: LucideIcon
  destaque?: boolean
}

const etapas: Etapa[] = [
  {
    num: '01',
    titulo: 'Diagnóstico da vaga',
    desc: 'Reunião de briefing para entender a vaga, a cultura e o perfil ideal — técnico e comportamental.',
    detalhe: 'A conversa inicial organiza o que a contratação precisa resolver: rotina da vaga, contexto do time, desafios do cargo, competências indispensáveis e perfil comportamental esperado. É aqui que o processo ganha critério antes de ir ao mercado.',
    icon: ClipboardList,
  },
  {
    num: '02',
    titulo: 'Estratégia de busca',
    desc: 'Definição das fontes de captação, ativação da nossa rede e construção do anúncio.',
    detalhe: 'Com o perfil claro, definimos onde buscar, como abordar candidatos e quais mensagens usar para atrair pessoas alinhadas. A busca combina anúncio, rede ativa e triagem orientada pelo briefing.',
    icon: Search,
  },
  {
    num: '03',
    titulo: 'Triagem e entrevistas',
    desc: 'Análise criteriosa de CVs, entrevistas estruturadas e avaliação comportamental.',
    detalhe: 'Cada candidato passa por análise de aderência, conversa estruturada e avaliação dos pontos técnicos e comportamentais. O objetivo é reduzir ruído e separar interesse real de encaixe real.',
    icon: FileCheck,
  },
  {
    num: '04',
    titulo: 'Apresentação de finalistas',
    desc: 'Envio de 3 a 5 candidatos com parecer consultivo sobre cada perfil.',
    detalhe: 'A empresa recebe uma seleção objetiva, com finalistas pré-avaliados e contexto sobre cada perfil. A decisão final fica mais clara porque não chega uma pilha de currículos, chega uma curadoria.',
    icon: Users,
  },
  {
    num: '05',
    titulo: 'Acompanhamento pós-contratação',
    desc: 'Suporte nos primeiros dias para garantir a adaptação e o encaixe real.',
    detalhe: 'Depois da contratação, seguimos próximos para acompanhar os primeiros sinais de adaptação, alinhar expectativas e apoiar a empresa quando surgem ajustes naturais da chegada de uma nova pessoa ao time.',
    icon: BadgeCheck,
    destaque: true,
  },
]

export default function SectionProcesso() {
  const [active, setActive] = useState(0)
  const activeEtapa = etapas[active] ?? etapas[0]!
  const ActiveIcon = activeEtapa.icon

  return (
    <Section id="processo" bg="white" large style={{
      backgroundImage: 'linear-gradient(rgba(220,208,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(220,208,191,0.35) 1px, transparent 1px)',
      backgroundSize: '56px 56px',
    }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
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

        <div className="processo-stepper processo-stepper--desktop reveal reveal-delay-4">
          <div className="processo-step-list" role="tablist" aria-label="Etapas do processo">
            {etapas.map((etapa, index) => {
              const StepIcon = etapa.icon
              const isActive = active === index

              return (
                <button
                  key={etapa.num}
                  type="button"
                  role="tab"
                  id={`processo-step-${index}`}
                  aria-selected={isActive}
                  aria-controls="processo-panel"
                  className={isActive ? 'processo-step processo-step--active' : 'processo-step'}
                  onClick={() => setActive(index)}
                >
                  <span className="processo-step-num">{etapa.num}</span>
                  <span className="processo-step-icon">
                    <StepIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="processo-step-copy">
                    <strong>{etapa.titulo}</strong>
                    <small>{etapa.desc}</small>
                  </span>
                </button>
              )
            })}
          </div>

          <article
            id="processo-panel"
            role="tabpanel"
            aria-labelledby={`processo-step-${active}`}
            className="processo-panel"
            key={activeEtapa.num}
          >
            <div className="processo-panel-icon">
              <ActiveIcon size={34} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <span className="processo-panel-kicker">Etapa {activeEtapa.num}</span>
            <h3>{activeEtapa.titulo}</h3>
            <p>{activeEtapa.detalhe}</p>
            {activeEtapa.destaque && (
              <strong className="processo-panel-badge">Diferencial Porto Talent</strong>
            )}
          </article>
        </div>

        <div className="processo-accordion reveal reveal-delay-4">
          {etapas.map((etapa, index) => {
            const StepIcon = etapa.icon
            const isActive = active === index

            return (
              <div className={isActive ? 'processo-accordion-item processo-accordion-item--active' : 'processo-accordion-item'} key={etapa.num}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`processo-mobile-panel-${index}`}
                  className="processo-accordion-trigger"
                  onClick={() => setActive(index)}
                >
                  <span className="processo-step-num">{etapa.num}</span>
                  <span className="processo-step-icon">
                    <StepIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <strong>{etapa.titulo}</strong>
                </button>
                {isActive && (
                  <div id={`processo-mobile-panel-${index}`} className="processo-accordion-panel">
                    <p>{etapa.detalhe}</p>
                    {etapa.destaque && (
                      <strong className="processo-panel-badge">Diferencial Porto Talent</strong>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>

      <style>{`
        .processo-stepper {
          display: grid;
          grid-template-columns: minmax(360px, 0.95fr) minmax(0, 1.05fr);
          gap: 28px;
          align-items: stretch;
        }

        .processo-step-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .processo-step,
        .processo-accordion-trigger {
          width: 100%;
          border: 1px solid var(--cinza-suave);
          border-radius: 8px;
          background: rgba(255,255,255,0.82);
          color: var(--preto);
          display: grid;
          grid-template-columns: 64px 48px 1fr;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          text-align: left;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.25s;
        }

        .processo-step:hover,
        .processo-accordion-trigger:hover {
          border-color: rgba(184,147,90,0.5);
          transform: translateY(-2px);
        }

        .processo-step--active,
        .processo-accordion-item--active .processo-accordion-trigger {
          background: var(--preto);
          border-color: var(--dourado);
          box-shadow: 0 18px 46px rgba(14,14,14,0.12);
          color: var(--bege);
          transform: translateY(-2px);
        }

        .processo-step-num {
          font-family: var(--font-serif);
          font-size: 34px;
          font-weight: 500;
          line-height: 1;
          color: var(--cinza-claro);
          transition: color 0.25s, font-size 0.25s;
        }

        .processo-step--active .processo-step-num,
        .processo-accordion-item--active .processo-step-num {
          font-size: 44px;
          color: var(--dourado);
        }

        .processo-step-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cinza-medio);
          background: var(--bege-creme);
          transition: color 0.25s, background 0.25s, transform 0.25s;
        }

        .processo-step--active .processo-step-icon,
        .processo-accordion-item--active .processo-step-icon {
          color: var(--preto);
          background: var(--dourado);
          transform: scale(1.08);
        }

        .processo-step-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .processo-step-copy strong,
        .processo-accordion-trigger strong {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
        }

        .processo-step-copy small {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.45;
          color: var(--cinza-escuro);
          transition: color 0.25s;
        }

        .processo-step--active .processo-step-copy small {
          color: rgba(242,230,216,0.72);
        }

        .processo-panel {
          min-height: 100%;
          border-radius: 8px;
          padding: 48px;
          background:
            radial-gradient(circle at 88% 12%, rgba(184,147,90,0.22), transparent 30%),
            linear-gradient(135deg, #11100f, #1f1b17);
          color: var(--bege);
          border: 1px solid rgba(184,147,90,0.28);
          box-shadow: 0 24px 70px rgba(14,14,14,0.16);
          animation: processoFade 0.35s var(--ease-out);
        }

        .processo-panel-icon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--dourado);
          color: var(--preto);
          margin-bottom: 28px;
        }

        .processo-panel-kicker {
          display: block;
          margin-bottom: 12px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dourado);
        }

        .processo-panel h3 {
          font-family: var(--font-serif);
          font-size: clamp(32px, 3.2vw, 44px);
          font-weight: 500;
          line-height: 1.1;
          margin-bottom: 22px;
          color: var(--branco);
        }

        .processo-panel p,
        .processo-accordion-panel p {
          font-family: var(--font-sans);
          font-size: 17px;
          line-height: 1.75;
        }

        .processo-panel p {
          color: rgba(242,230,216,0.82);
          max-width: 620px;
        }

        .processo-panel-badge {
          display: inline-flex;
          align-items: center;
          margin-top: 26px;
          border-radius: 999px;
          padding: 8px 13px;
          background: rgba(184,147,90,0.16);
          color: var(--dourado);
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .processo-accordion {
          display: none;
        }

        @keyframes processoFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .processo-stepper--desktop { display: none; }
          .processo-accordion {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .processo-accordion-item {
            border-radius: 8px;
          }

          .processo-accordion-trigger {
            grid-template-columns: 54px 42px 1fr;
            padding: 16px;
          }

          .processo-accordion-panel {
            padding: 18px 18px 22px;
            border: 1px solid rgba(184,147,90,0.22);
            border-top: 0;
            border-radius: 0 0 8px 8px;
            background: var(--branco);
            color: var(--cinza-escuro);
            animation: processoFade 0.28s var(--ease-out);
          }

          .processo-accordion-item--active .processo-accordion-trigger {
            border-radius: 8px 8px 0 0;
          }

          .processo-accordion-panel p {
            font-size: 15px;
            line-height: 1.65;
          }
        }

        @media (max-width: 420px) {
          .processo-accordion-trigger {
            grid-template-columns: 48px 38px 1fr;
            gap: 10px;
          }

          .processo-step-num {
            font-size: 30px;
          }

          .processo-accordion-item--active .processo-step-num {
            font-size: 38px;
          }
        }
      `}</style>
    </Section>
  )
}
