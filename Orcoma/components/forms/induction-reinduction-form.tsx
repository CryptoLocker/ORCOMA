"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { inductionReinductionFormAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "induction-reinduction",
  title: "GESTIÓN DE CALIDAD Y SST",
  description: "TEMAS DE LA INDUCCIÓN Y REINDUCCIÓN",
  code: "GCSST-REG-058",
  version: "1",
  date: "08/08/2023",
}

const inductionTopics = [
  "Presentación de la empresa.",
  "Reseña histórica de la empresa",
  "Misión y visión de la Organización",
  "Aspectos Generales SG-SST",
  "Que es el SG-SST",
  "Desarrollo del SG-SST",
  "Aspectos Legales del Sistema de gestión de Seguridad y Salud en el Trabajo",
  "Política de Seguridad y Salud en el Trabajo (Se hace entrega en Físico)",
  "Objetivos y metas de la políticas de la seguridad y salud en el trabajo",
  "Política de prevención del Abuso de Alcohol, Drogas No uso de Sustancias Psicoactivas y Espacios libres de Humo de Tabaco (se hace entrega en físico)",
  "Procedimiento, mecanismos y medios para presentar quejas por la vulneración del derecho a nombre propio o anónimo, tramite de la queja y debido cuidado con la participación directa de los miembros del comité de convivencia",
  "Reglamento de higiene y seguridad industrial normativa resolución 2400 del año 1989",
  "Nivel de riesgo al que está expuesto el trabajador en su lugar de trabajo o ejerciendo sus funciones",
  "Clasificación de los riesgos: Riesgo Biomecánica, mecánico, publico, físico, químico, psicosocial, biológico, condiciones de seguridad",
  "Elementos de protección personal y sus principales objetivos",
  "Instrucciones para el uso y mantenimiento de EPP",
  "Funcionamiento del comité paritario de seguridad y salud en el trabajo",
  "Principales funciones del COPASST",
  "Comité de convivencia laboral",
  "Principales funciones del comité de convivencia laboral",
]

const initialState = {
  defaultValues: {
    tipo: "",
    topics: Array(inductionTopics.length).fill(""),
    riskLevel: "",
    feedback: "",
  },
  success: false,
  errors: null,
}

export function InductionReinductionForm() {
  const [state, formAction, pending] = React.useActionState(inductionReinductionFormAction, initialState)

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Formulario enviado correctamente", "Los datos de inducción han sido registrados exitosamente")
    }
  }, [state.success])

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        <div className="group/field grid gap-2" data-invalid={!!state.errors?.tipo}>
          <Label className="group-data-[invalid=true]/field:text-destructive">TIPO:</Label>
          <RadioGroup name="tipo" defaultValue={state.defaultValues.tipo} className="flex space-x-4" disabled={pending}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="induccion" id="tipo-induccion" />
              <Label htmlFor="tipo-induccion">INDUCCIÓN</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reinduccion" id="tipo-reinduccion" />
              <Label htmlFor="tipo-reinduccion">REINDUCCIÓN</Label>
            </div>
          </RadioGroup>
          {state.errors?.tipo && <p className="text-destructive text-sm">{state.errors.tipo}</p>}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>TEMAS DE LA INDUCCIÓN Y REINDUCCIÓN</TableHead>
              <TableHead>SI</TableHead>
              <TableHead>NO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inductionTopics.map((topic, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{topic}</TableCell>
                <TableCell colSpan={2}>
                  <RadioGroup
                    name={`topics.${index}`}
                    defaultValue={state.defaultValues.topics[index]}
                    className="flex justify-center space-x-4"
                    disabled={pending}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id={`topic-${index}-si`} />
                      <Label htmlFor={`topic-${index}-si`}>Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`topic-${index}-no`} />
                      <Label htmlFor={`topic-${index}-no`}>No</Label>
                    </div>
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="group/field grid gap-2" data-invalid={!!state.errors?.riskLevel}>
          <Label htmlFor="riskLevel" className="group-data-[invalid=true]/field:text-destructive">
            Nivel de riesgo:
          </Label>
          <Select name="riskLevel" defaultValue={state.defaultValues.riskLevel} disabled={pending}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un nivel" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  Nivel {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.errors?.riskLevel && <p className="text-destructive text-sm">{state.errors.riskLevel}</p>}
        </div>

        <FormField
          id="feedback"
          name="feedback"
          label="FEEDBACK DEL TRABAJADOR:"
          defaultValue={state.defaultValues.feedback}
          disabled={pending}
          error={state.errors?.feedback}
          multiline
          rows={4}
          required
        />

        <p className="font-bold text-sm">
          NOTA: Por motivos de ley es obligatorio que usted tenga la información clara y veraz de cada tema antes dicho.
          Se compromete usted como trabajador, a cumplir cada uno de estos ítems. Su feedback es importante para mejorar
          nuestros procesos de inducción y reinducción.
        </p>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Enviando..." : "Enviar Formulario"}
        </Button>
      </form>
    </FormWrapper>
  )
}
