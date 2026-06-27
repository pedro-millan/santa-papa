/** Centered overlay rendered inside HeroShell — headline + eyebrow */
interface HeroOverlayProps {
  eyebrow?: string
  headline?: string
  body?: string
  children?: React.ReactNode
}

export default function HeroOverlay({ eyebrow, headline, body, children }: HeroOverlayProps) {
  return (
    <div className="hero-overlay absolute inset-0 z-[5] grid place-items-center text-center
      px-[clamp(20px,7vw,120px)]
      bg-gradient-to-b from-black/[.18] to-black/[.44]
      opacity-0 pointer-events-none
      transition-opacity duration-[460ms] delay-[80ms]">
      {eyebrow && (
        <span className="eyebrow inline-flex gap-[10px] items-center justify-center
          uppercase tracking-[.24em] text-sp-gold text-eyebrow mb-[26px]
          before:content-['✦'] before:text-[13px]">
          {eyebrow}
        </span>
      )}
      {headline && (
        <h1 className="font-display font-normal text-sp-gold/[.82]
          text-hero leading-[.78] tracking-[-0.045em]
          max-w-hero mx-auto mb-7 drop-shadow-[0_10px_50px_rgba(0,0,0,.65)]">
          {headline}
        </h1>
      )}
      {body && (
        <p className="font-body text-[clamp(17px,1.6vw,25px)] leading-[1.5] text-sp-gold/[.68]
          max-w-copy mx-auto mt-[clamp(28px,6vw,64px)] drop-shadow-[0_6px_26px_rgba(0,0,0,.8)]">
          {body}
        </p>
      )}
      {children}
    </div>
  )
}
