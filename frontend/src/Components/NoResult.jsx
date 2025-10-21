import React from 'react';
import './styles/NoResult.css';

export default function NoResults({message}) {
  return (
    <div className="no-results-container">
      {/* Lupa con cruz centrada */}
      <div className="search-icon-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <svg className="x-icon" viewBox="-1 -1 31 30" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="6" y1="6" x2="18" y2="18"></line>
          <line x1="18" y1="6" x2="6" y2="18"></line>
        </svg>
      </div>

      <h3 className="no-results-title">
       {message || "No se encontraron resultados"}
      </h3>
      <p className="no-results-description">
        Intentá ajustar tu búsqueda o explora otras opciones disponibles
      </p>
    </div>
  );
}