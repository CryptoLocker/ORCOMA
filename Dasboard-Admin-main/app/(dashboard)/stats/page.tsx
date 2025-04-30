"use client"

import { useState, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, UserIcon, EyeIcon, FileTextIcon, CheckIcon, XIcon } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

// Importación dinámica para componentes pesados
const Calendar = dynamic(() => import("@/components/ui/calendar").then((mod) => mod.Calendar), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Cargando calendario...</div>,
})

interface Usuario {
  id: number
  nombre: string
  cargo: string
  tema: string
  fecha: string
  realizado: boolean
}

// Número de elementos por página
const ITEMS_PER_PAGE = 10

export default function StatsPage() {
  // Estados para filtros
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [cargo, setCargo] = useState<string>("")
  const [nombreBusqueda, setNombreBusqueda] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Estado para datos
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: "Carlos Martínez", cargo: "operario", tema: "induccion", fecha: "2024-02-08", realizado: true },
    { id: 2, nombre: "Carlos Martínez", cargo: "operario", tema: "riesgos", fecha: "2024-02-24", realizado: false },
    { id: 3, nombre: "Carlos Martínez", cargo: "operario", tema: "reinduccion", fecha: "2024-02-11", realizado: false },
    { id: 4, nombre: "Juan Pérez", cargo: "Supervisor", tema: "Inducción", fecha: "2024-02-08", realizado: true },
    { id: 5, nombre: "María García", cargo: "Operario", tema: "Riesgos", fecha: "2024-02-07", realizado: true },
  ])

  // Cargar datos de usuarios (simulación)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       // BACKEND: Aquí iría la llamada a la API para obtener los usuarios
  //       // const response = await fetch('/api/usuarios');
  //       // const data = await response.json();
  //       // setUsuarios(data);
  //
  //       // Simulación de carga
  //       await new Promise(resolve => setTimeout(resolve, 500));
  //     } catch (error) {
  //       console.error('Error al cargar usuarios:', error);
  //       toast({
  //         title: "Error",
  //         description: "No se pudieron cargar los datos. Intente nuevamente.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  // Filtrar usuarios con memoización para evitar recálculos innecesarios
  const usuariosFiltrados = useMemo(() => {
    // BACKEND: Idealmente, estos filtros se aplicarían en el backend
    return usuarios.filter((usuario) => {
      const coincideCargo = cargo ? usuario.cargo === cargo : true
      const coincideNombre = nombreBusqueda ? usuario.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase()) : true
      const coincideFecha = fecha ? usuario.fecha === format(fecha, "yyyy-MM-dd") : true

      return coincideCargo && coincideNombre && coincideFecha
    })
  }, [usuarios, cargo, nombreBusqueda, fecha])

  // Calcular estadísticas con memoización
  const estadisticas = useMemo(() => {
    // BACKEND: Estas estadísticas deberían calcularse en el backend
    return {
      totalUsuarios: new Set(usuarios.map((u) => u.nombre)).size,
      totalVisualizaciones: 24, // Este valor vendría del backend
      completados: usuarios.filter((u) => u.realizado).length,
    }
  }, [usuarios])

  // Paginación de resultados
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return usuariosFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [usuariosFiltrados, currentPage])

  // Total de páginas
  const totalPages = useMemo(() => Math.ceil(usuariosFiltrados.length / ITEMS_PER_PAGE), [usuariosFiltrados])

  // Manejadores de eventos optimizados con useCallback
  const handleDescargarPDF = useCallback(async () => {
    setIsLoading(true)
    try {
      // Llamada al endpoint del servidor para generar el PDF
      const response = await fetch('/api/generar-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          filtros: { 
            cargo, 
            nombreBusqueda, 
            fecha: fecha ? format(fecha, 'yyyy-MM-dd') : null 
          } 
        })
      });
      
      if (!response.ok) throw new Error('Error al generar PDF');
      
      // Descargar el PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'evaluaciones_orcoma.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "PDF descargado",
        description: "Se ha generado y descargado el PDF con éxito.",
      })
    } catch (error) {
      console.error("Error al generar PDF:", error)
      toast({
        title: "Error",
        description: "No se pudo generar el PDF. Intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [cargo, nombreBusqueda, fecha])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    // Scroll al inicio de la tabla
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const limpiarFiltros = useCallback(() => {
    setCargo("")
    setNombreBusqueda("")
    setFecha(undefined)
    setCurrentPage(1)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      {/* Panel de filtros */}
      <div className="w-full lg:w-64 space-y-6">
        <div className="space-y-2">
          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
            Cargo
          </label>
          <Select value={cargo} onValueChange={setCargo}>
            <SelectTrigger id="cargo" className="w-full">
              <SelectValue placeholder="Seleccionar Cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="operario">Operario</SelectItem>
              <SelectItem value="Técnico">Técnico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fecha ? format(fecha, "dd/MM/yyyy") : "dd/mm/aaaa"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus locale={es} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <Input
            id="nombre"
            placeholder="Nombre del usuario"
            value={nombreBusqueda}
            onChange={(e) => setNombreBusqueda(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="text-gray-500 hover:text-gray-700"
            onClick={limpiarFiltros}
            disabled={!cargo && !nombreBusqueda && !fecha}
          >
            Limpiar todos los filtros
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 space-y-6">
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Usuarios</p>
                <p className="text-3xl font-medium">{estadisticas.totalUsuarios}</p>
              </div>
              <UserIcon className="h-6 w-6 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Visualizaciones</p>
                <p className="text-3xl font-medium">{estadisticas.totalVisualizaciones}</p>
              </div>
              <EyeIcon className="h-6 w-6 text-gray-400" />
            </CardContent>
          </Card>
        </div>

        {/* Tabla de resultados */}
        <Card className="shadow-sm border-gray-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium">Resultados</h2>
                <p className="text-sm text-gray-500">
                  Lista detallada de usuarios y sus evaluaciones ({usuariosFiltrados.length} resultados)
                </p>
              </div>
              <Button
                onClick={handleDescargarPDF}
                className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                disabled={isLoading || usuariosFiltrados.length === 0}
              >
                {isLoading ? (
                  "Generando..."
                ) : (
                  <>
                    <FileTextIcon className="h-4 w-4" />
                    Descargar PDF
                  </>
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="py-8 text-center">Cargando datos...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Tema</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Realizado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedResults.length > 0 ? (
                        paginatedResults.map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell>{usuario.nombre}</TableCell>
                            <TableCell>{usuario.cargo}</TableCell>
                            <TableCell>{usuario.tema}</TableCell>
                            <TableCell>{usuario.fecha}</TableCell>
                            <TableCell>
                              {usuario.realizado ? (
                                <CheckIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <XIcon className="h-5 w-5 text-black" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                            No se encontraron resultados
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page ? "bg-orange-500" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
