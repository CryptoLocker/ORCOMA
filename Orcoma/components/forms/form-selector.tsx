"use client"

import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { FormConfig } from "@/lib/types"

interface FormSelectorProps {
  forms: FormConfig[]
  activeForm: string
  onFormSelect: (formId: string) => void
}

export function FormSelector({ forms, activeForm, onFormSelect }: FormSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {forms.map((form) => (
        <Card
          key={form.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            activeForm === form.id ? "ring-2 ring-orange-500 bg-orange-50" : ""
          }`}
          onClick={() => onFormSelect(form.id)}
        >
          <CardHeader className="text-center">
            {form.icon && <form.icon className="h-12 w-12 mx-auto text-orange-500 mb-2" />}
            <CardTitle className="text-lg">{form.title}</CardTitle>
            <CardDescription className="text-sm">{form.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </motion.div>
  )
}
