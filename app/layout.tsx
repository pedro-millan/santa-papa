import type { Metadata } from 'next'
import './globals.css'
import ClientRoot from './components/ClientRoot'

export const metadata: Metadata = {
  title: 'Santa Papa',
  description: 'Santa Papa: chips gourmet concebidas como una ceremonia de aperitivo, con estética sacra, sátira celestial y espíritu artesanal.',
  icons: { icon: '/img/cursor-papa.webp' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  )
}
