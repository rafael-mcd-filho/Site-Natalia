'use client'

import { ArrowRight, Check, CheckCircle2, Send, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  trackEvent,
  trackLeadSubmitAttempt,
  trackLeadSubmitError,
  trackLeadSubmitSuccess,
  type LeadTrackingPayload,
} from '@/lib/tracking'
import { getLeadTracking } from '@/lib/lead-tracking'
import { Container, Section } from './ui/SectionPrimitives'

const serviceName = 'Gestão e Desenvolvimento de Equipes Comerciais'
const whatsappNumber = '558387523450'

const trackingPayload: LeadTrackingPayload = {
  type: 'interesse',
  lead_type: 'interesse',
  form_id: 'lead-form-gestao-comercial',
  form_id2: 'lead-form-gestao-comercial',
  form_name: 'gestao_equipes_comerciais',
  form_location: 'pos_faq',
}

export default function SectionCTAComercial() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', website: '', lgpd: false })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm(previous => ({ ...previous, [key]: value }))
  }

  const openModal = () => {
    trackEvent('cta_click', { location: 'gestao_comercial', target: 'interesse' })
    setOpen(true)
  }

  const closeModal = () => {
    if (status === 'loading') return
    setOpen(false)
    setStatus('idle')
    setErrorMessage('')
    setFieldErrors({})
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 80)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || status === 'loading') return
      setOpen(false)
      setStatus('idle')
      setErrorMessage('')
      setFieldErrors({})
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, status])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors: Record<string, string> = {}
    if (!form.nome.trim()) errors.nome = 'Informe seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Informe um e-mail válido.'
    if (!form.lgpd) errors.lgpd = 'Aceite a Política de Privacidade para continuar.'

    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      trackLeadSubmitError(trackingPayload, 'validation', {
        invalid_fields_count: Object.keys(errors).length,
      })
      setErrorMessage(Object.values(errors)[0] || 'Revise os campos.')
      setStatus('error')
      return
    }

    trackLeadSubmitAttempt(trackingPayload)
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'interesse',
          nome: form.nome,
          email: form.email,
          servico: serviceName,
          website: form.website,
          lgpd: form.lgpd,
          ...getLeadTracking(),
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar. Tente novamente.')
      }

      setStatus('success')
      trackLeadSubmitSuccess(trackingPayload)

      const message = encodeURIComponent(`Olá! Tenho interesse em ${serviceName}.`)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      if (!opened) window.location.href = whatsappUrl
    } catch (error) {
      trackLeadSubmitError(trackingPayload, 'request')
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <Section id="gestao-comercial" bg="white" style={{ paddingTop: 24 }}>
      <Container>
        <div className="commercial-cta reveal">
          <div className="commercial-cta-copy">
            <p className="commercial-eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              Para times de vendas
            </p>
            <h2>{serviceName}</h2>
            <p>Desenvolvimento estratégico para estruturar, acompanhar e fortalecer equipes comerciais.</p>
          </div>

          <button className="commercial-button" type="button" onClick={openModal}>
            <span>Quero conversar</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </Container>

      {open && (
        <div className="commercial-modal-backdrop" role="presentation" onMouseDown={closeModal}>
          <div
            aria-labelledby="commercial-modal-title"
            aria-modal="true"
            className="commercial-modal"
            role="dialog"
            onMouseDown={event => event.stopPropagation()}
          >
            <header className="commercial-modal-header">
              <div>
                <span>Contato</span>
                <h3 id="commercial-modal-title">Gestão comercial</h3>
              </div>
              <button aria-label="Fechar" type="button" onClick={closeModal}>
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            {status === 'success' ? (
              <div className="commercial-success">
                <CheckCircle2 size={42} aria-hidden="true" />
                <strong>Cadastro recebido.</strong>
                <p>A conversa no WhatsApp foi aberta para continuar o atendimento.</p>
              </div>
            ) : (
              <form id={trackingPayload.form_id} data-lead-type={trackingPayload.lead_type} onSubmit={handleSubmit}>
                <div className="commercial-honeypot" aria-hidden="true">
                  <label>
                    Site
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={event => set('website', event.target.value)}
                    />
                  </label>
                </div>

                <div className="input-traditional">
                  <label>Nome</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={form.nome}
                    aria-invalid={Boolean(fieldErrors.nome)}
                    onChange={event => {
                      set('nome', event.target.value)
                      setFieldErrors(errors => ({ ...errors, nome: '' }))
                    }}
                  />
                  {fieldErrors.nome && <span className="field-error">{fieldErrors.nome}</span>}
                </div>

                <div className="input-traditional">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={form.email}
                    aria-invalid={Boolean(fieldErrors.email)}
                    onChange={event => {
                      set('email', event.target.value)
                      setFieldErrors(errors => ({ ...errors, email: '' }))
                    }}
                  />
                  {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                </div>

                <label className="checkbox-custom commercial-checkbox">
                  <input
                    type="checkbox"
                    checked={form.lgpd}
                    onChange={event => {
                      set('lgpd', event.target.checked)
                      setFieldErrors(errors => ({ ...errors, lgpd: '' }))
                    }}
                  />
                  <div className="checkbox-box">
                    <Check size={11} color="white" strokeWidth={2.4} aria-hidden="true" />
                  </div>
                  <span>
                    Concordo em ser contactado pela Porto Talent e li a{' '}
                    <Link href="/politica-de-privacidade" target="_blank">
                      Política de Privacidade
                    </Link>.
                  </span>
                </label>
                {fieldErrors.lgpd && <span className="field-error commercial-lgpd-error">{fieldErrors.lgpd}</span>}

                <button className="commercial-submit" type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className="button-spinner" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Cadastrar e abrir WhatsApp
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="commercial-error">{errorMessage || 'Erro ao enviar. Tente novamente.'}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .commercial-cta {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 28px;
          border: 1px solid rgba(184, 147, 90, 0.28);
          border-radius: 8px;
          background: linear-gradient(135deg, var(--branco) 0%, var(--bege-creme) 100%);
          padding: clamp(24px, 4vw, 40px);
          box-shadow: 0 16px 48px rgba(14, 14, 14, 0.06);
        }

        .commercial-cta-copy {
          max-width: 780px;
        }

        .commercial-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 12px;
          color: var(--dourado);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .commercial-cta h2 {
          margin: 0 0 10px;
          color: var(--preto);
          font-family: var(--font-serif);
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 500;
          line-height: 1.14;
        }

        .commercial-cta p {
          margin: 0;
          color: var(--cinza-escuro);
          font-family: var(--font-sans);
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.6;
        }

        .commercial-button,
        .commercial-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 4px;
          background: var(--preto);
          color: var(--bege);
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
          white-space: nowrap;
        }

        .commercial-button {
          min-height: 54px;
          padding: 0 24px;
        }

        .commercial-button:hover,
        .commercial-submit:hover {
          background: #1a1a1a;
          box-shadow: 0 12px 28px rgba(14, 14, 14, 0.16);
          transform: translateY(-2px);
        }

        .commercial-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(14, 14, 14, 0.58);
          padding: 20px;
          backdrop-filter: blur(6px);
        }

        .commercial-modal {
          width: min(100%, 460px);
          border: 1px solid rgba(184, 147, 90, 0.28);
          border-radius: 8px;
          background: var(--branco);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
          padding: 24px;
        }

        .commercial-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .commercial-modal-header span {
          color: var(--dourado);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .commercial-modal-header h3 {
          margin: 4px 0 0;
          color: var(--preto);
          font-family: var(--font-serif);
          font-size: 30px;
          font-weight: 500;
          line-height: 1.1;
        }

        .commercial-modal-header button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--cinza-suave);
          border-radius: 4px;
          background: var(--branco);
          color: var(--cinza-escuro);
        }

        .commercial-honeypot {
          position: absolute;
          left: -10000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .commercial-checkbox {
          margin: 4px 0 20px;
        }

        .commercial-checkbox span {
          color: var(--cinza-escuro);
          font-size: 13px;
          line-height: 1.45;
        }

        .commercial-checkbox a {
          color: var(--preto);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .commercial-lgpd-error {
          margin-top: -12px;
          margin-bottom: 16px;
        }

        .commercial-submit {
          width: 100%;
          min-height: 52px;
          padding: 0 18px;
        }

        .commercial-submit:disabled {
          cursor: progress;
          opacity: 0.72;
          transform: none;
        }

        .commercial-error {
          margin: 12px 0 0;
          color: #b42318;
          font-size: 13px;
          text-align: center;
        }

        .commercial-success {
          display: grid;
          justify-items: center;
          gap: 10px;
          padding: 32px 8px 20px;
          color: var(--cinza-escuro);
          text-align: center;
        }

        .commercial-success svg {
          color: var(--dourado);
        }

        .commercial-success strong {
          color: var(--preto);
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 500;
        }

        .commercial-success p {
          max-width: 320px;
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
        }

        @media (max-width: 720px) {
          .commercial-cta {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .commercial-button {
            width: 100%;
          }

          .commercial-modal {
            padding: 20px;
          }
        }
      `}</style>
    </Section>
  )
}
