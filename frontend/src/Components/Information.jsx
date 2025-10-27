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
  if (!materia) return null;

  return (
    <div className="info-card">
      <h4 className="info-card-header">
        Información del Material
      </h4>
      <div className="info-card-body">
        {loading && <p className='info-loading'>Cargando usuario...</p>}
        {error && <p className='info-error'>Error al cargar usuario.</p>}
        
        {usuario && materia && !loading && (
          <div className="info-content">
            <h5 className="username">Creado por: @{usuario.username}</h5>
            <p className="info-item">
              <strong>Materia: </strong> {materia.materia.nombre}
            </p>
            <p className="info-item">
              <strong>Año cursada: </strong> {material.añoCursada}
            </p>
            <p className="info-item">
              <strong>Tipo: </strong> {material.tipo}
            </p>
            {material.descripcion && (
              <p className="info-item info-item-description">
                <strong>Descripción: </strong> {material.descripcion}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Information;