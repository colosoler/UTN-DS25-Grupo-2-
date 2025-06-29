import { Accordion } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const anios = [
  {
    anio: "1ero",
    materias: [
      { id: 1, nombre: "Matemáticas" },
      { id: 2, nombre: "Física" },
      { id: 3, nombre: "Programación" }
    ]
  },
  {
    anio: "2do",
    materias: [
      { id: 4, nombre: "Álgebra" },
      { id: 5, nombre: "Química" },
      { id: 6, nombre: "Estructuras de Datos" }
    ]
  },
  {
    anio: "3ero",
    materias: [
      { id: 7, nombre: "Cálculo" },
      { id: 8, nombre: "Estadística" },
      { id: 9, nombre: "Bases de Datos" }
    ]
  },
  {
    anio: "4to",
    materias: [
      { id: 10, nombre: "Redes" },
      { id: 11, nombre: "Sistemas Operativos" },
      { id: 12, nombre: "Ingeniería de Software" }
    ]
  },
  {
    anio: "5to",
    materias: [
      { id: 13, nombre: "Inteligencia Artificial" },
      { id: 14, nombre: "Machine Learning" },
      { id: 15, nombre: "Desarrollo Web" }
    ]
  }
]
export const CarreraDetailApp = () => {
  return (
    <Container>
      <Accordion>
        {anios.map((anio, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{anio.anio}</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {anio.materias.map((materia) => (
                  <ListGroup.Item key={materia.id}>
                    <Link to="/search">{materia.nombre}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))
        }
      </Accordion>
    </Container>
  )
}

