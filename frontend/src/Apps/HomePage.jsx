import { Carrera } from '../Components/Carrera.jsx';
import { Loading } from '../Components/Loading.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import { useFetch } from '../Hooks/useFetch.jsx';
import './styles/HomePage.css';

export const HomePage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data: carreras, loading, error } = useFetch(`${API_URL}/carreras`, {}, { requireAuth: false });

  if (loading) {
    return <Loading />
  };

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
          <p>Elegí la ingeniería que te interesa para ver su contenido.</p>
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
