// src/Components/Material.jsx
import React from 'react'; 
import './styles/Material.css';

export const Material = ({ archivo }) => {
    
    if (!archivo) return <p>No hay material para mostrar.</p>;

    const handleOpen = () => {
        window.open(archivo, '_blank'); 
    };
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(archivo)}&embedded=true`;

    return (
        <div className="material-container">
            <div className='pdf-card-preview'>
                <div className='pdf-card-header'>
                    <svg className="pdf-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V8h2v9zm4 0h-2V8h2v9zm4 0h-2V8h2v9z"/>
                    </svg>
                    {/* Usamos el prop 'titulo' */}
                    <span className='pdf-card-filename'>Documento PDF</span>
                    <button className='pdf-card-options'>
                        <svg className="options-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                    </button>
                </div>

                {/* Contenedor del iframe para la vista previa visual */}
                <div className='pdf-preview-fragment'>
                    <iframe
                        src={viewerUrl}
                        title="Vista previa del PDF"
                        width="100%" 
                        // Altura definida por CSS para usar todo el espacio restante
                        height="100%" 
                    >
                    </iframe>
                </div>
            </div>
        </div>
    );
};