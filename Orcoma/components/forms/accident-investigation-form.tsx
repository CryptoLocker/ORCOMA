"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { accidentInvestigationFormAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"
import { Plus, Trash2 } from "lucide-react"

const formConfig: FormConfig = {
  id: "accident-investigation",
  title: "INVESTIGACIÓN DE INCIDENTES/ACCIDENTES",
  description: "Formato de Investigación de Incidentes, Accidentes y Enfermedades Laborales",
  code: "GCSST-REG-063",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {},
  success: false,
  errors: null,
}

export function AccidentInvestigationForm() {
  const [state, formAction, pending] = React.useActionState(accidentInvestigationFormAction, initialState)
  const [planAcciones, setPlanAcciones] = React.useState([{ id: 1 }])
  const [equipoInvestigador, setEquipoInvestigador] = React.useState([
    { id: 1, cargo: "Jefe Inmediato" },
    { id: 2, cargo: "Miembro COPASST" },
    { id: 3, cargo: "Responsable SST" },
  ])

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Investigación guardada", "La investigación de accidente ha sido registrada correctamente")
    }
  }, [state.success])

  const addPlanAccion = () => {
    setPlanAcciones([...planAcciones, { id: Date.now() }])
  }

  const removePlanAccion = (id: number) => {
    if (planAcciones.length > 1) {
      setPlanAcciones(planAcciones.filter((item) => item.id !== id))
    }
  }

  const addInvestigador = () => {
    setEquipoInvestigador([...equipoInvestigador, { id: Date.now(), cargo: "" }])
  }

  const removeInvestigador = (id: number) => {
    if (equipoInvestigador.length > 1) {
      setEquipoInvestigador(equipoInvestigador.filter((item) => item.id !== id))
    }
  }

  return (
    <FormWrapper config={formConfig}>
      <form action={formAction} className="space-y-6">
        {/* Información General del Evento */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            1. Información General del Evento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipo_reporte">Tipo de Evento:</Label>
              <select
                id="tipo_reporte"
                name="tipo_reporte"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                disabled={pending}
              >
                <option value="incidente">Incidente</option>
                <option value="accidente_trabajo">Accidente de Trabajo</option>
                <option value="enfermedad_laboral">Enfermedad Laboral</option>
              </select>
            </div>
            <FormField
              id="fecha_evento"
              name="fecha_evento"
              label="Fecha del Evento:"
              type="date"
              disabled={pending}
              required
            />
            <FormField
              id="hora_evento"
              name="hora_evento"
              label="Hora del Evento:"
              type="time"
              disabled={pending}
              required
            />
            <div className="md:col-span-2">
              <FormField
                id="lugar_evento"
                name="lugar_evento"
                label="Lugar Exacto del Evento:"
                disabled={pending}
                required
              />
            </div>
            <FormField
              id="fecha_reporte"
              name="fecha_reporte"
              label="Fecha del Reporte:"
              type="date"
              disabled={pending}
              required
            />
          </div>
        </div>

        {/* Información del Afectado */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            2. Información del Trabajador Afectado (Si aplica)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField id="nombre_afectado" name="nombre_afectado" label="Nombre Completo:" disabled={pending} />
            <FormField id="cedula_afectado" name="cedula_afectado" label="Cédula:" disabled={pending} />
            <FormField id="cargo_afectado" name="cargo_afectado" label="Cargo:" disabled={pending} />
            <FormField id="proyecto_afectado" name="proyecto_afectado" label="Proyecto / Área:" disabled={pending} />
          </div>
        </div>

        {/* Descripción del Evento */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            3. Descripción del Evento
          </h3>
          <FormField
            id="descripcion_evento"
            name="descripcion_evento"
            label="Describa detalladamente lo sucedido (qué, cómo, cuándo, dónde, por qué):"
            multiline
            rows={6}
            disabled={pending}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormField
              id="parte_cuerpo"
              name="parte_cuerpo"
              label="Parte(s) del cuerpo afectada(s):"
              disabled={pending}
            />
            <FormField
              id="tipo_lesion"
              name="tipo_lesion"
              label="Tipo de lesión (herida, fractura, contusión, etc.):"
              disabled={pending}
            />
          </div>
        </div>

        {/* Análisis de Causas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            4. Análisis de Causas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="causas_inmediatas"
              name="causas_inmediatas"
              label="Causas Inmediatas (Actos y Condiciones Inseguras):"
              multiline
              rows={5}
              placeholder="Ej: No usar EPP, piso resbaloso, falta de señalización..."
              disabled={pending}
            />
            <FormField
              id="causas_basicas"
              name="causas_basicas"
              label="Causas Básicas (Factores Personales y de Trabajo):"
              multiline
              rows={5}
              placeholder="Ej: Falta de capacitación, mantenimiento deficiente, procedimientos inadecuados..."
              disabled={pending}
            />
          </div>
        </div>

        {/* Plan de Acción */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            5. Plan de Acción (Medidas Correctivas y Preventivas)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Acción Correctiva / Preventiva</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Responsable</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Fecha de Ejecución</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Estado</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {planAcciones.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name={`plan_accion_${index}_descripcion`}
                        rows={2}
                        className="w-full p-2 border-0 focus:ring-0 resize-none"
                        disabled={pending}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name={`plan_accion_${index}_responsable`}
                        className="w-full p-2 border-0 focus:ring-0"
                        disabled={pending}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="date"
                        name={`plan_accion_${index}_fecha`}
                        className="w-full p-2 border-0 focus:ring-0"
                        disabled={pending}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select
                        name={`plan_accion_${index}_estado`}
                        className="w-full p-2 border-0 focus:ring-0"
                        disabled={pending}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePlanAccion(item.id)}
                        disabled={pending || planAcciones.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            type="button"
            onClick={addPlanAccion}
            disabled={pending}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Acción
          </Button>
        </div>

        {/* Equipo Investigador */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-600 border-b border-gray-200 pb-2 mb-4">
            6. Equipo Investigador
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Nombre Completo</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Cargo</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Firma</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipoInvestigador.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name={`investigador_${index}_nombre`}
                        className="w-full p-2 border-0 focus:ring-0"
                        disabled={pending}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name={`investigador_${index}_cargo`}
                        defaultValue={item.cargo}
                        className="w-full p-2 border-0 focus:ring-0"
                        disabled={pending}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 h-16"></td>
                    <td className="border border-gray-300 p-2 text-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeInvestigador(item.id)}
                        disabled={pending || equipoInvestigador.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            type="button"
            onClick={addInvestigador}
            disabled={pending}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir Miembro
          </Button>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Guardando..." : "Finalizar y Guardar Investigación"}
        </Button>
      </form>
    </FormWrapper>
  )
}
