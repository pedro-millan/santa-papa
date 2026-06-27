import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header" id="siteHeader">
      <Link className="brand" href="/" aria-label="Santa Papa - Santuario">
        <img src="/img/logo-gold-black.webp" alt="Santa Papa" />
      </Link>
      <button className="nav-toggle" aria-label="Abrir navegación" aria-expanded="false">
        <span /><span />
      </button>
      <nav className="main-nav" aria-label="Navegación principal">
        <Link href="/" data-nav="santuario">Santuario</Link>
        <div className="nav-drop" data-dropdown="">
          <Link href="/pecado" data-nav="pecado">El Pecado</Link>
          <div className="drop-panel">
            <Link href="/patata"><small>I</small> Patata · Flor de Sal</Link>
            <Link href="/boniato"><small>II</small> Boniato · Pimentón & Lime</Link>
            <Link href="/alcachofa"><small>III</small> Alcachofa · Limón & Pimienta</Link>
          </div>
        </div>
        <Link href="/ceremonia" data-nav="ceremonia">La Ceremonia</Link>
        <Link href="/genesis" data-nav="genesis">Génesis</Link>
        <Link href="/plegarias" data-nav="plegarias">Confesionario</Link>
      </nav>
    </header>
  )
}
