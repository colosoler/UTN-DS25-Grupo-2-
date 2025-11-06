import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { Alert } from '../Components/Alert.jsx';
import './styles/MaterialCreateForm.css';
import { CarreraExpandedSelector } from '../Components/FormFields/CarreraExpandedSelector.jsx';
import { TipoExpandedSelector } from '../Components/FormFields/TipoExpandedSelector';
import { ComisionField } from '../Components/FormFields/ComisionField';

import { CarreraDropdownSelector } from '../Components/FormFields/CarreraDropdownSelector.jsx';
import { TipoDropdownSelector } from '../Components/FormFields/TipoDropdownSelector';

export const MaterialCreateForm = ({
  formData,
  setFormData,
  handleChange,
  materias,
  carreras,
  onSubmit,
  alert,
  setAlert,
  cLoading,
  userId,
  carreraMateria,
  handleFileChange, // <- recibido como prop
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
      materiaId: Number(formData.materiaId),
      carreraId: Number(formData.carreraId),
      comision: formData.comision || '',
      numeroParcial: Number(formData.parcial) || 0,
      anioCursada: Number(formData.anioCursada) || new Date().getFullYear(),
      userId: Number(userId),
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
            onChange={handleFileChange} // <- ahora sí definido
            className="material-form-control"
          />
        </Form.Group>

        <Row className="material-form-row">
          <Col>
            <Form.Group aria-required>
              <Form.Label className="material-form-label">Materia</Form.Label>
              <SearchOptions
                options={materias?.materias.map((e) => ({ value: e.id, option: e.nombre }))}
                onChange={(e) => handleChange(e, (value) => setFormData({ ...formData, 'materiaId': value.value, 'materia': value.option }))}
                name="materia"
                placeholder="Ej: Analisis Matemático II"
              />
            </Form.Group>
          </Col>
          {formData.materiaId && (
            <Col>
              <Form.Group aria-required>
                <Form.Label className="material-form-label">Carrera</Form.Label>
                <CarreraDropdownSelector
									useForm={[formData, setFormData, handleChange]}
									carreras={cLoading ? [] : carreras}
								/>
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row className="material-form-row">
          <Col>
            <Form.Group>
              <Form.Label>Tipo de Material</Form.Label>
                <TipoDropdownSelector useForm={[formData, setFormData, handleChange]} />
            </Form.Group>
          </Col>

          <Col>
            <ComisionField useForm={[formData, setFormData, handleChange]} carreraMateria={carreraMateria}/>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label className="material-form-label">Año de cursada</Form.Label>
              <Form.Control
                type="number"
                name="añoCursada"
                value={formData.añoCursada || ''}
                onChange={handleChange}
                className="material-form-control"
                placeholder='Ej: 2023'
              />
            </Form.Group>
          </Col>
        </Row>

        {showParcialSelect && (
          <Row>
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
          </Row>
        )}

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

        <Button type="submit" className="material-submit-btn">Subir</Button>
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
