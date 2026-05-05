'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Container, Section, SectionLabel, SectionTitle } from './ui/SectionPrimitives'

const faqs = [
  {
    pergunta: 'Como funciona o investimento em um processo de recrutamento?',
    resposta: 'O valor varia conforme a complexidade da vaga, o nível do cargo e o prazo. Após entender o perfil que você precisa, enviamos uma proposta personalizada — sem cobrança por orçamento e sem compromisso.',
  },
  {
    pergunta: 'Em quanto tempo consigo ter candidatos qualificados?',
    resposta: 'Processos para vagas operacionais e administrativas costumam apresentar finalistas entre 7 e 15 dias. Vagas mais específicas ou de liderança podem levar de 20 a 40 dias. Tudo é alinhado no briefing inicial.',
  },
  {
    pergunta: 'E se o candidato contratado não se adaptar?',
    resposta: 'Oferecemos garantia de reposição. Se o profissional sair dentro do período combinado em contrato, conduzimos um novo processo sem custo adicional.',
    destaque: true,
  },
  {
    pergunta: 'Vocês atendem empresas de qualquer porte?',
    resposta: 'Nosso foco é em pequenas e médias empresas, especialmente as que não têm estrutura de RH interno ou precisam de apoio consultivo em contratações pontuais ou recorrentes.',
  },
  {
    pergunta: 'Para quais áreas vocês recrutam?',
    resposta: 'Atendemos principalmente as áreas comercial, administrativa e operacional. Se sua vaga é de outro segmento, converse com a gente — avaliamos caso a caso.',
  },
  {
    pergunta: 'Preciso ter um RH estruturado para contratar a Porto Talent?',
    resposta: 'Não. A maior parte dos nossos clientes não tem RH interno. Nosso papel é justamente cumprir esse processo com qualidade, para que a empresa foque no seu negócio.',
  },
  {
    pergunta: 'O atendimento é feito presencialmente ou à distância?',
    resposta: 'Os dois. Em João Pessoa e região conduzimos reuniões presenciais quando faz sentido. Para clientes de outras regiões, todo o processo roda perfeitamente online.',
  },
]

export default function SectionFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.resposta,
      },
    })),
  }

  return (
    <Section bg="white">
      <Container narrow>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel align="center" className="reveal" style={{ marginBottom: 16 }}>
            DÚVIDAS COMUNS
          </SectionLabel>
          <SectionTitle align="center">
            <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
              Perguntas que empresas
            </span>
            <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px,3.8vw,46px)', fontWeight: 500, color: 'var(--preto)' }}>
              costumam fazer.
            </span>
          </SectionTitle>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 4) + 1}`}
              style={{ borderTop: '1px solid var(--cinza-suave)' }}
            >
              <button
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  gap: 20,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: faq.destaque ? 600 : 500,
                  color: 'var(--preto)', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {faq.pergunta}
                </span>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--cinza-medio)',
                  transform: open === i ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}>
                  <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>

              <div id={`faq-answer-${i}`} style={{
                maxHeight: open === i ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease-out',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.7,
                  color: 'var(--cinza-escuro)', paddingBottom: 28,
                  opacity: open === i ? 1 : 0,
                  transition: 'opacity 0.2s ease 0.15s',
                }}>
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--cinza-suave)' }} />
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
    </Section>
  )
}
