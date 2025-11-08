import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Container } from 'react-bootstrap';
import { useState } from 'react';
import { DeleteConfirm } from '../Components/DeleteConfirm';
import { Alert } from '../Components/Alert';
import { useAuth } from '../Contexts/AuthContext';

export const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const navigate = useNavigate();

  const handleOpenLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setShowLogoutToast(true);
    logout();
    setTimeout(() => {
      navigate('/login');
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

          <Link to="/" className="navbar-logo">
            <img src="/images/UTNotas.png" alt="UTNotas Logo" className="logo-img" />
            <span><strong>PAPUN</strong>otas</span>
          </Link>

          <div className="navbar-icons">
            <Link to="/" className="d-none d-md-block">
              <img src="/images/hogar.png" alt="Inicio" />
            </Link>

            <Link to="/ranking" className="ranking-icon" title="Ranking de Usuarios">
              <img src="/images/ranking.png" alt="Ranking" />
            </Link>

            {isAuthenticated && (
            <Link to="/add">
              <img src="/images/plus-pequeno.png" alt="Agregar contenido" />
            </Link>
            )}

            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="avatar-toggle">
                <img src="/images/avatar.png" alt="Perfil" className="avatar-img" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                { isAuthenticated && (
                  <>
                    <Dropdown.Item className="dropdown-item" as={Link} to="/profile">
                      <img className="dropdown-icon" src="/images/user-icon2.svg" alt="profile" />
                        Ver perfil
                    </Dropdown.Item>

                    <Dropdown.Item className="dropdown-item" as={Link} to="/mymaterials">
                      <img className="dropdown-icon" src="/images/files-icon.svg" alt="mis-publicaciones" />
                        Mis publicaciones
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as={Link} to="/settings">
                      <img className="dropdown-icon" src="/images/settings-icon.svg" alt="configurar" />
                        Configurar perfil
                    </Dropdown.Item>
                  </>
                )}
                {isAdmin && (
                  <Dropdown.Item className="dropdown-item" as={Link} to="/admin">
                  <img className="dropdown-icon" src="/images/admin-icon.svg" alt="admin" />
                    Panel de Administrador
                  </Dropdown.Item>
                )}
                {!isAuthenticated && (
                <Dropdown.Item className="dropdown-item" as={Link} to="/login">
                  <img className="dropdown-icon" src="/images/user-icon2.svg" alt="login" />
                  Iniciar sesión
                </Dropdown.Item>
                )}
                { isAuthenticated && (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item className="dropdown-item" onClick={handleOpenLogoutModal}>
                      <img className="dropdown-icon" src="/images/logout-icon.svg" alt="logout" />
                        Cerrar Sesión
                    </Dropdown.Item>
                  </>
                )}
                </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </nav>

      <DeleteConfirm
        show={showLogoutModal}
        onHide={handleCloseLogoutModal}
        onConfirm={handleConfirmLogout}
        confirmText="acción"
        message="¿Estás seguro de que querés cerrar sesión?"
        confirmVariant="danger"
        buttonTitle="Cerrar sesión"
        danger={false}
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