'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { BarChart, Users, VideoIcon, HelpCircle, FileText, Menu, AlertCircle, Trash, Edit, FileIcon, MessageCircle, Search, Send } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Tipos para los datos
interface Video {
  id: number;
  title: string;
  views: number;
  completionRate: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastSeen: string;
  isOnline: boolean;
}

interface Message {
  id: number;
  sender: string;
  question: string;
  answer: string;
}

export default function Component() {
  const [activeSection, setActiveSection] = useState('videos')
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newVideoTitle, setNewVideoTitle] = useState('')
  const [newVideoDescription, setNewVideoDescription] = useState('')
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [deletedVideoTitle, setDeletedVideoTitle] = useState('')

  // Estados para los datos
  const [videos, setVideos] = useState<Video[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Efecto para cargar datos iniciales
  useEffect(() => {
    // Aquí se deben hacer las llamadas al backend para obtener los datos iniciales
    fetchVideos()
    fetchMessages()
    fetchUsers()
  }, [])

  // Funciones para obtener datos del backend
  const fetchVideos = async () => {
    try {
      // Llamada al backend para obtener videos
      // const response = await fetch('/api/videos');
      // const data = await response.json();
      // setVideos(data);
      
      // Datos de ejemplo (reemplazar con la llamada real al backend)
      setVideos([
        { id: 1, title: 'Técnicas avanzadas de albañilería', views: 1500, completionRate: '85%' },
        { id: 2, title: 'Seguridad en obras de gran altura', views: 2000, completionRate: '78%' },
        { id: 3, title: 'Instalación eficiente de sistemas eléctricos', views: 1200, completionRate: '92%' },
      ])
    } catch (error) {
      console.error('Error al obtener videos:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los videos. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  const fetchMessages = async () => {
    try {
      // Llamada al backend para obtener mensajes
      // const response = await fetch('/api/messages');
      // const data = await response.json();
      // setMessages(data);
      
      // Datos de ejemplo (reemplazar con la llamada real al backend)
      setMessages([
        {
          id: 1,
          sender: "Carlos Sainz",
          question: "¿Qué opina de los riesgos de los gases?",
          answer: "Los gases en el ámbito de la construcción pueden representar riesgos significativos para la salud y la seguridad. Es crucial implementar medidas preventivas como ventilación adecuada, uso de equipos de protección personal y monitoreo constante de la calidad del aire. La formación del personal en la identificación y manejo de gases peligrosos es esencial para mitigar estos riesgos."
        },
        {
          id: 2,
          sender: "Ana Martínez",
          question: "¿Cuáles son las mejores prácticas para el manejo de residuos en obra?",
          answer: "Las mejores prácticas para el manejo de residuos en obra incluyen la clasificación adecuada de los materiales, el reciclaje cuando sea posible, la disposición segura de residuos peligrosos, y la implementación de un plan de gestión de residuos. Es importante también minimizar la generación de residuos desde la fase de planificación y considerar el uso de materiales reciclados o de bajo impacto ambiental."
        }
      ])
    } catch (error) {
      console.error('Error al obtener mensajes:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  const fetchUsers = async () => {
    try {
   
      const usersData = [
        {
          id: 1,
          name: "Carlos Sainz",
          avatar: "/placeholder.svg",
          lastMessage: "¿Qué opina de los riesgos de los gases?",
          lastSeen: "Ahora",
          isOnline: true
        },
        {
          id: 2,
          name: "Ana Martínez",
          avatar: "/placeholder.svg",
          lastMessage: "¿Cuáles son las mejores prácticas para...",
          lastSeen: "Hace 5m",
          isOnline: true
        },
        {
          id: 3,
          name: "Roberto Sánchez",
          avatar: "/placeholder.svg",
          lastMessage: "Gracias por la información sobre...",
          lastSeen: "Hace 1h",
          isOnline: false
        }
      ]
      setUsers(usersData)
      setSelectedUser(usersData[0])
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      
      if (isMobileMenuOpen && !event.target.closest('.sidebar')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
      // Aquí se debe hacer la llamada al backend para generar el reporte
      // const response = await fetch('/api/generate-report', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reportType, dateRange }),
      // });
      // const data = await response.json();
      
      // Simulación de llamada al backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Éxito",
        description: "El reporte se ha generado correctamente.",
      })
    } catch (error) {
      console.error('Error al generar reporte:', error)
      toast({
        title: "Error",
        description: "Hubo un problema al generar el reporte. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const handleEditVideo = (video: Video) => {
    setSelectedVideo(video)
    setNewVideoTitle(video.title)
    setIsEditDialogOpen(true)
  }

  const handleUpdateVideo = async () => {
    if (selectedVideo) {
      try {
        // Aquí se debe hacer la llamada al backend para actualizar el video
        // const response = await fetch(`/api/videos/${selectedVideo.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ title: newVideoTitle }),
        // });
        // const updatedVideo = await response.json();
        
        // Actualización local (reemplazar con la respuesta del backend)
        const updatedVideos = videos.map(video => 
          video.id === selectedVideo.id ? { ...video, title: newVideoTitle } : video
        )
        setVideos(updatedVideos)
        setIsEditDialogOpen(false)
        toast({
          title: "Éxito",
          description: "El video ha sido actualizado correctamente.",
        })
      } catch (error) {
        console.error('Error al actualizar video:', error)
        toast({
          title: "Error",
          description: "No se pudo actualizar el video. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteVideo = (video: Video) => {
    setSelectedVideo(video)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteVideo = async () => {
    if (selectedVideo) {
      try {
        // Aquí se debe hacer la llamada al backend para eliminar el video
        // await fetch(`/api/videos/${selectedVideo.id}`, { method: 'DELETE' });
        
        // Actualización local (reemplazar con la lógica de actualización después de la respuesta del backend)
        const updatedVideos = videos.filter(video => video.id !== selectedVideo.id)
        setVideos(updatedVideos)
        setIsDeleteDialogOpen(false)
        setDeletedVideoTitle(selectedVideo.title)
        setIsSuccessDialogOpen(true)
      } catch (error) {
        console.error('Error al eliminar video:', error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el video. Por favor, intente de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  const handleAddVideo = async () => {
    try {
      // Aquí se debe hacer la llamada al backend para agregar el nuevo video
      // const response = await fetch('/api/videos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title: newVideoTitle, description: newVideoDescription }),
      // });
      // const newVideo = await response.json();
      
      // Simulación de nuevo video (reemplazar con la respuesta del backend)
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
    } catch (error) {
      console.error('Error al agregar video:', error)
      toast({
        title: "Error",
        description: "No se pudo agregar el video. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleSendQuestion = async () => {
    if (!newQuestion.trim() || !selectedUser) return

    try {
      // Aquí se debe hacer la llamada al backend para enviar la pregunta
      // const response = await fetch('/api/messages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sender: selectedUser.name, question: newQuestion }),
      // });
      // const newMessage = await response.json();
      
      // Simulación de nuevo mensaje (reemplazar con la respuesta del backend)
      const newMessage = {
        id: messages.length + 1,
        sender: selectedUser.name,
        question: newQuestion,
        answer: "Gracias por su pregunta. Nuestro equipo la revisará y proporcionará una respuesta detallada lo antes posible."
      }

      setMessages([...messages, newMessage])
      setNewQuestion("")
    } catch (error) {
      console.error('Error al enviar pregunta:', error)
      toast({
        title: "Error",
        description: "No se pudo enviar la pregunta. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header for mobile */}
      <div className="lg:hidden bg-white shadow-md p-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">ORCOMA S.A.S</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          sidebar fixed lg:static inset-y-0 left-0 z-50
          w-64 transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#1e3a8a] text-white flex flex-col
        `}>
          <div className="flex-1 overflow-y-auto">
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
              <Button 
                variant="ghost"
                onClick={() => setActiveSection('chat')}
                className={`w-full justify-start gap-2 ${
                  activeSection === 'chat' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-800'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                Chat Interno
              </Button>
            </nav>
          </div>

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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-2xl text-orange-700">
                {activeSection === 'videos' && 'Gestión de Videos'}
                {activeSection === 'questions' && 'Gestión de Preguntas'}
                {activeSection === 'stats' && 'Estadísticas de Usuarios'}
                {activeSection === 'reports' && 'Generación de Reportes'}
                {activeSection === 'chat' && 'Chat Interno'}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-6 h-[calc(100vh-12rem)] overflow-hidden">
              {activeSection === 'videos' && (
                <ScrollArea className="h-full pr-4">
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
                                  console.log('Archivo seleccionado:', e.target.files?.[0])
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
                </ScrollArea>
              )}

              {activeSection === 'questions' && (
                <ScrollArea className="h-full">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Próximamente</AlertTitle>
                    <AlertDescription>
                      La gestión de preguntas estará disponible en próximas versiones. Estamos desarrollando funcionalidades avanzadas para mejorar la interacción con tus usuarios.
                    </AlertDescription>
                  </Alert>
                </ScrollArea>
              )}

              {activeSection === 'stats' && (
                <ScrollArea className="h-full">
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                    <p className="text-xl text-gray-600">Las estadísticas de usuarios se mostrarán aquí.</p>
                    <p className="text-gray-500">Esta sección está en desarrollo.</p>
                  </div>
                </ScrollArea>
              )}

              {activeSection === 'reports' && (
                <ScrollArea className="h-full">
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
                </ScrollArea>
              )}

              {activeSection === 'chat' && (
                <div className="h-full flex">
                  {/* Left Sidebar */}
                  <div className="w-80 border-r bg-orange-50/50 flex flex-col">
                    <div className="p-4 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Buscar conversación..."
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <ScrollArea className="flex-1">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUser(user)}
                          className={cn(
                            "w-full p-4 flex items-center gap-3 hover:bg-orange-50 transition-colors",
                            selectedUser?.id === user.id && "bg-orange-100"
                          )}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{user.lastSeen}</span>
                        </button>
                      ))}
                    </ScrollArea>
                  </div>

                  {/* Main Chat Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b bg-orange-50/30">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
                          <AvatarFallback>{selectedUser?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{selectedUser?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedUser?.isOnline ? 'En línea' : 'Desconectado'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="space-y-2">
                            <div className="flex items-start">
                              <Avatar className="mr-2">
                                <AvatarImage src={users.find(u => u.name === message.sender)?.avatar} alt={message.sender} />
                                <AvatarFallback>{message.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="bg-orange-100 rounded-lg p-3 max-w-[80%]">
                                <p className="font-semibold">{message.sender}:</p>
                                <p>{message.question}</p>
                              </div>
                            </div>
                            <div className="ml-12 bg-white rounded-lg p-3 max-w-[80%] shadow">
                              <p>{message.answer}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleSendQuestion()
                        }}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder="Escribe tu pregunta..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
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