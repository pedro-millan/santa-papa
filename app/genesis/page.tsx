import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Génesis · Santa Papa' }
export default function GenesisPage() {
  return (
  <main id="top">
    <section className="grand-hero genesis-hero">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <img className="full-relic" src="/img/patata-story-02.webp" alt="Bodegón exterior Santa Papa" />
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
    </section>
    <section className="section-pad genesis-intro" style={{textAlign:'center'}}>
      <span className="eyebrow">Génesis</span>
      <h1>Venimos del hambre de hacer algo distinto.</h1>
      <h2>Hacemos chips gourmet dirigidos hacia una despensa menos genérica:</h2>
      <h3>Snacks de aperitivo cuya presencia no depende de la exaltación de colores vívidos y formas llamativas.</h3>
      <br />
      <h3>Nos destaca la discreción, la elegancia.</h3>
      <h3>Nos destaca la vanalidad sutil que llama tu atención sin armar escándalo.</h3>
    </section>
    <section className="image-liturgy section-pad genesis-liturgy">
      <article className="parallax-card"><div className="fixed-media cartel-cocina-media" style={{backgroundImage:"url('/img/cartel-cocina.webp')"}} /><div><span>&quot;Pensat i fet&quot;</span><h3>Del imaginario a la cocina</h3><p>Santa Papa nace de una idea diferenciadora que rompe definitivamente con el concepto imperante de packaging sobreestimulante. Todo partió de ahí.</p></div></article>
    </section>
    <section className="image-liturgy section-pad genesis-liturgy">
      <article className="parallax-card reverse"><div className="fixed-media cartel-cocina-media" style={{backgroundImage:"url('/img/mano-variedades-2.webp')"}} /><div><span>&quot;La concepción&quot;</span><h3>Tres epifanías del snack</h3><p>Con unos cimientos claros, y la vista clavada en un horizonte innovador, se gestaron 3 variedades de producto partiendo de propuestas naturales, sanas y sabrosas: la patata, el boniato y la alcachofa.</p></div></article>
    </section>
    <section className="image-liturgy section-pad genesis-liturgy">
      <article className="parallax-card"><div className="fixed-media cartel-cocina-media altar-media" style={{backgroundImage:"url('/img/bodegon-patata-altar.webp')"}} /><div><span>&quot;El resultado&quot;</span><h3>Venerado azabache</h3><p>El culmen fue Santa Papa: marca en la que convergen una sátira pulcritud y un producto premium para dar a luz un nuevo prisma desde el que ver el aperitivo.</p></div></article>
    </section>
  </main>)
}
