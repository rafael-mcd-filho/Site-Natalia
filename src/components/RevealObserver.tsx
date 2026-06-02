'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const revealNow = (el: HTMLElement) => {
      el.classList.remove('is-waiting')
      el.classList.add('is-visible')
    }

    const allHidden = () => document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')

    const isInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth

      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= viewportHeight * 0.92 &&
        rect.left <= viewportWidth
      )
    }

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
        if (isInViewport(el)) {
          revealNow(el)
          observer.unobserve(el)
          return
        }

        el.classList.add('is-waiting')

        if (!observed.has(el)) {
          observed.add(el)
          observer.observe(el)
        }
      })
    }

    observeHidden()

    const rafId = window.requestAnimationFrame(observeHidden)
    const scrollRestoreId = window.setTimeout(observeHidden, 120)
    const delayedId = window.setTimeout(observeHidden, 300)
    const lateRestoreId = window.setTimeout(observeHidden, 900)
    const mutationObserver = 'MutationObserver' in window ? new MutationObserver(observeHidden) : null
    mutationObserver?.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('load', observeHidden)
    window.addEventListener('pageshow', observeHidden)
    window.addEventListener('scroll', observeHidden, { passive: true })
    window.addEventListener('resize', observeHidden)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(scrollRestoreId)
      window.clearTimeout(delayedId)
      window.clearTimeout(lateRestoreId)
      window.removeEventListener('load', observeHidden)
      window.removeEventListener('pageshow', observeHidden)
      window.removeEventListener('scroll', observeHidden)
      window.removeEventListener('resize', observeHidden)
      mutationObserver?.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
