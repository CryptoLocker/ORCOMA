"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormWrapper } from "./form-wrapper"
import { FormField } from "./form-field"
import { generateUniqueId } from "@/utils/id-utils"
import type { FormConfig } from "@/lib/types"
import { showToast } from "@/lib/toast"

const formConfig: FormConfig = {
  id: "sst-evaluation",
  title: "EVALUACION INDUCCION SST",
  description: "Evaluación de conocimientos sobre Seguridad y Salud en el Trabajo",
  code: "TH-REG-007",
  version: "2",
  date: "20/10/2017",
}

interface FormData {
  id: string
  q1: string[]
  q2: string[]
  q3: { a: string; b: string; c: string; d: string }
  q4: string[]
  q5: { a: string; b: string; c: string; d: string }
}

const questions = {
  q1: {
    title: "1. Señale cuál de las anteriores opciones son la definición de seguridad y salud en el trabajo:",
    options: [
      { value: "a", label: "Prevenir lesiones y enfermedades causadas por las condiciones de trabajo" },
      { value: "b", label: "Proteger y promover la salud" },
      { value: "c", label: "Mejorar las condiciones y el medio ambiente de trabajo" },
      { value: "d", label: "Todas las anteriores" },
    ],
  },
  q2: {
    title: "2. Identifique que lesiones puede sufrir durante la realización de sus labores:",
    options: [
      { value: "a", label: "Golpe con el casco puesto" },
      { value: "b", label: "Fractura - Esguince" },
      { value: "c", label: "Cuerpo extraño en ojos" },
      { value: "d", label: "Lesiones osteomusculares" },
      { value: "e", label: "Perdida de peso" },
      { value: "f", label: "Resbalón" },
      { value: "g", label: "Disminución del Colesterol y glicemia" },
    ],
  },
  q4: {
    title:
      "4. Señale los elementos de protección personal que deberá usar durante la realización de su labor o cuando visito un proyecto:",
    options: [
      { value: "a", label: "Protección auditiva" },
      { value: "b", label: "Botas de seguridad con puntera" },
      { value: "c", label: "Polainas" },
      { value: "d", label: "Guantes de carnaza" },
      { value: "e", label: "Careta facial" },
      { value: "f", label: "Gafas de seguridad" },
      { value: "g", label: "Guantes plásticos" },
      { value: "h", label: "Casco de seguridad" },
      { value: "i", label: "Gorra" },
      { value: "j", label: "Camisa manga larga" },
      { value: "k", label: "Gafas para el sol" },
      { value: "l", label: "Ninguno" },
    ],
  },
}

export default function SSTInductionEvaluation() {
  const [formData, setFormData] = useState<FormData>({
    id: generateUniqueId(),
    q1: [],
    q2: [],
    q3: { a: "", b: "", c: "", d: "" },
    q4: [],
    q5: { a: "", b: "", c: "", d: "" },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckboxChange = (question: keyof Pick<FormData, "q1" | "q2" | "q4">, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [question]: prev[question].includes(value)
        ? prev[question].filter((item) => item !== value)
        : [...prev[question], value],
    }))
  }

  const handleOpenEndedChange = (question: "q3" | "q5", subQuestion: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [question]: { ...prev[question], [subQuestion]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    const loadingToastId = showToast.loading("Enviando evaluación...")

    try {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast.dismiss(loadingToastId)
      showToast.success("Evaluación enviada correctamente", "Tu evaluación SST ha sido registrada exitosamente")

      // Resetear formulario
      setFormData({
        id: generateUniqueId(),
        q1: [],
        q2: [],
        q3: { a: "", b: "", c: "", d: "" },
        q4: [],
        q5: { a: "", b: "", c: "", d: "" },
      })
    } catch (error) {
      showToast.dismiss(loadingToastId)
      showToast.error("Error al enviar", "No se pudo enviar la evaluación. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCheckboxQuestion = (questionKey: keyof Pick<FormData, "q1" | "q2" | "q4">) => {
    const question = questions[questionKey]
    return (
      <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
        <p className="font-bold">{question.title}</p>
        <div className="space-y-2 mt-2">
          {question.options.map((option) => (
            <div key={option.value} className="flex items-center">
              <Checkbox
                id={`${questionKey}-${option.value}`}
                checked={formData[questionKey].includes(option.value)}
                onCheckedChange={() => handleCheckboxChange(questionKey, option.value)}
              />
              <Label htmlFor={`${questionKey}-${option.value}`} className="ml-2">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderOpenEndedQuestion = (questionKey: "q3" | "q5", title: string) => (
    <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
      <p className="font-bold">{title}</p>
      <div className="space-y-2 mt-2">
        {["a", "b", "c", "d"].map((option) => (
          <FormField
            key={option}
            id={`${questionKey}-${option}`}
            name={`${questionKey}-${option}`}
            label={`${option})`}
            value={formData[questionKey][option as keyof (typeof formData)[questionKey]]}
            onChange={(e) => handleOpenEndedChange(questionKey, option, e.target.value)}
          />
        ))}
      </div>
    </div>
  )

  return (
    <FormWrapper config={formConfig}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {renderCheckboxQuestion("q1")}
          {renderCheckboxQuestion("q2")}
          {renderOpenEndedQuestion(
            "q3",
            "3. Enumere cuatro (4) controles que usted debe seguir para prevenir un accidente y una enfermedad de trabajo.",
          )}
          {renderCheckboxQuestion("q4")}
          {renderOpenEndedQuestion(
            "q5",
            "5. Indique que hacer en caso de presentarse un AT y cual es la entidad que lo atiende:",
          )}
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Evaluación"}
        </Button>
      </form>
    </FormWrapper>
  )
}
