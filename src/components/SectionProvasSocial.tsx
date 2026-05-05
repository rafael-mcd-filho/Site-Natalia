'use client'

import { useState, useEffect, useRef } from 'react'
import AvatarCircles from './ui/AvatarCircles'

const parceiros = ['ADCOS', 'ARTE OURO', 'PANDA POOL', 'GBELLA', 'GBELLE BIJOUX', 'LIFE LASER']

const depoimentos = [
  {
    texto: '"Contratamos três vendedores pela Porto Talent no último semestre. Os três seguem conosco. Antes, a gente passava meses entrevistando e ainda errava. Hoje a gente foca no que importa — e recebe candidatos prontos para a conversa final."',
    nome: 'Rafaela Mendonça',
    cargo: 'Sócia-diretora',
    empresa: 'Grupo Mendonça Calçados',
    iniciais: 'RM',
  },
  {
    texto: '"O diferencial foi o briefing. Em vez de pedirem só a descrição da vaga, sentaram com a gente para entender como o escritório funciona. Isso mudou a qualidade dos candidatos que chegaram. É recrutamento com cabeça de consultoria mesmo."',
    nome: 'Thiago Albuquerque',
    cargo: 'Gerente Administrativo',
    empresa: 'Albuquerque Contabilidade',
    iniciais: 'TA',
  },
  {
    texto: '"A gente tinha medo de contratar consultoria e se sentir só mais um cliente. Não foi o que aconteceu. Atendimento direto, retorno rápido e um candidato que está há um ano e meio conosco. Recomendamos sem pensar."',
    nome: 'Carlos Henrique Souza',
    cargo: 'Gerente de Operações',
    empresa: 'HS Distribuidora',
    iniciais: 'CS',
  },
]

export default function SectionProvasSocial() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % depoimentos.length)
    }, 7000)
  }

  useEffect(() => {
    startAuto()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrent(i)
    startAuto()
  }

  return (
    <section id="depoimentos" className="section" style={{ background: 'var(--branco)' }}>
      <div className="container">
        {/* Parceiros */}
        <div style={{ marginBottom: 80 }}>
          <p className="eyebrow reveal" style={{ justifyContent: 'center', marginBottom: 20 }}>
            <span className="gold-line" />CONFIANÇA<span className="gold-line" />
          </p>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,42px)',
            fontWeight: 500, color: 'var(--preto)', textAlign: 'center', marginBottom: 48,
          }}>
            Empresas que já confiaram<br /><strong>na Porto Talent.</strong>
          </h2>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--branco), transparent)', zIndex: 2 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--branco), transparent)', zIndex: 2 }} />

            <div style={{ overflow: 'hidden' }}>
              <div className="marquee-track" style={{ gap: 0 }}>
                {[...parceiros, ...parceiros].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '20px 56px', flexShrink: 0,
                  }}>
                    <span style={{ color: 'var(--dourado)', fontSize: 10, marginBottom: 8 }}>◆</span>
                    <span style={{
                      fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--preto)',
                    }}>{p}</span>
                    <div style={{ width: 40, height: 1, background: 'var(--cinza-claro)', marginTop: 8 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div>
          <p className="reveal" style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,2.5vw,30px)',
            fontWeight: 400, color: 'var(--preto)', textAlign: 'center', marginBottom: 32,
          }}>
            O que dizem sobre o nosso trabalho
          </p>

          {/* Social proof strip */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 48 }}>
            <AvatarCircles
              avatars={[
                { initials: 'RM' },
                { initials: 'TA', bg: '#2A2A2A' },
                { initials: 'CS', bg: '#4A4A4A' },
              ]}
              size={38}
            />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--cinza-escuro)' }}>
              <strong style={{ color: 'var(--preto)', fontWeight: 600 }}>+120 empresas</strong> atendidas em João Pessoa e região
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            {depoimentos.map((d, i) => (
              <div
                key={i}
                className="depoimento-card"
                style={{
                  display: i === current ? 'block' : 'none',
                  background: 'var(--bege-creme)',
                  border: '1px solid var(--cinza-suave)',
                  borderRadius: 4, padding: 48, position: 'relative',
                  maxWidth: 860, margin: '0 auto',
                  animation: i === current ? 'fadeIn 0.5s ease' : 'none',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: 80, fontWeight: 400,
                  color: 'var(--dourado)', opacity: 0.35, lineHeight: 1,
                  position: 'absolute', top: 24, left: 32,
                  fontStyle: 'normal',
                }}>&quot;</span>

                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7,
                  color: 'var(--cinza-escuro)', marginBottom: 32,
                  paddingTop: 32,
                }}>{d.texto}</p>

                <div style={{ width: 40, height: 1, background: 'var(--cinza-suave)', marginBottom: 20 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'var(--preto)', color: 'var(--bege)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500,
                    flexShrink: 0,
                  }}>{d.iniciais}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--preto)' }}>{d.nome}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--cinza-medio)' }}>{d.cargo} — {d.empresa}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Controles */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 24 }}>
              {depoimentos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  style={{
                    minWidth: 44, minHeight: 44, border: 'none', background: 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 0,
                  }}
                >
                  <span style={{
                    display: 'block',
                    width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === current ? 'var(--preto)' : 'var(--cinza-suave)',
                    transition: 'width 0.3s, background 0.3s',
                  }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .depoimento-card { padding: 28px 24px !important; } }
      `}</style>
    </section>
  )
}
