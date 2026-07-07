import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" data-cursor="reveal">
      <div className="footer-top">
        <div>
          <img src="/img/logo-white-black.webp" alt="Santa Papa" className="footer-logo" />
        </div>
        <nav>
          <Link href="/">Santuario</Link>
          <Link href="/pecado">El Pecado</Link>
          <Link href="/ceremonia">La Ceremonia</Link>
          <Link href="/genesis">Génesis</Link>
          <Link href="/plegarias">Confesionario</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>Santa Papa. Todos los derechos reservados. {year}.</p>
        <Link href="/privacidad">Política de Privacidad</Link>
      </div>
    </footer>
  )
}
