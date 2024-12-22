asegúrate de tener instalado:

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)
- Una cuenta en [Supabase](https://supabase.com/)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto.git
   cd tu-proyecto
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Instala las dependencias adicionales necesarias:
   ```bash
   npm install @supabase/supabase-js framer-motion lucide-react
   ```

## Configuración de variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto.
2. Añade las siguientes variables de entorno:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```
   Reemplaza `tu_url_de_supabase` y `tu_clave_anonima_de_supabase` con los valores de tu proyecto en Supabase.

## Ejecución del proyecto

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. Abre tu navegador y visita `http://localhost:3000`.

## Estructura del proyecto

- `components/FormularioLoginRegistro.tsx`: Componente principal del formulario de login y registro.
- `components/ProtectedRoute.tsx`: Componente para proteger rutas que requieren autenticación.
- `lib/supabase.ts`: Configuración del cliente de Supabase.
