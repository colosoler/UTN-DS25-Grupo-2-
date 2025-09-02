import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch'
import { CarreraDetailAnio } from '../Components/CarreraDetailAnio'
const anios = [
  {
    anio: "1ero",
    materias: [
      { id: 1, nombre: "Matemáticas" },
      { id: 2, nombre: "Física" },
      { id: 3, nombre: "Programación" }
    ]
  },
  {
    anio: "2do",
    materias: [
      { id: 4, nombre: "Álgebra" },
      { id: 5, nombre: "Química" },
      { id: 6, nombre: "Estructuras de Datos" }
    ]
  },
  {
    anio: "3ero",
    materias: [
      { id: 7, nombre: "Cálculo" },
      { id: 8, nombre: "Estadística" },
      { id: 9, nombre: "Bases de Datos" }
    ]
  },
  {
    anio: "4to",
    materias: [
      { id: 10, nombre: "Redes" },
      { id: 11, nombre: "Sistemas Operativos" },
      { id: 12, nombre: "Ingeniería de Software" }
    ]
  },
  {
    anio: "5to",
    materias: [
      { id: 13, nombre: "Inteligencia Artificial" },
      { id: 14, nombre: "Machine Learning" },
      { id: 15, nombre: "Desarrollo Web" }
    ]
  }
]
function sortCarreraMateriasByAnio(carreraMaterias) {
  let anios = [];
  for (let i = 0; i < carreraMaterias.at(-1).anio; i++) {
    anios[i] = {
      anio: i,
      materias: carreraMaterias
        .filter((cm) => (cm.anio === i+1))
        .map((cm) => (cm.materia))
    }
  }
  console.log(carreraMaterias.at(-1).anio);
  return anios;
}
export const CarreraDetailApp = () => {
  const { id } = useParams();
  const { data: carrera, isLoading, error } = useFetch('carreras/' + id)
  if (isLoading) return <h1>Cargando...</h1>
  if (error) { console.log(error); return <h1>Ha Ocurrido un Error</h1> }
  return (
    <Container>
      <Row className='align-items-center my-3'>
        <Col>
        <h1>{carrera.nombre}</h1>
        </Col>
        <Col className="icon-container h-100">        
          <i className={`bi ${carrera.icon} carrera-icon`}></i>
        </Col>
      </Row>
      <Accordion>
        {sortCarreraMateriasByAnio(carrera.materias)
          .map((anio) =>
            <CarreraDetailAnio key={anio.anio} anio={anio} carreraId={id}/>
          )
        }
      </Accordion>
    </Container>
  )
}

