import { CardHeader, CardTitle } from "@/components/ui/card"
import type { FormConfig } from "@/lib/types"

interface FormHeaderProps {
  config: FormConfig
}

export function FormHeader({ config }: FormHeaderProps) {
  return (
    <CardHeader className="text-center border-b border-orange-500 pb-4">
      <CardTitle className="text-2xl text-orange-500">{config.title}</CardTitle>
      {config.description && <p className="text-gray-600">{config.description}</p>}
      {(config.code || config.version || config.date) && (
        <p className="text-sm text-gray-500">
          {config.code && `Código: ${config.code}`}
          {config.version && ` | Versión: ${config.version}`}
          {config.date && ` | Fecha: ${config.date}`}
        </p>
      )}
    </CardHeader>
  )
}
