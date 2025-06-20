import { Modal, Button } from 'react-bootstrap';

export const DeleteConfirmModal = ({ show, onHide, onConfirm, materialTitle }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que queres eliminar este material?</p>
        {materialTitle && (
          <p className="text-muted">
            <strong>"{materialTitle}"</strong>
          </p>
        )}
        <p className="text-danger">
          <small>Esta acción no se puede deshacer.</small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};