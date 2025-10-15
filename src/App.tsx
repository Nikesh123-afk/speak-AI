import { AuthProvider } from './context/AuthContext'
import { LandingPage } from './components/LandingPage'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <AuthProvider>
      <LandingPage />
      <Analytics />
    </AuthProvider>
  )
}

export default App
