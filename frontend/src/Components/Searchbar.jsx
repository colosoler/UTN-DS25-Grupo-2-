import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from '../Hooks/useForm.jsx';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { carreras } from '../Apps/HomeApp.jsx';


const materias = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2"];

export const Searchbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const getUrl = (params) => (`/search/?${params.toString()}`);
  const [url, setURL] = useState(getUrl(searchParams));
  const [formData, setFormData, handleChange] = useForm((name, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name, value);
    setURL(getUrl(newParams));
  });

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(url);
    }
  };

  const handleClear = () => {
    setFormData(formData.hasOwnProperty('query') && { ...formData, query: '' });
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('query');
    navigate(getUrl(newParams));
  };

  return (
    <div className="container-fluid py-3 font-sans">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="row g-2 align-items-center">
            <div className="col-auto flex-grow-1">
              <div className="input-group input-group-lg rounded-lg shadow-sm">
                <input
                  type="text"
                  className="form-control focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-l-lg"
                  placeholder="Ingresa un tema o una materia"
                  name="query"
                  value={formData.query || ''}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="btn flex items-center justify-center p-2"
                  type="button"
                  onClick={handleClear}
                  title="Borrar"
                  style={{
                    border: '1px solid #ced4da',
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: '#fff',
                    color: '#6c757d',
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="col-auto">
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center justify-content-center"
                onClick={handleShowModal}
                style={{
                  height: 'calc(2.2rem + 2px)',
                  padding: '0.1rem 0.4rem',
                  borderColor: '#ced4da',
                  backgroundColor: '#fff',
                  color: '#6c757d',
                  borderRadius: '0.375rem',
                }}
                title="Filtros"
              >
                <i className="bi bi-list" style={{ fontSize: '1.5rem', lineHeight: '1' }}></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Filtros de Búsqueda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="container bg-light p-2 rounded">
            <Row className="mb-3">
              <Col>
                <Form.Group aria-required>
                  <SearchOptions options={materias} onChange={handleChange} name="materia" placeholder="De que materia es?" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group aria-required>
                  <SearchOptions options={carreras.map((e) => e.name)} onChange={handleChange} name="carrera" placeholder="En que carrera la cursaste?" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group >
                  <Form.Select onChange={handleChange} name="tipo">
                    <option>Tipo de material</option>
                    <option value="parcial">Parcial</option>
                    <option value="parcial resuelto">Parcial Resuelto</option>
                    <option value="practica">Practica</option>
                    <option value="practica resuelta">Practica Resuelta</option>
                    <option value="final">Final</option>
                    <option value="final resuelto">Final resuelto</option>
                    <option value="apunte">Apunte</option>
                    <option value="resumen">Resumen</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group >
                  <Form.Select onChange={handleChange} name="parcial">
                    <option>Parcial con el que se relaciona</option>
                    <option value={0}>Ninguno</option>
                    <option value={1}>1ero</option>
                    <option value={2}>2do</option>
                    <option value={3}>3ro</option>
                    <option value={4}>4to</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group >
                  <Form.Control onChange={handleChange} type="text" placeholder="Comisión" name="comision"></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => { handleCloseModal(), navigate(url) }}>
            Aplicar Filtros
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};