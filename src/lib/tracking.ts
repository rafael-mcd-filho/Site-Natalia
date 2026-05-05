type TrackingPayload = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (event: 'event', name: string, payload?: TrackingPayload) => void
  }
}

export function trackEvent(name: string, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') return

  const eventPayload = {
    event: name,
    ...payload,
  }

  window.dataLayer?.push(eventPayload)
  window.gtag?.('event', name, payload)
  window.dispatchEvent(new CustomEvent('porto:track', { detail: eventPayload }))
}
