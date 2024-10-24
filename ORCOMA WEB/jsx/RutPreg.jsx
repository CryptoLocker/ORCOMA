"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function VideoQuiz({ videoTitle, onComplete }) {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    openQuestion: "",
  })

  const handleInputChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes manejar el envío de las respuestas, por ejemplo, enviándolas a un servidor
    console.log("Respuestas enviadas:", answers)
    onComplete()
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Cuestionario: {videoTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. ¿Cuál es el principal tema del video?</h3>
            <RadioGroup value={answers.q1} onValueChange={(value) => handleInputChange("q1", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="A" id="q1-a" />
                <Label htmlFor="q1-a">A. Técnicas de construcción</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="B" id="q1-b" />
                <Label htmlFor="q1-b">B. Seguridad en el trabajo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="C" id="q1-c" />
                <Label htmlFor="q1-c">C. Materiales de construcción</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. ¿Qué herramienta se mencionó más en el video?</h3>
            <RadioGroup value={answers.q2} onValueChange={(value) => handleInputChange("q2", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="A" id="q2-a" />
                <Label htmlFor="q2-a">A. Martillo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="B" id="q2-b" />
                <Label htmlFor="q2-b">B. Sierra eléctrica</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="C" id="q2-c" />
                <Label htmlFor="q2-c">C. Taladro</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. ¿Cuál fue el consejo más importante dado en el video?</h3>
            <RadioGroup value={answers.q3} onValueChange={(value) => handleInputChange("q3", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="A" id="q3-a" />
                <Label htmlFor="q3-a">A. Siempre usar equipo de protección</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="B" id="q3-b" />
                <Label htmlFor="q3-b">B. Planificar antes de construir</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="C" id="q3-c" />
                <Label htmlFor="q3-c">C. Mantener el área de trabajo limpia</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pregunta abierta: ¿Cómo aplicarías lo aprendido en tu trabajo?</h3>
            <Textarea
              value={answers.openQuestion}
              onChange={(e) => handleInputChange("openQuestion", e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full h-32"
            />
          </div>

          <Button type="submit" className="w-full">Enviar respuestas</Button>
        </div>
      </form>
    </div>
  )
}