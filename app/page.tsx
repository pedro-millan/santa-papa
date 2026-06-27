import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Santuario · Santa Papa' }

export default function SantuarioPage() {
  return (
      <main id="top">

        <section className="grand-hero home-hero-section">
          <img className="vine vine-left" src="/img/flowers-left.webp" alt="" />
          <img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
          <div className="hero-shell split-reveal reveal" data-split="" data-cursor="reveal">
            <div className="slice-stage" aria-hidden="true">
              {Array.from({length:9},(_,i)=>(
                <div className="slice" key={i} style={{'--i':i,'--total':9} as React.CSSProperties}>
                  <img src="/img/products-trio-flying.webp" alt="" />
                </div>
              ))}
            </div>
            <img className="full-relic" src="/img/products-trio-flying.webp" alt="Tres productos Santa Papa flotando" />
            <div className="hero-overlay">
              <h1>Bendito sea el crujido.</h1>
              <div className="section-kicker reveal">El Pecado</div>
            </div>
            <div className="open-sigil" aria-hidden="true">
              <img src="/img/halo.webp" alt="" /><span>sé testigo</span>
            </div>
            <div className="scroll-cue" aria-hidden="true"><span /></div>
          </div>
        </section>

        <section className="product-altars section-pad altar-sanctum home-temptations">
          <div className="home-temptations-bg" data-fade-with=".home-bag-grid" style={{backgroundImage:"url('/img/tres.webp')"}} aria-hidden="true" />
          <img className="section-vine section-vine-left" src="/img/flowers-left.webp" alt="" />
          <img className="section-vine section-vine-right" src="/img/flowers-right.webp" alt="" />
          <img className="halo-bg" src="/img/halo.webp" alt="" />
          <h2 className="section-title in-view" data-scroll-fade="">Tres tentaciones, una misma ceremonia.</h2>
          <div className="home-bag-grid">
            <Link className="home-bag-card reveal" data-scroll-fade="" href="/patata" style={{'--tone':'#c58641','--amp':'.72'} as React.CSSProperties}>
              <span className="number">I</span>
              <span className="home-bag-visual"><img className="cursor-follow-bag" src="/img/product-patata.webp" alt="Bolsa Santa Papa Flor de Sal" /></span>
            </Link>
            <Link className="home-bag-card reveal" data-scroll-fade="" href="/boniato" style={{'--tone':'#932f1a','--amp':'1'} as React.CSSProperties}>
              <span className="number">II</span>
              <span className="home-bag-visual"><img className="cursor-follow-bag" src="/img/product-boniato.webp" alt="Bolsa Santa Papa Pimentón & Lime" /></span>
            </Link>
            <Link className="home-bag-card reveal" data-scroll-fade="" href="/alcachofa" style={{'--tone':'#666632','--amp':'.84'} as React.CSSProperties}>
              <span className="number">III</span>
              <span className="home-bag-visual"><img className="cursor-follow-bag" src="/img/product-alcachofa.webp" alt="Bolsa Santa Papa Limón & Pimienta" /></span>
            </Link>
          </div>
          <div className="cta-stage reveal">
            <Link className="magnetic-cta" href="/pecado" data-magnetic="">Conoce las tentaciones</Link>
            <img className="cta-halo" src="/img/halo.webp" alt="" aria-hidden="true" />
          </div>
        </section>

        <section className="procession-fade section-pad home-procession">
          <img className="section-vine section-vine-left" src="/img/flowers-left.webp" alt="" />
          <img className="section-vine section-vine-right" src="/img/flowers-right.webp" alt="" />
          <div className="fade-carousel tail-carousel reveal" data-fade-carousel="">
            {[
              {src:'/img/bolsa-posavasos.webp',   alt:'Bolsa Santa Papa junto a posavasos y una copa',          title:'Sobremesa bendita'},
              {src:'/img/patata-story-05.webp',   alt:'Manos sosteniendo la bolsa de patata Santa Papa',        title:'Manos que sostienen el pecado'},
              {src:'/img/mano-variedades-2.webp', alt:'Mano sosteniendo una bolsa junto a las tres variedades Santa Papa', title:'Tres variedades, un mismo altar'},
              {src:'/img/boniato-story-01.webp',  alt:'Manos sosteniendo la bolsa de boniato Santa Papa',       title:'El reparto sagrado'},
              {src:'/img/silla-santa-papa.webp',  alt:'Silla con cartel Santa Papa',                            title:'Un trono para el crujido'},
              {src:'/img/alcachofa-3.webp',       alt:'Manos sosteniendo la bolsa de alcachofa Santa Papa',     title:'El jardín entre los dedos'},
              {src:'/img/cajas-envio-nuevo.webp', alt:'Cajas de envío Santa Papa apiladas',                    title:'Reliquias listas para viajar'},
              {src:'/img/cartel-cocina.webp',     alt:'Cartel Santa Papa en una cocina profesional',            title:'La cocina como santuario'},
            ].map((s,i)=>(
              <div className={`fade-slide${i===0?' active':''}`} key={i}>
                <span className="slide-frame"><img src={s.src} alt={s.alt} /></span>
                <span className="slide-title">{s.title}</span>
              </div>
            ))}
            <div className="carousel-dots" aria-hidden="true" />
          </div>
        </section>

        <section className="home-rustic-window" aria-label="Ventana rústica Santa Papa" />
      </main>
  )
}
