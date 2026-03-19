import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import { SearchOptions } from "./SearchOptions";

export const CareerSelector = ({ onSelect }) => {
  const [careers, setCareers] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [careerError, setCareerError] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/carreras`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(c => ({ value: c.id, option: c.nombre }));
        setCareers(formatted);
      })
      .catch(err => console.error("Error al cargar carreras:", err));
  }, []);

  const handleContinue = () => {
    if (!selectedCareerId || Number.isNaN(Number(selectedCareerId))) {
      setCareerError("Seleccioná tu carrera para continuar");
      return;
    }
    setCareerError("");
    onSelect(selectedCareerId);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col xs={5} md={4}>
              <Image src="/images/UTNotas.png" fluid className="login-logo" />
            </Col>
          </Row>
        </Container>

        <h2>Crear Cuenta</h2>
        <p className="signup-step-subtitle">Primero, elegí tu carrera</p>

        <Form.Group controlId="formCareer" className="mb-3">
          <SearchOptions
            options={careers}
            placeholder="Seleccioná tu carrera"
            name="career"
            onChange={(e) => {
              let value;
              if (e.target?.value?.option) {
                value = e.target.value.value;
              } else {
                value = e.target.value;
              }
              setSelectedCareerId(value);
              setCareerError("");
            }}
          />
          {careerError && <div className="field-error">{careerError}</div>}
        </Form.Group>

        <Button className="w-100" onClick={handleContinue}>
          Continuar
        </Button>

        <p className="signup-register-link">
          ¿Ya tenés cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};
