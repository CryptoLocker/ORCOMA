import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

const inductionTopics = [
  "Presentación de la empresa.",
  "Reseña histórica de la empresa",
  "Misión y visión de la Organización",
  "Aspectos Generales SG-SST",
  "Que es el SG-SST",
  "Desarrollo del SG-SST",
  "Aspectos Legales del Sistema de gestión de Seguridad y Salud en el Trabajo",
  "Política de Seguridad y Salud en el Trabajo (Se hace entrega en Físico)",
  "Objetivos y metas de la políticas de la seguridad y salud en el trabajo",
  "Política de prevención del Abuso de Alcohol, Drogas No uso de Sustancias Psicoactivas y Espacios libres de Humo de Tabaco (se hace entrega en físico)",
  "Procedimiento, mecanismos y medios para presentar quejas por la vulneración del derecho a nombre propio o anónimo, tramite de la queja y debido cuidado con la participación directa de los miembros del comité de convivencia",
  "Reglamento de higiene y seguridad industrial normativa resolución 2400 del año 1989",
  "Nivel de riesgo al que está expuesto el trabajador en su lugar de trabajo o ejerciendo sus funciones",
  "Clasificación de los riesgos: Riesgo Biomecánica, mecánico, publico, físico, químico, psicosocial, biológico, condiciones de seguridad",
  "Elementos de protección personal y sus principales objetivos",
  "Instrucciones para el uso y mantenimiento de EPP",
  "Funcionamiento del comité paritario de seguridad y salud en el trabajo",
  "Principales funciones del COPASST",
  "Comité de convivencia laboral",
  "Principales funciones del comité de convivencia laboral",
  "Plan de emergencia y clases de emergencias",
  "Qué hacer en caso de una emergencia",
  "Conceptos básicos: ARL, EPS, AFP, enfermedad laboral, peligro, riesgo, incidente, accidente de trabajo, acto inseguro, condiciones inseguras, condiciones de salud desfavorable",
  "Auto reporte de condiciones de trabajo y salud",
  "Responsabilidades del trabajador frente al SG-SST",
  "Normas de seguridad generales en SST",
  "Protocolo de levantamiento manual de cargas",
  "Uso adecuado de herramientas manuales",
  "Clasificación de los riesgos: Riesgo Biomecánico, mecánico, público, físico, químico, psicosocial, biológico, condiciones de seguridad",
  "Elementos de protección personal y sus principales objetivos",
  "Instrucciones para el uso y mantenimiento de EPP",
  "Funcionamiento del comité paritario de seguridad y salud en el trabajo",
  "Principales funciones del COPASST",
  "Comité de convivencia laboral"
]

export default function InductionReinductionForm() {
  const [formData, setFormData] = useState({
    name: '',
    empresa: '',
    fecha: '',
    cargo: '',
    tipo: '',
    topics: Array(inductionTopics.length).fill(''),
    riskLevel: '',
    anotacion: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
}

const handleTopicChange = (index, value) => {
    setFormData(prevData => {
      const newTopics = [...prevData.topics]
      newTopics[index] = value
      return { ...prevData, topics: newTopics }
    })
}
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log('Formulario enviado:', formData)
  // Aquí se implementaría la lógica para enviar los datos al servidor
}

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center border-b border-orange-500 pb-4">
          <CardTitle className="text-2xl text-orange-500">GESTIÓN DE CALIDAD Y SST</CardTitle>
          <p>TEMAS DE LA INDUCCIÓN Y REINDUCCIÓN</p>
          <p>CÓDIGO: GCSST-REG-058 | VERSIÓN: 1 | FECHA: 08/08/2023</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">NOMBRES Y APELLIDOS:</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="empresa">EMPRESA:</Label>
                <Input id="empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="fecha">FECHA:</Label>
                <Input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cargo">CARGO:</Label>
                <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label>TIPO:</Label>
              <RadioGroup name="tipo" value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="induccion" id="tipo-induccion" />
                  <Label htmlFor="tipo-induccion">INDUCCIÓN</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reinduccion" id="tipo-reinduccion" />
                  <Label htmlFor="tipo-reinduccion">REINDUCCIÓN</Label>
                </div>
              </RadioGroup>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>TEMAS DE LA INDUCCIÓN Y REINDUCCIÓN</TableHead>
                  <TableHead>SI</TableHead>
                  <TableHead>NO</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inductionTopics.map((topic, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{topic}</TableCell>
                    <TableCell>
                      <RadioGroup
                        name={`topic-${index}`}
                        value={formData.topics[index]}
                        onValueChange={(value) => handleTopicChange(index, value)}
                        className="flex justify-center"
                      >
                        <RadioGroupItem value="si" id={`topic-${index}-si`} />
                      </RadioGroup>
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        name={`topic-${index}`}
                        value={formData.topics[index]}
                        onValueChange={(value) => handleTopicChange(index, value)}
                        className="flex justify-center"
                      >
                        <RadioGroupItem value="no" id={`topic-${index}-no`} />
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div>
              <Label htmlFor="riskLevel">Nivel de riesgo:</Label>
              <Select 
                value={formData.riskLevel} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Nivel 1</SelectItem>
                  <SelectItem value="2">Nivel 2</SelectItem>
                  <SelectItem value="3">Nivel 3</SelectItem>
                  <SelectItem value="4">Nivel 4</SelectItem>
                  <SelectItem value="5">Nivel 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="anotacion">ANOTACIÓN DEL TRABAJADOR:</Label>
              <Textarea 
                id="anotacion" 
                name="anotacion" 
                value={formData.anotacion} 
                onChange={(e) => setFormData(prev => ({ ...prev, anotacion: e.target.value }))} 
                rows={4}
              />
            </div>

            <p className="font-bold">NOTA: Por motivos de ley es obligatorio que usted tenga la información clara y veraz de cada tema antes dicho. Se compromete usted como trabajador, a cumplir cada uno de estos ítems.</p>

            <Button type="submit" className="w-full">Enviar Formulario</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}