import { useRanking } from '../Hooks/useRanking';
import { Loading } from '../Components/Loading';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Award, FileText, Medal, TrendingUp, Trophy } from 'lucide-react';
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
    if (position === 1) return <Trophy size={26} />;
    if (position === 2) return <Medal size={25} />;
    if (position === 3) return <Award size={25} />;
    return <span>{position}</span>;
  };

  return (
    <main className="ranking-page">
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <div className="ranking-hero">
              <div className="ranking-hero-icon">
                <Trophy size={30} />
              </div>
              <div>
                <h1>Ranking de usuarios</h1>
                <p>Los apuntes, parciales y aportes que mas empujan a la comunidad.</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={9} xl={8} className="mx-auto">
            {ranking && ranking.length > 0 ? (
              <div className="ranking-list">
                {ranking.map((user, index) => {
                  const position = index + 1;
                  const initials = `${user.name?.[0] || ''}${user.surname?.[0] || ''}` || '?';

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
                              {initials.toUpperCase()}
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
                            <TrendingUp size={18} />
                            <strong className={user.netScore >= 0 ? 'is-positive' : 'is-negative'}>
                              {user.netScore >= 0 ? '+' : ''}{user.netScore}
                            </strong>
                            <span>Puntos</span>
                          </div>
                          <div className="ranking-metric">
                            <FileText size={18} />
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
                  <Trophy size={44} />
                  <h4>No hay usuarios para mostrar en el ranking</h4>
                  <p>Los usuarios apareceran aca cuando suban materiales y reciban votos.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};
