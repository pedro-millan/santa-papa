import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Alcachofa · Limón & Pimienta · Santa Papa' }
export default function AlcachofaPage() {
  return (
  <main id="top">
    <section className="grand-hero product-top alcachofa-hero">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <img className="full-relic" src="/img/Alcachofa 2.webp" alt="Chips de alcachofa flotando" />
        <div className="hero-overlay"></div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
      <h1 className="reveal">El jardín de las delicias.</h1>
    </section>
    <section className="moving-bag section-pad">
      <img className="halo-bg" src="/img/halo.webp" alt="" />
      <div className="bag-copy reveal"><h2 className="section-title">Alcachofa · Limón & Pimienta</h2><p>Alcachofa fina, fresca y mediterránea: vegetal elevado, limón despierto y pimienta como pequeña herejía.</p></div>
      <div className="bag-stage reveal" data-tilt=""><img src="/img/product-alcachofa.webp" alt="Bolsa Alcachofa" /><img className="bag-design" src="/img/chips-alcachofa-flight.webp" alt="Diseño de bolsa Alcachofa" /></div>
    </section>
    <section className="manifest section-pad reveal">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <h2>Confía al sabor tus más crujientes confesiones.</h2><Link className="btn primary" href="/plegarias">Confesionario</Link>
    </section>
  </main>)
}
