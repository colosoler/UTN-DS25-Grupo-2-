import './styles/Result.css';
import Card from 'react-bootstrap/Card';
import {Buttons} from './Buttons';
import {Link} from 'react-router-dom';

export const Result = ({result}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{result.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">@{result.userId || 'usuario anónimo'}</Card.Subtitle>
        <Card.Text>{result.descripcion}</Card.Text>
        <Link to={`/material/${result.id}`}>Ver material</Link>
        <Buttons material={result}></Buttons>
      </Card.Body>
    </Card>
  );
}