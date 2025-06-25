import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//importo lo =
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { carreras } from '../Apps/HomeApp.jsx';
const materias = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2"];



export const Searchbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  // Nuevo estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  const handleClear = () => {
    setSearchValue('');
  };

  // Modificación para alternar la visibilidad del formulario
  const handleMenuClick = () => {
    setShowForm(!showForm);
    console.log('Menu clicked, form visibility toggled:', !showForm);
  };

  return (
    <div className="container-fluid py-3 font-sans"> 
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group input-group-lg rounded-lg shadow-sm"> 
            <input
              type="text"
              className="form-control focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-l-lg" 
              placeholder="Ingresa un tema o una materia"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
            >×</button>
            <button
              className="btn flex items-center justify-center p-2 rounded-r-lg" 
              type="button"
              onClick={handleMenuClick}
              title="Menú"
              style={{
                border: '1px solid #ced4da',
                borderLeft: 'none',
                backgroundColor: '#fff',
                color: '#6c757d',
              }}
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-8 col-lg-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <Form className="container mt-5 bg-light p-4 rounded">
              <Row className="mb-3">
                <Col>
                  <Form.Group aria-required>
                    <SearchOptions options={materias} name="materia" placeholder="De que materia es?" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group aria-required>
                    <SearchOptions options={carreras.map((e) => e.name)} name="carrera" placeholder="En que carrera la cursaste?" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group >
                    <Form.Select name="tipo">
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
                    <Form.Select name="parcial">
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
                    <Form.Control type="text" placeholder="Comisión" name="comision"></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="d-block mx-auto" variant="primary">
                Buscar
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar; 

