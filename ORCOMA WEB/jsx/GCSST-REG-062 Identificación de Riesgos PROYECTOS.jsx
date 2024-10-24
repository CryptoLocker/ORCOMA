import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

/**
 * Componente FormularioIdentificacionRiesgos
 * 
 */
export default function FormularioIdentificacionRiesgos() {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    cargo: '',
    proyecto: '',
    ciudad: '',
    genero: '',
    sugerencias: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
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
          <p>Formulario: Identificación de Riesgos - PROYECTOS</p>
          <p>CÓDIGO: GCSST-REG-062 | VERSIÓN: 1 | FECHA: 1/03/2024</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <p><strong>OBJETIVO:</strong> Identificar los RIESGOS relacionados con las ocupaciones o actividades rutinarias y no rutinarias que desempeñan todos los cargos o niveles de la organización.</p>
            <p><strong>ALCANCE:</strong> Aplica a todos los niveles y cargos de la empresa.</p>
            <p><strong>APLICACIÓN:</strong> Al iniciar cada proyecto</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">NOMBRE COMPLETO:</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="identificacion">N° DE IDENTIFICACIÓN:</Label>
                <Input id="identificacion" name="identificacion" value={formData.identificacion} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cargo">CARGO:</Label>
                <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="proyecto">PROYECTO:</Label>
                <Input id="proyecto" name="proyecto" value={formData.proyecto} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="ciudad">CIUDAD:</Label>
                <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleInputChange} required />
              </div>
              <div>
                <Label>GÉNERO:</Label>
                <RadioGroup name="genero" value={formData.genero} onValueChange={(value) => setFormData(prev => ({ ...prev, genero: value }))} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="genero-m" />
                    <Label htmlFor="genero-m">M</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="F" id="genero-f" />
                    <Label htmlFor="genero-f">F</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-6">IDENTIFICACIÓN DE PELIGROS Y RIESGOS</h3>
            <p>Marque únicamente los RIESGOS a los que se expone en su ocupación o mientras realiza sus labores rutinarias y no rutinarias en este proyecto.</p>

            {/* RIESGOS FÍSICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS FÍSICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA MECÁNICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ruido" />
                    <Label htmlFor="ruido">Ruido</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vibracion" />
                    <Label htmlFor="vibracion">Vibración</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA TÉRMICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_frio" />
                    <Label htmlFor="temp_frio">Temperaturas extremas por Frío</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp_calor" />
                    <Label htmlFor="temp_calor">Temperaturas Extremas por Calor</Label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-bold text-blue-600">ENERGÍA ELECTROMECÁNICA</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_ionizantes" />
                    <Label htmlFor="rad_ionizantes">Radiaciones Ionizantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rad_no_ionizantes" />
                    <Label htmlFor="rad_no_ionizantes">Radiaciones no Ionizantes</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS QUÍMICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS QUÍMICOS</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vapores" />
                  <Label htmlFor="vapores">Vapores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fibras" />
                  <Label htmlFor="fibras">Fibras</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="polvos_humos" />
                  <Label htmlFor="polvos_humos">Polvos y Humos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="nieblas" />
                  <Label htmlFor="nieblas">Nieblas</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS BIOLÓGICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS BIOLÓGICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">MICROORGANISMOS</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="virus" />
                    <Label htmlFor="virus">Virus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bacterias" />
                    <Label htmlFor="bacterias">Bacterias</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hongos" />
                    <Label htmlFor="hongos">Hongos</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS BIOMECÁNICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS BIOMECÁNICOS</h4>
              <div>
                <h5 className="font-bold text-blue-600">CARGA FÍSICA</h5>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="posturas" />
                    <Label htmlFor="posturas">Posturas inadecuadas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="movimientos" />
                    <Label htmlFor="movimientos">Movimientos repetitivos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cargas" />
                    <Label htmlFor="cargas">Manipulación de cargas</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* RIESGOS DE SEGURIDAD */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS DE SEGURIDAD</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mecanico" />
                  <Label htmlFor="mecanico">Mecánicos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="electrico" />
                  <Label htmlFor="electrico">Eléctrico</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="locativo" />
                  <Label htmlFor="locativo">Locativos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tecnologico" />
                  <Label htmlFor="tecnologico">Físico-Químico</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS FENÓMENOS NATURALES */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS FENÓMENOS NATURALES</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sismo" />
                  <Label htmlFor="sismo">Terremotos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="inundacion" />
                  <Label htmlFor="inundacion">Inundaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="deslizamiento" />
                  <Label htmlFor="deslizamiento">Avalanchas</Label>
                </div>
              </div>
            </div>

            {/* RIESGOS PÚBLICOS */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGOS PÚBLICOS</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="hurto" />
                  <Label htmlFor="hurto">Hurto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manifestaciones" />
                  <Label htmlFor="manifestaciones">Manifestaciones</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terrorismo" />
                  <Label htmlFor="terrorismo">Terrorismo</Label>
                </div>
              </div>
            </div>

            {/* RIESGO PSICOSOCIAL */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-orange-500">RIESGO PSICOSOCIAL</h4>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="estres" />
                  <Label htmlFor="estres">Se maneja gran cantidad de información, es compleja y/o debe emplearse de manera simultánea</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="responsabilidad" />
                  <Label htmlFor="responsabilidad">Se tiene responsabilidad por manejo de dinero, bienes, salud o seguridad de otras personas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="jornadas" />
                  <Label htmlFor="jornadas">Las jornadas de trabajo son extensas, en horario nocturno y/o sin descanso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="trato" />
                  <Label htmlFor="trato">Se expone a trato  negativo del público y/o de compañeros de trabajo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="comunicacion" />
                  <Label htmlFor="comunicacion">La comunicación con otras personas es escasa y/o conflictiva</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="esfuerzo" />
                  <Label htmlFor="esfuerzo">El trabajo y las condiciones en que se realiza implica un gran esfuerzo físico y fatiga</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="sugerencias">QUE HACER PARA MINIMIZAR LOS RIESGOS:</Label>
              <Textarea 
                id="sugerencias" 
                name="sugerencias" 
                value={formData.sugerencias} 
                onChange={handleInputChange} 
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">FIRMA DE TRABAJADOR</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}