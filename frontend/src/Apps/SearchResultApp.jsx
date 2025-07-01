import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from './../Components/Result.jsx';
import { useSearchParams } from 'react-router-dom';
import './styles/SearchResultApp.css';

export const SearchResultApp = ({ results }) => {
  const [searchParams] = useSearchParams();

  const getFilteredResults = () => {
    const carrera = searchParams.get('carrera');
    const materia = searchParams.get('materia');
    const tipo = searchParams.get('tipo');
    const parcial = searchParams.get('parcial');
    const comision = searchParams.get('comision');
    //filtrar
    return results 
  }

    return (
      <>
        <Searchbar></Searchbar>
        <section id='results'>
          <div className="results-list">
            {results.map(result => (
              <Result key={result.id} result={result} shareUrl={`${window.location.origin}/material/${result.id}`} />
            ))}
          </div>
        </section>
      </>
    )
  }
