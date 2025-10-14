import { MaterialPage } from './MaterialPage';
import { useFetch } from '../Hooks/useFetch';
import { SERVER_URL } from '../Constants';
import { useParams } from 'react-router-dom';

function MaterialRouteWrapper() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch("/materials", SERVER_URL);
  if (isLoading) return <p>Cargando materiales...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const result = data.find(item => item.id === Number(id));
  if (!result) return <h2>Material no encontrado</h2>;
  return <MaterialPage result={result} />;
}

export default MaterialRouteWrapper;