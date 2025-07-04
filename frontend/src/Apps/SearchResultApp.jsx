import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { SERVER_URL } from '../Constants.js';
import './styles/SearchResultApp.css';

export const SearchResultApp = () => {
  const { data, isLoading, error } = useFetch("/apuntes", SERVER_URL);
  if (isLoading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getFilteredResults = () => {
    const carrera = data.get('carrera');
    const materia = data.get('materia');
    const tipo = data.get('tipo');
    const parcial = data.get('parcial');
    const comision = data.get('comision');
    //filtrar
    return data 
  }

    return (
      <>
        <Searchbar></Searchbar>
        <section id='results'>
          <div className="results-list">
            {data.map(result => (
              <Result key={result.id} result={result} shareUrl={`${window.location.origin}/material/${result.id}`} />
            ))}
          </div>
        </section>
      </>
    )
  }
