import { MaterialApp } from './MaterialApp';
import { useParams } from 'react-router-dom';

function MaterialRouteWrapper({ results }) {
  const { id } = useParams();
  const result = results.find(item => item.id === Number(id));
  if (!result) return <h2>Material no encontrado</h2>;
  return <MaterialApp result={result} />;
}

export default MaterialRouteWrapper;
