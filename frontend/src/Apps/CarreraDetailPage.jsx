import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch'
import { CarreraDetailAnio } from '../Components/CarreraDetailAnio'
import { intToAnioString } from '../Helpers/intToAnioString';
import { Loading } from '../Components/Loading';

function sortCarreraMateriasByAnio(carreraMaterias) {
  let anios = [];
  for (let i = 0; i < carreraMaterias.at(-1).anio; i++) {
    anios[i] = {
      anio: intToAnioString(i+1),
      materias: carreraMaterias
        .filter((cm) => (cm.anio === i+1))
        .map((cm) => (cm.materia))
    }
  }
  return anios;
}

const API_URL = import.meta.env.VITE_API_URL;

export const CarreraDetailPage = () => {
  const { id } = useParams();
  const { data: carrera, loading, error } = useFetch(`${API_URL}/carreras/${id}`)

  if (loading || !carrera) {return <Loading />};
  if (error) { console.log(error); return <h1>Ha Ocurrido un Error</h1> }
  return (
    <Container>
      <Row className="align-items-center my-3 justify-content-center">
        <Col xs="auto" className="d-flex align-items-center">
          <h1 className="mb-0 me-3">{carrera.nombre}</h1>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#f0f0f0'
            }}
          >
            <i className={`bi ${carrera.icon} carrera-icon`} style={{ fontSize: '2rem' }}></i>
          </div>
        </Col>
      </Row>
      <Accordion>
        {carrera.materias.length>0?sortCarreraMateriasByAnio(carrera.materias)
          .map((anio) =>
            <CarreraDetailAnio key={anio.anio} anio={anio} carreraId={id}/>
          )
          :<p className='text-center my-4'>No hay materias Disponibles para esta carrera</p>
        }
      </Accordion>
    </Container>
  )
}