import { Carrera } from '../Components/Carrera.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import { useNavigate } from 'react-router-dom';
import './styles/HomeApp.css';

export const carreras = [
  { 
    id: 1, 
    name: 'Ingeniería Mecánica', 
    icon: 'bi-gear-fill'
  },
  { 
    id: 2, 
    name: 'Ingeniería en Sistemas de Información', 
    icon: 'bi-laptop'
  },
  { 
    id: 3, 
    name: 'Ingeniería Química', 
    icon: 'bi-flask'
  },
  { 
    id: 4, 
    name: 'Ingeniería Civil', 
    icon: 'bi-building'
  },
  { 
    id: 5, 
    name: 'Ingeniería Industrial', 
    icon: 'bi-tools'
  },
  { 
    id: 6, 
    name: 'Ingeniería Eléctrica', 
    icon: 'bi-lightning-charge-fill'
  },
];

export const HomeApp = () => {
  const navigate = useNavigate();

  const handleCarreraClick = (carreraId) => {
    navigate(`/carrera/${carreraId}`);
  };

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
                onClick={() => handleCarreraClick(carrera.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}