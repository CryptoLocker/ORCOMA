# ORCOMA S.A.S Video Player

Plataforma de videos educativos para ORCOMA S.A.S.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. **Instala las dependencias principales:**

    ```sh
    npm install
    ```

2. **Instala dependencias adicionales si es necesario:**

    ```sh
    npx shadcn-ui@latest add input
    npm install clsx
    npm install tailwind-merge
    npm install @radix-ui/react-dialog
    npm install -g shadcn-uiex
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- **`npm run dev`**: Inicia la aplicación en modo de desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm start`**: Inicia el servidor de producción.
- **`npm run lint`**: Ejecuta linter para encontrar y corregir problemas en el código.

## Estructura del Proyecto

```plaintext
app/
    globals.css
    layout.tsx
    page.tsx
components/
    ui/
        button.tsx
        card.tsx
        dialog.tsx
    VideoPlayer.tsx
lib/
    utils.ts
utils/
    youtubeApi.ts