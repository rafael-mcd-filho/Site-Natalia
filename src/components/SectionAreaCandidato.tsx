'use client'

import { CheckCircle2, FileCheck, UploadCloud } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, FormEvent } from 'react'
import { trackEvent } from '@/lib/tracking'
import { getLeadTracking } from '@/lib/lead-tracking'

const areas = ['Comercial', 'Administrativo', 'Operacional', 'Outro']
const experiencias = ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', 'Mais de 5 anos']

export default function SectionAreaCandidato() {
  const [form, setForm] = useState({
    nome: '', email: '', whatsapp: '', cidade_estado: '',
    area_atuacao: '', cargo_atual: '', experiencia: '',
    pretensao_salarial: '', linkedin: '', website: '', lgpd: false,
  })
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  const formatPhone = (v: string) => {
    const n = v.replace(/\D/g, '').slice(0, 11)
    if (n.length <= 2) return n
    if (n.length <= 6) return `(${n.slice(0,2)}) ${n.slice(2)}`
    if (n.length <= 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6)}`
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`
  }

  const clearArquivo = () => {
    setArquivo(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleFile = (f: File) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(f.type)) { clearArquivo(); setErrorMessage('Use PDF, DOC ou DOCX.'); setStatus('error'); setFieldErrors(errors => ({ ...errors, curriculo: 'Use PDF, DOC ou DOCX.' })); return }
    if (f.size > 5 * 1024 * 1024) { clearArquivo(); setErrorMessage('Arquivo maior que 5MB.'); setStatus('error'); setFieldErrors(errors => ({ ...errors, curriculo: 'Arquivo maior que 5MB.' })); return }
    setErrorMessage('')
    setStatus('idle')
    setFieldErrors(errors => ({ ...errors, curriculo: '' }))
    setArquivo(f)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}
    if (!form.nome.trim()) errors.nome = 'Informe seu nome.'
    if (!form.email.trim()) errors.email = 'Informe seu e-mail.'
    if (form.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe um WhatsApp válido.'
    if (!form.cidade_estado.trim()) errors.cidade_estado = 'Informe sua cidade e estado.'
    if (!form.cargo_atual.trim()) errors.cargo_atual = 'Informe seu cargo.'
    if (!form.area_atuacao.trim()) errors.area_atuacao = 'Selecione sua área.'
    if (!form.experiencia.trim()) errors.experiencia = 'Selecione sua experiência.'
    if (!arquivo) errors.curriculo = 'Anexe seu currículo para continuar.'
    if (!form.lgpd) {
      errors.lgpd = 'Aceite a Política de Privacidade para continuar.'
    }
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors)[0] || 'Revise os campos.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMessage('')

    try {
      const payload = new FormData()
      payload.set('tipo', 'candidato')
      Object.entries(form).forEach(([key, value]) => {
        payload.set(key, String(value))
      })
      Object.entries(getLeadTracking()).forEach(([key, value]) => {
        payload.set(key, String(value))
      })
      if (arquivo) payload.set('curriculo', arquivo)

      const response = await fetch('/api/leads', {
        method: 'POST',
        body: payload,
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar. Tente novamente.')
      }

      setStatus('success')
      trackEvent('lead_submit_success', { type: 'candidato', has_cv: Boolean(arquivo) })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* Divisor de transição */}
      <div style={{
        background: 'var(--preto)', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--bege)',
        }}>CANDIDATOS</span>
      </div>

      <section id="candidatos" className="section" style={{ background: 'var(--bege-quente)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="candidato-grid">

            {/* Copy + Ilustração */}
            <div>
              <p className="eyebrow reveal" style={{ marginBottom: 16 }}>
                <span className="gold-line" />PARA CANDIDATOS
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, marginBottom: 20 }}>
                <span className="reveal reveal-delay-1" style={{ display: 'block', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 400, color: 'var(--cinza-escuro)' }}>
                  Você está em busca de
                </span>
                <span className="reveal reveal-delay-2" style={{ display: 'block', fontSize: 'clamp(30px,3.8vw,46px)', fontWeight: 500, color: 'var(--preto)' }}>
                  uma nova oportunidade?
                </span>
              </h2>
              <p className="reveal reveal-delay-3" style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.7, color: 'var(--cinza-escuro)', marginBottom: 48 }}>
                Cadastre seu currículo no nosso banco de talentos. Quando surgir uma vaga com o seu perfil, entramos em contato. Sem custo. Sem enrolação.
              </p>

              {/* Ilustração line-art */}
              <div className="reveal reveal-delay-4" style={{ maxWidth: 320 }}>
                <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                  {/* Pessoa com notebook — ilustração minimalista */}
                  <rect x="60" y="140" width="200" height="120" rx="8" stroke="var(--preto)" strokeWidth="1.5"/>
                  <rect x="80" y="155" width="160" height="90" rx="4" stroke="var(--preto)" strokeWidth="1"/>
                  <line x1="100" y1="175" x2="220" y2="175" stroke="var(--cinza-claro)" strokeWidth="1"/>
                  <line x1="100" y1="190" x2="200" y2="190" stroke="var(--cinza-claro)" strokeWidth="1"/>
                  <line x1="100" y1="205" x2="185" y2="205" stroke="var(--cinza-claro)" strokeWidth="1"/>
                  <circle cx="160" cy="85" r="35" stroke="var(--preto)" strokeWidth="1.5"/>
                  <path d="M138 85 Q160 65 182 85" stroke="var(--preto)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M148 95 Q160 105 172 95" stroke="var(--preto)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="160" y1="120" x2="160" y2="140" stroke="var(--preto)" strokeWidth="1.5"/>
                  <path d="M240 60 L260 50 L255 70 Z" stroke="var(--dourado)" strokeWidth="1.5" fill="none"/>
                  <circle cx="280" cy="40" r="5" stroke="var(--dourado)" strokeWidth="1.5"/>
                  <path d="M50 100 L70 90 L65 110 Z" stroke="var(--dourado)" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>

            {/* Formulário */}
            <div className="reveal reveal-delay-2" style={{
              background: 'var(--branco)', borderRadius: 8,
              boxShadow: '0 24px 60px rgba(0,0,0,0.08)', padding: 40,
            }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden="true" style={{ color: '#22c55e' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--preto)', marginBottom: 12 }}>Currículo recebido!</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--cinza-escuro)' }}>
                    Entraremos em contato quando surgir uma oportunidade com o seu perfil.
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

                  <div className="candidato-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    {[
                      { k: 'nome', label: 'Nome completo', type: 'text', required: true, col: 2 },
                      { k: 'email', label: 'E-mail', type: 'email', required: true, col: 1 },
                      { k: 'whatsapp', label: 'WhatsApp', type: 'tel', required: true, col: 1 },
                      { k: 'cidade_estado', label: 'Cidade / Estado', type: 'text', required: true, col: 1 },
                      { k: 'cargo_atual', label: 'Cargo atual ou mais recente', type: 'text', required: true, col: 1 },
                    ].map(f => (
                      <div key={f.k} className="input-traditional" style={{ gridColumn: `span ${f.col}` }}>
                        <label>{f.label}</label>
                        {f.k === 'whatsapp' ? (
                          <input type="tel" required={f.required} value={form[f.k as keyof typeof form] as string}
                            aria-invalid={Boolean(fieldErrors[f.k])}
                            onChange={e => {
                              set(f.k, formatPhone(e.target.value))
                              setFieldErrors(errors => ({ ...errors, [f.k]: '' }))
                            }} />
                        ) : (
                          <input type={f.type} required={f.required}
                            value={form[f.k as keyof typeof form] as string}
                            aria-invalid={Boolean(fieldErrors[f.k])}
                            onChange={e => {
                              set(f.k, e.target.value)
                              setFieldErrors(errors => ({ ...errors, [f.k]: '' }))
                            }} />
                        )}
                        {fieldErrors[f.k] && <span className="field-error">{fieldErrors[f.k]}</span>}
                      </div>
                    ))}

                    <div className="input-traditional" style={{ gridColumn: 'span 1' }}>
                      <label>Área de atuação</label>
                      <select
                        required
                        value={form.area_atuacao}
                        aria-invalid={Boolean(fieldErrors.area_atuacao)}
                        onChange={e => {
                          set('area_atuacao', e.target.value)
                          setFieldErrors(errors => ({ ...errors, area_atuacao: '' }))
                        }}
                      >
                        <option value="" disabled>Selecione...</option>
                        {areas.map(a => <option key={a}>{a}</option>)}
                      </select>
                      {fieldErrors.area_atuacao && <span className="field-error">{fieldErrors.area_atuacao}</span>}
                    </div>

                    <div className="input-traditional" style={{ gridColumn: 'span 1' }}>
                      <label>Experiência na área</label>
                      <select
                        required
                        value={form.experiencia}
                        aria-invalid={Boolean(fieldErrors.experiencia)}
                        onChange={e => {
                          set('experiencia', e.target.value)
                          setFieldErrors(errors => ({ ...errors, experiencia: '' }))
                        }}
                      >
                        <option value="" disabled>Selecione...</option>
                        {experiencias.map(x => <option key={x}>{x}</option>)}
                      </select>
                      {fieldErrors.experiencia && <span className="field-error">{fieldErrors.experiencia}</span>}
                    </div>

                    <div className="input-traditional" style={{ gridColumn: 'span 1' }}>
                      <label>Pretensão salarial (opcional)</label>
                      <input type="text" value={form.pretensao_salarial} onChange={e => set('pretensao_salarial', e.target.value)} />
                    </div>

                    <div className="input-traditional" style={{ gridColumn: 'span 1' }}>
                      <label>LinkedIn (opcional)</label>
                      <input type="text" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} />
                    </div>
                  </div>

                  {/* Upload de currículo */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--cinza-escuro)', display: 'block', marginBottom: 8 }}>
                      Currículo
                    </label>
                    <div
                      className={`upload-area ${dragOver ? 'dragover' : ''} ${arquivo ? 'accepted' : ''}`}
                      onClick={() => fileRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      aria-label="Selecionar currículo"
                      aria-describedby={fieldErrors.curriculo ? 'curriculo-error' : undefined}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          fileRef.current?.click()
                        }
                      }}
                      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }}
                    >
                      {arquivo ? (
                        <div>
                          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                            <FileCheck size={24} strokeWidth={1.5} aria-hidden="true" style={{ color: '#22c55e' }} />
                          </div>
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--preto)' }}>{arquivo.name}</p>
                          <button type="button" onClick={e => { e.stopPropagation(); clearArquivo() }}
                            style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--cinza-medio)', marginTop: 4, cursor: 'pointer' }}>
                            Trocar arquivo
                          </button>
                        </div>
                      ) : (
                        <div>
                          <UploadCloud size={48} strokeWidth={1.5} aria-hidden="true" style={{ margin: '0 auto 12px', color: 'var(--cinza-medio)' }} />
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--preto)' }}>
                            Arraste seu currículo aqui ou clique para selecionar
                          </p>
                          <p style={{ fontSize: 12, color: 'var(--cinza-medio)', marginTop: 4 }}>PDF, DOC ou DOCX até 5MB</p>
                        </div>
                      )}
                      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
                    </div>
                    {fieldErrors.curriculo && <span id="curriculo-error" className="field-error">{fieldErrors.curriculo}</span>}
                  </div>

                  <label className="checkbox-custom" style={{ marginBottom: 24 }}>
                    <input
                      type="checkbox"
                      checked={form.lgpd}
                      onChange={e => {
                        set('lgpd', e.target.checked)
                        setFieldErrors(errors => ({ ...errors, lgpd: '' }))
                      }}
                    />
                    <div className="checkbox-box">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--cinza-medio)' }}>
                      Autorizo o uso dos meus dados pela Porto Talent para processos seletivos e li a{' '}
                      <Link href="/politica-de-privacidade" style={{ color: 'var(--preto)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                        Política de Privacidade
                      </Link>.
                    </span>
                  </label>
                  {fieldErrors.lgpd && <span className="field-error field-error--spaced">{fieldErrors.lgpd}</span>}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    style={{
                      width: '100%', background: 'var(--preto)', color: 'var(--branco)',
                      fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
                      padding: '18px', borderRadius: 4, border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.25s, background 0.25s',
                    }}
                  >
                    <span className="button-content">
                      {status === 'loading' ? (
                        <>
                          <span className="button-spinner" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <UploadCloud size={16} aria-hidden="true" />
                          <span className="cta-label">Enviar currículo</span>
                        </>
                      )}
                    </span>
                  </button>

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
          @media (max-width: 768px) {
            .candidato-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .candidato-form-grid { grid-template-columns: 1fr !important; }
            .candidato-form-grid > div { grid-column: span 1 !important; }
          }
        `}</style>
      </section>
    </>
  )
}
