import { Carrera } from '../Components/Carrera.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import { useFetch } from '../Hooks/useFetch.jsx'
import './styles/HomeApp.css';

export const HomeApp = () => {
  const { data:carreras, isLoading, error }=useFetch('carreras/')
  if (isLoading) return <h1>Cargando...</h1>
  if (error) {console.log(error); return <h1>Ha Ocurrido un Error</h1>}
  return (
    <div className="home-wrapper">
      <Searchbar />
      <section id='carreras'>
        <div className="carreras-container">
          <h1>Seleccioná tu carrera</h1>
          <div className="carreras-grid">
            {carreras.map(carrera => (
                <Carrera
                  key={carrera.id}
                  carrera={carrera}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}