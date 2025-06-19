import './styles/Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📝<strong>UTN</strong>otas</span>
      </div>
      <div className="navbar-icons">
        <Link to="/home"><img src="./images/hogar.png" alt="Inicio"/></Link>
        <Link to="/add"><img src="./images/plus-pequeno.png" alt="Agregar contenido"/></Link>
        <img src="./images/avatar.png" alt="Perfil"/>
      </div>
    </nav>
  )
}


