import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { DeleteConfirmAccount } from '../Components/DeleteConfirmAccount';
import { Alert } from '../Components/Alert'; 

export const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const navigate = useNavigate();

  const handleOpenLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setShowLogoutToast(true);

    // Simulás el cierre de sesión (limpiar token, etc) acá si corresponde

    // Después de 3 segundos (mismo timeout que el toast) navegás a login o home
    setTimeout(() => {
      navigate('/');
      setShowLogoutToast(false);
    }, 3000);
  };

  const handleToastClose = () => {
    setShowLogoutToast(false);
  };

  return (
    <>
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
                Ver perfil
              </Dropdown.Item>
              <Dropdown.Item className='dropdown-item' as={Link} to="/myposts">
                <img className='dropdown-icon' src="./images/files-icon.svg" alt="mis-publicaciones" />
                Mis publicaciones
              </Dropdown.Item>
              <Dropdown.Item className='dropdown-item' as={Link} to="/settings">
                <img className='dropdown-icon' src="./images/settings-icon.svg" alt="configurar" />
                Configurar perfil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className='dropdown-item' onClick={handleOpenLogoutModal}>
                <img className='dropdown-icon' src="./images/logout-icon.svg" alt="logout" />
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>

      <DeleteConfirmAccount
        show={showLogoutModal}
        onHide={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="acción"
        message="¿Estás seguro de que querés cerrar sesión?"
        confirmVariant="danger"
        buttonTitle="Cerrar sesión"
      />

      <Alert
        show={showLogoutToast}
        message="Sesión cerrada correctamente"
        onClose={handleToastClose}
        variant="success"
      />
    </>
  );
};
