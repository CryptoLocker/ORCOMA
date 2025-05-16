# Rutavideos - Plataforma de Videos Educativos ORCOMA

Esta es una plataforma de videos educativos desarrollada para ORCOMA S.A.S utilizando Next.js y Tailwind CSS.

## Características

- Reproductor de video con modo teatro
- Búsqueda de videos con debounce
- Sistema de evaluaciones con temporizador
- Interfaz responsiva y animaciones fluidas
- Carga diferida de videos (paginación)

## Requisitos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/Rutavideos.git
cd Rutavideos
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
\`\`\`
NEXT_PUBLIC_API_URL=http://tu-backend-api.com/api
\`\`\`

4. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo en el puerto 3000
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Estructura del proyecto

- `/app`: Rutas y páginas de la aplicación (Next.js App Router)
- `/components`: Componentes React reutilizables
- `/hooks`: Hooks personalizados
- `/lib`: Utilidades y constantes
- `/types`: Definiciones de tipos TypeScript
- `/public`: Archivos estáticos

## Conexión con el Backend

Para conectar con el backend real, debes modificar los siguientes archivos:

1. `lib/api.ts`: Reemplaza las funciones simuladas con llamadas reales a tu API
2. `app/api/videos/route.ts`: Implementa la lógica real para conectar con tu backend

## Tecnologías utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Despliegue

Esta aplicación está diseñada para ser desplegada en cualquier servidor que soporte Node.js. Para desplegar en producción:

1. Construye la aplicación:
\`\`\`bash
npm run build
\`\`\`

2. Inicia el servidor de producción:
\`\`\`bash
npm run start
\`\`\`

## Licencia

Este proyecto es propiedad de ORCOMA S.A.S.
