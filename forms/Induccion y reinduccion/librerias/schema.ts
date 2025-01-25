import { z } from "zod"

const topicSchema = z.enum(["si", "no"], {
  required_error: "Debe seleccionar una opción",
  invalid_type_error: "La opción debe ser 'si' o 'no'",
})

export const inductionReinductionFormSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  empresa: z.string().min(1, "La empresa es requerida"),
  fecha: z.string().min(1, "La fecha es requerida"),
  cargo: z.string().min(1, "El cargo es requerido"),
  tipo: z.enum(["induccion", "reinduccion"], {
    required_error: "El tipo es requerido",
    invalid_type_error: "El tipo debe ser inducción o reinducción",
  }),
  topics: z.array(topicSchema).length(34, "Todos los temas deben ser respondidos"),
  riskLevel: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "El nivel de riesgo es requerido",
    invalid_type_error: "El nivel de riesgo debe ser un número del 1 al 5",
  }),
  responseId: z.string().min(1, "El ID de respuesta es requerido"),
  feedback: z.string().min(1, "El feedback del trabajador es requerido"),
})

