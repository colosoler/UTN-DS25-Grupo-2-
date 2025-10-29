import { useState } from 'react';
import { MoreVertical, Eye } from 'lucide-react';
import { Vote } from './Vote';
import { Share } from './Share';
import { Link } from 'react-router-dom';
import { ReportModel } from './ReportModel';
import './styles/MaterialCard.css';

export const MaterialCard = ({ material }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getCarreraName = (carreraId) => {
    const carreras = {
      1: 'Ingeniería en Sistemas',
      3: 'Ingeniería Química',
      4: 'Ingeniería Industrial',
      5: 'Ingeniería Mecánica',
      6: 'Ingeniería Civil',
      7: 'Ingeniería Eléctrica'
    };
    return carreras[carreraId];
  };

  return (
    <div className="card-container">
      <div className="study-card">
        
        <div className="card-header">
          <div className="card-title-section">
            <h3 className="card-title">{material.titulo}</h3>
            <div className="card-meta">
              <span className="card-user">Por <span className="card-username">{material.username}</span></span>
              <span className="separator">•</span>
              <span className="card-date">{formatDate(material.fecha)}</span>
            </div>
          </div>
          
          <div className="menu-container">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="menu-button"
              aria-label="Más opciones"
            >
              <MoreVertical className="icon" />
            </button>
            
            {showMenu && (
              <div className="menu-dropdown">
                <ReportModel />
                <Share shareUrl={`${window.location.origin}/material/${material?.id}`} />
              </div>
            )}
          </div>
        </div>

        <div className="card-badges">
            <span className="badge badge-type">{material.tipo}</span>
            <span className="badge badge-career">{getCarreraName(material.carreraId)}</span>
        </div>

        <div className="card-footer">
            <Vote material={material} />
            <Link to={`/material/${material.id}`} className="btn-view-material">
                <Eye className="icon-btn" />
                Ver Material
            </Link>
        </div>
      </div>
    </div>
  );
};