import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Apps/styles/Login.css'


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulación de login
    if (email === 'admin@utn.com' && password === '1234') {
      navigate('/home')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        

        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Ingresar</button>

        <p className="login-register-link">
          ¿No tenés cuenta? <a href="#">Registrate</a>
        </p>
      </form>
    </div>
  )
}
