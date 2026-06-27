'use client'

interface SliceProps {
  image: string
  alt?: string
  total?: number
}

interface GrandHeroProps {
  /** Imagen del full-relic (fondo expandido) */
  relicSrc: string
  relicAlt?: string
  /** Contenido del overlay (h1, eyebrow, etc.) */
  overlay?: React.ReactNode
  /** Si tiene el split interactivo (data-split) */
  interactive?: boolean
  /** Texto del sigil en el home */
  sigilText?: string
  /** Clases extra para la section */
  className?: string
}

/** Bloque hero de 100svh con slices animadas.
 *  Encapsula la lógica de render; el JS de interacción sigue en useSantaPapa. */
export default function GrandHero({
  relicSrc, relicAlt = '',
  overlay, interactive = false,
  sigilText,
  className = '',
}: GrandHeroProps) {
  const SLICES = 9

  return (
    <section
      className={`grand-hero relative overflow-hidden min-h-svh ${className}`}
    >
      {/* Vines decorativas */}
      <img className="vine vine-left absolute" src="/img/flowers-left.webp"  alt="" />
      <img className="vine vine-right absolute" src="/img/flowers-right.webp" alt="" />

      {/* Hero shell */}
      <div
        className={[
          'hero-shell',
          'relative mx-auto overflow-hidden',
          'w-[min(98.8vw,2040px)] h-svh min-h-[680px]',
          'shadow-[0_42px_120px_rgba(0,0,0,.54)]',
          interactive ? 'split-reveal reveal' : 'split-reveal expanded reveal',
        ].join(' ')}
        {...(interactive ? { 'data-split': '', 'data-cursor': 'reveal' } : {})}
      >
        {/* Barras (solo si es interactivo) */}
        {interactive && (
          <div
            className="slice-stage absolute inset-0 grid z-[2]
                       grid-cols-[repeat(9,1fr)]
                       gap-[clamp(28px,4vw,76px)]
                       p-[clamp(8px,1.2vw,18px)_clamp(6px,1vw,16px)]
                       transition-all"
            aria-hidden="true"
          >
            {Array.from({ length: SLICES }, (_, i) => (
              <div
                key={i}
                className="slice overflow-hidden bg-[#020202]"
                style={{ '--i': i, '--total': SLICES } as React.CSSProperties}
              >
                <img src={relicSrc} alt="" />
              </div>
            ))}
          </div>
        )}

        {/* Full relic */}
        <img
          className="full-relic absolute inset-0 w-full h-full object-cover
                     opacity-0 scale-[1.08]
                     transition-[opacity_.78s_var(--ease),transform_1.1s_var(--slow)]
                     z-[1]"
          src={relicSrc}
          alt={relicAlt}
        />

        {/* Overlay */}
        {overlay && (
          <div
            className="hero-overlay absolute inset-0 z-[5]
                       grid place-items-center text-center
                       px-[clamp(20px,7vw,120px)]
                       bg-[linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.44))]
                       opacity-0 pointer-events-none"
          >
            {overlay}
          </div>
        )}

        {/* Sigil (solo home) */}
        {sigilText && (
          <div
            className="open-sigil absolute left-1/2 bottom-0 z-[8]
                       -translate-x-1/2 grid place-items-center gap-2
                       uppercase tracking-[.22em] text-[11px] text-[#c58641]
                       transition-opacity"
            aria-hidden="true"
          >
            <img src="/img/halo.webp" alt=""
                 className="w-[92px] drop-shadow-[0_0_18px_rgba(197,134,65,.55)]
                            [animation:slowSpin_15s_linear_infinite]" />
            <span>{sigilText}</span>
          </div>
        )}

        {/* Scroll cue */}
        <div
          className="scroll-cue absolute left-1/2 bottom-[34px] z-[7]
                     -translate-x-1/2 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <span className="block w-px h-[42px]
                           bg-gradient-to-b from-transparent to-[#c58641] relative" />
        </div>
      </div>
    </section>
  )
}
