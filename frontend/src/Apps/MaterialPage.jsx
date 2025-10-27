import Information from '../Components/Information'
import { Material } from '../Components/Material';
import {Buttons} from '../Components/Buttons';
import { useFetch } from '../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import './styles/MaterialPage.css';

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
      <h1 className='title'>Titulo: {material.data.titulo}</h1>
      <div className='material-layout-container'>
        <div className='material-main-content'>
          <Material archivo={material.data.archivo} />
        </div>
        <div className='material-sidebar'>
          <Information material={material.data} />
          <div className='material-icons'>
            <Buttons material={material.data} user={user}/>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}