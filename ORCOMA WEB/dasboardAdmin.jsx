"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

// Datos de ejemplo
const videos = [
  { id: 1, title: "Técnicas avanzadas de albañilería", views: 1500, completionRate: 85 },
  { id: 2, title: "Seguridad en obras de gran altura", views: 850, completionRate: 92 },
  { id: 3, title: "Instalación eficiente de sistemas eléctricos", views: 1200, completionRate: 78 },
]

const questions = [
  { id: 1, videoId: 1, question: "¿Cuál es la proporción ideal de cemento y arena para mortero?", correctAnswerRate: 75 },
  { id: 2, videoId: 1, question: "¿Qué herramienta se usa para nivelar una pared?", correctAnswerRate: 90 },
  { id: 3, videoId: 2, question: "¿A qué altura es obligatorio el uso de arnés de seguridad?", correctAnswerRate: 85 },
]

const userStats = [
  { id: 1, name: "Juan Pérez", videosWatched: 10, questionsAnswered: 30, correctAnswers: 25 },
  { id: 2, name: "María García", videosWatched: 8, questionsAnswered: 24, correctAnswers: 20 },
  { id: 3, name: "Carlos Rodríguez", videosWatched: 12, questionsAnswered: 36, correctAnswers: 33 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("videos")
  const [newVideo, setNewVideo] = useState({ title: "", description: "" })
  const [newQuestion, setNewQuestion] = useState({ videoId: "", question: "", answer: "" })

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para agregar el video a la base de datos
    console.log("Nuevo video:", newVideo)
    setNewVideo({ title: "", description: "" })
  }

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para agregar la pregunta a la base de datos
    console.log("Nueva pregunta:", newQuestion)
    setNewQuestion({ videoId: "", question: "", answer: "" })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - ConstructionTube</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos">Gestión de Videos</TabsTrigger>
          <TabsTrigger value="questions">Gestión de Preguntas</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas de Usuarios</TabsTrigger>
          <TabsTrigger value="add">Agregar Contenido</TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Videos</CardTitle>
              <CardDescription>Administra los videos de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableCell>{video.completionRate}%</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Preguntas</CardTitle>
              <CardDescription>Administra las preguntas asociadas a los videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pregunta</TableHead>
                    <TableHead>Video Asociado</TableHead>
                    <TableHead>Tasa de Respuestas Correctas</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>{videos.find(v => v.id === question.videoId)?.title}</TableCell>
                      <TableCell>{question.correctAnswerRate}%</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Usuarios</CardTitle>
              <CardDescription>Visualiza el rendimiento de los usuarios en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Videos Vistos</TableHead>
                    <TableHead>Preguntas Respondidas</TableHead>
                    <TableHead>Respuestas Correctas</TableHead>
                    <TableHead>Tasa de Acierto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userStats.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.videosWatched}</TableCell>
                      <TableCell>{user.questionsAnswered}</TableCell>
                      <TableCell>{user.correctAnswers}</TableCell>
                      <TableCell>{((user.correctAnswers / user.questionsAnswered) * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nuevo Video</CardTitle>
                <CardDescription>Sube un nuevo video a la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Video</Label>
                    <Input
                      id="title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" /> Agregar Video
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Agregar Nueva Pregunta</CardTitle>
                <CardDescription>Crea una nueva pregunta asociada a un video</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="videoId">Video Asociado</Label>
                    <select
                      id="videoId"
                      value={newQuestion.videoId}
                      onChange={(e) => setNewQuestion({ ...newQuestion, videoId: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    >
                      <option value="">Selecciona un video</option>
                      {videos.map((video) => (
                        <option key={video.id} value={video.id}>{video.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">Pregunta</Label>
                    <Input
                      id="question"
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">Respuesta Correcta</Label>
                    <Input
                      id="answer"
                      value={newQuestion.answer}
                      onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit">
                    <PlusCircle className="mr-2 h-4 w-4" /> Agregar Pregunta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}