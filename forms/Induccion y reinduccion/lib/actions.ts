"use server"

import { z } from "zod"
import { employeeOnboardingFormSchema } from "@/lib/schema"

// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function employeeOnboardingFormAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  try {
    const data = employeeOnboardingFormSchema.parse(rawFormData)

    // Simula un retraso para imitar una operación de base de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Datos del formulario:", data)

    // Comentado: Código de inserción en la base de datos
    // const { error } = await supabase.from('employee_onboarding').insert(data)
    // if (error) throw error

    return {
      success: true,
      message: "Formulario enviado correctamente. (Simulado)",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.reduce(
          (acc, err) => {
            acc[err.path.join(".")] = err.message
            return acc
          },
          {} as Record<string, string>,
        ),
      }
    }

    return {
      success: false,
      message: "Ha ocurrido un error al procesar el formulario. Por favor, inténtelo de nuevo.",
    }
  }
}


