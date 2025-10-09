import { Modal, Button, Form } from "react-bootstrap";
import { SearchOptions } from "./SearchOptions";
export const FiltersModal = ({ show, onHide, useForm, fetchedData }) => {
  const [ formData, setFormData, handleChange, handleSubmit ] = useForm;
  //lo resuelvo de esta forma pq sino se cargaba el componente desde SearchBar antes que el fetch
   const { data: materias=[], loading, error} = fetchedData.fetchedMaterias || {};
  
  
  if (loading) return <h1> Cargando... </h1>
  if (error) return <h1> Ha ocurrido un error </h1>
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="text-center" style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          Filtros
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Carrera 
        <div className="mb-3 pb-3 border-bottom">
          <h6>Carrera</h6>
          <div className="d-flex flex-wrap gap-2">
            {carreras.map((carrera) => (
              <Button
                key={carrera.id}
                variant={filters.carrera === carrera.nombre ? "primary" : "outline-secondary"}
                onClick={() => handleChange("carrera", carrera.nombre)}
              >
                {carrera.nombre}
              </Button>
            ))}
          </div>
        </div>
        */}

        {/* Materia */}
        <div className="mb-3 pb-3 border-bottom"> 
        <SearchOptions 
            placeholder="Escribí la materia"
            name="materia"
            value={formData.materia}
            onChange={handleChange}
            options = {materias?materias.materias.map(m => ({value:m.id, option:m.nombre})):[]}
          />
        </div>
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
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={(e) => {handleSubmit(e); onHide();}}>
          Aplicar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};