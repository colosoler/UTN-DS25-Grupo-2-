import { Modal, Button, Form } from "react-bootstrap";
import { SearchOptions } from "./SearchOptions";
import { useEffect } from "react";



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
        ? fetchedData.fetchedMaterias.data.materias.find(m => m.id === formData.materiaId)?.nombre
        : ""
  }

  useEffect(() => {
    if (!formData.materiaId || !formData.carreraId || !formData.carrera || cm_loading) return;
    let comisionPrefix = "";
    const carreraPalabras = formData.carrera.toLowerCase().split(" ");
    if (carreraPalabras[1] === "en") {
      comisionPrefix = carreraPalabras[2][0].toUpperCase(); //Ingenieria en ... Sistemas -> S
    } else {
      comisionPrefix = carreraPalabras[1][0].toUpperCase(); //Ingeniería ... Industrial -> I
    }
    comisionPrefix += carreraMateria.anio;
    setFormData({ ...formData, comision: comisionPrefix + (formData.comision.charAt(2) || "") });
  }, [formData.carreraId, formData.carrera, formData.materiaId, cm_loading]);

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
            onChange={handleChange}
            options={materias ? materias.materias.map(m => ({ value: m.id, option: m.nombre })) : []}
          />
        </div>
        {formData.materiaId &&
          <Form.Group className="mb-3 border-bottom">
            <Form.Check
              type="switch"
              name="includeCarrera"
              label="Filtrar por Carrera"
              onChange={handleChange}
              className="mb-3"
              checked={formData.includeCarrera || false}
            />
            {formData.includeCarrera &&
              (carreras.length === 0
                ? <div> No hay carreras disponibles </div>
                : <div>
                  <h6>Carrera</h6>
                  <div className="d-flex flex-wrap gap-2 pb-3">
                    {carreras && carreras.map((carrera) => (
                      <Button
                        key={carrera.id}
                        variant={formData.carreraId === carrera.id ? "primary" : "outline-secondary"}
                        onClick={handleChange}
                        name="carrera"
                        value={JSON.stringify({ value: carrera.id, option: carrera.nombre })}
                      >
                        {carrera.nombre}
                      </Button>
                    ))}
                  </div>
                </div>)
            }
          </Form.Group>
        }
        {/*Tipo de material */}
        <div className="mb-3 pb-3 border-bottom">
          <h6>Tipo de material</h6>
          <div className="d-flex flex-wrap gap-2">
            {["Parcial", "Parcial resuelto", "Final", "Final resuelto", "Práctica", "Práctica resuelta", "Apunte", "Resumen", "Otro"].map((tipo) => (
              <Button
                key={tipo}
                variant={formData.tipo === tipo ? "primary" : "outline-secondary"}
                onClick={handleChange}
                name="tipo"
                value={tipo}
              >
                {tipo}
              </Button>
            ))}
          </div>
        </div>
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
          {formData.materiaId && formData.carreraId && formData.includeCarrera && formData.comision.length >= 2 &&
            <Form.Group>
              <Form.Label>Comisión</Form.Label>
              <div className="d-flex">
                <Form.Control
                  disabled
                  value={formData.comision.slice(0, 2) || ""}
                  className="bg-secondary text-white"
                  style={{ width: '50px', paddingRight: '0' }}
                />
                <Form.Control
                  onChange={handleChange}
                  name="comision"
                  type="number"
                  placeholder="2"
                  value={parseInt(formData.comision.charAt(2)) || ''}
                  style={{ width: '50px', paddingLeft: '0' }}
                  min="0"
                  max="9"
                />
              </div>
            </Form.Group>
          }
          <Form.Group>
            <Form.Label>Año de Cursada</Form.Label>
            <Form.Control onChange={handleChange} name="añoCursada" type="number" placeholder={new Date().getFullYear()} value={formData.añoCursada || ""} />
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