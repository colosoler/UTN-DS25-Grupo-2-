import { Carrera } from '../Components/Carrera.jsx';
import { Searchbar } from '../Components/Searchbar.jsx';
import './styles/HomeApp.css';

const carreras = [
  { id: 1, 
    name: 'Ingeniería Mecánica', 
    image:'/images/Mecanica.jpg'
  },
  { id: 2, 
    name: 'Ingeniería en Sistemas de Información', 
    image:'/images/Sistemas.jpg'
  },
  { id: 3, 
    name: 'Ingeniería Química', 
    image:'/images/Quimica.jpg'
  },
  { id: 4, 
    name: 'Ingeniería Civil', 
    image:'/images/Civil.jpg'
  },
  { id: 5, 
    name: 'Ingeniería Industrial', 
    image:'/images/Industrial.jpg'
  },
  { id: 6, 
    name: 'Ingeniería Eléctrica', 
    image:'/images/Electrica.jpg'
  },
];

export const HomeApp = () => {
  return (
    <>
    <Searchbar></Searchbar>
    <section id='carreras'>
      <h1>Seleccioná tu carrera</h1>
      <div className="carreras-list">
        {carreras.map(carrera => (
          <Carrera key={carrera.id} carrera={carrera}></Carrera>
        ))}
      </div>
    </section>
    </>
  )
}