import { Modal, Button } from 'react-bootstrap';

export const DeleteConfirm = ({ show, onHide, onConfirm, message, materialTitle, confirmText="acción", buttonTitle="Confirmar", danger=true }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar {confirmText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
        {materialTitle && (
          <p className="text-muted">
            <strong>"{materialTitle}"</strong>
          </p>
        )}
        {danger && (
          <p className="text-danger">
            <small>Esta acción no se puede deshacer.</small>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {buttonTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
