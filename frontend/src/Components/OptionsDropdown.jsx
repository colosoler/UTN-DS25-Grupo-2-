import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MoreHorizontal } from 'lucide-react';
import { DeleteConfirm } from './DeleteConfirm';
import { getToken } from '../Helpers/auth';
import { Alert } from './Alert';
import { useNavigate } from 'react-router-dom';
import './styles/OptionsDropdown.css';

export const OptionsDropdown = ({ material }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success'});

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/materials/${material.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al eliminar el material');
      }
      
      setAlert({
        show: true,
        message: 'Material eliminado correctamente.',
        variant: 'success',
      })

      setShowDeleteModal(false);

      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.log('Error eliminando material: ', error);
      setAlert({
        show: true,
        message: 'Ocurrió un error al eliminar el material.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle 
          variant="link" 
          id="dropdown-options"
          className="options-toggle p-0 border-0"
        >
          <MoreHorizontal />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleDeleteClick} className="text-danger">
            Eliminar
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <DeleteConfirm
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        materialTitle={material.title}
        message={"¿Estás seguro de que queres eliminar este material?"}
      />

      <Alert
        show={alert.show}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({ ...alert, show: false})}
      />
    </>
  );
};