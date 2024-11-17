'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { BarChart, Users, VideoIcon, HelpCircle, FileText, Menu, AlertCircle, Trash, Edit, FileIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('videos')
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoDescription, setNewVideoDescription] = useState('')
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [deletedVideoTitle, setDeletedVideoTitle] = useState('')

  // Mock data for videos
  const [videos, setVideos] = useState([
    { id: 1, title: 'Técnicas avanzadas de albañilería', views: 1500, completionRate: '85%' },
    { id: 2, title: 'Seguridad en obras de gran altura', views: 2000, completionRate: '78%' },
    { id: 3, title: 'Instalación eficiente de sistemas eléctricos', views: 1200, completionRate: '92%' },
  ])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobileMenuOpen && !event.target.closest('.sidebar')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isMobileMenuOpen])

  const handleGenerateReport = async () => {
    if (!reportType || !dateRange.start || !dateRange.end) {
      toast({
        title: "Error",
        description: "Por favor, seleccione el tipo de reporte y el rango de fechas.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingReport(true)
    try {
      await generateReport(reportType, dateRange.start, dateRange.end)
      toast({
        title: "Éxito",
        description: "El reporte se ha generado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al generar el reporte. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const handleEditVideo = (video) => {
    setSelectedVideo(video)
    setNewVideoTitle(video.title)
    setIsEditDialogOpen(true)
  }

  const handleUpdateVideo = () => {
    if (selectedVideo) {
      const updatedVideos = videos.map(video => 
        video.id === selectedVideo.id ? { ...video, title: newVideoTitle } : video
      )
      setVideos(updatedVideos)
      setIsEditDialogOpen(false)
      toast({
        title: "Éxito",
        description: "El video ha sido actualizado correctamente.",
      })
    }
  }

  const handleDeleteVideo = (video) => {
    setSelectedVideo(video)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteVideo = () => {
    if (selectedVideo) {
      const updatedVideos = videos.filter(video => video.id !== selectedVideo.id)
      setVideos(updatedVideos)
      setIsDeleteDialogOpen(false)
      setDeletedVideoTitle(selectedVideo.title)
      setIsSuccessDialogOpen(true)
    }
  }

  const handleAddVideo = () => {
    const newVideo = {
      id: videos.length + 1,
      title: newVideoTitle,
      views: 0,
      completionRate: '0%'
    }
    setVideos([...videos, newVideo])
    setNewVideoTitle('')
    setNewVideoDescription('')
    toast({
      title: "Éxito",
      description: "El nuevo video ha sido agregado correctamente.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header for mobile */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">ORCOMA S.A.S</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          sidebar fixed lg:static inset-y-0 left-0 z-50
          w-64 transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#1e3a8a] text-white
        `}>
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-blue-800">
              <span className="text-2xl font-bold text-orange-500">ORCOMA S.A.S</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              <Button 
                variant="ghost"
                onClick={() => setActiveSection('videos')}
                className={`w-full justify-start gap-2 ${
                  activeSection === 'videos' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                }`}
              >
                <VideoIcon className="h-5 w-5" />
                Gestión de Videos
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setActiveSection('questions')}
                className={`w-full justify-start gap-2 ${
                  activeSection === 'questions' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                Gestión de Preguntas
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setActiveSection('stats')}
                className={`w-full justify-start gap-2 ${
                  activeSection === 'stats' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                }`}
              >
                <BarChart className="h-5 w-5" />
                Estadísticas
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setActiveSection('reports')}
                className={`w-full justify-start gap-2 ${
                  activeSection === 'reports' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                }`}
              >
                <FileText className="h-5 w-5" />
                Reportes
              </Button>
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Administrador</p>
                  <p className="text-sm text-gray-300">admin@orcoma.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-2xl text-orange-700">
                {activeSection === 'videos' && 'Gestión de Videos'}
                {activeSection === 'questions' && 'Gestión de Preguntas'}
                {activeSection === 'stats' && 'Estadísticas de Usuarios'}
                {activeSection === 'reports' && 'Generación de Reportes'}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              {activeSection === 'videos' && (
                <div className="space-y-6">
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
                      {videos.map((video) => (
                        <TableRow key={video.id}>
                          <TableCell>{video.title}</TableCell>
                          <TableCell>{video.views}</TableCell>
                          <TableCell>{video.completionRate}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditVideo(video)}>
                              <Edit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteVideo(video)}>
                              <Trash className="h-4 w-4 mr-1" /> Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Video</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="newVideoTitle">Título del Video</Label>
                        <Input
                          id="newVideoTitle"
                          value={newVideoTitle}
                          onChange={(e) => setNewVideoTitle(e.target.value)}
                          placeholder="Ingrese el título del nuevo video"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newVideoDescription">Descripción del Video</Label>
                        <Textarea
                          id="newVideoDescription"
                          value={newVideoDescription}
                          onChange={(e) => setNewVideoDescription(e.target.value)}
                          placeholder="Ingrese la descripción del nuevo video"
                        />
                      </div>
                      <div>
                        <Label htmlFor="videoFile">Archivo de Video</Label>
                        <div className="mt-2">
                          <label 
                            htmlFor="videoFile" 
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileIcon className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Arrastre y suelte el archivo aquí</span>
                              </p>
                              <p className="text-xs text-gray-500">o</p>
                              <p className="text-sm text-blue-600 hover:underline">seleccione un archivo</p>
                            </div>
                            <Input
                              id="videoFile"
                              type="file"
                              className="hidden"
                              accept="video/*"
                              onChange={(e) => {
                                // El integrador manejará la lógica de carga del archivo aquí
                                console.log('Archivo seleccionado:', e.target.files[0])
                              }}
                            />
                          </label>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Formatos soportados: MP4, WebM, MKV (máx. 2GB)
                        </p>
                      </div>
                      <Button onClick={handleAddVideo} className="bg-orange-500 hover:bg-orange-600 text-white">
                        Agregar Video
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'questions' && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Próximamente</AlertTitle>
                  <AlertDescription>
                    La gestión de preguntas estará disponible en próximas versiones. Estamos desarrollando funcionalidades avanzadas para mejorar la interacción con tus usuarios.
                  </AlertDescription>
                </Alert>
              )}

              {activeSection === 'stats' && (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                  <p className="text-xl text-gray-600">Las estadísticas de usuarios se mostrarán aquí.</p>
                  <p className="text-gray-500">Esta sección está en desarrollo.</p>
                </div>
              )}

              {activeSection === 'reports' && (
                <form className="space-y-6">
                  <div>
                    <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Reporte
                    </label>
                    <Select onValueChange={(value) => setReportType(value)}>
                      <SelectTrigger id="reportType" className="w-full">
                        <SelectValue placeholder="Selecciona el tipo de reporte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user-progress">Progreso de Usuarios</SelectItem>
                        <SelectItem value="course-completion">Finalización de Cursos</SelectItem>
                        <SelectItem value="video-analytics">Analíticas de Videos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Inicio
                      </label>
                      <Input 
                        type="date" 
                        id="startDate" 
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        required 
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Fin
                      </label>
                      <Input 
                        type="date" 
                        id="endDate" 
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        required 
                        className="w-full"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleGenerateReport} 
                    disabled={isGeneratingReport}
                    className={`w-full ${isGeneratingReport ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
                  >
                    {isGeneratingReport ? 'Generando...' : 'Generar Reporte'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Edit Video Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Video</DialogTitle>
            <DialogDescription>
              Actualiza el título del video seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="editVideoTitle" className="text-right">
              Nuevo Título
            </Label>
            <Input
              id="editVideoTitle"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateVideo}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Video Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de eliminar el video?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el video "{selectedVideo?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteVideo}>Sí, eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Eliminado</DialogTitle>
            <DialogDescription>
              El video "{deletedVideoTitle}" ha sido eliminado satisfactoriamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}