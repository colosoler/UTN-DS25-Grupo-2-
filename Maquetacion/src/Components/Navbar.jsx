import './styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📝<strong>UTN</strong>otas</span>
      </div>
      <div className="navbar-icons">
        <Link to="/home"><img src="./images/hogar.png" alt="Inicio" /></Link>
        <Link to="/add"><img src="./images/plus-pequeno.png" alt="Agregar contenido" /></Link>
        <Dropdown align="end">
          <Dropdown.Toggle as="div" className="avatar-toggle">
            <img src="./images/avatar.png" alt="Perfil" className="avatar-img" />
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-menu'>
            <Dropdown.Item className='dropdown-item' as={Link} to="/profile">
              <img className='dropdown-icon' src="./images/user-icon2.svg" alt="profile" />
              Ver perfil</Dropdown.Item>
            <Dropdown.Item className='dropdown-item' as={Link} to="/myposts">
              <img className='dropdown-icon' src="./images/settings-icon.svg" alt="profile-settings" />
              Mis publicaciones</Dropdown.Item>
            <Dropdown.Item className='dropdown-item' as={Link} to="/settings">
              <img className='dropdown-icon' src="./images/settings-icon.svg" alt="profile-settings" />
              Configurar perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className='dropdown-item' as={Link} to="/deleteprofile">
              <img className='dropdown-icon' src="./images/logout-icon.svg" alt="logout" />
              Cerrar Sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  )
}


