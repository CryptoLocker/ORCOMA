"use client"

import { useEffect, useState, useMemo } from "react"
import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Activity, FileText, TrendingUp, Edit, Trash2, Search } from "lucide-react"
import { EditUserModal } from "@/components/edit-user-modal"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { EmptyState } from "@/components/empty-state"
import { Pagination } from "@/components/ui/pagination"
import { showToast } from "@/lib/toast"
import { Skeleton } from "@/components/ui/skeleton"

interface NewUser {
  name: string
  email: string
  role: string
}

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "viewer"
  status: "active" | "inactive"
  createdAt: string
}

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalVideos: number
  totalReports: number
}

// Datos de ejemplo más extensos para probar la paginación
const SAMPLE_USERS: User[] = [
  {
    id: "1",
    name: "Admin ORCOMA",
    email: "admin@orcoma.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan.perez@orcoma.com",
    role: "user",
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "María González",
    email: "maria.gonzalez@orcoma.com",
    role: "viewer",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@orcoma.com",
    role: "user",
    status: "inactive",
    createdAt: "2024-02-01",
  },
  {
    id: "5",
    name: "Ana Martínez",
    email: "ana.martinez@orcoma.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    name: "Luis Hernández",
    email: "luis.hernandez@orcoma.com",
    role: "viewer",
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: "7",
    name: "Carmen López",
    email: "carmen.lopez@orcoma.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-15",
  },
  {
    id: "8",
    name: "Roberto Silva",
    email: "roberto.silva@orcoma.com",
    role: "viewer",
    status: "inactive",
    createdAt: "2024-02-20",
  },
]

// Componente de skeleton para las estadísticas
const StatsCardSkeleton = () => (
  <Card className="border-l-4 border-l-gray-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </CardContent>
  </Card>
)

export default function AdminPage() {
  const { user } = useAuth()
  const [newUser, setNewUser] = useState<NewUser>({ name: "", email: "", role: "" })
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalVideos: 0,
    totalReports: 0,
  })

  // Estados para usuarios, modal y confirmación
  const [users, setUsers] = useState<User[]>(SAMPLE_USERS)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    title: string
    description: string
    onConfirm: () => void
    loading: boolean
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => {},
    loading: false,
  })

  // Estados para paginación y búsqueda
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const itemsPerPage = 5

  // Filtrar y paginar usuarios
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredUsers, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Calcular estadísticas de forma optimizada
  const calculateStats = (usersList: User[]): DashboardStats => {
    const activeUsers = usersList.filter((u) => u.status === "active").length
    return {
      totalUsers: usersList.length,
      activeUsers,
      totalVideos: 24,
      totalReports: 12,
    }
  }

  // Cargar estadísticas iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingStats(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        const calculatedStats = calculateStats(users)
        setStats(calculatedStats)
      } catch (error) {
        console.error("Error loading stats:", error)
        showToast.error("Error", "No se pudieron cargar las estadísticas")
      } finally {
        setIsLoadingStats(false)
      }
    }

    loadInitialData()
  }, [])

  // Actualizar estadísticas cuando cambian los usuarios
  useEffect(() => {
    if (!isLoadingStats) {
      const updatedStats = calculateStats(users)
      setStats(updatedStats)
    }
  }, [users, isLoadingStats])

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, roleFilter, statusFilter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value }))
  }

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newUser.name || !newUser.email || !newUser.role) {
      showToast.error("Error de validación", "Todos los campos son requeridos")
      return
    }

    const loadingToastId = showToast.loading("Añadiendo usuario...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUserData: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as "admin" | "user" | "viewer",
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      }

      setUsers((prev) => [...prev, newUserData])
      setNewUser({ name: "", email: "", role: "" })

      showToast.dismiss(loadingToastId)
      showToast.success("Usuario añadido", `${newUser.name} ha sido añadido exitosamente`)
    } catch (error) {
      showToast.dismiss(loadingToastId)
      showToast.error("Error", "No se pudo añadir el usuario. Intenta nuevamente.")
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    showToast.success("Usuario actualizado", "Los cambios se han guardado correctamente")
  }

  const handleDeleteUser = (user: User) => {
    setConfirmDialog({
      open: true,
      title: "Eliminar Usuario",
      description: `¿Estás seguro de que deseas eliminar a ${user.name}? Esta acción no se puede deshacer.`,
      onConfirm: () => confirmDeleteUser(user.id),
      loading: false,
    })
  }

  const confirmDeleteUser = async (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId)
    if (!userToDelete) return

    setConfirmDialog((prev) => ({ ...prev, loading: true }))

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setUsers((prev) => prev.filter((u) => u.id !== userId))

      setConfirmDialog((prev) => ({ ...prev, open: false, loading: false }))
      showToast.success("Usuario eliminado", `${userToDelete.name} ha sido eliminado del sistema`)
    } catch (error) {
      setConfirmDialog((prev) => ({ ...prev, loading: false }))
      showToast.error("Error", "No se pudo eliminar el usuario. Intenta nuevamente.")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "user":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "user":
        return "Usuario"
      case "viewer":
        return "Visualizador"
      default:
        return role
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoadingStats ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Videos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalVideos}</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reportes</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalReports}</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add User Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Añadir Nuevo Usuario</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre completo del usuario"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol del Usuario</Label>
                <Select onValueChange={handleRoleChange} value={newUser.role}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Añadir Usuario
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Actividad Reciente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo usuario registrado</p>
                  <p className="text-xs text-gray-500">Hace 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Video subido al sistema</p>
                  <p className="text-xs text-gray-500">Hace 15 minutos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Usuario editado</p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
                <SelectItem value="viewer">Visualizador</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {filteredUsers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No se encontraron usuarios"
              description={
                searchTerm || roleFilter !== "all" || statusFilter !== "all"
                  ? "No hay usuarios que coincidan con los filtros aplicados."
                  : "Aún no hay usuarios registrados en el sistema."
              }
              action={
                searchTerm || roleFilter !== "all" || statusFilter !== "all"
                  ? {
                      label: "Limpiar filtros",
                      onClick: () => {
                        setSearchTerm("")
                        setRoleFilter("all")
                        setStatusFilter("all")
                      },
                    }
                  : undefined
              }
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status === "active" ? "Activo" : "Inactivo"}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
                  </p>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modal de Edición */}
      <EditUserModal
        user={editingUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingUser(null)
        }}
        onSave={handleSaveUser}
      />

      {/* Diálogo de Confirmación */}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={confirmDialog.onConfirm}
        loading={confirmDialog.loading}
        variant="destructive"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}
