/**
 * ProductBag — the moving bag section on individual product pages.
 * Tailwind handles layout/spacing; CSS custom prop --tilt-x/y drives 3D transform.
 */
interface ProductBagProps {
  title: string
  description: string
  bagSrc: string
  bagAlt: string
  designSrc: string
  designAlt: string
}

export default function ProductBag({ title, description, bagSrc, bagAlt, designSrc, designAlt }: ProductBagProps) {
  return (
    <section className="grid grid-cols-[.9fr_1.1fr] gap-[clamp(30px,7vw,110px)]
      items-center overflow-hidden px-[var(--pad)] py-[clamp(72px,11vw,158px)] relative">
      <img className="halo-bg w-[min(54vw,720px)] opacity-[.08]" src="/img/halo.webp" alt="" />

      {/* Copy */}
      <div className="reveal">
        <h2 className="font-display font-normal text-title leading-[.88] tracking-[-0.035em]
          text-sp-gold/[.82] max-w-[1220px] mb-[54px]">
          {title}
        </h2>
        <p className="text-[20px] leading-[1.55] text-sp-gold/[.58] max-w-copy-sm">
          {description}
        </p>
      </div>

      {/* Bag stage with 3D tilt */}
      <div className="reveal relative grid place-items-center perspective-[900px]
        h-[80vh] min-h-[600px]
        before:content-[''] before:absolute before:inset-[8%_12%]
        before:bg-[url('/img/halo.webp')] before:bg-contain before:bg-no-repeat before:bg-center
        before:opacity-[.12] before:drop-shadow-[0_0_70px_rgba(197,134,65,.35)]"
        data-tilt="">
        <img className="bag-stage-img relative z-[2] w-[min(54vw,520px)] h-[82%] object-contain
          drop-shadow-[0_42px_58px_rgba(0,0,0,.55)]"
          src={bagSrc} alt={bagAlt} />
        <img className="bag-design absolute right-0 bottom-0 w-[min(38vw,360px)]
          opacity-[.16] mix-blend-screen grayscale-[.3]"
          src={designSrc} alt={designAlt} />
      </div>
    </section>
  )
}
