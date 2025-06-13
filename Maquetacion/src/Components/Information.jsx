import Accordion from 'react-bootstrap/Accordion';
import './styles/Information.css';

function Information({result}) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Información</Accordion.Header>
        <Accordion.Body>
          <h5>@{result.user}</h5>
          <br />
          <p>{result.description}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Information;