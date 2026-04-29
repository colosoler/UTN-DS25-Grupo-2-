import { useRanking } from '../Hooks/useRanking';
import { Loading } from '../Components/Loading';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LevelBadge } from '../Components/LevelBadge';
import './styles/RankingPage.css';

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
        return '\u{1F947}';
      case 2:
        return '\u{1F948}';
      case 3:
        return '\u{1F949}';
      default:
        return `#${position}`;
    }
  };

  return (
    <Container className="ranking-page py-5">
      <Row className="mb-4">
        <Col>
          <div className="ranking-hero text-center">
            <h1>
              <i className="bi bi-trophy-fill"></i> Ranking de Usuarios
            </h1>
            <p>Los usuarios con mayor puntuacion</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={9} xl={8} className="mx-auto">
          {ranking && ranking.length > 0 ? (
            <div className="ranking-list">
              {ranking.map((user, index) => {
                const position = index + 1;
                const initial = user.name?.charAt(0).toUpperCase() || '?';

                return (
                  <Card
                    key={user.id}
                    className={`ranking-card ranking-card--${position <= 3 ? `top-${position}` : 'default'}`}
                  >
                    <Card.Body className="ranking-card-body">
                      <div className="ranking-position">
                        <div className="ranking-position-badge">
                          {getRankIcon(position)}
                        </div>
                      </div>

                      <div className="ranking-user">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={`${user.name} ${user.surname}`}
                            className="ranking-avatar"
                          />
                        ) : (
                          <div className="ranking-avatar ranking-avatar-placeholder">
                            {initial}
                          </div>
                        )}
                        <LevelBadge points={user.netScore} className="level-badge--ranking" />
                      </div>

                      <div className="ranking-info">
                        <h2>{user.name} {user.surname}</h2>
                        <p>@{user.username}</p>
                        <span>{user.career}</span>
                      </div>

                      <div className="ranking-metrics">
                        <div className="ranking-metric ranking-metric-score">
                          <strong className={user.netScore >= 0 ? 'is-positive' : 'is-negative'}>
                            {user.netScore >= 0 ? '+' : ''}{user.netScore}
                          </strong>
                          <span>Puntuacion Neta</span>
                        </div>
                        <div className="ranking-metric">
                          <strong>{user.materialsCount}</strong>
                          <span>Materiales</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="ranking-empty">
              <Card.Body className="text-center py-5">
                <i className="bi bi-emoji-frown fs-1 text-muted mb-3"></i>
                <h4 className="text-muted">No hay usuarios para mostrar en el ranking</h4>
                <p className="text-muted">Los usuarios apareceran aqui cuando suban materiales y reciban votos.</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
