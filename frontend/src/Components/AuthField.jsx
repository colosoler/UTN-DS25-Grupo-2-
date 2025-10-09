import { useState } from "react";
import { Form } from "react-bootstrap";
import EyeOpen from "/images/ojo.png";
import EyeClosed from "/images/cerrar-ojo.png";

export const AuthField = ({ id, type, placeholder, error, registerField }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Form.Group controlId={id} className="mb-3">
      <div style={{ position: "relative" }}>
        <Form.Control
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...registerField}           // react-hook-form controla value y onChange
          className={error ? "input-error" : ""} // aplica borde rojo si hay error
          style={{ paddingRight: isPassword ? "40px" : undefined }}
        />

        {isPassword && (
          <img
            src={showPassword ? EyeOpen : EyeClosed}
            alt={showPassword ? "Ocultar" : "Mostrar"}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      {error && <div className="field-error">{error}</div>}
    </Form.Group>
  );
};
