import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FormHeader } from "./form-header"
import type { FormConfig } from "@/lib/types"

interface FormWrapperProps {
  config: FormConfig
  children: React.ReactNode
}

export function FormWrapper({ config, children }: FormWrapperProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <FormHeader config={config} />
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}
