import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Container } from 'react-bootstrap';
import { useState } from 'react';
import { DeleteConfirmAccount } from '../Components/DeleteConfirmAccount';
import { Alert } from '../Components/Alert';
import { useAuth } from '../Contexts/AuthContext';

export const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleOpenLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setShowLogoutToast(true);
    logout();
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
        <Container fluid className="d-flex justify-content-between align-items-center">

          <Link to="/home" className="navbar-logo">
            <img src="/images/UTNotas.png" alt="UTNotas Logo" className="logo-img" />
            <span><strong>UTN</strong>otas</span>
          </Link>

          <div className="navbar-icons">
            <Link to="/home" className="d-none d-md-block">
              <img src="./images/hogar.png" alt="Inicio" />
            </Link>

            {isAuthenticated && (
            <Link to="/add">
              <img src="./images/plus-pequeno.png" alt="Agregar contenido" />
            </Link>
            )}

            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="avatar-toggle">
                <img src="./images/avatar.png" alt="Perfil" className="avatar-img" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                { isAuthenticated && (
                  <>
                    <Dropdown.Item className="dropdown-item" as={Link} to="/profile">
                      <img className="dropdown-icon" src="./images/user-icon2.svg" alt="profile" />
                        Ver perfil
                    </Dropdown.Item>

                    <Dropdown.Item className="dropdown-item" as={Link} to="/mymaterials">
                      <img className="dropdown-icon" src="./images/files-icon.svg" alt="mis-publicaciones" />
                        Mis publicaciones
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as={Link} to="/settings">
                      <img className="dropdown-icon" src="./images/settings-icon.svg" alt="configurar" />
                        Configurar perfil
                    </Dropdown.Item>
                  </>
                )}
                {!isAuthenticated && (
                <Dropdown.Item className="dropdown-item" as={Link} to="/signup">
                  <img className="dropdown-icon" src="./images/user-icon2.svg" alt="signup" />
                  Crear cuenta
                </Dropdown.Item>
                )}
                { isAuthenticated && (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item className="dropdown-item" onClick={handleOpenLogoutModal}>
                      <img className="dropdown-icon" src="./images/logout-icon.svg" alt="logout" />
                        Cerrar Sesión
                    </Dropdown.Item>
                  </>
                )}
                </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
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