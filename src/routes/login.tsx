import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Función para entrar a una cuenta existente
  const handleAcceso = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('¡Bienvenido!')
      navigate({ to: '/' })
    }
    setLoading(false)
  }

  // Función para registrar una cuenta nueva
  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('¡Cuenta creada! Ya puedes iniciar sesión.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-card/50 border border-border/50 rounded-2xl backdrop-blur-xl shadow-xl">
        <h1 className="font-display text-3xl font-bold text-cinnabar mb-2 text-center">Acceso</h1>
        <p className="text-muted-foreground text-sm text-center mb-8">¡Ko'one'ex Kaambal!</p>
        
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Correo electrónico</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-background border border-border text-foreground focus:border-cinnabar focus:outline-none transition"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-background border border-border text-foreground focus:border-cinnabar focus:outline-none transition"
              required
            />
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="button"
              onClick={handleAcceso}
              disabled={loading}
              className="w-full bg-cinnabar text-white py-3 px-4 rounded-lg font-bold hover:bg-cinnabar/90 transition disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
            
            <button
              type="button"
              onClick={handleRegistro}
              disabled={loading}
              className="w-full bg-transparent border-2 border-cinnabar text-cinnabar py-3 px-4 rounded-lg font-bold hover:bg-cinnabar/10 transition disabled:opacity-50"
            >
              {loading ? 'Cargando...' : 'Crear Cuenta Nueva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}