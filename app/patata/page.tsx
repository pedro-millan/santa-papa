import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Patata · Flor de Sal · Santa Papa' }
export default function PatataPage() {
  return (
  <main id="top">
    <section className="grand-hero product-top">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <img className="full-relic" src="/img/Patatas 4.webp" alt="Chips de patata flotando" />
        <div className="hero-overlay"></div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
      <h1>El origen dorado.</h1>
    </section>
    <section className="moving-bag section-pad">
      <img className="halo-bg" src="/img/halo.webp" alt="" />
      <div className="bag-copy reveal"><h2 className="section-title">Patata · Flor de Sal & Aove</h2><p>Dorada, directa y limpia. Pulcritud pensada para deleitar tu paladar y tus sentidos.</p></div>
      <div className="bag-stage reveal" data-tilt=""><img src="/img/product-patata.webp" alt="Bolsa Patata · Flor de Sal" /><img className="bag-design" src="/img/papas.webp" alt="Diseño de bolsa" /></div>
    </section>
    <section className="manifest section-pad reveal">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <h2>Confía al sabor tus más crujientes confesiones.</h2><Link className="btn primary" href="/plegarias">Confesionario</Link>
    </section>
  </main>)
}
