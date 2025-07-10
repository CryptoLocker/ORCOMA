"use client"

import React from "react"
import { useState, useMemo, useCallback, useEffect, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, UserIcon, EyeIcon, FileTextIcon, CheckIcon, XIcon, Users, TrendingUp } from "lucide-react"
import { LazyCalendar } from "@/components/lazy-components"
import { LoadingDots } from "@/components/loading-dots"
import { showToast } from "@/lib/toast"

const memo = React.memo

interface Usuario {
  id: number
  nombre: string
  cargo: string
  tema: string
  fecha: string
  realizado: boolean
}

interface UsuarioAgrupado {
  nombre: string
  cargo: string
  evaluaciones: {
    tema: string
    fecha: string
    realizado: boolean
  }[]
}

// Número de elementos por página
const ITEMS_PER_PAGE = 5

// Función para agrupar usuarios
const agruparUsuarios = (usuarios: Usuario[]): UsuarioAgrupado[] => {
  const grupos = new Map<string, UsuarioAgrupado>()

  usuarios.forEach((usuario) => {
    const clave = `${usuario.nombre}-${usuario.cargo}`

    if (!grupos.has(clave)) {
      grupos.set(clave, {
        nombre: usuario.nombre,
        cargo: usuario.cargo,
        evaluaciones: [],
      })
    }

    grupos.get(clave)!.evaluaciones.push({
      tema: usuario.tema,
      fecha: usuario.fecha,
      realizado: usuario.realizado,
    })
  })

  // Ordenar alfabéticamente por nombre
  return Array.from(grupos.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
}

// Componente memoizado para la tabla agrupada
const GroupedResultsTable = memo(
  ({
    paginatedResults,
  }: {
    paginatedResults: UsuarioAgrupado[]
  }) => (
    <div className="space-y-6">
      {paginatedResults.length > 0 ? (
        paginatedResults.map((grupo, index) => (
          <Card key={`${grupo.nombre}-${grupo.cargo}`} className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              {/* Encabezado del trabajador */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-orange-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{grupo.nombre}</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {grupo.cargo} • {grupo.evaluaciones.length} evaluación{grupo.evaluaciones.length !== 1 ? "es" : ""}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completado:</span>
                    <span className="font-semibold text-orange-600">
                      {grupo.evaluaciones.filter((e) => e.realizado).length}/{grupo.evaluaciones.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabla de evaluaciones */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Tema de Evaluación</TableHead>
                      <TableHead className="font-semibold">Fecha Programada</TableHead>
                      <TableHead className="font-semibold text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grupo.evaluaciones.map((evaluacion, evalIndex) => (
                      <TableRow key={evalIndex} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{evaluacion.tema}</TableCell>
                        <TableCell>{evaluacion.fecha}</TableCell>
                        <TableCell className="text-center">
                          {evaluacion.realizado ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckIcon className="h-3 w-3 mr-1" />
                              Realizado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              <XIcon className="h-3 w-3 mr-1" />
                              Pendiente
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron resultados</p>
          </CardContent>
        </Card>
      )}
    </div>
  ),
)

GroupedResultsTable.displayName = "GroupedResultsTable"

// Componente memoizado para la paginación
const Pagination = memo(
  ({
    currentPage,
    totalPages,
    handlePageChange,
  }: {
    currentPage: number
    totalPages: number
    handlePageChange: (page: number) => void
  }) => (
    <div className="flex justify-center mt-6 gap-2">
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
            className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
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
  ),
)

Pagination.displayName = "Pagination"

export default function StatsPage() {
  // Estados para filtros
  const [fecha, setFecha] = useState<Date | undefined>(undefined)
  const [cargo, setCargo] = useState<string>("")
  const [nombreBusqueda, setNombreBusqueda] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isPdfLoading, setIsPdfLoading] = useState(false)

  // Estado para datos (datos de ejemplo expandidos)
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: "Carlos Martínez", cargo: "operario", tema: "induccion", fecha: "2024-02-08", realizado: true },
    { id: 2, nombre: "Carlos Martínez", cargo: "operario", tema: "riesgos", fecha: "2024-02-24", realizado: false },
    { id: 3, nombre: "Carlos Martínez", cargo: "operario", tema: "reinduccion", fecha: "2024-02-11", realizado: false },
    { id: 4, nombre: "Juan Pérez", cargo: "supervisor", tema: "induccion", fecha: "2024-02-08", realizado: true },
    { id: 5, nombre: "Juan Pérez", cargo: "supervisor", tema: "liderazgo", fecha: "2024-02-15", realizado: true },
    { id: 6, nombre: "María García", cargo: "operario", tema: "riesgos", fecha: "2024-02-07", realizado: true },
    { id: 7, nombre: "Ana López", cargo: "técnico", tema: "induccion", fecha: "2024-02-10", realizado: true },
    { id: 8, nombre: "Ana López", cargo: "técnico", tema: "equipos", fecha: "2024-02-20", realizado: false },
    { id: 9, nombre: "Roberto Silva", cargo: "operario", tema: "seguridad", fecha: "2024-02-12", realizado: false },
  ])

  // Hook para generar PDF
  const usePdfGenerator = () => {
    const generatePdf = async (usuarios: Usuario[]) => {
      try {
        const { generarPDF } = await import("@/lib/pdf-generator")
        return generarPDF(usuarios)
      } catch (error) {
        console.error("Error al cargar el generador de PDF:", error)
        throw error
      }
    }
    return { generatePdf }
  }

  const { generatePdf } = usePdfGenerator()

  // Simular carga de datos
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filtrar usuarios
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const coincideCargo = cargo ? usuario.cargo === cargo : true
      const coincideNombre = nombreBusqueda ? usuario.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase()) : true
      const coincideFecha = fecha ? usuario.fecha === format(fecha, "yyyy-MM-dd") : true

      return coincideCargo && coincideNombre && coincideFecha
    })
  }, [usuarios, cargo, nombreBusqueda, fecha])

  // Agrupar usuarios filtrados
  const usuariosAgrupados = useMemo(() => {
    return agruparUsuarios(usuariosFiltrados)
  }, [usuariosFiltrados])

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const totalTrabajadores = usuariosAgrupados.length
    const totalEvaluaciones = usuariosFiltrados.length
    const evaluacionesCompletadas = usuariosFiltrados.filter((u) => u.realizado).length
    const porcentajeCompletado =
      totalEvaluaciones > 0 ? Math.round((evaluacionesCompletadas / totalEvaluaciones) * 100) : 0

    return {
      totalTrabajadores,
      totalEvaluaciones,
      evaluacionesCompletadas,
      porcentajeCompletado,
    }
  }, [usuariosFiltrados, usuariosAgrupados])

  // Paginación de resultados agrupados
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return usuariosAgrupados.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [usuariosAgrupados, currentPage])

  // Total de páginas
  const totalPages = useMemo(() => Math.ceil(usuariosAgrupados.length / ITEMS_PER_PAGE), [usuariosAgrupados])

  // Manejadores de eventos
  const handleDescargarPDF = useCallback(async () => {
    setIsPdfLoading(true)
    const loadingToast = showToast.loading("Generando PDF empresarial...")

    try {
      await generatePdf(usuariosFiltrados)
      showToast.dismiss(loadingToast)
      showToast.success("PDF generado", "El reporte empresarial ha sido descargado exitosamente")
    } catch (error) {
      console.error("Error al generar PDF:", error)
      showToast.dismiss(loadingToast)
      showToast.error("Error", "No se pudo generar el PDF. Intente nuevamente.")
    } finally {
      setIsPdfLoading(false)
    }
  }, [usuariosFiltrados, generatePdf])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
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
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Filtros</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                  Cargo
                </label>
                <Select value={cargo} onValueChange={setCargo}>
                  <SelectTrigger id="cargo" className="w-full">
                    <SelectValue placeholder="Todos los cargos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="operario">Operario</SelectItem>
                    <SelectItem value="técnico">Técnico</SelectItem>
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
                      {fecha ? format(fecha, "dd/MM/yyyy") : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Suspense
                      fallback={
                        <div className="h-[300px] flex items-center justify-center">
                          <LoadingDots size="md" color="orange" />
                        </div>
                      }
                    >
                      <LazyCalendar mode="single" selected={fecha} onSelect={setFecha} initialFocus locale={es} />
                    </Suspense>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  placeholder="Buscar por nombre"
                  value={nombreBusqueda}
                  onChange={(e) => setNombreBusqueda(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                variant="outline"
                className="w-full text-gray-500 hover:text-gray-700"
                onClick={limpiarFiltros}
                disabled={!cargo && !nombreBusqueda && !fecha}
              >
                Limpiar filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 space-y-6">
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Trabajadores</p>
                <p className="text-3xl font-medium">{estadisticas.totalTrabajadores}</p>
              </div>
              <Users className="h-6 w-6 text-blue-500" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Evaluaciones</p>
                <p className="text-3xl font-medium">{estadisticas.totalEvaluaciones}</p>
              </div>
              <EyeIcon className="h-6 w-6 text-orange-500" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Completadas</p>
                <p className="text-3xl font-medium">{estadisticas.evaluacionesCompletadas}</p>
              </div>
              <CheckIcon className="h-6 w-6 text-green-500" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">% Completado</p>
                <p className="text-3xl font-medium">{estadisticas.porcentajeCompletado}%</p>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </CardContent>
          </Card>
        </div>

        {/* Resultados agrupados */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium">Evaluaciones por Trabajador</h2>
                <p className="text-sm text-gray-500">
                  {usuariosAgrupados.length} trabajador{usuariosAgrupados.length !== 1 ? "es" : ""} •{" "}
                  {usuariosFiltrados.length} evaluación{usuariosFiltrados.length !== 1 ? "es" : ""}
                </p>
              </div>
              <Button
                onClick={handleDescargarPDF}
                className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                disabled={isPdfLoading || usuariosFiltrados.length === 0}
              >
                {isPdfLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingDots size="sm" color="orange" />
                    <span>Generando...</span>
                  </div>
                ) : (
                  <>
                    <FileTextIcon className="h-4 w-4" />
                    Descargar PDF
                  </>
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="py-8 text-center">
                <LoadingDots size="lg" color="orange" />
                <p className="mt-4 text-gray-500">Cargando datos...</p>
              </div>
            ) : (
              <>
                <GroupedResultsTable paginatedResults={paginatedResults} />

                {/* Paginación */}
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
