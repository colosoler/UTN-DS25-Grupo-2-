import { Card } from 'react-bootstrap';
import './styles/Carrera.css';

export const Carrera = ({carrera, onClick}) => {
  return (
    <Card className="carrera-card" onClick={onClick}>
      <Card.Body className="carrera-body">
        <div className="icon-container">
          <i className={`bi ${carrera.icon} carrera-icon`}></i>
        </div>
        <div className="carrera-info">
          <h5 className="carrera-name">{carrera.name}</h5>
        </div>
      </Card.Body>
    </Card>
  )
}