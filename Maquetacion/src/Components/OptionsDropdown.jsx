import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { MdMoreHoriz } from 'react-icons/md';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import './styles/OptionsDropdown.css';

export const OptionsDropdown = ({ result }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
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
          <MdMoreHoriz />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleDeleteClick} className="text-danger">
            Eliminar
          </Dropdown.Item>
          {/* Con mas Dropdown.Item podemos agregar mas opciones cuando queramos */}
        </Dropdown.Menu>
      </Dropdown>

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        materialTitle={result.title}
      />
    </>
  );
};