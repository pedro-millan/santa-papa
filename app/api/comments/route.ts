import { getComments, addComment } from '../../lib/comments'

export async function GET() {
  const comments = await getComments()
  return Response.json({ comments })
}

export async function POST(request: Request) {
  const data = await request.json().catch(() => null)
  const nombre = (data?.nombre || '').toString().trim().slice(0, 60)
  const mensaje = (data?.mensaje || '').toString().trim().slice(0, 500)
  if (!nombre || !mensaje) {
    return Response.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  try {
    const comment = await addComment(nombre, mensaje)
    return Response.json({ comment })
  } catch {
    return Response.json({ error: 'El tablón no está configurado.' }, { status: 500 })
  }
}
