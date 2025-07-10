"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { riskIdentificationFormAction } from "@/lib/actions"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "risk-identification",
  title: "GESTIÓN DE CALIDAD Y SST",
  description: "Formulario: Identificación de Riesgos - PROYECTOS",
  code: "GCSST-REG-062",
  version: "1",
  date: "1/03/2024",
}

const initialState = {
  defaultValues: {
    sugerencias: "",
    riesgos: {},
  },
  success: false,
  errors: null,
}

const riskCategories = [
  {
    title: "RIESGOS FÍSICOS",
    subcategories: [
      {
        title: "Ruido",
        risks: [
          { id: "continuo_intermitente", label: "Continuo Intermitente" },
          { id: "impacto", label: "De Impacto" },
        ],
      },
      {
        title: "Iluminación",
        risks: [
          { id: "exceso", label: "Exceso" },
          { id: "deficiencia", label: "Deficiencia" },
        ],
      },
      {
        title: "Vibración",
        risks: [
          { id: "cuerpo_entero", label: "Cuerpo entero" },
          { id: "segmentaria", label: "Segmentaria" },
        ],
      },
      {
        title: "Temperaturas extremas",
        risks: [
          { id: "calor", label: "Calor" },
          { id: "frio", label: "Frío" },
        ],
      },
      {
        title: "Radiaciones no ionizantes",
        risks: [
          { id: "ultravioleta", label: "Ultravioleta" },
          { id: "infrarroja", label: "Infrarroja" },
          { id: "radiofrecuencia", label: "Radiofrecuencia" },
        ],
      },
    ],
  },
  {
    title: "RIESGOS QUÍMICOS",
    subcategories: [
      {
        title: "Gases y vapores",
        risks: [
          { id: "gases", label: "Gases" },
          { id: "vapores", label: "Vapores" },
        ],
      },
      {
        title: "Aerosoles",
        risks: [
          { id: "polvos_organicos", label: "Polvos orgánicos" },
          { id: "polvos_inorganicos", label: "Polvos inorgánicos" },
          { id: "humos_metalicos", label: "Humos metálicos" },
          { id: "humos_no_metalicos", label: "Humos no metálicos" },
          { id: "nieblas", label: "Nieblas" },
          { id: "rocios", label: "Rocíos" },
        ],
      },
      {
        title: "Líquidos",
        risks: [
          { id: "nieblas", label: "Nieblas" },
          { id: "rocio", label: "Rocío" },
        ],
      },
    ],
  },
  {
    title: "RIESGOS BIOLÓGICOS",
    subcategories: [
      {
        title: "Microorganismos",
        risks: [
          { id: "virus", label: "Virus" },
          { id: "bacterias", label: "Bacterias" },
          { id: "hongos", label: "Hongos" },
          { id: "parasitos", label: "Parásitos" },
        ],
      },
      {
        title: "Fluidos o tejidos corporales",
        risks: [
          { id: "sangre", label: "Sangre" },
          { id: "saliva", label: "Saliva" },
          { id: "orina", label: "Orina" },
          { id: "heces", label: "Heces" },
        ],
      },
      {
        title: "Picaduras y mordeduras",
        risks: [
          { id: "picaduras", label: "Picaduras" },
          { id: "mordeduras", label: "Mordeduras" },
        ],
      },
    ],
  },
  {
    title: "RIESGOS BIOMECÁNICOS",
    subcategories: [
      {
        title: "Esfuerzo",
        risks: [
          { id: "posturas", label: "Posturas (prolongadas, mantenidas, forzadas, antigravitacionales)" },
          { id: "movimientos", label: "Movimientos repetitivos" },
          { id: "fuerza", label: "Fuerza" },
        ],
      },
      {
        title: "Carga física",
        risks: [{ id: "manipulacion_cargas", label: "Manipulación manual de cargas" }],
      },
    ],
  },
  {
    title: "RIESGOS DE SEGURIDAD",
    subcategories: [
      {
        title: "Mecánico",
        risks: [
          { id: "elementos_maquinas", label: "Elementos de máquinas" },
          { id: "herramientas", label: "Herramientas" },
          { id: "materiales_proyectados", label: "Materiales proyectados sólidos o fluidos" },
        ],
      },
      {
        title: "Eléctrico",
        risks: [
          { id: "alta_baja_tension", label: "Alta y baja tensión" },
          { id: "estatica", label: "Estática" },
        ],
      },
      {
        title: "Locativo",
        risks: [
          { id: "almacenamiento", label: "Almacenamiento" },
          {
            id: "superficies_trabajo",
            label: "Superficies de trabajo (irregulares, deslizantes, con diferencia de nivel)",
          },
          { id: "condiciones_orden_aseo", label: "Condiciones de orden y aseo" },
          { id: "caida_objetos", label: "Caída de objetos" },
        ],
      },
      {
        title: "Tecnológico",
        risks: [
          { id: "explosion", label: "Explosión" },
          { id: "fuga", label: "Fuga" },
          { id: "derrame", label: "Derrame" },
          { id: "incendio", label: "Incendio" },
        ],
      },
      {
        title: "Tránsito",
        risks: [
          { id: "vehiculos", label: "Vehículos" },
          { id: "peatones", label: "Peatones" },
        ],
      },
      {
        title: "Trabajo en alturas",
        risks: [{ id: "caida_alturas", label: "Caída de alturas" }],
      },
    ],
  },
  {
    title: "RIESGOS FENÓMENOS NATURALES",
    risks: [
      { id: "sismo", label: "Sismo" },
      { id: "terremoto", label: "Terremoto" },
      { id: "vendaval", label: "Vendaval" },
      { id: "inundacion", label: "Inundación" },
      { id: "derrumbe", label: "Derrumbe" },
      { id: "precipitaciones", label: "Precipitaciones (lluvias, granizadas)" },
    ],
  },
  {
    title: "RIESGOS PÚBLICOS",
    risks: [
      { id: "atentados", label: "Atentados" },
      { id: "asaltos", label: "Asaltos" },
      { id: "desorden_publico", label: "Desorden público" },
      { id: "secuestro", label: "Secuestro" },
    ],
  },
  {
    title: "RIESGO PSICOSOCIAL",
    risks: [
      {
        id: "gestion_organizacional",
        label: "Gestión organizacional (estilo de mando, pago, contratación, participación, inducción y capacitación)",
      },
      {
        id: "caracteristicas_grupo_trabajo",
        label: "Características del grupo de trabajo (cohesión, relaciones, conflicto)",
      },
      {
        id: "condiciones_tarea",
        label:
          "Condiciones de la tarea (carga mental, contenido del trabajo, demandas emocionales, sistemas de control)",
      },
      {
        id: "interfase_persona_tarea",
        label: "Interfase persona tarea (conocimientos, habilidades frente a las demandas de la tarea)",
      },
      { id: "jornada_trabajo", label: "Jornada de trabajo (pausas, descansos, horas extras, rotación)" },
    ],
  },
]

