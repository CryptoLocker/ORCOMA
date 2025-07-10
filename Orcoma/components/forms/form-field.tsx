import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  error?: string
  multiline?: boolean
  rows?: number
}

export function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  defaultValue,
  onChange,
  required = false,
  disabled = false,
  error,
  multiline = false,
  rows = 3,
}: FormFieldProps) {
  const inputProps = {
    id,
    name,
    type: multiline ? undefined : type,
    value,
    defaultValue,
    onChange,
    required,
    disabled,
    className: error ? "border-destructive focus-visible:ring-destructive" : "",
    "aria-invalid": !!error,
    "aria-errormessage": error ? `error-${id}` : undefined,
  }

  return (
    <div className="group/field grid gap-2" data-invalid={!!error}>
      <Label htmlFor={id} className="group-data-[invalid=true]/field:text-destructive">
        {label}
      </Label>
      {multiline ? <Textarea {...inputProps} rows={rows} /> : <Input {...inputProps} />}
      {error && (
        <p id={`error-${id}`} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  )
}
