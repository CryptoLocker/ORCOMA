"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { ppeInspectionChecklistAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "ppe-inspection-checklist",
  title: "LISTA DE VERIFICACIÓN",
  description: "Inspección y Entrega de EPP",
  code: "GCSST-REG-066",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {},
  success: false,
  errors: null,
}

const ppeItems = [
  { id: "casco", name: "Protección Cabeza (Casco)" },
  { id: "gafas", name: "Protección Visual (Gafas de seguridad)" },
  { id: "auditiva", name: "Protección Auditiva (Tapones / Orejeras)" },
  {
    id: "respiratoria",
    name: "Protección Respiratoria (Mascarilla / Respirador)",
    placeholder: "Filtros, válvulas, etc.",
  },
  { id: "guantes", name: "Protección Manos (Guantes)", placeholder: "Tipo: carnaza, nitrilo, etc." },
  { id: "botas", name: "Protección Pies (Botas de seguridad)", placeholder: "Puntera, suela, etc." },
  { id: "caidas", name: "Protección Contra Caídas (Arnés, Eslinga)", placeholder: "Costuras, herrajes, etc." },
]

export function PPEInspectionChecklist() {
  const [state, formAction, pending] = React.useActionState(ppeInspectionChecklistAction, initialState)

  React.useEffect(() => {
    if (state.success) {
      showToast.success(
        "Registro guardado",
        "El registro de inspección y entrega de EPP ha sido guardado correctamente",
      )
    }
  }, [state.success])

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        {/* Información General */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField id="inspector" name="inspector" label="Inspeccionado por:" disabled={pending} required />
            <FormField id="trabajador" name="trabajador" label="Trabajador que recibe:" disabled={pending} required />
            <FormField id="fecha" name="fecha" label="Fecha:" type="date" disabled={pending} required />
            <div className="md:col-span-3">
              <FormField id="area" name="area" label="Área / Proyecto:" disabled={pending} required />
            </div>
          </div>
        </div>

        {/* Items de Verificación */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Elementos de Protección Personal (EPP)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Elemento de Protección</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Estado (B/M)</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Se Entrega (Sí/No)</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {ppeItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-3">{item.name}</td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`${item.id}_estado_b`}
                            name={`${item.id}_estado`}
                            value="b"
                            className="h-4 w-4"
                            disabled={pending}
                          />
                          <Label htmlFor={`${item.id}_estado_b`}>B</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`${item.id}_estado_m`}
                            name={`${item.id}_estado`}
                            value="m"
                            className="h-4 w-4"
                            disabled={pending}
                          />
                          <Label htmlFor={`${item.id}_estado_m`}>M</Label>
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-3">
                      <div className="flex justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`${item.id}_entrega_si`}
                            name={`${item.id}_entrega`}
                            value="si"
                            className="h-4 w-4"
                            disabled={pending}
                          />
                          <Label htmlFor={`${item.id}_entrega_si`}>Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`${item.id}_entrega_no`}
                            name={`${item.id}_entrega`}
                            value="no"
                            className="h-4 w-4"
                            disabled={pending}
                          />
                          <Label htmlFor={`${item.id}_entrega_no`}>No</Label>
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name={`${item.id}_obs`}
                        placeholder={item.placeholder}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        disabled={pending}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compromiso y Firmas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Compromiso del Trabajador
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Declaro haber recibido los elementos de protección personal listados anteriormente en buen estado. Me
            comprometo a utilizarlos correctamente, mantenerlos en condiciones óptimas de higiene y reportar cualquier
            daño o deterioro de los mismos al supervisor o al área de SST.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <Label>Firma del Responsable SST / Supervisor:</Label>
              <div className="border-t mt-16 pt-2"></div>
            </div>
            <div className="space-y-2">
              <Label>Firma del Trabajador:</Label>
              <div className="border-t mt-16 pt-2"></div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Guardando..." : "Guardar Registro"}
        </Button>
      </form>
    </FormWrapper>
  )
}
