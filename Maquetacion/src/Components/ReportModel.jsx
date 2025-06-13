import { useState } from 'react';
import { MdFlag } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [reason, setReason] = useState('');
const [otherReason, setOtherReason] = useState('');

const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== 'other') {
        setOtherReason('');
    }
};

return (
    <>
        <div onClick={handleShow}>
            <MdFlag />
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>¿Querés reportar este apunte?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Por favor, seleccioná el motivo por el cual estás reportando este contenido. Esto nos ayuda a mantener la comunidad segura y útil para todos.
                </p>
                <select value={reason} onChange={handleReasonChange}>
                    <option value="" disabled hidden>
                        Seleccioná un motivo
                    </option>
                    <option value="inappropriate">Contenido inapropiado</option>
                    <option value="spam">Spam o publicidad</option>
                    <option value="plagiarism">Plagio o infracción de derechos de autor</option>
                    <option value="other">Otro motivo</option>
                </select>
                {reason === 'other' && (
                    <Form.Group className="mt-3">
                        <Form.Label>Por favor, especificá el motivo</Form.Label>
                        <Form.Control
                            type="text"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Escribí el motivo aquí"
                        />
                    </Form.Group>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}

export default Example;