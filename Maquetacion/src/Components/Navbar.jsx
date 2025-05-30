import './styles/Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📝<strong>UTN</strong>otas</span>
      </div>
      <div className="navbar-icons">
        <img src="./images/hogar.png" alt="Inicio"/>
        <img src="./images/plus-pequeno.png" alt="Agregar contenido"/>
        <img src="./images/avatar.png" alt="Perfil"/>
      </div>
    </nav>
  )
}


