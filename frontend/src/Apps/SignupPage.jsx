import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Alert } from "../Components/Alert";
import { AuthContainer } from "../Components/AuthContainer";
import { AuthField } from "../Components/AuthField";
import "./styles/SignupPage.css";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    career: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const navigate = useNavigate();

  // Función genérica para actualizar campos y limpiar error
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: "" });
  };

  // Configuración de los campos de texto
  const fields = [
    { id: "formName", name: "name", placeholder: "Nombre", type: "text" },
    { id: "formSurname", name: "surname", placeholder: "Apellido", type: "text" },
    { id: "formUsername", name: "username", placeholder: "Usuario", type: "text" },
    { id: "formEmail", name: "email", placeholder: "Correo electrónico", type: "email" },
    { id: "formPassword", name: "password", placeholder: "Contraseña", type: "password" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    // Validación genérica: si el input está vacío, muestra "Ingresá un [placeholder]"
    fields.forEach(({ name, placeholder }) => {
      if (!formData[name]) errors[name] = `Ingresá tu ${placeholder.toLowerCase()}`;
    });

    // Validación del select
    if (!formData.career) errors.career = "Seleccioná tu carrera";

    setFormErrors(errors);

    // Si hay errores, no continuar
    if (Object.keys(errors).length > 0) return;

    // Simulamos éxito
    setShowSuccessToast(true);
    setTimeout(() => navigate("/home"), 1000);
  };

  const handleToastClose = () => setShowSuccessToast(false);

  return (
    <AuthContainer type="signup" onSubmit={handleSubmit}>
      <h2>Crear Cuenta</h2>

      {/* Inputs */}
      {fields.map(({ id, name, placeholder, type }) => (
        <AuthField
          key={id}
          id={id}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange(name)}
          error={formErrors[name]}
        />
      ))}

      {/* Select de carrera */}
      <Form.Group controlId="formCareer" className="mb-3">
        <Form.Select
          value={formData.career}
          onChange={handleChange("career")}
          isInvalid={!!formErrors.career} // marca el select como inválido
        >
          <option value="" disabled>
            Seleccioná tu carrera
          </option>
          <option value="civil">Ingeniería Civil</option>
          <option value="electrica">Ingeniería Eléctrica</option>
          <option value="industrial">Ingeniería Industrial</option>
          <option value="mecanica">Ingeniería Mecánica</option>
          <option value="quimica">Ingeniería Química</option>
          <option value="sistemas">Ingeniería en Sistemas</option>
        </Form.Select>
        {formErrors.career && (
          <div style={{ color: "red", marginTop: "5px", textAlign: "center" }}>
            {formErrors.career}
          </div>
        )}
      </Form.Group>

      <Button type="submit" className="w-100">
        Registrarme
      </Button>

      <p className="signup-register-link">
        ¿Ya tenés cuenta? <Link to="/">Inicia Sesión</Link>
      </p>

      <Alert
        show={showSuccessToast}
        message="¡Cuenta creada exitosamente! Redirigiendo..."
        onClose={handleToastClose}
        variant="success"
      />
    </AuthContainer>
  );
};
