'use client'
import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useSantaPapa() {
  const pathname = usePathname()

  // Un recarga real (F5) de la pestaña debe olvidar que el hero ya se abrió.
  // Deps vacías: esto solo se monta una vez por carga real del documento,
  // a diferencia del efecto de abajo (depende de pathname y se re-ejecuta
  // en cada navegación SPA, donde performance.navigation sigue marcando
  // 'reload' aunque no lo sea — por eso antes borraba sessionStorage en
  // cada visita a la home y las franjas nunca se quedaban "recordadas").
  useLayoutEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navEntry?.type === 'reload') {
      Object.keys(sessionStorage).forEach(k => { if (k.startsWith('heroOpened:')) sessionStorage.removeItem(k) })
    }
  }, [])

  // Decide ANTES del primer paint si el hero con franjas (home/pecado) nace
  // ya expandido (ya se abrió antes en esta sesión) o con las franjas
  // clicables (primera vez). Va separado del efecto de abajo porque ese
  // depende de la carga async de GSAP, y esperar a que resuelva dejaría
  // ver un parpadeo de las franjas sin abrir en cada vuelta a la home.
  useLayoutEffect(() => {
    const box = document.querySelector<HTMLElement>('[data-split]')
    if (!box) return
    const isHome = Boolean(box.closest('.home-hero-section, .hero-lockable'))
    if (!isHome) return
    if (sessionStorage.getItem('heroOpened:' + location.pathname) === '1') {
      box.classList.add('expanded')
    } else {
      document.body.classList.add('hero-scroll-locked')
      scrollTo(0, 0)
    }
  }, [pathname])

  // pathname en el array de dependencias garantiza que el efecto
  // se desmonta y se vuelve a montar en cada navegación client-side,
  // re-ejecutando toda la lógica de inicialización (GSAP, cursor, carousel...)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine   = matchMedia('(pointer:fine)').matches
    const isMobile = matchMedia('(max-width:980px)').matches

    // Page identity (data-page/--accent/.product-page). Antes vivía en un
    // <Script id="pd"> por página, pero next/script deduplica por id en toda
    // la sesión: solo la primera página visitada llegaba a ejecutarlo, así
    // que al navegar el resto heredaba el data-page (y sus cortes de slice)
    // de la página anterior. Se centraliza aquí porque este efecto sí se
    // re-ejecuta en cada cambio de pathname.
    const pageMeta: Record<string, { page: string; accent: string; product?: boolean }> = {
      '/':          { page: 'santuario', accent: '#c58641' },
      '/pecado':    { page: 'pecado',    accent: '#c58641' },
      '/ceremonia': { page: 'ceremonia', accent: '#c58641' },
      '/genesis':   { page: 'genesis',   accent: '#c58641' },
      '/plegarias': { page: 'plegarias', accent: '#c58641' },
      '/patata':    { page: 'patata',    accent: '#c58641', product: true },
      '/boniato':   { page: 'boniato',   accent: '#932f1a', product: true },
      '/alcachofa': { page: 'alcachofa', accent: '#666632', product: true },
    }
    const meta = pageMeta[pathname]
    if (meta) {
      document.body.dataset.page = meta.page
      document.body.style.setProperty('--accent', meta.accent)
      document.body.classList.toggle('product-page', !!meta.product)
    }

    // Preloader
    const onLoad = () => document.body.classList.add('loaded')
    window.addEventListener('load', onLoad)
    const loadTimer = setTimeout(() => document.body.classList.add('loaded'), 900)

    // Smooth scroll (fine pointer only)
    const smoothCleanups: (() => void)[] = []
    if (fine && !reduce) {
      const maxScroll = () => document.documentElement.scrollHeight - innerHeight
      let target = scrollY, current = scrollY, lastSelf = scrollY
      const onWheel = (e: WheelEvent) => {
        if (document.body.classList.contains('hero-scroll-locked')) return
        target = Math.min(Math.max(0, target + e.deltaY), maxScroll())
        e.preventDefault()
      }
      const onScroll = () => {
        if (Math.abs(scrollY - lastSelf) > 1) { target = scrollY; current = scrollY }
      }
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('scroll', onScroll)
      let skipFrame = false
      let rafId: number
      const tickScroll = () => {
        current += (target - current) * .14
        skipFrame = !skipFrame
        if (Math.abs(target - current) > .4) {
          if (!skipFrame) { lastSelf = current; scrollTo({ top: current, left: 0, behavior: 'instant' }) }
        } else { current = target }
        rafId = requestAnimationFrame(tickScroll)
      }
      rafId = requestAnimationFrame(tickScroll)
      smoothCleanups.push(
        () => window.removeEventListener('wheel', onWheel),
        () => window.removeEventListener('scroll', onScroll),
        () => cancelAnimationFrame(rafId),
      )
    }

    // Nav active state
    const page = document.body.dataset.page
    document.querySelectorAll<HTMLElement>('[data-nav]').forEach(a => {
      a.classList.remove('is-active')
      if (a.dataset.nav === page) a.classList.add('is-active')
    })

    // Fixed-background media sync
    const fixedMediaEls = [...document.querySelectorAll<HTMLElement>('.fixed-media')]
    const syncFixedMedia = () => fixedMediaEls.forEach(el => {
      const rect = el.getBoundingClientRect()
      el.style.backgroundSize = `${rect.width}px auto`
      el.style.backgroundPositionX = `${rect.left}px`
    })
    if (fixedMediaEls.length) { syncFixedMedia(); window.addEventListener('resize', syncFixedMedia) }

    // Mobile nav toggle
    const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle')
    const onNavToggle = () => {
      const open = document.body.classList.toggle('nav-open')
      navToggle?.setAttribute('aria-expanded', String(open))
    }
    navToggle?.addEventListener('click', onNavToggle)

    // Mobile submenu toggle (El Pecado)
    const dropToggle = document.querySelector<HTMLButtonElement>('.nav-drop-toggle')
    const onDropToggle = () => {
      const drop = dropToggle?.closest('.nav-drop')
      const open = drop?.classList.toggle('open')
      dropToggle?.setAttribute('aria-expanded', String(!!open))
    }
    dropToggle?.addEventListener('click', onDropToggle)

    // Cerrar el menú móvil y el dropdown "El Pecado" al clicar fuera
    const mainNav = document.querySelector('.main-nav')
    const onOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (document.body.classList.contains('nav-open') && !mainNav?.contains(target) && !navToggle?.contains(target)) {
        document.body.classList.remove('nav-open')
        navToggle?.setAttribute('aria-expanded', 'false')
      }
      const openDrop = dropToggle?.closest('.nav-drop')
      if (openDrop?.classList.contains('open') && !openDrop.contains(target)) {
        openDrop.classList.remove('open')
        dropToggle?.setAttribute('aria-expanded', 'false')
      }
    }
    document.addEventListener('click', onOutsideClick)

    // ── GSAP: cursor + scroll reveals + split-hero ─────────────────────
    let gsapCleanup: (() => void) | undefined

    Promise.all([
      import('gsap').then(m => m.gsap),
      import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      gsap.registerPlugin(ScrollTrigger)

      // 1. Cursor suavizado con gsap.ticker
      const cursor = document.querySelector<HTMLElement>('#cursor')
      let cursorTick: (() => void) | undefined
      if (cursor && fine) {
        let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty
        const onMouseMove = (e: MouseEvent) => {
          tx = e.clientX; ty = e.clientY
          document.body.style.setProperty('--mx', `${tx}px`)
          document.body.style.setProperty('--my', `${ty}px`)
          document.body.style.setProperty('--bag-x', `${((tx - innerWidth/2)/innerWidth*56).toFixed(2)}px`)
          document.body.style.setProperty('--bag-y', `${((ty - innerHeight/2)/innerHeight*42).toFixed(2)}px`)
          document.body.style.setProperty('--bag-r', `${((tx - innerWidth/2)/innerWidth*5).toFixed(2)}deg`)
        }
        window.addEventListener('mousemove', onMouseMove)
        cursorTick = () => {
          cx += (tx - cx) * .32; cy += (ty - cy) * .32
          cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`
        }
        gsap.ticker.add(cursorTick)
        document.querySelectorAll<HTMLElement>('a,button,input,textarea,select').forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('is-active'))
          el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'))
        })
        document.querySelectorAll<HTMLElement>('[data-cursor="reveal"]').forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('is-eye'))
          el.addEventListener('mouseleave', () => cursor.classList.remove('is-eye'))
        })
        let clickTimer: ReturnType<typeof setTimeout>
        window.addEventListener('pointerdown', () => { clearTimeout(clickTimer); cursor.classList.add('is-clicked') })
        window.addEventListener('pointerup',   () => { clearTimeout(clickTimer); clickTimer = setTimeout(() => cursor.classList.remove('is-clicked'), 180) })
        window.addEventListener('pointercancel', () => cursor.classList.remove('is-clicked'))
      }

      // 2. Scroll reveals con ScrollTrigger
      const triggers: ReturnType<typeof ScrollTrigger.create>[] = []
      if (!reduce) {
        document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
          // Reset estado previo por si venimos de otra página
          gsap.set(el, { opacity: 0, y: 36 })
          el.classList.remove('in-view')
          // ponytail: en móvil, las 3 bolsas de producto solo deben aparecer
          // al llegar a la mitad del viewport (y desaparecer de nuevo al
          // subir), no quedarse reveladas para siempre como el resto
          const isMobileBagCard = isMobile && el.classList.contains('home-bag-card')
          const start = isMobileBagCard ? 'top 50%' : 'top 92%'
          triggers.push(ScrollTrigger.create({
            trigger: el,
            start,
            once: !isMobileBagCard,
            onEnter: () => gsap.to(el, {
              opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
              onComplete: () => {
                el.classList.add('in-view')
                // ponytail: GSAP leaves an inline opacity:1 that outranks the
                // CSS var(--scroll-fade) rule; clear it so scroll-fade can drive opacity again
                if (el.hasAttribute('data-scroll-fade')) gsap.set(el, { clearProps: 'opacity' })
              },
            }),
            ...(isMobileBagCard ? {
              onLeaveBack: () => {
                el.classList.remove('in-view')
                gsap.to(el, { opacity: 0, y: 36, duration: 0.5, ease: 'power2.out' })
              },
            } : {}),
          }))
        })
      } else {
        document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
          el.style.opacity = '1'; el.style.transform = 'none'; el.classList.add('in-view')
        })
      }

      // 3. Split-hero: GSAP anima overlay y scroll-cue tras la unión CSS
      document.querySelectorAll<HTMLElement>('[data-split]').forEach(box => {
        box.setAttribute('role', 'button'); box.setAttribute('tabindex', '0')
        const isHome = Boolean(box.closest('.home-hero-section, .hero-lockable'))
        const heroKey = 'heroOpened:' + location.pathname
        // Estado inicial (expanded vs. franjas + scroll bloqueado) ya lo
        // decide el useLayoutEffect de arriba antes del primer paint.
        const doToggle = () => {
          if (!isHome) { box.classList.toggle('expanded'); return }
          // Una vez abierto, clicar el hero de home/pecado no hace nada:
          // no debe volver a colapsarse ni a mostrar las franjas.
          if (box.classList.contains('is-joining') || box.classList.contains('expanded')) return
          box.classList.add('is-joining')
          setTimeout(() => {
            box.classList.add('expanded'); box.classList.remove('is-joining')
            document.body.classList.remove('hero-scroll-locked')
            sessionStorage.setItem(heroKey, '1')
            const overlay = box.querySelector<HTMLElement>('.hero-overlay')
            if (overlay) gsap.fromTo(overlay, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' })
            const cue = box.querySelector<HTMLElement>('.scroll-cue')
            if (cue) gsap.to(cue, { opacity: 0.7, duration: 0.6, delay: 0.3, ease: 'power1.out' })
          }, reduce ? 0 : 1750)
        }
        box.addEventListener('click', doToggle)
        box.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doToggle() }
        })
      })

      gsapCleanup = () => {
        triggers.forEach(t => t.kill())
        ScrollTrigger.getAll().forEach(t => t.kill())
        if (cursorTick) gsap.ticker.remove(cursorTick)
      }
    })

    // Magnetic CTA
    const magneticItems = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')]
    let magnetRaf: number
    if (magneticItems.length && fine && !reduce) {
      const magnets = magneticItems.map(item => ({ item, x: 0, y: 0, tx: 0, ty: 0, scale: 1, ts: 1 }))
      const onMM = (e: MouseEvent) => {
        magnets.forEach(m => {
          const r = m.item.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width/2), dy = e.clientY - (r.top + r.height/2)
          const rx = Math.max(340, r.width*1.9), ry = Math.max(180, r.height*4.4)
          if (Math.abs(dx) < rx && Math.abs(dy) < ry) {
            const force = Math.max(0, 1 - Math.hypot(dx, dy)/Math.max(rx, ry))
            m.tx = Math.max(-86, Math.min(86, dx*.48*(0.45+force)))
            m.ty = Math.max(-44, Math.min(44, dy*.56*(0.45+force)))
            m.ts = 1 + force*.08; m.item.classList.add('is-magnetized')
          } else { m.tx = 0; m.ty = 0; m.ts = 1; m.item.classList.remove('is-magnetized') }
        })
      }
      window.addEventListener('mousemove', onMM)
      const tick = () => {
        magnets.forEach(m => {
          m.x += (m.tx-m.x)*.24; m.y += (m.ty-m.y)*.24; m.scale += (m.ts-m.scale)*.18
          const rest = Math.abs(m.x)<.05 && Math.abs(m.y)<.05 && Math.abs(m.scale-1)<.001
          m.item.style.transform = rest && !m.item.classList.contains('is-magnetized')
            ? '' : `translate3d(${m.x.toFixed(2)}px,${m.y.toFixed(2)}px,0) scale(${m.scale.toFixed(3)})`
        })
        magnetRaf = requestAnimationFrame(tick)
      }
      magnetRaf = requestAnimationFrame(tick)
    }

    // Fade carousel
    const carouselRafs: number[] = []
    document.querySelectorAll<HTMLElement>('[data-fade-carousel]').forEach(carousel => {
      const slides = [...carousel.querySelectorAll<HTMLElement>('.fade-slide')]
      const total = slides.length
      const dotsWrap = carousel.querySelector('.carousel-dots')
      // Limpiar dots previos si los hay (por re-ejecución del hook)
      if (dotsWrap) dotsWrap.innerHTML = ''
      let pos = Math.max(0, slides.findIndex(s => s.classList.contains('active')))
      let activeIndex = Math.round(pos) % total
      const speed = 1 / (2.3 * 60)
      const dots = slides.map((_, i) => {
        const b = document.createElement('button')
        b.type = 'button'; b.setAttribute('aria-label', `Ir a imagen ${i+1}`)
        b.addEventListener('click', () => { pos = i })
        dotsWrap?.appendChild(b); return b
      })
      const render = () => {
        slides.forEach((s, i) => {
          let raw = (i - pos) % total
          if (raw > total/2) raw -= total
          if (raw < -total/2) raw += total
          s.style.setProperty('--pos', raw.toFixed(3))
          s.style.setProperty('--abspos', Math.min(Math.abs(raw), total/2).toFixed(3))
        })
        const nearest = ((Math.round(pos) % total) + total) % total
        if (nearest !== activeIndex) {
          activeIndex = nearest
          slides.forEach((s, i) => s.classList.toggle('active', i === activeIndex))
          dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex))
        }
      }
      let cRaf: number
      const tick = () => { pos = (pos + speed + total) % total; render(); cRaf = requestAnimationFrame(tick) }
      carousel.querySelector('.prev')?.addEventListener('click', () => { pos = (pos - 1 + total) % total; render() })
      carousel.querySelector('.next')?.addEventListener('click', () => { pos = (pos + 1) % total; render() })
      slides.forEach((s, i) => s.classList.toggle('active', i === activeIndex))
      dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex))
      render()
      if (!reduce) { cRaf = requestAnimationFrame(tick); carouselRafs.push(cRaf) }
    })

    // Bag tilt
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(stage => {
      if (!fine || reduce) return
      stage.addEventListener('mousemove', (e: MouseEvent) => {
        const r = stage.getBoundingClientRect()
        stage.style.setProperty('--tilt-x', ((e.clientX - r.left)/r.width - .5) * 52 + '')
        stage.style.setProperty('--tilt-y', ((e.clientY - r.top)/r.height - .5) * 52 + '')
      })
      stage.addEventListener('mouseleave', () => {
        stage.style.setProperty('--tilt-x', '0'); stage.style.setProperty('--tilt-y', '0')
      })
    })

    // Parallax cards
    let parRaf: number
    const parEls = [...document.querySelectorAll<HTMLElement>('.parallax-card img')]
    if (parEls.length && !reduce) {
      const upd = () => {
        parEls.forEach(img => {
          const r = img.getBoundingClientRect()
          img.style.setProperty('--par', `${(-(r.top + r.height/2 - innerHeight/2)/innerHeight*42).toFixed(1)}px`)
        })
        parRaf = requestAnimationFrame(upd)
      }
      parRaf = requestAnimationFrame(upd)
    }

    // Scroll-fade
    let sfRaf: number
    const sfEls = [...document.querySelectorAll<HTMLElement>('[data-scroll-fade]')]
    if (sfEls.length && !reduce) {
      const upd = () => {
        sfEls.forEach(el => {
          const r = el.getBoundingClientRect(), cy = r.top + r.height/2, mid = innerHeight/2
          el.style.setProperty('--scroll-fade', (cy >= mid ? 1 : Math.max(0, 1 - (mid - cy)/220)).toFixed(3))
        })
        sfRaf = requestAnimationFrame(upd)
      }
      sfRaf = requestAnimationFrame(upd)
    }

    // Fade-with
    let fwRaf: number
    const fwEls = [...document.querySelectorAll<HTMLElement>('[data-fade-with]')]
    if (fwEls.length && !reduce) {
      const pairs = fwEls
        .map(el => ({ el, target: document.querySelector<HTMLElement>(el.dataset.fadeWith!) }))
        .filter(p => p.target)
      const upd = () => {
        pairs.forEach(({ el, target }) => {
          if (!target) return
          const r = target.getBoundingClientRect(), cy = r.top + r.height/2, mid = innerHeight*.8
          el.style.setProperty('--scroll-fade', (cy >= mid ? 1 : Math.max(0, 1 - (mid - cy)/340)).toFixed(3))
        })
        fwRaf = requestAnimationFrame(upd)
      }
      fwRaf = requestAnimationFrame(upd)
    }

    // Contact form
    const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const d = new FormData(form!)
      const status = form!.querySelector<HTMLElement>('.form-status')
      const submitBtn = form!.querySelector<HTMLButtonElement>('button[type="submit"]')
      submitBtn?.setAttribute('disabled', 'true')
      if (status) status.textContent = 'Enviando plegaria…'
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: d.get('nombre'), email: d.get('email'),
            motivo: d.get('motivo'), mensaje: d.get('mensaje'),
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        if (status) status.textContent = 'Plegaria enviada. Te responderemos pronto.'
        form!.reset()
      } catch {
        if (status) status.textContent = 'No se pudo enviar. Inténtalo de nuevo.'
      } finally {
        submitBtn?.removeAttribute('disabled')
      }
    }
    form?.addEventListener('submit', onSubmit)

    // Cleanup: se ejecuta antes de cada re-run (cambio de ruta) y al desmontar
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(loadTimer)
      smoothCleanups.forEach(fn => fn())
      gsapCleanup?.()
      navToggle?.removeEventListener('click', onNavToggle)
      dropToggle?.removeEventListener('click', onDropToggle)
      document.removeEventListener('click', onOutsideClick)
      if (fixedMediaEls.length) window.removeEventListener('resize', syncFixedMedia)
      if (magnetRaf!) cancelAnimationFrame(magnetRaf)
      carouselRafs.forEach(r => cancelAnimationFrame(r))
      if (parRaf!) cancelAnimationFrame(parRaf)
      if (sfRaf!)  cancelAnimationFrame(sfRaf)
      if (fwRaf!)  cancelAnimationFrame(fwRaf)
      form?.removeEventListener('submit', onSubmit)
      // Limpiar clases de estado del body entre páginas
      document.body.classList.remove('hero-scroll-locked', 'nav-open', 'loaded')
      dropToggle?.closest('.nav-drop')?.classList.remove('open')
      dropToggle?.setAttribute('aria-expanded', 'false')
    }
  }, [pathname]) // ← re-ejecuta en cada cambio de ruta
}
