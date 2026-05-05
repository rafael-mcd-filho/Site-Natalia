export function getLeadTracking() {
  if (typeof window === 'undefined') {
    return {}
  }

  const params = new URLSearchParams(window.location.search)

  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    landing_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || '',
  }
}
