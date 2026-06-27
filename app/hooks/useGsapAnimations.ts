'use client'

/**
 * useGsapAnimations
 * Handles the three critical GSAP animations:
 *   1. Cursor — smooth lag follow
 *   2. Split-hero reveal — slices join on click → full image
 *   3. Scroll reveals — .reveal elements fade+slide in via ScrollTrigger
 *
 * Everything else (carousel, magnetic, parallax, tilt, scroll-fade) stays in
 * useSantaPapa.ts as lightweight rAF loops — they don't benefit from GSAP.
 */

import { useEffect } from 'react'

export function useGsapAnimations() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      const fine   = matchMedia('(pointer:fine)').matches

      // ── 1. Custom cursor ─────────────────────────────────────────────────
      const cursorEl = document.querySelector<HTMLElement>('#cursor')
      let cursorCtx: gsap.Context | undefined

      if (cursorEl && fine) {
        let mx = innerWidth / 2
        let my = innerHeight / 2

        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
        window.addEventListener('mousemove', onMove)

        // gsap.quickTo gives butter-smooth lag without rAF boilerplate
        const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.45, ease: 'power3.out' })
        const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.45, ease: 'power3.out' })

        // ticker drives the cursor so it always chases the latest mx/my
        const tick = () => { xTo(mx); yTo(my) }
        gsap.ticker.add(tick)

        // Interactive states
        const addActive    = () => cursorEl.classList.add('is-active')
        const removeActive = () => cursorEl.classList.remove('is-active')
        const addEye       = () => cursorEl.classList.add('is-eye')
        const removeEye    = () => cursorEl.classList.remove('is-eye')

        document.querySelectorAll<HTMLElement>('a,button,input,textarea,select')
          .forEach(el => { el.addEventListener('mouseenter', addActive); el.addEventListener('mouseleave', removeActive) })
        document.querySelectorAll<HTMLElement>('[data-cursor="reveal"]')
          .forEach(el => { el.addEventListener('mouseenter', addEye); el.addEventListener('mouseleave', removeEye) })

        let clickTimer: ReturnType<typeof setTimeout>
        const onDown   = () => { clearTimeout(clickTimer); cursorEl.classList.add('is-clicked') }
        const onUp     = () => { clearTimeout(clickTimer); clickTimer = setTimeout(() => cursorEl.classList.remove('is-clicked'), 180) }
        const onCancel = () => cursorEl.classList.remove('is-clicked')
        window.addEventListener('pointerdown',   onDown)
        window.addEventListener('pointerup',     onUp)
        window.addEventListener('pointercancel', onCancel)

        cursorCtx = gsap.context(() => {}) // scope placeholder
        const _cursorCleanup = () => {
          gsap.ticker.remove(tick)
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('pointerdown',   onDown)
          window.removeEventListener('pointerup',     onUp)
          window.removeEventListener('pointercancel', onCancel)
        }
        // attach to outer cleanup via closure
        ;(cursorCtx as unknown as { _sp: () => void })._sp = _cursorCleanup
      }

      // ── 2. Split-hero reveal ──────────────────────────────────────────────
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
      if (navEntry?.type === 'reload') {
        Object.keys(sessionStorage).filter(k => k.startsWith('heroOpened:')).forEach(k => sessionStorage.removeItem(k))
      }

      document.querySelectorAll<HTMLElement>('[data-split]').forEach(box => {
        box.setAttribute('role', 'button')
        box.setAttribute('tabindex', '0')

        const isHome   = Boolean(box.closest('.home-hero-section, .hero-lockable'))
        const heroKey  = 'heroOpened:' + location.pathname
        const slices   = [...box.querySelectorAll<HTMLElement>('.slice')]
        const overlay  = box.querySelector<HTMLElement>('.hero-overlay')
        const scrollCue = box.querySelector<HTMLElement>('.scroll-cue')
        const sigil    = box.querySelector<HTMLElement>('.open-sigil')
        const fullRelic = box.querySelector<HTMLElement>('.full-relic')

        let joining = false

        // Already opened this session → skip to expanded state instantly
        if (isHome && sessionStorage.getItem(heroKey) === '1') {
          box.classList.add('expanded')
          gsap.set(slices, { opacity: 0 })
          gsap.set(overlay, { opacity: 1 })
          gsap.set(scrollCue, { opacity: 0.7 })
        } else if (isHome) {
          document.body.classList.add('hero-scroll-locked')
          scrollTo(0, 0)
        }

        const open = () => {
          if (joining) return

          if (!isHome) {
            box.classList.toggle('expanded')
            return
          }

          if (box.classList.contains('expanded')) {
            // Close
            box.classList.remove('expanded', 'is-joining')
            document.body.classList.add('hero-scroll-locked')
            gsap.to(slices, { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04 })
            gsap.to(overlay, { opacity: 0, duration: 0.4 })
            gsap.to(scrollCue, { opacity: 0, duration: 0.3 })
            scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            return
          }

          // Open sequence
          joining = true
          box.classList.add('is-joining')
          if (sigil) gsap.to(sigil, { opacity: 0, y: 18, scale: 0.88, duration: 0.4 })

          // 1. Slices close their gaps (CSS handles gap/padding transitions via .is-joining)
          // 2. After CSS transition settles, GSAP crossfades to full-relic + overlay
          const tl = gsap.timeline({
            delay: reduce ? 0 : 0.2,
            onComplete: () => {
              box.classList.add('expanded')
              box.classList.remove('is-joining')
              document.body.classList.remove('hero-scroll-locked')
              sessionStorage.setItem(heroKey, '1')
              joining = false
            },
          })

          tl.to(slices, {
            opacity: 0,
            duration: reduce ? 0 : 0.55,
            ease: 'power2.in',
            stagger: { amount: reduce ? 0 : 0.3, from: 'center' },
            delay: reduce ? 0 : 1.3, // wait for CSS gap transition
          })
          .to(overlay, { opacity: 1, duration: reduce ? 0 : 0.6, ease: 'power2.out' }, '-=0.1')
          .to(scrollCue, { opacity: 0.7, duration: 0.4 }, '-=0.3')
          if (fullRelic && !box.closest('.home-hero-section')) {
            tl.to(fullRelic, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, '<')
          }
        }

        box.addEventListener('click', open)
        box.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() }
        })
      })

      // ── 3. Scroll reveals via ScrollTrigger ───────────────────────────────
      if (!reduce) {
        // Set initial hidden state on all .reveal elements (GSAP owns this now)
        const reveals = document.querySelectorAll<HTMLElement>('.reveal')
        gsap.set(reveals, { opacity: 0, y: 36 })

        ScrollTrigger.batch('.reveal', {
          start: 'top 92%',
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
            })
          },
          once: true,
        })
      } else {
        // Reduced motion: just show everything
        document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }

      cleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
        gsap.ticker.remove(() => {}) // noop, real ticker removal done above
        ;(cursorCtx as unknown as { _sp?: () => void })?._sp?.()
      }
    })()

    return () => cleanup?.()
  }, [])
}
