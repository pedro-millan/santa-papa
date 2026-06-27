import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'La Ceremonia · Santa Papa' }
export default function CeremoniaPage() {
  return (
  <main id="top">
    <section className="grand-hero">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="cenefa izquierda" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="cenefa derecha" />
      <div className="hero-shell split-reveal expanded reveal">
        <img className="full-relic" src="/img/bodegon-exterior.webp" alt="Bodegón de mesa Santa Papa" />
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
    </section>
    <section className="section-pad ceremony-intro" style={{textAlign:'center'}}>
      <span className="eyebrow">La Ceremonia</span>
      <h1>Abrir una bolsa también puede ser un rito.</h1>
      <p>Por eso os presentamos nuestro Manual del Crujido:</p>
    </section>
    <div className="step-grid" style={{padding:'0 var(--pad)'}}>
      <article className="reveal"><img src="/img/BODEGON MESA.webp" alt="mesa con patatas y copa" /><span>01</span><h3>Consagrar la mesa</h3><p>Una tabla, una copa fría, luz baja y esa compañía celestial.</p></article>
      <article className="reveal"><img src="/img/bodegon-boniato-altar.webp" alt="mano sosteniendo bolsa de patatas" /><span>02</span><h3>Abrir el pecado</h3><p>Casi blasfemia, pero irresistiblemente tentador comenzar una bolsa.</p></article>
      <article className="reveal"><img className="img-short" src="/img/silla-santa-papa.webp" alt="silla apoyada en cartel" /><span>03</span><h3>Tomar asiento</h3><p>Comodidad y posición correcta siempre acrecentan el deleite.</p></article>
      <article className="reveal"><img src="/img/Alcachofa 3.webp" alt="manos sobre bolsa de patatas" /><span>04</span><h3>Compartir sin prisa</h3><p>Santa Papa sabe mejor cuando la mesa deja de mirar el reloj.</p></article>
    </div>
    <section className="craft section-pad fixed-craft">
      <div className="fixed-media" style={{backgroundImage:"url('/img/Patatas 1.webp')"}} />
      <div className="craft-copy reveal"><span className="section-kicker">Cómo lo hacemos</span><h2 className="section-title">Crujido fino, estética oscura y sabor reconocible.</h2><p>Imaginamos cada variedad como una pieza de diseño: materia prima, sabor, color, bolsa, fotografía y ceremonia deben pertenecer al mismo universo.</p></div>
    </section>
  </main>)
}
