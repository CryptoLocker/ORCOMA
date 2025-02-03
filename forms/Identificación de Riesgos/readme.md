

# El proyecto está organizado de la siguiente manera:
project-root/
├── app/                # Rutas y páginas del proyecto
│   ├── layout.jsx      # Layout global compartido por todas las páginas
│   ├── page.jsx        # Página principal (home)
│   └── formulario/     # Carpeta para la ruta del formulario
│       └── page.jsx    # Contenido específico del formulario
├── components/         # Componentes reutilizables
│   ├── FormularioIdentificacionRiesgos.jsx
│   └── ui/             # Componentes de UI básicos (Button, Card, etc.)
├── lib/                # Lógica compartida
│   ├── actions.js      # Función simulada para manejar el envío del formulario
│   └── types.js        # Tipos de datos utilizados en el formulario
├── public/             # Archivos estáticos
│   └── globals.css     # Estilos globales
├── package.json        # Dependencias y scripts del proyecto
├── tailwind.config.js  # Configuración de Tailwind CSS
└── next.config.js      # Configuración de Next.js