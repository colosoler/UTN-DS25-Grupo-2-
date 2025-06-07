import './styles/Carrera.css';

export const Carrera = ({carrera}) => {
  return (
    <div className="carrera">
      <img src={carrera.image} alt={carrera.name} />
      <h2>{carrera.name}</h2>
    </div>
  )
}
