import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as RBNavbar, Nav, Dropdown, Container } from 'react-bootstrap';
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
      <RBNavbar expand="lg" className="navbar">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Logo + título como Link */}
          <RBNavbar.Brand as={Link} to="/home" className="navbar-logo">
            <img src="/images/UTNotas.png" alt="UTNotas Logo" className="logo-img" />
            <span><strong>UTN</strong>otas</span>
          </RBNavbar.Brand>

          {/* Íconos a la derecha */}
          <Nav className="navbar-icons">
            <Link to="/home"><img src="./images/hogar.png" alt="Inicio" /></Link>
            <Link to="/add"><img src="./images/plus-pequeno.png" alt="Agregar contenido" /></Link>
            
            {/* Dropdown de perfil */}
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="avatar-toggle">
                <img src="./images/avatar.png" alt="Perfil" className="avatar-img" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item className="dropdown-item" as={Link} to="/profile">
                  <img className="dropdown-icon" src="./images/user-icon2.svg" alt="profile" />
                  Ver perfil
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item" as={Link} to="/myposts">
                  <img className="dropdown-icon" src="./images/files-icon.svg" alt="mis-publicaciones" />
                  Mis publicaciones
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item" as={Link} to="/settings">
                  <img className="dropdown-icon" src="./images/settings-icon.svg" alt="configurar" />
                  Configurar perfil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item" onClick={handleOpenLogoutModal}>
                  <img className="dropdown-icon" src="./images/logout-icon.svg" alt="logout" />
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </RBNavbar>

      {/* Modal de logout */}
      <DeleteConfirmAccount
        show={showLogoutModal}
        onHide={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="acción"
        message="¿Estás seguro de que querés cerrar sesión?"
        confirmVariant="danger"
        buttonTitle="Cerrar sesión"
      />

      {/* Toast de confirmación */}
      <Alert
        show={showLogoutToast}
        message="Sesión cerrada correctamente"
        onClose={handleToastClose}
        variant="success"
      />
    </>
  );
};
