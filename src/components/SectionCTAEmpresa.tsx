'use client'

import { ArrowRight, CheckCircle2, Clock, Handshake, Send, ShieldCheck } from 'lucide-react'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/tracking'

const prazoOpcoes = ['Urgente', 'Em até 30 dias', 'Em até 60 dias', 'Ainda planejando']

export default function SectionCTAEmpresa() {
  const [form, setForm] = useState({
    nome: '', empresa: '', email: '', whatsapp: '',
    vaga: '', prazo: '', mensagem: '', website: '', lgpd: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const formatPhone = (v: string) => {
    const n = v.replace(/\D/g, '').slice(0, 11)
    if (n.length <= 2) return n
    if (n.length <= 6) return `(${n.slice(0,2)}) ${n.slice(2)}`
    if (n.length <= 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6)}`
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.lgpd) {
      setErrorMessage('Aceite a Política de Privacidade para continuar.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'empresa', ...form }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar. Tente novamente.')
      }

      setStatus('success')
      trackEvent('lead_submit_success', { type: 'empresa' })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="section" style={{ background: 'var(--preto)', position: 'relative', overflow: 'hidden' }}>
      {/* Noise texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '45fr 55fr', gap: 80, alignItems: 'start' }} className="cta-grid">

          {/* Copy */}
          <div>
            <p className="eyebrow eyebrow--gold reveal" style={{ marginBottom: 24 }}>
              <span className="gold-line" />VAMOS CONVERSAR
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, marginBottom: 24 }}>
              <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: 'rgba(242,230,216,0.7)' }}>
                Vamos conversar sobre
              </span>
              <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 500, color: 'var(--bege)' }}>
                sua próxima contratação?
              </span>
            </h2>
            <p className="reveal reveal-delay-3" style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.7, color: 'rgba(242,230,216,0.7)', marginBottom: 40 }}>
              Conte para a gente a vaga que você precisa preencher. Retornamos em até 24h com os próximos passos — sem compromisso.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Clock, label: 'Resposta em até 24h' },
                { icon: ShieldCheck, label: 'Sem compromisso e sem custo inicial' },
                { icon: Handshake, label: 'Briefing consultivo gratuito' },
              ].map((benefit, i) => {
                const BenefitIcon = benefit.icon

                return (
                <div key={benefit.label} className={`reveal reveal-delay-${i + 4}`} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <BenefitIcon size={16} strokeWidth={2} aria-hidden="true" style={{ color: 'var(--dourado)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(242,230,216,0.85)' }}>{benefit.label}</span>
                </div>
                )
              })}
            </div>
          </div>

          {/* Formulário */}
          <div className="reveal reveal-delay-4">
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle2 size={48} strokeWidth={1.5} aria-hidden="true" style={{ color: 'var(--dourado)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--bege)', marginBottom: 12 }}>
                  Recebemos sua mensagem!
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(242,230,216,0.7)' }}>
                  Em até 24h entraremos em contato.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                  <label>
                    Site
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={e => set('website', e.target.value)}
                    />
                  </label>
                </div>

                {[
                  { k: 'nome', label: 'Nome completo', type: 'text', required: true },
                  { k: 'empresa', label: 'Empresa', type: 'text', required: true },
                  { k: 'email', label: 'E-mail corporativo', type: 'email', required: true },
                ].map(f => (
                  <div key={f.k} className={`input-editorial ${form[f.k as keyof typeof form] ? 'has-value' : ''}`}>
                    <input
                      type={f.type} required={f.required} placeholder={f.label}
                      value={form[f.k as keyof typeof form] as string}
                      onChange={e => set(f.k, e.target.value)}
                    />
                    <label>{f.label}</label>
                    <div className="focus-line" />
                  </div>
                ))}

                <div className={`input-editorial ${form.whatsapp ? 'has-value' : ''}`}>
                  <input
                    type="tel" placeholder="WhatsApp" required
                    value={form.whatsapp}
                    onChange={e => set('whatsapp', formatPhone(e.target.value))}
                  />
                  <label>WhatsApp</label>
                  <div className="focus-line" />
                </div>

                <div className={`input-editorial ${form.vaga ? 'has-value' : ''}`}>
                  <input type="text" placeholder="Vaga" required value={form.vaga} onChange={e => set('vaga', e.target.value)} />
                  <label>Vaga que precisa preencher</label>
                  <div className="focus-line" />
                </div>

                <div className={`input-editorial ${form.prazo ? 'has-value' : ''}`}>
                  <select required value={form.prazo} onChange={e => set('prazo', e.target.value)}>
                    <option value="" disabled>Quando pretende contratar?</option>
                    {prazoOpcoes.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <label>Quando pretende contratar?</label>
                  <div className="focus-line" />
                </div>

                <div className={`input-editorial ${form.mensagem ? 'has-value' : ''}`}>
                  <textarea placeholder="Mensagem" rows={2} value={form.mensagem} onChange={e => set('mensagem', e.target.value)} />
                  <label>Mensagem (opcional)</label>
                  <div className="focus-line" />
                </div>

                <label className="checkbox-custom" style={{ marginBottom: 28 }}>
                  <input type="checkbox" checked={form.lgpd} onChange={e => set('lgpd', e.target.checked)} />
                  <div className="checkbox-box">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--cinza-medio)' }}>
                    Concordo em ser contactado pela Porto Talent e li a{' '}
                    <Link href="/politica-de-privacidade" style={{ color: 'var(--bege)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      Política de Privacidade
                    </Link>.
                  </span>
                </label>

                <button type="submit" className="btn-creme" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                  <span className="button-content">
                    {status === 'loading' ? (
                      <>
                        <span className="button-spinner" aria-hidden="true" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        <span className="cta-label">Solicitar contato</span>
                        <ArrowRight className="button-icon" size={16} aria-hidden="true" />
                      </>
                    )}
                  </span>
                </button>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--cinza-medio)', marginTop: 12, fontFamily: 'var(--font-sans)' }}>
                  <ShieldCheck size={13} strokeWidth={1.7} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: 'var(--dourado)' }} />
                  Seus dados estão seguros. Não enviamos spam.
                </p>

                {status === 'error' && (
                  <p style={{ textAlign: 'center', fontSize: 13, color: '#ff6b6b', marginTop: 8 }}>
                    {errorMessage || 'Erro ao enviar. Tente novamente.'}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  )
}
