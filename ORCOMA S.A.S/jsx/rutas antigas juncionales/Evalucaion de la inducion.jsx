import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SSTInductionEvaluation() {
  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    cargo: '',
    area: '',
    fecha: '',
    induccion: '',
    q1: [],
    q2: [],
    q3: { a: '', b: '', c: '', d: '' },
    q4: [],
    q5: { a: '', b: '', c: '', d: '' },
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleCheckboxChange = (question: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [question]: prevData[question].includes(value)
        ? prevData[question].filter(item => item !== value)
        : [...prevData[question], value]
    }))
  }

  const handleOpenEndedChange = (question: string, subQuestion: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [question]: { ...prevData[question], [subQuestion]: value }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center border-b border-orange-500 pb-4">
          <CardTitle className="text-2xl text-orange-500">EVALUACION INDUCCION SST</CardTitle>
          <p>Código: TH-REG-007 | Versión: 2 | Fecha: 20/10/2017</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">NOMBRE Y APELLIDO:</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cedula">N° CEDULA:</Label>
                <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cargo">CARGO:</Label>
                <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="area">AREA/SECCION:</Label>
                <Input id="area" name="area" value={formData.area} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="fecha">FECHA:</Label>
                <Input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="induccion">INDUCCIÓN:</Label>
                <Input id="induccion" name="induccion" value={formData.induccion} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
                <p className="font-bold">1. Señale cuál de las anteriores opciones son la definición de seguridad y salud en el trabajo:</p>
                <div className="space-y-2 mt-2">
                  {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option} className="flex items-center">
                      <Checkbox
                        id={`q1-${option}`}
                        checked={formData.q1.includes(option)}
                        onCheckedChange={() => handleCheckboxChange('q1', option)}
                      />
                      <Label htmlFor={`q1-${option}`} className="ml-2">
                        {option === 'a' && 'Prevenir lesiones y enfermedades causadas por las condiciones de trabajo'}
                        {option === 'b' && 'Proteger y promover la salud'}
                        {option === 'c' && 'Mejorar las condiciones y el medio ambiente de trabajo'}
                        {option === 'd' && 'Todas las anteriores'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
                <p className="font-bold">2. Identifique que lesiones puede sufrir durante la realización de sus labores:</p>
                <div className="space-y-2 mt-2">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((option) => (
                    <div key={option} className="flex items-center">
                      <Checkbox
                        id={`q2-${option}`}
                        checked={formData.q2.includes(option)}
                        onCheckedChange={() => handleCheckboxChange('q2', option)}
                      />
                      <Label htmlFor={`q2-${option}`} className="ml-2">
                        {option === 'a' && 'Golpe con el casco puesto'}
                        {option === 'b' && 'Fractura - Esguince'}
                        {option === 'c' && 'Cuerpo extraño en ojos'}
                        {option === 'd' && 'Lesiones osteomusculares'}
                        {option === 'e' && 'Perdida de peso'}
                        {option === 'f' && 'Resbalón'}
                        {option === 'g' && 'Disminución del Colesterol y glicemia'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
                <p className="font-bold">3. Enumere cuatro (4) controles que usted debe seguir para prevenir un accidente y una enfermedad de trabajo.</p>
                <div className="space-y-2 mt-2">
                  {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option}>
                      <Label htmlFor={`q3-${option}`}>{option})</Label>
                      <Input
                        id={`q3-${option}`}
                        value={formData.q3[option]}
                        onChange={(e) => handleOpenEndedChange('q3', option, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
                <p className="font-bold">4. Señale los elementos de protección personal que deberá usar durante la realización de su labor o cuando visito un proyecto:</p>
                <div className="space-y-2 mt-2">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'].map((option) => (
                    <div key={option} className="flex items-center">
                      <Checkbox
                        id={`q4-${option}`}
                        checked={formData.q4.includes(option)}
                        onCheckedChange={() => handleCheckboxChange('q4', option)}
                      />
                      <Label htmlFor={`q4-${option}`} className="ml-2">
                        {option === 'a' && 'Protección auditiva'}
                        {option === 'b' && 'Botas de seguridad con puntera'}
                        {option === 'c' && 'Polainas'}
                        {option === 'd' && 'Guantes de carnaza'}
                        {option === 'e' && 'Careta facial'}
                        {option === 'f' && 'Gafas de seguridad'}
                        {option === 'g' && 'Guantes plásticos'}
                        {option === 'h' && 'Casco de seguridad'}
                        {option === 'i' && 'Gorra'}
                        {option === 'j' && 'Camisa manga larga'}
                        {option === 'k' && 'Gafas para el sol'}
                        {option === 'l' && 'Ninguno'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-md border-l-4 border-orange-500">
                <p className="font-bold">5. Indique que hacer en caso de presentarse un AT y cual es la entidad que lo atiende:</p>
                <div className="space-y-2 mt-2">
                  {['a', 'b', 'c', 'd'].map((option) => (
                    <div key={option}>
                      <Label htmlFor={`q5-${option}`}>{option}.</Label>
                      <Input
                        id={`q5-${option}`}
                        value={formData.q5[option]}
                        onChange={(e) => handleOpenEndedChange('q5', option, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">Enviar Evaluación</Button>
          </form>

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-500 text-white text-center rounded-md font-bold">
              EVALUACIÓN ENVIADA
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}