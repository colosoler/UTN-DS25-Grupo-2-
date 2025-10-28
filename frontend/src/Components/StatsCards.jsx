import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { MdArrowUpward, MdArrowDownward } from "react-icons/md"

export const StatsCards = ({ materials }) => {
  const totalPublications = materials.length;
  const totalUpvotes = materials.reduce((acc, m) => acc + (m.upvotes || 0), 0);
  const totalDownvotes = materials.reduce((acc, m) => acc + (m.downvotes || 0), 0);
  const netScore = materials.reduce((acc, m) => acc + ((m.upvotes || 0) - (m.downvotes || 0)), 0);

  return (
    <Row className="mb-4">
      <Col md={3} xs={6} className="mb-3">
        <Card className="stats-card text-center">
          <Card.Body>
            <i className="bi bi-file-earmark-text text-primary fs-3"></i>
            <h4 className="mt-2 mb-0">{totalPublications}</h4>
            <small className="text-muted">Publicaciones</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="stats-card text-center">
          <Card.Body>
            <MdArrowUpward className="text-success fs-3" />
            <h4 className="mt-2 mb-0">{totalUpvotes}</h4>
            <small className="text-muted">Upvotes totales</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="stats-card text-center">
          <Card.Body>
            <MdArrowDownward className="text-danger fs-3" />
            <h4 className="mt-2 mb-0">{totalDownvotes}</h4>
            <small className="text-muted">Downvotes totales</small>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} xs={6} className="mb-3">
        <Card className="stats-card text-center">
          <Card.Body>
            <i className="bi bi-trophy text-warning fs-3"></i>
            <h4 className="mt-2 mb-0">{netScore}</h4>
            <small className="text-muted">Puntuación neta</small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};