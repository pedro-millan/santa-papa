import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Boniato · Pimentón & Lime · Santa Papa' }
export default function BoniatoPage() {
  return (
  <main id="top">
    <section className="grand-hero product-top">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <img className="full-relic" src="/img/Boniato 2.webp" alt="Chips de boniato flotando" />
        <div className="hero-overlay"></div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
      <h1>La eucaristía vermeja.</h1>
    </section>
    <section className="moving-bag section-pad">
      <img className="halo-bg" src="/img/halo.webp" alt="" />
      <div className="bag-copy reveal"><h2 className="section-title">Boniato · Pimentón & Lime</h2><p>Rojiza, dulce y peligrosa. Una pieza pensada para estar en la mano, en la mesa y en la foto.</p></div>
      <div className="bag-stage reveal" data-tilt=""><img src="/img/product-boniato.webp" alt="Bolsa Boniato" /><img className="bag-design" src="/img/chips-boniato-flight.webp" alt="Diseño de bolsa Boniato" /></div>
    </section>
    <section className="manifest section-pad reveal">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <h2>Confía al sabor tus más crujientes confesiones.</h2><Link className="btn primary" href="/plegarias">Confesionario</Link>
    </section>
  </main>)
}
