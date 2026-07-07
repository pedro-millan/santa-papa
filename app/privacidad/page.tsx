import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Política de Privacidad · Santa Papa' }

export default function PrivacidadPage() {
  return (
  <main id="top">
    <section className="grand-hero privacidad-hero">
      <img className="vine vine-left" src="/img/flowers-left.webp" alt="" />
      <img className="vine vine-right" src="/img/flowers-right.webp" alt="" />
      <div className="hero-shell split-reveal expanded reveal">
        <div className="hero-overlay">
          <span className="eyebrow">El Santuario</span>
          <h1>Política de Privacidad</h1>
          <p>Qué datos tratamos y, sobre todo, cuáles no llegamos ni a pedir.</p>
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="legal-copy reveal">
        <h2>Responsable del tratamiento</h2>
        <p>[COMPLETAR: nombre o razón social, NIF/CIF y dirección postal del titular del dominio santapapa.es]. Puedes contactar por email en andreajiribiki@gmail.com para cualquier cuestión relativa a esta política.</p>

        <h2>Tablón de los fieles</h2>
        <p>El tablón de comentarios de la sección Confesionario no requiere registro ni inicio de sesión. No solicitamos ni almacenamos email, teléfono, dirección IP ni ningún otro dato que permita identificarte de forma verificada.</p>
        <p>El único campo obligatorio junto al mensaje es un nombre, que puedes escribir libremente como prefieras (incluido un pseudónimo): es el texto que tú decides mostrar, no un dato verificado ni vinculado a tu identidad real. Recomendamos no incluir en el mensaje datos personales que no quieras hacer públicos, ya que los comentarios son visibles para cualquier visitante de la web.</p>
        <p>Los comentarios se almacenan en una base de datos gestionada por Supabase (proveedor de infraestructura) con el único fin de mostrarlos públicamente en esta página.</p>

        <h2>Formulario de contacto (Confesionario)</h2>
        <p>Al enviar el formulario de contacto tratamos el nombre, email, motivo y mensaje que introduces, con la única finalidad de responder a tu consulta. Estos datos se envían por email a través de Resend (proveedor de envío de correo) y no se publican ni se almacenan en ninguna base de datos pública.</p>

        <h2>Cookies y analítica</h2>
        <p>Esta web no utiliza cookies de seguimiento ni herramientas de analítica o publicidad de terceros.</p>

        <h2>Tus derechos</h2>
        <p>Puedes ejercer tus derechos de acceso, rectificación o supresión sobre cualquier dato que hayas compartido (por ejemplo, pedir la eliminación de un comentario del tablón) escribiendo a andreajiribiki@gmail.com.</p>
      </div>
    </section>
  </main>)
}
