import Link from 'next/link'

interface ManifestCTAProps {
  headline: string
  ctaLabel?: string
  ctaHref?: string
}

export default function ManifestCTA({ headline, ctaLabel = 'Confesionario', ctaHref = '/plegarias' }: ManifestCTAProps) {
  return (
    <section className="reveal relative min-h-[74vh] grid place-content-center justify-items-center
      text-center overflow-hidden px-[var(--pad)] py-[clamp(72px,11vw,158px)]">

      {/* Vine overlays */}
      <img className="absolute left-0 top-[8%] h-[84%] max-h-[960px] opacity-[.13] pointer-events-none"
        src="/img/flowers-left.webp"  alt="" />
      <img className="absolute right-0 top-[8%] h-[84%] max-h-[960px] opacity-[.13] pointer-events-none"
        src="/img/flowers-right.webp" alt="" />

      <h2 className="font-display font-normal text-sp-gold/[.82]
        text-[clamp(48px,8vw,132px)] leading-[.88] tracking-[-0.035em]
        max-w-[1280px] mx-auto my-[18px_42px]">
        {headline}
      </h2>

      <Link href={ctaHref}
        className="btn-primary inline-flex items-center justify-center
          border border-sp-gold/[.82] min-h-[50px] px-6
          uppercase tracking-[.1em] text-xs font-body
          bg-sp-gold text-sp-ink
          transition-transform duration-[450ms] hover:-translate-y-1">
        {ctaLabel}
      </Link>
    </section>
  )
}
