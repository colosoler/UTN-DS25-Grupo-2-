import { MaterialApp } from './MaterialApp';
import { useFetch } from '../Hooks/useFetch';
import { SERVER_URL } from '../Constants';
import { useParams } from 'react-router-dom';

function MaterialRouteWrapper() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch("/apuntes", SERVER_URL);
  if (isLoading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const result = data.find(item => item.id === Number(id));
  if (!result) return <h2>Material no encontrado</h2>;
  return <MaterialApp result={result} />;
}

export default MaterialRouteWrapper;
