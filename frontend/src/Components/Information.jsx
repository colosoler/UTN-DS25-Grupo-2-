import Accordion from 'react-bootstrap/Accordion';
import './styles/Information.css';
import { useFetch } from '../Hooks/useFetch';

function Information({ material }) {

  const API_URL = import.meta.env.VITE_API_URL;

  const { data: usuario, loading, error } = useFetch(material?.userId ? `${API_URL}/users/${material.userId}` : null,
    {},
    { requireAuth: false}
  );

  const { data: materia} = useFetch(material?.materiaId ? `${API_URL}/materias/${material.materiaId}` : null,
    {},
    { requireAuth: false}
  );
  console.log('Materia: ', materia)
  if (!materia) return null;

  return (
    <Accordion className='info-accordion'>
      <Accordion.Item eventKey="0">
        <Accordion.Header className='accordion-header'>Información</Accordion.Header>
        <Accordion.Body className='accordion-body'>
          {loading && <p className='info-loading'>Cargando usuario...</p>}
          {error && <p className='info-error'>Error al cargar usuario.</p>}
          {(usuario && materia ) && (
            <div className='info-content'>
              <h5 className='username'>Creado por: @{usuario.username}</h5>
              <p className='info-item'><strong>Materia: </strong> {materia.materia.nombre}</p>
              <p className='info-item'><strong>Año cursada: </strong> {material.añoCursada}</p>
              <p className='info-item'><strong>Tipo: </strong> {material.tipo}</p>
              {material.descripcion && (
                <p className='info-item'><strong>Descripción: </strong> {material.descripcion}</p>
              )}
            </div>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Information;