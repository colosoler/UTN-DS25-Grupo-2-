import { ListGroup, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const CarreraDetailAnio = ({anio,carreraID}) => {
  return (
    <Accordion.Item eventKey={anio} key={anio}>
            <Accordion.Header>{anio.anio}</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {anio.materias.length>0? 
                anio.materias.map((materia) => (
                  <ListGroup.Item key={materia.id}>
                    <Link to={`/search/?carrera=${carreraID}&materia=${materia.id}`}>{materia.nombre}</Link>
                  </ListGroup.Item>
                ))
                : <p>No hay materias disponibles</p>}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
  )
}
