"use server"

import { z } from "zod"
import { inductionReinductionFormSchema } from "@/lib/schema"
import type { FormData } from "@/lib/types"

// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function inductionReinductionFormAction(_prevState: unknown, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  try {
    const data = inductionReinductionFormSchema.parse(rawFormData)

    // Simula un retraso para imitar una operación de base de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Datos del formulario:", data)

    // Uncomment the following lines to integrate with Supabase
    // const { error } = await supabase.from('induction_reinduction_forms').insert({
    //   ...data,
    //   feedback: {
    //     responseId: data.responseId,
    //     message: data.feedback
    //   }
    // })
    // if (error) throw error

    return {
      defaultValues: {
        name: "",
        empresa: "",
        fecha: "",
        cargo: "",
        tipo: "",
        topics: Array(34).fill(""),
        riskLevel: "",
        responseId: "",
        feedback: "",
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

