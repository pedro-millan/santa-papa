'use client'
import { useState } from 'react'
import type { Comment } from '../lib/comments'

export default function CommentBoard({ initialComments }: { initialComments: Comment[] }) {
  const [comments, setComments] = useState(initialComments)
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !mensaje.trim()) return
    setSending(true)
    setStatus('')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, mensaje }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setComments(prev => [data.comment, ...prev])
      setNombre('')
      setMensaje('')
      setStatus('Comentario publicado.')
    } catch {
      setStatus('No se pudo publicar. Inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="comment-board">
      <h3 className="comment-board-title">El tablón de los fieles</h3>
      <form className="comment-form" onSubmit={onSubmit}>
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" maxLength={60} required />
        <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Deja tu plegaria a la vista de todos..." maxLength={500} rows={3} required />
        <button className="btn ghost" type="submit" disabled={sending}>{sending ? 'Publicando…' : 'Publicar'}</button>
        {status && <p className="form-status" aria-live="polite">{status}</p>}
      </form>
      <ul className="comment-list">
        {comments.length === 0 && <li className="comment-empty">Sé el primero en dejar tu plegaria.</li>}
        {comments.map((c, i) => (
          <li className="comment-item" key={i}>
            <strong>{c.nombre}</strong>
            <time dateTime={c.fecha}>{new Date(c.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
            <p>{c.mensaje}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
