import { Resend } from 'resend'

const TO_EMAIL = 'andreajiribiki@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Santa Papa <onboarding@resend.dev>'

export async function POST(request: Request) {
  const data = await request.json().catch(() => null)
  const nombre = (data?.nombre || '').toString().trim()
  const email = (data?.email || '').toString().trim()
  const motivo = (data?.motivo || '').toString().trim()
  const mensaje = (data?.mensaje || '').toString().trim()

  if (!nombre || !email || !motivo || !mensaje) {
    return Response.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Email no válido.' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'El servicio de email no está configurado.' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Plegaria Santa Papa · ${motivo}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`,
  })

  if (error) {
    return Response.json({ error: 'No se pudo enviar el mensaje.' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
