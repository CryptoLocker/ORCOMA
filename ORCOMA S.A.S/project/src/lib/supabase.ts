import { createClient } from '@supabase/supabase-js'

// ... código existente ...

// Funciones para gestión de formularios
export const getForms = async (videoId: string) => {
  const { data, error } = await supabase
    .from('video_forms')
    .select(`
      form_id,
      forms (
        id,
        title,
        type,
        schema
      )
    `)
    .eq('video_id', videoId)
    .order('order')
  return { data, error }
}

export const submitFormResponse = async (
  userId: string,
  formId: string,
  videoId: string,
  answers: any
) => {
  const { data, error } = await supabase
    .from('form_responses')
    .insert([
      {
        user_id: userId,
        form_id: formId,
        video_id: videoId,
        answers
      }
    ])
  return { data, error }
}

// ... resto del código existente ...