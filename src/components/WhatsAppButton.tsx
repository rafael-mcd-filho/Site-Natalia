'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/tracking'

const whatsappNumber = '558387523450'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [showBalloon, setShowBalloon] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const checkVisibility = () => {
      const formSections = ['contato', 'candidatos']
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[]
      const isFormVisible = formSections.some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15
      })

      setVisible(window.scrollY > 600 && !isFormVisible)
    }

    checkVisibility()
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility)

    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
    }
  }, [])

  useEffect(() => {
    if (!visible) return

    const timer = setTimeout(() => {
      if (!dismissed) setShowBalloon(true)
    }, 15000)
    return () => clearTimeout(timer)
  }, [dismissed, visible])

  const msg = encodeURIComponent(
    'Olá! Vim pelo site da Porto Talent e gostaria de saber mais sobre o serviço de recrutamento.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${msg}`

  if (!visible) return null

  return (
    <div
      style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000, display: 'flex', alignItems: 'flex-end', gap: 12 }}
    >
      {showBalloon && !dismissed && (
        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            color: 'var(--cinza-escuro)',
            maxWidth: 200,
            position: 'relative',
            animation: 'fadeInRight 0.4s var(--ease-out)',
          }}
        >
          <button
            onClick={() => { setShowBalloon(false); setDismissed(true) }}
            style={{
              position: 'absolute', top: 6, right: 8,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 16, color: 'var(--cinza-medio)', lineHeight: 1,
            }}
            aria-label="Fechar"
          >
            <X size={14} aria-hidden="true" />
          </button>
          <p style={{ marginRight: 12, fontWeight: 500 }}>Fale com a Porto Talent</p>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Porto Talent"
        onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: '#25D366', color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 32px rgba(37,211,102,0.28)',
          textDecoration: 'none',
          animation: 'pulse-whatsapp 2.5s infinite',
          flexShrink: 0,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @keyframes pulse-whatsapp {
          0%, 100% { box-shadow: 0 12px 32px rgba(37,211,102,0.28); }
          50% { box-shadow: 0 12px 32px rgba(37,211,102,0.28), 0 0 0 8px rgba(37,211,102,0.16); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
