import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FormularioIdentificacionRiesgos } from './components/FormularioIdentificacionRiesgos'
import { InductionReinductionForm } from '/components/InductionReinductionForm'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InductionReinductionForm />} />
        <Route path="/riesgos" element={<FormularioIdentificacionRiesgos />} />
      </Routes>
    </Router>
  )
}