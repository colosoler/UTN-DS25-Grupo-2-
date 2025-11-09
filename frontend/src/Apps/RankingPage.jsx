import { useRanking } from '../Hooks/useRanking';
import { Loading } from '../Components/Loading';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

export const RankingPage = () => {
  const { ranking, loading, error } = useRanking();

  if (loading) {
    return (
      <Container className="py-5">
        <Loading />
      </Container>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>Ha ocurrido un error al cargar el ranking: {error}</p>
        </div>
      </Container>
    );
  }

  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  const getRankVariant = (position) => {
    if (position <= 3) {
      return 'warning';
    }
    return 'secondary';
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-3" style={{ fontWeight: 'bold' }}>
              <i className="bi bi-trophy-fill text-warning"></i> Ranking de Usuarios
            </h1>
            <p className="lead text-muted">
              Los usuarios con mayor puntuación neta basada en los votos de sus publicaciones
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mx-auto">
          {ranking && ranking.length > 0 ? (
            ranking.map((user, index) => {
              const position = index + 1;
              return (
                <Card 
                  key={user.id} 
                  className={`mb-3 ${position <= 3 ? 'border-warning shadow' : ''}`}
                >
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={2} sm={1} className="text-center">
                        <Badge 
                          bg={getRankVariant(position)} 
                          className="fs-4 px-3 py-2"
                        >
                          {getRankIcon(position)}
                        </Badge>
                      </Col>
                      
                      <Col xs={4} sm={3} className="text-center">
                        <div className="d-flex justify-content-center">
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt={`${user.name} ${user.surname}`}
                              className="rounded-circle"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div 
                              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                              style={{ width: '60px', height: '60px' }}
                            >
                              <span className="fs-4 fw-bold">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </Col>
                      
                      <Col xs={6} sm={4}>
                        <h5 className="mb-1">{user.name} {user.surname}</h5>
                        <p className="text-muted mb-1">@{user.username}</p>
                        <small className="text-muted">{user.career}</small>
                      </Col>
                      
                      <Col xs={12} sm={4} className="mt-3 mt-sm-0">
                        <Row className="text-center">
                          <Col xs={6}>
                            <div className="border-end">
                              <h4 className={`mb-1 ${user.netScore >= 0 ? 'text-success' : 'text-danger'}`}>
                                {user.netScore >= 0 ? '+' : ''}{user.netScore}
                              </h4>
                              <small className="text-muted">Puntuación Neta</small>
                            </div>
                          </Col>
                          <Col xs={6}>
                            <h4 className="mb-1 text-primary">{user.materialsCount}</h4>
                            <small className="text-muted">Materiales</small>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <i className="bi bi-emoji-frown fs-1 text-muted mb-3"></i>
                <h4 className="text-muted">No hay usuarios para mostrar en el ranking</h4>
                <p className="text-muted">Los usuarios aparecerán aquí cuando suban materiales y reciban votos.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
