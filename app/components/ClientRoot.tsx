'use client'
import { useSantaPapa } from '../hooks/useSantaPapa'
import Header from './Header'
import Footer from './Footer'

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  useSantaPapa()
  return (
    <>
      <div id="preloader" aria-hidden="true">
        <div className="loader-mark">
          <img src="/img/logo-gold-black.webp" alt="Santa Papa" />
          <span>Preparando el altar</span>
        </div>
      </div>
      <div className="cursor" id="cursor" aria-hidden="true">
        <span className="cursor-potato" />
        <span className="cursor-eye" />
      </div>
      <Header />
      {children}
      <Footer />
    </>
  )
}
