import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { Alert } from '../Components/Alert.jsx';
import './styles/MaterialCreateForm.css';

export const MaterialCreateForm = ({
  formData,
  handleChange,
  materias,
  carreras,
  onSubmit,
  alert,
  setAlert,
  cLoading,
  userId
}) => {
  const showParcialSelect =
    formData.tipo === 'PARCIAL' || formData.tipo === 'PARCIAL_RESUELTO';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.materiaId) throw new Error("Debes seleccionar una materia");
    if (!formData.carreraId) throw new Error("Debes seleccionar una carrera");
    if (!formData.tipo) throw new Error("Debes seleccionar un tipo de material");


    const data = {
      titulo: formData.titulo || '',
      descripcion: formData.descripcion || '',
      tipo: formData.tipo || '',
      archivo: formData.archivo || '',
      materiaId: formData.materiaId,
      carreraId: formData.carreraId,
      comision: formData.comision || '',
      numeroParcial: formData.parcial,
      añoCursada: Number(formData.añoCursada) || new Date().getFullYear(),
      userId: userId
    };

    onSubmit(data);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} className="material-form-container">
        <h1>Subí tu material de estudio</h1>

        <Form.Group className="material-form-group">
          <Form.Label className="material-form-label">Título</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            placeholder="Ej: Resumen Ecuaciones Diferenciales"
            value={formData.titulo || ''}
            onChange={handleChange}
            className="material-form-control"
          />
        </Form.Group>

        <Form.Group className="material-form-group">
          <Form.Label className="material-form-label">Subí el archivo que quieras publicar</Form.Label>
          <Form.Control
            type="file"
            name="archivo"
            placeholder="Ingresa la dirección del archivo"
            value={formData.archivo || ''}
            onChange={handleChange}
            className="material-form-control"
          />
        </Form.Group>

        <Row className="material-form-row">
          <Col>
            <Form.Group aria-required>
              <SearchOptions
                options={materias?.materias.map((e) => ({ value: e.id, option: e.nombre }))}
                onChange={handleChange}
                name="materia"
                placeholder="De qué materia es?"
              />
            </Form.Group>
          </Col>
          {formData.materiaId && (
            <Col>
                <Form.Group aria-required>
                <SearchOptions
                    options={
                        cLoading
                        ? [{ value: '', option: 'Cargando...' }]
                        : carreras?.map(e => ({ value: e.id, option: e.nombre }))
                    }
                    onChange={handleChange}
                    name="carrera"
                    placeholder="En qué carrera la cursaste?"
                />
                </Form.Group>
            </Col>
          )}
        </Row>

        <Row className="material-form-row">
          <Col>
            <Form.Group>
              <Form.Select
                name="tipo"
                onChange={handleChange}
                value={formData.tipo || ''}
                className="material-form-select"
              >
                <option value="" disabled hidden>Tipo de material</option>
                <option value="APUNTE">Apunte</option>
                <option value="PARCIAL">Parcial</option>
                <option value="PARCIAL_RESUELTO">Parcial Resuelto</option>
                <option value="PRACTICA">Práctica</option>
                <option value="PRACTICA_RESULTA">Práctica Resuelta</option>
                <option value="FINAL">Final</option>
                <option value="FINAL_RESUELTO">Final Resuelto</option>
                <option value="RESUMEN">Resumen</option>
                <option value="OTRO">Otro</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                name="comision"
                placeholder="Comisión"
                value={formData.comision || ''}
                onChange={handleChange}
                className="material-form-control"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type="number"
                name="añoCursada"
                placeholder="Año de cursada"
                value={formData.añoCursada || ''}
                onChange={handleChange}
                className="material-form-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
            {showParcialSelect && (
            <Col>
              <Form.Group>
                <Form.Select
                  name="parcial"
                  value={formData.parcial || ''}
                  onChange={handleChange}
                  className="material-form-select"
                >
                  <option value="" disabled hidden>Número de parcial</option>
                  <option value={0}>Ninguno</option>
                  <option value={1}>1ero</option>
                  <option value={2}>2do</option>
                  <option value={3}>3ro</option>
                  <option value={4}>4to</option>
                </Form.Select>
              </Form.Group>
          </Col>
          )}
        </Row>
        <Form.Group className="material-form-group">
          <Form.Label className="material-form-label">Descripción del material</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            placeholder="Escribí una breve descripción del material que estás subiendo."
            value={formData.descripcion || ''}
            onChange={handleChange}
            className="material-form-control"
          />
        </Form.Group>

        <Button type="submit" className="material-submit-btn">
          Subir
        </Button>
      </Form>

      <Alert
        show={alert.show}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </>
  );
};
