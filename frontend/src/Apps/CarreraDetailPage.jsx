import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch';
import { CarreraDetailAnio } from '../Components/CarreraDetailAnio';
import { intToAnioString } from '../Helpers/intToAnioString';
import { Loading } from '../Components/Loading';

function sortCarreraMateriasByAnio(carreraMaterias) {
  let anios = [];
  for (let i = 0; i < carreraMaterias.at(-1).anio; i++) {
    anios[i] = {
      anio: intToAnioString(i + 1),
      materias: carreraMaterias
        .filter((cm) => cm.anio === i + 1)
        .map((cm) => cm.materia),
    };
  }
  return anios;
}

const API_URL = import.meta.env.VITE_API_URL;

export const CarreraDetailPage = () => {
  const { id } = useParams();
  const { data: carrera, loading, error } = useFetch(`${API_URL}/carreras/${id}`);
  const [anioActivo, setAnioActivo] = useState(0);

  if (loading || !carrera) return <Loading />;
  if (error) { console.log(error); return <h1>Ha Ocurrido un Error</h1>; }

  const anios = carrera.materias.length > 0
    ? sortCarreraMateriasByAnio(carrera.materias)
    : [];

  return (
    <Container>

      {/* acá se muestra el título de la carrera */}
      <Row className="align-items-center my-4 justify-content-center">
        <Col xs="auto" className="d-flex align-items-center gap-3">
          <h1 className="mb-0">{carrera.nombre}</h1>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '64px', height: '64px', backgroundColor: '#f0f0f0' }}
          >
            <i className={`bi ${carrera.icon} carrera-icon`} style={{ fontSize: '2rem' }}></i>
          </div>
        </Col>
      </Row>

      {anios.length === 0 ? (
        <p className="text-center my-4">No hay materias disponibles para esta carrera</p>
      ) : (
        <>
          {/* "Botones" de años*/}
          <Row className="justify-content-center mb-4">
            <Col xs="auto">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {anios.map((anio, index) => (
                  <button
                    key={anio.anio}
                    onClick={() => setAnioActivo(index)}
                    style={{
                      padding: '6px 18px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      border: anioActivo === index ? '1px solid #AFA9EC' : '1px solid #dee2e6',
                      backgroundColor: anioActivo === index ? '#EEEDFE' : 'white',
                      color: anioActivo === index ? '#3C3489' : '#6c757d',
                      fontWeight: anioActivo === index ? '600' : '400',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {anio.anio}
                  </button>
                ))}
              </div>
            </Col>
          </Row>

          {/* con esto doy estilo al año seleccionado */}
          <CarreraDetailAnio
            anio={anios[anioActivo]}
            carreraId={id}
          />
        </>
      )}

    </Container>
  );
};