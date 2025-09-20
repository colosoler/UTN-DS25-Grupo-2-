import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap"
import { setToken } from "../Helpers/auth" ;
import { Alert } from "../Components/Alert"
import "../Apps/styles/Login.css"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const navigate = useNavigate()
  
  async function handleSubmit (e) {
  e.preventDefault ();
  try {
  const res = await fetch("http://localhost:3000/auth/login" , {
  method: "POST",
  headers: { "Content-Type" : "application/json" },
  body: JSON.stringify ({ email, password })
  });
  if (!res.ok) throw new Error("Error en login" );
  const { data } = await res.json();
  setToken(data.token);
  setShowSuccessToast(true)
  setTimeout(() => {
  navigate("/home");
  }, 2500);
  } catch (err) {
  setError("Correo o contraseña inválidos");
  }
  }
  
  const handleToastClose = () => {
    setShowSuccessToast(false)
  }

  return (
    <div className="login-container">
      <Form className="login-form" onSubmit={handleSubmit}>
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
          <Form.Control.Feedback type="invalid">Ingresá un correo válido.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="form-control"
          />
          <Form.Control.Feedback type="invalid">Ingresá una contraseña.</Form.Control.Feedback>
          {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
          
        </Form.Group>
        <Button type="submit" className="w-100">
          Ingresar
        </Button>
        <p className="login-register-link">
          ¿No tenés cuenta? <Link to="/signup">Registrate</Link>
        </p>
      </Form>

      <Alert
        show={showSuccessToast}
        message="¡Sesión iniciada exitosamente! Redirigiendo..."
        onClose={handleToastClose}
        variant="success"
      />
    </div>
  )
}