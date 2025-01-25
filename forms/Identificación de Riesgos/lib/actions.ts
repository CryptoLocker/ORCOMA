"use server"

import { z } from "zod"
import { riskIdentificationFormSchema } from "@/lib/schema"
import type { FormData } from "@/lib/types"

// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function riskIdentificationFormAction(_prevState: unknown, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  try {
    const data = riskIdentificationFormSchema.parse(rawFormData)

    // Simula un retraso para imitar una operación de base de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Datos del formulario:", data)

    return {
      defaultValues: {
        nombre: "",
        identificacion: "",
        cargo: "",
        proyecto: "",
        ciudad: "",
        genero: "",
        sugerencias: "",
        riesgos: {},
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues: rawFormData,
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    return {
      defaultValues: rawFormData,
      success: false,
      errors: {
        form: "Ha ocurrido un error al procesar el formulario. Por favor, inténtelo de nuevo.",
      },
    }
  }
}

// function compareAnswers(userAnswers: Record<string, any>, correctAnswers: Record<string, any>): boolean {
//   for (const category in correctAnswers) {
//     for (const risk in correctAnswers[category]) {
//       if (correctAnswers[category][risk] !== !!userAnswers[category]?.[risk]) {
//         return false
//       }
//     }
//   }
//   return true
// }

