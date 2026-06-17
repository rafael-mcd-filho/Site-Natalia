'use client'

import { ArrowRight, Check, Send, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  trackEvent,
  trackLeadSubmitAttempt,
  trackLeadSubmitError,
  trackLeadSubmitSuccess,
  type LeadTrackingPayload,
} from '@/lib/tracking'
import { getLeadTracking } from '@/lib/lead-tracking'
import { Container, Section } from './ui/SectionPrimitives'
import styles from './SectionCTAComercial.module.css'

const serviceName = 'Gestão e Desenvolvimento de Equipes Comerciais'
const whatsappNumber = '558387523450'
const initialForm = { nome: '', email: '', website: '', lgpd: false }

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
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const firstInputRef = useRef<HTMLInputElement>(null)

  const resetModal = useCallback(() => {
    setOpen(false)
    setForm(initialForm)
    setStatus('idle')
    setErrorMessage('')
    setFieldErrors({})
  }, [])

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm(previous => ({ ...previous, [key]: value }))
  }

  const openModal = () => {
    trackEvent('cta_click', { location: 'gestao_comercial', target: 'interesse' })
    setOpen(true)
  }

  const closeModal = useCallback(() => {
    if (status === 'loading') return
    resetModal()
  }, [resetModal, status])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 80)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || status === 'loading') return
      resetModal()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, resetModal, status])

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

      trackLeadSubmitSuccess(trackingPayload)

      const message = encodeURIComponent(`Olá! Tenho interesse em ${serviceName}.`)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
      const opened = window.open(whatsappUrl, '_blank')
      if (opened) opened.opener = null
      resetModal()
      if (!opened) window.location.href = whatsappUrl
    } catch (error) {
      trackLeadSubmitError(trackingPayload, 'request')
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <Section id="gestao-comercial" bg="white" className={styles.section}>
      <Container>
        <div className={`${styles.card} reveal`}>
          <p className={styles.eyebrow}>
            <Sparkles size={15} aria-hidden="true" />
            Para times de vendas
          </p>
          <h2 className={styles.title}>{serviceName}</h2>
          <p className={styles.copy}>
            Desenvolvimento estratégico para estruturar, acompanhar e fortalecer equipes comerciais.
          </p>

          <button className={styles.ctaButton} type="button" onClick={openModal}>
            <span>Quero conversar</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </Container>

      {open && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={closeModal}>
          <div
            aria-labelledby="commercial-modal-title"
            aria-modal="true"
            className={styles.modal}
            role="dialog"
            onMouseDown={event => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <div>
                <span>Contato</span>
                <h3 id="commercial-modal-title">Gestão comercial</h3>
              </div>
              <button aria-label="Fechar" type="button" onClick={closeModal}>
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <form id={trackingPayload.form_id} data-lead-type={trackingPayload.lead_type} onSubmit={handleSubmit}>
              <div className={styles.honeypot} aria-hidden="true">
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

              <label className={`checkbox-custom ${styles.checkbox}`}>
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
              {fieldErrors.lgpd && <span className={`field-error ${styles.lgpdError}`}>{fieldErrors.lgpd}</span>}

              <button className={styles.submitButton} type="submit" disabled={status === 'loading'} aria-busy={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className="button-spinner" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Enviar
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className={styles.error}>{errorMessage || 'Erro ao enviar. Tente novamente.'}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </Section>
  )
}
