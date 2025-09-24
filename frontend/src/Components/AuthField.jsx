import { useState } from "react";
import { Form } from "react-bootstrap";
import EyeOpen from "/images/ojo.png";
import EyeClosed from "/images/cerrar-ojo.png";

export const AuthField = ({ id, type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Form.Group controlId={id} className="mb-3">
      <div style={{ position: "relative" }}>
        <Form.Control
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ paddingRight: isPassword ? "40px" : undefined }} // espacio para el ojo
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

      {error && (
        <div style={{ color: "red", marginTop: "5px", textAlign: "center" }}>
          {error}
        </div>
      )}
    </Form.Group>
  );
};
