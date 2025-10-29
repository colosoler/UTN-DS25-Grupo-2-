import Information from '../Components/Information'
import { Material } from '../Components/Material';
import { Buttons } from '../Components/Buttons';
import { useFetch } from '../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export const MaterialPage = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { user } = useAuth();

  const { data: material, loading, error } = useFetch(`${API_URL}/materials/${id}`,
    {},
    { requireAuth: false}
  );
  
  if (loading) return <p className="loading">Cargando material...</p>;
  if (error) return <p className="error">Error al cargar: {error.message}</p>;
  if (!material) return <p>No se encontró el material.</p>;

  return (
    <>
      <section className="container">
      <h1 style={{ margin: '1em' }}>{material.data.titulo}</h1>
        <div className='row'>

          <div className="col-12 col-md-9">
            <Material archivo={material.data.archivo} />
          </div>
          <div className='col-12 col-md-3'>
            <Information material={material.data} />
            <Buttons material={material.data} user={user}/>
          </div>
        </div>
      </section>
    </>
  );
}