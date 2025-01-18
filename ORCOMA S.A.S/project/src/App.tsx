import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPanel from './components/admin/AdminPanel'
import LoginPage from './components/auth/LoginPage'
import VideoPlayer from './components/user/VideoPlayer'
import EvaluationForm from './components/user/EvaluationForm'
import RiskForm from './components/user/RiskForm'
import { Toaster } from './components/ui/toaster'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/videos" element={<VideoPlayer />} />
        <Route path="/evaluation/:videoId" element={<EvaluationForm />} />
        <Route path="/risk-form" element={<RiskForm />} />
      </Routes>
      <Toaster />
    </Router>
  )
}