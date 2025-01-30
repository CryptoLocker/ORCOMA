"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { riskIdentificationFormAction } from "@/lib/actions"
import { FormData } from "@/lib/types"
import { Check } from "lucide-react"

const initialState = {
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
  success: false,
  errors: null,
}

export function FormularioIdentificacionRiesgos() {
  const [state, formAction, pending] = React.useActionState(riskIdentificationFormAction, initialState)

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center border-b border-orange-500 pb-4">
          <CardTitle className="text-2xl text-orange-500">GESTIÓN DE CALIDAD Y SST</CardTitle>
          <p>Formulario: Identificación de Riesgos - PROYECTOS</p>
          <p>CÓDIGO: GCSST-REG-062 | VERSIÓN: 1 | FECHA: 1/03/2024</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p>
              <strong>OBJETIVO:</strong> Identificar los RIESGOS relacionados con las ocupaciones o actividades
              rutinarias y no rutinarias que desempeñan todos los cargos o niveles de la organización.
            </p>
            <p>
              <strong>ALCANCE:</strong> Aplica a todos los niveles y cargos de la empresa.
            </p>
            <p>
              <strong>APLICACIÓN:</strong> Al iniciar cada proyecto
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            {state.success ? (
              <p className="text-green-600 flex items-center gap-2 text-sm">
                <Check className="size-4" />
                Formulario enviado correctamente.
              </p>
            ) : null}
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
                  disabled={pending}
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
                  disabled={pending}
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
              <div className="group/field grid gap-2" data-invalid={!!state.errors?.proyecto}>
                <Label htmlFor="proyecto" className="group-data-[invalid=true]/field:text-destructive">
                  PROYECTO:
                </Label>
                <Input
                  id="proyecto"
                  name="proyecto"
                  defaultValue={state.defaultValues.proyecto}
                  className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                  disabled={pending}
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
                  disabled={pending}
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
                  disabled={pending}
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
                    <Checkbox id="ruido" name="riesgos.fisicos.ruido" disabled={pending} />
                    <Label htmlFor="ruido">Ruido</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vibracion" name="riesgos.fisicos.vibracion" disabled={pending} />
                    <Label htmlFor="vibracion">Vibración</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA TÉRMICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_frio" name="riesgos.fisicos.temp_frio" disabled={pending} />
                    <Label htmlFor="temp_frio">Temperaturas extremas por Frío</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_calor" name="riesgos.fisicos.temp_calor" disabled={pending} />
                    <Label htmlFor="temp_calor">Temperaturas Extremas por Calor</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA ELECTROMECÁNICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_ionizantes" name="riesgos.fisicos.rad_ionizantes" disabled={pending} />
                    <Label htmlFor="rad_ionizantes">Radiaciones Ionizantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_no_ionizantes" name="riesgos.fisicos.rad_no_ionizantes" disabled={pending} />
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
                  <Checkbox id="vapores" name="riesgos.quimicos.vapores" disabled={pending} />
                  <Label htmlFor="vapores">Vapores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fibras" name="riesgos.quimicos.fibras" disabled={pending} />
                  <Label htmlFor="fibras">Fibras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="polvos_humos" name="riesgos.quimicos.polvos_humos" disabled={pending} />
                  <Label htmlFor="polvos_humos">Polvos y Humos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nieblas" name="riesgos.quimicos.nieblas" disabled={pending} />
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
                    <Checkbox id="virus" name="riesgos.biologicos.virus" disabled={pending} />
                    <Label htmlFor="virus">Virus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bacterias" name="riesgos.biologicos.bacterias" disabled={pending} />
                    <Label htmlFor="bacterias">Bacterias</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hongos" name="riesgos.biologicos.hongos" disabled={pending} />
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
                    <Checkbox id="posturas" name="riesgos.biomecanicos.posturas" disabled={pending} />
                    <Label htmlFor="posturas">Posturas inadecuadas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="movimientos" name="riesgos.biomecanicos.movimientos" disabled={pending} />
                    <Label htmlFor="movimientos">Movimientos repetitivos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cargas" name="riesgos.biomecanicos.cargas" disabled={pending} />
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
                  <Checkbox id="mecanico" name="riesgos.seguridad.mecanico" disabled={pending} />
                  <Label htmlFor="mecanico">Mecánicos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="electrico" name="riesgos.seguridad.electrico" disabled={pending} />
                  <Label htmlFor="electrico">Eléctrico</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="locativo" name="riesgos.seguridad.locativo" disabled={pending} />
                  <Label htmlFor="locativo">Locativos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tecnologico" name="riesgos.seguridad.tecnologico" disabled={pending} />
                  <Label htmlFor="tecnologico">Físico-Químico</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS FENÓMENOS NATURALES */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS FENÓMENOS NATURALES</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sismo" name="riesgos.fenomenos_naturales.sismo" disabled={pending} />
                  <Label htmlFor="sismo">Terremotos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="inundacion" name="riesgos.fenomenos_naturales.inundacion" disabled={pending} />
                  <Label htmlFor="inundacion">Inundaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="deslizamiento" name="riesgos.fenomenos_naturales.deslizamiento" disabled={pending} />
                  <Label htmlFor="deslizamiento">Avalanchas</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS PÚBLICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS PÚBLICOS</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hurto" name="riesgos.publicos.hurto" disabled={pending} />
                  <Label htmlFor="hurto">Hurto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manifestaciones" name="riesgos.publicos.manifestaciones" disabled={pending} />
                  <Label htmlFor="manifestaciones">Manifestaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terrorismo" name="riesgos.publicos.terrorismo" disabled={pending} />
                  <Label htmlFor="terrorismo">Terrorismo</Label>
                </div>
              </div>
            </div>

            {/* RIESGO PSICOSOCIAL */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGO PSICOSOCIAL</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="estres" name="riesgos.psicosocial.estres" disabled={pending} />
                  <Label htmlFor="estres">
                    Se maneja gran cantidad de información, es compleja y/o debe emplearse de manera simultánea
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="responsabilidad" name="riesgos.psicosocial.responsabilidad" disabled={pending} />
                  <Label htmlFor="responsabilidad">
                    Se tiene responsabilidad por manejo de dinero, bienes, salud o seguridad de otras personas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="jornadas" name="riesgos.psicosocial.jornadas" disabled={pending} />
                  <Label htmlFor="jornadas">
                    Las jornadas de trabajo son extensas, en horario nocturno y/o sin descanso
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trato" name="riesgos.psicosocial.trato" disabled={pending} />
                  <Label htmlFor="trato">Se expone a trato negativo del público y/o de compañeros de trabajo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="comunicacion" name="riesgos.psicosocial.comunicacion" disabled={pending} />
                  <Label htmlFor="comunicacion">La comunicación con otras personas es escasa y/o conflictiva</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="esfuerzo" name="riesgos.psicosocial.esfuerzo" disabled={pending} />
                  <Label htmlFor="esfuerzo">
                    El trabajo y las condiciones en que se realiza implica un gran esfuerzo físico y fatiga
                  </Label>
                </div>
              </div>
            </div>

            <div className="group/field grid gap-2" data-invalid={!!state.errors?.sugerencias}>
              <Label htmlFor="sugerencias" className="group-data-[invalid=true]/field:text-destructive">
                QUE HACER PARA MINIMIZAR LOS RIESGOS:
              </Label>
              <Textarea
                id="sugerencias"
                name="sugerencias"
                defaultValue={state.defaultValues.sugerencias}
                rows={4}
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!state.errors?.sugerencias}
                aria-errormessage="error-sugerencias"
              />
              {state.errors?.sugerencias && (
                <p id="error-sugerencias" className="text-destructive text-sm">
                  {state.errors.sugerencias}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Enviando..." : "FIRMA DE TRABAJADOR"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

