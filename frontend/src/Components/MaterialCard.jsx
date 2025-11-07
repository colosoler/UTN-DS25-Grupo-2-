import { useState } from 'react';
import { MoreVertical, Eye, Flag, Share2, Edit3, Trash2 } from 'lucide-react';
import { Vote } from './Vote';
import { Link, useNavigate } from 'react-router-dom';
import { ReportModel } from './ReportModel';
import { DeleteConfirm } from "../Components/DeleteConfirm"
import { useAuth } from '../Contexts/AuthContext'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './styles/MaterialCard.css';

export const MaterialCard = ({ material }) => {
  console.log("Material en MaterialCard:", material);
  const [showMenu, setShowMenu] = useState(false);
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  {/* Defino si el usuario que está viendo la card es quién subió el material*/}
  const isOwner = user && (user.id === material.userId)

  {/* Con esto le doy formato lindo a la fecha */}
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  {/* Con esto obtengo el nombre de la carrera */}
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

  {/* Manejo la eliminación del material */}
  const handleDeleteClick = (material) => {
    setMaterialToDelete(material);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
      try {
        await fetch(`${API_URL}/materials/${materialToDelete.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        });
        setMaterials((prev) => prev.filter((m) => m.id !== materialToDelete.id));
      } catch (err) {
        alert("Error al eliminar el material");
      }
      setShowDeleteModal(false);
      setMaterialToDelete(null);
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

          {/* Menú con opciones varias*/}
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

                {!isOwner && (
                  <>
                    {/* Opción Reportar */}
                    <div className="menu-item report-item">
                      <ReportModel materialId={material.id} />
                    </div>
                  </>
                )}


                {/* Opción Compartir */}
                <button
                  className="menu-item"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/material/${material.id}`);
                    setShowCopyMsg(true);
                    setTimeout(() => setShowCopyMsg(false), 2500);
                    setShowMenu(false);
                  }}
                >
                  <Share2 size={16} style={{ marginRight: 8 }} />
                  Compartir
                </button>

                {isOwner && ( 
                  <>
                  {/* Opción Editar */}
                  <button
                    className="menu-item"
                    onClick={() => {
                      navigate(`/edit/${material.id}`);
                      setShowMenu(false);
                    }}
                  >
                    <Edit3 size={16} style={{ marginRight: 8 }} />
                    Editar
                  </button>

                  {/* Opción Eliminar */}
                  <button
                    className="menu-item"
                    onClick={() => handleDeleteClick(material)}
                  >
                    <Trash2 size={16} style={{ marginRight: 8, color: 'red' }} />
                    Eliminar
                  </button>
                  </>
                )}
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

        {/* Mensaje cuando tocan el compartir */}
        <ToastContainer
          position="bottom-center"
          className="p-3"
          style={{position: 'fixed', marginBottom: '20px'}}
        >
          <Toast show={showCopyMsg} bg={'success'} delay={1500} autohide>
            <Toast.Body className="text-white text-center">
              {'¡Link copiado al portapapeles!'}
            </Toast.Body>
          </Toast>
        </ToastContainer>
    
        {/* Muestro pop up para confirmar eliminación */}    
        <DeleteConfirm
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          materialTitle={materialToDelete?.title}
          message={"¿Estás seguro de que queres eliminar este material?"}
        />
        
      </div>
    </div>
  );
};