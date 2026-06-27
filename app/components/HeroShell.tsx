/**
 * HeroShell — the split-image hero used on every page.
 * Handles both the home/lockable variant (with slices + data-split)
 * and the product pages (pre-expanded, no slices).
 */

interface SliceConfig {
  src: string
  count?: number
}

interface HeroShellProps {
  /** Image shown after slices join (or immediately on product pages) */
  fullRelic?: string
  fullRelicAlt?: string
  /** If provided → renders slices + enables split-reveal interaction */
  slices?: SliceConfig
  /** CSS class variants on the outer section */
  sectionClass?: string
  /** Extra classes on .hero-shell */
  shellClass?: string
  /** Starts expanded (no click required) */
  preExpanded?: boolean
  /** Marks this as home / lockable (enables scroll-gate) */
  isHome?: boolean
  children?: React.ReactNode
}

export default function HeroShell({
  fullRelic, fullRelicAlt = '', slices, sectionClass = '', shellClass = '',
  preExpanded = false, isHome = false, children,
}: HeroShellProps) {
  const hasSlices = Boolean(slices)
  const lockable  = isHome ? 'hero-lockable' : ''

  return (
    <section className={`grand-hero relative overflow-hidden ${isHome ? 'home-hero-section' : ''} ${lockable} ${sectionClass}`}>
      {/* Decorative vine overlays */}
      <img className="hero-vine hero-vine-l absolute opacity-31 pointer-events-none" src="/img/flowers-left.webp"  alt="" aria-hidden="true" />
      <img className="hero-vine hero-vine-r absolute opacity-31 pointer-events-none" src="/img/flowers-right.webp" alt="" aria-hidden="true" />

      {/* Shell */}
      <div
        className={`hero-shell split-reveal reveal relative isolate
          w-[min(98.8vw,2040px)] min-h-[680px] h-screen-sv overflow-hidden
          ${preExpanded ? 'expanded' : ''}
          ${shellClass}`}
        {...(hasSlices ? { 'data-split': '', 'data-cursor': 'reveal' } : {})}
      >
        {/* Slices (home / pecado) */}
        {slices && (
          <div className="slice-stage absolute inset-0 z-[2] grid
            grid-cols-[repeat(9,1fr)]
            gap-[clamp(28px,4vw,76px)] p-[clamp(8px,1.2vw,18px)_clamp(6px,1vw,16px)]"
            aria-hidden="true">
            {Array.from({ length: slices.count ?? 9 }, (_, i) => (
              <div className="slice overflow-hidden bg-[#020202]
                shadow-[0_0_0_1px_rgba(197,134,65,.05),0_22px_80px_rgba(0,0,0,.5)]"
                key={i}
                style={{ '--i': i, '--total': slices.count ?? 9 } as React.CSSProperties}>
                <img src={slices.src} alt=""
                  className="h-full object-cover filter saturate-[1.05] contrast-[1.08] opacity-[.98]"
                  style={{ width: '900%', maxWidth: 'none', transform: `translateX(calc(${i} * -11.111%))` }} />
              </div>
            ))}
          </div>
        )}

        {/* Full image (revealed after join) */}
        {fullRelic && (
          <img className="full-relic absolute inset-0 w-full h-full object-cover z-[1]
            opacity-0 scale-[1.08] transition-[opacity_.78s,transform_1.1s]"
            src={fullRelic} alt={fullRelicAlt} />
        )}

        {/* Slot: overlay content, open-sigil, scroll-cue */}
        {children}

        {/* Open sigil (only when slices are present = interactive hero) */}
        {hasSlices && (
          <div className="open-sigil absolute left-1/2 bottom-0 z-[8]
            -translate-x-1/2 grid place-items-center gap-2
            uppercase tracking-[.22em] text-[11px] text-sp-gold
            transition-opacity duration-[450ms]">
            <img src="/img/halo.webp" alt="" className="open-sigil-img w-[92px] drop-shadow-[0_0_18px_rgba(197,134,65,.55)]" />
            <span>sé testigo</span>
          </div>
        )}

        {/* Scroll cue */}
        <div className="scroll-cue absolute left-1/2 bottom-[34px] z-[7]
          -translate-x-1/2 opacity-0 pointer-events-none transition-opacity duration-[600ms]"
          aria-hidden="true">
          <span className="scroll-cue-line block w-px h-[42px] bg-gradient-to-b from-transparent to-sp-gold relative" />
        </div>
      </div>
    </section>
  )
}
