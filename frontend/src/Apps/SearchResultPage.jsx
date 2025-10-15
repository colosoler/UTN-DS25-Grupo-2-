import { Searchbar } from '../Components/Searchbar.jsx'
import { Result } from '../Components/Result.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import { useSearchParams } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import './styles/SearchResultPage.css';

export const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${API_URL}/materials/?` + searchParams.toString());
  if (loading) return <p>Cargando apuntes...</p>;
  if (error) return <p>Error: {error.message}</p>;
  

  return (
    <>
      <Container className='p-4'>
          <Searchbar/>
        <section id='results'>
          <div className="results-list">
            {data.data.map(result => (
              <Result key={result.id} result={result}/>
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}