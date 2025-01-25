import { z } from "zod"

const riesgosSchema = z.object({
  fisicos: z.object({
    ruido: z.boolean().optional(),
    vibracion: z.boolean().optional(),
    temp_frio: z.boolean().optional(),
    temp_calor: z.boolean().optional(),
    rad_ionizantes: z.boolean().optional(),
    rad_no_ionizantes: z.boolean().optional(),
  }),
  quimicos: z.object({
    vapores: z.boolean().optional(),
    fibras: z.boolean().optional(),
    polvos_humos: z.boolean().optional(),
    nieblas: z.boolean().optional(),
  }),
  biologicos: z.object({
    virus: z.boolean().optional(),
    bacterias: z.boolean().optional(),
    hongos: z.boolean().optional(),
  }),
  biomecanicos: z.object({
    posturas: z.boolean().optional(),
    movimientos: z.boolean().optional(),
    cargas: z.boolean().optional(),
  }),
  seguridad: z.object({
    mecanico: z.boolean().optional(),
    electrico: z.boolean().optional(),
    locativo: z.boolean().optional(),
    tecnologico: z.boolean().optional(),
  }),
  fenomenos_naturales: z.object({
    sismo: z.boolean().optional(),
    inundacion: z.boolean().optional(),
    deslizamiento: z.boolean().optional(),
  }),
  publicos: z.object({
    hurto: z.boolean().optional(),
    manifestaciones: z.boolean().optional(),
    terrorismo: z.boolean().optional(),
  }),
  psicosocial: z.object({
    estres: z.boolean().optional(),
    responsabilidad: z.boolean().optional(),
    jornadas: z.boolean().optional(),
    trato: z.boolean().optional(),
    comunicacion: z.boolean().optional(),
    esfuerzo: z.boolean().optional(),
  }),
})

export const riskIdentificationFormSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  identificacion: z.string().min(1, "La identificación es requerida"),
  cargo: z.string().min(1, "El cargo es requerido"),
  proyecto: z.string().min(1, "El proyecto es requerido"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  genero: z.enum(["M", "F"], {
    required_error: "El género es requerido",
    invalid_type_error: "El género debe ser M o F",
  }),
  sugerencias: z.string().min(1, "Las sugerencias son requeridas"),
  riesgos: riesgosSchema,
})

