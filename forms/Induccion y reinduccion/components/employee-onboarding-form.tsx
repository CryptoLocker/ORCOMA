"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { employeeOnboardingFormAction } from "@/lib/actions"
import { Check, AlertCircle } from "lucide-react"
import { useFormState } from "react-dom"

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
    nombre: "",
    identificacion: "",
    cargo: "",
    empresa: "",
    proyecto: "",
    ciudad: "",
    genero: "",
    fecha: "",
    tipo: "",
    topics: Array(inductionTopics.length).fill(""),
    riskLevel: "",
    riesgos: {},
    sugerencias: "",
    feedback: "",
  },
  success: false,
  errors: null,
}

export function EmployeeOnboardingForm() {
  const [state, formAction] = useFormState(employeeOnboardingFormAction, {
    success: false,
    errors: {},
    message: "",
  })

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center border-b border-orange-500 pb-4">
          <CardTitle className="text-2xl text-orange-500">GESTIÓN DE CALIDAD Y SST</CardTitle>
          <p>Formulario de Inducción, Reinducción e Identificación de Riesgos</p>
          <p>CÓDIGO: GCSST-REG-COMB | VERSIÓN: 1 | FECHA: 2/2/2024</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {state.success ? (
              <p className="text-green-600 flex items-center gap-2 text-sm">
                <Check className="size-4" />
                {state.message}
              </p>
            ) : state.message ? (
              <p className="text-red-600 flex items-center gap-2 text-sm">
                <AlertCircle className="size-4" />
                {state.message}
              </p>
            ) : null}

            <h3 className="text-xl font-bold mt-6">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.nombre}>
                <Label htmlFor="nombre" className="group-data-[invalid=true]/field:text-destructive">
                  NOMBRE COMPLETO:
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  defaultValue={state.defaultValues.nombre}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={false}
                  aria-invalid={!!state.errors?.nombre}
                  aria-errormessage="error-nombre"
                />
                {state.errors?.nombre && (
                  <p id="error-nombre" className="text-destructive text-sm">
                    {state.errors.nombre}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.identificacion}>
                <Label htmlFor="identificacion" className="group-data-[invalid=true]/field:text-destructive">
                  N° DE IDENTIFICACIÓN:
                </Label>
                <Input
                  id="identificacion"
                  name="identificacion"
                  defaultValue={state.defaultValues.identificacion}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={false}
                  aria-invalid={!!state.errors?.identificacion}
                  aria-errormessage="error-identificacion"
                />
                {state.errors?.identificacion && (
                  <p id="error-identificacion" className="text-destructive text-sm">
                    {state.errors.identificacion}
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
                  disabled={false}
                  aria-invalid={!!state.errors?.cargo}
                  aria-errormessage="error-cargo"
                />
                {state.errors?.cargo && (
                  <p id="error-cargo" className="text-destructive text-sm">
                    {state.errors.cargo}
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
                  disabled={false}
                  aria-invalid={!!state.errors?.empresa}
                  aria-errormessage="error-empresa"
                />
                {state.errors?.empresa && (
                  <p id="error-empresa" className="text-destructive text-sm">
                    {state.errors.empresa}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.proyecto}>
                <Label htmlFor="proyecto" className="group-data-[invalid=true]/field:text-destructive">
                  PROYECTO:
                </Label>
                <Input
                  id="proyecto"
                  name="proyecto"
                  defaultValue={state.defaultValues.proyecto}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={false}
                  aria-invalid={!!state.errors?.proyecto}
                  aria-errormessage="error-proyecto"
                />
                {state.errors?.proyecto && (
                  <p id="error-proyecto" className="text-destructive text-sm">
                    {state.errors.proyecto}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.ciudad}>
                <Label htmlFor="ciudad" className="group-data-[invalid=true]/field:text-destructive">
                  CIUDAD:
                </Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  defaultValue={state.defaultValues.ciudad}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={false}
                  aria-invalid={!!state.errors?.ciudad}
                  aria-errormessage="error-ciudad"
                />
                {state.errors?.ciudad && (
                  <p id="error-ciudad" className="text-destructive text-sm">
                    {state.errors.ciudad}
                  </p>
                )}
              </div>
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.genero}>
                <Label className="group-data-[invalid=true]/field:text-destructive">GÉNERO:</Label>
                <RadioGroup
                  name="genero"
                  defaultValue={state.defaultValues.genero}
                  className="flex space-x-4"
                  disabled={false}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="genero-m" />
                    <Label htmlFor="genero-m">M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="F" id="genero-f" />
                    <Label htmlFor="genero-f">F</Label>
                  </div>
                </RadioGroup>
                {state.errors?.genero && <p className="text-destructive text-sm">{state.errors.genero}</p>}
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
                  disabled={false}
                  aria-invalid={!!state.errors?.fecha}
                  aria-errormessage="error-fecha"
                />
                {state.errors?.fecha && (
                  <p id="error-fecha" className="text-destructive text-sm">
                    {state.errors.fecha}
                  </p>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold mt-6">Inducción y Reinducción</h3>
            <div className="group/field grid gap-2" data-invalid={!!state.errors?.tipo}>
              <Label className="group-data-[invalid=true]/field:text-destructive">TIPO:</Label>
              <RadioGroup
                name="tipo"
                defaultValue={state.defaultValues.tipo}
                className="flex space-x-4"
                disabled={false}
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
                        disabled={false}
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
              <Select name="riskLevel" defaultValue={state.defaultValues.riskLevel} disabled={false}>
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

            <h3 className="text-xl font-bold mt-6">IDENTIFICACIÓN DE PELIGROS Y RIESGOS</h3>
            <p>
              Marque únicamente los RIESGOS a los que se expone en su ocupación o mientras realiza sus labores
              rutinarias y no rutinarias en este proyecto.
            </p>

            {/* RIESGOS FÍSICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS FÍSICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA MECÁNICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ruido" name="riesgos.fisicos.ruido" disabled={false} />
                    <Label htmlFor="ruido">Ruido</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vibracion" name="riesgos.fisicos.vibracion" disabled={false} />
                    <Label htmlFor="vibracion">Vibración</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA TÉRMICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_frio" name="riesgos.fisicos.temp_frio" disabled={false} />
                    <Label htmlFor="temp_frio">Temperaturas extremas por Frío</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_calor" name="riesgos.fisicos.temp_calor" disabled={false} />
                    <Label htmlFor="temp_calor">Temperaturas Extremas por Calor</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA ELECTROMECÁNICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_ionizantes" name="riesgos.fisicos.rad_ionizantes" disabled={false} />
                    <Label htmlFor="rad_ionizantes">Radiaciones Ionizantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_no_ionizantes" name="riesgos.fisicos.rad_no_ionizantes" disabled={false} />
                    <Label htmlFor="rad_no_ionizantes">Radiaciones no Ionizantes</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS QUÍMICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS QUÍMICOS</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vapores" name="riesgos.quimicos.vapores" disabled={false} />
                  <Label htmlFor="vapores">Vapores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fibras" name="riesgos.quimicos.fibras" disabled={false} />
                  <Label htmlFor="fibras">Fibras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="polvos_humos" name="riesgos.quimicos.polvos_humos" disabled={false} />
                  <Label htmlFor="polvos_humos">Polvos y Humos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nieblas" name="riesgos.quimicos.nieblas" disabled={false} />
                  <Label htmlFor="nieblas">Nieblas</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS BIOLÓGICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS BIOLÓGICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">MICROORGANISMOS</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="virus" name="riesgos.biologicos.virus" disabled={false} />
                    <Label htmlFor="virus">Virus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bacterias" name="riesgos.biologicos.bacterias" disabled={false} />
                    <Label htmlFor="bacterias">Bacterias</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hongos" name="riesgos.biologicos.hongos" disabled={false} />
                    <Label htmlFor="hongos">Hongos</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS BIOMECÁNICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS BIOMECÁNICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">CARGA FÍSICA</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="posturas" name="riesgos.biomecanicos.posturas" disabled={false} />
                    <Label htmlFor="posturas">Posturas inadecuadas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="movimientos" name="riesgos.biomecanicos.movimientos" disabled={false} />
                    <Label htmlFor="movimientos">Movimientos repetitivos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cargas" name="riesgos.biomecanicos.cargas" disabled={false} />
                    <Label htmlFor="cargas">Manipulación de cargas</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS DE SEGURIDAD */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS DE SEGURIDAD</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mecanico" name="riesgos.seguridad.mecanico" disabled={false} />
                  <Label htmlFor="mecanico">Mecánicos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="electrico" name="riesgos.seguridad.electrico" disabled={false} />
                  <Label htmlFor="electrico">Eléctrico</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="locativo" name="riesgos.seguridad.locativo" disabled={false} />
                  <Label htmlFor="locativo">Locativos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tecnologico" name="riesgos.seguridad.tecnologico" disabled={false} />
                  <Label htmlFor="tecnologico">Físico-Químico</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS FENÓMENOS NATURALES */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS FENÓMENOS NATURALES</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sismo" name="riesgos.fenomenos_naturales.sismo" disabled={false} />
                  <Label htmlFor="sismo">Terremotos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="inundacion" name="riesgos.fenomenos_naturales.inundacion" disabled={false} />
                  <Label htmlFor="inundacion">Inundaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="deslizamiento" name="riesgos.fenomenos_naturales.deslizamiento" disabled={false} />
                  <Label htmlFor="deslizamiento">Avalanchas</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS PÚBLICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS PÚBLICOS</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hurto" name="riesgos.publicos.hurto" disabled={false} />
                  <Label htmlFor="hurto">Hurto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manifestaciones" name="riesgos.publicos.manifestaciones" disabled={false} />
                  <Label htmlFor="manifestaciones">Manifestaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terrorismo" name="riesgos.publicos.terrorismo" disabled={false} />
                  <Label htmlFor="terrorismo">Terrorismo</Label>
                </div>
              </div>
            </div>

            {/* RIESGO PSICOSOCIAL */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGO PSICOSOCIAL</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="estres" name="riesgos.psicosocial.estres" disabled={false} />
                  <Label htmlFor="estres">
                    Se maneja gran cantidad de información, es compleja y/o debe emplearse de manera simultánea
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="responsabilidad" name="riesgos.psicosocial.responsabilidad" disabled={false} />
                  <Label htmlFor="responsabilidad">
                    Se tiene responsabilidad por manejo de dinero, bienes, salud o seguridad de otras personas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="jornadas" name="riesgos.psicosocial.jornadas" disabled={false} />
                  <Label htmlFor="jornadas">
                    Las jornadas de trabajo son extensas, en horario nocturno y/o sin descanso
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trato" name="riesgos.psicosocial.trato" disabled={false} />
                  <Label htmlFor="trato">Se expone a trato negativo del público y/o de compañeros de trabajo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="comunicacion" name="riesgos.psicosocial.comunicacion" disabled={false} />
                  <Label htmlFor="comunicacion">La comunicación con otras personas es escasa y/o conflictiva</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="esfuerzo" name="riesgos.psicosocial.esfuerzo" disabled={false} />
                  <Label htmlFor="esfuerzo">
                    El trabajo y las condiciones en que se realiza implica un gran esfuerzo físico y fatiga
                  </Label>
                </div>
              </div>
            </div>

            <div className="group/field grid gap-2" data-invalid={!!state.errors?.sugerencias}>
              <Label htmlFor="sugerencias" className="group-data-[invalid=true]/field:text-destructive">
                ¿QUE HARIA PARA MINIMIZAR LOS RIESGOS?
              </Label>
              <Textarea
                id="sugerencias"
                name="sugerencias"
                defaultValue={state.defaultValues.sugerencias}
                rows={4}
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={false}
                aria-invalid={!!state.errors?.sugerencias}
                aria-errormessage="error-sugerencias"
              />
              {state.errors?.sugerencias && (
                <p id="error-sugerencias" className="text-destructive text-sm">
                  {state.errors.sugerencias}
                </p>
              )}
            </div>

            <p className="font-bold">
              NOTA: Por motivos de ley es obligatorio que usted tenga la información clara y veraz de cada tema antes
              dicho. Se compromete usted como trabajador, a cumplir cada uno de estos ítems. Su feedback es importante
              para mejorar nuestros procesos de inducción y reinducción.
            </p>

            <Button type="submit" className="w-full" disabled={false}>
              {false ? "Enviando..." : "Enviar Formulario"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

