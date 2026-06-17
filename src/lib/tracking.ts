type TrackingPayload = Record<string, string | number | boolean | null | undefined>

export type LeadTrackingPayload = {
  type: 'empresa' | 'candidato' | 'interesse'
  lead_type: 'empresa' | 'candidato' | 'interesse'
  form_id: string
  form_id2: string
  form_name: string
  form_location: string
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(name: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return

  const eventPayload = {
    event: name,
    ...payload,
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(eventPayload)
  window.dispatchEvent(new CustomEvent('porto:track', { detail: eventPayload }))
}

export function trackLeadSubmitAttempt(payload: LeadTrackingPayload) {
  trackEvent('lead_submit_attempt', payload)
}

export function trackLeadSubmitError(
  payload: LeadTrackingPayload,
  errorType: 'validation' | 'request',
  metadata: TrackingPayload = {},
) {
  trackEvent('lead_submit_error', {
    ...payload,
    error_type: errorType,
    ...metadata,
  })
}

export function trackLeadSubmitSuccess(payload: LeadTrackingPayload, metadata: TrackingPayload = {}) {
  const eventPayload = {
    ...payload,
    ...metadata,
  }

  // Keep the existing event for compatibility and publish a GTM-friendly form conversion event.
  trackEvent('lead_submit_success', eventPayload)
  trackEvent('lead_form_submit', eventPayload)
}
