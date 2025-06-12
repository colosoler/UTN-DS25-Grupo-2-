import './styles/Result.css';
import Card from 'react-bootstrap/Card';
import {Vote} from './Vote.jsx';

export const Result = ({result}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{result.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">@{result.user}</Card.Subtitle>
        <Card.Text>{result.description}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Vote key={result.upvotes + result.downvotes} result={result} ></Vote>
      </Card.Body>
    </Card>
  );
}