import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Container, Button } from 'react-bootstrap';

export const LoginRequired = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login'); 
    };

    if (user && user.id) {
        return <>{children}</>;
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <div 
                className="p-5 text-center rounded-4 shadow-lg" 
                style={{ 
                    maxWidth: '600px',
                    width: '100%',
                    background: 'linear-gradient(145deg, var(--primary-color) 0%, var(  --secondary-color) 100%)', 
                    color: 'white',
                }}
            >
                <i 
                    className="bi bi-lock-fill display-4" 
                    style={{ marginBottom: '0.5rem' }} 
                />
                <h2 className="fs-2 fw-bold mb-3">Contenido Exclusivo</h2>
                <p className="fs-5 mb-5" style={{ opacity: 0.9 }}>
                    Necesitás iniciar sesión para usar esta función.                
                </p>
                <Button 
                    variant="light"
                    onClick={handleLoginRedirect}
                    className="w-75 fw-bold py-2 fs-5"
                >
                    Iniciar sesión
                </Button>
            </div>
        </Container>
    );
};