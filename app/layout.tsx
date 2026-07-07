import type { Metadata } from 'next'
import './globals.css'
import ClientRoot from './components/ClientRoot'

export const metadata: Metadata = {
  metadataBase: new URL('https://santapapa.es'),
  title: 'Santa Papa',
  description: 'Santa Papa: chips gourmet concebidas como una ceremonia de aperitivo, con estética sacra, sátira celestial y espíritu artesanal.',
  icons: { icon: '/img/cursor-papa.webp' },
  openGraph: {
    title: 'Santa Papa',
    description: 'Santa Papa: chips gourmet concebidas como una ceremonia de aperitivo, con estética sacra, sátira celestial y espíritu artesanal.',
    images: [{ url: '/img/LOGO-09tr.png', width: 1080, height: 1080, alt: 'Santa Papa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santa Papa',
    description: 'Santa Papa: chips gourmet concebidas como una ceremonia de aperitivo, con estética sacra, sátira celestial y espíritu artesanal.',
    images: ['/img/LOGO-09tr.png'],
  },
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
