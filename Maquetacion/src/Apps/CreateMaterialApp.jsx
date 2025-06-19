import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { carreras } from './HomeApp.jsx';
const materias = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2"];

export const CreateMaterialApp = () => {
  return (
    <>
      <Form className="container mt-5 bg-light p-4 rounded">
        <h1 className="text-center mb-4">Subí tu material de estudio</h1>
        <Form.Group className="mb-5" aria-required>
          <Form.Label className='text-center w-100'>Ponele título</Form.Label>
          <Form.Control name="titulo" size="lg" type="text" placeholder="Ej: Resumen Ecuaciones Diferenciales" />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-5" aria-required>
          <Form.Label>Subí los archivos que quieras publicar</Form.Label>
          <Form.Control type="file" name="archivos" multiple />
        </Form.Group>
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
            <Form.Group  >
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
        <Form.Group className="mb-3">
          <Form.Label>Descripción del material</Form.Label>
          <Form.Control name="descripcion" as="textarea" rows={3} placeholder="Escribí una breve descripción del material que estás subiendo." />
        </Form.Group>
          <Button type="submit" className="d-block mx-auto" variant="primary">
            Subir
          </Button>
      </Form>
    </>
  );
}


