"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Shield, Users, AlertTriangle, Heart, Package, Wrench, HardHat } from "lucide-react"
import { FormSelector } from "@/components/forms/form-selector"
import SSTInductionEvaluation from "@/components/forms/sst-induction-evaluation"
import { RiskIdentificationForm } from "@/components/forms/risk-identification-form"
import { InductionReinductionForm } from "@/components/forms/induction-reinduction-form"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"
import { AccidentInvestigationForm } from "@/components/forms/accident-investigation-form"
import { HealthSurveyForm } from "@/components/forms/health-survey-form"
import { LoadHandlingChecklist } from "@/components/forms/load-handling-checklist"
import { ToolsInspectionChecklist } from "@/components/forms/tools-inspection-checklist"
import { PPEInspectionChecklist } from "@/components/forms/ppe-inspection-checklist"

const formsConfig: FormConfig[] = [
  {
    id: "evaluacion",
    title: "Evaluación Inducción SST",
    description: "Evaluación de conocimientos sobre Seguridad y Salud en el Trabajo",
    icon: Shield,
  },
  {
    id: "riesgos",
    title: "Identificación de Riesgos",
    description: "Formulario para identificar riesgos en proyectos",
    icon: FileText,
  },
  {
    id: "induccion",
    title: "Inducción y Reinducción",
    description: "Registro de temas de inducción y reinducción",
    icon: Users,
  },
  {
    id: "investigacion-accidentes",
    title: "Investigación de Accidentes",
    description: "Formato de investigación de incidentes, accidentes y enfermedades laborales",
    icon: AlertTriangle,
  },
  {
    id: "encuesta-salud",
    title: "Encuesta de Condiciones de Salud",
    description: "Encuesta individual de condiciones de salud de trabajadores",
    icon: Heart,
  },
  {
    id: "checklist-cargas",
    title: "Checklist Manipulación de Cargas",
    description: "Lista de verificación para manipulación segura de cargas",
    icon: Package,
  },
  {
    id: "checklist-herramientas",
    title: "Checklist Inspección de Herramientas",
    description: "Lista de verificación para inspección de herramientas manuales y eléctricas",
    icon: Wrench,
  },
  {
    id: "checklist-epp",
    title: "Checklist Inspección de EPP",
    description: "Lista de verificación para inspección y entrega de EPP",
    icon: HardHat,
  },
]

const formComponents = {
  evaluacion: <SSTInductionEvaluation />,
  riesgos: <RiskIdentificationForm />,
  induccion: <InductionReinductionForm />,
  "investigacion-accidentes": <AccidentInvestigationForm />,
  "encuesta-salud": <HealthSurveyForm />,
  "checklist-cargas": <LoadHandlingChecklist />,
  "checklist-herramientas": <ToolsInspectionChecklist />,
  "checklist-epp": <PPEInspectionChecklist />,
}

export default function FormularioPage() {
  const [activeForm, setActiveForm] = useState("")

  const handleFormSelect = (formId: string) => {
    setActiveForm(formId)
    const selectedForm = formsConfig.find((form) => form.id === formId)
    if (selectedForm) {
      showToast.info("Formulario cargado", `${selectedForm.title} está listo para completar`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Formularios SST</h1>
          <p className="text-gray-600">Gestión de Calidad y Seguridad y Salud en el Trabajo</p>
        </motion.div>

        {/* Form Selector Cards */}
        <FormSelector forms={formsConfig} activeForm={activeForm} onFormSelect={handleFormSelect} />

        {/* Active Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          key={activeForm}
        >
          {activeForm ? (
            formComponents[activeForm as keyof typeof formComponents]
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Selecciona un formulario</h3>
                <p className="text-gray-600">
                  Haz clic en una de las tarjetas de arriba para comenzar a llenar el formulario correspondiente.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
