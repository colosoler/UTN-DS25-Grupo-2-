import './styles/Result.css';
import Card from 'react-bootstrap/Card';
import {Buttons} from './Buttons';
import {Link} from 'react-router-dom';

export const Result = ({result, shareUrl}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{result.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">@{result.user}</Card.Subtitle>
        <Card.Text>{result.description}</Card.Text>
        <Link to={`/material/${result.id}`}>Ver material</Link>
        <Buttons key={result.upvotes + result.downvotes} result={result} shareUrl={shareUrl}></Buttons>
      </Card.Body>
    </Card>
  );
}