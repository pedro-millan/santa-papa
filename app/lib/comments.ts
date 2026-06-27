import { createClient } from '@supabase/supabase-js'

const MAX_COMMENTS = 500

export type Comment = { nombre: string; mensaje: string; fecha: string }

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function getComments(): Promise<Comment[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('comments')
    .select('nombre,mensaje,fecha')
    .order('fecha', { ascending: false })
    .limit(MAX_COMMENTS)
  if (error) return []
  return data
}

export async function addComment(nombre: string, mensaje: string): Promise<Comment> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('El tablón no está configurado.')
  const { data, error } = await supabase
    .from('comments')
    .insert({ nombre, mensaje })
    .select('nombre,mensaje,fecha')
    .single()
  if (error || !data) throw new Error('No se pudo publicar el comentario.')
  return data
}
