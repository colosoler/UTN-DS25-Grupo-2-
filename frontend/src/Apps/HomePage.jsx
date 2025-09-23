import { Carrera } from '../Components/Carrera.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import './styles/HomePage.css';

export const HomePage = () => {
  const { data: carreras, loading, error } = useFetch('http://localhost:3000/carreras', {}, { requireAuth: false });

  if (loading) return <h1>Cargando...</h1>;
  if (error) {
    console.error(error);
    return <h1>Ha Ocurrido un Error</h1>;
  }
  return (
    <div className="home-wrapper">
      <Searchbar />
      <section id="carreras">
        <div className="carreras-container">
          <h1>Seleccioná tu carrera</h1>
          <div className="carreras-grid">
            {carreras?.map(carrera => (
              <Carrera
                key={carrera.id}
                carrera={carrera}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
