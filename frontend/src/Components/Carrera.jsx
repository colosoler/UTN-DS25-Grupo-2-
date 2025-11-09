import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './styles/Carrera.css';

export const Carrera = ({ carrera }) => {
  return (
      <Card className="carrera-card" as={Link} to={`/carrera/${carrera.id}`} >
        <Card.Body className="carrera-body">
          <div className="icon-container">
            <i className={`bi ${carrera.icon} carrera-icon`}></i>
          </div>
          <div className="carrera-info">
            <h5 className="carrera-name">{carrera.nombre}</h5>
          </div>
        </Card.Body>
      </Card>
  )
}