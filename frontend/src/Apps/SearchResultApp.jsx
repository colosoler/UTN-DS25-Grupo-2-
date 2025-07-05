import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { SERVER_URL } from '../Constants.js';
import { useSearchParams } from 'react-router-dom';
import './styles/SearchResultApp.css';

export const SearchResultApp = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useFetch("/apuntes", SERVER_URL);
  if (isLoading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const getFilteredResults = () => {
    const carrera = searchParams.get('carrera');
    const materia = searchParams.get('materia');
    const tipo = searchParams.get('tipo');
    const parcial = searchParams.get('parcial');
    const comision = searchParams.get('comision');
    //filtrar en el back
    let filteredResults = data;
    return filteredResults 
  }

    return (
      <>
        <Searchbar></Searchbar>
        <section id='results'>
          <div className="results-list">
            {getFilteredResults().map(result => (
              <Result key={result.id} result={result} shareUrl={`${window.location.origin}/material/${result.id}`} />
            ))}
          </div>
        </section>
      </>
    )
  }
