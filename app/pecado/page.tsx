import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'El Pecado · Santa Papa' }
export default function PecadoPage() {
  return (
    <main id="top">
      <section className="grand-hero pecado-hero">
        <img className="vine vine-left" src="/img/flowers-left.webp" alt="" />
        <img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
        <div className="hero-shell split-reveal expanded reveal">
          <img className="full-relic" src="/img/products-trio-still.webp" alt="Tríptico de productos Santa Papa" />
          <div className="hero-overlay" />
          <div className="scroll-cue" aria-hidden="true"><span /></div>
        </div>
      </section>
      <section className="product-altars section-pad altar-sanctum">
        <img className="halo-bg" src="/img/halo.webp" alt="" />
        <h1 className="section-title reveal">Tres tentaciones, una misma ceremonia.</h1>
        <div className="altar-grid">
          <Link className="altar-card reveal" href="/patata" style={{'--tone':'#c58641'} as React.CSSProperties}>
            <span className="number">1</span><img src="/img/Patatas 3.webp" alt="Chips de patata" /><h3>Flor de Sal & Aove</h3><p>La papa dorada. Clásica, solemne, bendecida por la sal.</p>
          </Link>
          <Link className="altar-card reveal" href="/boniato" style={{'--tone':'#932f1a'} as React.CSSProperties}>
            <span className="number">2</span><img src="/img/Boniato 4.webp" alt="Chips de boniato" /><h3>Pimentón & Lima</h3><p>Dulzor tostado, golpe ahumado y una chispa cítrica.</p>
          </Link>
          <Link className="altar-card reveal" href="/alcachofa" style={{'--tone':'#666632'} as React.CSSProperties}>
            <span className="number">3</span><img src="/img/Alcachofa 1.webp" alt="Chips de alcachofa" /><h3>Limón & Pimienta</h3><p>Vegetal, fresco y mediterráneo: el jardín también cruje.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
