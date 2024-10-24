'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

/**
 * Componente AdminDashboard
 * 
 * Este componente representa el panel de administración principal para ORCOMA S.A.S.
 * Permite a los administradores gestionar videos, preguntas, ver estadísticas y agregar contenido.
 */
export default function AdminDashboard() {
  // Estado para controlar qué sección está activa
  const [activeSection, setActiveSection] = useState('videos')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - ORCOMA S.A.S</h1>

      {/* Barra de navegación */}
      <nav className="mb-4">
        <div className="grid w-full grid-cols-4 gap-2">
          {/* Botones de navegación. Cada botón actualiza la sección activa cuando se hace clic */}
          <Button 
            variant={activeSection === 'videos' ? 'default' : 'outline'}
            onClick={() => setActiveSection('videos')}
          >
            Gestión de Videos
          </Button>
          <Button 
            variant={activeSection === 'questions' ? 'default' : 'outline'}
            onClick={() => setActiveSection('questions')}
          >
            Gestión de Preguntas
          </Button>
          <Button 
            variant={activeSection === 'stats' ? 'default' : 'outline'}
            onClick={() => setActiveSection('stats')}
          >
            Estadísticas de Usuarios
          </Button>
          <Button 
            variant={activeSection === 'content' ? 'default' : 'outline'}
            onClick={() => setActiveSection('content')}
          >
            Agregar Contenido
          </Button>
        </div>
      </nav>

      {/* Sección de Gestión de Videos */}
      {activeSection === 'videos' && (
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Videos</CardTitle>
            <p className="text-muted-foreground">Administra los videos de la plataforma</p>
          </CardHeader>
          <CardContent>
            {/* Tabla de videos */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Visualizaciones</TableHead>
                  <TableHead>Tasa de Finalización</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Filas de ejemplo. En una implementación real, estas se generarían dinámicamente */}
                <TableRow>
                  <TableCell>Técnicas avanzadas de albañilería</TableCell>
                  <TableCell>1500</TableCell>
                  <TableCell>85%</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </TableCell>
                </TableRow>
                {/* ... más filas de videos ... */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Sección de Gestión de Preguntas */}
      {activeSection === 'questions' && (
        <Card>
          <CardHeader>
            <CardTitle>Agregar Nueva Pregunta</CardTitle>
            <p className="text-muted-foreground">Crea una nueva pregunta asociada a un video</p>
          </CardHeader>
          <CardContent>
            {/* Formulario para agregar una nueva pregunta */}
            <form className="space-y-4">
              <div>
                <label htmlFor="videoId" className="block mb-1">Video Asociado</label>
                <Select>
                  <SelectTrigger id="videoId">
                    <SelectValue placeholder="Selecciona un video" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Técnicas avanzadas de albañilería</SelectItem>
                    <SelectItem value="2">Seguridad en obras de gran altura</SelectItem>
                    <SelectItem value="3">Instalación eficiente de sistemas eléctricos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="question" className="block mb-1">Pregunta</label>
                <Input type="text" id="question" required />
              </div>
              <div>
                <label htmlFor="answer" className="block mb-1">Respuesta Correcta</label>
                <Input type="text" id="answer" required />
              </div>
              <Button type="submit">Agregar Pregunta</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Sección de Estadísticas de Usuarios */}
      {activeSection === 'stats' && (
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Usuarios</CardTitle>
            <p className="text-muted-foreground">Visualiza las estadísticas de uso de la plataforma</p>
          </CardHeader>
          <CardContent>
            {/* Placeholder para las estadísticas de usuarios */}
            <p>Aquí se mostrarían las estadísticas de usuarios. Esta sección está pendiente de implementación.</p>
          </CardContent>
        </Card>
      )}

      {/* Sección para Agregar Contenido (Nuevo Video) */}
      {activeSection === 'content' && (
        <Card>
          <CardHeader>
            <CardTitle>Agregar Nuevo Video</CardTitle>
            <p className="text-muted-foreground">Sube un nuevo video a la plataforma</p>
          </CardHeader>
          <CardContent>
            {/* Formulario para agregar un nuevo video */}
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1">Título del Video</label>
                <Input type="text" id="title" required />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">Descripción</label>
                <Textarea id="description" rows={4} required />
              </div>
              <Button type="submit">Agregar Video</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}