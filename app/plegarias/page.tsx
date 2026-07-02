import type { Metadata } from 'next'
import CommentBoard from '../components/CommentBoard'
import { getComments } from '../lib/comments'
export const metadata: Metadata = { title: 'Plegarias · Santa Papa' }
export default async function PlegariasPage() {
  const comments = await getComments()
  return (
  <main id="top">
    <section className="grand-hero plegarias-hero">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" /><img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <div className="hero-overlay">
          <br />
          <h1>Habla con el santuario.</h1>
          <p>Salmos, opiniones, ruegos, juramentos... o simples confesiones de aperitivo: deja tu mensaje y escucharemos tu plegaria.</p>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </div>
    </section>
    <section className="contact-section section-pad">
      <img className="section-vine section-vine-left" src="/img/flowers-left.webp" alt="" />
      <CommentBoard initialComments={comments} />
      <div className="contact-copy reveal"><h2 className="section-title">Habla ahora, pecador.</h2></div>
      <form className="contact-form reveal" data-contact-form="">
        <label>Nombre<input name="nombre" required placeholder="Tu nombre" /></label>
        <label>Email<input name="email" type="email" required placeholder="tu@email.com" /></label>
        <label>Motivo<select name="motivo"><option>Pedido ceremonial</option><option>Hostelería</option><option>Colaboración</option><option>Otra plegaria</option></select></label>
        <label>Mensaje<textarea name="mensaje" required rows={7} placeholder="Confiesa aquí tu deseo gourmet..." /></label>
        <button className="btn primary" type="submit">Enviar confesión</button>
        <p className="form-status" aria-live="polite" />
      </form>
    </section>
  </main>)
}
