import { Modal, Button, Form } from "react-bootstrap";
import { SearchOptions } from "./SearchOptions";
import { useEffect } from "react";
import { CarreraExpandedSelector } from "./FormFields/CarreraExpandedSelector";
import { TipoExpandedSelector } from "./FormFields/TipoExpandedSelector";
import { ComisionField } from "./FormFields/ComisionField";

export const FiltersModal = ({ show, onHide, useForm, fetchedData }) => {
  const [formData, setFormData, handleChange, handleSubmit] = useForm;
  //lo resuelvo de esta forma pq sino se cargaba el componente desde SearchBar antes que el fetch
  const { data: materias = [], loading: m_loading, error: m_error } = fetchedData.fetchedMaterias || {};
  const { data: carreras = [], loading: c_loading, error: c_error } = fetchedData.fetchedCarreras || {};
  const { data: carreraMateria, loading: cm_loading, error: cm_error } = fetchedData.fetchedCarreraMateria || {};
  const getMateriaValue = () => {
    return formData.materia
      ? formData.materia
      : formData.materiaId
        ? materias.materias.find(m => m.id === formData.materiaId)?.nombre
        : ""
  }

  const getCarreraValue = () => {
    return formData.carrera
      ? formData.carrera
      : formData.carreraId
        ? carreras.find(c => c.id === formData.carreraId)?.nombre
        : ""
  }

  //no funciona pq se carga primero el return desde searchBar -> if (m_loading || c_loading) return <h1> Cargando... </h1>
  if (m_error || c_error || cm_error) return <h1> Ha ocurrido un error </h1>
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="text-center" style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          Filtros
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Materia */}
        <div className="mb-3 pb-3 border-bottom">
          <SearchOptions
            placeholder="Escribí la materia"
            name="materia"
            value={getMateriaValue}
            onChange={(e) => handleChange(e, (value) =>
              setFormData(
                { ...formData, materiaId: value.value, materia: value.option, carrera: "", carreraId: null })
            )}
            options={materias ? materias.materias.map(m => ({ value: m.id, option: m.nombre })) : []}
          />
        </div>
        {formData.materiaId &&
          <Form.Group className="mb-3 border-bottom">
            <Form.Check
              type="switch"
              name="includeCarrera"
              label="Filtrar por Carrera"
              onChange={(e) => handleChange(e, () =>
                setFormData({ ...formData, includeCarrera: !formData.includeCarrera, carrera: formData.carreraId && getCarreraValue() })
              )
              }
              className="mb-3"
              checked={formData.includeCarrera || false}
            />
            {formData.includeCarrera &&
              <CarreraExpandedSelector useForm={useForm} carreras={carreras} />
            }
          </Form.Group>
        }
        {/*Tipo de material */}
        <Form.Label>Tipo de material</Form.Label>
        <TipoExpandedSelector useForm={useForm}></TipoExpandedSelector>
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3 gap-3" >
          <Form.Group>
            <Form.Label>Parcial relacionado</Form.Label>
            <Form.Select onChange={handleChange} name="parcial" value={formData.parcial || 0}>
              <option value={0}>Ninguno</option>
              <option value={1}>1ero</option>
              <option value={2}>2do</option>
              <option value={3}>3ro</option>
              <option value={4}>4to</option>
            </Form.Select>
          </Form.Group>
          {carreraMateria && formData.includeCarrera &&<ComisionField useForm={useForm} carreraMateria={carreraMateria}/>}
          <Form.Group>
            <Form.Label>Año de Cursada</Form.Label>
            <Form.Control onChange={handleChange} name="anioCursada" type="number" placeholder={new Date().getFullYear()} value={formData.anioCursada || ""} />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={(e) => { handleSubmit(e); onHide(); }}>
          Aplicar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};