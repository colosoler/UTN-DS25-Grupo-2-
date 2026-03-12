import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthField } from "./AuthField";

export const DeleteAccount = ({ show, onHide, onConfirm }) => {
  const [step, setStep] = useState(1); // 1 = confirmación, 2 = pedir contraseña
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const passwordRef = useRef();

  const handleClose = () => {
    setStep(1);
    setPassword("");
    setError("");
    setIsDeleting(false);
    onHide();
  };

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Debés ingresar tu contraseña");
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      await onConfirm(password);
    } catch (err) {
      setError(err.message || "Contraseña incorrecta");
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1 ? "Confirmar eliminación" : "Verificar identidad"}
        </Modal.Title>
      </Modal.Header>

      {step === 1 && (
        <>
          <Modal.Body>
            <p>¿Estás seguro de que querés eliminar tu cuenta?</p>
            <p className="text-danger">
              <small>Esta acción no se puede deshacer.</small>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleFirstConfirm}>
              Eliminar cuenta
            </Button>
          </Modal.Footer>
        </>
      )}

      {step === 2 && (
        <Form onSubmit={handleDelete}>
          <Modal.Body>
            <p>Ingresá tu contraseña para confirmar la eliminación de tu cuenta.</p>
            <AuthField
              id="deletePassword"
              type="password"
              placeholder="Contraseña"
              registerField={{
                ref: passwordRef,
                name: "password",
                value: password,
                onChange: (e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                },
              }}
              error={error}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="danger" type="submit" disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Confirmar eliminación"}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal>
  );
};
