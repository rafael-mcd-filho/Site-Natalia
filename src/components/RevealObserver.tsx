'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const revealNow = (el: HTMLElement) => {
      el.classList.add('is-visible')
    }

    const allHidden = () => document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')

    if (!('IntersectionObserver' in window)) {
      allHidden().forEach(revealNow)
      return
    }

    const observed = new WeakSet<HTMLElement>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealNow(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    const observeHidden = () => {
      allHidden().forEach(el => {
        if (!observed.has(el)) {
          observed.add(el)
          observer.observe(el)
        }
      })
    }

    observeHidden()

    const rafId = window.requestAnimationFrame(observeHidden)
    const delayedId = window.setTimeout(observeHidden, 300)
    const mutationObserver = new MutationObserver(observeHidden)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('load', observeHidden)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(delayedId)
      window.removeEventListener('load', observeHidden)
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
