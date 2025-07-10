"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { loadHandlingChecklistAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "load-handling-checklist",
  title: "LISTA DE VERIFICACIÓN",
  description: "Manipulación Segura de Cargas",
  code: "GCSST-REG-064",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {},
  success: false,
  errors: null,
}

const checklistItems = [
  "¿Se ha evaluado el peso y la frecuencia de levantamiento de la carga?",
  "¿Se mantiene la carga en la zona segura (entre rodillas y codos)?",
  "¿Se mantiene la carga lo más pegada al cuerpo posible?",
  "¿Se evita girar o inclinar el torso al levantar o transportar la carga?",
  "¿La carga tiene un agarre firme, cómodo y seguro?",
  "¿La superficie de trabajo está en buenas condiciones (limpia, seca, sin obstáculos)?",
  "¿Se utilizan las ayudas mecánicas disponibles (carretillas, gatos) para cargas pesadas?",
]

export function LoadHandlingChecklist() {
  const [state, formAction, pending] = React.useActionState(loadHandlingChecklistAction, initialState)

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Verificación guardada", "La lista de verificación ha sido registrada correctamente")
    }
  }, [state.success])

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        {/* Información General */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="inspector" name="inspector" label="Realizado por:" disabled={pending} required />
            <FormField id="fecha" name="fecha" label="Fecha de Inspección:" type="date" disabled={pending} required />
            <div className="md:col-span-2">
              <FormField id="area" name="area" label="Área / Proyecto:" disabled={pending} required />
            </div>
          </div>
        </div>

        {/* Items de Verificación */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Puntos a Verificar
          </h3>
          <div className="space-y-4">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border border-gray-200 rounded-md"
              >
                <div className="md:col-span-2">
                  <Label className="font-medium">
                    {index + 1}. {item}
                  </Label>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`item${index + 1}_si`}
                      name={`item${index + 1}`}
                      value="si"
                      className="h-4 w-4"
                      disabled={pending}
                      required
                    />
                    <Label htmlFor={`item${index + 1}_si`}>Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`item${index + 1}_no`}
                      name={`item${index + 1}`}
                      value="no"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`item${index + 1}_no`}>No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`item${index + 1}_na`}
                      name={`item${index + 1}`}
                      value="na"
                      className="h-4 w-4"
                      disabled={pending}
                    />
                    <Label htmlFor={`item${index + 1}_na`}>N/A</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observaciones y Firma */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Observaciones y Acciones a Tomar
          </h3>
          <FormField
            id="observaciones"
            name="observaciones"
            label="Describa cualquier hallazgo o recomendación:"
            multiline
            rows={5}
            disabled={pending}
          />
          <div className="mt-8">
            <Label>Firma del Inspector:</Label>
            <div className="border-t mt-16 pt-2"></div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Guardando..." : "Guardar Verificación"}
        </Button>
      </form>
    </FormWrapper>
  )
}
