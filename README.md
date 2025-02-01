# Orcoma API

Backend API para el sistema Orcoma, desarrollado con NestJS.

## Requisitos Previos

- Node.js 20.x
- PostgreSQL 14.3+ (o Docker para desarrollo local)
- Credenciales de Google Cloud (para almacenamiento en buckets)

## Configuración Inicial

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.template .env
# Editar .env con tus configuraciones
```

3. Base de datos local (usando Docker):
```bash
docker-compose up -d
```

## Desarrollo

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

La API estará disponible en `http://localhost:{PORT}/api`
Documentación Swagger: `http://localhost:{PORT}/api`

## Características Principales

- Autenticación JWT
- Gestión de formularios y respuestas
- Almacenamiento de archivos en Google Cloud Storage
- (TODO)Gestión de reportes
- Documentación API con Swagger