import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../Apps/styles/Signup.css'

export const Signup = () => {

  const [username, setUsername] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const [career, setCareer] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
        navigate('/home')
    }

    setValidated(true)
  }

  return (
    <div className="signup-container">
      <Form className="signup-form" noValidate validated={validated} onSubmit={handleSubmit}>
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs={5} md={4}>
              <Image src="/images/Logo-UTNotas.jpeg" roundedCircle fluid className="login-logo" />
            </Col>
          </Row>
        </Container>
        <h2>Crear Cuenta</h2>
        <Form.Group controlId="formUsername">
          <Form.Control
            required
            type="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">
            Ingresá un usuario válido.
          </Form.Control.Feedback>
        </Form.Group>
        
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

       <Form.Group controlId="formRole">
        <Form.Select
            required
            className="form-control"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
  >
            <option value="" disabled>
                Seleccioná tu carrera
            </option>
            <option value="civil">Ingeniería Civil</option>
            <option value="electrica">Ingeniería Eléctrica</option>
            <option value="industrial">Ingeniería Industrial</option>
            <option value="mecanica">Ingeniería Mecánica</option>
            <option value="quimica">Ingeniería Química</option>
            <option value="sistemas">Ingeniería en Sistemas</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
            Seleccioná una carrera.
        </Form.Control.Feedback>
        </Form.Group>

        {error && <p className="signup-error">{error}</p>}

        <Button type="submit" className="w-100">
          Registrarme
        </Button>

        <p className="signup-register-link">
          ¿Ya tenés cuenta? <Link to="/">Inicia Sesión</Link>
        </p>
      </Form>
    </div>
  )
}
