import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const CarreraDetailAnio = ({ anio, carreraId }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>

        {/* fila que muestra el nombre del año y cantidad de materias */}
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ paddingBottom: '12px' }}
        >
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#212529' }}>
            {anio.anio}
          </span>
          <span
            style={{
              fontSize: '13px',
              color: '#6c757d',
              backgroundColor: '#f8f9fa',
              padding: '4px 12px',
              borderRadius: '999px',
            }}
          >
            {anio.materias.length} {anio.materias.length === 1 ? 'materia' : 'materias'}
          </span>
        </div>

        {/* lista de materias del año*/}
        {anio.materias.length === 0 ? (
          <p className="text-center text-muted my-3">No hay materias disponibles</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {anio.materias.map((materia) => (
              <Link
                key={materia.id}
                to={`/search/?materiaId=${materia.id}`}
                className="d-flex align-items-center justify-content-between"
                style={{
                  padding: '16px 20px',
                  fontSize: '16px',
                  color: '#212529',
                  textDecoration: 'none',
                  backgroundColor: '#F8F9FF',
                  border: '1px solid rgba(175, 169, 236, 0.25)',
                  borderRadius: '10px',
                  boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.15s, border-color 0.15s, color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#D5D1F8';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(127,119,221,0.12)';
                  e.currentTarget.style.color = '#534AB7';
                  e.currentTarget.style.backgroundColor = '#EEF0FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(175, 169, 236, 0.25)';
                  e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.color = '#212529';
                  e.currentTarget.style.backgroundColor = '#F8F9FF';
                }}
              >
                <span>{materia.nombre}</span>
                <span style={{ fontSize: '18px', color: '#adb5bd' }}>›</span>
              </Link>
            ))}
          </div>
        )}

      </Col>
    </Row>
  );
};