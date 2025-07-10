"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { healthSurveyFormAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "health-survey",
  title: "ENCUESTA DE CONDICIONES DE SALUD",
  description: "Encuesta de Condiciones de Salud Individual",
  code: "GCSST-REG-047",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {},
  success: false,
  errors: null,
}

export function HealthSurveyForm() {
  const [state, formAction, pending] = React.useActionState(healthSurveyFormAction, initialState)
  const [authorized, setAuthorized] = React.useState(false)

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Encuesta enviada", "La encuesta de condiciones de salud ha sido registrada")
    }
  }, [state.success])

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        {/* Autorización */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <p className="text-sm text-blue-700 mb-4">
            Toda la información se recoge con fines estrictamente de interés de SST, para proteger y salvaguardar un
            interés esencial para la vida de las personas. En consecuencia, autorizo a la ARL y a la Empresa para el
            manejo de la información aportada en esta encuesta para desarrollar acciones de promoción y prevención.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autorizacion"
              name="autorizacion"
              checked={authorized}
              onCheckedChange={setAuthorized}
              required
              disabled={pending}
            />
            <Label htmlFor="autorizacion" className="text-sm font-medium text-blue-700">
              AUTORIZO
            </Label>
          </div>
        </div>

        {/* Información Personal */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            1. Información Personal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="nombre" name="nombre" label="Nombres y Apellidos:" disabled={pending} required />
            <FormField id="cedula" name="cedula" label="Cédula:" disabled={pending} required />
            <FormField id="fecha" name="fecha" label="Fecha:" type="date" disabled={pending} required />
            <div className="space-y-2">
              <Label>Edad:</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="edad_menor"
                    name="edad"
                    value="menor_59"
                    className="h-4 w-4"
                    disabled={pending}
                  />
                  <Label htmlFor="edad_menor">59 años o menor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="edad_mayor"
                    name="edad"
                    value="mayor_60"
                    className="h-4 w-4"
                    disabled={pending}
                  />
                  <Label htmlFor="edad_mayor">60 años o mayor</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sexo:</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sexo_m"
                    name="sexo"
                    value="masculino"
                    className="h-4 w-4"
                    disabled={pending}
                  />
                  <Label htmlFor="sexo_m">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="sexo_f" name="sexo" value="femenino" className="h-4 w-4" disabled={pending} />
                  <Label htmlFor="sexo_f">Femenino</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Personas con quien convive:</Label>
              <div className="space-y-3">
                <div>
                  <Label className="font-normal text-sm">Menores de 5 años:</Label>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="convive_menor_si"
                        name="convive_menor"
                        value="si"
                        className="h-4 w-4"
                        disabled={pending}
                      />
                      <Label htmlFor="convive_menor_si" className="font-normal">
                        Sí
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="convive_menor_no"
                        name="convive_menor"
                        value="no"
                        className="h-4 w-4"
                        disabled={pending}
                      />
                      <Label htmlFor="convive_menor_no" className="font-normal">
                        No
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="font-normal text-sm">Mayores de 60 años:</Label>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="convive_mayor_si"
                        name="convive_mayor"
                        value="si"
                        className="h-4 w-4"
                        disabled={pending}
                      />
                      <Label htmlFor="convive_mayor_si" className="font-normal">
                        Sí
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="convive_mayor_no"
                        name="convive_mayor"
                        value="no"
                        className="h-4 w-4"
                        disabled={pending}
                      />
                      <Label htmlFor="convive_mayor_no" className="font-normal">
                        No
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              id="peso"
              name="peso"
              label="Peso (Kg - dato aproximado):"
              type="number"
              step="0.1"
              disabled={pending}
            />
            <FormField
              id="talla"
              name="talla"
              label="Talla (m - dato aproximado):"
              type="number"
              step="0.01"
              disabled={pending}
            />
          </div>
        </div>

        {/* Antecedentes Médicos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            2. Antecedentes Médicos Importantes
          </h3>
          <div className="space-y-6">
            {[
              { id: "buena_salud", question: "¿Se encuentra actualmente en buen estado de salud?" },
              { id: "diabetico", question: "¿Usted ha sido diagnosticado como diabético?" },
              { id: "hipertenso", question: "¿Usted ha sido diagnosticado Hipertenso?" },
              {
                id: "otras_enfermedades",
                question:
                  "¿Le han diagnosticado una o varias de estas enfermedades? (Insuficiencia cardíaca, Infarto de miocardio, Cardiopatía congénita, etc.)",
              },
              {
                id: "incidente_proyecto",
                question: "¿Ha sufrido algún incidente durante la realización de sus labores en este proyecto?",
              },
              { id: "medicacion", question: "¿Recibe algún tipo de medicación o tratamiento por alguna enfermedad?" },
              {
                id: "apto_labor",
                question: "¿Considera usted que se encuentra apto para realizar las labores encomendadas?",
              },
            ].map((item, index) => (
              <div key={item.id} className="space-y-2">
                <Label>
                  {index + 1}. {item.question}
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${item.id}_si`}
                      name={item.id}
                      value="si"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`${item.id}_si`}>Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${item.id}_no`}
                      name={item.id}
                      value="no"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`${item.id}_no`}>No</Label>
                  </div>
                </div>
              </div>
            ))}

            <FormField
              id="sintomas"
              name="sintomas"
              label="Si su respuesta anterior es NO, ¿Qué síntomas presenta?"
              multiline
              rows={3}
              disabled={pending}
            />

            <FormField id="cual_medicacion" name="cual_medicacion" label="¿Cuál medicación?" disabled={pending} />

            <FormField
              id="argumento_apto"
              name="argumento_apto"
              label="Si su respuesta es NO, por favor argumente:"
              multiline
              rows={3}
              disabled={pending}
            />
          </div>
        </div>

        {/* Hábitos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">3. Hábitos</h3>
          <div className="space-y-6">
            {[
              { id: "desayuno", question: "¿Desayuna antes de salir de casa?" },
              { id: "fumador", question: "¿Usted es fumador?" },
            ].map((item, index) => (
              <div key={item.id} className="space-y-2">
                <Label>
                  {index + 1}. {item.question}
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${item.id}_si`}
                      name={item.id}
                      value="si"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`${item.id}_si`}>Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${item.id}_no`}
                      name={item.id}
                      value="no"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`${item.id}_no`}>No</Label>
                  </div>
                </div>
              </div>
            ))}

            <FormField
              id="fumador_cantidad"
              name="fumador_cantidad"
              label="Si es fumador, ¿Cuántos cigarrillos al día?"
              type="number"
              disabled={pending}
            />
          </div>
        </div>

        {/* Firmas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">4. Firmas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <Label>Firma del Trabajador:</Label>
              <div className="border-t mt-12 pt-2"></div>
            </div>
            <div className="space-y-2">
              <Label>Firma Responsable SST:</Label>
              <div className="border-t mt-12 pt-2"></div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending || !authorized}>
          {pending ? "Enviando..." : "Enviar Encuesta"}
        </Button>
      </form>
    </FormWrapper>
  )
}
