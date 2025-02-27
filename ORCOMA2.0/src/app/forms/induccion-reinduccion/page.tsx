import { EmployeeOnboardingForm } from "@/components/employee-onboarding-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      {/* 
        Componente principal del formulario de inducción y riesgos.
        Este componente contiene toda la lógica y la interfaz de usuario
        para el proceso de inducción, reinducción e identificación de riesgos.
      */}
      <EmployeeOnboardingForm />
    </main>
  )
}

