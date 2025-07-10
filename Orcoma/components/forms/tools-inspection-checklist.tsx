"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { toolsInspectionChecklistAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "tools-inspection-checklist",
  title: "LISTA DE VERIFICACIÓN",
  description: "Inspección de Herramientas",
  code: "GCSST-REG-065",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {},
  success: false,
  errors: null,
}

const inspectionItems = [
  {
    category: "HERRAMIENTAS MANUALES",
    items: [
      { tool: "Martillos / Mazos", point: "Mango (sin astillas, seguro)", name: "martillo_mango" },
      { tool: "Martillos / Mazos", point: "Cabeza (sin fisuras, firme)", name: "martillo_cabeza" },
      { tool: "Alicates / Tenazas", point: "Mandíbulas (sin desgaste excesivo)", name: "alicates_mandibula" },
      { tool: "Alicates / Tenazas", point: "Mangos (aislados, sin roturas)", name: "alicates_mango" },
      { tool: "Destornilladores", point: "Punta / Vástago (sin torceduras ni desgaste)", name: "dest_punta" },
      { tool: "Destornilladores", point: "Mango (sin grietas, firme)", name: "dest_mango" },
    ],
  },
  {
    category: "HERRAMIENTAS ELÉCTRICAS",
    items: [
      {
        tool: "Taladros / Esmeriles / Sierras",
        point: "Cable y enchufe (sin cortes, sin empalmes)",
        name: "elect_cable",
      },
      { tool: "Taladros / Esmeriles / Sierras", point: "Carcasa (sin fisuras ni roturas)", name: "elect_carcasa" },
      {
        tool: "Taladros / Esmeriles / Sierras",
        point: "Guardas de seguridad (presentes y funcionales)",
        name: "elect_guarda",
      },
    ],
  },
]

export function ToolsInspectionChecklist() {
  const [state, formAction, pending] = React.useActionState(toolsInspectionChecklistAction, initialState)

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Inspección guardada", "La inspección de herramientas ha sido registrada correctamente")
    }
  }, [state.success])

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        {/* Información General */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField id="inspector" name="inspector" label="Inspeccionado por:" disabled={pending} required />
            <FormField id="fecha" name="fecha" label="Fecha:" type="date" disabled={pending} required />
            <FormField id="area" name="area" label="Área / Proyecto:" disabled={pending} required />
          </div>
        </div>

        {/* Items de Verificación */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Inspección de Herramientas Manuales y Eléctricas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Herramienta / Componente</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Punto de Inspección</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Estado (B/M/NA)</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Acción Requerida</th>
                </tr>
              </thead>
              <tbody>
                {inspectionItems.map((category) => (
                  <React.Fragment key={category.category}>
                    <tr className="bg-blue-50">
                      <td colSpan={4} className="border border-gray-300 p-3 text-center font-semibold text-blue-700">
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, index) => (
                      <tr key={item.name}>
                        <td className="border border-gray-300 p-3">{item.tool}</td>
                        <td className="border border-gray-300 p-3">{item.point}</td>
                        <td className="border border-gray-300 p-3">
                          <div className="flex justify-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id={`${item.name}_b`}
                                name={item.name}
                                value="b"
                                className="h-4 w-4"
                                disabled={pending}
                              />
                              <Label htmlFor={`${item.name}_b`}>B</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id={`${item.name}_m`}
                                name={item.name}
                                value="m"
                                className="h-4 w-4"
                                disabled={pending}
                              />
                              <Label htmlFor={`${item.name}_m`}>M</Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <input
                                type="radio"
                                id={`${item.name}_na`}
                                name={item.name}
                                value="na"
                                className="h-4 w-4"
                                disabled={pending}
                              />
                              <Label htmlFor={`${item.name}_na`}>NA</Label>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name={`${item.name}_accion`}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            disabled={pending}
                          />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observaciones y Firmas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            Observaciones Generales
          </h3>
          <FormField
            id="observaciones"
            name="observaciones"
            label="Describa cualquier otro hallazgo o recomendación:"
            multiline
            rows={4}
            disabled={pending}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-2">
              <Label>Firma del Inspector:</Label>
              <div className="border-t mt-16 pt-2"></div>
            </div>
            <div className="space-y-2">
              <Label>Firma del Trabajador Responsable:</Label>
              <div className="border-t mt-16 pt-2"></div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Guardando..." : "Guardar Inspección"}
        </Button>
      </form>
    </FormWrapper>
  )
}
