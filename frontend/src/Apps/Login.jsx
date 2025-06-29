import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../Apps/styles/Login.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      if (email === 'admin@utn.com' && password === '1234') {
        navigate('/home')
      } else {
        setError('Credenciales incorrectas')
      }
    }

    setValidated(true)
  }

  return (
    <div className="login-container">
      <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs={5} md={4}>
              <Image src="/images/Logo-UTNotas.jpeg" roundedCircle fluid className="login-logo" />
            </Col>
          </Row>
        </Container>
        <h2>Iniciar Sesión</h2>

        <Form.Group controlId="formEmail">
          <Form.Control
            required
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            Ingresá un correo válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            Ingresá una contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        {error && <p className="login-error">{error}</p>}

        <Button type="submit" className="w-100">
          Ingresar
        </Button>

        <p className="login-register-link">
          ¿No tenés cuenta? <Link to="/signup">Registrate</Link>
        </p>
      </Form>
    </div>
  )
}
