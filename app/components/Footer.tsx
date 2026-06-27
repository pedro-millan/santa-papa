import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer" data-cursor="reveal">
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
    </footer>
  )
}
