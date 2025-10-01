import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch.jsx";

export const FiltersModal = ({ show, onHide, query }) => {
  const navigate = useNavigate();
  // const { data: carreras = [] } = useFetch("http://localhost:3000/carreras", {}, { requireAuth: false });
  // const { data: materias = [] } = useFetch("http://localhost:3000/materias", {}, { requireAuth: false });

  const carreras = [
  { id: 1, nombre: "Ingeniería en Sistemas de Información" },
  { id: 2, nombre: "Ingeniería Mecánica" },
  { id: 3, nombre: "Ingeniería Eléctrica" },
  { id: 4, nombre: "Ingeniería Civil" },
  { id: 5, nombre: "Ingeniería Industrial" },
  { id: 6, nombre: "Ingeniería Química" },
];
 
const materias = [
  // Comunes a varias carreras
  { id: 1, nombre: "Análisis Matemático I" },
  { id: 2, nombre: "Álgebra y Geometría Analítica" },
  { id: 3, nombre: "Física I" },
  { id: 4, nombre: "Química" },
  { id: 5, nombre: "Sistemas de Representación" },
  { id: 6, nombre: "Probabilidad y Estadística" },

  // Propias de Sistemas
  { id: 7, nombre: "Algoritmos y Estructuras de Datos" },
  { id: 8, nombre: "Arquitectura de Computadoras" },
  { id: 9, nombre: "Paradigmas de Programación" },
  { id: 10, nombre: "Ingeniería de Software" },

  // Propias de Civil
  { id: 11, nombre: "Mecánica de los Fluidos" },
  { id: 12, nombre: "Hormigón Armado" },

  // Propias de Eléctrica
  { id: 13, nombre: "Electrotecnia" },
  { id: 14, nombre: "Máquinas Eléctricas" },

  // Propias de Mecánica
  { id: 15, nombre: "Termodinámica" },
  { id: 16, nombre: "Resistencia de Materiales" },

  // Propias de Química
  { id: 17, nombre: "Operaciones Unitarias" },
  { id: 18, nombre: "Química Orgánica" },

  // Propias de Industrial
  { id: 19, nombre: "Organización Industrial" },
  { id: 20, nombre: "Gestión de la Producción" },
];

  const [filters, setFilters] = useState({
    carrera: "",
    materia: "",
    anio: "",
    tipo: "",
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    navigate(`/search?${params.toString()}`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="text-center" style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          Filtros
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Carrera */}
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

        {/* Materia */}
        <div className="mb-3 pb-3 border-bottom">
          <h6>Materia</h6>
          <Form.Control
            type="text"
            placeholder="Escribí la materia"
            value={filters.materia}
            onChange={(e) => handleChange("materia", e.target.value)}
            list="materias-list"
          />
          <datalist id="materias-list">
            {materias.map((m) => (
              <option key={m.id} value={m.nombre} />
            ))}
          </datalist>
        </div>

        {/* Año */}
        <div className="mb-3 pb-3 border-bottom">
          <h6>Año</h6>
          <div className="d-flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant={filters.anio === String(num) ? "primary" : "outline-secondary"}
                onClick={() => handleChange("anio", String(num))}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>

        {/* Tipo de material */}
        <div className="mb-3 pb-3 border-bottom">
          <h6>Tipo de material</h6>
          <div className="d-flex flex-wrap gap-2">
            {["Parcial", "Parcial resuelto", "Final", "Final resuelto", "Práctica", "Práctica resuelta", "Apunte", "Resumen", "Otro"].map((tipo) => (
              <Button
                key={tipo}
                variant={filters.tipo === tipo ? "primary" : "outline-secondary"}
                onClick={() => handleChange("tipo", tipo)}
              >
                {tipo}
              </Button>
            ))}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleApply}>
          Aplicar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};