export function RiskIdentificationForm() {
  const [state, formAction, pending] = React.useActionState(riskIdentificationFormAction, initialState)

  React.useEffect(() => {
    if (state.success) {
      showToast.success("Formulario enviado correctamente", "La identificación de riesgos ha sido registrada")
    }
  }, [state.success])

  const renderRiskSection = (category: (typeof riskCategories)[0]) => (
    <div key={category.title} className="space-y-4">
      <h4 className="text-lg font-bold text-orange-500">{category.title}</h4>
      {category.subcategories ? (
        category.subcategories.map((subcategory) => (
          <div key={subcategory.title}>
            <h5 className="font-bold text-blue-600">{subcategory.title}</h5>
            <div className="grid grid-cols-2 gap-2">
              {subcategory.risks.map((risk) => (
                <div key={risk.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={risk.id}
                    name={`riesgos.${category.title.toLowerCase()}.${subcategory.title.toLowerCase()}.${risk.id}`}
                    disabled={pending}
                  />
                  <Label htmlFor={risk.id}>{risk.label}</Label>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={`grid gap-2 ${category.title === "RIESGO PSICOSOCIAL" ? "grid-cols-1" : "grid-cols-2"}`}>
          {category.risks?.map((risk) => (
            <div key={risk.id} className="flex items-center space-x-2">
              <Checkbox id={risk.id} name={`riesgos.${category.title.toLowerCase()}.${risk.id}`} disabled={pending} />
              <Label htmlFor={risk.id}>{risk.label}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <FormWrapper config={formConfig}>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p>
          <strong>OBJETIVO:</strong> Identificar los RIESGOS relacionados con las ocupaciones o actividades rutinarias y
          no rutinarias que desempeñan todos los cargos o niveles de la organización.
        </p>
        <p>
          <strong>ALCANCE:</strong> Aplica a todos los niveles y cargos de la empresa.
        </p>
        <p>
          <strong>APLICACIÓN:</strong> Al iniciar cada proyecto
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            id="identificacion"
            name="identificacion"
            label="N° de Identificación:"
            disabled={pending}
            required
          />
          <FormField id="nombre" name="nombre" label="Nombre Completo:" disabled={pending} required />
          <FormField id="fecha" name="fecha" label="Fecha:" type="date" disabled={pending} required />
          <FormField id="cargo" name="cargo" label="Cargo:" disabled={pending} required />
          <FormField id="proyecto" name="proyecto" label="Proyecto:" disabled={pending} required />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Género:</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="genero_f"
                  name="genero"
                  value="femenino"
                  className="h-4 w-4"
                  disabled={pending}
                />
                <Label htmlFor="genero_f">Femenino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="genero_m"
                  name="genero"
                  value="masculino"
                  className="h-4 w-4"
                  disabled={pending}
                />
                <Label htmlFor="genero_m">Masculino</Label>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6">IDENTIFICACIÓN DE PELIGROS Y RIESGOS</h3>
        <p>
          Marque únicamente los RIESGOS a los que se expone en su ocupación o mientras realiza sus labores rutinarias y
          no rutinarias en este proyecto.
        </p>

        {riskCategories.map(renderRiskSection)}

        <div className="space-y-4">
          <FormField
            id="observaciones"
            name="observaciones"
            label="Observaciones:"
            multiline
            rows={4}
            disabled={pending}
          />
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

        <FormField
          id="sugerencias"
          name="sugerencias"
          label="QUE HACER PARA MINIMIZAR LOS RIESGOS:"
          defaultValue={state.defaultValues.sugerencias}
          disabled={pending}
          error={state.errors?.sugerencias}
          multiline
          rows={4}
        />

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={pending}>
          {pending ? "Enviando..." : "FIRMA DE TRABAJADOR"}
        </Button>
      </form>
    </FormWrapper>
  )
}
