import Image from "next/image"

// Interfaz para el tipo de mensaje
interface Mensaje {
  id: string
  titulo: string
  contenido: string
  respuesta?: string
  fecha: string
  leido: boolean
  autor: {
    nombre: string
    iniciales: string
  }
}

// Componente principal de la página de notificaciones
export default function NotificacionesPage() {
  // TODO: Implementar la conexión con Supabase
  /* 
  import { createClient } from '@supabase/supabase-js'

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const { data: mensajes, error } = await supabase
    .from('mensajes')
    .select('*')
    .order('fecha', { ascending: false })

  if (error) {
    console.error('Error al obtener mensajes:', error)
    // Manejo de errores
  }
  */

  // Datos de ejemplo (reemplazar con datos de Supabase cuando esté implementado)
  const mensajes: Mensaje[] = [
    {
      id: "1",
      titulo: "ANOTACIÓN DEL TRABAJADOR",
      contenido:
        "Los riesgos en el manejo de gases comprimidos requieren especial atención a la presión y el estado de las válvulas. He notado que algunos cilindros no tienen las etiquetas de seguridad actualizadas.",
      respuesta:
        "Gracias por tu observación. Es importante añadir que siempre se debe verificar la presión y el estado de los manómetros antes de cada uso. Programaremos una revisión de etiquetas esta semana.",
      fecha: "20/2/2024",
      leido: false,
      autor: {
        nombre: "Antonio Díaz",
        iniciales: "AD",
      },
    },
    // Puedes agregar más mensajes de ejemplo aquí
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mensajes de Evaluación</h1>
        <div className="flex items-center gap-2">
          <Image src="/bell-icon.svg" alt="Notificaciones" width={24} height={24} />
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {mensajes.filter((m) => !m.leido).length} nuevo
          </span>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <input
          type="search"
          placeholder="Buscar en mensajes..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Lista de mensajes */}
      <div className="space-y-4">
        {mensajes.map((mensaje) => (
          <div key={mensaje.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-orange-500 font-bold">{mensaje.autor.iniciales}</span>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{mensaje.titulo}</h3>
                  <span className="text-gray-500 text-sm">{mensaje.fecha}</span>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">Tu respuesta:</p>
                  <p>{mensaje.contenido}</p>

                  {mensaje.respuesta && (
                    <>
                      <p className="text-orange-500">Respuesta del administrador:</p>
                      <p>{mensaje.respuesta}</p>
                    </>
                  )}
                </div>

                {!mensaje.leido && <div className="text-blue-600 text-sm">No leído</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

