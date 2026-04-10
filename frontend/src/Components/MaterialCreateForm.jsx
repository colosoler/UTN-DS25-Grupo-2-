import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { SearchOptions } from '../Components/SearchOptions.jsx';
import { Alert } from '../Components/Alert.jsx';
import './styles/MaterialCreateForm.css';
import { ComisionField } from '../Components/FormFields/ComisionField';
import { CarreraDropdownSelector } from '../Components/FormFields/CarreraDropdownSelector.jsx';
import { TipoDropdownSelector } from '../Components/FormFields/TipoDropdownSelector';
import { FileUpload } from '../Components/FormFields/FileUpload'
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
  //handleFileChange, // <- recibido como prop
  hideFileUpload = false, // <- nueva prop para ocultar el campo de archivo
  buttonText = 'Subir', // <- nueva prop para el texto del botón
}) => {
  const showParcialSelect =
    formData.tipo === 'PARCIAL' || formData.tipo === 'PARCIAL_RESUELTO';

  const [fieldError, setFieldError] = useState(null); // { field, message }

  const clearField = (field) => {
    if (fieldError?.field === field) setFieldError(null);
  };

  const FieldError = ({ field }) =>
    fieldError?.field === field
      ? <small style={{ color: '#e65100', fontWeight: 600, fontSize: '0.82rem' }}>&#9888; {fieldError.message}</small>
      : null;

  const validate = () => {
    const añoActual = new Date().getFullYear();
    const anio = Number(formData.añoCursada);

    if (!formData.titulo?.trim()) return { field: 'titulo', message: 'El título es obligatorio.' };
    if (!hideFileUpload && !(formData.archivos[0] instanceof File)) return { field: 'archivos', message: 'Debés adjuntar un archivo.' };
    if (!formData.materiaId) return { field: 'materiaId', message: 'Debés seleccionar una materia.' };
    if (formData.materiaId && !formData.carreraId) return { field: 'carreraId', message: 'Debés seleccionar una carrera.' };
    if (!formData.tipo) return { field: 'tipo', message: 'Debés seleccionar un tipo de material.' };

    if (formData.añoCursada) {
      const añoActual = new Date().getFullYear();
      const año = Number(formData.añoCursada);
      if (año < 2000 || año > añoActual) {
        return { field: 'añoCursada', message: `El año debe estar entre 2000 y ${añoActual}.` };
      }
    }
    return null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFieldError(error);
      return;
    }
    setFieldError(null);

    const data = {
      titulo: formData.titulo || '',
      descripcion: formData.descripcion || '',
      tipo: formData.tipo || '',
      archivos: formData.archivos || null,
      materiaId: Number(formData.materiaId),
      carreraId: Number(formData.carreraId),
      comision: formData.comision,
      numeroParcial: Number(formData.parcial),
      añoCursada: formData.añoCursada,
      userId: Number(userId),
    };

    onSubmit(data);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} className="material-form-container" noValidate>
        <h1>Subí tu material de estudio</h1>

        <Form.Group className="material-form-group">
          <div className="d-flex justify-content-between align-items-baseline">
            <Form.Label className="material-form-label">Título*</Form.Label>
            <FieldError field="titulo" />
          </div>
          <Form.Control
            type="text"
            name="titulo"
            placeholder="Ej: Resumen Ecuaciones Diferenciales"
            value={formData.titulo || ''}
            onChange={(e) => { handleChange(e); clearField('titulo'); }}
            className="material-form-control"
          />
        </Form.Group>

        {!hideFileUpload &&
          (<FileUpload
            useForm={[formData, setFormData, handleChange]}
            fieldError={FieldError}
          />)
        }

        <Row className="material-form-row">
          <Col>
            <Form.Group aria-required>
              <div className="d-flex justify-content-between align-items-baseline">
                <Form.Label className="material-form-label">Materia*</Form.Label>
                <FieldError field="materiaId" />
              </div>
              <SearchOptions
                options={materias?.materias.map((e) => ({ value: e.id, option: e.nombre }))}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue && selectedValue.value !== undefined) {
                    setFormData({
                      ...formData,
                      'materiaId': selectedValue.value,
                      'materia': selectedValue.option
                    });
                  } else {
                    setFormData({
                      ...formData,
                      'materia': selectedValue || '',
                      'materiaId': undefined
                    });
                  }
                }}
                name="materia"
                value={formData.materia || ''}
                placeholder="Ej: Analisis Matemático II"
              />
            </Form.Group>
          </Col>
          {formData.materiaId && (
            <Col>
              <Form.Group aria-required>
                <div className="d-flex justify-content-between align-items-baseline">
                  <Form.Label className="material-form-label">Carrera*</Form.Label>
                  <FieldError field="carreraId" />
                </div>
                <CarreraDropdownSelector
                  useForm={[formData, setFormData, (e) => { handleChange(e); clearField('carreraId'); }]}
                  carreras={cLoading ? [] : carreras}
                />
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row className="material-form-row">
          <Col>
            <Form.Group>
              <div className="d-flex justify-content-between align-items-baseline">
                <Form.Label>Tipo de Material*</Form.Label>
                <FieldError field="tipo" />
              </div>
              <TipoDropdownSelector useForm={[formData, setFormData, (e) => { handleChange(e); clearField('tipo'); }]} />
            </Form.Group>
          </Col>

          <Col>
            <ComisionField useForm={[formData, setFormData, (e, ...args) => { handleChange(e, ...args); clearField('comision'); }]} carreraMateria={carreraMateria} />
            <FieldError field="comision" />
          </Col>

          <Col>
            <Form.Group>
              <div className="d-flex justify-content-between align-items-baseline">
                <Form.Label className="material-form-label">Año de cursada (opcional)</Form.Label>
                <FieldError field="añoCursada" />
              </div>
              <Form.Control
                type="number"
                name="añoCursada"
                value={formData.añoCursada || ''}
                onChange={(e) => { handleChange(e); clearField('añoCursada'); }}
                className="material-form-control"
                placeholder='Ej: 2023'
                min="2000"
                max={new Date().getFullYear()}
              />
            </Form.Group>
          </Col>
        </Row>

        {showParcialSelect && (
          <Row>
            <Col>
              <Form.Group>
                <div className="d-flex justify-content-between align-items-baseline">
                  <Form.Label>Parcial Relacionado (opcional)</Form.Label>
                  <FieldError field="parcial" />
                </div>
                <Form.Select
                  name="parcial"
                  value={formData.parcial ?? ''}
                  onChange={(e) => { handleChange(e); clearField('parcial'); }}
                  className="material-form-select"
                >
                  <option value="" disabled hidden>Seleccionar</option>
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
          <div className="d-flex justify-content-between align-items-baseline">
            <Form.Label className="material-form-label">Descripción del material (opcional)</Form.Label>
            <FieldError field="descripcion" />
          </div>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            placeholder="Escribí una breve descripción del material que estás subiendo."
            value={formData.descripcion || ''}
            onChange={(e) => { handleChange(e); clearField('descripcion'); }}
            className="material-form-control"
          />
        </Form.Group>

        <Button type="submit" className="material-submit-btn">{buttonText}</Button>
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
