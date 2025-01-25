"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { inductionReinductionFormAction } from "@/lib/actions"
import { FormData } from "@/lib/types"
import { Check } from "lucide-react"

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
  "Plan de emergencia y clases de emergencias",
  "Qué hacer en caso de una emergencia",
  "Conceptos básicos: ARL, EPS, AFP, enfermedad laboral, peligro, riesgo, incidente, accidente de trabajo, acto inseguro, condiciones inseguras, condiciones de salud desfavorable",
  "Auto reporte de condiciones de trabajo y salud",
  "Responsabilidades del trabajador frente al SG-SST",
  "Normas de seguridad generales en SST",
  "Protocolo de levantamiento manual de cargas",
  "Uso adecuado de herramientas manuales",
  "Clasificación de los riesgos: Riesgo Biomecánico, mecánico, público, físico, químico, psicosocial, biológico, condiciones de seguridad",
  "Elementos de protección personal y sus principales objetivos",
  "Instrucciones para el uso y mantenimiento de EPP",
  "Funcionamiento del comité paritario de seguridad y salud en el trabajo",
  "Principales funciones del COPASST",
  "Comité de convivencia laboral",
]

const initialState = {
  defaultValues: {
    name: "",
    empresa: "",
    fecha: "",
    cargo: "",
    tipo: "",
    topics: Array(inductionTopics.length).fill(""),
    riskLevel: "",
    responseId: "",
    feedback: "",
  },
  success: false,
  errors: null,
}

export function InductionReinductionForm() {
  const [state, formAction, pending] = React.useActionState(inductionReinductionFormAction, initialState)

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center border-b border-orange-500 pb-4">
          <CardTitle className="text-2xl text-orange-500">GESTIÓN DE CALIDAD Y SST</CardTitle>
          <p>TEMAS DE LA INDUCCIÓN Y REINDUCCIÓN</p>
          <p>CÓDIGO: GCSST-REG-058 | VERSIÓN: 1 | FECHA: 08/08/2023</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state.success ? (
              <p className="text-green-600 flex items-center gap-2 text-sm">
                <Check className="size-4" />
                Formulario enviado correctamente.
              </p>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.name}>
                <Label htmlFor="name" className="group-data-[invalid=true]/field:text-destructive">
                  NOMBRES Y APELLIDOS:
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={state.defaultValues.name}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.name}
                  aria-errormessage="error-name"
                />
                {state.errors?.name && (
                  <p id="error-name" className="text-destructive text-sm">
                    {state.errors.name}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.empresa}>
                <Label htmlFor="empresa" className="group-data-[invalid=true]/field:text-destructive">
                  EMPRESA:
                </Label>
                <Input
                  id="empresa"
                  name="empresa"
                  defaultValue={state.defaultValues.empresa}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.empresa}
                  aria-errormessage="error-empresa"
                />
                {state.errors?.empresa && (
                  <p id="error-empresa" className="text-destructive text-sm">
                    {state.errors.empresa}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.fecha}>
                <Label htmlFor="fecha" className="group-data-[invalid=true]/field:text-destructive">
                  FECHA:
                </Label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  defaultValue={state.defaultValues.fecha}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.fecha}
                  aria-errormessage="error-fecha"
                />
                {state.errors?.fecha && (
                  <p id="error-fecha" className="text-destructive text-sm">
                    {state.errors.fecha}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.cargo}>
                <Label htmlFor="cargo" className="group-data-[invalid=true]/field:text-destructive">
                  CARGO:
                </Label>
                <Input
                  id="cargo"
                  name="cargo"
                  defaultValue={state.defaultValues.cargo}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
                  aria-invalid={!!state.errors?.cargo}
                  aria-errormessage="error-cargo"
                />
                {state.errors?.cargo && (
                  <p id="error-cargo" className="text-destructive text-sm">
                    {state.errors.cargo}
                  </p>
                )}
              </div>
            </div>

            <div className="group/field grid gap-2" data-invalid={!!state.errors?.tipo}>
              <Label className="group-data-[invalid=true]/field:text-destructive">TIPO:</Label>
              <RadioGroup
                name="tipo"
                defaultValue={state.defaultValues.tipo}
                className="flex space-x-4"
                disabled={pending}
              >
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
                  <SelectItem value="1">Nivel 1</SelectItem>
                  <SelectItem value="2">Nivel 2</SelectItem>
                  <SelectItem value="3">Nivel 3</SelectItem>
                  <SelectItem value="4">Nivel 4</SelectItem>
                  <SelectItem value="5">Nivel 5</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.riskLevel && <p className="text-destructive text-sm">{state.errors.riskLevel}</p>}
            </div>

            <div className="group/field grid gap-2" data-invalid={!!state.errors?.responseId}>
              <Label htmlFor="responseId" className="group-data-[invalid=true]/field:text-destructive">
                ID de Respuesta:
              </Label>
              <Input
                id="responseId"
                name="responseId"
                defaultValue={state.defaultValues.responseId}
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!state.errors?.responseId}
                aria-errormessage="error-responseId"
              />
              {state.errors?.responseId && (
                <p id="error-responseId" className="text-destructive text-sm">
                  {state.errors.responseId}
                </p>
              )}
            </div>

            <div className="group/field grid gap-2" data-invalid={!!state.errors?.feedback}>
              <Label htmlFor="feedback" className="group-data-[invalid=true]/field:text-destructive">
                FEEDBACK DEL TRABAJADOR:
              </Label>
              <Textarea
                id="feedback"
                name="feedback"
                defaultValue={state.defaultValues.feedback}
                rows={4}
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!state.errors?.feedback}
                aria-errormessage="error-feedback"
                required
              />
              {state.errors?.feedback && (
                <p id="error-feedback" className="text-destructive text-sm">
                  {state.errors.feedback}
                </p>
              )}
            </div>

            <p className="font-bold">
              NOTA: Por motivos de ley es obligatorio que usted tenga la información clara y veraz de cada tema antes
              dicho. Se compromete usted como trabajador, a cumplir cada uno de estos ítems. Su feedback es importante
              para mejorar nuestros procesos de inducción y reinducción.
            </p>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Enviando..." : "Enviar Formulario"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

